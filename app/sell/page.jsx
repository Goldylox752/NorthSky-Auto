"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { trackSellerSubmission } from "./SellerTracking";

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

function getAttribution() {
  if (typeof window === "undefined") {
    return {
      source: "direct",
      campaign: "organic",
    };
  }

  try {
    const params = new URLSearchParams(window.location.search);

    const urlSource = params.get("source");
    const urlCampaign = params.get("campaign");

    const savedSource = sessionStorage.getItem(
      "northsky_source"
    );

    const savedCampaign = sessionStorage.getItem(
      "northsky_campaign"
    );

    const source =
      urlSource ||
      savedSource ||
      "direct";

    const campaign =
      urlCampaign ||
      savedCampaign ||
      "organic";

    // Preserve attribution for the rest of the session.
    sessionStorage.setItem(
      "northsky_source",
      source
    );

    sessionStorage.setItem(
      "northsky_campaign",
      campaign
    );

    return {
      source,
      campaign,
    };
  } catch {
    return {
      source: "direct",
      campaign: "organic",
    };
  }
}

export default function SellPage() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const [attribution, setAttribution] = useState({
    source: "direct",
    campaign: "organic",
  });

  useEffect(() => {
    setAttribution(getAttribution());
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((current) => ({
      ...current,
      [name]:
        name === "vin"
          ? value
              .toUpperCase()
              .replace(/\s/g, "")
          : name === "postal_code"
          ? value.toUpperCase()
          : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setSuccess(false);

    try {
      /*
       * Step 1:
       * Submit the vehicle to the existing leads API.
       */
      const response = await fetch(
        "/api/leads",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      let data = {};

      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (!response.ok || !data.success) {
        throw new Error(
          data?.error ||
            "Unable to submit your vehicle. Please try again."
        );
      }

      /*
       * Step 2:
       * The vehicle submission succeeded.
       *
       * Now record the marketing conversion.
       */
      await trackSellerSubmission({
        source: attribution.source,
        campaign: attribution.campaign,
        metadata: {
          vehicle_year: form.year,
          vehicle_make: form.make,
          vehicle_model: form.model,
          selling_timeline:
            form.selling_timeline || null,
        },
      });

      /*
       * Step 3:
       * Show success message.
       */
      setSuccess(true);

      setMessage(
        "Your vehicle has been submitted successfully. NorthSky Auto can now review your submission for potential dealership acquisition opportunities."
      );

      setForm(initialForm);
    } catch (error) {
      console.error(
        "Vehicle submission error:",
        error
      );

      setSuccess(false);

      setMessage(
        error?.message ||
          "Something went wrong while submitting your vehicle. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      {/* HERO */}
      <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white">
        <div className="mx-auto max-w-5xl px-6 py-16 text-center md:py-20">
          <span className="inline-flex rounded-full bg-blue-600/20 px-4 py-2 text-sm font-bold text-blue-300 ring-1 ring-blue-500/30">
            FREE VEHICLE SUBMISSION
          </span>

          <h1 className="mt-6 text-4xl font-black tracking-tight md:text-5xl">
            Sell Your Vehicle to Canadian Dealers
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            Tell us about your vehicle and create a potential
            acquisition opportunity for participating
            dealerships across Canada.
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-slate-300">
            <span>✓ Free to submit</span>
            <span>✓ Canadian marketplace</span>
            <span>
              ✓ Cars, trucks, SUVs & commercial vehicles
            </span>
          </div>
        </div>
      </section>

      {/* FORM */}
      <section className="px-6 py-12 md:py-16">
        <div className="mx-auto max-w-5xl">
          <form
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            {/* SELLER INFORMATION */}
            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 md:p-8">
              <SectionHeading
                step="01"
                title="Your Information"
                description="Provide your contact information so NorthSky Auto can communicate with you about your vehicle submission."
              />

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
                  type="tel"
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

            {/* VEHICLE INFORMATION */}
            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 md:p-8">
              <SectionHeading
                step="02"
                title="Vehicle Information"
                description="Give dealerships the basic information they need to evaluate your vehicle."
              />

              <div className="grid gap-5 md:grid-cols-2">
                <Field
                  label="Year"
                  name="year"
                  type="number"
                  min="1900"
                  max="2035"
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
                  min="0"
                  value={form.mileage}
                  onChange={handleChange}
                  placeholder="85000"
                  required
                />

                <Field
                  label="Asking Price (CAD)"
                  name="asking_price"
                  type="number"
                  min="0"
                  step="1"
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
                  maxLength={17}
                />

                <p className="mt-2 text-xs text-slate-400">
                  Your VIN should normally contain 17
                  characters. Do not include spaces.
                </p>
              </div>
            </div>

            {/* CONDITION */}
            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 md:p-8">
              <SectionHeading
                step="03"
                title="Vehicle Condition"
                description="Provide additional information that can help dealerships understand the vehicle."
              />

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
                <label
                  htmlFor="description"
                  className="mb-2 block text-sm font-bold text-slate-700"
                >
                  Vehicle Details
                </label>

                <textarea
                  id="description"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={6}
                  maxLength={5000}
                  placeholder="Tell us about maintenance, upgrades, options, damage, tires, mechanical issues, recent repairs, ownership history, or anything else a dealership should know."
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />

                <p className="mt-2 text-right text-xs text-slate-400">
                  {form.description.length}/5000
                </p>
              </div>
            </div>

            {/* SUBMISSION */}
            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 md:p-8">
              <div className="rounded-2xl bg-blue-50 p-6 ring-1 ring-blue-100">
                <h3 className="font-black text-slate-900">
                  What happens after you submit?
                </h3>

                <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                  <li className="flex gap-3">
                    <span className="font-black text-blue-600">
                      ✓
                    </span>

                    <span>
                      Your vehicle information is securely
                      submitted to NorthSky Auto.
                    </span>
                  </li>

                  <li className="flex gap-3">
                    <span className="font-black text-blue-600">
                      ✓
                    </span>

                    <span>
                      Your submission can be reviewed for
                      potential dealership acquisition
                      opportunities.
                    </span>
                  </li>

                  <li className="flex gap-3">
                    <span className="font-black text-blue-600">
                      ✓
                    </span>

                    <span>
                      NorthSky Auto may contact you regarding
                      your submission.
                    </span>
                  </li>

                  <li className="flex gap-3">
                    <span className="font-black text-blue-600">
                      ✓
                    </span>

                    <span>
                      Submission does not guarantee an offer,
                      buyer, or sale.
                    </span>
                  </li>
                </ul>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-6 w-full rounded-xl bg-blue-600 py-4 text-lg font-black text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading
                  ? "Submitting Vehicle..."
                  : "Submit My Vehicle →"}
              </button>

              {message && (
                <div
                  role="alert"
                  className={`mt-5 rounded-xl p-4 text-center text-sm font-bold ${
                    success
                      ? "bg-green-50 text-green-700 ring-1 ring-green-200"
                      : "bg-red-50 text-red-700 ring-1 ring-red-200"
                  }`}
                >
                  {message}
                </div>
              )}

              <p className="mt-5 text-center text-xs leading-5 text-slate-400">
                By submitting this form, you agree that
                NorthSky Auto may contact you regarding your
                vehicle submission. Review our{" "}
                <Link
                  href="/privacy"
                  className="font-semibold text-blue-600 hover:underline"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

/*
|--------------------------------------------------------------------------
| Section Heading
|--------------------------------------------------------------------------
*/

function SectionHeading({
  step,
  title,
  description,
}) {
  return (
    <div className="mb-7">
      <p className="text-sm font-black uppercase tracking-widest text-blue-600">
        Step {step}
      </p>

      <h2 className="mt-2 text-2xl font-black text-slate-900">
        {title}
      </h2>

      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
        {description}
      </p>
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| Input Field
|--------------------------------------------------------------------------
*/

function Field({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  min,
  max,
  step,
  maxLength,
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
        required={required}
        min={min}
        max={max}
        step={step}
        maxLength={maxLength}
        autoComplete={
          name === "email"
            ? "email"
            : name === "phone"
            ? "tel"
            : name === "name"
            ? "name"
            : name === "postal_code"
            ? "postal-code"
            : "off"
        }
        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
      />
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| Select Field
|--------------------------------------------------------------------------
*/

function SelectField({
  label,
  name,
  value,
  onChange,
  options,
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-bold text-slate-700"
      >
        {label}
      </label>

      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
      >
        <option value="">
          Select...
        </option>

        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}