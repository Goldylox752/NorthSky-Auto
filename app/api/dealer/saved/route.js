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

/*
|--------------------------------------------------------------------------
| Helpers
|--------------------------------------------------------------------------
*/

function getDealerId(request) {
  /*
   * Temporary dealer identification support.
   *
   * The API accepts a dealer ID through:
   *   x-dealer-id
   *
   * Once Supabase Auth is connected to the dealer portal,
   * replace this with the authenticated user's dealer record.
   */

  return (
    request.headers.get("x-dealer-id") ||
    null
  );
}

function getLeadId(request) {
  const url = new URL(request.url);

  return (
    url.searchParams.get("lead_id") ||
    url.searchParams.get("id") ||
    null
  );
}

/*
|--------------------------------------------------------------------------
| GET
|--------------------------------------------------------------------------
| Return saved vehicle opportunities for the dealer.
*/

export async function GET(request) {
  try {
    const supabase = getSupabaseAdmin();

    const dealerId = getDealerId(request);

    if (!dealerId) {
      return NextResponse.json(
        {
          success: true,
          saved: [],
          message:
            "No dealer account was supplied.",
        },
        { status: 200 }
      );
    }

    const { data, error } = await supabase
      .from("dealer_saved_leads")
      .select(`
        id,
        dealer_id,
        vehicle_lead_id,
        created_at,
        vehicle_leads (
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
        )
      `)
      .eq("dealer_id", dealerId)
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error(
        "Saved vehicle lookup failed:",
        error
      );

      return NextResponse.json(
        {
          error:
            "Unable to load saved vehicle opportunities.",
        },
        { status: 500 }
      );
    }

    const saved = (data || [])
      .map((item) => {
        const vehicle = item.vehicle_leads;

        if (!vehicle) {
          return null;
        }

        return {
          id: item.id,
          vehicle_lead_id:
            item.vehicle_lead_id,
          saved_at: item.created_at,

          vehicle: {
            id: vehicle.id,
            year: vehicle.year ?? null,
            make: vehicle.make ?? null,
            model: vehicle.model ?? null,
            trim: vehicle.trim ?? null,
            mileage: vehicle.mileage ?? null,
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
              vehicle.status ?? "new",
            created_at:
              vehicle.created_at ?? null,
          },
        };
      })
      .filter(Boolean);

    return NextResponse.json(
      {
        success: true,
        saved,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (error) {
    console.error(
      "Saved vehicles GET error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "An unexpected error occurred while loading saved vehicles.",
      },
      { status: 500 }
    );
  }
}

/*
|--------------------------------------------------------------------------
| POST
|--------------------------------------------------------------------------
| Save a vehicle opportunity.
*/

export async function POST(request) {
  try {
    const supabase = getSupabaseAdmin();

    const dealerId = getDealerId(request);

    if (!dealerId) {
      return NextResponse.json(
        {
          error:
            "Dealer account is required to save a vehicle.",
        },
        { status: 401 }
      );
    }

    const body = await request.json().catch(
      () => ({})
    );

    const vehicleLeadId = String(
      body?.vehicle_lead_id ||
        body?.lead_id ||
        body?.id ||
        ""
    ).trim();

    if (!vehicleLeadId) {
      return NextResponse.json(
        {
          error:
            "Vehicle lead ID is required.",
        },
        { status: 400 }
      );
    }

    /*
     * Confirm that the vehicle exists and is still
     * available in the marketplace.
     */

    const { data: vehicle, error: vehicleError } =
      await supabase
        .from("vehicle_leads")
        .select(
          "id, status"
        )
        .eq("id", vehicleLeadId)
        .in("status", [
          "new",
          "available",
          "active",
        ])
        .maybeSingle();

    if (vehicleError) {
      console.error(
        "Vehicle verification failed:",
        vehicleError
      );

      return NextResponse.json(
        {
          error:
            "Unable to verify this vehicle opportunity.",
        },
        { status: 500 }
      );
    }

    if (!vehicle) {
      return NextResponse.json(
        {
          error:
            "This vehicle opportunity is no longer available.",
        },
        { status: 404 }
      );
    }

    /*
     * Prevent duplicate saved records.
     */

    const { data: existing, error: existingError } =
      await supabase
        .from("dealer_saved_leads")
        .select("id")
        .eq("dealer_id", dealerId)
        .eq(
          "vehicle_lead_id",
          vehicleLeadId
        )
        .maybeSingle();

    if (existingError) {
      console.error(
        "Saved vehicle duplicate check failed:",
        existingError
      );

      return NextResponse.json(
        {
          error:
            "Unable to check whether this vehicle is already saved.",
        },
        { status: 500 }
      );
    }

    if (existing) {
      return NextResponse.json(
        {
          success: true,
          alreadySaved: true,
          saved: existing,
        },
        { status: 200 }
      );
    }

    /*
     * Create saved vehicle record.
     */

    const { data, error } = await supabase
      .from("dealer_saved_leads")
      .insert({
        dealer_id: dealerId,
        vehicle_lead_id: vehicleLeadId,
      })
      .select(
        "id, dealer_id, vehicle_lead_id, created_at"
      )
      .single();

    if (error) {
      console.error(
        "Saved vehicle insert failed:",
        error
      );

      return NextResponse.json(
        {
          error:
            "Unable to save this vehicle opportunity.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "Vehicle opportunity saved.",
        saved: data,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "Saved vehicles POST error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "An unexpected error occurred while saving this vehicle.",
      },
      { status: 500 }
    );
  }
}

/*
|--------------------------------------------------------------------------
| DELETE
|--------------------------------------------------------------------------
| Remove a saved vehicle opportunity.
*/

export async function DELETE(request) {
  try {
    const supabase = getSupabaseAdmin();

    const dealerId = getDealerId(request);

    if (!dealerId) {
      return NextResponse.json(
        {
          error:
            "Dealer account is required.",
        },
        { status: 401 }
      );
    }

    const body = await request.json().catch(
      () => ({})
    );

    const urlLeadId = getLeadId(request);

    const vehicleLeadId = String(
      body?.vehicle_lead_id ||
        body?.lead_id ||
        body?.id ||
        urlLeadId ||
        ""
    ).trim();

    if (!vehicleLeadId) {
      return NextResponse.json(
        {
          error:
            "Vehicle lead ID is required.",
        },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("dealer_saved_leads")
      .delete()
      .eq("dealer_id", dealerId)
      .eq(
        "vehicle_lead_id",
        vehicleLeadId
      )
      .select(
        "id, vehicle_lead_id"
      );

    if (error) {
      console.error(
        "Saved vehicle delete failed:",
        error
      );

      return NextResponse.json(
        {
          error:
            "Unable to remove this saved vehicle.",
        },
        { status: 500 }
      );
    }

    if (!data?.length) {
      return NextResponse.json(
        {
          success: true,
          removed: false,
          message:
            "This vehicle was not saved.",
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        removed: true,
        message:
          "Vehicle removed from saved opportunities.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "Saved vehicles DELETE error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "An unexpected error occurred while removing the saved vehicle.",
      },
      { status: 500 }
    );
  }
}