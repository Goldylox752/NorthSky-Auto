import Link from "next/link";
import { notFound } from "next/navigation";
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://northsky-auto.vercel.app";
async function getVehicleLead(id) {
  try {
    const response = await fetch(
      `${SITE_URL}/api/leads?id=${encodeURIComponent(id)}`,
      {
        cache: "no-store",
      }
    );
    if (!response.ok) {
      return null;
    }
    const data = await response.json();
    return data?.lead || null;
  } catch (error) {
    console.error("Vehicle lead fetch error:", error);
    return null;
  }
}
export async function generateMetadata({ params }) {
  const { id } = await params;
  const vehicle = await getVehicleLead(id);
  if (!vehicle) {
    return {
      title: "Vehicle Lead | NorthSky Auto",
      description:
        "View vehicle acquisition opportunities through the NorthSky Auto dealer marketplace.",
    };
  }
  const vehicleName = [
    vehicle.year,
    vehicle.make,
    vehicle.model,
    vehicle.trim,
  ]
    .filter(Boolean)
    .join(" ");
  return {
    title: `${vehicleName} | NorthSky Auto Dealer Portal`,
    description:
      "Review vehicle acquisition details and evaluate this seller submission through the NorthSky Auto dealer marketplace.",
  };
}
function formatCurrency(value) {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return "Not provided";
  }
  const amount = Number(value);
  if (Number.isNaN(amount)) {
    return String(value);
  }
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format(amount);
}
function formatMileage(value) {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return "Not provided";
  }
  const numericValue = Number(value);
  if (Number.isNaN(numericValue)) {
    return String(value);
  }
  return `${new Intl.NumberFormat("en-CA").format(
    numericValue
  )} km`;
}
function Detail({ label, value }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
      <p className="text-xs font-black uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className="mt-2 font-bold text-slate-900">
        {value || "Not provided"}
      </p>
    </div>
  );
}
export default async function VehicleLeadPage({
  params,
}) {
  const { id } = await params;
  const vehicle = await getVehicleLead(id);
  if (!vehicle) {
    notFound();
  }
  const vehicleName = [
    vehicle.year,
    vehicle.make,
    vehicle.model,
    vehicle.trim,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      {/* HEADER */}
      <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-800 text-white">
        <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
          <Link
            href="/dealer/leads"
            className="inline-flex rounded-lg bg-white/10 px-4 py-2 text-sm font-bold text-blue-300 transition hover:bg-white/15 hover:text-white"
          >
            ← Back to Vehicle Leads
          </Link>
          <div className="mt-8">
            <span className="inline-flex rounded-full bg-blue-500/20 px-4 py-2 text-xs font-black uppercase tracking-wide text-blue-300 ring-1 ring-blue-400/20">
              Vehicle Acquisition Opportunity
            </span>
            <h1 className="mt-5 text-4xl font-black tracking-tight md:text-5xl">
              {vehicleName}
            </h1>
            <div className="mt-5 flex flex-wrap gap-3 text-sm">
              {vehicle.condition && (
                <span className="rounded-full bg-green-500/15 px-4 py-2 font-bold text-green-300">
                  {vehicle.condition}
                </span>
              )}
              {vehicle.selling_timeline && (
                <span className="rounded-full bg-white/10 px-4 py-2 font-semibold text-slate-200">
                  {vehicle.selling_timeline}
                </span>
              )}
              <span className="rounded-full bg-white/10 px-4 py-2 font-semibold text-slate-200">
                Lead #{id}
              </span>
            </div>
          </div>
        </div>
      </section>
      {/* CONTENT */}
      <section className="mx-auto max-w-7xl px-6 py-10 md:py-14">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* MAIN */}
          <div className="space-y-8 lg:col-span-2">
            {/* VEHICLE SUMMARY */}
            <section className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200 md:p-8">
              <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-blue-600">
                    Vehicle Summary
                  </p>
                  <h2 className="mt-2 text-3xl font-black">
                    {vehicleName}
                  </h2>
                  <p className="mt-2 text-slate-500">
                    Seller-submitted vehicle acquisition opportunity.
                  </p>
                </div>
                <div className="rounded-2xl bg-blue-50 px-5 py-4 text-right ring-1 ring-blue-100">
                  <p className="text-xs font-black uppercase tracking-wide text-blue-600">
                    Asking Price
                  </p>
                  <p className="mt-1 text-2xl font-black text-slate-950">
                    {formatCurrency(vehicle.asking_price)}
                  </p>
                </div>
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <Detail
                  label="Year"
                  value={vehicle.year}
                />
                <Detail
                  label="Make"
                  value={vehicle.make}
                />
                <Detail
                  label="Model"
                  value={vehicle.model}
                />
                <Detail
                  label="Trim"
                  value={vehicle.trim}
                />
                <Detail
                  label="Mileage"
                  value={formatMileage(
                    vehicle.mileage
                  )}
                />
                <Detail
                  label="Condition"
                  value={vehicle.condition}
                />
                <Detail
                  label="Selling Timeline"
                  value={
                    vehicle.selling_timeline
                  }
                />
                <Detail
                  label="Accident History"
                  value={
                    vehicle.accident_history
                  }
                />
              </div>
            </section>
            {/* PHOTOS */}
            <section className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200 md:p-8">
              <p className="text-xs font-black uppercase tracking-widest text-blue-600">
                Vehicle Photos
              </p>
              <h2 className="mt-2 text-2xl font-black">
                Seller Photos
              </h2>
              <div className="mt-6 flex min-h-64 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 text-center">
                <div>
                  <div className="text-5xl">🚘</div>
                  <p className="mt-4 font-black text-slate-700">
                    No vehicle photos available
                  </p>
                  <p className="mt-2 text-sm text-slate-500">
                    Photos can be added to this lead when available.
                  </p>
                </div>
              </div>
            </section>
            {/* SELLER NOTES */}
            <section className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200 md:p-8">
              <p className="text-xs font-black uppercase tracking-widest text-blue-600">
                Seller Information
              </p>
              <h2 className="mt-2 text-2xl font-black">
                Vehicle Details
              </h2>
              <div className="mt-6 rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200">
                <p className="whitespace-pre-wrap leading-7 text-slate-600">
                  {vehicle.description ||
                    "No additional seller notes were provided."}
                </p>
              </div>
            </section>
            {/* ADDITIONAL DETAILS */}
            <section className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200 md:p-8">
              <p className="text-xs font-black uppercase tracking-widest text-blue-600">
                Acquisition Information
              </p>
              <h2 className="mt-2 text-2xl font-black">
                Additional Details
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <Detail
                  label="Postal Code"
                  value={vehicle.postal_code}
                />
                <Detail
                  label="VIN"
                  value={
                    vehicle.vin
                      ? "Available after lead access"
                      : "Not provided"
                  }
                />
                <Detail
                  label="Lead Status"
                  value={
                    vehicle.status || "New"
                  }
                />
                <Detail
                  label="Estimated Asking Price"
                  value={formatCurrency(
                    vehicle.asking_price
                  )}
                />
              </div>
            </section>
          </div>
          {/* SIDEBAR */}
          <aside className="space-y-6">
            {/* CONTACT */}
            <section className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200 md:p-8">
              <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-black uppercase tracking-wide text-amber-700">
                Seller Contact Protected
              </span>
              <h2 className="mt-5 text-2xl font-black">
                Unlock This Lead
              </h2>
              <p className="mt-3 leading-7 text-slate-600">
                Seller contact information is protected. Lead access can be
                used to evaluate the opportunity and continue the acquisition
                process.
              </p>
              <button
                type="button"
                className="mt-6 w-full rounded-xl bg-blue-600 px-6 py-4 font-black text-white transition hover:bg-blue-700"
              >
                Unlock Lead →
              </button>
              <p className="mt-3 text-center text-xs text-slate-500">
                Lead access and billing can be connected to your dealer
                membership.
              </p>
            </section>
            {/* OFFER */}
            <section className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200 md:p-8">
              <p className="text-xs font-black uppercase tracking-widest text-blue-600">
                Acquisition
              </p>
              <h2 className="mt-2 text-2xl font-black">
                Submit an Offer
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-500">
                Once this lead is unlocked, you can submit your dealership
                offer and message the seller.
              </p>
              <div className="mt-6">
                <label
                  htmlFor="offer"
                  className="mb-2 block text-sm font-bold text-slate-700"
                >
                  Offer Amount (CAD)
                </label>
                <input
                  id="offer"
                  name="offer"
                  type="number"
                  min="0"
                  step="1"
                  placeholder="35000"
                  disabled
                  className="w-full rounded-xl border border-slate-300 bg-slate-100 px-4 py-3 text-slate-500 outline-none"
                />
              </div>
              <div className="mt-4">
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-bold text-slate-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  disabled
                  placeholder="Unlock this lead to contact the seller."
                  className="w-full rounded-xl border border-slate-300 bg-slate-100 px-4 py-3 text-slate-500 outline-none"
                />
              </div>
              <button
                type="button"
                disabled
                className="mt-4 w-full rounded-xl bg-slate-300 py-4 font-black text-slate-500"
              >
                Submit Offer
              </button>
            </section>
            {/* PRICE */}
            <section className="rounded-3xl bg-slate-950 p-7 text-white shadow-lg md:p-8">
              <p className="text-xs font-black uppercase tracking-widest text-blue-400">
                Seller Asking Price
              </p>
              <p className="mt-3 text-4xl font-black">
                {formatCurrency(
                  vehicle.asking_price
                )}
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                The asking price is seller-provided and does not represent a
                guaranteed market value or NorthSky Auto valuation.
              </p>
            </section>
            {/* NAVIGATION */}
            <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <div className="space-y-3">
                <Link
                  href="/dealer/leads"
                  className="block rounded-xl border border-slate-300 px-5 py-3 text-center font-black text-slate-700 transition hover:bg-slate-50"
                >
                  ← Browse All Leads
                </Link>
                <Link
                  href="/dealer/dashboard"
                  className="block rounded-xl bg-slate-950 px-5 py-3 text-center font-black text-white transition hover:bg-slate-800"
                >
                  Dealer Dashboard
                </Link>
              </div>
            </section>
          </aside>
        </div>
      </section>
      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 text-center text-sm text-slate-500 md:flex-row md:items-center md:justify-between md:text-left">
          <p>
            © {new Date().getFullYear()} NorthSky Auto. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-5 md:justify-end">
            <Link
              href="/dealer/dashboard"
              className="font-semibold hover:text-blue-600"
            >
              Dashboard
            </Link>
            <Link
              href="/dealer/leads"
              className="font-semibold hover:text-blue-600"
            >
              Vehicle Leads
            </Link>
            <Link
              href="/contact"
              className="font-semibold hover:text-blue-600"
            >
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}