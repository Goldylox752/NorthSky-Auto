export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Navigation */}
      <header className="border-b border-white/10 bg-slate-950/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a href="/" className="text-2xl font-bold tracking-tight">
            NorthSky <span className="text-blue-500">Auto</span>
          </a>

          <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
            <a href="#inventory" className="transition hover:text-white">
              Inventory
            </a>
            <a href="#financing" className="transition hover:text-white">
              Financing
            </a>
            <a href="#trade" className="transition hover:text-white">
              Trade-In
            </a>
            <a href="#contact" className="transition hover:text-white">
              Contact
            </a>
          </nav>

          <a
            href="#inventory"
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold transition hover:bg-blue-500"
          >
            View Inventory
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/50 via-slate-950 to-slate-950" />

        <div className="relative mx-auto max-w-7xl px-6 py-28 md:py-36">
          <div className="max-w-3xl">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-blue-400">
              NorthSky Auto
            </p>

            <h1 className="text-5xl font-black leading-tight tracking-tight sm:text-6xl md:text-7xl">
              Drive something
              <span className="block text-blue-500">worth coming home to.</span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">
              Quality vehicles, transparent pricing, and a straightforward
              buying experience. Find your next vehicle with NorthSky Auto.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a
                href="#inventory"
                className="rounded-xl bg-blue-600 px-7 py-4 text-center font-bold transition hover:bg-blue-500"
              >
                Browse Vehicles
              </a>

              <a
                href="#contact"
                className="rounded-xl border border-white/15 bg-white/5 px-7 py-4 text-center font-bold transition hover:bg-white/10"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Search */}
      <section className="border-y border-white/10 bg-slate-900">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="grid gap-4 md:grid-cols-4">
            <select className="rounded-lg border border-white/10 bg-slate-950 px-4 py-3 text-slate-300 outline-none">
              <option>Any Make</option>
              <option>Ford</option>
              <option>Chevrolet</option>
              <option>Toyota</option>
              <option>Honda</option>
              <option>BMW</option>
            </select>

            <select className="rounded-lg border border-white/10 bg-slate-950 px-4 py-3 text-slate-300 outline-none">
              <option>Any Model</option>
              <option>SUV</option>
              <option>Truck</option>
              <option>Car</option>
              <option>Van</option>
            </select>

            <select className="rounded-lg border border-white/10 bg-slate-950 px-4 py-3 text-slate-300 outline-none">
              <option>Any Price</option>
              <option>Under $20,000</option>
              <option>$20,000 - $35,000</option>
              <option>$35,000 - $50,000</option>
              <option>$50,000+</option>
            </select>

            <a
              href="#inventory"
              className="rounded-lg bg-blue-600 px-5 py-3 text-center font-semibold transition hover:bg-blue-500"
            >
              Search Inventory
            </a>
          </div>
        </div>
      </section>

      {/* Inventory */}
      <section id="inventory" className="mx-auto max-w-7xl px-6 py-24">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
              Featured Inventory
            </p>

            <h2 className="mt-3 text-4xl font-bold tracking-tight">
              Vehicles worth a closer look.
            </h2>

            <p className="mt-4 max-w-2xl text-slate-400">
              Explore some of the vehicles available at NorthSky Auto.
            </p>
          </div>

          <a
            href="#inventory"
            className="text-sm font-semibold text-blue-400 hover:text-blue-300"
          >
            View all inventory →
          </a>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            {
              name: "Premium SUV",
              details: "AWD • Automatic • Low Mileage",
              price: "$34,995",
            },
            {
              name: "Full-Size Truck",
              details: "4x4 • Automatic • Crew Cab",
              price: "$42,995",
            },
            {
              name: "Sport Sedan",
              details: "AWD • Automatic • Premium Package",
              price: "$29,995",
            },
          ].map((vehicle) => (
            <article
              key={vehicle.name}
              className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900"
            >
              <div className="flex h-52 items-center justify-center bg-gradient-to-br from-slate-800 to-slate-950">
                <span className="text-sm font-medium text-slate-500">
                  Vehicle Image
                </span>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold">{vehicle.name}</h3>

                <p className="mt-2 text-sm text-slate-400">
                  {vehicle.details}
                </p>

                <div className="mt-6 flex items-center justify-between">
                  <span className="text-xl font-bold text-blue-400">
                    {vehicle.price}
                  </span>

                  <button className="rounded-lg border border-white/10 px-4 py-2 text-sm font-semibold transition hover:bg-white/5">
                    Details
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Why Us */}
      <section className="border-y border-white/10 bg-slate-900">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
              Why NorthSky
            </p>

            <h2 className="mt-3 text-4xl font-bold">
              A better way to buy a vehicle.
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Transparent Pricing",
                text: "Straightforward pricing without unnecessary surprises.",
              },
              {
                title: "Quality Vehicles",
                text: "We focus on vehicles that are ready for the road.",
              },
              {
                title: "Easy Experience",
                text: "From browsing to financing, we keep the process simple.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-white/10 bg-slate-950 p-7"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-blue-600/10 text-blue-400">
                  ✓
                </div>

                <h3 className="text-xl font-bold">{item.title}</h3>

                <p className="mt-3 leading-7 text-slate-400">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Financing */}
      <section id="financing" className="mx-auto max-w-7xl px-6 py-24">
        <div className="rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-950/60 to-slate-900 p-8 md:p-14">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
              Financing
            </p>

            <h2 className="mt-3 text-4xl font-bold">
              Get behind the wheel sooner.
            </h2>

            <p className="mt-5 leading-8 text-slate-300">
              Explore financing options and find a payment that works for
              your budget.
            </p>

            <a
              href="#contact"
              className="mt-8 inline-block rounded-xl bg-blue-600 px-7 py-4 font-bold transition hover:bg-blue-500"
            >
              Talk to Our Team
            </a>
          </div>
        </div>
      </section>

      {/* Trade */}
      <section id="trade" className="border-y border-white/10 bg-slate-900">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
                Trade-In
              </p>

              <h2 className="mt-3 text-4xl font-bold">
                Ready to trade your current vehicle?
              </h2>

              <p className="mt-5 leading-8 text-slate-400">
                Bring us your current vehicle and let our team help you
                explore your options toward your next one.
              </p>

              <a
                href="#contact"
                className="mt-8 inline-block rounded-xl border border-white/10 bg-white/5 px-7 py-4 font-bold transition hover:bg-white/10"
              >
                Get a Trade Estimate
              </a>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-950 p-8">
              <div className="text-5xl font-black text-blue-500">01</div>
              <h3 className="mt-5 text-2xl font-bold">
                Tell us about your vehicle
              </h3>
              <p className="mt-3 text-slate-400">
                Share a few details and our team can help determine your next
                step.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
              Contact
            </p>

            <h2 className="mt-3 text-4xl font-bold">
              Let's find your next vehicle.
            </h2>

            <p className="mt-5 leading-8 text-slate-400">
              Have a question about a vehicle, financing, or trade-in?
              Contact the NorthSky Auto team.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900 p-7">
            <div className="space-y-6">
              <div>
                <p className="text-sm text-slate-500">Phone</p>
                <p className="mt-1 text-lg font-semibold">
                  Contact NorthSky Auto
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Email</p>
                <p className="mt-1 text-lg font-semibold">
                  sales@northskyauto.com
                </p>
              </div>

              <a
                href="mailto:sales@northskyauto.com"
                className="block rounded-xl bg-blue-600 px-6 py-4 text-center font-bold transition hover:bg-blue-500"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-slate-950">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} NorthSky Auto. All rights reserved.
          </p>

          <div className="flex gap-6">
            <a href="#inventory" className="hover:text-white">
              Inventory
            </a>
            <a href="#financing" className="hover:text-white">
              Financing
            </a>
            <a href="#contact" className="hover:text-white">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
