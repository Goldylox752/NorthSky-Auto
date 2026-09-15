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

function formatPrice(value) {
  const num = Number(value);
  if (!Number.isFinite(num)) return "—";
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format(num);
}

function formatMileage(value) {
  const num = Number(value);
  if (!Number.isFinite(num)) return "—";
  return `${new Intl.NumberFormat("en-CA").format(num)} km`;
}

function buildVehicleTelegramMessage(vehicle) {
  const title = [vehicle.year, vehicle.make, vehicle.model, vehicle.trim]
    .filter(Boolean)
    .join(" ");

  const lines = [
    "<b>🚙 New Vehicle Submission</b>",
    "",
    `<b>Vehicle:</b> ${escapeHtml(title)}`,
    `<b>Mileage:</b> ${escapeHtml(formatMileage(vehicle.mileage))}`,
    `<b>Asking:</b> ${escapeHtml(formatPrice(vehicle.asking_price))}`,
  ];

  if (vehicle.condition) {
    lines.push(`<b>Condition:</b> ${escapeHtml(vehicle.condition)}`);
  }

  if (vehicle.vin) {
    lines.push(`<b>VIN:</b> ${escapeHtml(vehicle.vin)}`);
  }

  if (vehicle.postal_code) {
    lines.push(`<b>Postal:</b> ${escapeHtml(vehicle.postal_code)}`);
  }

  if (vehicle.selling_timeline) {
    lines.push(
      `<b>Timeline:</b> ${escapeHtml(vehicle.selling_timeline)}`
    );
  }

  if (vehicle.accident_history) {
    lines.push(
      `<b>Accidents:</b> ${escapeHtml(vehicle.accident_history)}`
    );
  }

  lines.push(
    "",
    `<b>Seller:</b> ${escapeHtml(vehicle.name)}`,
    `<b>Email:</b> ${escapeHtml(vehicle.email)}`,
    `<b>Phone:</b> ${escapeHtml(vehicle.phone)}`
  );

  if (vehicle.description) {
    const short =
      vehicle.description.length > 280
        ? `${vehicle.description.slice(0, 280)}…`
        : vehicle.description;
    lines.push("", `<b>Notes:</b>\n${escapeHtml(short)}`);
  }

  lines.push("", `<b>Status:</b> ${escapeHtml(vehicle.status || "pending")}`);

  return lines.join("\n");
}

/*
|--------------------------------------------------------------------------
| GET /api/vehicles
|--------------------------------------------------------------------------
*/
export async function GET() {
  try {
    if (!supabase) {
      return NextResponse.json(
        { success: false, error: "Database is not configured." },
        { status: 503 }
      );
    }

    const { data, error } = await supabase
      .from("vehicles")
      .select("*")
      .eq("status", "available")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Vehicle fetch error:", error);
      return NextResponse.json(
        { success: false, error: "Unable to load vehicle opportunities." },
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
      { success: false, error: "Server error. Unable to load vehicles." },
      { status: 500 }
    );
  }
}

/*
|--------------------------------------------------------------------------
| POST /api/vehicles
|--------------------------------------------------------------------------
*/
export async function POST(request) {
  try {
    if (!supabase) {
      return NextResponse.json(
        { success: false, error: "Database is not configured." },
        { status: 503 }
      );
    }

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

    if (!name || !email || !phone) {
      return NextResponse.json(
        { success: false, error: "Name, email, and phone are required." },
        { status: 400 }
      );
    }

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

    const vehicle = {
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      phone: String(phone).trim(),
      postal_code: postal_code
        ? String(postal_code).trim().toUpperCase()
        : null,
      year: Number(year),
      make: String(make).trim(),
      model: String(model).trim(),
      trim: trim ? String(trim).trim() : null,
      mileage: Number(mileage),
      vin: vin ? String(vin).trim().toUpperCase() : null,
      condition: condition ? String(condition).trim() : null,
      selling_timeline: selling_timeline
        ? String(selling_timeline).trim()
        : null,
      accident_history: accident_history
        ? String(accident_history).trim()
        : null,
      description: description ? String(description).trim() : null,
      asking_price: Number(asking_price),
      status: "pending",
    };

    if (
      !Number.isInteger(vehicle.year) ||
      vehicle.year < 1900 ||
      vehicle.year > new Date().getFullYear() + 1
    ) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid vehicle year." },
        { status: 400 }
      );
    }

    if (!Number.isFinite(vehicle.mileage) || vehicle.mileage < 0) {
      return NextResponse.json(
        { success: false, error: "Please provide valid mileage." },
        { status: 400 }
      );
    }

    if (!Number.isFinite(vehicle.asking_price) || vehicle.asking_price < 0) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid asking price." },
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
        { success: false, error: "Unable to save vehicle submission." },
        { status: 500 }
      );
    }

    // Telegram notify (does not block the seller on failure)
    try {
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
      await sendTelegramMessage({
        message: buildVehicleTelegramMessage(data || vehicle),
        buttonText: "Review Submission",
        buttonUrl: siteUrl
          ? `${siteUrl}/admin/login`
          : undefined,
      });
    } catch (notifyError) {
      console.error("Vehicle Telegram notification failed:", notifyError);
    }

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
    console.error("Vehicle API error:", error);
    return NextResponse.json(
      { success: false, error: "Server error. Unable to submit vehicle." },
      { status: 500 }
    );
  }
}