```js
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendTelegramMessage } from "@/app/lib/telegram";

export const dynamic = "force-dynamic";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY;

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://northsky-auto.vercel.app";

function getSupabase() {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    return null;
  }

  return createClient(
    SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY
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
  const numericYear = Number(year);
  const maxYear = new Date().getFullYear() + 1;

  return (
    Number.isInteger(numericYear) &&
    numericYear >= 1900 &&
    numericYear <= maxYear
  );
}

function escapeTelegramHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

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
  };
}

function buildTelegramMessage(vehicle) {
  const vehicleName = [
    vehicle.year,
    vehicle.make,
    vehicle.model,
    vehicle.trim,
  ]
    .map(escapeTelegramHtml)
    .filter(Boolean)
    .join(" ");

  const location = escapeTelegramHtml(
    vehicle.postal_code || "Canada"
  );

  const mileage = escapeTelegramHtml(
    vehicle.mileage
  );

  const price = escapeTelegramHtml(
    vehicle.asking_price
  );

  const condition = escapeTelegramHtml(
    vehicle.condition || "Not provided"
  );

  return [
    "🚗 <b>NEW VEHICLE OPPORTUNITY</b>",
    "",
    `<b>${vehicleName || "Vehicle Opportunity"}</b>`,
    "",
    `📍 Location: ${location}`,
    `🛣️ Mileage: ${mileage || "Not provided"} km`,
    `💰 Asking Price: $${price || "Contact NorthSky Auto"}`,
    `🔧 Condition: ${condition}`,
    "",
    "A new vehicle submission has been received by NorthSky Auto.",
    "",
    "Dealers can review the opportunity through the NorthSky Auto dealer portal.",
  ].join("\n");
}

function serverError(message) {
  return NextResponse.json(
    { error: message },
    { status: 500 }
  );
}

export async function GET(request) {
  try {
    const supabase = getSupabase();

    if (!supabase) {
      console.error(
        "Missing Supabase server environment variables."
      );

      return serverError(
        "Server database configuration is incomplete."
      );
    }

    const { searchParams } = new URL(request.url);
    const id = clean(searchParams.get("id"));

    const publicFields = `
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
    `;

    if (id) {
      const { data, error } = await supabase
        .from("vehicle_leads")
        .select(publicFields)
        .eq("id", id)
        .in("status", [
          "new",
          "available",
          "active",
        ])
        .maybeSingle();

      if (error) {
        console.error(
          "Vehicle lookup failed:",
          error
        );

        return serverError(
          "Unable to load this vehicle opportunity."
        );
      }

      if (!data) {
        return NextResponse.json(
          {
            error:
              "Vehicle opportunity not found.",
          },
          { status: 404 }
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

    const { data, error } = await supabase
      .from("vehicle_leads")
      .select(publicFields)
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
        "Vehicle opportunities query failed:",
        error
      );

      return serverError(
        "Unable to load vehicle opportunities."
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
      "Vehicle leads GET error:",
      error
    );

    return serverError(
      "An unexpected error occurred while loading vehicle opportunities."
    );
  }
}

export async function POST(request) {
  try {
    const supabase = getSupabase();

    if (!supabase) {
      console.error(
        "Missing Supabase server environment variables."
      );

      return serverError(
        "Server database configuration is incomplete."
      );
    }

    let body;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          error:
            "Invalid request body.",
        },
        { status: 400 }
      );
    }

    if (
      !body ||
      typeof body !== "object" ||
      Array.isArray(body)
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid vehicle submission.",
        },
        { status: 400 }
      );
    }

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
      condition: clean(body.condition),
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
      source: clean(body.source),
      campaign: clean(body.campaign),
    };

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

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          error:
            "Please complete all required fields.",
          fields: missingFields,
        },
        { status: 400 }
      );
    }

    if (!isValidEmail(lead.email)) {
      return NextResponse.json(
        {
          error:
            "Please provide a valid email address.",
        },
        { status: 400 }
      );
    }

    if (!isValidYear(lead.year)) {
      return NextResponse.json(
        {
          error:
            "Please provide a valid vehicle year.",
        },
        { status: 400 }
      );
    }

    if (lead.name.length > 150) {
      return NextResponse.json(
        {
          error: "Name is too long.",
        },
        { status: 400 }
      );
    }

    if (lead.email.length > 254) {
      return NextResponse.json(
        {
          error:
            "Email address is too long.",
        },
        { status: 400 }
      );
    }

    if (lead.phone.length > 50) {
      return NextResponse.json(
        {
          error:
            "Phone number is too long.",
        },
        { status: 400 }
      );
    }

    if (lead.description.length > 5000) {
      return NextResponse.json(
        {
          error:
            "Vehicle description is too long.",
        },
        { status: 400 }
      );
    }

    const mileage = Number(
      lead.mileage.replace(/[^0-9]/g, "")
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
        { status: 400 }
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
        { status: 400 }
      );
    }

    const vehicleRecord = {
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      postal_code: lead.postal_code,
      year: Number(lead.year),
      make: lead.make,
      model: lead.model,
      trim: lead.trim || null,
      mileage,
      vin: lead.vin || null,
      condition: lead.condition || null,
      selling_timeline:
        lead.selling_timeline || null,
      accident_history:
        lead.accident_history || null,
      description:
        lead.description || null,
      asking_price: askingPrice,
      status: "new",
    };

    const { data, error } = await supabase
      .from("vehicle_leads")
      .insert(vehicleRecord)
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
        "Vehicle lead insert failed:",
        error
      );

      return serverError(
        "We could not submit your vehicle right now. Please try again."
      );
    }

    const opportunityUrl =
      `${SITE_URL}/dealer/leads/${data.id}`;

    const telegramMessage =
      buildTelegramMessage(data);

    let telegramResult = null;

    try {
      telegramResult =
        await sendTelegramMessage({
          message: telegramMessage,
          buttonText:
            "🏪 View Dealer Opportunity",
          buttonUrl: opportunityUrl,
        });
    } catch (telegramError) {
      console.error(
        "Telegram notification error:",
        telegramError
      );

      telegramResult = {
        success: false,
        skipped: false,
      };
    }

    if (
      !telegramResult?.success &&
      !telegramResult?.skipped
    ) {
      console.error(
        "Telegram notification failed:",
        telegramResult?.error
      );
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "Your vehicle has been submitted successfully.",
        leadId: data?.id || null,
        telegramNotified:
          telegramResult?.success === true,
      },
      { status: 201 }
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
      { status: 500 }
    );
  }
}
```

This version keeps your existing API behavior but cleans up the structure and, importantly, retains the exact import that your new Telegram utility should satisfy:

```js
import { sendTelegramMessage } from "@/app/lib/telegram";
```

So make sure these two files exist:

```text
app/
├── api/
│   └── leads/
│       └── route.js
└── lib/
    └── telegram.js
```

And Vercel needs:

```env
NEXT_PUBLIC_SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
NEXT_PUBLIC_SITE_URL=https://northsky-auto.vercel.app
TELEGRAM_BOT_TOKEN=...
TELEGRAM_CHAT_ID=...
```

`SUPABASE_SERVICE_ROLE_KEY` and `TELEGRAM_BOT_TOKEN` must remain **server-only**.
