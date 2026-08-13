"use client";

import Link from "next/link";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function DealerRegisterPage() {
  const supabase = createClient();

  const [form, setForm] = useState({
    dealership_name: "",
    contact_name: "",
    email: "",
    phone: "",
    password: "",
    confirm_password: "",
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
      const dealershipName = form.dealership_name.trim();
      const contactName = form.contact_name.trim();
      const email = form.email.trim().toLowerCase();
      const phone = form.phone.trim();

      if (
        !dealershipName ||
        !contactName ||
        !email ||
        !form.password
      ) {
        throw new Error(
          "Please complete all required fields."
        );
      }

      if (form.password.length < 8) {
        throw new Error(
          "Password must be at least 8 characters."
        );
      }

      if (
        form.password !==
        form.confirm_password
      ) {
        throw new Error(
          "Passwords do not match."
        );
      }

      const {
        data,
        error,
      } = await supabase.auth.signUp({
        email,
        password: form.password,
        options: {
          data: {
            role: "dealer",
            dealership_name: dealershipName,
            contact_name: contactName,
            phone,
          },
        },
      });

      if (error) {
        throw error;
      }

      /*
       * If Supabase requires email confirmation,
       * identities/user may exist but session can be null.
       */
      if (!data?.session) {
        setSuccess(true);

        setMessage(
          "Your dealer account has been created. Please check your email to confirm your account before signing in."
        );

        setForm({
          dealership_name: "",
          contact_name: "",
          email: "",
          phone: "",
          password: "",
          confirm_password: "",
        });

        return;
      }

      /*
       * If email confirmation is disabled,
       * the dealer can continue immediately.
       */
      setSuccess(true);

      setMessage(
        "Your dealer account has been created successfully."
      );

      window.location.href =
        "/dealer/dashboard";
    } catch (error) {
      console.error(
        "Dealer registration error:",
        error
      );

      setSuccess(false);

      setMessage(
        error?.message ||
          "Unable to create your dealer account. Please try again."
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
            Dealer Registration
          </p>

          <h1 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
            Create Your Dealer Account
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            Join NorthSky Auto and access vehicle acquisition
            opportunities for your dealership.
          </p>
        </div>
      </section>

      {/* REGISTRATION */}
      <section className="px-6 py-12 md:py-16">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 md:p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-black text-slate-900">
                Dealer Information
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Create your account to begin the NorthSky Auto
                dealer onboarding process.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              {/* DEALERSHIP */}
              <div>
                <label
                  htmlFor="dealership_name"
                  className="mb-2 block text-sm font-bold text-slate-700"
                >
                  Dealership Name
                  <span className="ml-1 text-red-500">
                    *
                  </span>
                </label>

                <input
                  id="dealership_name"
                  name="dealership_name"
                  type="text"
                  required
                  value={form.dealership_name}
                  onChange={handleChange}
                  placeholder="ABC Motors"
                  autoComplete="organization"
                  maxLength={150}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* CONTACT */}
              <div>
                <label
                  htmlFor="contact_name"
                  className="mb-2 block text-sm font-bold text-slate-700"
                >
                  Contact Name
                  <span className="ml-1 text-red-500">
                    *
                  </span>
                </label>

                <input
                  id="contact_name"
                  name="contact_name"
                  type="text"
                  required
                  value={form.contact_name}
                  onChange={handleChange}
                  placeholder="John Smith"
                  autoComplete="name"
                  maxLength={150}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* EMAIL */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-bold text-slate-700"
                >
                  Business Email
                  <span className="ml-1 text-red-500">
                    *
                  </span>
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
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* PHONE */}
              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-bold text-slate-700"
                >
                  Phone Number
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="780-555-1234"
                  autoComplete="tel"
                  maxLength={50}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* PASSWORD */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-bold text-slate-700"
                >
                  Password
                  <span className="ml-1 text-red-500">
                    *
                  </span>
                </label>

                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  minLength={8}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="At least 8 characters"
                  autoComplete="new-password"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* CONFIRM PASSWORD */}
              <div>
                <label
                  htmlFor="confirm_password"
                  className="mb-2 block text-sm font-bold text-slate-700"
                >
                  Confirm Password
                  <span className="ml-1 text-red-500">
                    *
                  </span>
                </label>

                <input
                  id="confirm_password"
                  name="confirm_password"
                  type="password"
                  required
                  minLength={8}
                  value={form.confirm_password}
                  onChange={handleChange}
                  placeholder="Re-enter your password"
                  autoComplete="new-password"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
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
                  ? "Creating Account..."
                  : "Create Dealer Account →"}
              </button>
            </form>

            {/* LOGIN */}
            <div className="mt-7 border-t border-slate-200 pt-6 text-center">
              <p className="text-sm text-slate-500">
                Already have a dealer account?
              </p>

              <Link
                href="/dealer/login"
                className="mt-2 inline-block font-bold text-blue-600 hover:text-blue-700 hover:underline"
              >
                Sign in to Dealer Portal →
              </Link>
            </div>
          </div>

          {/* TRUST / INFO */}
          <div className="mt-6 rounded-2xl bg-blue-50 p-5 text-center ring-1 ring-blue-100">
            <p className="text-sm leading-6 text-slate-600">
              Dealer access and vehicle opportunity availability
              may require an active NorthSky Auto subscription.
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