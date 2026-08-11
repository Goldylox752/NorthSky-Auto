"use client";

import Link from "next/link";
import { useState } from "react";

export const metadata = {
  title: "Contact NorthSky Auto | Canadian Vehicle Marketplace",
  description:
    "Contact NorthSky Auto about selling a vehicle, dealer accounts, memberships, vehicle opportunities, partnerships, or support.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setStatus("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setStatus("Message sent successfully!");
      form.reset();
    } catch (error) {
      setStatus(
        error.message || "Unable to send your message. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-900 px-6 py-20 text-white">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/"
            className="inline-flex items-center font-bold text-blue-300 transition hover:text-white"
          >
            ← NorthSky Auto
          </Link>

          <h1 className="mt-6 text-5xl font-black tracking-tight md:text-6xl">
            Contact Us
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            Have a question about selling a vehicle, becoming a dealer,
            memberships, vehicle opportunities, or NorthSky Auto? Send us a
            message.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-3">
          {/* Quick Links */}
          <div>
            <h2 className="text-2xl font-black">Quick Links</h2>

            <p className="mt-4 leading-7 text-slate-600">
              Choose an option below or send us a message.
            </p>

            <div className="mt-8 space-y-4">
              <Link
                href="/sell"
                className="block rounded-xl bg-blue-600 px-5 py-4 text-center font-black text-white transition hover:bg-blue-700"
              >
                Sell Your Vehicle
              </Link>

              <Link
                href="/buyers"
                className="block rounded-xl bg-slate-950 px-5 py-4 text-center font-black text-white transition hover:bg-slate-800"
              >
                Dealer Marketplace
              </Link>

              <Link
                href="/pricing"
                className="block rounded-xl border border-slate-300 bg-white px-5 py-4 text-center font-black transition hover:border-blue-600 hover:text-blue-600"
              >
                Dealer Pricing
              </Link>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-3xl bg-white p-8 shadow-lg ring-1 ring-slate-200 md:col-span-2">
            <h2 className="text-3xl font-black">Send a Message</h2>

            <p className="mt-3 text-slate-600">
              Fill out the form and we will receive your inquiry.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              {/* Honeypot */}
              <input
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
              />

              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="text-sm font-bold"
                >
                  Full Name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  maxLength={150}
                  placeholder="Your name"
                  autoComplete="name"
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-bold"
                >
                  Email
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  maxLength={254}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="text-sm font-bold"
                >
                  Phone
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Optional"
                  autoComplete="tel"
                  maxLength={50}
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />
              </div>

              {/* Inquiry Type */}
              <div>
                <label
                  htmlFor="topic"
                  className="text-sm font-bold"
                >
                  Inquiry Type
                </label>

                <select
                  id="topic"
                  name="topic"
                  required
                  defaultValue=""
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                >
                  <option value="" disabled>
                    Select an option
                  </option>

                  <option value="selling-vehicle">
                    Selling a Vehicle
                  </option>

                  <option value="dealer-account">
                    Dealer Account
                  </option>

                  <option value="dealer-membership">
                    Dealer Membership
                  </option>

                  <option value="vehicle-opportunity">
                    Vehicle Opportunity
                  </option>

                  <option value="partnership">
                    Partnership
                  </option>

                  <option value="technical-support">
                    Technical Support
                  </option>

                  <option value="general">
                    General Question
                  </option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="text-sm font-bold"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  required
                  maxLength={5000}
                  rows={6}
                  placeholder="How can we help?"
                  className="mt-2 w-full resize-y rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />

                <p className="mt-2 text-xs text-slate-400">
                  Maximum 5,000 characters.
                </p>
              </div>

              {/* Status */}
              {status && (
                <div
                  role="status"
                  aria-live="polite"
                  className={`rounded-xl p-4 text-sm font-bold ${
                    status.includes("successfully")
                      ? "bg-green-50 text-green-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  {status}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-blue-600 px-6 py-4 font-black text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Sending..." : "Send Message →"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white px-6 py-8">
        <div className="mx-auto max-w-5xl text-center">
          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap justify-center gap-5 text-sm font-semibold text-slate-500"
          >
            <Link
              href="/"
              className="transition hover:text-blue-600"
            >
              Home
            </Link>

            <Link
              href="/sell"
              className="transition hover:text-blue-600"
            >
              Sell Your Vehicle
            </Link>

            <Link
              href="/buyers"
              className="transition hover:text-blue-600"
            >
              Dealers
            </Link>

            <Link
              href="/pricing"
              className="transition hover:text-blue-600"
            >
              Pricing
            </Link>

            <Link
              href="/about"
              className="transition hover:text-blue-600"
            >
              About
            </Link>

            <Link
              href="/contact"
              className="font-black text-blue-600"
            >
              Contact
            </Link>
          </nav>

          <p className="mt-6 text-sm text-slate-400">
            © 2026 NorthSky Auto. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}