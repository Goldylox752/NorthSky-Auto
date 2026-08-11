import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";

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

    // Required seller information
    if (!name || !email || !phone) {
      return NextResponse.json(
        {
          success: false,
          error: "Name, email, and phone are required.",
        },
        { status: 400 }
      );
    }

    // Required vehicle information
    if (!year || !make || !model || !mileage || !asking_price) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Year, make, model, mileage, and asking price are required.",
        },
        { status: 400 }
      );
    }

    const vehicle = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),

      postal_code: postal_code?.trim() || null,

      year: Number(year),
      make: make.trim(),
      model: model.trim(),
      trim: trim?.trim() || null,

      mileage: Number(mileage),

      vin: vin?.trim().toUpperCase() || null,

      condition: condition || null,
      selling_timeline: selling_timeline || null,
      accident_history: accident_history || null,

      description: description?.trim() || null,

      asking_price: Number(asking_price),

      // New seller submissions wait for admin review
      status: "pending",
    };

    // Validate numbers
    if (
      Number.isNaN(vehicle.year) ||
      Number.isNaN(vehicle.mileage) ||
      Number.isNaN(vehicle.asking_price)
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Year, mileage, and asking price must be valid numbers.",
        },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("vehicles")
      .insert([vehicle])
      .select()
      .single();

    if (error) {
      console.error("Vehicle submission error:", error);

      return NextResponse.json(
        {
          success: false,
          error: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Vehicle submitted successfully.",
        vehicle: data,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Vehicle API error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Server error. Unable to submit vehicle.",
      },
      { status: 500 }
    );
  }
}