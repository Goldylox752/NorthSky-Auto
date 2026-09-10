import { NextResponse } from “next/server”;
import { createClient } from “@supabase/supabase-js”;
import { createClient as createServerClient } from “@/lib/supabase/server”;

export const dynamic = “force-dynamic”;

function getSupabaseAdmin() {
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey =
process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceRoleKey) {
throw new Error(
“Missing Supabase server environment variables.”
);
}

return createClient(url, serviceRoleKey);
}

async function getAuthenticatedDealer() {
const supabase = await createServerClient();

const {
data: { user },
error: userError,
} = await supabase.auth.getUser();

if (userError || !user) {
return {
user: null,
dealer: null,
};
}

const admin = getSupabaseAdmin();

const { data: dealer, error: dealerError } =
await admin
.from(“dealers”)
.select(
“id, name, email, subscription_status”
)
.eq(“id”, user.id)
.maybeSingle();

if (dealerError) {
console.error(
“Dealer lookup failed:”,
dealerError
);

return {
  user,
  dealer: null,
};

}

return {
user,
dealer,
};
}

function getLeadId(request) {
const url = new URL(request.url);

return (
url.searchParams.get(“lead_id”) ||
url.searchParams.get(“id”) ||
null
);
}

/*

GET

–––––––––––––––––––––––––––––––––––––

Return saved vehicle opportunities for the

authenticated dealer.

–––––––––––––––––––––––––––––––––––––

*/

export async function GET() {
try {
const { user, dealer } =
await getAuthenticatedDealer();

if (!user) {
  return NextResponse.json(
    {
      error: "Authentication required.",
    },
    { status: 401 }
  );
}
if (!dealer) {
  return NextResponse.json(
    {
      error:
        "Dealer account could not be found.",
    },
    { status: 403 }
  );
}
const supabase = getSupabaseAdmin();
const { data, error } = await supabase
  .from("dealer_saved_leads")
  .select(`
    id,
    dealer_id,
    vehicle_lead_id,
    created_at,
    leads (
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
  .eq("dealer_id", dealer.id)
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
    const vehicle = item?.leads;
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
      "Cache-Control":
        "no-store, max-age=0",
    },
  }
);

} catch (error) {
console.error(
“Saved vehicles GET error:”,
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

POST

–––––––––––––––––––––––––––––––––––––

Save a vehicle opportunity.

–––––––––––––––––––––––––––––––––––––

*/

export async function POST(request) {
try {
const { user, dealer } =
await getAuthenticatedDealer();

if (!user) {
  return NextResponse.json(
    {
      error: "Authentication required.",
    },
    { status: 401 }
  );
}
if (!dealer) {
  return NextResponse.json(
    {
      error:
        "Dealer account could not be found.",
    },
    { status: 403 }
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
const supabase = getSupabaseAdmin();
/*
 * Confirm that the lead exists and is still
 * available to dealers.
 */
const { data: lead, error: leadError } =
  await supabase
    .from("leads")
    .select("id, status")
    .eq("id", vehicleLeadId)
    .in("status", [
      "new",
      "available",
      "active",
    ])
    .maybeSingle();
if (leadError) {
  console.error(
    "Lead verification failed:",
    leadError
  );
  return NextResponse.json(
    {
      error:
        "Unable to verify this vehicle opportunity.",
    },
    { status: 500 }
  );
}
if (!lead) {
  return NextResponse.json(
    {
      error:
        "This vehicle opportunity is no longer available.",
    },
    { status: 404 }
  );
}
/*
 * Check for an existing saved record.
 */
const {
  data: existing,
  error: existingError,
} = await supabase
  .from("dealer_saved_leads")
  .select("id, dealer_id, vehicle_lead_id")
  .eq("dealer_id", dealer.id)
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
 * Save the vehicle.
 */
const { data, error } = await supabase
  .from("dealer_saved_leads")
  .insert({
    dealer_id: dealer.id,
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
“Saved vehicles POST error:”,
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

DELETE

–––––––––––––––––––––––––––––––––––––

Remove a saved vehicle opportunity.

–––––––––––––––––––––––––––––––––––––

*/

export async function DELETE(request) {
try {
const { user, dealer } =
await getAuthenticatedDealer();

if (!user) {
  return NextResponse.json(
    {
      error: "Authentication required.",
    },
    { status: 401 }
  );
}
if (!dealer) {
  return NextResponse.json(
    {
      error:
        "Dealer account could not be found.",
    },
    { status: 403 }
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
const supabase = getSupabaseAdmin();
const { data, error } = await supabase
  .from("dealer_saved_leads")
  .delete()
  .eq("dealer_id", dealer.id)
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
“Saved vehicles DELETE error:”,
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