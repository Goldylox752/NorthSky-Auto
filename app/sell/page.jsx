"use client";
import { useState } from "react";
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
export default function SellPage() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  function handleChange(e) {
    setForm((current) => ({
      ...current,
      [e.target.name]: e.target.value,
    }));
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setSuccess(false);
    try {
      const response = await fetch("/api/vehicles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || "Unable to submit vehicle.");
      }
      setSuccess(true);
      setMessage(
        "Your vehicle has been submitted successfully. Our dealer network can now review your vehicle."
      );
      setForm(initialForm);
    } catch (error) {
      setSuccess(false);
      setMessage(
        error.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }
  return (
    <main className="min-h-screen bg-slate-100">
      {/* Header */}
      <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white">
        <div className="mx-auto max-w-5xl px-6 py-16 text-center">
          <span className="inline-flex rounded-full bg-blue-600/20 px-4 py-2 text-sm font-semibold text-blue-300 ring-1 ring-blue-500/30">
            Free Vehicle Submission
          </span>
          <h1 className="mt-6 text-4xl font-extrabold md:text-5xl">
            Sell Your Vehicle to Canadian Dealers
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            Tell us about your vehicle and create an acquisition opportunity
            for dealerships in the NorthSky Auto network.
          </p>
        </div>
      </section>
      {/* Form */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-5xl">
          <form
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            {/* Seller Information */}
            <div className="rounded-2xl bg-white p-6 shadow-sm md:p-8">
              <div className="mb-6">
                <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                  Step 1
                </p>
                <h2 className="mt-1 text-2xl font-bold">
                  Your Information
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  We'll use this information to contact you about your vehicle.
                </p>
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                <Field
                  label="Full Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Smith"
                  required
                />
                <Field
                  label="Phone Number"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="780-555-1234"
                  required
                />
                <Field
                  label="Email Address"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                />
                <Field
                  label="Postal Code"
                  name="postal_code"
                  value={form.postal_code}
                  onChange={handleChange}
                  placeholder="T9E 0A1"
                  required
                />
              </div>
            </div>
            {/* Vehicle Information */}
            <div className="rounded-2xl bg-white p-6 shadow-sm md:p-8">
              <div className="mb-6">
                <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                  Step 2
                </p>
                <h2 className="mt-1 text-2xl font-bold">
                  Vehicle Information
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  Give dealers the information they need to evaluate your vehicle.
                </p>
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                <Field
                  label="Year"
                  name="year"
                  type="number"
                  value={form.year}
                  onChange={handleChange}
                  placeholder="2022"
                  required
                />
                <Field
                  label="Make"
                  name="make"
                  value={form.make}
                  onChange={handleChange}
                  placeholder="Ford"
                  required
                />
                <Field
                  label="Model"
                  name="model"
                  value={form.model}
                  onChange={handleChange}
                  placeholder="F-150"
                  required
                />
                <Field
                  label="Trim"
                  name="trim"
                  value={form.trim}
                  onChange={handleChange}
                  placeholder="XLT"
                />
                <Field
                  label="Mileage (km)"
                  name="mileage"
                  type="number"
                  value={form.mileage}
                  onChange={handleChange}
                  placeholder="85000"
                  required
                />
                <Field
                  label="Asking Price"
                  name="asking_price"
                  type="number"
                  value={form.asking_price}
                  onChange={handleChange}
                  placeholder="35000"
                  required
                />
              </div>
              <div className="mt-5">
                <Field
                  label="VIN"
                  name="vin"
                  value={form.vin}
                  onChange={handleChange}
                  placeholder="17-character VIN (optional)"
                />
              </div>
            </div>
            {/* Condition */}
            <div className="rounded-2xl bg-white p-6 shadow-sm md:p-8">
              <div className="mb-6">
                <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                  Step 3
                </p>
                <h2 className="mt-1 text-2xl font-bold">
                  Vehicle Condition
                </h2>
              </div>
              <div className="grid gap-5 md:grid-cols-3">
                <SelectField
                  label="Overall Condition"
                  name="condition"
                  value={form.condition}
                  onChange={handleChange}
                  options={[
                    "Excellent",
                    "Good",
                    "Fair",
                    "Needs Work",
                  ]}
                />
                <SelectField
                  label="Selling Timeline"
                  name="selling_timeline"
                  value={form.selling_timeline}
                  onChange={handleChange}
                  options={[
                    "Immediately",
                    "Within 30 Days",
                    "Within 60 Days",
                    "Just Exploring",
                  ]}
                />
                <SelectField
                  label="Accident History"
                  name="accident_history"
                  value={form.accident_history}
                  onChange={handleChange}
                  options={[
                    "No Accidents",
                    "Minor Accident",
                    "Major Accident",
                    "Unknown",
                  ]}
                />
              </div>
              <div className="mt-5">
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Vehicle Details
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={6}
                  placeholder="Tell us about maintenance, upgrades, options, damage, tires, mechanical issues, recent repairs, etc."
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>
            {/* Submit */}
            <div className="rounded-2xl bg-white p-6 shadow-sm md:p-8">
              <div className="rounded-xl bg-blue-50 p-5">
                <h3 className="font-bold text-slate-900">
                  What happens next?
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  <li>✓ Your vehicle information is submitted.</li>
                  <li>✓ The opportunity can be reviewed by participating dealers.</li>
                  <li>✓ A NorthSky Auto representative may contact you.</li>
                </ul>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="mt-6 w-full rounded-xl bg-blue-600 py-4 text-lg font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading
                  ? "Submitting Vehicle..."
                  : "Submit My Vehicle"}
              </button>
              {message && (
                <div
                  className={`mt-5 rounded-xl p-4 text-center text-sm font-semibold ${
                    success
                      ? "bg-green-50 text-green-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  {message}
                </div>
              )}
              <p className="mt-4 text-center text-xs text-slate-400">
                By submitting this form, you agree that NorthSky Auto may
                contact you regarding your vehicle submission.
              </p>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
/* Input Component */
function Field({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
        {required && (
          <span className="ml-1 text-red-500">*</span>
        )}
      </label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
      />
    </div>
  );
}
/* Select Component */
function SelectField({
  label,
  name,
  value,
  onChange,
  options,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
      >
        <option value="">
          Select...
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}