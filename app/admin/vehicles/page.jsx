import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
export const dynamic = "force-dynamic";
export const metadata = {
  title: "Vehicle Leads | NorthSky Auto Admin",
  description:
    "Review and manage NorthSky Auto vehicle submissions.",
};
/*
|--------------------------------------------------------------------------
| Admin Check
|--------------------------------------------------------------------------
*/
function isAdmin(user) {
  if (!user?.email) {
    return false;
  }
  const adminEmails = (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
  return adminEmails.includes(
    user.email.toLowerCase()
  );
}
/*
|--------------------------------------------------------------------------
| Formatting
|--------------------------------------------------------------------------
*/
function formatCurrency(value) {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return "Not provided";
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
function formatDate(value) {
  if (!value) {
    return "Not provided";
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "Not provided";
  }
  return new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}
function vehicleTitle(vehicle) {
  return (
    [
      vehicle.year,
      vehicle.make,
      vehicle.model,
    ]
      .filter(Boolean)
      .join(" ") || "Vehicle Submission"
  );
}
/*
|--------------------------------------------------------------------------
| Status Badge
|--------------------------------------------------------------------------
*/
function StatusBadge({ status }) {
  const value = String(
    status || "pending"
  ).toLowerCase();
  if (value === "available") {
    return (
      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-black text-green-700 ring-1 ring-green-200">
        Available
      </span>
    );
  }
  if (value === "rejected") {
    return (
      <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-black text-red-700 ring-1 ring-red-200">
        Rejected
      </span>
    );
  }
  return (
    <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-black text-yellow-700 ring-1 ring-yellow-200">
      Pending Review
    </span>
  );
}
/*
|--------------------------------------------------------------------------
| Database
|--------------------------------------------------------------------------
*/
async function getVehicles(supabase) {
  const {
    data,
    error,
  } = await supabase
    .from("vehicles")
    .select("*")
    .order("created_at", {
      ascending: false,
    });
  if (error) {
    console.error(
      "Admin vehicle query failed:",
      error
    );
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
/*
|--------------------------------------------------------------------------
| Vehicle Row
|--------------------------------------------------------------------------
*/
function VehicleRow({ vehicle }) {
  const title = vehicleTitle(vehicle);
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        {/* VEHICLE INFORMATION */}
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-xl font-black text-slate-950">
              {title}
            </h2>
            <StatusBadge
              status={vehicle.status}
            />
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-xs font-black uppercase tracking-wider text-slate-400">
                Seller
              </p>
              <p className="mt-1 text-sm font-bold text-slate-800">
                {vehicle.name || "Not provided"}
              </p>
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-wider text-slate-400">
                Contact
              </p>
              <p className="mt-1 break-words text-sm font-bold text-slate-800">
                {vehicle.email || "Not provided"}
              </p>
              {vehicle.phone && (
                <p className="mt-1 text-xs text-slate-500">
                  {vehicle.phone}
                </p>
              )}
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-wider text-slate-400">
                Asking Price
              </p>
              <p className="mt-1 text-sm font-black text-blue-600">
                {formatCurrency(
                  vehicle.asking_price
                )}
              </p>
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-wider text-slate-400">
                Submitted
              </p>
              <p className="mt-1 text-sm font-bold text-slate-800">
                {formatDate(
                  vehicle.created_at
                )}
              </p>
            </div>
          </div>
          <div className="mt-5 grid gap-3 rounded-2xl bg-slate-50 p-4 sm:grid-cols-3">
            <div>
              <p className="text-xs font-bold text-slate-400">
                Mileage
              </p>
              <p className="mt-1 text-sm font-black text-slate-800">
                {vehicle.mileage
                  ? `${Number(
                      vehicle.mileage
                    ).toLocaleString(
                      "en-CA"
                    )} km`
                  : "Not provided"}
              </p>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400">
                Condition
              </p>
              <p className="mt-1 text-sm font-black text-slate-800">
                {vehicle.condition ||
                  "Not provided"}
              </p>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400">
                Postal Code
              </p>
              <p className="mt-1 text-sm font-black text-slate-800">
                {vehicle.postal_code ||
                  "Not provided"}
              </p>
            </div>
          </div>
          {vehicle.description && (
            <div className="mt-5">
              <p className="text-xs font-black uppercase tracking-wider text-slate-400">
                Description
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {vehicle.description}
              </p>
            </div>
          )}
        </div>
        {/* ACTIONS */}
        <div className="flex shrink-0 flex-col gap-3 lg:w-44">
          {vehicle.status === "pending" && (
            <>
              <form
                action="/api/admin/vehicles"
                method="POST"
              >
                <input
                  type="hidden"
                  name="vehicle_id"
                  value={vehicle.id}
                />
                <input
                  type="hidden"
                  name="action"
                  value="approve"
                />
                <button
                  type="submit"
                  className="w-full rounded-xl bg-green-600 px-5 py-3 text-sm font-black text-white transition hover:bg-green-700"
                >
                  ✓ Approve
                </button>
              </form>
              <form
                action="/api/admin/vehicles"
                method="POST"
              >
                <input
                  type="hidden"
                  name="vehicle_id"
                  value={vehicle.id}
                />
                <input
                  type="hidden"
                  name="action"
                  value="reject"
                />
                <button
                  type="submit"
                  className="w-full rounded-xl bg-red-600 px-5 py-3 text-sm font-black text-white transition hover:bg-red-700"
                >
                  ✕ Reject
                </button>
              </form>
            </>
          )}
          {vehicle.status === "available" && (
            <div className="rounded-xl bg-green-50 p-4 text-center text-xs font-bold text-green-700">
              Live in dealer marketplace
            </div>
          )}
          {vehicle.status === "rejected" && (
            <div className="rounded-xl bg-red-50 p-4 text-center text-xs font-bold text-red-700">
              Submission rejected
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
/*
|--------------------------------------------------------------------------
| Admin Vehicle Page
|--------------------------------------------------------------------------
*/
export default async function AdminVehiclesPage() {
  const supabase = await createClient();
  /*
  |--------------------------------------------------------------------------
  | Authentication
  |--------------------------------------------------------------------------
  */
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError || !user) {
    redirect("/dealer/login");
  }
  /*
  |--------------------------------------------------------------------------
  | Admin Authorization
  |--------------------------------------------------------------------------
  */
  if (!isAdmin(user)) {
    redirect("/");
  }
  /*
  |--------------------------------------------------------------------------
  | Load Vehicles
  |--------------------------------------------------------------------------
  */
  const {
    vehicles,
    error,
  } = await getVehicles(supabase);
  /*
  |--------------------------------------------------------------------------
  | Counts
  |--------------------------------------------------------------------------
  */
  const pendingCount = vehicles.filter(
    (vehicle) =>
      vehicle.status === "pending"
  ).length;
  const availableCount = vehicles.filter(
    (vehicle) =>
      vehicle.status === "available"
  ).length;
  const rejectedCount = vehicles.filter(
    (vehicle) =>
      vehicle.status === "rejected"
  ).length;
  /*
  |--------------------------------------------------------------------------
  | Page
  |--------------------------------------------------------------------------
  */
  return (
    <main className="min-h-screen bg-slate-100">
      {/* HEADER */}
      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <Link
            href="/admin"
            className="text-sm font-semibold text-blue-400 hover:text-blue-300"
          >
            ← Back to Admin
          </Link>
          <p className="mt-8 text-sm font-black uppercase tracking-widest text-blue-400">
            NorthSky Auto
          </p>
          <div className="mt-3 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-4xl font-black">
                Vehicle Leads
              </h1>
              <p className="mt-4 max-w-2xl text-slate-300">
                Review seller submissions and control
                which vehicles become visible to
                participating dealerships.
              </p>
            </div>
            <Link
              href="/sell"
              className="inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-black text-white hover:bg-blue-500"
            >
              Test Seller Submission
            </Link>
          </div>
        </div>
      </section>
      {/* STATS */}
      <section className="mx-auto max-w-7xl px-6 pt-8">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <p className="text-xs font-black uppercase tracking-wider text-slate-400">
              Pending Review
            </p>
            <p className="mt-2 text-3xl font-black text-yellow-600">
              {pendingCount}
            </p>
          </div>
          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <p className="text-xs font-black uppercase tracking-wider text-slate-400">
              Live Opportunities
            </p>
            <p className="mt-2 text-3xl font-black text-green-600">
              {availableCount}
            </p>
          </div>
          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <p className="text-xs font-black uppercase tracking-wider text-slate-400">
              Rejected
            </p>
            <p className="mt-2 text-3xl font-black text-red-600">
              {rejectedCount}
            </p>
          </div>
        </div>
      </section>
      {/* VEHICLES */}
      <section className="mx-auto max-w-7xl px-6 py-8">
        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-5">
            <p className="font-black text-red-800">
              Database connection issue
            </p>
            <p className="mt-2 text-sm text-red-700">
              Unable to load vehicle submissions.
              Check the Supabase vehicles table
              and Row Level Security policies.
            </p>
          </div>
        )}
        {vehicles.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <div className="text-6xl">
              🚗
            </div>
            <h2 className="mt-6 text-2xl font-black text-slate-950">
              No vehicle submissions
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500">
              Seller vehicle submissions will appear
              here once they are stored in the
              Supabase vehicles table.
            </p>
            <Link
              href="/sell"
              className="mt-7 inline-flex rounded-xl bg-blue-600 px-6 py-3 text-sm font-black text-white hover:bg-blue-700"
            >
              Test Seller Submission
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            {vehicles.map((vehicle) => (
              <VehicleRow
                key={vehicle.id}
                vehicle={vehicle}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}