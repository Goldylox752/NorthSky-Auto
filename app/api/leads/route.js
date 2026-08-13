import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendTelegramMessage } from "@/app/lib/telegram";

export const dynamic = "force-dynamic";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://northsky-auto.vercel.app";

function getSupabase() {
  if (!supabaseUrl || !supabaseServiceKey) {
    return null;
  }

  return createClient(
    supabaseUrl,
    supabaseServiceKey
  );
}

function clean(value) {
  if (value === null || value === undefined) {
    return "";
  }

  return String(value).trim();
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidYear(year) {
  const currentYear = new Date().getFullYear() + 1;
  const numericYear = Number(year);

  return (
    Number.isInteger(numericYear) &&
    numericYear >= 1900 &&
    numericYear <= currentYear
  );
}

/*
|--------------------------------------------------------------------------
| Escape HTML for Telegram
|--------------------------------------------------------------------------
*/

function escapeTelegramHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/*
|--------------------------------------------------------------------------
| Format public vehicle opportunity
|--------------------------------------------------------------------------
|
| IMPORTANT:
| Seller name, email, phone and VIN are intentionally excluded.
|
|--------------------------------------------------------------------------
*/

function formatPublicLead(vehicle) {
  return {
    id: vehicle.id ?? null,
    year: vehicle.year ?? null,
    make: vehicle.make ?? null,
    model: vehicle.model ?? null,
    trim: vehicle.trim ?? null,
    mileage: vehicle.mileage ?? null,
    condition: vehicle.condition ?? null,
    asking_price: vehicle.asking_price ?? null,
    postal_code: vehicle.postal_code ?? null,
    description: vehicle.description ?? null,
    selling_timeline: vehicle.selling_timeline ?? null,
    accident_history: vehicle.accident_history ?? null,
    status: vehicle.status || "new",
    created_at: vehicle.created_at ?? null,
    location: vehicle.postal_code || "Canada",
    vehicle_type: vehicle.vehicle_type || null,
  };
}

/*
|--------------------------------------------------------------------------
| Build Telegram opportunity message
|--------------------------------------------------------------------------
*/

function buildTelegramMessage(vehicle) {
  const year = escapeTelegramHtml(vehicle.year);
  const make = escapeTelegramHtml(vehicle.make);
  const model = escapeTelegramHtml(vehicle.model);
  const trim = escapeTelegramHtml(vehicle.trim);
  const mileage = escapeTelegramHtml(vehicle.mileage);
  const condition = escapeTelegramHtml(vehicle.condition);
  const askingPrice = escapeTelegramHtml(
    vehicle.asking_price
  );
  const postalCode = escapeTelegramHtml(
    vehicle.postal_code || "Canada"
  );

  const vehicleName = [
    year,
    make,
    model,
    trim,
  ]
    .filter(Boolean)
    .join(" ");

  return [
    "🚗 <b>NEW VEHICLE OPPORTUNITY</b>",
    "",
    `<b>${vehicleName || "Vehicle Opportunity"}</b>`,
    "",
    `📍 Location: ${postalCode}`,
    `🛣️ Mileage: ${mileage || "Not provided"} km`,
    `💰 Asking Price: $${askingPrice || "Contact NorthSky Auto"}`,
    `🔧 Condition: ${condition || "Not provided"}`,
    "",
    "A new vehicle submission has been received by NorthSky Auto.",
    "",
    "Dealers can review the opportunity through the NorthSky Auto dealer portal.",
  ].join("\n");
}

/*
|--------------------------------------------------------------------------
| GET
|--------------------------------------------------------------------------
|
| GET /api/leads
| Returns vehicle opportunities.
|
| GET /api/leads?id=123
| Returns one vehicle opportunity.
|
|--------------------------------------------------------------------------
*/

export async function GET(request) {
  try {
    const supabase = getSupabase();

    if (!supabase) {
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

    const { searchParams } = new URL(request.url);

    const id = clean(
      searchParams.get("id")
    );

    /*
    |--------------------------------------------------------------------------
    | INDIVIDUAL LEAD
    |--------------------------------------------------------------------------
    */

    if (id) {
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
        .eq("id", id)
        .in("status", [
          "new",
          "available",
          "active",
        ])
        .maybeSingle();

      if (error) {
        console.error(
          "Supabase vehicle lead lookup failed:",
          error
        );

        return NextResponse.json(
          {
            error:
              "Unable to load this vehicle opportunity.",
          },
          {
            status: 500,
          }
        );
      }

      if (!data) {
        return NextResponse.json(
          {
            error:
              "Vehicle opportunity not found.",
          },
          {
            status: 404,
          }
        );
      }

      return NextResponse.json(
        {
          success: true,
          lead: formatPublicLead(data),
        },
        {
          status: 200,
          headers: {
            "Cache-Control":
              "no-store, max-age=0",
          },
        }
      );
    }

    /*
    |--------------------------------------------------------------------------
    | MARKETPLACE LIST
    |--------------------------------------------------------------------------
    */

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

    const leads = (data || []).map(
      formatPublicLead
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
      "Dealer leads GET error:",
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

/*
|--------------------------------------------------------------------------
| POST
|--------------------------------------------------------------------------
|
| Creates seller vehicle submission.
|
| Flow:
|
| Seller
|   ↓
| /api/leads
|   ↓
| Supabase vehicle_leads
|   ↓
| Telegram notification
|   ↓
| Dealer opportunity
|
|--------------------------------------------------------------------------
*/

export async function POST(request) {
  try {
    const supabase = getSupabase();

    if (!supabase) {
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

    const body = await request.json();

    if (
      !body ||
      typeof body !== "object"
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid vehicle submission.",
        },
        {
          status: 400,
        }
      );
    }

    /*
    |--------------------------------------------------------------------------
    | Clean incoming data
    |--------------------------------------------------------------------------
    */

    const lead = {
      name: clean(body.name),

      email: clean(body.email).toLowerCase(),

      phone: clean(body.phone),

      postal_code: clean(
        body.postal_code
      ).toUpperCase(),

      year: clean(body.year),

      make: clean(body.make),

      model: clean(body.model),

      trim: clean(body.trim),

      mileage: clean(body.mileage),

      vin: clean(body.vin).toUpperCase(),

      condition: clean(
        body.condition
      ),

      selling_timeline: clean(
        body.selling_timeline
      ),

      accident_history: clean(
        body.accident_history
      ),

      description: clean(
        body.description
      ),

      asking_price: clean(
        body.asking_price
      ),

      /*
      |--------------------------------------------------------------------------
      | Optional campaign tracking
      |--------------------------------------------------------------------------
      */

      source: clean(body.source),

      campaign: clean(body.campaign),
    };

    /*
    |--------------------------------------------------------------------------
    | Required fields
    |--------------------------------------------------------------------------
    */

    const requiredFields = [
      "name",
      "email",
      "phone",
      "postal_code",
      "year",
      "make",
      "model",
      "mileage",
      "asking_price",
    ];

    const missingFields =
      requiredFields.filter(
        (field) => !lead[field]
      );

    if (missingFields.length) {
      return NextResponse.json(
        {
          error:
            "Please complete all required fields.",

          fields: missingFields,
        },
        {
          status: 400,
        }
      );
    }

    /*
    |--------------------------------------------------------------------------
    | Validate email
    |--------------------------------------------------------------------------
    */

    if (!isValidEmail(lead.email)) {
      return NextResponse.json(
        {
          error:
            "Please provide a valid email address.",
        },
        {
          status: 400,
        }
      );
    }

    /*
    |--------------------------------------------------------------------------
    | Validate year
    |--------------------------------------------------------------------------
    */

    if (!isValidYear(lead.year)) {
      return NextResponse.json(
        {
          error:
            "Please provide a valid vehicle year.",
        },
        {
          status: 400,
        }
      );
    }

    /*
    |--------------------------------------------------------------------------
    | Validate text lengths
    |--------------------------------------------------------------------------
    */

    if (lead.name.length > 150) {
      return NextResponse.json(
        {
          error:
            "Name is too long.",
        },
        {
          status: 400,
        }
      );
    }

    if (lead.email.length > 254) {
      return NextResponse.json(
        {
          error:
            "Email address is too long.",
        },
        {
          status: 400,
        }
      );
    }

    if (lead.phone.length > 50) {
      return NextResponse.json(
        {
          error:
            "Phone number is too long.",
        },
        {
          status: 400,
        }
      );
    }

    if (lead.description.length > 5000) {
      return NextResponse.json(
        {
          error:
            "Vehicle description is too long.",
        },
        {
          status: 400,
        }
      );
    }

    /*
    |--------------------------------------------------------------------------
    | Convert numeric values
    |--------------------------------------------------------------------------
    */

    const mileage = Number(
      lead.mileage.replace(
        /[^0-9]/g,
        ""
      )
    );

    const askingPrice = Number(
      lead.asking_price.replace(
        /[^0-9.]/g,
        ""
      )
    );

    if (
      !Number.isFinite(mileage) ||
      mileage < 0
    ) {
      return NextResponse.json(
        {
          error:
            "Please provide a valid mileage.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      !Number.isFinite(askingPrice) ||
      askingPrice < 0
    ) {
      return NextResponse.json(
        {
          error:
            "Please provide a valid asking price.",
        },
        {
          status: 400,
        }
      );
    }

    /*
    |--------------------------------------------------------------------------
    | Create database record
    |--------------------------------------------------------------------------
    */

    const vehicleRecord = {
      name: lead.name,

      email: lead.email,

      phone: lead.phone,

      postal_code:
        lead.postal_code,

      year: Number(lead.year),

      make: lead.make,

      model: lead.model,

      trim:
        lead.trim || null,

      mileage,

      vin:
        lead.vin || null,

      condition:
        lead.condition || null,

      selling_timeline:
        lead.selling_timeline ||
        null,

      accident_history:
        lead.accident_history ||
        null,

      description:
        lead.description ||
        null,

      asking_price:
        askingPrice,

      status: "new",
    };

    const { data, error } =
      await supabase
        .from("vehicle_leads")
        .insert(
          vehicleRecord
        )
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
        .single();

    if (error) {
      console.error(
        "Supabase vehicle lead insert failed:",
        error
      );

      return NextResponse.json(
        {
          error:
            "We could not submit your vehicle right now. Please try again.",
        },
        {
          status: 500,
        }
      );
    }

    /*
    |--------------------------------------------------------------------------
    | Telegram notification
    |--------------------------------------------------------------------------
    |
    | IMPORTANT:
    | Telegram receives only public vehicle information.
    |
    | Seller:
    | ❌ Name
    | ❌ Email
    | ❌ Phone
    | ❌ VIN
    |
    | Vehicle:
    | ✅ Year
    | ✅ Make
    | ✅ Model
    | ✅ Mileage
    | ✅ Condition
    | ✅ Asking price
    | ✅ General location
    |
    |--------------------------------------------------------------------------
    */

    const opportunityUrl =
      `${SITE_URL}/dealer/leads/${data.id}`;

    const telegramMessage =
      buildTelegramMessage(data);

    const telegramResult =
      await sendTelegramMessage({
        message:
          telegramMessage,

        buttonText:
          "🏪 View Dealer Opportunity",

        buttonUrl:
          opportunityUrl,
      });

    /*
    |--------------------------------------------------------------------------
    | Log Telegram failure without failing seller submission
    |--------------------------------------------------------------------------
    |
    | The vehicle is already safely stored in Supabase.
    | A temporary Telegram outage should NOT cause the seller
    | to submit the same vehicle again.
    |
    |--------------------------------------------------------------------------
    */

    if (
      !telegramResult?.success &&
      !telegramResult?.skipped
    ) {
      console.error(
        "Telegram notification failed:",
        telegramResult?.error
      );
    }

    /*
    |--------------------------------------------------------------------------
    | Success response
    |--------------------------------------------------------------------------
    */

    return NextResponse.json(
      {
        success: true,

        message:
          "Your vehicle has been submitted successfully.",

        leadId:
          data?.id || null,

        telegramNotified:
          telegramResult?.success === true,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "Vehicle lead POST error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Unable to process your vehicle submission.",
      },
      {
        status: 500,
      }
    );
  }
}