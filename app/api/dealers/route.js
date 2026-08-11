import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";
export async function POST(request) {
  try {
    const body = await request.json();
    const {
      company,
      contact,
      email,
      phone,
      website,
      location,
      province,
      inventory,
      brands,
    } = body;
    if (!company || !contact || !email) {
      return NextResponse.json(
        {
          error: "Company, contact, and email are required.",
        },
        {
          status: 400,
        }
      );
    }
    const { data, error } = await supabase
      .from("dealers")
      .insert([
        {
          company,
          contact,
          email,
          phone: phone || null,
          website: website || null,
          location: location || null,
          province: province || null,
          inventory: inventory || null,
          brands: brands || null,
        },
      ])
      .select();
    if (error) {
      console.error("Dealer insert error:", error);
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
        dealer: data,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Dealer API error:", error);
    return NextResponse.json(
      {
        error: "Server error. Unable to create dealer application.",
      },
      {
        status: 500,
      }
    );
  }
}