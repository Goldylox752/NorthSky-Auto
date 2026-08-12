"use client";

import Link from "next/link";
import { useState } from "react";

const topics = [
  {
    value: "selling-vehicle",
    label: "Selling a vehicle",
  },
  {
    value: "dealer-account",
    label: "Dealership access",
  },
  {
    value: "vehicle-opportunity",
    label: "Vehicle opportunity",
  },
  {
    value: "partnership",
    label: "Partnership",
  },
  {
    value: "technical-support",
    label: "Technical support",
  },
  {
    value: "general",
    label: "General question",
  },
];

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    if (loading) return;

    setLoading(true);
    setSuccess("");
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get("name")?.toString().trim(),
      email: formData.get("email")?.toString().trim(),
      phone: formData.get("phone")?.toString().trim(),
      topic: formData.get("topic")?.toString(),
      message: formData.get("message")?.toString().trim(),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      let data = {};

      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (!response.ok) {
        throw new Error(
          data?.error || "Unable to send your message."
        );
      }

      setSuccess(
        data?.message ||
          "Thanks for contacting NorthSky Auto. Your message has been sent."
      );

      form.reset();
    } catch (err) {
      console.error("NorthSky Auto contact error:", err);

      setError(
        err?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-900 text-white">
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-widest text-blue-300">
              Contact NorthSky Auto
            </p>

            <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
              Let&apos;s talk about your vehicle or dealership needs.
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-300">
              Have a question about selling a vehicle, joining the
              dealership marketplace, or how NorthSky Auto works?
              Get in touch with our team.
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT CONTENT */}
      <section className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-3">
          {/* CONTACT INFO */}
          <div className="lg:col-span-1">
            <p className="text-sm font-black uppercase tracking-widest text-blue-600">
              GET IN TOUCH
            </p>

            <h2 className="mt-3 text-3xl font-black">
              How can we help?
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Whether you&apos;re a vehicle seller, dealership, or
              automotive business, we&apos;re here to help answer
              your questions.
            </p>

            <div className="mt-8 space-y-6">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <h3 className="font-black text-slate-900">
                  🚗 Vehicle Sellers
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Questions about submitting your vehicle or how the
                  selling process works?
                </p>

                <Link
                  href="/sell"
                  className="mt-3 inline-block text-sm font-black text-blue-600 hover:text-blue-500"
                >
                  Submit a Vehicle →
                </Link>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <h3 className="font-black text-slate-900">
                  🏢 Dealerships
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Interested in accessing vehicle opportunities through
                  NorthSky Auto?
                </p>

                <Link
                  href="/buyers"
                  className="mt-3 inline-block text-sm font-black text-blue-600 hover:text-blue-500"
                >
                  Dealer Information →
                </Link>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <h3 className="font-black text-slate-900">
                  💬 General Questions
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  For general questions, partnerships, or technical
                  support, send us a message using the form.
                </p>
              </div>
            </div>
          </div>

          {/* CONTACT FORM */}
          <div className="lg:col-span-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg sm:p-8">
              <div>
                <p className="text-sm font-black uppercase tracking-widest text-blue-600">
                  CONTACT FORM
                </p>

                <h2 className="mt-3 text-3xl font-black">
                  Send us a message
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Fill out the form below and provide as much detail as
                  possible.
                </p>
              </div>

              {success && (
                <div
                  role="status"
                  className="mt-6 rounded-2xl border border-green-200 bg-green-50 p-4 text-sm font-semibold text-green-700"
                >
                  {success}
                </div>
              )}

              {error && (
                <div
                  role="alert"
                  className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700"
                >
                  {error}
                </div>
              )}

              <form
                onSubmit={handleSubmit}
                className="mt-8 space-y-6"
              >
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-black text-slate-700"
                    >
                      Name
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="Your name"
                      className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-black text-slate-700"
                    >
                      Email
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="you@example.com"
                      className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-black text-slate-700"
                  >
                    Phone
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="Optional"
                    className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="topic"
                    className="block text-sm font-black text-slate-700"
                  >
                    What can we help with?
                  </label>

                  <select
                    id="topic"
                    name="topic"
                    required
                    defaultValue=""
                    className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="" disabled>
                      Select an option
                    </option>

                    {topics.map((topic) => (
                      <option
                        key={topic.value}
                        value={topic.value}
                      >
                        {topic.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-black text-slate-700"
                  >
                    Message
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={7}
                    placeholder="How can we help?"
                    className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-blue-600 px-6 py-4 font-black text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  {loading ? "Sending Message..." : "Send Message"}
                </button>

                <p className="text-xs leading-5 text-slate-500">
                  By submitting this form, you&apos;re requesting that
                  NorthSky Auto contact you regarding your message.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* SELL CTA */}
      <section className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-6 py-16 text-center lg:px-8">
          <p className="text-sm font-black uppercase tracking-widest text-blue-600">
            SELLING A VEHICLE?
          </p>

          <h2 className="mt-3 text-3xl font-black tracking-tight">
            Skip the contact form.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Submit your vehicle directly to NorthSky Auto and provide
            the information dealerships need to evaluate the opportunity.
          </p>

          <div className="mt-7">
            <Link
              href="/sell"
              className="inline-flex rounded-xl bg-blue-600 px-6 py-3 font-black text-white transition hover:bg-blue-500"
            >
              Submit Your Vehicle
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-slate-950 text-slate-300">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <div>
            <Link
              href="/"
              className="text-lg font-black text-white"
            >
              NorthSky Auto
            </Link>

            <p className="mt-2 text-sm text-slate-400">
              Canadian vehicle marketplace and dealer acquisition platform.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
            <Link href="/" className="hover:text-white">
              Home
            </Link>

            <Link href="/sell" className="hover:text-white">
              Sell
            </Link>

            <Link href="/buyers" className="hover:text-white">
              Dealers
            </Link>

            <Link href="/pricing" className="hover:text-white">
              Pricing
            </Link>

            <Link href="/about" className="hover:text-white">
              About
            </Link>

            <Link href="/contact" className="hover:text-white">
              Contact
            </Link>
          </nav>
        </div>

        <div className="border-t border-white/10">
          <div className="mx-auto max-w-6xl px-6 py-5 text-center text-xs text-slate-500 lg:px-8 sm:text-left">
            © {new Date().getFullYear()} NorthSky Auto. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}