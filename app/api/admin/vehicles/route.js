import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
export const dynamic = "force-dynamic";
export async function POST(request) {
  try {
    const supabase = await createClient();
    // Check authentication
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "You must be logged in.",
        },
        { status: 401 }
      );
    }
    // Read request
    const body = await request.json();
    const vehicleId = body.vehicle_id;
    const action = body.action;
    if (!vehicleId) {
      return NextResponse.json(
        {
          success: false,
          error: "vehicle_id is required.",
        },
        { status: 400 }
      );
    }
    if (
      action !== "approve" &&
      action !== "reject"
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "action must be approve or reject.",
        },
        { status: 400 }
      );
    }
    const newStatus =
      action === "approve"
        ? "available"
        : "rejected";
    // Update vehicle
    const {
      data,
      error,
    } = await supabase
      .from("vehicles")
      .update({
        status: newStatus,
      })
      .eq("id", vehicleId)
      .select()
      .single();
    if (error) {
      console.error(
        "Vehicle update failed:",
        error
      );
      return NextResponse.json(
        {
          success: false,
          error: error.message,
        },
        { status: 500 }
      );
    }
    return NextResponse.json({
      success: true,
      message:
        action === "approve"
          ? "Vehicle approved."
          : "Vehicle rejected.",
      vehicle: data,
    });
  } catch (error) {
    console.error(
      "Admin vehicle API error:",
      error
    );
    return NextResponse.json(
      {
        success: false,
        error: "Server error.",
      },
      { status: 500 }
    );
  }
}