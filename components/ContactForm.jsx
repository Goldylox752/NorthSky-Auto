"use client";

import { useState } from "react";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  topic: "",
  message: "",
  website: "",
};

export default function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    if (error) setError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setStatus("loading");
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "We were unable to send your message. Please try again."
        );
      }

      setSuccess(
        data?.message ||
          "Thanks for contacting NorthSky Auto. Your message has been received."
      );

      setForm(initialForm);
      setStatus("success");
    } catch (err) {
      console.error("Contact form error:", err);

      setError(
        err?.message ||
          "Something went wrong. Please try again."
      );

      setStatus("error");
    }
  }

  const isLoading = status === "loading";

  return (
    <div>
      {success && (
        <div
          role="status"
          className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-emerald-800"
        >
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-600 font-black text-white">
              ✓
            </div>

            <div>
              <p className="font-black">
                Message Sent
              </p>

              <p className="mt-1 text-sm leading-6">
                {success}
              </p>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div
          role="alert"
          className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-5 text-red-800"
        >
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-600 font-black text-white">
              !
            </div>

            <div>
              <p className="font-black">
                Unable to Send
              </p>

              <p className="mt-1 text-sm leading-6">
                {error}
              </p>
            </div>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        {/* Honeypot */}
        <div
          aria-hidden="true"
          className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
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

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="name"
              className="text-sm font-black text-slate-800"
            >
              Full Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              autoComplete="name"
              maxLength={150}
              required
              disabled={isLoading}
              className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:bg-slate-100"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="text-sm font-black text-slate-800"
            >
              Email Address
            </label>

            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              autoComplete="email"
              maxLength={254}
              required
              disabled={isLoading}
              className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:bg-slate-100"
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="phone"
              className="text-sm font-black text-slate-800"
            >
              Phone
            </label>

            <input
              id="phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="Optional"
              autoComplete="tel"
              maxLength={50}
              disabled={isLoading}
              className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:bg-slate-100"
            />
          </div>

          <div>
            <label
              htmlFor="topic"
              className="text-sm font-black text-slate-800"
            >
              Inquiry Type
            </label>

            <select
              id="topic"
              name="topic"
              value={form.topic}
              onChange={handleChange}
              required
              disabled={isLoading}
              className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:bg-slate-100"
            >
              <option value="" disabled>
                Select an option
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

              <option value="sell-vehicle">
                Selling a Vehicle
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
        </div>

        <div>
          <label
            htmlFor="message"
            className="text-sm font-black text-slate-800"
          >
            Message
          </label>

          <textarea
            id="message"
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={7}
            maxLength={5000}
            required
            disabled={isLoading}
            placeholder="Tell us what you need help with..."
            className="mt-2 w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:bg-slate-100"
          />

          <div className="mt-2 flex justify-between text-xs text-slate-400">
            <span>
              Please do not include passwords or payment information.
            </span>

            <span>
              {form.message.length}/5000
            </span>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="flex w-full items-center justify-center gap-3 rounded-xl bg-blue-600 px-6 py-4 text-base font-black text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:bg-blue-400"
        >
          {isLoading ? (
            <>
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Sending Message...
            </>
          ) : (
            <>
              Send Message →
            </>
          )}
        </button>

        <p className="text-center text-xs leading-5 text-slate-500">
          By submitting this form, you are requesting that NorthSky Auto
          contact you regarding your inquiry.
        </p>
      </form>
    </div>
  );
}