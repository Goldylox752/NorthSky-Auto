"use client";

import Link from "next/link";
import { useState } from "react";

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

      let data = {};

      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (!response.ok) {
        throw new Error(
          data.error || "Unable to send your message. Please try again."
        );
      }

      setStatus("Message sent successfully!");
      form.reset();
    } catch (error) {
      setStatus(
        error?.message ||
          "Unable to send your message. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* HERO */}
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
            message and our team will review your inquiry.
          </p>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-3">
          {/* QUICK LINKS */}
          <aside>
            <p className="text-sm font-black uppercase tracking-widest text-blue-600">
              NorthSky Auto
            </p>

            <h2 className="mt-3 text-2xl font-black">
              How Can We Help?
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Choose an option below or send us a message about your
              question, vehicle, dealership, membership, or partnership.
            </p>

            <div className="mt-8 space-y-4">
              <Link
                href="/sell"
                className="block rounded-xl bg-blue-600 px-5 py-4 text-center font-black text-white shadow-sm transition hover:bg-blue-700"
              >
                Sell Your Vehicle
              </Link>

              <Link
                href="/buyers"
                className="block rounded-xl bg-slate-950 px-5 py-4 text-center font-black text-white shadow-sm transition hover:bg-slate-800"
              >
                Dealer Marketplace
              </Link>

              <Link
                href="/pricing"
                className="block rounded-xl border border-slate-300 bg-white px-5 py-4 text-center font-black transition hover:border-blue-600 hover:text-blue-600"
              >
                Dealer Pricing
              </Link>

              <Link
                href="/about"
                className="block rounded-xl border border-slate-300 bg-white px-5 py-4 text-center font-black transition hover:border-blue-600 hover:text-blue-600"
              >
                About NorthSky Auto
              </Link>
            </div>
          </aside>

          {/* CONTACT FORM */}
          <div className="rounded-3xl bg-white p-8 shadow-lg ring-1 ring-slate-200 md:col-span-2 md:p-10">
            <div>
              <p className="text-sm font-black uppercase tracking-widest text-blue-600">
                Get In Touch
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">
                Send a Message
              </h2>

              <p className="mt-3 leading-7 text-slate-600">
                Complete the form below and we will receive your inquiry.
                Please do not include passwords, payment information, or
                other sensitive information.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
            >
              {/* HONEYPOT */}
              <div
                aria-hidden="true"
                className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden"
              >
                <label htmlFor="website">
                  Website
                </label>

                <input
                  id="website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* NAME */}
              <div>
                <label
                  htmlFor="name"
                  className="text-sm font-bold text-slate-800"
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
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />
              </div>

              {/* EMAIL */}
              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-bold text-slate-800"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  maxLength={254}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />
              </div>

              {/* PHONE */}
              <div>
                <label
                  htmlFor="phone"
                  className="text-sm font-bold text-slate-800"
                >
                  Phone
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  maxLength={50}
                  placeholder="Optional"
                  autoComplete="tel"
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />
              </div>

              {/* INQUIRY TYPE */}
              <div>
                <label
                  htmlFor="topic"
                  className="text-sm font-bold text-slate-800"
                >
                  Inquiry Type
                </label>

                <select
                  id="topic"
                  name="topic"
                  required
                  defaultValue=""
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
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

                  <option value="other">
                    Other
                  </option>
                </select>
              </div>

              {/* MESSAGE */}
              <div>
                <label
                  htmlFor="message"
                  className="text-sm font-bold text-slate-800"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  required
                  maxLength={5000}
                  rows={7}
                  placeholder="How can we help?"
                  className="mt-2 w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />

                <p className="mt-2 text-xs text-slate-400">
                  Maximum 5,000 characters.
                </p>
              </div>

              {/* STATUS */}
              {status && (
                <div
                  role="status"
                  aria-live="polite"
                  className={`rounded-xl p-4 text-sm font-bold ${
                    status.includes("successfully")
                      ? "bg-green-50 text-green-700 ring-1 ring-green-200"
                      : "bg-red-50 text-red-700 ring-1 ring-red-200"
                  }`}
                >
                  {status}
                </div>
              )}

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-blue-600 px-6 py-4 font-black text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Sending..." : "Send Message →"}
              </button>

              <p className="text-center text-xs leading-5 text-slate-400">
                By submitting this form, you are requesting that NorthSky
                Auto contact you regarding your inquiry.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ / SUPPORT CTA */}
      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-3xl bg-slate-950 p-8 text-white md:p-10">
            <p className="text-sm font-black uppercase tracking-widest text-blue-400">
              Need Something Else?
            </p>

            <h2 className="mt-3 text-3xl font-black">
              Start With the Right NorthSky Auto Page
            </h2>

            <p className="mt-4 max-w-2xl leading-7 text-slate-400">
              Sellers can submit a vehicle, while dealerships can explore
              marketplace access and membership options.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/sell"
                className="rounded-xl bg-white px-6 py-3 font-black text-slate-950 transition hover:bg-slate-100"
              >
                Sell a Vehicle
              </Link>

              <Link
                href="/buyers"
                className="rounded-xl bg-blue-600 px-6 py-3 font-black text-white transition hover:bg-blue-500"
              >
                Dealer Marketplace
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
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

            <Link
              href="/privacy"
              className="transition hover:text-blue-600"
            >
              Privacy
            </Link>

            <Link
              href="/terms"
              className="transition hover:text-blue-600"
            >
              Terms
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