import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
export const dynamic = "force-dynamic";
const MARKETPLACE_STATUSES = [
  "new",
  "available",
  "active",
];
function getSupabaseAdmin() {
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL is not configured."
    );
  }
  if (!serviceRoleKey) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY is not configured."
    );
  }
  return createClient(
    supabaseUrl,
    serviceRoleKey,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}
/*
|--------------------------------------------------------------------------
| GET /api/leads
|--------------------------------------------------------------------------
|
| Used by the dealer marketplace.
|
*/
export async function GET(request) {
  try {
    const supabase =
      getSupabaseAdmin();
    const { searchParams } =
      new URL(request.url);
    const requestedLimit = Number(
      searchParams.get("limit") || 100
    );
    const limit = Math.min(
      Math.max(
        Number.isFinite(requestedLimit)
          ? Math.floor(requestedLimit)
          : 100,
        1
      ),
      100
    );
    const requestedStatus =
      searchParams.get("status");
    const statuses =
      requestedStatus &&
      MARKETPLACE_STATUSES.includes(
        requestedStatus.toLowerCase()
      )
        ? [requestedStatus.toLowerCase()]
        : MARKETPLACE_STATUSES;
    const {
      data,
      error,
    } = await supabase
      .from("leads")
      .select(
        `
        id,
        year,
        make,
        model,
        trim,
        mileage,
        condition,
        asking_price,
        selling_timeline,
        postal_code,
        description,
        status,
        created_at
        `
      )
      .in("status", statuses)
      .order("created_at", {
        ascending: false,
      })
      .limit(limit);
    if (error) {
      console.error(
        "Supabase leads query error:",
        error
      );
      return NextResponse.json(
        {
          success: false,
          error:
            "Unable to load vehicle opportunities.",
          details:
            process.env.NODE_ENV === "development"
              ? error.message
              : undefined,
        },
        { status: 500 }
      );
    }
    const leads = data || [];
    return NextResponse.json(
      {
        success: true,
        leads,
        count: leads.length,
      },
      {
        status: 200,
        headers: {
          "Cache-Control":
            "no-store, max-age=0",
        },
      }
    );
  } catch (error) {
    console.error(
      "GET /api/leads error:",
      error
    );
    return NextResponse.json(
      {
        success: false,
        error:
          "An unexpected error occurred while loading vehicle opportunities.",
      },
      { status: 500 }
    );
  }
}
/*
|--------------------------------------------------------------------------
| POST /api/leads
|--------------------------------------------------------------------------
|
| Used by the seller vehicle submission form.
|
*/
export async function POST(request) {
  try {
    const supabase =
      getSupabaseAdmin();
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          error:
            "Invalid request body.",
        },
        { status: 400 }
      );
    }
    /*
     * ---------------------------------------------------------
     * CLEAN INPUT
     * ---------------------------------------------------------
     */
    const name =
      typeof body.name === "string"
        ? body.name.trim()
        : "";
    const email =
      typeof body.email === "string"
        ? body.email.trim().toLowerCase()
        : "";
    const phone =
      typeof body.phone === "string"
        ? body.phone.trim()
        : "";
    const postal_code =
      typeof body.postal_code === "string"
        ? body.postal_code.trim().toUpperCase()
        : "";
    const year =
      body.year !== undefined &&
      body.year !== null &&
      body.year !== ""
        ? Number(body.year)
        : null;
    const mileage =
      body.mileage !== undefined &&
      body.mileage !== null &&
      body.mileage !== ""
        ? Number(body.mileage)
        : null;
    const asking_price =
      body.asking_price !== undefined &&
      body.asking_price !== null &&
      body.asking_price !== ""
        ? Number(body.asking_price)
        : null;
    const make =
      typeof body.make === "string"
        ? body.make.trim()
        : "";
    const model =
      typeof body.model === "string"
        ? body.model.trim()
        : "";
    const trim =
      typeof body.trim === "string"
        ? body.trim.trim()
        : "";
    const vin =
      typeof body.vin === "string"
        ? body.vin.trim().toUpperCase()
        : "";
    const condition =
      typeof body.condition === "string"
        ? body.condition.trim()
        : "";
    const selling_timeline =
      typeof body.selling_timeline ===
      "string"
        ? body.selling_timeline.trim()
        : "";
    const accident_history =
      typeof body.accident_history ===
      "string"
        ? body.accident_history.trim()
        : "";
    const description =
      typeof body.description === "string"
        ? body.description.trim()
        : "";
    /*
     * Marketing attribution.
     */
    const source =
      typeof body.source === "string"
        ? body.source.trim()
        : null;
    const campaign =
      typeof body.campaign === "string"
        ? body.campaign.trim()
        : null;
    const marketing_session_id =
      typeof body.marketing_session_id ===
      "string"
        ? body.marketing_session_id.trim()
        : null;
    /*
     * ---------------------------------------------------------
     * VALIDATION
     * ---------------------------------------------------------
     */
    if (!name) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Your name is required.",
        },
        { status: 400 }
      );
    }
    if (!email) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Your email address is required.",
        },
        { status: 400 }
      );
    }
    const emailIsValid =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email
      );
    if (!emailIsValid) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Please provide a valid email address.",
        },
        { status: 400 }
      );
    }
    if (!phone) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Your phone number is required.",
        },
        { status: 400 }
      );
    }
    if (
      !Number.isInteger(year) ||
      year < 1900 ||
      year > new Date().getFullYear() + 2
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Please provide a valid vehicle year.",
        },
        { status: 400 }
      );
    }
    if (!make) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Vehicle make is required.",
        },
        { status: 400 }
      );
    }
    if (!model) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Vehicle model is required.",
        },
        { status: 400 }
      );
    }
    if (
      mileage !== null &&
      (!Number.isFinite(mileage) ||
        mileage < 0)
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Please provide a valid mileage.",
        },
        { status: 400 }
      );
    }
    if (
      asking_price !== null &&
      (!Number.isFinite(asking_price) ||
        asking_price < 0)
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Please provide a valid asking price.",
        },
        { status: 400 }
      );
    }
    /*
     * ---------------------------------------------------------
     * INSERT LEAD
     * ---------------------------------------------------------
     */
    const leadData = {
      name,
      email,
      phone,
      postal_code:
        postal_code || null,
      year,
      make,
      model,
      trim:
        trim || null,
      mileage,
      vin:
        vin || null,
      condition:
        condition || null,
      selling_timeline:
        selling_timeline || null,
      accident_history:
        accident_history || null,
      description:
        description || null,
      asking_price,
      /*
       * New seller submissions begin as "new".
       */
      status: "new",
      /*
       * Marketing attribution.
       */
      source:
        source || null,
      campaign:
        campaign || null,
      marketing_session_id:
        marketing_session_id || null,
    };
    const {
      data,
      error,
    } = await supabase
      .from("leads")
      .insert(leadData)
      .select(
        `
        id,
        year,
        make,
        model,
        trim,
        mileage,
        condition,
        asking_price,
        postal_code,
        description,
        selling_timeline,
        status,
        created_at
        `
      )
      .single();
    if (error) {
      console.error(
        "Supabase lead creation error:",
        error
      );
      return NextResponse.json(
        {
          success: false,
          error:
            "Unable to submit your vehicle right now.",
          details:
            process.env.NODE_ENV === "development"
              ? error.message
              : undefined,
        },
        { status: 500 }
      );
    }
    /*
     * ---------------------------------------------------------
     * SUCCESS
     * ---------------------------------------------------------
     */
    return NextResponse.json(
      {
        success: true,
        message:
          "Your vehicle has been submitted successfully.",
        lead: data,
      },
      {
        status: 201,
        headers: {
          "Cache-Control":
            "no-store, max-age=0",
        },
      }
    );
  } catch (error) {
    console.error(
      "POST /api/leads error:",
      error
    );
    return NextResponse.json(
      {
        success: false,
        error:
          "An unexpected error occurred while submitting your vehicle.",
      },
      { status: 500 }
    );
  }
}