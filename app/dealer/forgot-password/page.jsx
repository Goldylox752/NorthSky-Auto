```jsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function DealerForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    if (loading) return;

    setLoading(true);
    setMessage("");
    setSuccess(false);

    try {
      const cleanEmail = email.trim().toLowerCase();

      if (!cleanEmail) {
        throw new Error("Please enter your email address.");
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
        throw new Error("Please enter a valid email address.");
      }

      const supabase = createClient();

      const redirectTo =
        `${window.location.origin}/auth/callback?next=/dealer/reset-password`;

      const { error } = await supabase.auth.resetPasswordForEmail(
        cleanEmail,
        {
          redirectTo,
        }
      );

      if (error) {
        throw error;
      }

      setSuccess(true);
      setMessage(
        "If an account exists for that email address, a password reset link has been sent. Please check your inbox."
      );
    } catch (error) {
      console.error("Password reset error:", error);

      setSuccess(false);
      setMessage(
        error?.message ||
          "Unable to send the password reset email. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <Link
              href="/"
              className="text-2xl font-bold tracking-tight"
            >
              NorthSky Auto
            </Link>

            <h1 className="mt-8 text-3xl font-bold">
              Reset your password
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              Enter the email address associated with your dealer
              account and we&apos;ll send you a secure password reset
              link.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-slate-200"
                >
                  Dealer email
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@dealership.com"
                  required
                  maxLength={254}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                />
              </div>

              {message && (
                <div
                  className={`rounded-xl border px-4 py-3 text-sm leading-6 ${
                    success
                      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                      : "border-red-500/30 bg-red-500/10 text-red-300"
                  }`}
                >
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-sky-500 px-4 py-3 font-semibold text-white transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "Sending reset link..."
                  : "Send reset link"}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-slate-400">
              Remember your password?{" "}
              <Link
                href="/dealer/login"
                className="font-semibold text-sky-400 hover:text-sky-300"
              >
                Sign in
              </Link>
            </div>

            <div className="mt-4 text-center">
              <Link
                href="/dealer/register"
                className="text-sm text-slate-500 transition hover:text-slate-300"
              >
                Create a dealer account
              </Link>
            </div>
          </div>

          <p className="mt-6 text-center text-xs leading-5 text-slate-600">
            NorthSky Auto dealer access is intended for verified
            automotive dealerships.
          </p>
        </div>
      </div>
    </main>
  );
}
```
