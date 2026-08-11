import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function GET(request) {
  try {
    if (
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      !process.env.SUPABASE_SERVICE_ROLE_KEY
    ) {
      console.error(
        "Missing Supabase environment variables."
      );

      return NextResponse.json(
        {
          error:
            "Server database configuration is incomplete.",
        },
        {
          status: 500,
        }
      );
    }

    const { searchParams } = new URL(
      request.url
    );

    const limitValue = Number(
      searchParams.get("limit") || 100
    );

    const limit = Math.min(
      Math.max(
        Number.isFinite(limitValue)
          ? limitValue
          : 100,
        1
      ),
      100
    );

    /*
     * Only show vehicle opportunities that are
     * available to dealers.
     *
     * New seller submissions are considered
     * available unless your database later
     * changes their status.
     */
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
        created_at
      `)
      .in("status", [
        "new",
        "available",
        "active",
      ])
      .order("created_at", {
        ascending: false,
      })
      .limit(limit);

    if (error) {
      console.error(
        "Supabase vehicle leads query failed:",
        error
      );

      return NextResponse.json(
        {
          error:
            "Unable to load vehicle opportunities.",
        },
        {
          status: 500,
        }
      );
    }

    /*
     * Do NOT expose seller contact information
     * through the marketplace listing endpoint.
     *
     * VIN is also intentionally excluded.
     */
    const leads = (data || []).map(
      (vehicle) => ({
        id: vehicle.id,

        year: vehicle.year ?? null,

        make: vehicle.make ?? null,

        model: vehicle.model ?? null,

        trim: vehicle.trim ?? null,

        mileage:
          vehicle.mileage ?? null,

        condition:
          vehicle.condition ?? null,

        asking_price:
          vehicle.asking_price ?? null,

        postal_code:
          vehicle.postal_code ?? null,

        description:
          vehicle.description ?? null,

        selling_timeline:
          vehicle.selling_timeline ?? null,

        accident_history:
          vehicle.accident_history ?? null,

        status:
          vehicle.status || "new",

        created_at:
          vehicle.created_at ?? null,

        /*
         * Your seller form currently collects
         * postal code rather than city/province.
         *
         * The frontend can still display the
         * postal code until location lookup is
         * added later.
         */
        location:
          vehicle.postal_code ||
          "Canada",

        vehicle_type:
          null,
      })
    );

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
      "Dealer leads API error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "An unexpected error occurred while loading vehicle opportunities.",
      },
      {
        status: 500,
      }
    );
  }
}