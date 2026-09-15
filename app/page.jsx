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
      <section className="mx-auto max-w-7xl px-6 py-20 sm:py-24">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <div className="mb-3 text-xs font-bold tracking-widest text-blue-600">
            HOW IT WORKS
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            A simpler way to connect vehicles with dealers.
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Submit your vehicle once and let NorthSky Auto help connect you
            with participating dealers.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Step
            number="01"
            title="Submit Your Vehicle"
            text="Tell us about your vehicle, including mileage, condition, location and selling details."
          />
          <Step
            number="02"
            title="Reach Dealers"
            text="Your vehicle information becomes available to participating dealers looking for inventory."
          />
          <Step
            number="03"
            title="Get Connected"
            text="Interested dealers can review the opportunity and connect with you."
          />
        </div>
      </section>

      {/* ================= FOR SELLERS ================= */}
      <section className="border-y border-slate-100 bg-slate-50">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:gap-16 lg:py-24">
          <div>
            <div className="mb-3 text-xs font-bold tracking-widest text-blue-600">
              FOR SELLERS
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Turn your vehicle into an opportunity.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              Instead of contacting dealerships one by one, submit your vehicle
              through NorthSky Auto and reach dealers looking for inventory.
            </p>

            <ul className="mt-8 space-y-3">
              {[
                "Submit your vehicle online",
                "Reach participating dealers",
                "Get connected with interested buyers",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 font-medium text-slate-700">
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
              Sell Your Vehicle →
            </Link>
          </div>

          {/* Vehicle card preview */}
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50">
            <div className="mb-6 flex items-center justify-between">
              <span className="text-xs font-bold tracking-widest text-blue-600">
                VEHICLE OPPORTUNITY
              </span>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                Available
              </span>
            </div>

            <div className="mb-4 text-5xl">🚗</div>
            <h3 className="text-2xl font-bold text-slate-900">
              Your Vehicle Could Be Here
            </h3>
            <p className="mt-3 text-slate-600 leading-relaxed">
              Submit your vehicle details and make your opportunity visible to
              participating dealers.
            </p>

            <div className="mt-6 flex justify-between border-y border-slate-100 py-4 text-sm font-medium text-slate-600">
              <span>📍 Canada</span>
              <span>✓ Dealer Ready</span>
            </div>

            <Link
              href="/sell"
              className="mt-6 block rounded-xl bg-slate-900 py-3.5 text-center font-semibold text-white transition hover:bg-slate-800"
            >
              Submit Vehicle →
            </Link>
          </div>
        </div>
      </section>

      {/* ================= FOR DEALERS ================= */}
      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center sm:py-24">
          <div className="mb-4 text-xs font-bold tracking-widest text-blue-300">
            FOR DEALERS
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Find inventory faster.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-slate-300">
            Discover vehicle opportunities from sellers and find inventory that
            fits your dealership.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-medium text-slate-300">
            <span>✓ Browse vehicle opportunities</span>
            <span>✓ Review seller information</span>
            <span>✓ Connect with potential sellers</span>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/dealer"
              className="rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-500"
            >
              Explore Dealer Portal →
            </Link>
            <Link
              href="/pricing"
              className="rounded-xl border border-slate-600 px-8 py-4 font-semibold text-white transition hover:border-slate-400"
            >
              View Dealer Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* ================= WHY NORTHSKY ================= */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:py-24">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <div className="mb-3 text-xs font-bold tracking-widest text-blue-600">
            WHY NORTHSKY AUTO
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Built to make vehicle connections simpler.
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Benefit
            icon="🇨🇦"
            title="Canadian Focus"
            text="Built around connecting Canadian vehicle sellers and automotive dealers."
          />
          <Benefit
            icon="⚡"
            title="Simple Process"
            text="Submit vehicle information online without having to contact dealerships one by one."
          />
          <Benefit
            icon="🤝"
            title="Better Connections"
            text="Bring sellers and dealers together in one marketplace."
          />
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="border-t border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center sm:py-24">
          <div className="mb-3 text-xs font-bold tracking-widest text-blue-600">
            GET STARTED
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Ready to connect?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-slate-600">
            Whether you&apos;re selling a vehicle or looking for inventory,
            NorthSky Auto helps connect both sides of the automotive marketplace.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/sell"
              className="rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white shadow-md shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-500"
            >
              Sell a Vehicle →
            </Link>
            <Link
              href="/dealer"
              className="rounded-xl border border-slate-300 bg-white px-8 py-4 font-semibold text-slate-900 transition hover:bg-slate-50"
            >
              Join as a Dealer
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}