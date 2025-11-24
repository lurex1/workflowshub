import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } }
  );

  try {
    // Authenticate user
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header");
    
    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) throw new Error(`Authentication error: ${userError.message}`);
    const user = userData.user;
    if (!user) throw new Error("User not authenticated");

    // Parse request body
    const { product_id, purchase_type, stripe_session_id } = await req.json();
    
    // Validate required fields
    if (!product_id || !purchase_type || !stripe_session_id) {
      throw new Error("Missing required fields: product_id, purchase_type, stripe_session_id");
    }

    // Validate purchase_type
    if (!['basic', 'premium'].includes(purchase_type)) {
      throw new Error("Invalid purchase_type. Must be 'basic' or 'premium'");
    }

    console.log(`Processing purchase for user ${user.id}, product ${product_id}, type ${purchase_type}`);

    // Verify product exists and is approved
    const { data: product, error: productError } = await supabaseClient
      .from("products")
      .select("id, price_basic, price_premium, status")
      .eq("id", product_id)
      .single();

    if (productError || !product) {
      throw new Error("Product not found");
    }

    if (product.status !== "approved") {
      throw new Error("Product is not available for purchase");
    }

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    // Verify Stripe checkout session
    const session = await stripe.checkout.sessions.retrieve(stripe_session_id);
    
    if (!session) {
      throw new Error("Invalid Stripe session");
    }

    if (session.payment_status !== "paid") {
      throw new Error("Payment not completed");
    }

    // Verify session amount matches product price
    const expectedAmount = purchase_type === 'basic' 
      ? product.price_basic * 100 
      : product.price_premium * 100;
    
    if (session.amount_total !== expectedAmount) {
      console.error(`Amount mismatch: expected ${expectedAmount}, got ${session.amount_total}`);
      throw new Error("Payment amount mismatch");
    }

    // Check if purchase already exists for this session
    const { data: existingPurchase } = await supabaseClient
      .from("purchases")
      .select("id")
      .eq("stripe_payment_id", stripe_session_id)
      .single();

    if (existingPurchase) {
      console.log("Purchase already exists for this session");
      return new Response(
        JSON.stringify({ 
          success: true, 
          purchase_id: existingPurchase.id,
          message: "Purchase already recorded" 
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
      );
    }

    // Create purchase record
    const { data: purchase, error: purchaseError } = await supabaseClient
      .from("purchases")
      .insert({
        user_id: user.id,
        product_id,
        purchase_type,
        stripe_payment_id: stripe_session_id,
        status: "completed",
      })
      .select()
      .single();

    if (purchaseError) {
      console.error("Error creating purchase:", purchaseError);
      throw new Error("Failed to create purchase record");
    }

    console.log(`Purchase created successfully: ${purchase.id}`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        purchase_id: purchase.id,
        product_id,
        purchase_type 
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );
  } catch (error) {
    console.error("Error in create-purchase:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
    );
  }
});
