import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

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

    const { data, error } = await supabase
      .from("vehicles")
      .insert([
        {
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
        },
      ])
      .select();

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      vehicle: data,
    });

  } catch (error) {

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );

  }
}