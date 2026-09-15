import Link from "next/link";

export const metadata = {
  title: "NorthSky Auto | Canadian Vehicle Marketplace",
  description:
    "Sell your vehicle and connect with Canadian dealers looking for quality inventory. Simple submission, dealer exposure, no obligation.",
};

function Step({ number, title, text }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:shadow-md">
      <div className="mb-4 text-sm font-bold tracking-widest text-blue-600">
        {number}
      </div>
      <h3 className="mb-3 text-xl font-bold text-slate-900">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{text}</p>
    </div>
  );
}

function Benefit({ icon, title, text }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm transition hover:shadow-md">
      <div className="mb-4 text-4xl">{icon}</div>
      <h3 className="mb-2 text-xl font-bold text-slate-900">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{text}</p>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="bg-white text-slate-900">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(37,99,235,0.25),transparent_40%),radial-gradient(circle_at_20%_80%,rgba(14,165,233,0.12),transparent_35%)]" />
        <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(rgba(255,255,255,.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.6)_1px,transparent_1px)] [background-size:60px_60px]" />

        <div className="relative mx-auto max-w-5xl px-6 py-24 text-center sm:py-28 lg:py-32">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold tracking-widest text-blue-300">
            CANADIAN VEHICLE MARKETPLACE
          </div>

          <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
            Sell Your Vehicle.
            <br />
            <span className="text-blue-400">Reach Dealers.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-300 sm:text-xl">
            NorthSky Auto connects vehicle sellers with Canadian dealers
            looking for quality inventory.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/sell"
              className="rounded-xl bg-blue-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:-translate-y-0.5 hover:bg-blue-500"
            >
              Sell My Vehicle →
            </Link>
            <Link
              href="/dealer"
              className="rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-base font-semibold text-white transition hover:bg-white/10"
            >
              I&apos;m a Dealer
            </Link>
          </div>

          <p className="mt-6 text-sm text-slate-400">
            Simple submission · Dealer exposure · No obligation
          </p>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm