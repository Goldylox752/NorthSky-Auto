```javascript
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const supabase = createClient();

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

    if (loading) return;

    setLoading(true);
    setMessage("");
    setSuccess(false);

    try {
      const dealershipName = form.dealership_name.trim();
      const contactName = form.contact_name.trim();
      const email = form.email.trim().toLowerCase();
      const phone = form.phone.trim();

      // -----------------------------
      // VALIDATION
      // -----------------------------

      if (
        !dealershipName ||
        !contactName ||
        !email ||
        !form.password ||
        !form.confirm_password
      ) {
        throw new Error("Please complete all required fields.");
      }

      if (dealershipName.length > 150) {
        throw new Error(
          "Dealership name must be 150 characters or less."
        );
      }

      if (contactName.length > 150) {
        throw new Error(
          "Contact name must be 150 characters or less."
        );
      }

      if (email.length > 254) {
        throw new Error("Email address is too long.");
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error("Please enter a valid email address.");
      }

      if (form.password.length < 8) {
        throw new Error(
          "Password must be at least 8 characters."
        );
      }

      if (form.password !== form.confirm_password) {
        throw new Error("Passwords do not match.");
      }

      if (phone.length > 50) {
        throw new Error("Phone number is too long.");
      }

      // -----------------------------
      // SUPABASE REGISTRATION
      // -----------------------------

      const callbackUrl =
        `${window.location.origin}` +
        "/auth/callback?next=/dealer/dashboard";

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

          emailRedirectTo: callbackUrl,
        },
      });

      // -----------------------------
      // SUPABASE ERROR
      // -----------------------------

      if (error) {
        console.error(
          "Supabase dealer registration error:",
          error
        );

        const errorText =
          error.message?.toLowerCase() || "";

        if (
          errorText.includes("already registered") ||
          errorText.includes("user already registered")
        ) {
          throw new Error(
            "An account with this email already exists. Please sign in instead."
          );
        }

        throw new Error(
          error.message ||
            "Unable to create your dealer account."
        );
      }

      // -----------------------------
      // EMAIL CONFIRMATION
      // -----------------------------

      if (!data?.session) {
        setSuccess(true);

        setMessage(
          "Your dealer account has been created. Check your email and click the confirmation link to activate your account."
        );

        setForm(initialForm);

        return;
      }

      // -----------------------------
      // LOGGED IN IMMEDIATELY
      // -----------------------------

      setSuccess(true);

      setMessage(
        "Dealer account created successfully. Redirecting..."
      );

      router.push("/dealer/dashboard");
      router.refresh();
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
    <main className="min-h-screen bg-slate-100 text-slate-900">

      {/* HERO */}
      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-6xl px-6 py-14 md:py-20">

          <Link
            href="/"
            className="inline-flex text-sm font-bold text-blue-300 transition hover:text-white"
          >
            ← NorthSky Auto
          </Link>

          <div className="mx-auto mt-10 max-w-3xl text-center">

            <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-400">
              Dealer Portal
            </p>

            <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
              Create Your Dealer Account
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              Join NorthSky Auto and create an account for
              dealership vehicle acquisition opportunities.
            </p>

          </div>
        </div>
      </section>

      {/* REGISTRATION */}
      <section className="px-6 py-12 md:py-16">

        <div className="mx-auto max-w-2xl">

          <div className="rounded-3xl bg-white p-7 shadow-xl ring-1 ring-slate-200 sm:p-9">

            {/* CARD HEADER */}
            <div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-xl font-black text-white shadow-lg shadow-blue-200">
                N
              </div>

              <p className="mt-6 text-sm font-black uppercase tracking-widest text-blue-600">
                Dealer Registration
              </p>

              <h2 className="mt-2 text-2xl font-black">
                Dealership Information
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Create your account using your dealership and
                primary contact information.
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

              <Field
                label="Dealership Name"
                name="dealership_name"
                value={form.dealership_name}
                onChange={handleChange}
                placeholder="ABC Motors"
                autoComplete="organization"
                maxLength={150}
                required
                disabled={loading}
              />

              <Field
                label="Primary Contact Name"
                name="contact_name"
                value={form.contact_name}
                onChange={handleChange}
                placeholder="John Smith"
                autoComplete="name"
                maxLength={150}
                required
                disabled={loading}
              />

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
                disabled={loading}
              />

              <Field
                label="Phone Number"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="780-555-1234"
                autoComplete="tel"
                maxLength={50}
                disabled={loading}
              />

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
                disabled={loading}
              />

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
                disabled={loading}
              />

              {/* TERMS */}
              <div className="rounded-xl bg-slate-50 p-4 text-xs leading-5 text-slate-500 ring-1 ring-slate-200">

                By creating a dealer account, you agree to the
                NorthSky Auto{" "}

                <Link
                  href="/terms"
                  className="font-bold text-blue-600 hover:underline"
                >
                  Terms of Service
                </Link>

                {" "}and acknowledge the{" "}

                <Link
                  href="/privacy"
                  className="font-bold text-blue-600 hover:underline"
                >
                  Privacy Policy
                </Link>.

              </div>

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-blue-600 px-6 py-4 font-black text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading
                  ? "Creating Account..."
                  : "Create Dealer Account →"}
              </button>

            </form>

            {/* LOGIN */}
            <div className="mt-8 border-t border-slate-200 pt-7 text-center">

              <p className="text-sm text-slate-500">
                Already have a dealer account?
              </p>

              <Link
                href="/dealer/login"
                className="mt-2 inline-flex font-bold text-blue-600 transition hover:text-blue-700 hover:underline"
              >
                Sign In to Dealer Portal →
              </Link>

            </div>

          </div>

          {/* NEXT STEPS */}
          <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-6">

            <h3 className="text-center font-black text-slate-900">
              What happens next?
            </h3>

            <div className="mt-5 grid gap-5 sm:grid-cols-3">

              <Step
                number="01"
                title="Create Account"
                text="Register your dealership."
              />

              <Step
                number="02"
                title="Confirm Email"
                text="Verify your email address."
              />

              <Step
                number="03"
                title="Source Vehicles"
                text="Review acquisition opportunities."
              />

            </div>

            {/* LINKS */}
            <div className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs font-semibold">

              <Link
                href="/pricing"
                className="text-blue-600 hover:underline"
              >
                Dealer Plans
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

              <Link
                href="/contact"
                className="text-blue-600 hover:underline"
              >
                Contact
              </Link>

            </div>

          </div>

          {/* HOME */}
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

/* --------------------------------
   REUSABLE FIELD
-------------------------------- */

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
  disabled = false,
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
        disabled={disabled}
        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-50"
      />

    </div>
  );
}

/* --------------------------------
   REGISTRATION STEP
-------------------------------- */

function Step({
  number,
  title,
  text,
}) {
  return (
    <div className="text-center">

      <div className="text-sm font-black text-blue-600">
        {number}
      </div>

      <h4 className="mt-1 font-black text-slate-900">
        {title}
      </h4>

      <p className="mt-1 text-xs leading-5 text-slate-500">
        {text}
      </p>

    </div>
  );
}

/* --------------------------------
   BENEFIT
-------------------------------- */

function Benefit({
  icon,
  title,
  text,
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">

      <div className="text-xs font-black text-blue-400">
        {icon}
      </div>

      <div className="mt-2 text-sm font-black">
        {title}
      </div>

      <p className="mt-1 text-xs leading-5 text-slate-400">
        {text}
      </p>

    </div>
  );
}
```
