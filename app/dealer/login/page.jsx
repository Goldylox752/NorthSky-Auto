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

    setLoading(true);
    setMessage("");
    setSuccess(false);

    try {
      const email = form.email.trim().toLowerCase();
      const password = form.password;

      if (!email || !password) {
        throw new Error(
          "Please enter your email and password."
        );
      }

      const supabase = createClient();

      const { error } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (error) {
        throw error;
      }

      setSuccess(true);
      setMessage(
        "Login successful. Redirecting to your dealer dashboard..."
      );

      window.location.href =
        "/dealer/dashboard";
    } catch (error) {
      console.error(
        "Dealer login error:",
        error
      );

      setSuccess(false);

      setMessage(
        error?.message === "Invalid login credentials"
          ? "Invalid email or password. Please check your credentials and try again."
          : error?.message ||
              "Unable to sign in. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-100">
      {/* HERO */}
      <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white">
        <div className="mx-auto max-w-5xl px-6 py-14 text-center md:py-20">
          <Link
            href="/"
            className="text-sm font-bold text-blue-300 transition hover:text-white"
          >
            ← NorthSky Auto
          </Link>

          <p className="mt-8 text-sm font-black uppercase tracking-widest text-blue-300">
            Dealer Portal
          </p>

          <h1 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
            Welcome Back
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            Sign in to manage your dealership account and
            access NorthSky Auto vehicle opportunities.
          </p>
        </div>
      </section>

      {/* LOGIN */}
      <section className="px-6 py-12 md:py-16">
        <div className="mx-auto max-w-md">
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 md:p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-black text-slate-900">
                Dealer Sign In
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Enter your dealer account credentials below.
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
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="dealer@example.com"
                  autoComplete="email"
                  maxLength={254}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* PASSWORD */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-bold text-slate-700"
                  >
                    Password
                  </label>

                  <Link
                    href="/dealer/forgot-password"
                    className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Your password"
                  autoComplete="current-password"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* MESSAGE */}
              {message && (
                <div
                  role="alert"
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
                className="w-full rounded-xl bg-blue-600 px-6 py-4 font-black text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading
                  ? "Signing In..."
                  : "Sign In →"}
              </button>
            </form>

            {/* REGISTER */}
            <div className="mt-7 border-t border-slate-200 pt-6 text-center">
              <p className="text-sm text-slate-500">
                Don't have a dealer account?
              </p>

              <Link
                href="/dealer/register"
                className="mt-2 inline-block font-bold text-blue-600 hover:text-blue-700 hover:underline"
              >
                Create Dealer Account →
              </Link>
            </div>
          </div>

          {/* ACCESS NOTICE */}
          <div className="mt-6 rounded-2xl bg-blue-50 p-5 text-center ring-1 ring-blue-100">
            <p className="text-sm leading-6 text-slate-600">
              Vehicle acquisition opportunities may require an
              active NorthSky Auto dealer subscription.
            </p>

            <div className="mt-3 flex justify-center gap-4 text-xs font-semibold">
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
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}