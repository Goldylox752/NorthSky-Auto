```javascript
"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function DealerLoginPage() {
  const router = useRouter();

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

      if (!email) {
        throw new Error("Please enter your email address.");
      }

      if (!form.password) {
        throw new Error("Please enter your password.");
      }

      const supabase = createClient();

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: form.password,
      });

      if (error) {
        console.error("Dealer login error:", error);

        const errorMessage = error.message?.toLowerCase() || "";

        if (
          errorMessage.includes("invalid login") ||
          errorMessage.includes("invalid credentials")
        ) {
          throw new Error(
            "Invalid email or password. Please check your credentials and try again."
          );
        }

        if (errorMessage.includes("email not confirmed")) {
          throw new Error(
            "Please confirm your email address before signing in."
          );
        }

        throw new Error(
          error.message || "Unable to sign in. Please try again."
        );
      }

      if (!data?.user) {
        throw new Error(
          "Unable to create a dealer session. Please try again."
        );
      }

      setSuccess(true);
      setMessage("Login successful. Redirecting...");

      router.push("/dealer/dashboard");
      router.refresh();
    } catch (error) {
      console.error("Dealer login error:", error);

      setSuccess(false);
      setMessage(
        error?.message || "Unable to sign in. Please try again."
      );

      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-5xl px-6 py-14 text-center md:py-20">
          <Link
            href="/"
            className="inline-flex text-sm font-bold text-blue-300 transition hover:text-white"
          >
            ← NorthSky Auto
          </Link>

          <p className="mt-8 text-sm font-black uppercase tracking-[0.2em] text-blue-400">
            Dealer Portal
          </p>

          <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
            Dealer Sign In
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            Access your dealership account and manage vehicle acquisition
            opportunities.
          </p>
        </div>
      </section>

      <section className="px-6 py-12 md:py-16">
        <div className="mx-auto max-w-md">
          <div className="rounded-3xl bg-white p-7 shadow-xl ring-1 ring-slate-200 sm:p-9">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-xl font-black text-white shadow-lg shadow-blue-200">
              N
            </div>

            <h2 className="mt-6 text-2xl font-black">
              Welcome back
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Sign in to continue to the NorthSky Auto dealer portal.
            </p>

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

            <form
              onSubmit={handleSubmit}
              className="mt-7 space-y-5"
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
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-50"
                />
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between gap-4">
                  <label
                    htmlFor="password"
                    className="text-sm font-bold text-slate-700"
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
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-50"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-blue-600 px-6 py-4 font-black text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Signing In..." : "Sign In →"}
              </button>
            </form>

            <div className="mt-8 border-t border-slate-200 pt-7 text-center">
              <p className="text-sm text-slate-500">
                Don&apos;t have a dealer account?
              </p>

              <Link
                href="/dealer/register"
                className="mt-2 inline-flex font-bold text-blue-600 transition hover:text-blue-700 hover:underline"
              >
                Create Dealer Account →
              </Link>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-5 text-center">
            <p className="text-sm leading-6 text-slate-600">
              Certain vehicle acquisition opportunities may require an
              active dealer subscription.
            </p>

            <div className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs font-semibold">
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
```
