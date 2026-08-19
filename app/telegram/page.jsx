import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Telegram | NorthSky Auto",
  description:
    "Connect with NorthSky Auto through Telegram for vehicle updates, dealer opportunities, and marketplace alerts.",
};

export default function TelegramPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Navigation */}
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link
            href="/"
            className="text-xl font-extrabold tracking-tight"
          >
            NorthSky <span className="text-blue-400">Auto</span>
          </Link>

          <Link
            href="/"
            className="text-sm font-semibold text-gray-300 transition hover:text-white"
          >
            ← Back to Website
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(37,99,235,0.25),_transparent_45%)]" />

        <div className="relative mx-auto max-w-5xl px-6 py-24 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-[#229ED9] text-4xl shadow-2xl shadow-blue-500/20">
            ✈️
          </div>

          <p className="mt-8 text-sm font-bold uppercase tracking-[0.25em] text-blue-400">
            NorthSky Auto Community
          </p>

          <h1 className="mx-auto mt-4 max-w-4xl text-5xl font-black tracking-tight sm:text-6xl">
            NorthSky Auto on{" "}
            <span className="text-[#229ED9]">Telegram</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-300">
            Stay connected with NorthSky Auto for vehicle opportunities,
            marketplace updates, dealer news, and important announcements.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="https://t.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-[#229ED9] px-8 py-4 font-bold text-white shadow-lg shadow-blue-500/20 transition hover:bg-[#168dcc]"
            >
              Join Our Telegram
            </a>

            <Link
              href="/"
              className="rounded-xl border border-white/15 px-8 py-4 font-bold text-white transition hover:bg-white/10"
            >
              Explore NorthSky Auto
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-20 text-slate-900">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
              Why Join
            </p>

            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
              Stay closer to the marketplace
            </h2>

            <p className="mt-4 text-gray-500">
              Our Telegram community gives dealers and vehicle sellers
              another way to stay informed.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <FeatureCard
              icon="🚗"
              title="Vehicle Opportunities"
              description="Keep up with new vehicle opportunities and marketplace activity."
            />

            <FeatureCard
              icon="🏢"
              title="Dealer Updates"
              description="Get important information about NorthSky Auto dealer programs."
            />

            <FeatureCard
              icon="🔔"
              title="Fast Notifications"
              description="Receive announcements and updates directly through Telegram."
            />
          </div>
        </div>
      </section>

      {/* Community CTA */}
      <section className="bg-gradient-to-r from-blue-700 to-blue-900 py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Be part of the NorthSky network.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-blue-100">
            Join the conversation and stay connected as NorthSky Auto
            grows its vehicle marketplace and dealer network.
          </p>

          <a
            href="https://t.me/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block rounded-xl bg-white px-8 py-4 font-bold text-blue-700 shadow-lg transition hover:bg-gray-100"
          >
            Join Telegram →
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-slate-950">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-gray-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} NorthSky Auto. All rights reserved.
          </p>

          <div className="flex gap-5">
            <Link href="/" className="hover:text-white">
              Home
            </Link>

            <Link href="/pricing" className="hover:text-white">
              Pricing
            </Link>

            <Link href="/sell" className="hover:text-white">
              Sell Your Vehicle
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-7 transition hover:-translate-y-1 hover:shadow-lg">
      <div className="text-4xl">{icon}</div>

      <h3 className="mt-5 text-xl font-bold">{title}</h3>

      <p className="mt-3 leading-7 text-gray-500">
        {description}
      </p>
    </div>
  );
}
