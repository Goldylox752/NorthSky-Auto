```jsx
import Link from "next/link";

export const metadata = {
  title: "Dealer Dashboard | NorthSky Auto",
  description:
    "NorthSky Auto dealer dashboard for vehicle opportunities and dealer activity.",
};

export default function DealerDashboardPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-slate-800">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link
            href="/"
            className="text-2xl font-bold tracking-tight"
          >
            NorthSky Auto
          </Link>

          <Link
            href="/"
            className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800"
          >
            Home
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
            Dealer Portal
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Dealer Dashboard
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-400">
            Manage your dealership activity and explore vehicle acquisition
            opportunities through NorthSky Auto.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Link
            href="/dealer/vehicles"
            className="rounded-2xl border border-slate-800 bg-slate-900 p-7 transition hover:border-blue-500 hover:bg-slate-800"
          >
            <div className="text-3xl">🚗</div>

            <h2 className="mt-5 text-xl font-semibold">
              Vehicle Opportunities
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              Browse vehicles currently available through the NorthSky Auto
              dealer network.
            </p>

            <span className="mt-6 inline-block text-sm font-semibold text-blue-400">
              View Vehicles →
            </span>
          </Link>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-7">
            <div className="text-3xl">📋</div>

            <h2 className="mt-5 text-xl font-semibold">
              Dealer Activity
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              Track your vehicle interests, acquisition activity, and dealer
              opportunities.
            </p>

            <span className="mt-6 inline-block text-sm font-semibold text-slate-500">
              Coming Soon
            </span>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-7">
            <div className="text-3xl">👤</div>

            <h2 className="mt-5 text-xl font-semibold">
              Dealer Account
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              Manage your dealership profile, account information, and portal
              settings.
            </p>

            <span className="mt-6 inline-block text-sm font-semibold text-slate-500">
              Coming Soon
            </span>
          </div>
        </div>

        <div className="mt-12 rounded-2xl border border-blue-900/50 bg-blue-950/30 p-8">
          <h2 className="text-2xl font-bold">
            NorthSky Auto Dealer Network
          </h2>

          <p className="mt-3 max-w-2xl text-slate-400">
            Access vehicle opportunities and connect with the NorthSky Auto
            marketplace built for Canadian automotive dealers.
          </p>

          <Link
            href="/dealer/vehicles"
            className="mt-6 inline-flex rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-500"
          >
            Browse Vehicles
          </Link>
        </div>
      </section>
    </main>
  );
}
```
