import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "../../../../lib/supabase";
export const metadata = {
  title: "Vehicle Lead | NorthSky Auto Admin",
  description:
    "Review and manage vehicle submissions and seller information.",
};
export default async function AdminVehicleDetailPage({ params }) {
  const { id } = await params;
  const { data: vehicle, error } = await supabase
    .from("vehicles")
    .select("*")
    .eq("id", id)
    .single();
  if (error || !vehicle) {
    notFound();
  }
  const status = vehicle.status || "pending";
  const statusStyles = {
    pending: "bg-yellow-100 text-yellow-800",
    new: "bg-blue-100 text-blue-800",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
  };
  return (
    <main className="min-h-screen bg-slate-100">
      {/* Header */}
      <section className="bg-gradient-to-r from-slate-950 via-blue-950 to-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <Link
            href="/admin/vehicles"
            className="text-sm font-semibold text-blue-300 hover:text-white"
          >
            ← Back to Vehicle Leads
          </Link>
          <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-blue-400">
                Vehicle Lead
              </p>
              <h1 className="mt-2 text-4xl font-extrabold md:text-5xl">
                {vehicle.year || ""}{" "}
                {vehicle.make || ""}{" "}
                {vehicle.model || ""}
              </h1>
              {vehicle.trim && (
                <p className="mt-2 text-lg text-gray-300">
                  {vehicle.trim}
                </p>
              )}
            </div>
            <span
              className={`w-fit rounded-full px-5 py-2 text-sm font-bold uppercase ${
                statusStyles[status.toLowerCase()] ||
                "bg-gray-100 text-gray-800"
              }`}
            >
              {status}
            </span>
          </div>
        </div>
      </section>
      {/* Main */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* LEFT */}
          <div className="space-y-8 lg:col-span-2">
            {/* Vehicle Card */}
            <div className="rounded-2xl bg-white p-8 shadow-sm">
              <div className="flex h-56 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-200 to-blue-100">
                <div className="text-center">
                  <div className="text-7xl">🚗</div>
                  <p className="mt-3 font-semibold text-slate-500">
                    Vehicle Photos
                  </p>
                  <p className="text-sm text-slate-400">
                    Photos can be added later
                  </p>
                </div>
              </div>
              <h2 className="mt-8 text-2xl font-bold text-slate-900">
                Vehicle Information
              </h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <Info label="Year" value={vehicle.year} />
                <Info label="Make" value={vehicle.make} />
                <Info label="Model" value={vehicle.model} />
                <Info label="Trim" value={vehicle.trim} />
                <Info
                  label="Mileage"
                  value={
                    vehicle.mileage
                      ? `${Number(vehicle.mileage).toLocaleString()} km`
                      : null
                  }
                />
                <Info
                  label="Asking Price"
                  value={
                    vehicle.asking_price
                      ? `$${Number(
                          vehicle.asking_price
                        ).toLocaleString()}`
                      : null
                  }
                />
                <Info
                  label="Condition"
                  value={vehicle.condition}
                />
                <Info
                  label="VIN"
                  value={vehicle.vin}
                />
              </div>
            </div>
            {/* Seller Description */}
            <div className="rounded-2xl bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900">
                Seller Description
              </h2>
              <div className="mt-5 rounded-xl bg-slate-50 p-6">
                <p className="whitespace-pre-wrap leading-7 text-slate-700">
                  {vehicle.description ||
                    "The seller did not provide any additional vehicle details."}
                </p>
              </div>
            </div>
            {/* Submission Details */}
            <div className="rounded-2xl bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900">
                Submission Details
              </h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <Info
                  label="Lead ID"
                  value={vehicle.id}
                />
                <Info
                  label="Status"
                  value={status}
                />
                <Info
                  label="Postal Code"
                  value={vehicle.postal_code}
                />
                <Info
                  label="Selling Timeline"
                  value={vehicle.selling_timeline}
                />
                <Info
                  label="Accident History"
                  value={vehicle.accident_history}
                />
                <Info
                  label="Submitted"
                  value={
                    vehicle.created_at
                      ? new Date(
                          vehicle.created_at
                        ).toLocaleString()
                      : null
                  }
                />
              </div>
            </div>
          </div>
          {/* RIGHT */}
          <aside className="space-y-6">
            {/* Seller */}
            <div className="rounded-2xl bg-white p-8 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-xl font-bold text-blue-700">
                  {vehicle.name
                    ? vehicle.name.charAt(0).toUpperCase()
                    : "?"}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    {vehicle.name || "Unknown Seller"}
                  </h2>
                  <p className="text-sm text-slate-500">
                    Vehicle Seller
                  </p>
                </div>
              </div>
              <div className="mt-6 space-y-5">
                <Info
                  label="Email"
                  value={vehicle.email}
                />
                <Info
                  label="Phone"
                  value={vehicle.phone}
                />
                <Info
                  label="Postal Code"
                  value={vehicle.postal_code}
                />
              </div>
              <div className="mt-6 grid gap-3">
                {vehicle.phone && (
                  <a
                    href={`tel:${vehicle.phone}`}
                    className="rounded-xl bg-blue-600 py-3 text-center font-bold text-white hover:bg-blue-700"
                  >
                    Call Seller
                  </a>
                )}
                {vehicle.email && (
                  <a
                    href={`mailto:${vehicle.email}`}
                    className="rounded-xl border border-slate-300 py-3 text-center font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Email Seller
                  </a>
                )}
              </div>
            </div>
            {/* Lead Value */}
            <div className="rounded-2xl bg-slate-950 p-8 text-white shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-400">
                Seller Asking Price
              </p>
              <p className="mt-2 text-4xl font-extrabold">
                {vehicle.asking_price
                  ? `$${Number(
                      vehicle.asking_price
                    ).toLocaleString()}`
                  : "Not specified"}
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                Review the vehicle before making this lead
                available to NorthSky Auto dealer partners.
              </p>
            </div>
            {/* Admin Actions */}
            <div className="rounded-2xl bg-white p-8 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900">
                Lead Management
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Update the lead status after reviewing the
                seller and vehicle information.
              </p>
              <div className="mt-6 space-y-3">
                <button
                  disabled
                  className="w-full rounded-xl bg-green-600 py-3 font-bold text-white opacity-50"
                >
                  ✓ Approve Lead
                </button>
                <button
                  disabled
                  className="w-full rounded-xl bg-yellow-500 py-3 font-bold text-white opacity-50"
                >
                  Mark Under Review
                </button>
                <button
                  disabled
                  className="w-full rounded-xl bg-red-600 py-3 font-bold text-white opacity-50"
                >
                  Reject Lead
                </button>
              </div>
              <p className="mt-4 text-xs text-slate-400">
                Status controls will be connected to the
                Supabase API in the next step.
              </p>
            </div>
            <Link
              href="/admin/vehicles"
              className="block rounded-xl border border-slate-300 bg-white py-3 text-center font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
            >
              ← Back to Vehicle Leads
            </Link>
          </aside>
        </div>
      </section>
    </main>
  );
}
function Info({ label, value }) {
  return (
    <div>
      <p className="text-sm font-medium text-slate-500">
        {label}
      </p>
      <p className="mt-1 break-words font-semibold text-slate-900">
        {value !== null &&
        value !== undefined &&
        value !== ""
          ? value
          : "—"}
      </p>
    </div>
  );
}