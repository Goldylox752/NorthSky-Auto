import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
export async function GET(request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = requestUrl.searchParams.get("next");
  // Where the user should go after successful authentication
  const redirectPath =
    next && next.startsWith("/")
      ? next
      : "/dealer/dashboard";
  if (!code) {
    return NextResponse.redirect(
      new URL(
        "/dealer/login?error=missing_code",
        requestUrl.origin
      )
    );
  }
  try {
    const supabase = await createClient();
    const { error } =
      await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      console.error(
        "Supabase auth callback error:",
        error
      );
      return NextResponse.redirect(
        new URL(
          "/dealer/login?error=auth_callback_failed",
          requestUrl.origin
        )
      );
    }
    return NextResponse.redirect(
      new URL(
        redirectPath,
        requestUrl.origin
      )
    );
  } catch (error) {
    console.error(
      "Auth callback server error:",
      error
    );
    return NextResponse.redirect(
      new URL(
        "/dealer/login?error=server_error",
        requestUrl.origin
      )
    );
  }
}