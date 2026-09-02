```javascript
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function DealerLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    if (loading) return;

    setLoading(true);
    setError("");

    try {
      const cleanEmail = email.trim().toLowerCase();

      if (!cleanEmail || !password) {
        setError(
          "Please enter your email address and password."
        );
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
        setError(
          "Please enter a valid email address."
        );
        return;
      }

      const supabase = createClient();

      const { data, error } =
        await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password,
        });

      if (error) {
        console.error(
          "Dealer login error:",
          error
        );

        const errorText =
          error.message?.toLowerCase() || "";

        if (
          errorText.includes("email not confirmed")
        ) {
          setError(
            "Your email has not been confirmed yet. Please check your inbox and click the confirmation link."
          );
          return;
        }

        if (
          errorText.includes(
            "invalid login credentials"
          )
        ) {
          setError(
            "Invalid email or password. Please check your credentials and try again."
          );
          return;
        }

        setError(
          error.message ||
            "Unable to sign in. Please try again."
        );

        return;
      }

      if (!data?.user) {
        setError(
          "Unable to sign in. Please try again."
        );
        return;
      }

      // --------------------------------
      // DEALER ROLE CHECK
      // --------------------------------

      const role =
        data.user.user_metadata?.role;

      if (role && role !== "dealer") {
        await supabase.auth.signOut();

        setError(
          "This account is not registered as a NorthSky Auto dealer account."
        );

        return;
      }

      // --------------------------------
      // SUCCESS
      // --------------------------------

      router.push("/dealer/dashboard");
      router.refresh();
    } catch (err) {
      console.error(
        "Dealer login error:",
        err
      );

      setError(
        "Unable to sign in. Please try again."
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
            href="/dealer/register"
            className="rounded-lg border border-white/10 px-4 py-2 text-sm font-bold text-slate-200 transition hover:border-blue-400 hover:text-white"
          >
            Create Account
          </Link>

        </div>

      </header>

      {/* --------------------------------
          HERO
      -------------------------------- */}

      <section className="bg-slate-950 text-white">

        <div className="mx-auto max-w-4xl px-6 py-14 text-center md:py-18">

          <Link
            href="/"
            className="text-sm font-bold text-blue-400 transition hover:text-blue-300"
          >
            ← NorthSky Auto
          </Link>

          <p className="mt-8 text-sm font-black uppercase tracking-widest text-blue-400">
            Dealer Portal
          </p>

          <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
            Dealer Login
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-lg text-slate-300">
            Sign in to your NorthSky Auto dealer account.
          </p>

        </div>

      </section>

      {/* --------------------------------
          LOGIN
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
                Welcome Back
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Enter your dealer account credentials.
              </p>

            </div>

            {/* ERROR */}

            {error && (
              <div
                role="alert"
                aria-live="polite"
                className="mt-6 rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-700 ring-1 ring-red-200"
              >
                {error}
              </div>
            )}

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="mt-7 space-y-5"
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
                    className="text-xs font-bold text-blue-600 hover:underline"
                  >
                    Forgot Password?
                  </Link>

                </div>

                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                  disabled={loading}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-50"
                />

              </div>

              {/* LOGIN BUTTON */}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-blue-600 px-6 py-4 font-black text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading
                  ? "Signing In..."
                  : "Sign In →"}
              </button>

            </form>

            {/* REGISTER */}

            <div className="mt-8 border-t border-slate-200 pt-7 text-center">

              <p className="text-sm text-slate-500">
                Don't have a dealer account?
              </p>

              <Link
                href="/dealer/register"
                className="mt-2 inline-block font-bold text-blue-600 hover:underline"
              >
                Create Dealer Account →
              </Link>

            </div>

          </div>

          {/* FOOTER LINKS */}

          <div className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs font-semibold">

            <Link
              href="/pricing"
              className="text-slate-500 hover:text-blue-600"
            >
              Dealer Plans
            </Link>

            <Link
              href="/privacy"
              className="text-slate-500 hover:text-blue-600"
            >
              Privacy
            </Link>

            <Link
              href="/terms"
              className="text-slate-500 hover:text-blue-600"
            >
              Terms
            </Link>

            <Link
              href="/contact"
              className="text-slate-500 hover:text-blue-600"
            >
              Contact
            </Link>

          </div>

          <div className="mt-5 text-center">

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
```
