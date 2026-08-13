"use client";

import Link from "next/link";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function DealerLoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (loading) return;

    setLoading(true);
    setMessage("");
    setSuccess(false);

    try {
      const email = form.email.trim().toLowerCase();
      const password = form.password;

      if (!email) {
        throw new Error("Please enter your email address.");
      }

      if (!password) {
        throw new Error("Please enter your password.");
      }

      const supabase = createClient();

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Supabase dealer login error:", error);

        if (
          error.message?.toLowerCase().includes("invalid login")
        ) {
          throw new Error(
            "Invalid email or password. Please check your credentials and try again."
          );
        }

        throw new Error(
          error.message || "Unable to sign in. Please try again."
        );
      }

      setSuccess(true);
      setMessage("Login successful. Redirecting...");

      /*
       * Give Supabase a moment to persist the browser session
       * before navigating to the protected dealer portal.
       */
      setTimeout(() => {
        window.location.assign("/dealer/dashboard");
      }, 300);
    } catch (error) {
      console.error("Dealer login error:", error);

      setSuccess(false);

      setMessage(
        error?.message ||
          "Unable to sign in. Please try again."
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
            className="inline-flex items-center text-sm font-bold text-blue-300 transition hover:text-white"
          >
            ← NorthSky Auto
          </Link>

          <p className="mt-8 text-sm font-black uppercase tracking-[0.2em] text-blue-300">
            Dealer Portal
          </p>

          <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
            Welcome Back
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            Sign in to manage your dealership account and
            access vehicle acquisition opportunities.
          </p>
        </div>
      </section>

      {/* LOGIN */}
      <section className="px-6 py-12 md:py-16">
        <div className="mx-auto max-w-md">
          <div className="rounded-3xl bg-white p-6 shadow-xl shadow-slate-200/50 ring-1 ring-slate-200 sm:p-8">
            <div className="mb-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-xl font-black text-white shadow-lg shadow-blue-200">
                N
              </div>

              <h2 className="mt-6 text-2xl font-black text-slate-900">
                Dealer Sign In
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Sign in to access your NorthSky Auto dealer
                account.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              {/* EMAIL */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-bold text-slate-700"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  maxLength={254}
                  autoComplete="email"
                  inputMode="email"
                  placeholder="dealer@example.com"
                  disabled={loading}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-50"
                />
              </div>

              {/* PASSWORD */}
              <div>
                <div className="mb-2 flex items-center justify-between gap-4">
                  <label
                    htmlFor="password"
                    className="block text-sm font-bold text-slate-700"
                  >
                    Password
                  </label>

                  <Link
                    href="/dealer/forgot-password"
                    className="text-xs font-bold text-blue-600 transition hover:text-blue-700 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                <input
                  id="password"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  disabled={loading}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-50"
                />
              </div>

              {/* MESSAGE */}
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

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-blue-600 px-6 py-4 font-black text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Signing In..." : "Sign In →"}
              </button>
            </form>

            {/* REGISTER */}
            <div className="mt-8 border-t border-slate-200 pt-7 text-center">
              <p className="text-sm text-slate-500">
                Don't have a dealer account?
              </p>

              <Link
                href="/dealer/register"
                className="mt-2 inline-flex font-bold text-blue-600 transition hover:text-blue-700 hover:underline"
              >
                Create Dealer Account →
              </Link>
            </div>
          </div>

          {/* ACCESS NOTICE */}
          <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-5 text-center">
            <p className="text-sm leading-6 text-slate-600">
              An active dealer subscription may be required
              to access certain vehicle acquisition
              opportunities.
            </p>

            <div className="mt-4 flex justify-center gap-5 text-xs font-semibold">
              <Link
                href="/privacy"
                className="text-blue-600 hover:underline"
              >
                Privacy Policy
              </Link>

              <Link
                href="/terms"
                className="text-blue-600 hover:underline"
              >
                Terms
              </Link>

              <Link
                href="/contact"
                className="text-blue-600 hover:underline"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* MAIN SITE */}
          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-sm font-semibold text-slate-500 transition hover:text-slate-900"
            >
              ← Back to NorthSky Auto
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}