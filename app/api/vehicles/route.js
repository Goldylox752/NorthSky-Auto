import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";
/*
|--------------------------------------------------------------------------
| GET /api/vehicles
|--------------------------------------------------------------------------
| Returns vehicle opportunities that have been approved for the
| dealer marketplace.
|--------------------------------------------------------------------------
*/
export async function GET() {
  try {
    const { data, error } = await supabase
      .from("vehicles")
      .select("*")
      .eq("status", "available")
      .order("created_at", {
        ascending: false,
      });
    if (error) {
      console.error("Vehicle fetch error:", error);
      return NextResponse.json(
        {
          success: false,
          error: "Unable to load vehicle opportunities.",
        },
        { status: 500 }
      );
    }
    return NextResponse.json({
      success: true,
      vehicles: data || [],
    });
  } catch (error) {
    console.error("Vehicle GET API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Server error. Unable to load vehicles.",
      },
      { status: 500 }
    );
  }
}
/*
|--------------------------------------------------------------------------
| POST /api/vehicles
|--------------------------------------------------------------------------
| Creates a new seller vehicle submission.
|
| New submissions remain "pending" until approved.
|--------------------------------------------------------------------------
*/
export async function POST(request) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      postal_code,
      year,
      make,
      model,
      trim,
      mileage,
      vin,
      condition,
      selling_timeline,
      accident_history,
      description,
      asking_price,
    } = body;
    /*
    |--------------------------------------------------------------------------
    | Required seller information
    |--------------------------------------------------------------------------
    */
    if (!name || !email || !phone) {
      return NextResponse.json(
        {
          success: false,
          error: "Name, email, and phone are required.",
        },
        { status: 400 }
      );
    }
    /*
    |--------------------------------------------------------------------------
    | Required vehicle information
    |--------------------------------------------------------------------------
    */
    if (
      !year ||
      !make ||
      !model ||
      mileage === undefined ||
      mileage === null ||
      asking_price === undefined ||
      asking_price === null
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Year, make, model, mileage, and asking price are required.",
        },
        { status: 400 }
      );
    }
    /*
    |--------------------------------------------------------------------------
    | Normalize values
    |--------------------------------------------------------------------------
    */
    const vehicle = {
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      phone: String(phone).trim(),
      postal_code:
        postal_code
          ? String(postal_code).trim().toUpperCase()
          : null,
      year: Number(year),
      make: String(make).trim(),
      model: String(model).trim(),
      trim:
        trim
          ? String(trim).trim()
          : null,
      mileage: Number(mileage),
      vin:
        vin
          ? String(vin).trim().toUpperCase()
          : null,
      condition:
        condition
          ? String(condition).trim()
          : null,
      selling_timeline:
        selling_timeline
          ? String(selling_timeline).trim()
          : null,
      accident_history:
        accident_history
          ? String(accident_history).trim()
          : null,
      description:
        description
          ? String(description).trim()
          : null,
      asking_price: Number(asking_price),
      /*
      |--------------------------------------------------------------------------
      | Marketplace workflow
      |--------------------------------------------------------------------------
      |
      | New submissions must be reviewed before dealers can see them.
      |
      */
      status: "pending",
    };
    /*
    |--------------------------------------------------------------------------
    | Validate numeric values
    |--------------------------------------------------------------------------
    */
    if (
      !Number.isInteger(vehicle.year) ||
      vehicle.year < 1900 ||
      vehicle.year > new Date().getFullYear() + 1
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Please provide a valid vehicle year.",
        },
        { status: 400 }
      );
    }
    if (
      !Number.isFinite(vehicle.mileage) ||
      vehicle.mileage < 0
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Please provide valid mileage.",
        },
        { status: 400 }
      );
    }
    if (
      !Number.isFinite(vehicle.asking_price) ||
      vehicle.asking_price < 0
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Please provide a valid asking price.",
        },
        { status: 400 }
      );
    }
    /*
    |--------------------------------------------------------------------------
    | Insert vehicle
    |--------------------------------------------------------------------------
    */
    const {
      data,
      error,
    } = await supabase
      .from("vehicles")
      .insert([vehicle])
      .select()
      .single();
    if (error) {
      console.error(
        "Vehicle submission error:",
        error
      );
      return NextResponse.json(
        {
          success: false,
          error:
            "Unable to save vehicle submission.",
        },
        { status: 500 }
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
          "Vehicle submitted successfully and is awaiting review.",
        vehicle: data,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "Vehicle API error:",
      error
    );
    return NextResponse.json(
      {
        success: false,
        error:
          "Server error. Unable to submit vehicle.",
      },
      { status: 500 }
    );
  }
}