import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendTelegramMessage } from "@/lib/telegram";

export const dynamic = "force-dynamic";

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL;

const SUPABASE_SERVICE_ROLE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY;

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://northsky-auto.vercel.app";

const PUBLIC_FIELDS = `
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

const PUBLIC_STATUSES = [
  "new",
  "available",
  "active",
];

function getSupabase() {
  if (
    !SUPABASE_URL ||
    !SUPABASE_SERVICE_ROLE_KEY
  ) {
    return null;
  }

  return createClient(
    SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}

function clean(value) {
  if (
    value === null ||
    value === undefined
  ) {
    return "";
  }

  return String(value).trim();
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    email
  );
}

function isValidYear(year) {
  const numericYear = Number(year);
  const currentYear =
    new Date().getFullYear();

  return (
    Number.isInteger(numericYear) &&
    numericYear >= 1900 &&
    numericYear <= currentYear + 1
  );
}

function parseNumber(value) {
  if (typeof value === "number") {
    return Number.isFinite(value)
      ? value
      : null;
  }

  const cleaned = String(value ?? "")
    .replace(/,/g, "")
    .replace(/[^0-9.]/g, "");

  if (!cleaned) {
    return null;
  }

  const number = Number(cleaned);

  return Number.isFinite(number)
    ? number
    : null;
}

function escapeTelegramHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function formatPublicLead(vehicle) {
  return {
    id: vehicle?.id ?? null,
    year: vehicle?.year ?? null,
    make: vehicle?.make ?? null,
    model: vehicle?.model ?? null,
    trim: vehicle?.trim ?? null,
    mileage: vehicle?.mileage ?? null,
    condition: vehicle?.condition ?? null,
    asking_price:
      vehicle?.asking_price ?? null,
    postal_code:
      vehicle?.postal_code ?? null,
    description:
      vehicle?.description ?? null,
    selling_timeline:
      vehicle?.selling_timeline ?? null,
    accident_history:
      vehicle?.accident_history ?? null,
    status:
      vehicle?.status || "new",
    created_at:
      vehicle?.created_at ?? null,
  };
}

function buildTelegramMessage(vehicle) {
  const vehicleName = [
    vehicle?.year,
    vehicle?.make,
    vehicle?.model,
    vehicle?.trim,
  ]
    .map((value) =>
      escapeTelegramHtml(value)
    )
    .filter(Boolean)
    .join(" ");

  const location =
    escapeTelegramHtml(
      vehicle?.postal_code ||
        "Canada"
    );

  const mileage =
    escapeTelegramHtml(
      vehicle?.mileage
    );

  const price =
    escapeTelegramHtml(
      vehicle?.asking_price
    );

  const condition =
    escapeTelegramHtml(
      vehicle?.condition ||
        "Not provided"
    );

  return [
    "🚗 <b>NEW VEHICLE OPPORTUNITY</b>",
    "",
    `<b>${
      vehicleName ||
      "Vehicle Opportunity"
    }</b>`,
    "",
    `📍 Location: ${location}`,
    `🛣️ Mileage: ${
      mileage || "Not provided"
    } km`,
    `💰 Asking Price: $${
      price ||
      "Contact NorthSky Auto"
    }`,
    `🔧 Condition: ${condition}`,
    "",
    "A new vehicle submission has been received by NorthSky Auto.",
    "",
    "Dealers can review the opportunity through the NorthSky Auto dealer portal.",
  ].join("\n");
}

function errorResponse(
  message,
  status = 500,
  extra = {}
) {
  return NextResponse.json(
    {
      error: message,
      ...extra,
    },
    { status }
  );
}

function noStoreResponse(data, status = 200) {
  return NextResponse.json(
    data,
    {
      status,
      headers: {
        "Cache-Control":
          "no-store, max-age=0",
      },
    }
  );
}

/*
|--------------------------------------------------------------------------
| GET /api/leads
|--------------------------------------------------------------------------
|
| GET /api/leads
| GET /api/leads?limit=25
| GET /api/leads?id=<lead-id>
|
*/

export async function GET(request) {
  try {
    const supabase = getSupabase();

    if (!supabase) {
      console.error(
        "Missing Supabase server environment variables."
      );

      return errorResponse(
        "Server database configuration is incomplete."
      );
    }

    const { searchParams } =
      new URL(request.url);

    const id = clean(
      searchParams.get("id")
    );

    /*
     * ------------------------------------------------------------
     * Single vehicle opportunity
     * ------------------------------------------------------------
     */

    if (id) {
      const {
        data,
        error,
      } = await supabase
        .from("vehicle_leads")
        .select(PUBLIC_FIELDS)
        .eq("id", id)
        .in(
          "status",
          PUBLIC_STATUSES
        )
        .maybeSingle();

      if (error) {
        console.error(
          "Vehicle lookup failed:",
          error
        );

        return errorResponse(
          "Unable to load this vehicle opportunity."
        );
      }

      if (!data) {
        return errorResponse(
          "Vehicle opportunity not found.",
          404
        );
      }

      return noStoreResponse({
        success: true,
        lead: formatPublicLead(data),
      });
    }

    /*
     * ------------------------------------------------------------
     * Vehicle opportunity list
     * ------------------------------------------------------------
     */

    const requestedLimit =
      Number(
        searchParams.get("limit") ||
          100
      );

    const safeRequestedLimit =
      Number.isFinite(
        requestedLimit
      )
        ? Math.floor(
            requestedLimit
          )
        : 100;

    const limit = Math.min(
      Math.max(
        safeRequestedLimit,
        1
      ),
      100
    );

    const {
      data,
      error,
    } = await supabase
      .from("vehicle_leads")
      .select(PUBLIC_FIELDS)
      .in(
        "status",
        PUBLIC_STATUSES
      )
      .order("created_at", {
        ascending: false,
      })
      .limit(limit);

    if (error) {
      console.error(
        "Vehicle opportunities query failed:",
        error
      );

      return errorResponse(
        "Unable to load vehicle opportunities."
      );
    }

    const leads = (
      data || []
    ).map(formatPublicLead);

    return noStoreResponse({
      success: true,
      leads,
      count: leads.length,
    });
  } catch (error) {
    console.error(
      "Vehicle leads GET error:",
      error
    );

    return errorResponse(
      "An unexpected error occurred while loading vehicle opportunities."
    );
  }
}

/*
|--------------------------------------------------------------------------
| POST /api/leads
|--------------------------------------------------------------------------
*/

export async function POST(request) {
  try {
    const supabase = getSupabase();

    if (!supabase) {
      console.error(
        "Missing Supabase server environment variables."
      );

      return errorResponse(
        "Server database configuration is incomplete."
      );
    }

    /*
     * ------------------------------------------------------------
     * Parse request body
     * ------------------------------------------------------------
     */

    let body;

    try {
      body = await request.json();
    } catch {
      return errorResponse(
        "Invalid request body.",
        400
      );
    }

    if (
      !body ||
      typeof body !== "object" ||
      Array.isArray(body)
    ) {
      return errorResponse(
        "Invalid vehicle submission.",
        400
      );
    }

    /*
     * ------------------------------------------------------------
     * Clean incoming values
     * ------------------------------------------------------------
     */

    const lead = {
      name: clean(body.name),

      email: clean(
        body.email
      ).toLowerCase(),

      phone: clean(
        body.phone
      ),

      postal_code: clean(
        body.postal_code
      ).toUpperCase(),

      year: clean(
        body.year
      ),

      make: clean(
        body.make
      ),

      model: clean(
        body.model
      ),

      trim: clean(
        body.trim
      ),

      mileage: clean(
        body.mileage
      ),

      vin: clean(
        body.vin
      ).toUpperCase(),

      condition: clean(
        body.condition
      ),

      selling_timeline:
        clean(
          body.selling_timeline
        ),

      accident_history:
        clean(
          body.accident_history
        ),

      description: clean(
        body.description
      ),

      asking_price: clean(
        body.asking_price
      ),

      source: clean(
        body.source
      ),

      campaign: clean(
        body.campaign
      ),
    };

    /*
     * ------------------------------------------------------------
     * Required fields
     * ------------------------------------------------------------
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

    if (
      missingFields.length > 0
    ) {
      return errorResponse(
        "Please complete all required fields.",
        400,
        {
          fields: missingFields,
        }
      );
    }

    /*
     * ------------------------------------------------------------
     * Validate email
     * ------------------------------------------------------------
     */

    if (
      !isValidEmail(
        lead.email
      )
    ) {
      return errorResponse(
        "Please provide a valid email address.",
        400
      );
    }

    /*
     * ------------------------------------------------------------
     * Validate year
     * ------------------------------------------------------------
     */

    if (
      !isValidYear(
        lead.year
      )
    ) {
      return errorResponse(
        "Please provide a valid vehicle year.",
        400
      );
    }

    /*
     * ------------------------------------------------------------
     * Validate field lengths
     * ------------------------------------------------------------
     */

    const maxLengths = {
      name: 150,
      email: 254,
      phone: 50,
      postal_code: 20,
      make: 100,
      model: 100,
      trim: 150,
      vin: 50,
      condition: 100,
      selling_timeline: 100,
      accident_history: 500,
      description: 5000,
      source: 100,
      campaign: 150,
    };

    for (const [
      field,
      maxLength,
    ] of Object.entries(
      maxLengths
    )) {
      if (
        lead[field] &&
        lead[field].length >
          maxLength
      ) {
        return errorResponse(
          `${field.replace(
            /_/g,
            " "
          )} is too long.`,
          400
        );
      }
    }

    /*
     * ------------------------------------------------------------
     * Parse numeric fields
     * ------------------------------------------------------------
     */

    const mileage =
      parseNumber(
        lead.mileage
      );

    const askingPrice =
      parseNumber(
        lead.asking_price
      );

    if (
      mileage === null ||
      mileage < 0
    ) {
      return errorResponse(
        "Please provide a valid mileage.",
        400
      );
    }

    if (
      askingPrice === null ||
      askingPrice < 0
    ) {
      return errorResponse(
        "Please provide a valid asking price.",
        400
      );
    }

    /*
     * ------------------------------------------------------------
     * Build database record
     * ------------------------------------------------------------
     */

    const vehicleRecord = {
      name: lead.name,
      email: lead.email,
      phone: lead.phone,

      postal_code:
        lead.postal_code,

      year: Number(
        lead.year
      ),

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

      source:
        lead.source || null,

      campaign:
        lead.campaign || null,

      status: "new",
    };

    /*
     * ------------------------------------------------------------
     * Insert vehicle lead
     * ------------------------------------------------------------
     */

    const {
      data,
      error,
    } = await supabase
      .from("vehicle_leads")
      .insert(
        vehicleRecord
      )
      .select(PUBLIC_FIELDS)
      .single();

    if (error) {
      console.error(
        "Vehicle lead insert failed:",
        error
      );

      return errorResponse(
        "We could not submit your vehicle right now. Please try again."
      );
    }

    /*
     * ------------------------------------------------------------
     * Build dealer opportunity URL
     * ------------------------------------------------------------
     */

    const opportunityUrl =
      `${SITE_URL}/dealer/leads/${data.id}`;

    /*
     * ------------------------------------------------------------
     * Telegram notification
     * ------------------------------------------------------------
     */

    let telegramResult = {
      success: false,
      skipped: true,
    };

    try {
      telegramResult =
        await sendTelegramMessage({
          message:
            buildTelegramMessage(
              data
            ),

          buttonText:
            "🏪 View Dealer Opportunity",

          buttonUrl:
            opportunityUrl,
        });
    } catch (telegramError) {
      console.error(
        "Telegram notification error:",
        telegramError
      );

      telegramResult = {
        success: false,
        skipped: false,
        error:
          telegramError?.message ||
          "Telegram notification failed.",
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

    /*
     * ------------------------------------------------------------
     * Success response
     * ------------------------------------------------------------
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

    return errorResponse(
      "Unable to process your vehicle submission."
    );
  }
}
