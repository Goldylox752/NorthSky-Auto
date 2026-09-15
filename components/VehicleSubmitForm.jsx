"use client";

import { useState } from "react";
import Link from "next/link";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  postal_code: "",
  year: "",
  make: "",
  model: "",
  trim: "",
  mileage: "",
  vin: "",
  condition: "",
  selling_timeline: "",
  accident_history: "",
  description: "",
  asking_price: "",
};

const conditions = [
  "Excellent",
  "Very Good",
  "Good",
  "Fair",
  "Needs Work",
];

const timelines = [
  "As soon as possible",
  "Within 2 weeks",
  "Within 30 days",
  "Within 60 days",
  "Just exploring",
];

const currentYear = new Date().getFullYear() + 1;
const years = Array.from({ length: 40 }, (_, i) => currentYear - i);

export default function VehicleSubmitForm() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (loading) return;

    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const payload = {
        ...form,
        year: Number(form.year),
        mileage: Number(form.mileage),
        asking_price: Number(form.asking_price),
      };

      const response = await fetch("/api/vehicles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.success) {
        throw new Error(
          data?.error || "Unable to submit your vehicle. Please try again."
        );
      }

      setSuccess(true);
      setForm(initialForm);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-8 text-center sm:p-10">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-2xl">
          ✓
        </div>
        <h3 className="mt-5 text-2xl font-extrabold text-slate-900">
          Vehicle submitted
        </h3>
        <p className="mx-auto mt-3 max-w-md text-slate-600">
          Thanks — your vehicle is awaiting review. Our team will be in touch if
          there&apos;s an opportunity to connect you with a dealer.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => setSuccess(false)}
            className="rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-800"
          >
            Submit another vehicle
          </button>
          <Link
            href="/"
            className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-900 transition hover:bg-slate-50"
          >
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20";
  const labelClass = "mb-1.5 block text-sm font-semibold text-slate-700";

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </div>
      )}

      {/* Seller info */}
      <div>
        <h3 className="text-lg font-bold text-slate-900">Your contact info</h3>
        <p className="mt-1 text-sm text-slate-500">
          Dealers or our team may reach out about this opportunity.
        </p>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="name" className={labelClass}>
              Full name *
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="Jane Smith"
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="email" className={labelClass}>
              Email *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="you@email.com"
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="phone" className={labelClass}>
              Phone *
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              value={form.phone}
              onChange={handleChange}
              placeholder="(416) 555-1234"
              className={inputClass}
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="postal_code" className={labelClass}>
              Postal code
            </label>
            <input
              id="postal_code"
              name="postal_code"
              type="text"
              value={form.postal_code}
              onChange={handleChange}
              placeholder="M5V 2T6"
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* Vehicle info */}
      <div>
        <h3 className="text-lg font-bold text-slate-900">Vehicle details</h3>
        <p className="mt-1 text-sm text-slate-500">
          The basics dealers need to evaluate the opportunity.
        </p>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="year" className={labelClass}>
              Year *
            </label>
            <select
              id="year"
              name="year"
              required
              value={form.year}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">Select year</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="make" className={labelClass}>
              Make *
            </label>
            <input
              id="make"
              name="make"
              type="text"
              required
              value={form.make}
              onChange={handleChange}
              placeholder="Toyota"
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="model" className={labelClass}>
              Model *
            </label>
            <input
              id="model"
              name="model"
              type="text"
              required
              value={form.model}
              onChange={handleChange}
              placeholder="RAV4"
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="trim" className={labelClass}>
              Trim
            </label>
            <input
              id="trim"
              name="trim"
              type="text"
              value={form.trim}
              onChange={handleChange}
              placeholder="XLE"
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="mileage" className={labelClass}>
              Mileage (km) *
            </label>
            <input
              id="mileage"
              name="mileage"
              type="number"
              required
              min="0"
              value={form.mileage}
              onChange={handleChange}
              placeholder="45000"
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="asking_price" className={labelClass}>
              Asking price (CAD) *
            </label>
            <input
              id="asking_price"
              name="asking_price"
              type="number"
              required
              min="0"
              step="100"
              value={form.asking_price}
              onChange={handleChange}
              placeholder="28500"
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="vin" className={labelClass}>
              VIN
            </label>
            <input
              id="vin"
              name="vin"
              type="text"
              value={form.vin}
              onChange={handleChange}
              placeholder="17-character VIN"
              maxLength={17}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="condition" className={labelClass}>
              Condition
            </label>
            <select
              id="condition"
              name="condition"
              value={form.condition}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">Select condition</option>
              {conditions.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="selling_timeline" className={labelClass}>
              Selling timeline
            </label>
            <select
              id="selling_timeline"
              name="selling_timeline"
              value={form.selling_timeline}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">Select timeline</option>
              {timelines.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="accident_history" className={labelClass}>
              Accident history
            </label>
            <input
              id="accident_history"
              name="accident_history"
              type="text"
              value={form.accident_history}
              onChange={handleChange}
              placeholder="None / minor / major"
              className={inputClass}
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="description" className={labelClass}>
              Additional details
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              value={form.description}
              onChange={handleChange}
              placeholder="Service history, upgrades, reason for selling, etc."
              className={`${inputClass} resize-y`}
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-blue-600 py-4 font-semibold text-white shadow-md shadow-blue-600/20 transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Submitting..." : "Submit Vehicle →"}
      </button>

      <p className="text-center text-xs text-slate-500">
        By submitting, you agree to be contacted about this vehicle opportunity.
        NorthSky Auto does not purchase vehicles directly.
      </p>
    </form>
  );
}