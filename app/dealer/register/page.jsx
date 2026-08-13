"use client";

import Link from "next/link";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

const initialForm = {
  dealership_name: "",
  contact_name: "",
  email: "",
  phone: "",
  password: "",
  confirm_password: "",
};

export default function DealerRegisterPage() {
  const [form, setForm] = useState(initialForm);
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

      if (!dealershipName || !contactName || !email || !form.password) {
        throw new Error("Please complete all required fields.");
      }

      if (dealershipName.length > 150) {
        throw new Error("Dealership name is too long.");
      }

      if (contactName.length > 150) {
        throw new Error("Contact name is too long.");
      }

      if (email.length > 254) {
        throw new Error("Email address is too long.");
      }

      if (form.password.length < 8) {
        throw new Error("Password must be at least 8 characters.");
      }

      if (form.password !== form.confirm_password) {
        throw new Error("Passwords do not match.");
      }

      const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (!emailIsValid) {
        throw new Error("Please provide a valid business email address.");
      }

      const supabase = createClient();

      const { data, error } = await supabase.auth.signUp({
        email,
        password: form.password,

        options: {
          data: {
            role: "dealer",
            dealership_name: dealershipName,
            contact_name: contactName,
            phone: phone || null,
          },

          emailRedirectTo:
            `${window.location.origin}/dealer/dashboard`,
        },
      });

      if (error) {
        console.error("Supabase dealer signup error:", error);
        throw error;
      }

      /*
       * Supabase may require email confirmation.
       */
      if (!data?.session) {
        setSuccess(true);

        setMessage(
          "Your dealer account has been created. Please check your email to confirm your account before signing in."
        );

        setForm(initialForm);

        return;
      }

      /*
       * Email confirmation is disabled and
       * Supabase created an active session.
       */
      setSuccess(true);

      setMessage(
        "Your dealer account has been created successfully. Redirecting..."
      );

      window.location.assign("/dealer/dashboard");
    } catch (error) {
      console.error("Dealer registration error:", error);

      setSuccess(false);

      let errorMessage =
        "Unable to create your dealer account. Please try again.";

      if (
        error?.message?.toLowerCase().includes("already registered")
      ) {
        errorMessage =
          "An account with this email already exists. Please sign in instead.";
      } else if (
        error?.message?.toLowerCase().includes("user already registered")
      ) {
        errorMessage =
          "An account with this email already exists. Please sign in instead.";
      } else if (error?.message) {
        errorMessage = error.message;
      }

      setMessage(errorMessage);
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

          <p className="mt-8 text-sm font-black uppercase tracking-widest text-blue-300">
            Dealer Registration
          </p>

          <h1 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
            Create Your Dealer Account
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            Create your NorthSky Auto dealer account and begin
            the onboarding process for vehicle acquisition opportunities.
          </p>

        </div>

      </section>


      {/* REGISTRATION */}

      <section className="px-6 py-12 md:py-16">

        <div className="mx-auto max-w-2xl">

          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 md:p-8">

            <div className="mb-8">

              <p className="text-sm font-black uppercase tracking-widest text-blue-600">
                Dealer Portal
              </p>

              <h2 className="mt-2 text-2xl font-black">
                Dealer Information
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Enter your dealership information to create your
                NorthSky Auto account.
              </p>

            </div>


            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* DEALERSHIP NAME */}

              <Field
                label="Dealership Name"
                name="dealership_name"
                value={form.dealership_name}
                onChange={handleChange}
                placeholder="ABC Motors"
                autoComplete="organization"
                maxLength={150}
                required
              />


              {/* CONTACT NAME */}

              <Field
                label="Contact Name"
                name="contact_name"
                value={form.contact_name}
                onChange={handleChange}
                placeholder="John Smith"
                autoComplete="name"
                maxLength={150}
                required
              />


              {/* EMAIL */}

              <Field
                label="Business Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="dealer@example.com"
                autoComplete="email"
                maxLength={254}
                required
              />


              {/* PHONE */}

              <Field
                label="Phone Number"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="780-555-1234"
                autoComplete="tel"
                maxLength={50}
              />


              {/* PASSWORD */}

              <Field
                label="Password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="At least 8 characters"
                autoComplete="new-password"
                minLength={8}
                required
              />


              {/* CONFIRM PASSWORD */}

              <Field
                label="Confirm Password"
                name="confirm_password"
                type="password"
                value={form.confirm_password}
                onChange={handleChange}
                placeholder="Re-enter your password"
                autoComplete="new-password"
                minLength={8}
                required
              />


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


              {/* TERMS */}

              <p className="text-xs leading-5 text-slate-500">
                By creating an account, you agree to the NorthSky Auto{" "}
                <Link
                  href="/terms"
                  className="font-semibold text-blue-600 hover:underline"
                >
                  Terms of Service
                </Link>{" "}
                and acknowledge our{" "}
                <Link
                  href="/privacy"
                  className="font-semibold text-blue-600 hover:underline"
                >
                  Privacy Policy
                </Link>
                .
              </p>


              {/* SUBMIT */}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-blue-600 px-6 py-4 font-black text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading
                  ? "Creating Dealer Account..."
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


          {/* ACCOUNT INFORMATION */}

          <div className="mt-6 rounded-2xl bg-blue-50 p-5 text-center ring-1 ring-blue-100">

            <h3 className="font-black text-slate-900">
              What happens next?
            </h3>

            <div className="mt-4 grid gap-3 text-sm text-slate-600 sm:grid-cols-3">

              <div>
                <div className="font-black text-blue-600">
                  01
                </div>
                <p className="mt-1">
                  Create your account
                </p>
              </div>

              <div>
                <div className="font-black text-blue-600">
                  02
                </div>
                <p className="mt-1">
                  Choose a dealer plan
                </p>
              </div>

              <div>
                <div className="font-black text-blue-600">
                  03
                </div>
                <p className="mt-1">
                  Access opportunities
                </p>
              </div>

            </div>

            <div className="mt-5 flex justify-center gap-4 text-xs font-semibold">

              <Link
                href="/pricing"
                className="text-blue-600 hover:underline"
              >
                View Dealer Plans
              </Link>

              <Link
                href="/privacy"
                className="text-blue-600 hover:underline"
              >
                Privacy
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


/*
|--------------------------------------------------------------------------
| Field Component
|--------------------------------------------------------------------------
*/

function Field({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  autoComplete,
  maxLength,
  minLength,
  required = false,
}) {
  return (
    <div>

      <label
        htmlFor={name}
        className="mb-2 block text-sm font-bold text-slate-700"
      >
        {label}

        {required && (
          <span className="ml-1 text-red-500">
            *
          </span>
        )}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        maxLength={maxLength}
        minLength={minLength}
        required={required}
        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
      />

    </div>
  );
}