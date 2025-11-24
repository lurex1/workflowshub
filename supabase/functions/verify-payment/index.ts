import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[VERIFY-PAYMENT] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
  );

  try {
    logStep("Function started");

    const authHeader = req.headers.get("Authorization")!;
    const token = authHeader.replace("Bearer ", "");
    const { data } = await supabaseClient.auth.getUser(token);
    const user = data.user;
    
    if (!user) throw new Error("User not authenticated");
    logStep("User authenticated", { userId: user.id });

    const { session_id } = await req.json();
    
    if (!session_id) {
      throw new Error("Missing session_id");
    }

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", { 
      apiVersion: "2025-08-27.basil" 
    });

    // Retrieve checkout session
    const session = await stripe.checkout.sessions.retrieve(session_id);
    logStep("Session retrieved", { 
      sessionId: session.id, 
      paymentStatus: session.payment_status,
      status: session.status
    });

    if (session.payment_status !== 'paid') {
      throw new Error("Payment not completed");
    }

    // Check if purchase already exists
    const { data: existingPurchase } = await supabaseClient
      .from('purchases')
      .select('id')
      .eq('stripe_payment_id', session.id)
      .single();

    if (existingPurchase) {
      logStep("Purchase already exists");
      return new Response(JSON.stringify({ 
        success: true, 
        message: "Purchase already recorded" 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // Extract metadata
    const { product_id, purchase_type, user_id } = session.metadata || {};
    
    if (!product_id || !purchase_type) {
      throw new Error("Missing metadata in session");
    }

    // Verify user matches
    if (user_id !== user.id) {
      throw new Error("User mismatch");
    }

    // Create purchase record
    const { data: purchase, error: purchaseError } = await supabaseClient
      .from('purchases')
      .insert({
        user_id: user.id,
        product_id: product_id,
        purchase_type: purchase_type,
        status: 'completed',
        stripe_payment_id: session.id,
      })
      .select()
      .single();

    if (purchaseError) {
      logStep("ERROR creating purchase", purchaseError);
      throw purchaseError;
    }

    logStep("Purchase created", { purchaseId: purchase.id });

    return new Response(JSON.stringify({ 
      success: true, 
      purchase_id: purchase.id 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});