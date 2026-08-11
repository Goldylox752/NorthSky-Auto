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
      description,
      asking_price,
    } = body;
    if (!name || !email || !phone) {
      return NextResponse.json(
        {
          error: "Name, email, and phone are required.",
        },
        {
          status: 400,
        }
      );
    }
    const { data, error } = await supabase
      .from("vehicles")
      .insert([
        {
          name,
          email,
          phone,
          postal_code: postal_code || null,
          year: year || null,
          make: make || null,
          model: model || null,
          trim: trim || null,
          mileage: mileage || null,
          vin: vin || null,
          condition: condition || null,
          description: description || null,
          asking_price: asking_price || null,
        },
      ])
      .select();
    if (error) {
      console.error("Vehicle submission error:", error);
      return NextResponse.json(
        {
          error: error.message,
        },
        {
          status: 400,
        }
      );
    }
    return NextResponse.json(
      {
        success: true,
        vehicle: data?.[0] || null,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Vehicle API error:", error);
    return NextResponse.json(
      {
        error: "Server error. Unable to submit vehicle.",
      },
      {
        status: 500,
      }
    );
  }
}