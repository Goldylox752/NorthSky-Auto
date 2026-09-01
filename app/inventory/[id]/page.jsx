import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { id } = await params;

  const vehicle = await getVehicle(id);

  if (!vehicle) {
    return {
      title: "Vehicle Not Found | NorthSky Auto",
    };
  }

  const title =
    [vehicle.year, vehicle.make, vehicle.model]
      .filter(Boolean)
      .join(" ") || "Vehicle";

  return {
    title: `${title} | NorthSky Auto`,
    description:
      vehicle.description ||
      `View details for ${title} on NorthSky Auto.`,
  };
}

async function getVehicle(id) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return null;
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data, error } = await supabase
    .from("vehicles")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("NorthSky vehicle error:", error);
    return null;
  }

  return data;
}

function formatPrice(price) {
  if (!price) return "Price available from dealer";

  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format(price);
}

function formatMileage(mileage) {
  if (!mileage) return null;

  return `${Number(mileage).toLocaleString("en-CA")} km`;
}

export default async function VehiclePage({ params }) {
  const { id } = await params;

  const vehicle = await getVehicle(id);

  if (!vehicle) {
    notFound();
  }

  const title =
    [vehicle.year, vehicle.make, vehicle.model]
      .filter(Boolean)
      .join(" ") || "Vehicle";

  const image =
    vehicle.image_url ||
    vehicle.image ||
    (Array.isArray(vehicle.images) ? vehicle.images[0] : null);

  const gallery =
    Array.isArray(vehicle.images) && vehicle.images.length > 0
      ? vehicle.images
      : image
        ? [image]
        : [];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      {/* HEADER */}
      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
          <Link
            href="/inventory"
            className="text-sm font-semibold text-slate-400 transition hover:text-white"
          >
            ← Back to Inventory
          </Link>
        </div>
      </section>

      {/* VEHICLE */}
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_.8fr]">
          {/* IMAGES */}
          <div>
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="aspect-[16/10] bg-slate-100">
                {gallery.length > 0 ? (
                  <img
                    src={gallery[0]}
                    alt={title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-7xl">
                    🚗
                  </div>
                )}
              </div>
            </div>

            {gallery.length > 1 && (
              <div className="mt-4 grid grid-cols-4 gap-3">
                {gallery.slice(1, 5).map((src, index) => (
                  <div
                    key={`${src}-${index}`}
                    className="aspect-square overflow-hidden rounded-xl border border-slate-200 bg-white"
                  >
                    <img
                      src={src}
                      alt={`${title} ${index + 2}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* DETAILS */}
          <div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
                  NorthSky Auto
                </p>

                <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
                  {title}
                </h1>
              </div>

              {vehicle.status && (
                <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold capitalize text-emerald-700">
                  {vehicle.status}
                </span>
              )}
            </div>

            <p className="mt-6 text-3xl font-bold">
              {formatPrice(vehicle.price)}
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3">
              {vehicle.year && (
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="text-xs font-medium text-slate-500">Year</p>
                  <p className="mt-1 font-bold">{vehicle.year}</p>
                </div>
              )}

              {vehicle.mileage && (
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="text-xs font-medium text-slate-500">
                    Mileage
                  </p>
                  <p className="mt-1 font-bold">
                    {formatMileage(vehicle.mileage)}
                  </p>
                </div>
              )}

              {vehicle.condition && (
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="text-xs font-medium text-slate-500">
                    Condition
                  </p>
                  <p className="mt-1 font-bold capitalize">
                    {vehicle.condition}
                  </p>
                </div>
              )}

              {vehicle.location && (
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="text-xs font-medium text-slate-500">
                    Location
                  </p>
                  <p className="mt-1 font-bold">{vehicle.location}</p>
                </div>
              )}
            </div>

            {vehicle.description && (
              <div className="mt-8">
                <h2 className="text-xl font-bold">
                  Vehicle Description
                </h2>

                <p className="mt-3 leading-7 text-slate-600">
                  {vehicle.description}
                </p>
              </div>
            )}

            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold">
                Interested in this vehicle?
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Connect with NorthSky Auto to learn more about this vehicle
                and available opportunities.
              </p>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="rounded-xl bg-blue-600 px-6 py-3.5 text-center font-semibold text-white transition hover:bg-blue-500"
                >
                  Contact NorthSky
                </Link>

                <Link
                  href="/inventory"
                  className="rounded-xl border border-slate-300 px-6 py-3.5 text-center font-semibold transition hover:bg-slate-50"
                >
                  Browse Inventory
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
