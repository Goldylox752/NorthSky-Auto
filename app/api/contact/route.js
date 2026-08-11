import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
function clean(value) {
  if (value === null || value === undefined) {
    return "";
  }
  return String(value).trim();
}
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
const allowedTopics = new Set([
  "dealer-account",
  "dealer-membership",
  "vehicle-opportunity",
  "sell-vehicle",
  "partnership",
  "technical-support",
  "general",
  "other",
]);
export async function POST(request) {
  try {
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid contact form submission.",
        },
        { status: 400 }
      );
    }
    /*
    |--------------------------------------------------------------------------
    | HONEYPOT SPAM PROTECTION
    |--------------------------------------------------------------------------
    |
    | Legitimate users never see this field.
    | Automated bots may fill it in.
    |
    */
    const website = clean(body.website);
    if (website) {
      return NextResponse.json(
        {
          success: true,
          message: "Your message has been received.",
        },
        { status: 200 }
      );
    }
    /*
    |--------------------------------------------------------------------------
    | CLEAN INPUT
    |--------------------------------------------------------------------------
    */
    const name = clean(body.name);
    const email = clean(body.email).toLowerCase();
    const phone = clean(body.phone);
    const topic = clean(body.topic);
    const message = clean(body.message);
    /*
    |--------------------------------------------------------------------------
    | REQUIRED FIELDS
    |--------------------------------------------------------------------------
    */
    const missingFields = [];
    if (!name) missingFields.push("name");
    if (!email) missingFields.push("email");
    if (!topic) missingFields.push("topic");
    if (!message) missingFields.push("message");
    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Please complete all required fields.",
          fields: missingFields,
        },
        { status: 400 }
      );
    }
    /*
    |--------------------------------------------------------------------------
    | VALIDATE EMAIL
    |--------------------------------------------------------------------------
    */
    if (!isValidEmail(email)) {
      return NextResponse.json(
        {
          success: false,
          error: "Please provide a valid email address.",
        },
        { status: 400 }
      );
    }
    /*
    |--------------------------------------------------------------------------
    | VALIDATE TOPIC
    |--------------------------------------------------------------------------
    */
    if (!allowedTopics.has(topic)) {
      return NextResponse.json(
        {
          success: false,
          error: "Please select a valid inquiry type.",
        },
        { status: 400 }
      );
    }
    /*
    |--------------------------------------------------------------------------
    | LENGTH LIMITS
    |--------------------------------------------------------------------------
    */
    if (name.length > 150) {
      return NextResponse.json(
        {
          success: false,
          error: "Name is too long.",
        },
        { status: 400 }
      );
    }
    if (email.length > 254) {
      return NextResponse.json(
        {
          success: false,
          error: "Email address is too long.",
        },
        { status: 400 }
      );
    }
    if (phone.length > 50) {
      return NextResponse.json(
        {
          success: false,
          error: "Phone number is too long.",
        },
        { status: 400 }
      );
    }
    if (message.length > 5000) {
      return NextResponse.json(
        {
          success: false,
          error: "Message is too long.",
        },
        { status: 400 }
      );
    }
    /*
    |--------------------------------------------------------------------------
    | BASIC SPAM CHECK
    |--------------------------------------------------------------------------
    |
    | This is intentionally simple. The honeypot above is the primary
    | protection. Additional rate limiting can be added later.
    |
    */
    const suspiciousPatterns = [
      /viagra/i,
      /casino/i,
      /crypto investment/i,
      /forex trading/i,
      /porn/i,
      /buy followers/i,
      /seo services/i,
      /casino bonus/i,
    ];
    const combinedText = `${name} ${email} ${message}`;
    const looksLikeSpam = suspiciousPatterns.some((pattern) =>
      pattern.test(combinedText)
    );
    if (looksLikeSpam) {
      return NextResponse.json(
        {
          success: true,
          message: "Your message has been received.",
        },
        { status: 200 }
      );
    }
    /*
    |--------------------------------------------------------------------------
    | CONTACT RECORD
    |--------------------------------------------------------------------------
    |
    | This object is ready to be stored in Supabase or forwarded to
    | an email provider.
    |
    */
    const contactSubmission = {
      name,
      email,
      phone: phone || null,
      topic,
      message,
      created_at: new Date().toISOString(),
    };
    console.log(
      "NorthSky Auto contact submission:",
      contactSubmission
    );
    /*
    |--------------------------------------------------------------------------
    | OPTIONAL SUPABASE STORAGE
    |--------------------------------------------------------------------------
    |
    | If you create a `contact_submissions` table and add the Supabase
    | environment variables, this section can store submissions.
    |
    */
    if (
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.SUPABASE_SERVICE_ROLE_KEY
    ) {
      try {
        const { createClient } = await import(
          "@supabase/supabase-js"
        );
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL,
          process.env.SUPABASE_SERVICE_ROLE_KEY
        );
        const { error: supabaseError } = await supabase
          .from("contact_submissions")
          .insert(contactSubmission);
        if (supabaseError) {
          console.error(
            "Contact submission database error:",
            supabaseError
          );
          /*
          |--------------------------------------------------------------------------
          | IMPORTANT
          |--------------------------------------------------------------------------
          |
          | Do not expose database details to the visitor.
          | The submission is still logged server-side.
          |
          */
        }
      } catch (databaseError) {
        console.error(
          "Contact submission database failure:",
          databaseError
        );
      }
    }
    /*
    |--------------------------------------------------------------------------
    | SUCCESS
    |--------------------------------------------------------------------------
    */
    return NextResponse.json(
      {
        success: true,
        message:
          "Thanks for contacting NorthSky Auto. Your message has been received.",
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (error) {
    console.error(
      "NorthSky Auto contact API error:",
      error
    );
    return NextResponse.json(
      {
        success: false,
        error:
          "We were unable to process your message. Please try again.",
      },
      {
        status: 500,
      }
    );
  }
}