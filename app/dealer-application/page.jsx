"use client";

import Link from "next/link";
import { useState } from "react";

const benefits = [
  {
    title: "More Inventory",
    text: "Access private sellers looking to sell cars, trucks, SUVs and commercial vehicles.",
  },
  {
    title: "Less Prospecting",
    text: "Spend less time searching and more time acquiring vehicles that fit your lot.",
  },
  {
    title: "Better Opportunities",
    text: "Filter opportunities by location, make, model, year and condition.",
  },
];

const steps = ["Apply", "Get Approved", "Access Leads", "Acquire Vehicles"];

const provinces = [
  "Alberta",
  "British Columbia",
  "Manitoba",
  "New Brunswick",
  "Newfoundland and Labrador",
  "Nova Scotia",
  "Ontario",
  "Prince Edward Island",
  "Quebec",
  "Saskatchewan",
  "Northwest Territories",
  "Nunavut",
  "Yukon",
];

const initialForm = {
  company: "",
  contact: "",
  email: "",
  phone: "",
  website: "",
  location: "",
  province: "",
  licenseNumber: "",
  yearsInBusiness: "",
  inventory: "",
  brands: "",
};

export default function DealerApplicationPage() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (loading) return;

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/dealers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.success) {
        throw new Error(
          data?.error || "Unable to submit your application. Please try again."
        );
      }

      setSuccess(
        "Thanks for applying. Our team will review your application and contact you with next steps."
      );
      setForm(initialForm);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white text-slate-900">
      {/* HERO */}
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(37,99,235,0.28),transparent_45%)]" />
        <div className="relative mx-auto max-w-4xl px-6 py-20 text-center sm:py-24 lg:py-28">
          <span className="inline-flex rounded-full border border-blue-500/30 bg-blue-600/20 px-4 py-1.5 text-xs font-semibold tracking-widest text-blue-300">
            DEALER PARTNER PROGRAM
          </span>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Grow your inventory with
            <br />
            <span className="text-blue-400">NorthSky Auto</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
            Connect with vehicle sellers across Canada and discover acquisition
            opportunities before your competitors.
          </p>
          <a
            href="#application"
            className="mt-10 inline-flex rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:-translate-y-0.5 hover:bg-blue-500"
          >
            Apply as a Dealer →
          </a>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:py-24">
        <h2 className="text-center text-3xl font-extrabold tracking-tight sm:text-4xl">
          Why dealers choose NorthSky Auto
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {benefits.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-8 transition hover:shadow-md"
            >
              <h3 className="text-xl font-bold">{item.title}</h3>
              <p className="mt-3 leading-relaxed text-slate-600">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* APPLICATION FORM */}
      <section id="application" className="border-y border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-3xl px-6 py-20 sm:py-24">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/40 sm:p-10">
            <h2 className="text-3xl font-extrabold tracking-tight">
              Dealer Application
            </h2>
            <p className="mt-3 text-slate-600">
              Tell us about your dealership. Our team will review your
              application and contact you with next steps.
            </p>

            {success && (
              <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
                {success}
              </div>
            )}

            {error && (
              <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-10 grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="company" className="mb-1.5 block text-sm font-semibold text-slate-700">
                  Dealership Name *
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  required
                  value={form.company}
                  onChange={handleChange}
                  placeholder="e.g. Prairie Auto Group"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label htmlFor="contact" className="mb-1.5 block text-sm font-semibold text-slate-700">
                  Primary Contact *
                </label>
                <input
                  id="contact"
                  name="contact"
                  type="text"
                  required
                  value={form.contact}
                  onChange={handleChange}
                  placeholder="Full name"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-slate-700">
                  Email Address *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@dealership.com"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold text-slate-700">
                  Phone Number *
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="(555) 123-4567"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label htmlFor="website" className="mb-1.5 block text-sm font-semibold text-slate-700">
                  Website
                </label>
                <input
                  id="website"
                  name="website"
                  type="url"
                  value={form.website}
                  onChange={handleChange}
                  placeholder="https://"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label htmlFor="location" className="mb-1.5 block text-sm font-semibold text-slate-700">
                  City *
                </label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  required
                  value={form.location}
                  onChange={handleChange}
                  placeholder="City"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label htmlFor="province" className="mb-1.5 block text-sm font-semibold text-slate-700">
                  Province *
                </label>
                <select
                  id="province"
                  name="province"
                  required
                  value={form.province}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="">Select province</option>
                  {provinces.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="licenseNumber" className="mb-1.5 block text-sm font-semibold text-slate-700">
                  Dealer License Number
                </label>
                <input
                  id="licenseNumber"
                  name="licenseNumber"
                  type="text"
                  value={form.licenseNumber}
                  onChange={handleChange}
                  placeholder="License #"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label htmlFor="yearsInBusiness" className="mb-1.5 block text-sm font-semibold text-slate-700">
                  Years in Business
                </label>
                <input
                  id="yearsInBusiness"
                  name="yearsInBusiness"
                  type="number"
                  min="0"
                  value={form.yearsInBusiness}
                  onChange={handleChange}
                  placeholder="e.g. 12"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label htmlFor="inventory" className="mb-1.5 block text-sm font-semibold text-slate-700">
                  Monthly Vehicle Sales
                </label>
                <input
                  id="inventory"
                  name="inventory"
                  type="text"
                  value={form.inventory}
                  onChange={handleChange}
                  placeholder="e.g. 25–40"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="brands" className="mb-1.5 block text-sm font-semibold text-slate-700">
                  About your dealership
                </label>
                <textarea
                  id="brands"
                  name="brands"
                  rows={5}
                  value={form.brands}
                  onChange={handleChange}
                  placeholder="Tell us about your dealership, inventory focus, and what you're looking for..."
                  className="w-full resize-y rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="rounded-xl bg-blue-600 py-4 font-semibold text-white shadow-md shadow-blue-600/20 transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-2"
              >
                {loading ? "Submitting..." : "Submit Dealer Application →"}
              </button>
            </form>

            <p className="mt-5 text-center text-xs text-slate-500">
              Already have an account?{" "}
              <Link href="/dealer/login" className="font-semibold text-blue-600 hover:text-blue-500">
                Sign in
              </Link>{" "}
              or{" "}
              <Link href="/dealer/register" className="font-semibold text-blue-600 hover:text-blue-500">
                create a dealer account
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <h2 className="text-center text-3xl font-extrabold tracking-tight sm:text-4xl">
          How it works
        </h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={step}
              className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm"
            >
              <div className="text-3xl font-extrabold text-blue-600">
                {String(index + 1).padStart(2, "0")}
              </div>
              <h3 className="mt-4 text-lg font-bold">{step}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center text-white sm:py-24">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Ready to grow your inventory?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-blue-100">
            Join NorthSky Auto and connect with motivated vehicle sellers across
            Canada.
          </p>
          <a
            href="#application"
            className="mt-10 inline-flex rounded-xl bg-white px-8 py-4 font-semibold text-blue-700 shadow-md transition hover:bg-blue-50"
          >
            Start Application →
          </a>
        </div>
      </section>
    </div>
  );
}