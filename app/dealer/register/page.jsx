```jsx
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

  async function sendWelcomeEmail({
    email,
    dealershipName,
    contactName,
  }) {
    try {
      const response = await fetch(
        "/api/dealer/welcome-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            dealershipName,
            contactName,
          }),
        }
      );

      if (!response.ok) {
        console.error(
          "Dealer welcome email request failed."
        );

        return false;
      }

      return true;
    } catch (error) {
      console.error(
        "Dealer welcome email error:",
        error
      );

      return false;
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (loading) return;

    setLoading(true);
    setMessage("");
    setSuccess(false);

    try {
      const dealershipName =
        form.dealership_name.trim();

      const contactName =
        form.contact_name.trim();

      const email =
        form.email.trim().toLowerCase();

      const phone =
        form.phone.trim();

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
        throw new Error(
          "Please complete all required fields."
        );
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
        throw new Error(
          "Email address is too long."
        );
      }

      if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
      ) {
        throw new Error(
          "Please enter a valid email address."
        );
      }

      if (form.password.length < 8) {
        throw new Error(
          "Password must be at least 8 characters."
        );
      }

      if (form.password.length > 72) {
        throw new Error(
          "Password must be 72 characters or less."
        );
      }

      if (
        form.password !== form.confirm_password
      ) {
        throw new Error(
          "Passwords do not match."
        );
      }

      if (phone.length > 50) {
        throw new Error(
          "Phone number is too long."
        );
      }

      // -----------------------------
      // SUPABASE CALLBACK
      // -----------------------------

      const callbackUrl =
        `${window.location.origin}/auth/callback?next=/dealer/dashboard`;

      // -----------------------------
      // CREATE ACCOUNT
      // -----------------------------

      const { data, error } =
        await supabase.auth.signUp({
          email,
          password: form.password,

          options: {
            data: {
              role: "dealer",
              dealership_name:
                dealershipName,
              contact_name: contactName,
              phone: phone || null,
            },

            emailRedirectTo:
              callbackUrl,
          },
        });

      if (error) {
        throw error;
      }

      // -----------------------------
      // ACTIVE SESSION
      // -----------------------------

      if (data?.session) {
        await sendWelcomeEmail({
          email,
          dealershipName,
          contactName,
        });

        setSuccess(true);
        setMessage(
          "Your dealer account has been created successfully."
        );

        router.push("/dealer/dashboard");
        return;
      }

      // -----------------------------
      // EMAIL CONFIRMATION REQUIRED
      // -----------------------------

      setSuccess(true);
      setMessage(
        "Your account has been created. Please check your email and click the confirmation link to activate your dealer account."
      );
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
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:py-20">
        <div className="mx-auto max-w-2xl">
          <div className="mb-10 text-center">
            <Link
              href="/"
              className="text-2xl font-bold tracking-tight"
            >
              NorthSky Auto
            </Link>

            <h1 className="mt-8 text-4xl font-bold tracking-tight">
              Create your dealer account
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-400">
              Join the NorthSky Auto dealer network and
              access vehicle acquisition opportunities
              across Canada.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl sm:p-8">
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div>
                <label
                  htmlFor="dealership_name"
                  className="mb-2 block text-sm font-medium text-slate-200"
                >
                  Dealership name
                </label>

                <input
                  id="dealership_name"
                  name="dealership_name"
                  type="text"
                  autoComplete="organization"
                  value={form.dealership_name}
                  onChange={handleChange}
                  maxLength={150}
                  required
                  placeholder="ABC Motors"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                />
              </div>

              <div>
                <label
                  htmlFor="contact_name"
                  className="mb-2 block text-sm font-medium text-slate-200"
                >
                  Contact name
                </label>

                <input
                  id="contact_name"
                  name="contact_name"
                  type="text"
                  autoComplete="name"
                  value={form.contact_name}
                  onChange={handleChange}
                  maxLength={150}
                  required
                  placeholder="John Smith"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-slate-200"
                >
                  Dealer email
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                  maxLength={254}
                  required
                  placeholder="dealer@example.com"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-medium text-slate-200"
                >
                  Phone number
                  <span className="ml-2 text-slate-500">
                    Optional
                  </span>
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={handleChange}
                  maxLength={50}
                  placeholder="+1 780 555 1234"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                />
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium text-slate-200"
                  >
                    Password
                  </label>

                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    value={form.password}
                    onChange={handleChange}
                    minLength={8}
                    maxLength={72}
                    required
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                  />
                </div>

                <div>
                  <label
                    htmlFor="confirm_password"
                    className="mb-2 block text-sm font-medium text-slate-200"
                  >
                    Confirm password
                  </label>

                  <input
                    id="confirm_password"
                    name="confirm_password"
                    type="password"
                    autoComplete="new-password"
                    value={
                      form.confirm_password
                    }
                    onChange={handleChange}
                    minLength={8}
                    maxLength={72}
                    required
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                  />
                </div>
              </div>

              {message && (
                <div
                  className={`rounded-xl border px-4 py-3 text-sm leading-6 ${
                    success
                      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                      : "border-red-500/30 bg-red-500/10 text-red-300"
                  }`}
                >
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-sky-500 px-5 py-3.5 font-semibold text-white transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "Creating dealer account..."
                  : "Create dealer account"}
              </button>

              <p className="text-center text-xs leading-5 text-slate-500">
                By creating an account, you agree to
                NorthSky Auto&apos;s{" "}
                <Link
                  href="/terms"
                  className="text-sky-400 hover:text-sky-300"
                >
                  Terms
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="text-sky-400 hover:text-sky-300"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </form>

            <div className="mt-8 border-t border-slate-800 pt-6 text-center text-sm text-slate-400">
              Already have a dealer account?{" "}
              <Link
                href="/dealer/login"
                className="font-semibold text-sky-400 hover:text-sky-300"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
```
