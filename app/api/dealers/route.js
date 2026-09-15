import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";
import { sendTelegramMessage } from "../../../lib/telegram";

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function buildDealerTelegramMessage(dealer) {
  const lines = [
    "<b>🚗 New Dealer Application</b>",
    "",
    `<b>Dealership:</b> ${escapeHtml(dealer.company)}`,
    `<b>Contact:</b> ${escapeHtml(dealer.contact)}`,
    `<b>Email:</b> ${escapeHtml(dealer.email)}`,
  ];

  if (dealer.phone) {
    lines.push(`<b>Phone:</b> ${escapeHtml(dealer.phone)}`);
  }

  if (dealer.website) {
    lines.push(`<b>Website:</b> ${escapeHtml(dealer.website)}`);
  }

  if (dealer.location || dealer.province) {
    const place = [dealer.location, dealer.province]
      .filter(Boolean)
      .join(", ");
    lines.push(`<b>Location:</b> ${escapeHtml(place)}`);
  }

  if (dealer.inventory) {
    lines.push(
      `<b>Monthly sales:</b> ${escapeHtml(dealer.inventory)}`
    );
  }

  if (dealer.license_number) {
    lines.push(
      `<b>License #:</b> ${escapeHtml(dealer.license_number)}`
    );
  }

  if (dealer.years_in_business) {
    lines.push(
      `<b>Years in business:</b> ${escapeHtml(dealer.years_in_business)}`
    );
  }

  if (dealer.brands) {
    lines.push("", `<b>Notes:</b>\n${escapeHtml(dealer.brands)}`);
  }

  lines.push("", `<b>Status:</b> ${escapeHtml(dealer.status || "pending")}`);

  return lines.join("\n");
}

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

    if (licenseNumber) insertPayload.license_number = licenseNumber;
    if (yearsInBusiness) insertPayload.years_in_business = yearsInBusiness;

    let { data, error } = await supabase
      .from("dealers")
      .insert([insertPayload])
      .select();

    // Retry without optional columns if the table doesn't have them yet
    if (
      error &&
      (error.message?.includes("license_number") ||
        error.message?.includes("years_in_business"))
    ) {
      delete insertPayload.license_number;
      delete insertPayload.years_in_business;

      const retry = await supabase
        .from("dealers")
        .insert([insertPayload])
        .select();

      data = retry.data;
      error = retry.error;
    }

    if (error) {
      console.error("Dealer insert error:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    const dealer = Array.isArray(data) ? data[0] : data;

    // Notify via Telegram (non-blocking for the applicant)
    try {
      await sendTelegramMessage({
        message: buildDealerTelegramMessage(dealer || insertPayload),
        buttonText: "Open Admin",
        buttonUrl:
          process.env.NEXT_PUBLIC_SITE_URL
            ? `${process.env.NEXT_PUBLIC_SITE_URL}/admin/login`
            : undefined,
      });
    } catch (notifyError) {
      console.error("Dealer Telegram notification failed:", notifyError);
      // Do not fail the application if Telegram fails
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "Application received. Our team will review it and contact you shortly.",
        dealer: data,
      },
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