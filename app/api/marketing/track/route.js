import { NextResponse } from "next/server";
import { supabase } from "../../../../lib/supabase";

export const dynamic = "force-dynamic";

const ALLOWED_EVENTS = new Set([
  "telegram_visit",
  "seller_cta_click",
  "dealer_cta_click",
  "seller_submission",
  "dealer_signup",
  "checkout_started",
  "subscription_created",
]);

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      source = "unknown",
      campaign = "unknown",
      event,
      page = null,
      session_id = null,
      metadata = {},
    } = body || {};

    if (!event || !ALLOWED_EVENTS.has(event)) {
      return NextResponse.json(
        { error: "Invalid marketing event." },
        { status: 400 }
      );
    }

    if (typeof source !== "string" || source.length > 100) {
      return NextResponse.json(
        { error: "Invalid source." },
        { status: 400 }
      );
    }

    if (typeof campaign !== "string" || campaign.length > 150) {
      return NextResponse.json(
        { error: "Invalid campaign." },
        { status: 400 }
      );
    }

    if (page !== null && (typeof page !== "string" || page.length > 500)) {
      return NextResponse.json(
        { error: "Invalid page." },
        { status: 400 }
      );
    }

    if (
      session_id !== null &&
      (typeof session_id !== "string" || session_id.length > 150)
    ) {
      return NextResponse.json(
        { error: "Invalid session ID." },
        { status: 400 }
      );
    }

    if (
      metadata === null ||
      typeof metadata !== "object" ||
      Array.isArray(metadata)
    ) {
      return NextResponse.json(
        { error: "Invalid metadata." },
        { status: 400 }
      );
    }

    const safeMetadata = Object.fromEntries(
      Object.entries(metadata).slice(0, 25)
    );

    const { data, error } = await supabase
      .from("marketing_events")
      .insert({
        source: source.trim().toLowerCase(),
        campaign: campaign.trim().toLowerCase(),
        event,
        page,
        session_id,
        metadata: safeMetadata,
      })
      .select("id")
      .single();

    if (error) {
      console.error("Marketing event insert error:", error);

      return NextResponse.json(
        { error: "Unable to record marketing event." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      event_id: data.id,
    });
  } catch (error) {
    console.error("Marketing tracking error:", error);

    return NextResponse.json(
      { error: "Unable to process marketing event." },
      { status: 500 }
    );
  }
}