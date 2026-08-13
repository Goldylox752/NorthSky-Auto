"use client";

import Link from "next/link";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
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

      if (cleanEmail.length > 254) {
        throw new Error("Please enter a valid email address.");
      }

      const validEmail =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail);

      if (!validEmail) {
        throw new Error("Please enter a valid email address.");
      }

      const supabase = createClient();

      const redirectUrl =
        `${window.location.origin}/dealer/reset-password`;

      const { error } =
        await supabase.auth.resetPasswordForEmail(
          cleanEmail,
          {
            redirectTo: redirectUrl,
          }
        );

      if (error) {
        console.error(
          "Supabase password reset error:",
          error
        );

        throw new Error(
          error.message ||
            "Unable to send the password reset email."
        );
      }

      setSuccess(true);

      setMessage(
        "If an account exists for this email address, a password reset link has been sent. Please check your inbox."
      );

      setEmail("");
    } catch (error) {
      console.error(
        "Forgot password error:",
        error
      );

      setSuccess(false);

      setMessage(
        error?.message ||
          "Unable to process your request. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">

      {/* HERO */}

      <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white">

        <div className="mx-auto max-w-5xl px-6 py-16 text-center md:py-20">

          <Link
            href="/"
            className="text-sm font-bold text-blue-300 transition hover:text-white"
          >
            ← NorthSky Auto
          </Link>

          <p className="mt-8 text-sm font-black uppercase tracking-[0.2em] text-blue-300">
            Dealer Portal
          </p>

          <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
            Reset Your Password
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            Enter the email address associated with your
            NorthSky Auto dealer account.
          </p>

        </div>

      </section>


      {/* FORM */}

      <section className="px-6 py-12 md:py-16">

        <div className="mx-auto max-w-md">

          <div className="rounded-3xl bg-white p-6 shadow-xl shadow-slate-200/50 ring-1 ring-slate-200 sm:p-8">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-xl font-black text-white">
              N
            </div>

            <h2 className="mt-6 text-2xl font-black">
              Forgot your password?
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              We'll send instructions to reset your
              dealer account password.
            </p>


            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
            >

              <div>

                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-bold text-slate-700"
                >
                  Email Address
                </label>

                <input
                  id="email"
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
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 disabled:bg-slate-50"
                />

              </div>


              {message && (
                <div
                  role="alert"
                  aria-live="polite"
                  className={`rounded-xl p-4 text-sm font-semibold ${
                    success
                      ? "bg-green-50 text-green-700 ring-1 ring-green-200"
                      : "bg-red-50 text-red-700 ring-1 ring-red-200"
                  }`}
                >
                  {message}
                </div>
              )}


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


            <div className="mt-8 border-t border-slate-200 pt-7 text-center">

              <p className="text-sm text-slate-500">
                Remember your password?
              </p>

              <Link
                href="/dealer/login"
                className="mt-2 inline-flex font-bold text-blue-600 hover:text-blue-700 hover:underline"
              >
                Back to Dealer Login →
              </Link>

            </div>

          </div>


          <div className="mt-6 text-center">

            <Link
              href="/"
              className="text-sm font-semibold text-slate-500 hover:text-slate-900"
            >
              ← Back to NorthSky Auto
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}
