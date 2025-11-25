import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { Resend } from "https://esm.sh/resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ResetCodeRequest {
  email: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email }: ResetCodeRequest = await req.json();

    if (!email) {
      return new Response(
        JSON.stringify({ error: "Email jest wymagany" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Generate 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // Initialize Supabase client with service role
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Store code in database
    const { error: dbError } = await supabaseAdmin
      .from("password_reset_codes")
      .insert({
        email: email.toLowerCase().trim(),
        code: code,
        expires_at: new Date(Date.now() + 15 * 60 * 1000).toISOString(), // 15 minutes
      });

    if (dbError) {
      console.error("Database error:", dbError);
      return new Response(
        JSON.stringify({ error: "Błąd zapisywania kodu resetowania" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Send email with code
    const emailResponse = await resend.emails.send({
      from: "MercuryHub <onboarding@resend.dev>",
      to: [email],
      subject: "Kod resetowania hasła - MercuryHub",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #1e3a8a; margin-bottom: 20px;">Resetowanie hasła</h1>
          <p style="font-size: 16px; color: #333; margin-bottom: 20px;">
            Otrzymaliśmy prośbę o zresetowanie hasła do Twojego konta w MercuryHub.
          </p>
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; text-align: center; margin: 30px 0;">
            <p style="font-size: 14px; color: #666; margin-bottom: 10px;">Twój kod resetowania:</p>
            <p style="font-size: 32px; font-weight: bold; color: #1e3a8a; letter-spacing: 4px; margin: 0;">
              ${code}
            </p>
          </div>
          <p style="font-size: 14px; color: #666; margin-bottom: 10px;">
            Kod jest ważny przez 15 minut.
          </p>
          <p style="font-size: 14px; color: #999; margin-top: 30px;">
            Jeśli nie prosiłeś o reset hasła, zignoruj ten email.
          </p>
        </div>
      `,
    });

    console.log("Email response:", emailResponse);

    if (emailResponse.error) {
      console.error("Resend API error:", emailResponse.error);
      return new Response(
        JSON.stringify({ 
          error: "Nie udało się wysłać emaila. Skontaktuj się z administratorem.",
          details: emailResponse.error.message 
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: "Kod został wysłany na email" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-reset-code function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
