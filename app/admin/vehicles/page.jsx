import Link from "next/link";
import { supabase } from "../../../lib/supabase";
export const metadata = {
  title: "Vehicle Management | NorthSky Auto",
  description: "Manage vehicle submissions and acquisition leads.",
};
export default async function AdminVehiclesPage() {
  const { data: vehicles, error } = await supabase
    .from("vehicles")
    .select("*")
    .order("created_at", {
      ascending: false,
    });
  const vehicleList = vehicles || [];
  if (error) {
    return (
      <main className="min-h-screen bg-gray-100 p-6">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl bg-white p-8 shadow">
            <h1 className="text-2xl font-bold text-red-600">
              Unable to load vehicles
            </h1>
            <p className="mt-2 text-gray-600">
              {error.message}
            </p>
          </div>
        </div>
      </main>
    );
  }
  const newLeads = vehicleList.filter(
    (vehicle) =>
      !vehicle.status ||
      vehicle.status.toLowerCase() === "new"
  ).length;
  const approvedLeads = vehicleList.filter(
    (vehicle) =>
      vehicle.status?.toLowerCase() === "approved"
  ).length;
  const soldLeads = vehicleList.filter(
    (vehicle) =>
      vehicle.status?.toLowerCase() === "sold"
  ).length;
  return (
    <main className="min-h-screen bg-gray-100">
      {/* Header */}
      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <Link
                href="/admin"
                className="text-sm text-blue-400 hover:text-blue-300"
              >
                ← Admin Dashboard
              </Link>
              <h1 className="mt-3 text-4xl font-bold">
                Vehicle Management
              </h1>
              <p className="mt-2 text-gray-300">
                Review and manage vehicle submissions.
              </p>
            </div>
            <Link
              href="/sell"
              className="rounded-xl bg-blue-600 px-6 py-3 text-center font-semibold hover:bg-blue-500"
            >
              + Submit Vehicle
            </Link>
          </div>
        </div>
      </section>
      {/* Stats */}
      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-5 md:grid-cols-4">
          <div className="rounded-2xl bg-white p-6 shadow">
            <p className="text-sm text-gray-500">
              Total Vehicles
            </p>
            <p className="mt-2 text-3xl font-bold">
              {vehicleList.length}
            </p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow">
            <p className="text-sm text-gray-500">
              New Leads
            </p>
            <p className="mt-2 text-3xl font-bold text-blue-600">
              {newLeads}
            </p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow">
            <p className="text-sm text-gray-500">
              Approved
            </p>
            <p className="mt-2 text-3xl font-bold text-green-600">
              {approvedLeads}
            </p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow">
            <p className="text-sm text-gray-500">
              Sold
            </p>
            <p className="mt-2 text-3xl font-bold text-purple-600">
              {soldLeads}
            </p>
          </div>
        </div>
      </section>
      {/* Vehicles */}
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="overflow-hidden rounded-2xl bg-white shadow">
          <div className="border-b p-6">
            <h2 className="text-2xl font-bold">
              Vehicle Submissions
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              All vehicle leads submitted through NorthSky Auto.
            </p>
          </div>
          {vehicleList.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-5xl">🚗</div>
              <h3 className="mt-4 text-xl font-bold">
                No vehicles yet
              </h3>
              <p className="mt-2 text-gray-500">
                Vehicle submissions will appear here.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-4 text-sm font-semibold text-gray-600">
                      Vehicle
                    </th>
                    <th className="p-4 text-sm font-semibold text-gray-600">
                      Seller
                    </th>
                    <th className="p-4 text-sm font-semibold text-gray-600">
                      Mileage
                    </th>
                    <th className="p-4 text-sm font-semibold text-gray-600">
                      Asking Price
                    </th>
                    <th className="p-4 text-sm font-semibold text-gray-600">
                      Status
                    </th>
                    <th className="p-4 text-sm font-semibold text-gray-600">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {vehicleList.map((vehicle) => (
                    <tr
                      key={vehicle.id}
                      className="border-t hover:bg-gray-50"
                    >
                      <td className="p-4">
                        <div className="font-bold text-slate-900">
                          {vehicle.year} {vehicle.make} {vehicle.model}
                        </div>
                        {vehicle.trim && (
                          <div className="text-sm text-gray-500">
                            {vehicle.trim}
                          </div>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="font-medium">
                          {vehicle.name || "Unknown"}
                        </div>
                        <div className="text-sm text-gray-500">
                          {vehicle.email || "No email"}
                        </div>
                      </td>
                      <td className="p-4">
                        {vehicle.mileage
                          ? `${Number(vehicle.mileage).toLocaleString()} km`
                          : "—"}
                      </td>
                      <td className="p-4 font-semibold">
                        {vehicle.asking_price
                          ? `$${Number(
                              vehicle.asking_price
                            ).toLocaleString()}`
                          : "—"}
                      </td>
                      <td className="p-4">
                        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                          {vehicle.status || "New"}
                        </span>
                      </td>
                      <td className="p-4">
                        <Link
                          href={`/admin/vehicles/${vehicle.id}`}
                          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}