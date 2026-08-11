import Link from "next/link";
import { supabase } from "../../../../lib/supabase";
export async function generateMetadata() {
  return {
    title: "Vehicle Lead | NorthSky Auto",
    description:
      "View vehicle acquisition opportunity details.",
  };
}
export default async function LeadDetailPage({ params }) {
  const { id } = await params;
  const { data: vehicle, error } = await supabase
    .from("vehicles")
    .select("*")
    .eq("id", id)
    .single();
  if (error || !vehicle) {
    return (
      <main className="min-h-screen bg-gray-100 p-10">
        <div className="mx-auto max-w-3xl rounded-xl bg-white p-8 shadow">
          <h1 className="text-2xl font-bold text-slate-900">
            Vehicle lead not found
          </h1>
          <p className="mt-2 text-gray-500">
            This vehicle lead may have been removed or is no longer available.
          </p>
          <Link
            href="/dashboard"
            className="mt-6 inline-block font-medium text-blue-600 hover:text-blue-800"
          >
            Return to Dashboard
          </Link>
        </div>
      </main>
    );
  }
  return (
    <main className="min-h-screen bg-gray-100">
      {/* Header */}
      <section className="bg-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <h1 className="text-4xl font-bold">
            {vehicle.year} {vehicle.make} {vehicle.model}
          </h1>
          <p className="mt-2 text-gray-300">
            Vehicle acquisition opportunity
          </p>
        </div>
      </section>
      {/* Content */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Vehicle Information */}
          <div className="rounded-2xl bg-white p-8 shadow lg:col-span-2">
            <div className="flex h-72 items-center justify-center rounded-xl bg-gray-200 text-6xl">
              🚘
            </div>
            <h2 className="mt-8 text-3xl font-bold text-slate-900">
              Vehicle Details
            </h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div>
                <p className="text-gray-500">Make</p>
                <p className="font-semibold">
                  {vehicle.make || "—"}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Model</p>
                <p className="font-semibold">
                  {vehicle.model || "—"}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Year</p>
                <p className="font-semibold">
                  {vehicle.year || "—"}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Mileage</p>
                <p className="font-semibold">
                  {vehicle.mileage
                    ? `${Number(vehicle.mileage).toLocaleString()} km`
                    : "—"}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Asking Price</p>
                <p className="font-semibold">
                  {vehicle.asking_price
                    ? `$${Number(
                        vehicle.asking_price
                      ).toLocaleString()}`
                    : "—"}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Location</p>
                <p className="font-semibold">
                  {vehicle.location || vehicle.postal_code || "—"}
                </p>
              </div>
            </div>
            {/* Seller Notes */}
            <div className="mt-8">
              <h3 className="text-xl font-bold text-slate-900">
                Seller Notes
              </h3>
              <p className="mt-3 leading-7 text-gray-600">
                {vehicle.description ||
                  "No additional notes provided."}
              </p>
            </div>
          </div>
          {/* Lead Purchase Card */}
          <aside className="h-fit rounded-2xl bg-white p-8 shadow">
            <h2 className="text-2xl font-bold text-slate-900">
              Unlock Seller Contact
            </h2>
            <p className="mt-4 leading-6 text-gray-600">
              Purchase access to this lead to receive seller
              contact details and complete vehicle information.
            </p>
            <div className="mt-6 rounded-xl bg-gray-100 p-5">
              <p className="text-sm text-gray-500">
                Lead Access
              </p>
              <p className="mt-2 text-3xl font-bold text-slate-900">
                $49
              </p>
            </div>
            <button
              type="button"
              className="mt-6 w-full rounded-xl bg-blue-600 py-4 font-bold text-white transition hover:bg-blue-700"
            >
              Purchase Lead
            </button>
            <Link
              href="/dashboard"
              className="mt-4 block text-center font-medium text-blue-600 hover:text-blue-800"
            >
              Back To Leads
            </Link>
          </aside>
        </div>
      </section>
    </main>
  );
}