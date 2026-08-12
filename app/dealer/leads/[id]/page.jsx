import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error(
      "Missing Supabase server environment variables."
    );
  }

  return createClient(url, serviceRoleKey);
}

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "Vehicle lead ID is required.",
        },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdmin();

    const { data, error } = await supabase
      .from("vehicle_leads")
      .select(`
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
        accident_history,
        status,
        created_at,
        vin
      `)
      .eq("id", id)
      .in("status", ["new", "available", "active"])
      .maybeSingle();

    if (error) {
      console.error(
        "Vehicle lead detail query failed:",
        error
      );

      return NextResponse.json(
        {
          success: false,
          error: "Unable to load this vehicle opportunity.",
        },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        {
          success: false,
          error: "Vehicle opportunity not found.",
        },
        { status: 404 }
      );
    }

    /*
     * IMPORTANT:
     *
     * Do NOT expose:
     * - seller name
     * - seller email
     * - seller phone
     * - actual VIN
     *
     * Dealers can request seller contact through
     * a controlled workflow later.
     */

    const lead = {
      id: data.id,

      year: data.year ?? null,
      make: data.make ?? null,
      model: data.model ?? null,
      trim: data.trim ?? null,

      mileage: data.mileage ?? null,
      condition: data.condition ?? null,
      asking_price: data.asking_price ?? null,

      postal_code: data.postal_code ?? null,

      description: data.description ?? null,

      selling_timeline:
        data.selling_timeline ?? null,

      accident_history:
        data.accident_history ?? null,

      status: data.status || "new",

      created_at:
        data.created_at ?? null,

      location:
        data.postal_code || "Canada",

      vehicle_type: null,

      has_vin:
        Boolean(
          data.vin &&
            String(data.vin).trim()
        ),
    };

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
      "Vehicle lead detail API error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "An unexpected error occurred while loading this vehicle.",
      },
      { status: 500 }
    );
  }
}