import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

export const metadata = {
  title: "Vehicle Inventory | NorthSky Auto",
  description:
    "Browse vehicle inventory and automotive opportunities available through NorthSky Auto.",
};

async function getVehicles() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return [];
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data, error } = await supabase
    .from("vehicles")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("NorthSky inventory error:", error);
    return [];
  }

  return data || [];
}

function formatPrice(price) {
  if (!price) return "Price available from dealer";

  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format(price);
}

function VehicleCard({ vehicle }) {
  const title =
    [vehicle.year, vehicle.make, vehicle.model]
      .filter(Boolean)
      .join(" ") || "Vehicle";

  const image =
    vehicle.image_url ||
    vehicle.image ||
    (Array.isArray(vehicle.images) ? vehicle.images[0] : null);

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="aspect-[16/10] bg-slate-100">
        {image ? (
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-5xl">
            🚗
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
              NorthSky Auto
            </p>

            <h2 className="mt-2 text-xl font-bold text-slate-950">
              {title}
            </h2>
          </div>

          {vehicle.status && (
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold capitalize text-emerald-700">
              {vehicle.status}
            </span>
          )}
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
          {vehicle.mileage && (
            <div className="rounded-xl bg-slate-50 p-3">
              <p className="text-xs text-slate-500">Mileage</p>
              <p className="mt-1 font-semibold text-slate-900">
                {Number(vehicle.mileage).toLocaleString("en-CA")} km
              </p>
            </div>
          )}

          {vehicle.location && (
            <div className="rounded-xl bg-slate-50 p-3">
              <p className="text-xs text-slate-500">Location</p>
              <p className="mt-1 font-semibold text-slate-900">
                {vehicle.location}
              </p>
            </div>
          )}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <p className="font-bold text-slate-950">
            {formatPrice(vehicle.price)}
          </p>

          {vehicle.id && (
            <Link
              href={`/inventory/${vehicle.id}`}
              className="rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              View Vehicle
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}

export default async function InventoryPage() {
  const vehicles = await getVehicles();

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <p className="text-sm font-bold uppercase tracking-wider text-blue-400">
            NorthSky Auto
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Vehicle Inventory
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            Explore vehicles and automotive opportunities available through
            the NorthSky Auto network.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        {vehicles.length > 0 ? (
          <>
            <div className="mb-8">
              <p className="text-sm font-medium text-slate-500">
                {vehicles.length}{" "}
                {vehicles.length === 1 ? "vehicle" : "vehicles"} available
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {vehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
          </>
        ) : (
          <div className="rounded-3xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-3xl">
              🚗
            </div>

            <h2 className="mt-6 text-2xl font-bold">
              No vehicles available yet
            </h2>

            <p className="mx-auto mt-3 max-w-xl leading-7 text-slate-600">
              Vehicle inventory will appear here as participating dealers
              add vehicles to the NorthSky Auto network.
            </p>

            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/dealer"
                className="rounded-xl bg-slate-950 px-6 py-3.5 font-semibold text-white transition hover:bg-slate-800"
              >
                Dealer Portal
              </Link>

              <Link
                href="/sell"
                className="rounded-xl border border-slate-300 bg-white px-6 py-3.5 font-semibold text-slate-950 transition hover:bg-slate-50"
              >
                Submit Your Vehicle
              </Link>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
