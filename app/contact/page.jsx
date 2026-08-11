“use client”;

import Link from “next/link”;
import { useState } from “react”;

export default function ContactPage() {
const [loading, setLoading] = useState(false);
const [status, setStatus] = useState(””);

async function handleSubmit(e) {
e.preventDefault();
setLoading(true);
setStatus(””);

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
  setStatus(
    "Thanks! Your message has been sent successfully."
  );
  form.reset();
} catch (error) {
  setStatus(
    error.message ||
      "Unable to send your message. Please try again."
  );
} finally {
  setLoading(false);
}

}

return (
NorthSky Auto
      <h1 className="mt-4 text-5xl font-black tracking-tight md:text-6xl">
        Contact Us
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
        Have a question about selling a vehicle, dealer
        memberships, vehicle opportunities, or NorthSky Auto?
        Send us a message.
      </p>
    </div>
  </section>
  <section className="px-6 py-16">
    <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-3">
      <div>
        <h2 className="text-2xl font-black">
          How can we help?
        </h2>
        <p className="mt-4 leading-7 text-slate-600">
          Contact us about vehicle sales, dealer accounts,
          memberships, partnerships, or general questions.
        </p>
        <div className="mt-8 space-y-4">
          <Link
            href="/sell"
            className="block rounded-xl bg-blue-600 px-5 py-4 text-center font-black text-white hover:bg-blue-700"
          >
            Sell Your Vehicle
          </Link>
          <Link
            href="/buyers"
            className="block rounded-xl bg-slate-950 px-5 py-4 text-center font-black text-white hover:bg-slate-800"
          >
            Dealer Marketplace
          </Link>
          <Link
            href="/pricing"
            className="block rounded-xl border border-slate-300 bg-white px-5 py-4 text-center font-black hover:border-blue-600 hover:text-blue-600"
          >
            Dealer Pricing
          </Link>
        </div>
      </div>
      <div className="rounded-3xl bg-white p-8 shadow-lg ring-1 ring-slate-200 md:col-span-2">
        <h2 className="text-3xl font-black">
          Send a Message
        </h2>
        <p className="mt-3 text-slate-600">
          Complete the form and we'll receive your inquiry by
          email.
        </p>
        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >
          <input
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
          />
          <div className="grid gap-5 md:grid-cols-2">
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
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              />
            </div>
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
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              />
            </div>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
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
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              />
            </div>
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
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
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
              className="text-sm font-bold"
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
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            />
          </div>
          {status && (
            <div
              className={`rounded-xl p-4 text-sm font-bold ${
                status.includes("successfully")
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-700"
              }`}
            >
              {status}
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 px-6 py-4 font-black text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send Message →"}
          </button>
        </form>
      </div>
    </div>
  </section>
  <footer className="border-t border-slate-200 bg-white px-6 py-8">
    <div className="mx-auto max-w-5xl text-center">
      <nav className="flex flex-wrap justify-center gap-5 text-sm font-semibold text-slate-500">
        <Link href="/" className="hover:text-blue-600">
          Home
        </Link>
        <Link href="/sell" className="hover:text-blue-600">
          Sell Your Vehicle
        </Link>
        <Link href="/buyers" className="hover:text-blue-600">
          Dealers
        </Link>
        <Link href="/pricing" className="hover:text-blue-600">
          Pricing
        </Link>
        <Link href="/about" className="hover:text-blue-600">
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