import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
export const dynamic = "force-dynamic";
function getSupabaseAdmin() {
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL is not configured."
    );
  }
  if (!serviceRoleKey) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY is not configured."
    );
  }
  return createClient(
    supabaseUrl,
    serviceRoleKey,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}
export async function GET(request) {
  try {
    const supabase = getSupabaseAdmin();
    const { searchParams } =
      new URL(request.url);
    /*
     * Limit results.
     */
    const requestedLimit = Number(
      searchParams.get("limit") || 100
    );
    const limit = Math.min(
      Math.max(
        Number.isFinite(requestedLimit)
          ? Math.floor(requestedLimit)
          : 100,
        1
      ),
      100
    );
    /*
     * Optional status filter.
     *
     * Default:
     * new, available, active
     */
    const requestedStatus =
      searchParams.get("status");
    const allowedStatuses = [
      "new",
      "available",
      "active",
    ];
    const statuses =
      requestedStatus &&
      allowedStatuses.includes(
        requestedStatus.toLowerCase()
      )
        ? [requestedStatus.toLowerCase()]
        : allowedStatuses;
    /*
     * Query leads.
     */
    let query = supabase
      .from("leads")
      .select(
        `
        id,
        year,
        make,
        model,
        trim,
        mileage,
        vin,
        condition,
        asking_price,
        selling_timeline,
        postal_code,
        description,
        status,
        created_at
        `
      )
      .in("status", statuses)
      .order("created_at", {
        ascending: false,
      })
      .limit(limit);
    const {
      data,
      error,
    } = await query;
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
        {
          status: 500,
        }
      );
    }
    const leads = data || [];
    return NextResponse.json(
      {
        leads,
        count: leads.length,
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
          error?.message ||
          "An unexpected error occurred while loading vehicle opportunities.",
      },
      {
        status: 500,
      }
    );
  }
}