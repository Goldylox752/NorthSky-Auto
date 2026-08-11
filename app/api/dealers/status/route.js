import { NextResponse } from "next/server";
import { supabase } from "../../../../lib/supabase";
export async function PATCH(request) {
  try {
    const body = await request.json();
    const { id, status } = body;
    if (!id) {
      return NextResponse.json(
        {
          error: "Dealer ID is required.",
        },
        {
          status: 400,
        }
      );
    }
    const allowedStatuses = [
      "pending",
      "approved",
      "rejected",
    ];
    if (!status || !allowedStatuses.includes(status)) {
      return NextResponse.json(
        {
          error: "Invalid dealer status.",
        },
        {
          status: 400,
        }
      );
    }
    const { data, error } = await supabase
      .from("dealers")
      .update({
        status,
      })
      .eq("id", id)
      .select();
    if (error) {
      console.error("Dealer status update error:", error);
      return NextResponse.json(
        {
          error: error.message,
        },
        {
          status: 400,
        }
      );
    }
    if (!data || data.length === 0) {
      return NextResponse.json(
        {
          error: "Dealer not found.",
        },
        {
          status: 404,
        }
      );
    }
    return NextResponse.json({
      success: true,
      dealer: data[0],
    });
  } catch (error) {
    console.error("Dealer status API error:", error);
    return NextResponse.json(
      {
        error: "Server error. Unable to update dealer status.",
      },
      {
        status: 500,
      }
    );
  }
}