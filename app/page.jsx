import Link from "next/link";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://north-sky-auto-green.vercel.app";

export const metadata = {
  title: "NorthSky Auto | Canadian Vehicle Marketplace",
  description:
    "Sell your vehicle once and reach Canadian dealers looking for inventory. Simple submission, dealer exposure, no obligation.",
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "NorthSky Auto | Canadian Vehicle Marketplace",
    description:
      "Connect vehicle sellers with Canadian dealers looking for inventory.",
    url: SITE_URL,
    siteName: "NorthSky Auto",
    type: "website",
    locale: "en_CA",
  },
};

const steps = [
  {
    number: "01",
    title: "Submit your vehicle",
    text: "Year, make, model, mileage, condition, location, and asking details.",
  },
  {
    number: "02",
    title: "Reach dealers",
    text: "Participating dealers see the opportunity in the NorthSky marketplace.",
  },
  {
    number: "03",
    title: "Get connected",
    text: "Interested dealers review the listing and reach out.",
  },
];

const benefits = [
  {
    icon: "🇨🇦",
    title: "Canadian focus",
    text: "Built for sellers and dealers across Canada.",
  },
  {
    icon: "⚡",
    title: "One submission",
    text: "Skip calling dealerships one by one.",
  },
  {
    icon: "🤝",
    title: "Direct connections",
    text: "Sellers and dealers meet in one marketplace.",
  },
];

function Step({ number, title, text }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:shadow-md">
      <div className="mb-4 text-sm font-bold tracking-widest text-blue-600">
        {number}
      </div>
      <h3 className="mb-3 text-xl font-bold text-slate-900">{title}</h3>
      <p className="leading-relaxed text-slate-600">{text}</p>
    </div>
  );
}

function Benefit({ icon, title, text }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm transition hover:shadow-md">
      <div className="mb-4 text-4xl">{icon}</div>
      <h3 className="mb-2 text-xl font-bold text-slate-900">{title}</h3>
      <p className="leading-relaxed text-slate-600">{text}</p>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="bg-white text-slate-900">
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(37,99,235,0.25),transparent_40%),radial-gradient(circle_at_20%_80%,rgba(14,165,233,0.12),transparent_35%)]" />
        <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(rgba(255,255,255,.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.6)_1px,transparent_1px)] [background-size:60px_60px]" />

        <div className="relative mx-auto max-w-5xl px-6 py-24 text-center sm:py-28 lg:py-32">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold tracking-widest text-blue-300">
            Canadian vehicle marketplace
          </div>

          <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
            Sell your vehicle.
            <br />
            <span className="text-blue-400">Reach dealers.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-300 sm:text-xl">
            NorthSky Auto puts your vehicle in front of Canadian dealers
            looking for inventory.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/sell"
              className="rounded-xl bg-blue-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:-translate-y-0.5 hover:bg-blue-500"
            >
              Sell my vehicle →
            </Link>
            <Link
              href="/dealer"
              className="rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-base font-semibold text-white transition hover:bg-white/10"
            >
              I&apos;m a dealer
            </Link>
          </div>

          <p className="mt-6 text-sm text-slate-400">
            Simple submission · Dealer exposure · No obligation
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 sm:py-24">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <div className="mb-3 text-xs font-bold tracking-widest text-blue-600">
            How it works
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Submit once. Let dealers come to you.
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            One listing reaches participating dealers instead of a stack of
            phone calls.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step) => (
            <Step key={step.number} {...step} />
          ))}
        </div>
      </section>

      <section className="border-y border-slate-100 bg-slate-50">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:gap-16 lg:py-24">
          <div>
            <div className="mb-3 text-xs font-bold tracking-widest text-blue-600">
              For sellers
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Turn the vehicle into an opportunity.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              List online and reach dealers who are already looking for
              inventory.
            </p>

            <ul className="mt-8 space-y-3">
              {[
                "Submit your vehicle online",
                "Reach participating dealers",
                "Hear from interested buyers",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 font-medium text-slate-700"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <Link
              href="/sell"
              className="mt-10 inline-flex rounded-xl bg-blue-600 px-7 py-3.5 font-semibold text-white shadow-md shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-500"
            >
              Sell your vehicle →
            </Link>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50">
            <div className="mb-6 flex items-center justify-between">
              <span className="text-xs font-bold tracking-widest text-blue-600">
                Vehicle opportunity
              </span>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                Available
              </span>
            </div>

            <div className="mb-4 text-5xl">🚗</div>
            <h3 className="text-2xl font-bold text-slate-900">
              Your vehicle could be here
            </h3>
            <p className="mt-3 leading-relaxed text-slate-600">
              Add the details and make the listing visible to participating
              dealers.
            </p>

            <div className="mt-6 flex justify-between border-y border-slate-100 py-4 text-sm font-medium text-slate-600">
              <span>📍 Canada</span>
              <span>✓ Dealer ready</span>
            </div>

            <Link
              href="/sell"
              className="mt-6 block rounded-xl bg-slate-900 py-3.5 text-center font-semibold text-white transition hover:bg-slate-800"
            >
              Submit vehicle →
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center sm:py-24">
          <div className="mb-4 text-xs font-bold tracking-widest text-blue-300">
            For dealers
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Find inventory faster.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-slate-300">
            Browse seller-submitted vehicles and shortlist inventory that
            fits the lot.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-medium text-slate-300">
            <span>✓ Browse opportunities</span>
            <span>✓ Review seller details</span>
            <span>✓ Connect with sellers</span>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/dealer"
              className="rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-500"
            >
              Explore dealer portal →
            </Link>
            <Link
              href="/buyers"
              className="rounded-xl border border-slate-600 px-8 py-4 font-semibold text-white transition hover:border-slate-400"
            >
              View dealer pricing
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 sm:py-24">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <div className="mb-3 text-xs font-bold tracking-widest text-blue-600">
            Why NorthSky Auto
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Built to make the connection simple.
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((item) => (
            <Benefit key={item.title} {...item} />
          ))}
        </div>
      </section>

      <section className="border-t border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center sm:py-24">
          <div className="mb-3 text-xs font-bold tracking-widest text-blue-600">
            Get started
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Ready to connect?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-slate-600">
            Selling a vehicle or sourcing inventory — both sides start here.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/sell"
              className="rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white shadow-md shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-500"
            >
              Sell a vehicle →
            </Link>
            <Link
              href="/dealer"
              className="rounded-xl border border-slate-300 bg-white px-8 py-4 font-semibold text-slate-900 transition hover:bg-slate-50"
            >
              Join as a dealer
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}