import Link from "next/link";

export const metadata = {
  title: "NorthSky Auto Test",
  description: "NorthSky Auto application test page.",
};

export default function TestPage() {
  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link
            href="/"
            className="text-xl font-black tracking-tight text-slate-950"
          >
            NorthSky <span className="text-blue-600">Auto</span>
          </Link>

          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-black uppercase tracking-wider text-green-700">
            Test Mode
          </span>
        </div>
      </header>

      {/* Main */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-3xl bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 p-8 text-white shadow-xl md:p-12">
            <div className="inline-flex rounded-full bg-blue-500/20 px-4 py-2 text-sm font-bold text-blue-300 ring-1 ring-blue-400/30">
              NORTHSKY AUTO
            </div>

            <h1 className="mt-6 text-4xl font-black tracking-tight md:text-6xl">
              Application Test Page
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              If you can see this page, the Next.js application,
              routing, global CSS, and Tailwind CSS are working.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/"
                className="rounded-xl bg-blue-600 px-6 py-3 font-black text-white transition hover:bg-blue-700"
              >
                Back Home
              </Link>

              <Link
                href="/sell"
                className="rounded-xl border border-white/20 bg-white/10 px-6 py-3 font-black text-white transition hover:bg-white/20"
              >
                Test Sell Page
              </Link>

              <Link
                href="/dealer/login"
                className="rounded-xl border border-white/20 bg-white/10 px-6 py-3 font-black text-white transition hover:bg-white/20"
              >
                Dealer Login
              </Link>
            </div>
          </div>

          {/* Status Cards */}
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <StatusCard
              title="Next.js"
              status="Working"
              description="App Router page successfully rendered."
            />

            <StatusCard
              title="Tailwind CSS"
              status="Working"
              description="Tailwind utility classes are rendering."
            />

            <StatusCard
              title="Routing"
              status="Working"
              description="/test route is accessible."
            />
          </div>

          {/* Environment */}
          <div className="mt-8 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 md:p-8">
            <h2 className="text-2xl font-black text-slate-950">
              NorthSky Auto System Check
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              This page is intentionally simple. We can use it to
              isolate build and routing problems before adding more
              application logic.
            </p>

            <div className="mt-6 divide-y divide-slate-200 rounded-2xl border border-slate-200">
              <CheckRow
                name="Global CSS"
                value="Loaded"
              />

              <CheckRow
                name="Tailwind CSS"
                value="Loaded"
              />

              <CheckRow
                name="Next.js App Router"
                value="Loaded"
              />

              <CheckRow
                name="React"
                value="Loaded"
              />

              <CheckRow
                name="Test Route"
                value="/test"
              />
            </div>
          </div>

          {/* API Test */}
          <div className="mt-8 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 md:p-8">
            <h2 className="text-2xl font-black">
              API Test
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Your vehicle submission API can be tested separately
              from this page.
            </p>

            <div className="mt-5 rounded-2xl bg-slate-950 p-5 font-mono text-sm text-slate-300">
              <p>
                GET /api/leads
              </p>

              <p className="mt-2">
                POST /api/leads
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-8 text-center text-sm text-slate-500">
          NorthSky Auto — Development Test Page
        </div>
      </footer>
    </main>
  );
}

function StatusCard({
  title,
  status,
  description,
}) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="flex items-center justify-between gap-4">
        <h3 className="font-black text-slate-900">
          {title}
        </h3>

        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-black text-green-700">
          {status}
        </span>
      </div>

      <p className="mt-3 text-sm leading-6 text-slate-500">
        {description}
      </p>
    </div>
  );
}

function CheckRow({
  name,
  value,
}) {
  return (
    <div className="flex items-center justify-between gap-4 px-5 py-4">
      <span className="font-semibold text-slate-700">
        {name}
      </span>

      <span className="font-bold text-green-600">
        ✓ {value}
      </span>
    </div>
  );
}
