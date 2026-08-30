import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
export const dynamic = "force-dynamic";
export async function GET(request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!supabaseUrl) {
      console.error(
        "Missing NEXT_PUBLIC_SUPABASE_URL"
      );
      return NextResponse.json(
        {
          error:
            "Supabase URL is not configured.",
        },
        { status: 500 }
      );
    }
    if (!supabaseServiceKey) {
      console.error(
        "Missing SUPABASE_SERVICE_ROLE_KEY"
      );
      return NextResponse.json(
        {
          error:
            "Supabase service role key is not configured.",
        },
        { status: 500 }
      );
    }
    const supabase = createClient(
      supabaseUrl,
      supabaseServiceKey,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );
    const { searchParams } =
      new URL(request.url);
    const requestedLimit = Number(
      searchParams.get("limit") || 100
    );
    const limit = Math.min(
      Math.max(
        Number.isFinite(requestedLimit)
          ? requestedLimit
          : 100,
        1
      ),
      100
    );
    /*
     * Only return active vehicle opportunities.
     *
     * If your leads table does not have a status
     * column, remove the .eq("status", "available")
     * line below.
     */
    const {
      data,
      error,
    } = await supabase
      .from("leads")
      .select(
        `
        id,
        year,
        make,
        model,
        trim,
        mileage,
        condition,
        asking_price,
        selling_timeline,
        postal_code,
        description,
        status,
        created_at
        `
      )
      .eq("status", "available")
      .order("created_at", {
        ascending: false,
      })
      .limit(limit);
    if (error) {
      console.error(
        "Supabase leads query error:",
        error
      );
      return NextResponse.json(
        {
          error:
            "Unable to load vehicle opportunities.",
          details:
            process.env.NODE_ENV === "development"
              ? error.message
              : undefined,
        },
        { status: 500 }
      );
    }
    return NextResponse.json(
      {
        leads: data || [],
        count: data?.length || 0,
      },
      {
        status: 200,
        headers: {
          "Cache-Control":
            "no-store, max-age=0",
        },
      }
    );
  } catch (error) {
    console.error(
      "GET /api/leads error:",
      error
    );
    return NextResponse.json(
      {
        error:
          "An unexpected error occurred while loading vehicle opportunities.",
      },
      { status: 500 }
    );
  }
}