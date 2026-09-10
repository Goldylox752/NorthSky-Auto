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
export async function GET(
  request,
  { params }
) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Vehicle lead ID is required.",
        },
        { status: 400 }
      );
    }
    const supabase =
      getSupabaseAdmin();
    /*
     * ---------------------------------------------------------
     * LOAD LEAD
     * ---------------------------------------------------------
     *
     * This route intentionally uses the same
     * "leads" table as /api/leads.
     */
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
        vin,
        condition,
        asking_price,
        postal_code,
        description,
        selling_timeline,
        accident_history,
        status,
        created_at
        `
      )
      .eq("id", id)
      .in(
        "status",
        MARKETPLACE_STATUSES
      )
      .maybeSingle();
    if (error) {
      console.error(
        "Lead detail query failed:",
        error
      );
      return NextResponse.json(
        {
          success: false,
          error:
            "Unable to load this vehicle opportunity.",
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
     * NOT FOUND
     * ---------------------------------------------------------
     */
    if (!data) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Vehicle opportunity not found or is no longer available.",
        },
        { status: 404 }
      );
    }
    /*
     * ---------------------------------------------------------
     * DEALER-SAFE RESPONSE
     * ---------------------------------------------------------
     *
     * Never expose seller contact information
     * or the actual VIN through this public
     * marketplace endpoint.
     */
    const lead = {
      id: data.id,
      year:
        data.year ?? null,
      make:
        data.make ?? null,
      model:
        data.model ?? null,
      trim:
        data.trim ?? null,
      mileage:
        data.mileage ?? null,
      condition:
        data.condition ?? null,
      asking_price:
        data.asking_price ?? null,
      postal_code:
        data.postal_code ?? null,
      location:
        data.postal_code ||
        "Canada",
      description:
        data.description ?? null,
      selling_timeline:
        data.selling_timeline ?? null,
      accident_history:
        data.accident_history ?? null,
      status:
        data.status || "new",
      created_at:
        data.created_at ?? null,
      /*
       * Only tell the dealer whether
       * a VIN exists.
       *
       * The actual VIN is never returned.
       */
      has_vin:
        Boolean(data.vin),
      /*
       * Keep this for compatibility with
       * the existing dealer detail UI.
       */
      vin:
        Boolean(data.vin),
      vehicle_type:
        null,
    };
    /*
     * ---------------------------------------------------------
     * SUCCESS
     * ---------------------------------------------------------
     */
    return NextResponse.json(
      {
        success: true,
        lead,
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
      "GET /api/leads/[id] error:",
      error
    );
    return NextResponse.json(
      {
        success: false,
        error:
          "An unexpected error occurred while loading this vehicle.",
        details:
          process.env.NODE_ENV === "development"
            ? error.message
            : undefined,
      },
      { status: 500 }
    );
  }
}