Yes — this Admin page is good and, importantly, it has no Supabase dependency, so it won't trigger the previous supabase.from() build failure.

I'd use it exactly as-is at:

app/admin/page.jsx

One small improvement: since dynamic = "force-dynamic" isn't needed for this page anymore, you can remove it. That makes the page even simpler.

Final version
import Link from "next/link";

export const metadata = {
  title: "Admin Dashboard | NorthSky Auto",
  description: "NorthSky Auto administration dashboard.",
};

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-gray-100">
      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-400">
            NorthSky Auto
          </p>

          <h1 className="mt-3 text-4xl font-extrabold">
            Admin Dashboard
          </h1>

          <p className="mt-4 max-w-2xl text-gray-300">
            Manage your vehicle marketplace and dealer network.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-6 py-10 md:grid-cols-3">
        <Link
          href="/admin/vehicles"
          className="rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
        >
          <div className="text-4xl">🚗</div>

          <h2 className="mt-5 text-xl font-bold text-slate-900">
            Vehicle Leads
          </h2>

          <p className="mt-2 text-gray-500">
            Review and manage vehicle submissions.
          </p>

          <p className="mt-5 font-semibold text-blue-600">
            Open Vehicle Leads →
          </p>
        </Link>

        <Link
          href="/admin/dealers"
          className="rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
        >
          <div className="text-4xl">🏢</div>

          <h2 className="mt-5 text-xl font-bold text-slate-900">
            Dealers
          </h2>

          <p className="mt-2 text-gray-500">
            Manage dealer applications and partners.
          </p>

          <p className="mt-5 font-semibold text-blue-600">
            Open Dealers →
          </p>
        </Link>

        <Link
          href="/"
          className="rounded-2xl bg-blue-600 p-6 text-white shadow-sm transition hover:-translate-y-1 hover:bg-blue-700 hover:shadow-lg"
        >
          <div className="text-4xl">🌐</div>

          <h2 className="mt-5 text-xl font-bold">
            View Website
          </h2>

          <p className="mt-2 text-blue-100">
            Return to the NorthSky Auto homepage.
          </p>

          <p className="mt-5 font-semibold">
            Visit Homepage →
          </p>
        </Link>
      </section>
    </main>
  );
