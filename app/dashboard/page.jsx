import Link from "next/link";
import { supabase } from "../../lib/supabase";
export const metadata = {
  title: "Dealer Dashboard | NorthSky Auto",
  description:
    "Access vehicle acquisition leads through NorthSky Auto.",
};
export default async function DealerDashboardPage() {
  const { data: vehicles, error } = await supabase
    .from("vehicles")
    .select("*")
    .eq("status", "approved")
    .order("created_at", {
      ascending: false,
    });
  if (error) {
    return (
      <main className="min-h-screen bg-gray-100 p-10">
        <div className="mx-auto max-w-3xl rounded-xl bg-white p-8 shadow">
          <h1 className="text-2xl font-bold text-red-600">
            Unable to load vehicle leads
          </h1>
          <p className="mt-2 text-gray-600">
            Please try again later.
          </p>
        </div>
      </main>
    );
  }
  const vehicleList = vehicles || [];
  return (
    <main className="min-h-screen bg-gray-100">
      {/* Header */}
      <section className="bg-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <h1 className="text-4xl font-bold">
            Dealer Dashboard
          </h1>
          <p className="mt-3 text-gray-300">
            Find your next vehicle acquisition opportunity.
          </p>
        </div>
      </section>
      {/* Stats */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-xl bg-white p-6 shadow">
            <p className="text-gray-500">
              Available Leads
            </p>
            <h2 className="mt-2 text-4xl font-bold text-slate-900">
              {vehicleList.length}
            </h2>
          </div>
          <div className="rounded-xl bg-white p-6 shadow">
            <p className="text-gray-500">
              Membership
            </p>
            <h2 className="mt-2 text-3xl font-bold text-blue-600">
              Pro Dealer
            </h2>
          </div>
          <div className="rounded-xl bg-white p-6 shadow">
            <p className="text-gray-500">
              Account Status
            </p>
            <h2 className="mt-2 text-3xl font-bold text-green-600">
              Active
            </h2>
          </div>
        </div>
      </section>
      {/* Leads */}
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-slate-900">
            Available Vehicle Leads
          </h2>
          <p className="mt-2 text-gray-500">
            Browse approved vehicle acquisition opportunities.
          </p>
        </div>
        {vehicleList.length === 0 ? (
          <div className="rounded-2xl bg-white p-10 text-center shadow">
            <h3 className="text-xl font-semibold text-slate-900">
              No vehicle leads available
            </h3>
            <p className="mt-2 text-gray-500">
              New approved vehicle opportunities will appear here.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {vehicleList.map((vehicle) => (
              <div
                key={vehicle.id}
                className="overflow-hidden rounded-2xl bg-white shadow transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex h-40 items-center justify-center bg-gray-200 text-6xl">
                  🚘
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-slate-900">
                    {vehicle.year} {vehicle.make} {vehicle.model}
                  </h3>
                  {vehicle.trim && (
                    <p className="mt-1 text-sm text-gray-500">
                      {vehicle.trim}
                    </p>
                  )}
                  <div className="mt-4 space-y-2 text-gray-600">
                    <p>
                      <span className="font-medium">
                        Mileage:
                      </span>{" "}
                      {vehicle.mileage
                        ? `${Number(
                            vehicle.mileage
                          ).toLocaleString()} km`
                        : "—"}
                    </p>
                    <p>
                      <span className="font-medium">
                        Location:
                      </span>{" "}
                      {vehicle.location ||
                        vehicle.postal_code ||
                        "—"}
                    </p>
                    <p>
                      <span className="font-medium">
                        Asking Price:
                      </span>{" "}
                      {vehicle.asking_price
                        ? `$${Number(
                            vehicle.asking_price
                          ).toLocaleString()}`
                        : "—"}
                    </p>
                  </div>
                  <Link
                    href={`/dashboard/leads/${vehicle.id}`}
                    className="mt-6 block w-full rounded-xl bg-blue-600 py-3 text-center font-semibold text-white transition hover:bg-blue-700"
                  >
                    View Lead Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}