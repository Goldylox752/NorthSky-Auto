import { supabase } from "../../lib/supabase";
export const metadata = {
  title: "Admin Dashboard | NorthSky Auto",
  description: "Manage NorthSky Auto vehicle leads and seller submissions.",
};
export default async function AdminPage() {
  const { data: leads, error } = await supabase
    .from("vehicles")
    .select("*")
    .order("created_at", {
      ascending: false,
    });
  if (error) {
    return (
      <main className="min-h-screen bg-gray-100">
        <section className="bg-slate-900 px-6 py-10 text-white">
          <div className="mx-auto max-w-7xl">
            <h1 className="text-4xl font-bold">
              NorthSky Auto Admin
            </h1>
            <p className="mt-2 text-gray-300">
              Manage incoming vehicle leads.
            </p>
          </div>
        </section>
        <section className="mx-auto max-w-7xl px-6 py-10">
          <div className="rounded-xl bg-white p-8 shadow">
            <h2 className="text-xl font-bold text-red-600">
              Unable to load vehicle leads
            </h2>
            <p className="mt-2 text-gray-600">
              There was a problem connecting to the vehicle database.
            </p>
          </div>
        </section>
      </main>
    );
  }
  const vehicleLeads = leads || [];
  return (
    <main className="min-h-screen bg-gray-100">
      {/* Header */}
      <section className="bg-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <h1 className="text-4xl font-bold">
            NorthSky Auto Admin
          </h1>
          <p className="mt-2 text-gray-300">
            Manage incoming vehicle leads.
          </p>
        </div>
      </section>
      {/* Dashboard */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        {/* Stats */}
        <div className="mb-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-xl bg-white p-6 shadow">
            <p className="text-sm font-medium text-gray-500">
              Total Vehicle Leads
            </p>
            <p className="mt-2 text-3xl font-bold text-slate-900">
              {vehicleLeads.length}
            </p>
          </div>
          <div className="rounded-xl bg-white p-6 shadow">
            <p className="text-sm font-medium text-gray-500">
              New Leads
            </p>
            <p className="mt-2 text-3xl font-bold text-blue-600">
              {
                vehicleLeads.filter(
                  (vehicle) =>
                    vehicle.status?.toLowerCase() === "new"
                ).length
              }
            </p>
          </div>
          <div className="rounded-xl bg-white p-6 shadow">
            <p className="text-sm font-medium text-gray-500">
              Database Status
            </p>
            <p className="mt-2 text-3xl font-bold text-green-600">
              Connected
            </p>
          </div>
        </div>
        {/* Leads */}
        <div className="overflow-hidden rounded-xl bg-white shadow">
          <div className="border-b p-6">
            <h2 className="text-2xl font-bold text-slate-900">
              Vehicle Leads
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Review vehicle submissions from sellers.
            </p>
          </div>
          {vehicleLeads.length === 0 ? (
            <div className="p-12 text-center">
              <h3 className="text-lg font-semibold text-gray-700">
                No vehicle leads yet
              </h3>
              <p className="mt-2 text-gray-500">
                New vehicle submissions will appear here.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-4 text-sm font-semibold text-gray-600">
                      Seller
                    </th>
                    <th className="p-4 text-sm font-semibold text-gray-600">
                      Vehicle
                    </th>
                    <th className="p-4 text-sm font-semibold text-gray-600">
                      Mileage
                    </th>
                    <th className="p-4 text-sm font-semibold text-gray-600">
                      Price
                    </th>
                    <th className="p-4 text-sm font-semibold text-gray-600">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {vehicleLeads.map((vehicle) => (
                    <tr
                      key={vehicle.id}
                      className="border-t hover:bg-gray-50"
                    >
                      <td className="p-4">
                        <div className="font-semibold text-slate-900">
                          {vehicle.name || "Unknown Seller"}
                        </div>
                        {vehicle.phone && (
                          <div className="text-sm text-gray-500">
                            {vehicle.phone}
                          </div>
                        )}
                        {vehicle.email && (
                          <div className="text-sm text-gray-500">
                            {vehicle.email}
                          </div>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="font-medium text-slate-900">
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
                          ? `${vehicle.mileage.toLocaleString()} km`
                          : "—"}
                      </td>
                      <td className="p-4 font-medium text-gray-700">
                        {vehicle.asking_price
                          ? `$${Number(
                              vehicle.asking_price
                            ).toLocaleString()}`
                          : "—"}
                      </td>
                      <td className="p-4">
                        <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                          {vehicle.status || "New"}
                        </span>
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