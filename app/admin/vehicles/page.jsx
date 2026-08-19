import Link from "next/link";

export const metadata = {
  title: "Vehicle Leads | NorthSky Auto Admin",
  description: "Review and manage NorthSky Auto vehicle submissions.",
};

export default function AdminVehiclesPage() {
  return (
    <main className="min-h-screen bg-gray-100">
      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <Link
            href="/admin"
            className="text-sm font-semibold text-blue-400 hover:text-blue-300"
          >
            ← Back to Admin
          </Link>

          <p className="mt-8 text-sm font-bold uppercase tracking-widest text-blue-400">
            NorthSky Auto
          </p>

          <h1 className="mt-3 text-4xl font-extrabold">
            Vehicle Leads
          </h1>

          <p className="mt-4 max-w-2xl text-gray-300">
            Review incoming vehicle submissions from sellers.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
          <div className="text-6xl">🚗</div>

          <h2 className="mt-6 text-2xl font-bold text-slate-900">
            Vehicle Lead Management
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-gray-500">
            Vehicle submissions will appear here once the Supabase
            vehicle database is connected.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/sell"
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Test Seller Submission
            </Link>

            <Link
              href="/admin"
              className="rounded-xl border border-gray-200 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-50"
            >
              Back to Admin
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
