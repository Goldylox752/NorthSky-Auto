```javascript
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
        throw new Error(
          "Please enter your email address."
        );
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
        throw new Error(
          "Please enter a valid email address."
        );
      }

      const supabase = createClient();

      const redirectTo =
        `${window.location.origin}` +
        "/auth/callback?next=/dealer/reset-password";

      const { error } =
        await supabase.auth.resetPasswordForEmail(
          cleanEmail,
          {
            redirectTo,
          }
        );

      if (error) {
        console.error(
          "Supabase password reset error:",
          error
        );

        throw new Error(
          error.message ||
            "Unable to send password reset email."
        );
      }

      setSuccess(true);

      setMessage(
        "If an account exists for that email address, we've sent a password reset link. Please check your inbox."
      );

      setEmail("");
    } catch (error) {
      console.error(
        "Dealer password reset error:",
        error
      );

      setSuccess(false);

      setMessage(
        error?.message ||
          "Unable to send password reset email. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">

      {/* --------------------------------
          HEADER
      -------------------------------- */}

      <header className="bg-slate-950 px-6 py-6 text-white">

        <div className="mx-auto flex max-w-7xl items-center justify-between">

          <Link
            href="/"
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 font-black">
              N
            </div>

            <div>
              <div className="font-black">
                NorthSky Auto
              </div>

              <div className="text-xs text-slate-400">
                Dealer Network
              </div>
            </div>
          </Link>

          <Link
            href="/dealer/login"
            className="rounded-lg border border-white/10 px-4 py-2 text-sm font-bold text-slate-200 transition hover:border-blue-400 hover:text-white"
          >
            Dealer Login
          </Link>

        </div>

      </header>

      {/* --------------------------------
          HERO
      -------------------------------- */}

      <section className="bg-slate-950 text-white">

        <div className="mx-auto max-w-4xl px-6 py-14 text-center md:py-18">

          <Link
            href="/dealer/login"
            className="text-sm font-bold text-blue-400 transition hover:text-blue-300"
          >
            ← Back to Dealer Login
          </Link>

          <p className="mt-8 text-sm font-black uppercase tracking-widest text-blue-400">
            Dealer Portal
          </p>

          <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
            Reset Your Password
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-lg text-slate-300">
            Enter your dealer account email and we'll send
            you a secure password reset link.
          </p>

        </div>

      </section>

      {/* --------------------------------
          RESET FORM
      -------------------------------- */}

      <section className="px-6 py-12 md:py-16">

        <div className="mx-auto max-w-md">

          <div className="rounded-3xl bg-white p-8 shadow-xl ring-1 ring-slate-200">

            {/* LOGO */}

            <div className="text-center">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-2xl font-black text-white shadow-lg shadow-blue-200">
                N
              </div>

              <h2 className="mt-6 text-2xl font-black">
                Forgot Your Password?
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                We'll send instructions to the email
                associated with your dealer account.
              </p>

            </div>

            {/* MESSAGE */}

            {message && (
              <div
                role={success ? "status" : "alert"}
                aria-live="polite"
                className={`mt-6 rounded-xl p-4 text-sm font-semibold ${
                  success
                    ? "bg-green-50 text-green-700 ring-1 ring-green-200"
                    : "bg-red-50 text-red-700 ring-1 ring-red-200"
                }`}
              >
                {message}
              </div>
            )}

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="mt-7 space-y-5"
            >

              <div>

                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-bold text-slate-700"
                >
                  Dealer Account Email
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  placeholder="dealer@example.com"
                  autoComplete="email"
                  maxLength={254}
                  required
                  disabled={loading}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-50"
                />

              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-blue-600 px-6 py-4 font-black text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading
                  ? "Sending Reset Link..."
                  : "Send Reset Link →"}
              </button>

            </form>

            {/* LOGIN */}

            <div className="mt-8 border-t border-slate-200 pt-7 text-center">

              <p className="text-sm text-slate-500">
                Remember your password?
              </p>

              <Link
                href="/dealer/login"
                className="mt-2 inline-block font-bold text-blue-600 hover:underline"
              >
                Return to Dealer Login →
              </Link>

            </div>

          </div>

          {/* CREATE ACCOUNT */}

          <div className="mt-6 text-center">

            <p className="text-sm text-slate-500">
              Don't have a dealer account?
            </p>

            <Link
              href="/dealer/register"
              className="mt-2 inline-block text-sm font-bold text-blue-600 hover:underline"
            >
              Create Dealer Account →
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}
```
