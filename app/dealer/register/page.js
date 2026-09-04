"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function DealerRegisterPage() {
  const router = useRouter();
  const supabase = createClient();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (loading) return;

    setError("");
    setSuccess("");

    const name = form.name.trim();
    const email = form.email.trim().toLowerCase();
    const phone = form.phone.trim();
    const password = form.password;
    const confirmPassword = form.confirmPassword;

    // Validation
    if (!name || !email || !password || !confirmPassword) {
      setError("Please complete all required fields.");
      return;
    }

    if (name.length < 2) {
      setError("Please enter a valid dealership name.");
      return;
    }

    if (password.length < 8) {
      setError("Your password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      /*
       * Create the Supabase Auth account.
       *
       * Dealer information is also stored in user metadata so it is
       * available immediately through the authenticated user.
       */
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            phone,
            account_type: "dealer",
          },

          emailRedirectTo: `${window.location.origin}/dealer/login`,
        },
      });

      if (signUpError) {
        throw signUpError;
      }

      if (!data?.user?.id) {
        throw new Error(
          "NorthSky Auto could not create your account. Please try again."
        );
      }

      /*
       * IMPORTANT:
       *
       * If Supabase requires email confirmation, data.session will be null.
       * In that situation the browser is NOT authenticated yet, so an RLS
       * protected INSERT into public.dealers may correctly fail.
       *
       * If a session exists, we create/update the dealer profile here.
       *
       * If email confirmation is enabled, the recommended production setup
       * is a Supabase database trigger that creates the dealer profile from
       * auth.users after signup.
       */
      if (data.session) {
        const { error: dealerError } = await supabase
          .from("dealers")
          .upsert(
            {
              id: data.user.id,
              name,
              phone: phone || null,
              email,
            },
            {
              onConflict: "id",
            }
          );

        if (dealerError) {
          console.error("Dealer profile error:", dealerError);

          setError(
            "Your login account was created, but your dealer profile could not be saved. Please contact NorthSky Auto support."
          );

          return;
        }

        setSuccess("Your dealer account is ready. Redirecting...");

        router.push("/dealer/dashboard");
        router.refresh();

        return;
      }

      /*
       * No session normally means email confirmation is required.
       *
       * Do NOT attempt a public INSERT into dealers here because that
       * commonly fails under Supabase Row Level Security.
       */
      setSuccess(
        "Your dealer account has been created. Check your email and confirm your account before signing in."
      );
    } catch (err) {
      console.error("Dealer registration error:", err);

      let message =
        "Unable to create your dealer account. Please try again.";

      if (err?.message) {
        message = err.message;
      }

      // Friendlier Supabase messages
      if (message.toLowerCase().includes("already registered")) {
        message =
          "An account with this email already exists. Please sign in instead.";
      }

      if (message.toLowerCase().includes("password")) {
        message = "Please choose a stronger password with at least 8 characters.";
      }

      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#050b14] text-white">

      {/* Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[120px]" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-5 py-10">

        <div className="grid w-full overflow-hidden rounded-3xl border border-white/10 bg-[#0b1422] shadow-2xl lg:grid-cols-2">

          {/* =========================================================
              LEFT SIDE — NORTHSKY AUTO BRANDING
          ========================================================== */}
          <section className="relative hidden overflow-hidden bg-[#07111f] p-10 lg:flex">

            <div className="relative flex min-h-[700px] w-full flex-col justify-between">

              {/* Brand */}
              <div>

                <Link
                  href="/dealer"
                  className="inline-flex items-center gap-3"
                >

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-lg font-black text-white shadow-lg shadow-blue-600/20">
                    N
                  </div>

                  <div>
                    <div className="text-lg font-black tracking-tight">
                      NorthSky Auto
                    </div>

                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400">
                      Dealer Network
                    </div>
                  </div>

                </Link>

              </div>

              {/* Main message */}
              <div className="relative">

                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-blue-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                  Dealer Platform
                </div>

                <h1 className="max-w-lg text-5xl font-black leading-[1.02] tracking-[-0.04em]">
                  Grow your
                  <br />
                  <span className="text-blue-500">
                    vehicle pipeline.
                  </span>
                </h1>

                <p className="mt-6 max-w-md text-base leading-7 text-slate-400">
                  Create your NorthSky Auto dealer account and connect
                  with vehicle acquisition opportunities through one
                  powerful platform.
                </p>

                {/* Features */}
                <div className="mt-10 space-y-5">

                  <Feature
                    title="Dealer Dashboard"
                    text="Manage your NorthSky Auto activity from one place."
                  />

                  <Feature
                    title="Vehicle Opportunities"
                    text="Discover vehicles available for acquisition."
                  />

                  <Feature
                    title="Lead Management"
                    text="Keep your opportunities organized and accessible."
                  />

                  <Feature
                    title="Built for Dealers"
                    text="A platform designed around automotive businesses."
                  />

                </div>

              </div>

              {/* Bottom */}
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span>🇨🇦</span>
                <span>NorthSky Auto • Canada</span>
              </div>

            </div>
          </section>

          {/* =========================================================
              RIGHT SIDE — REGISTRATION FORM
          ========================================================== */}
          <section className="bg-[#0b1422] p-6 sm:p-10 lg:p-12">

            <div className="mx-auto max-w-md">

              {/* Mobile logo */}
              <div className="mb-8 lg:hidden">

                <Link
                  href="/dealer"
                  className="inline-flex items-center gap-3"
                >

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 font-black">
                    N
                  </div>

                  <div>
                    <div className="font-black">
                      NorthSky Auto
                    </div>

                    <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-blue-400">
                      Dealer Network
                    </div>
                  </div>

                </Link>

              </div>

              {/* Back */}
              <Link
                href="/dealer"
                className="inline-flex items-center text-sm font-medium text-slate-500 transition hover:text-white"
              >
                ← Back to Dealer Portal
              </Link>

              {/* Heading */}
              <div className="mt-8">

                <div className="text-xs font-black uppercase tracking-[0.2em] text-blue-500">
                  Dealer Registration
                </div>

                <h2 className="mt-3 text-3xl font-black tracking-tight text-white">
                  Create your account
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  Register your dealership to access the NorthSky Auto
                  dealer platform.
                </p>

              </div>

              {/* Error */}
              {error && (
                <div
                  role="alert"
                  className="mt-7 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3.5 text-sm leading-6 text-red-300"
                >
                  <div className="font-bold">
                    Registration unsuccessful
                  </div>

                  <div className="mt-1">
                    {error}
                  </div>
                </div>
              )}

              {/* Success */}
              {success && (
                <div
                  role="status"
                  className="mt-7 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3.5 text-sm leading-6 text-emerald-300"
                >
                  <div className="font-bold">
                    Account created
                  </div>

                  <div className="mt-1">
                    {success}
                  </div>

                  {!loading && (
                    <Link
                      href="/dealer/login"
                      className="mt-3 inline-block font-bold text-emerald-300 underline underline-offset-4"
                    >
                      Go to Dealer Login →
                    </Link>
                  )}
                </div>
              )}

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                className="mt-8 space-y-5"
              >

                {/* Dealership */}
                <FormField
                  label="Dealership Name"
                  htmlFor="name"
                  required
                >
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your dealership name"
                    autoComplete="organization"
                    required
                    disabled={loading}
                    className={inputClass}
                  />
                </FormField>

                {/* Email */}
                <FormField
                  label="Business Email"
                  htmlFor="email"
                  required
                >
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="dealer@example.com"
                    autoComplete="email"
                    required
                    disabled={loading}
                    className={inputClass}
                  />
                </FormField>

                {/* Phone */}
                <FormField
                  label="Phone Number"
                  htmlFor="phone"
                  optional
                >
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="780-555-1234"
                    autoComplete="tel"
                    disabled={loading}
                    className={inputClass}
                  />
                </FormField>

                {/* Password */}
                <FormField
                  label="Password"
                  htmlFor="password"
                  required
                >
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="At least 8 characters"
                    autoComplete="new-password"
                    minLength={8}
                    required
                    disabled={loading}
                    className={inputClass}
                  />

                  <p className="mt-2 text-xs text-slate-500">
                    Use at least 8 characters.
                  </p>
                </FormField>

                {/* Confirm password */}
                <FormField
                  label="Confirm Password"
                  htmlFor="confirmPassword"
                  required
                >
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="Enter your password again"
                    autoComplete="new-password"
                    minLength={8}
                    required
                    disabled={loading}
                    className={inputClass}
                  />
                </FormField>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group flex w-full items-center justify-center gap-3 rounded-xl bg-blue-600 px-5 py-4 text-sm font-black text-white shadow-lg shadow-blue-600/10 transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Dealer Account
                      <span className="transition group-hover:translate-x-1">
                        →
                      </span>
                    </>
                  )}
                </button>

              </form>

              {/* Login */}
              <div className="mt-8 border-t border-white/10 pt-7 text-center text-sm text-slate-500">

                Already have a dealer account?{" "}

                <Link
                  href="/dealer/login"
                  className="font-bold text-blue-400 transition hover:text-blue-300"
                >
                  Sign in
                </Link>

              </div>

              {/* Terms */}
              <p className="mt-6 text-center text-[11px] leading-5 text-slate-600">
                By creating a NorthSky Auto dealer account, you agree
                to our{" "}
                <Link
                  href="/terms"
                  className="text-slate-500 underline underline-offset-2 hover:text-slate-300"
                >
                  Terms
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="text-slate-500 underline underline-offset-2 hover:text-slate-300"
                >
                  Privacy Policy
                </Link>
                .
              </p>

            </div>
          </section>

        </div>
      </div>
    </main>
  );
}

/* =========================================================
   FEATURE COMPONENT
========================================================= */

function Feature({ title, text }) {
  return (
    <div className="flex gap-4">

      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-blue-500/20 bg-blue-500/10 text-sm font-black text-blue-400">
        ✓
      </div>

      <div>
        <div className="text-sm font-bold text-white">
          {title}
        </div>

        <div className="mt-1 text-xs leading-5 text-slate-500">
          {text}
        </div>
      </div>

    </div>
  );
}

/* =========================================================
   FORM FIELD
========================================================= */

function FormField({
  label,
  htmlFor,
  required = false,
  optional = false,
  children,
}) {
  return (
    <div>

      <div className="mb-2 flex items-center justify-between">

        <label
          htmlFor={htmlFor}
          className="text-sm font-bold text-slate-200"
        >
          {label}
          {required && (
            <span className="ml-1 text-blue-500">
              *
            </span>
          )}
        </label>

        {optional && (
          <span className="text-[10px] font-medium uppercase tracking-wider text-slate-600">
            Optional
          </span>
        )}

      </div>

      {children}

    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-white/10 bg-[#111d2d] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:opacity-60";