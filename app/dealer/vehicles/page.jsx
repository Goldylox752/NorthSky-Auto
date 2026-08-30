import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
export const dynamic = "force-dynamic";
export const metadata = {
  title: "Dealer Vehicles | NorthSky Auto",
  description:
    "Browse vehicle acquisition opportunities available through NorthSky Auto.",
};
function formatCurrency(value) {
  if (value === null || value === undefined || value === "") {
    return "Price not provided";
  }
  const number = Number(value);
  if (Number.isNaN(number)) {
    return String(value);
  }
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format(number);
}
function formatMileage(value) {
  if (value === null || value === undefined || value === "") {
    return "Mileage not provided";
  }
  const number = Number(value);
  if (Number.isNaN(number)) {
    return String(value);
  }
  return `${new Intl.NumberFormat("en-CA").format(number)} km`;
}
function formatDate(value) {
  if (!value) {
    return "";
  }
  try {
    return new Intl.DateTimeFormat("en-CA", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(value));
  } catch {
    return "";
  }
}
function vehicleTitle(vehicle) {
  const year = vehicle.year || "";
  const make = vehicle.make || "";
  const model = vehicle.model || "";
  const title = `${year} ${make} ${model}`.trim();
  return title || "Vehicle Opportunity";
}
function vehicleImage(vehicle) {
  return (
    vehicle.image_url ||
    vehicle.image ||
    vehicle.photo_url ||
    vehicle.thumbnail_url ||
    vehicle.photos?.[0] ||
    null
  );
}
function VehicleCard({ vehicle }) {
  const title = vehicleTitle(vehicle);
  const image = vehicleImage(vehicle);
  return (
    <article className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-md">
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        {image ? (
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <div className="text-center">
              <div className="text-5xl">🚗</div>
              <p className="mt-3 text-sm font-bold text-slate-400">
                No vehicle photo
              </p>
            </div>
          </div>
        )}
        <div className="absolute left-4 top-4">
          <span className="rounded-full bg-green-600 px-3 py-1 text-xs font-black text-white shadow-sm">
            Available
          </span>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-black text-slate-950">
              {title}
            </h2>
            {(vehicle.trim || vehicle.condition) && (
              <p className="mt-1 text-sm font-semibold text-slate-500">
                {vehicle.trim || vehicle.condition}
              </p>
            )}
          </div>
          <div className="text-right">
            <p className="text-lg font-black text-blue-600">
              {formatCurrency(
                vehicle.asking_price ||
                  vehicle.price ||
                  vehicle.list_price
              )}
            </p>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-slate-50 p-3">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
              Mileage
            </p>
            <p className="mt-1 text-sm font-black text-slate-800">
              {formatMileage(
                vehicle.mileage ||
                  vehicle.odometer ||
                  vehicle.kilometers
              )}
            </p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-3">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
              Location
            </p>
            <p className="mt-1 truncate text-sm font-black text-slate-800">
              {vehicle.city ||
                vehicle.location ||
                vehicle.province ||
                "Canada"}
            </p>
          </div>
        </div>
        {(vehicle.description || vehicle.notes) && (
          <p className="mt-5 line-clamp-3 text-sm leading-6 text-slate-500">
            {vehicle.description || vehicle.notes}
          </p>
        )}
        <div className="mt-6 flex items-center justify-between gap-3">
          <div>
            {vehicle.created_at && (
              <p className="text-xs font-semibold text-slate-400">
                Added {formatDate(vehicle.created_at)}
              </p>
            )}
          </div>
          <Link
            href={`/dealer/vehicles/${vehicle.id}`}
            className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-black text-white transition hover:bg-blue-700"
          >
            View Vehicle →
          </Link>
        </div>
      </div>
    </article>
  );
}
function EmptyState() {
  return (
    <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
      <div className="text-6xl">🚘</div>
      <h2 className="mt-6 text-2xl font-black text-slate-950">
        No vehicle opportunities yet
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500">
        Vehicle opportunities will appear here as sellers submit
        vehicles through NorthSky Auto.
      </p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <Link
          href="/sell"
          className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-black text-white transition hover:bg-blue-700"
        >
          Submit a Vehicle
        </Link>
        <Link
          href="/dealer/dashboard"
          className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-black text-slate-700 transition hover:bg-slate-50"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
async function getDealer(supabase, user) {
  if (!user?.id) {
    return null;
  }
  const { data, error } = await supabase
    .from("dealers")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();
  if (error) {
    console.error("Dealer lookup failed:", error);
    return null;
  }
  return data;
}
async function getVehicles(supabase) {
  const { data, error } = await supabase
    .from("vehicles")
    .select("*")
    .eq("status", "available")
    .order("created_at", {
      ascending: false,
    });
  if (error) {
    console.error("Vehicle marketplace query failed:", error);
    return {
      vehicles: [],
      error: error.message,
    };
  }
  return {
    vehicles: data || [],
    error: null,
  };
}
export default async function DealerVehiclesPage() {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) {
    redirect("/dealer/login");
  }
  const dealer = await getDealer(supabase, user);
  if (!dealer) {
    redirect("/dealer/register");
  }
  const {
    vehicles,
    error: vehicleError,
  } = await getVehicles(supabase);
  const dealershipName =
    dealer.dealership_name ||
    dealer.company_name ||
    "Dealer Account";
  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      {/* HEADER */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
          <Link
            href="/dealer/dashboard"
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 font-black text-white">
              N
            </div>
            <div>
              <div className="font-black text-slate-950">
                NorthSky Auto
              </div>
              <div className="text-xs font-semibold text-slate-500">
                Dealer Portal
              </div>
            </div>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            <Link
              href="/dealer/dashboard"
              className="text-sm font-semibold text-slate-600 hover:text-slate-950"
            >
              Dashboard
            </Link>
            <Link
              href="/dealer/vehicles"
              className="text-sm font-black text-blue-600"
            >
              Vehicles
            </Link>
            <Link
              href="/dealer/profile"
              className="text-sm font-semibold text-slate-600 hover:text-slate-950"
            >
              Profile
            </Link>
            <Link
              href="/pricing"
              className="text-sm font-semibold text-slate-600 hover:text-slate-950"
            >
              Plans
            </Link>
          </nav>
          <form action="/api/auth/signout" method="POST">
            <button
              type="submit"
              className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-100"
            >
              Sign Out
            </button>
          </form>
        </div>
      </header>
      {/* MAIN */}
      <section className="px-6 py-10 md:py-14">
        <div className="mx-auto max-w-7xl">
          {/* HERO */}
          <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 p-8 text-white md:p-10">
            <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-300">
                  Dealer Marketplace
                </p>
                <h1 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">
                  Vehicle Opportunities
                </h1>
                <p className="mt-4 max-w-2xl leading-7 text-slate-300">
                  Browse vehicles submitted through NorthSky Auto
                  and discover potential acquisition opportunities
                  for {dealershipName}.
                </p>
              </div>
              <Link
                href="/dealer/dashboard"
                className="inline-flex shrink-0 rounded-xl border border-white/20 bg-white/10 px-6 py-4 font-black text-white transition hover:bg-white/20"
              >
                ← Dashboard
              </Link>
            </div>
          </div>
          {/* SEARCH / FILTER BAR */}
          <div className="mt-8 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div className="grid gap-4 md:grid-cols-4">
              <div className="md:col-span-2">
                <label
                  htmlFor="vehicle-search"
                  className="text-xs font-black uppercase tracking-wider text-slate-400"
                >
                  Search
                </label>
                <input
                  id="vehicle-search"
                  type="search"
                  placeholder="Search make, model, city..."
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
              <div>
                <label
                  htmlFor="vehicle-condition"
                  className="text-xs font-black uppercase tracking-wider text-slate-400"
                >
                  Condition
                </label>
                <select
                  id="vehicle-condition"
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
                >
                  <option value="">All Conditions</option>
                  <option value="excellent">Excellent</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                  <option value="salvage">Salvage</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="vehicle-sort"
                  className="text-xs font-black uppercase tracking-wider text-slate-400"
                >
                  Sort
                </label>
                <select
                  id="vehicle-sort"
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
                >
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="mileage-low">
                    Mileage: Low to High
                  </option>
                </select>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm font-semibold text-slate-500">
                {vehicles.length}{" "}
                {vehicles.length === 1
                  ? "vehicle opportunity"
                  : "vehicle opportunities"}{" "}
                available
              </p>
              <p className="text-xs font-semibold text-slate-400">
                Showing available marketplace vehicles
              </p>
            </div>
          </div>
          {/* DATABASE ERROR */}
          {vehicleError && (
            <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-5">
              <p className="font-black text-red-800">
                Vehicle marketplace connection issue
              </p>
              <p className="mt-2 text-sm leading-6 text-red-700">
                The marketplace could not load vehicle data.
                Please check the Supabase vehicles table and
                Row Level Security policies.
              </p>
            </div>
          )}
          {/* VEHICLES */}
          <div className="mt-8">
            {vehicles.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {vehicles.map((vehicle) => (
                  <VehicleCard
                    key={vehicle.id}
                    vehicle={vehicle}
                  />
                ))}
              </div>
            )}
          </div>
          {/* FOOTER NOTICE */}
          <div className="mt-10 rounded-2xl border border-blue-100 bg-blue-50 p-6">
            <h2 className="font-black text-slate-950">
              About NorthSky Auto Opportunities
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
              Vehicle submissions represent opportunities for
              participating dealerships. A listing does not
              guarantee an offer, purchase, financing approval,
              or completed transaction.
            </p>
            <div className="mt-5 flex flex-wrap gap-5 text-sm font-bold">
              <Link
                href="/terms"
                className="text-blue-600 hover:underline"
              >
                Terms
              </Link>
              <Link
                href="/privacy"
                className="text-blue-600 hover:underline"
              >
                Privacy
              </Link>
              <Link
                href="/contact"
                className="text-blue-600 hover:underline"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}