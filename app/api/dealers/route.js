import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";

export async function POST(request) {
  try {
    if (!supabase) {
      return NextResponse.json(
        { error: "Database is not configured." },
        { status: 503 }
      );
    }

    const body = await request.json();

    const company = String(body.company || body.dealershipName || "").trim();
    const contact = String(body.contact || body.contactName || "").trim();
    const email = String(body.email || "").trim().toLowerCase();
    const phone = String(body.phone || "").trim() || null;
    const website = String(body.website || "").trim() || null;
    const location = String(body.location || body.city || "").trim() || null;
    const province = String(body.province || "").trim() || null;
    const inventory =
      String(body.inventory || body.monthlySales || "").trim() || null;
    const brands = String(body.brands || body.notes || "").trim() || null;
    const licenseNumber = String(body.licenseNumber || "").trim() || null;
    const yearsInBusiness =
      String(body.yearsInBusiness || "").trim() || null;

    if (!company || !contact || !email) {
      return NextResponse.json(
        { error: "Company, contact, and email are required." },
        { status: 400 }
      );
    }

    // Basic email check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const insertPayload = {
      company,
      contact,
      email,
      phone,
      website,
      location,
      province,
      inventory,
      brands,
      status: "pending",
    };

    // Optional columns — only include if your table has them
    if (licenseNumber) insertPayload.license_number = licenseNumber;
    if (yearsInBusiness) insertPayload.years_in_business = yearsInBusiness;

    const { data, error } = await supabase
      .from("dealers")
      .insert([insertPayload])
      .select();

    if (error) {
      console.error("Dealer insert error:", error);

      // If optional columns don't exist, retry without them
      if (
        error.message?.includes("license_number") ||
        error.message?.includes("years_in_business")
      ) {
        delete insertPayload.license_number;
        delete insertPayload.years_in_business;

        const retry = await supabase
          .from("dealers")
          .insert([insertPayload])
          .select();

        if (retry.error) {
          return NextResponse.json(
            { error: retry.error.message },
            { status: 400 }
          );
        }

        return NextResponse.json(
          { success: true, dealer: retry.data },
          { status: 201 }
        );
      }

      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { success: true, dealer: data },
      { status: 201 }
    );
  } catch (error) {
    console.error("Dealer API error:", error);
    return NextResponse.json(
      { error: "Server error. Unable to create dealer application." },
      { status: 500 }
    );
  }
}