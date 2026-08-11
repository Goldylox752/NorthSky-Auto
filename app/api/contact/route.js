"use client";
import { useState } from "react";
import Link from "next/link";
const initialForm = {
  name: "",
  email: "",
  phone: "",
  topic: "",
  message: "",
  website: "",
};
const topics = [
  { value: "selling-vehicle", label: "Selling a Vehicle" },
  { value: "dealer-account", label: "Dealer Account" },
  { value: "dealer-membership", label: "Dealer Membership" },
  { value: "vehicle-opportunity", label: "Vehicle Opportunity" },
  { value: "partnership", label: "Partnership" },
  { value: "technical-support", label: "Technical Support" },
  { value: "general", label: "General Question" },
];
export default function ContactPage() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
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
    setStatus("");
    setError("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok || !data?.success) {
        throw new Error(
          data?.error ||
            "We could not send your message. Please try again."
        );
      }
      setStatus(
        data.message ||
          "Thanks for contacting NorthSky Auto. Your message has been received."
      );
      setForm(initialForm);
    } catch (err) {
      setError(
        err.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-300">
              Contact NorthSky Auto
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
              Let&apos;s talk about your vehicle or dealership needs.
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              Have a question about selling a vehicle, dealership access,
              vehicle opportunities, or NorthSky Auto? Send us a message
              and we&apos;ll get back to you.
            </p>
          </div>
        </div>
      </section>
      {/* Main */}
      <section className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-3">
          {/* Info */}
          <div>
            <h2 className="text-2xl font-bold">
              How can we help?
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              NorthSky Auto connects vehicle sellers with dealerships
              and qualified automotive buyers across Canada.
            </p>
            <div className="mt-8 space-y-7">
              <div>
                <h3 className="font-semibold">
                  Selling a Vehicle
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Looking to sell a car, truck, SUV, or commercial
                  vehicle? You can submit your vehicle directly.
                </p>
                <Link
                  href="/sell"
                  className="mt-3 inline-block text-sm font-semibold text-blue-600 hover:text-blue-500"
                >
                  Submit a Vehicle →
                </Link>
              </div>
              <div>
                <h3 className="font-semibold">
                  Dealerships
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Interested in accessing vehicle opportunities and
                  dealership services?
                </p>
                <Link
                  href="/buyers"
                  className="mt-3 inline-block text-sm font-semibold text-blue-600 hover:text-blue-500"
                >
                  Dealer Information →
                </Link>
              </div>
              <div>
                <h3 className="font-semibold">
                  General Support
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Have a question about your account, a vehicle
                  opportunity, or the NorthSky Auto platform?
                </p>
              </div>
            </div>
          </div>
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold">
                Send us a message
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Complete the form below and our team will receive your
                inquiry.
              </p>
              {/* Success */}
              {status && (
                <div
                  role="status"
                  className="mt-6 rounded-lg border border-green-200 bg-green-50 p-4 text-sm font-medium text-green-800"
                >
                  {status}
                </div>
              )}
              {/* Error */}
              {error && (
                <div
                  role="alert"
                  className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-800"
                >
                  {error}
                </div>
              )}
              <form
                onSubmit={handleSubmit}
                className="mt-8 space-y-6"
              >
                {/* Honeypot */}
                <div
                  className="absolute -left-[9999px]"
                  aria-hidden="true"
                >
                  <label htmlFor="website">
                    Website
                  </label>
                  <input
                    id="website"
                    name="website"
                    type="text"
                    value={form.website}
                    onChange={handleChange}
                    tabIndex="-1"
                    autoComplete="off"
                  />
                </div>
                {/* Name + Email */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-slate-700"
                    >
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      maxLength={150}
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      autoComplete="name"
                      className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-slate-700"
                    >
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      maxLength={254}
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      autoComplete="email"
                      className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                </div>
                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-semibold text-slate-700"
                  >
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    maxLength={50}
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Optional"
                    autoComplete="tel"
                    className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
                {/* Topic */}
                <div>
                  <label
                    htmlFor="topic"
                    className="block text-sm font-semibold text-slate-700"
                  >
                    What can we help with?{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="topic"
                    name="topic"
                    required
                    value={form.topic}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="">
                      Select an option
                    </option>
                    {topics.map((item) => (
                      <option
                        key={item.value}
                        value={item.value}
                      >
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-slate-700"
                  >
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    maxLength={5000}
                    rows={7}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help..."
                    className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                  <p className="mt-2 text-xs text-slate-500">
                    Maximum 5,000 characters.
                  </p>
                </div>
                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-lg bg-blue-600 px-6 py-3.5 font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      {/* Bottom CTA */}
      <section className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-6 py-16 text-center lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight">
            Ready to sell your vehicle?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Submit your vehicle information and let NorthSky Auto help
            connect you with potential automotive buyers.
          </p>
          <div className="mt-7">
            <Link
              href="/sell"
              className="inline-flex rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500"
            >
              Submit Your Vehicle
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}