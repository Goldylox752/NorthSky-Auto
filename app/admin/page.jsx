import Link from "next/link";
import { supabase } from "../../lib/supabase";
export const metadata = {
  title: "Admin Dashboard | NorthSky Auto",
  description:
    "Manage NorthSky Auto vehicle leads, dealer applications, and marketplace activity.",
};
export default async function AdminPage() {
  const { data: leads, error: leadsError } = await supabase
    .from("vehicles")
    .select("*")
    .order("created_at", {
      ascending: false,
    });
  const { data: dealers, error: dealersError } = await supabase
    .from("dealers")
    .select("*")
    .order("created_at", {
      ascending: false,
    });
  const vehicleLeads = leads || [];
  const dealerApplications = dealers || [];
  const pendingVehicles = vehicleLeads.filter(
    (vehicle) => vehicle.status?.toLowerCase() === "pending"
  );
  const approvedVehicles = vehicleLeads.filter(
    (vehicle) => vehicle.status?.toLowerCase() === "approved"
  );
  const rejectedVehicles = vehicleLeads.filter(
    (vehicle) => vehicle.status?.toLowerCase() === "rejected"
  );
  const pendingDealers = dealerApplications.filter(
    (dealer) => dealer.status?.toLowerCase() === "pending"
  );
  const approvedDealers = dealerApplications.filter(
    (dealer) => dealer.status?.toLowerCase() === "approved"
  );
  return (
    <main className="min-h-screen bg-gray-100">
      {/* Header */}
      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-400">
                NorthSky Auto
              </p>
              <h1 className="mt-2 text-4xl font-extrabold">
                Admin Dashboard
              </h1>
              <p className="mt-2 text-gray-400">
                Manage your vehicle marketplace.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/"
                className="rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold hover:bg-white/10"
              >
                View Website
              </Link>
              <Link
                href="/dashboard"
                className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold hover:bg-blue-500"
              >
                Dealer Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* Navigation */}
      <div className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl gap-6 overflow-x-auto px-6">
          <Link
            href="/admin"
            className="border-b-2 border-blue-600 py-4 text-sm font-semibold text-blue-600"
          >
            Overview
          </Link>
          <Link
            href="/admin/vehicles"
            className="py-4 text-sm font-semibold text-gray-600 hover:text-blue-600"
          >
            Vehicle Leads
          </Link>
          <Link
            href="/admin/dealers"
            className="py-4 text-sm font-semibold text-gray-600 hover:text-blue-600"
          >
            Dealers
          </Link>
          <Link
            href="/pricing"
            className="py-4 text-sm font-semibold text-gray-600 hover:text-blue-600"
          >
            Pricing
          </Link>
        </div>
      </div>
      {/* Stats */}
      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
              Total Leads
            </p>
            <p className="mt-2 text-4xl font-extrabold text-slate-900">
              {vehicleLeads.length}
            </p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
              Pending
            </p>
            <p className="mt-2 text-4xl font-extrabold text-orange-500">
              {pendingVehicles.length}
            </p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
              Approved
            </p>
            <p className="mt-2 text-4xl font-extrabold text-green-600">
              {approvedVehicles.length}
            </p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
              Rejected
            </p>
            <p className="mt-2 text-4xl font-extrabold text-red-500">
              {rejectedVehicles.length}
            </p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
              Dealers
            </p>
            <p className="mt-2 text-4xl font-extrabold text-blue-600">
              {approvedDealers.length}
            </p>
          </div>
        </div>
      </section>
      {/* Action Cards */}
      <section className="mx-auto max-w-7xl px-6 pb-8">
        <div className="grid gap-6 md:grid-cols-3">
          <Link
            href="/admin/vehicles"
            className="group rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div className="text-4xl">
                🚗
              </div>
              <span className="text-gray-400 transition group-hover:text-blue-600">
                →
              </span>
            </div>
            <h2 className="mt-5 text-xl font-bold">
              Manage Vehicle Leads
            </h2>
            <p className="mt-2 text-gray-500">
              Review, approve and reject incoming seller submissions.
            </p>
            <p className="mt-4 font-semibold text-blue-600">
              {pendingVehicles.length} waiting for review
            </p>
          </Link>
          <Link
            href="/admin/dealers"
            className="group rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div className="text-4xl">
                🏢
              </div>
              <span className="text-gray-400 transition group-hover:text-blue-600">
                →
              </span>
            </div>
            <h2 className="mt-5 text-xl font-bold">
              Manage Dealers
            </h2>
            <p className="mt-2 text-gray-500">
              Review dealership applications and manage partner accounts.
            </p>
            <p className="mt-4 font-semibold text-blue-600">
              {pendingDealers.length} applications pending
            </p>
          </Link>
          <Link
            href="/sell"
            className="group rounded-2xl bg-slate-900 p-6 text-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div className="text-4xl">
                ➕
              </div>
              <span className="text-gray-400 transition group-hover:text-white">
                →
              </span>
            </div>
            <h2 className="mt-5 text-xl font-bold">
              Test Seller Funnel
            </h2>
            <p className="mt-2 text-gray-300">
              Open the seller submission page and test the lead process.
            </p>
            <p className="mt-4 font-semibold text-blue-400">
              Open Sell Page →
            </p>
          </Link>
        </div>
      </section>
      {/* Recent Vehicle Leads */}
      <section className="mx-auto max-w-7xl px-6 pb-10">
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b p-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Recent Vehicle Leads
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Latest vehicle submissions from sellers.
              </p>
            </div>
            <Link
              href="/admin/vehicles"
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              View All →
            </Link>
          </div>
          {leadsError ? (
            <div className="p-8">
              <div className="rounded-xl bg-red-50 p-5">
                <h3 className="font-bold text-red-700">
                  Unable to load vehicle leads
                </h3>
                <p className="mt-1 text-sm text-red-600">
                  Check your Supabase connection and table configuration.
                </p>
              </div>
            </div>
          ) : vehicleLeads.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-5xl">
                🚗
              </div>
              <h3 className="mt-4 text-xl font-bold text-gray-800">
                No vehicle leads yet
              </h3>
              <p className="mt-2 text-gray-500">
                New seller submissions will appear here.
              </p>
              <Link
                href="/sell"
                className="mt-6 inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
              >
                Test Seller Submission
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] text-left">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-4 text-xs font-bold uppercase tracking-wide text-gray-500">
                      Seller
                    </th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wide text-gray-500">
                      Vehicle
                    </th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wide text-gray-500">
                      Mileage
                    </th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wide text-gray-500">
                      Asking Price
                    </th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wide text-gray-500">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {vehicleLeads.slice(0, 10).map((vehicle) => {
                    const status =
                      vehicle.status?.toLowerCase() || "pending";
                    const statusStyle =
                      status === "approved"
                        ? "bg-green-100 text-green-700"
                        : status === "rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-orange-100 text-orange-700";
                    return (
                      <tr
                        key={vehicle.id}
                        className="border-t hover:bg-gray-50"
                      >
                        <td className="p-4">
                          <div className="font-semibold text-slate-900">
                            {vehicle.name || "Unknown Seller"}
                          </div>
                          <div className="text-sm text-gray-500">
                            {vehicle.email || "No email"}
                          </div>
                          <div className="text-sm text-gray-500">
                            {vehicle.phone || "No phone"}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="font-semibold text-slate-900">
                            {vehicle.year || ""}{" "}
                            {vehicle.make || ""}{" "}
                            {vehicle.model || ""}
                          </div>
                          {vehicle.trim && (
                            <div className="text-sm text-gray-500">
                              {vehicle.trim}
                            </div>
                          )}
                        </td>
                        <td className="p-4 text-gray-700">
                          {vehicle.mileage
                            ? `${Number(
                                vehicle.mileage
                              ).toLocaleString()} km`
                            : "—"}
                        </td>
                        <td className="p-4 font-semibold text-gray-700">
                          {vehicle.asking_price
                            ? `$${Number(
                                vehicle.asking_price
                              ).toLocaleString()}`
                            : "—"}
                        </td>
                        <td className="p-4">
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-bold capitalize ${statusStyle}`}
                          >
                            {status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
      {/* Dealer Summary */}
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">
                Dealer Network
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Current dealership application activity.
              </p>
            </div>
            <Link
              href="/admin/dealers"
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              Manage Dealers →
            </Link>
          </div>
          {dealersError ? (
            <div className="mt-6 rounded-xl bg-red-50 p-4 text-red-600">
              Unable to load dealer information.
            </div>
          ) : (
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-xl bg-gray-50 p-5">
                <p className="text-sm text-gray-500">
                  Total Applications
                </p>
                <p className="mt-2 text-3xl font-bold">
                  {dealerApplications.length}
                </p>
              </div>
              <div className="rounded-xl bg-orange-50 p-5">
                <p className="text-sm text-orange-700">
                  Pending Review
                </p>
                <p className="mt-2 text-3xl font-bold text-orange-600">
                  {pendingDealers.length}
                </p>
              </div>
              <div className="rounded-xl bg-green-50 p-5">
                <p className="text-sm text-green-700">
                  Approved Dealers
                </p>
                <p className="mt-2 text-3xl font-bold text-green-600">
                  {approvedDealers.length}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}