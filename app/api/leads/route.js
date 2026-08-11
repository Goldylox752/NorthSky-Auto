import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);
const REQUIRED_FIELDS = [
  "name",
  "email",
  "phone",
  "postal_code",
  "year",
  "make",
  "model",
];
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
  const currentYear =
    new Date().getFullYear() + 1;
  const numericYear = Number(year);
  return (
    Number.isInteger(numericYear) &&
    numericYear >= 1900 &&
    numericYear <= currentYear
  );
}
export async function POST(request) {
  try {
    /*
    |--------------------------------------------------------------------------
    | Parse request
    |--------------------------------------------------------------------------
    */
    const body = await request.json();
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        {
          error: "Invalid submission.",
        },
        {
          status: 400,
        }
      );
    }
    /*
    |--------------------------------------------------------------------------
    | Clean submitted fields
    |--------------------------------------------------------------------------
    */
    const lead = {
      name: clean(body.name),
      email: clean(body.email).toLowerCase(),
      phone: clean(body.phone),
      postal_code: clean(body.postal_code).toUpperCase(),
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
      description: clean(body.description),
      asking_price: clean(body.asking_price),
    };
    /*
    |--------------------------------------------------------------------------
    | Required field validation
    |--------------------------------------------------------------------------
    */
    const missingFields =
      REQUIRED_FIELDS.filter(
        (field) => !lead[field]
      );
    if (missingFields.length > 0) {
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
    | Email validation
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
    | Year validation
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
    | Basic input limits
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
    | Prepare database record
    |--------------------------------------------------------------------------
    |
    | This matches the vehicle fields used by the NorthSky Auto
    | seller submission form.
    |
    */
    const vehicleRecord = {
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      postal_code: lead.postal_code,
      year: Number(lead.year),
      make: lead.make,
      model: lead.model,
      trim: lead.trim || null,
      mileage: lead.mileage
        ? Number(
            lead.mileage.replace(
              /[^0-9]/g,
              ""
            )
          )
        : null,
      vin: lead.vin || null,
      condition:
        lead.condition || null,
      selling_timeline:
        lead.selling_timeline || null,
      accident_history:
        lead.accident_history || null,
      description:
        lead.description || null,
      asking_price: lead.asking_price
        ? Number(
            lead.asking_price.replace(
              /[^0-9.]/g,
              ""
            )
          )
        : null,
      status: "new",
    };
    /*
    |--------------------------------------------------------------------------
    | Insert vehicle lead
    |--------------------------------------------------------------------------
    */
    const { data, error } =
      await supabase
        .from("vehicle_leads")
        .insert(vehicleRecord)
        .select("id")
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
    | Success
    |--------------------------------------------------------------------------
    */
    return NextResponse.json(
      {
        success: true,
        message:
          "Your vehicle has been submitted successfully.",
        leadId: data?.id || null,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "Vehicle lead API error:",
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