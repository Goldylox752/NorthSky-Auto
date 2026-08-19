ChatGPT said:
Yes — replace app/admin/page.jsx completely with this:

import Link from "next/link";
import { createClient } from "../../lib/supabase/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Admin Dashboard | NorthSky Auto",
  description:
    "Manage NorthSky Auto vehicle leads, dealer applications, and marketplace activity.",
};

export default async function AdminPage() {
  const supabase = await createClient();

  const [{ data: leads, error: leadsError }, { data: dealers, error: dealersError }] =
    await Promise.all([
      supabase
        .from("vehicles")
        .select("*")
        .order("created_at", { ascending: false }),

      supabase
        .from("dealers")
        .select("*")
        .order("created_at", { ascending: false }),
    ]);

  const vehicleLeads = leads ?? [];
  const dealerApplications = dealers ?? [];

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
      <section className="bg-gradient-to-r from-slate-950 to-blue-950 text-white">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-400">
                NorthSky Auto
              </p>

              <h1 className="mt-2 text-4xl font-extrabold tracking-tight">
                Admin Dashboard
              </h1>

              <p className="mt-3 text-gray-300">
                Manage vehicles, dealers, and marketplace activity.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/"
                className="rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold transition hover:bg-white/10"
              >
                View Website
              </Link>

              <Link
                href="/dashboard"
                className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold transition hover:bg-blue-500"
              >
                Dealer Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <nav className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl gap-8 overflow-x-auto px-6">
          <Link
            href="/admin"
            className="border-b-2 border-blue-600 py-4 text-sm font-bold text-blue-600"
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
      </nav>

      {/* Stats */}
      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          <StatCard
            label="Total Leads"
            value={vehicleLeads.length}
            color="text-slate-900"
          />

          <StatCard
            label="Pending"
            value={pendingVehicles.length}
            color="text-orange-500"
          />

          <StatCard
            label="Approved"
            value={approvedVehicles.length}
            color="text-green-600"
          />

          <StatCard
            label="Rejected"
            value={rejectedVehicles.length}
            color="text-red-500"
          />

          <StatCard
            label="Dealers"
            value={approvedDealers.length}
            color="text-blue-600"
          />
        </div>
      </section>

      {/* Actions */}
      <section className="mx-auto max-w-7xl px-6 pb-8">
        <div className="grid gap-6 md:grid-cols-3">
          <ActionCard
            href="/admin/vehicles"
            icon="🚗"
            title="Manage Vehicle Leads"
            description="Review, approve, and reject incoming seller submissions."
            footer={`${pendingVehicles.length} waiting for review`}
          />

          <ActionCard
            href="/admin/dealers"
            icon="🏢"
            title="Manage Dealers"
            description="Review dealership applications and manage partner accounts."
            footer={`${pendingDealers.length} applications pending`}
          />

          <ActionCard
            href="/sell"
            icon="➕"
            title="Test Seller Funnel"
            description="Open the seller submission page and test the lead process."
            footer="Open Sell Page →"
            dark
          />
        </div>
      </section>

      {/* Vehicle Leads */}
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
            <ErrorBox
              title="Unable to load vehicle leads"
              message="Check your Supabase connection and vehicles table configuration."
            />
          ) : vehicleLeads.length === 0 ? (
            <EmptyState />
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
                            ? `${Number(vehicle.mileage).toLocaleString()} km`
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

      {/* Dealer Network */}
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
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
            <div className="mt-6">
              <ErrorBox
                title="Unable to load dealer information"
                message="Check your Supabase connection and dealers table configuration."
              />
            </div>
          ) : (
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <SummaryCard
                label="Total Applications"
                value={dealerApplications.length}
              />

              <SummaryCard
                label="Pending Review"
                value={pendingDealers.length}
                color="orange"
              />

              <SummaryCard
                label="Approved Dealers"
                value={approvedDealers.length}
                color="green"
              />
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function StatCard({ label, value, color }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <p className="text-sm font-medium text-gray-500">{label}</p>

      <p className={`mt-2 text-4xl font-extrabold ${color}`}>
        {value}
      </p>
    </div>
  );
}

function ActionCard({
  href,
  icon,
  title,
  description,
  footer,
  dark = false,
}) {
  return (
    <Link
      href={href}
      className={`group rounded-2xl p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg ${
        dark ? "bg-slate-900 text-white" : "bg-white"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="text-4xl">{icon}</div>

        <span
          className={`transition ${
            dark
              ? "text-gray-500 group-hover:text-white"
              : "text-gray-400 group-hover:text-blue-600"
          }`}
        >
          →
        </span>
      </div>

      <h2 className="mt-5 text-xl font-bold">{title}</h2>

      <p
        className={`mt-2 ${
          dark ? "text-gray-300" : "text-gray-500"
        }`}
      >
        {description}
      </p>

      <p
        className={`mt-4 font-semibold ${
          dark ? "text-blue-400" : "text-blue-600"
        }`}
      >
        {footer}
      </p>
    </Link>
  );
}

function ErrorBox({ title, message }) {
  return (
    <div className="p-8">
      <div className="rounded-xl bg-red-50 p-5">
        <h3 className="font-bold text-red-700">{title}</h3>

        <p className="mt-1 text-sm text-red-600">{message}</p>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="p-12 text-center">
      <div className="text-5xl">🚗</div>

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
  );
}

function SummaryCard({
  label,
  value,
  color = "gray",
}) {
  const styles = {
    gray: "bg-gray-50 text-gray-900",
    orange: "bg-orange-50 text-orange-600",
    green: "bg-green-50 text-green-600",
  };

  return (
    <div className={`rounded-xl p-5 ${styles[color]}`}>
      <p className="text-sm">{label}</p>

      <p className="mt-2 text-3xl font-bold">{value}</p>
    </div>
  );
}
