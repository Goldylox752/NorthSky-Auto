import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "../../../../lib/supabase";
export const metadata = {
  title: "Vehicle Lead | NorthSky Auto Admin",
  description:
    "Review vehicle submissions and seller information.",
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
  const status = vehicle.status || "new";
  return (
    <main className="min-h-screen bg-gray-100">
      {/* Header */}
      <section className="bg-gradient-to-r from-slate-950 to-blue-900 text-white">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <Link
            href="/admin/vehicles"
            className="text-sm font-medium text-blue-300 hover:text-white"
          >
            ← Back to Vehicle Management
          </Link>
          <div className="mt-5 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-300">
                Vehicle Lead
              </p>
              <h1 className="mt-2 text-4xl font-extrabold">
                {vehicle.year || ""}{" "}
                {vehicle.make || ""}{" "}
                {vehicle.model || ""}
              </h1>
              <p className="mt-2 text-gray-300">
                Review seller information and vehicle details.
              </p>
            </div>
            <span
              className={`inline-flex w-fit rounded-full px-4 py-2 text-sm font-bold ${
                status.toLowerCase() === "approved"
                  ? "bg-green-100 text-green-700"
                  : status.toLowerCase() === "rejected"
                  ? "bg-red-100 text-red-700"
                  : "bg-yellow-100 text-yellow-700"
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
          {/* Vehicle Information */}
          <div className="lg:col-span-2 space-y-8">
            <div className="rounded-2xl bg-white p-8 shadow">
              <div className="flex h-64 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-200 to-gray-300 text-7xl">
                🚗
              </div>
              <h2 className="mt-8 text-2xl font-bold text-slate-900">
                Vehicle Information
              </h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <Info
                  label="Year"
                  value={vehicle.year}
                />
                <Info
                  label="Make"
                  value={vehicle.make}
                />
                <Info
                  label="Model"
                  value={vehicle.model}
                />
                <Info
                  label="Trim"
                  value={vehicle.trim}
                />
                <Info
                  label="Mileage"
                  value={
                    vehicle.mileage
                      ? `${Number(vehicle.mileage).toLocaleString()} km`
                      : null
                  }
                />
                <Info
                  label="VIN"
                  value={vehicle.vin}
                />
                <Info
                  label="Condition"
                  value={vehicle.condition}
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
              </div>
            </div>
            {/* Seller Notes */}
            <div className="rounded-2xl bg-white p-8 shadow">
              <h2 className="text-2xl font-bold text-slate-900">
                Seller Notes
              </h2>
              <div className="mt-5 rounded-xl bg-gray-50 p-6">
                <p className="whitespace-pre-wrap text-gray-700">
                  {vehicle.description ||
                    "No additional seller notes were provided."}
                </p>
              </div>
            </div>
            {/* Submission Information */}
            <div className="rounded-2xl bg-white p-8 shadow">
              <h2 className="text-2xl font-bold text-slate-900">
                Submission Information
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
          {/* Seller / Admin Panel */}
          <aside className="space-y-6">
            <div className="rounded-2xl bg-white p-8 shadow">
              <h2 className="text-2xl font-bold text-slate-900">
                Seller Information
              </h2>
              <div className="mt-6 space-y-5">
                <Info
                  label="Name"
                  value={vehicle.name}
                />
                <Info
                  label="Email"
                  value={vehicle.email}
                />
                <Info
                  label="Phone"
                  value={vehicle.phone}
                />
              </div>
            </div>
            {/* Lead Value */}
            <div className="rounded-2xl bg-slate-900 p-8 text-white shadow">
              <p className="text-sm font-medium text-gray-400">
                Lead Asking Price
              </p>
              <p className="mt-2 text-4xl font-extrabold">
                {vehicle.asking_price
                  ? `$${Number(
                      vehicle.asking_price
                    ).toLocaleString()}`
                  : "Not specified"}
              </p>
              <p className="mt-3 text-sm text-gray-400">
                Review this lead before making it available
                to dealer partners.
              </p>
            </div>
            {/* Admin Actions */}
            <div className="rounded-2xl bg-white p-8 shadow">
              <h2 className="text-xl font-bold text-slate-900">
                Lead Actions
              </h2>
              <div className="mt-6 space-y-3">
                <button
                  disabled
                  className="w-full rounded-xl bg-green-600 py-3 font-bold text-white opacity-50"
                >
                  Approve Lead
                </button>
                <button
                  disabled
                  className="w-full rounded-xl bg-red-600 py-3 font-bold text-white opacity-50"
                >
                  Reject Lead
                </button>
                <Link
                  href="/admin/vehicles"
                  className="block w-full rounded-xl border border-gray-300 py-3 text-center font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Back to Vehicles
                </Link>
              </div>
              <p className="mt-4 text-xs text-gray-500">
                Approval controls will be connected to Supabase next.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
function Info({ label, value }) {
  return (
    <div>
      <p className="text-sm font-medium text-gray-500">
        {label}
      </p>
      <p className="mt-1 break-words font-semibold text-slate-900">
        {value || "—"}
      </p>
    </div>
  );
}