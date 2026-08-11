import { NextResponse } from "next/server";
import { supabase } from "../../../../../lib/supabase";
export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const allowedStatuses = [
      "pending",
      "review",
      "approved",
      "rejected",
    ];
    if (!allowedStatuses.includes(body.status)) {
      return NextResponse.json(
        {
          error: "Invalid vehicle status.",
        },
        {
          status: 400,
        }
      );
    }
    const { data, error } = await supabase
      .from("vehicles")
      .update({
        status: body.status,
      })
      .eq("id", id)
      .select()
      .single();
    if (error) {
      console.error("Vehicle status update error:", error);
      return NextResponse.json(
        {
          error: error.message,
        },
        {
          status: 400,
        }
      );
    }
    return NextResponse.json({
      success: true,
      vehicle: data,
    });
  } catch (error) {
    console.error("Admin vehicle status error:", error);
    return NextResponse.json(
      {
        error: "Unable to update vehicle status.",
      },
      {
        status: 500,
      }
    );
  }
}