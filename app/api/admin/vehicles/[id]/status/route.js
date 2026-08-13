import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const ALLOWED_STATUSES = [
  "pending",
  "review",
  "approved",
  "rejected",
];

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        {
          error: "Vehicle ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    const body = await request.json();

    const status = String(
      body?.status || ""
    ).trim().toLowerCase();

    if (!ALLOWED_STATUSES.includes(status)) {
      return NextResponse.json(
        {
          error: "Invalid vehicle status.",
          allowedStatuses: ALLOWED_STATUSES,
        },
        {
          status: 400,
        }
      );
    }

    const supabase = await createClient();

    const { data, error } = await supabase
      .from("vehicles")
      .update({
        status,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error(
        "Vehicle status update error:",
        error
      );

      return NextResponse.json(
        {
          error:
            "Unable to update vehicle status.",
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json({
      success: true,
      vehicle: data,
    });
  } catch (error) {
    console.error(
      "Admin vehicle status error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Unable to update vehicle status.",
      },
      {
        status: 500,
      }
    );
  }
}
