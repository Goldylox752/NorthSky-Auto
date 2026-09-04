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
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setSuccess("");

    const name = form.name.trim();
    const email = form.email.trim().toLowerCase();
    const phone = form.phone.trim();

    if (!name || !email || !form.password) {
      setError("Please complete all required fields.");
      return;
    }

    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password: form.password,
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

      if (!data.user) {
        throw new Error("Unable to create your dealer account.");
      }

      /*
       * Create the dealer profile.
       *
       * This assumes your public.dealers table has:
       * - id
       * - name
       *
       * We use the authenticated Supabase user's ID as the dealer ID.
       */
      const { error: dealerError } = await supabase
        .from("dealers")
        .insert({
          id: data.user.id,
          name,
        });

      if (dealerError) {
        console.error("Dealer profile error:", dealerError);

        // The Auth account was created, but the dealer profile failed.
        setError(
          "Your account was created, but your dealer profile could not be created. Please contact support."
        );

        return;
      }

      if (!data.session) {
        setSuccess(
          "Your dealer account has been created. Check your email to confirm your account, then sign in."
        );
        return;
      }

      router.push("/dealer/dashboard");
      router.refresh();
    } catch (err) {
      console.error("Dealer signup error:", err);

      setError(
        err?.message ||
          "Unable to create your dealer account. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-6 py-12">
        <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl lg:grid-cols-2">
          
          {/* Left side */}
          <div className="hidden bg-gradient-to-br from-blue-600 to-slate-900 p-10 lg:block">
            <div className="flex h-full flex-col justify-between">
              <div>
                <Link
                  href="/dealer"
                  className="inline-flex items-center gap-3 text-lg font-bold"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-blue-700">
                    N
                  </span>
                  NorthSky Auto
                </Link>

                <div className="mt-20">
                  <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-blue-200">
                    Dealer Network
                  </p>

                  <h1 className="text-4xl font-bold leading-tight">
                    Build your vehicle acquisition pipeline.
                  </h1>

                  <p className="mt-6 max-w-md text-lg leading-8 text-blue-100">
                    Create your NorthSky Auto dealer account and connect with
                    vehicle acquisition opportunities across Canada.
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-sm text-blue-100">
                <div>✓ Dealer dashboard</div>
                <div>✓ Vehicle opportunities</div>
                <div>✓ Lead management</div>
                <div>✓ Subscription management</div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-slate-900 p-6 sm:p-10">
            <div className="mx-auto max-w-md">
              <div className="mb-8">
                <Link
                  href="/dealer"
                  className="text-sm text-slate-400 hover:text-white"
                >
                  ← Back to Dealer Portal
                </Link>

                <h2 className="mt-6 text-3xl font-bold">
                  Create Dealer Account
                </h2>

                <p className="mt-2 text-slate-400">
                  Register your dealership to get started.
                </p>
              </div>

              {error && (
                <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                  {error}
                </div>
              )}

              {success && (
                <div className="mb-6 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-300">
                  {success}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-slate-200"
                  >
                    Dealership Name *
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your dealership name"
                    autoComplete="organization"
                    required
                    className="w-full rounded-xl border border-white/10 bg-slate-800 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-slate-200"
                  >
                    Email Address *
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="dealer@example.com"
                    autoComplete="email"
                    required
                    className="w-full rounded-xl border border-white/10 bg-slate-800 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-medium text-slate-200"
                  >
                    Phone Number
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="(780) 555-1234"
                    autoComplete="tel"
                    className="w-full rounded-xl border border-white/10 bg-slate-800 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium text-slate-200"
                  >
                    Password *
                  </label>

                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="At least 8 characters"
                    autoComplete="new-password"
                    required
                    className="w-full rounded-xl border border-white/10 bg-slate-800 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="mb-2 block text-sm font-medium text-slate-200"
                  >
                    Confirm Password *
                  </label>

                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="Enter your password again"
                    autoComplete="new-password"
                    required
                    className="w-full rounded-xl border border-white/10 bg-slate-800 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-blue-600 px-5 py-3.5 font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Creating Account..." : "Create Dealer Account"}
                </button>
              </form>

              <div className="mt-8 text-center text-sm text-slate-400">
                Already have a dealer account?{" "}
                <Link
                  href="/dealer/login"
                  className="font-semibold text-blue-400 hover:text-blue-300"
                >
                  Sign in
                </Link>
              </div>

              <p className="mt-6 text-center text-xs leading-5 text-slate-500">
                By creating an account, you agree to use the NorthSky Auto
                dealer platform in accordance with our terms and policies.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
