import Link from "next/link";

export const metadata = {
  title: "NorthSky Auto | Buy, Sell & Connect With Dealers",
  description:
    "NorthSky Auto is a Canadian vehicle marketplace connecting buyers, vehicle sellers, and automotive dealers.",
};

const benefits = [
  {
    number: "01",
    title: "Browse Vehicles",
    text: "Explore vehicle opportunities and find the right vehicle for your needs.",
  },
  {
    number: "02",
    title: "Submit Your Vehicle",
    text: "Have a vehicle to sell? Submit your vehicle information and connect with dealer opportunities.",
  },
  {
    number: "03",
    title: "Dealer Access",
    text: "Dealerships can access vehicle opportunities and manage leads through NorthSky Auto.",
  },
];

const vehicleTypes = [
  {
    title: "Cars",
    icon: "🚗",
    href: "/inventory?type=cars",
  },
  {
    title: "SUVs",
    icon: "🚙",
    href: "/inventory?type=suv",
  },
  {
    title: "Trucks",
    icon: "🛻",
    href: "/inventory?type=trucks",
  },
  {
    title: "Vans",
    icon: "🚐",
    href: "/inventory?type=vans",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="text-2xl font-black tracking-tight text-slate-950"
          >
            NorthSky <span className="text-blue-600">Auto</span>
          </Link>

          <nav className="hidden items-center gap-7 text-sm font-semibold text-slate-600 md:flex">
            <Link href="/inventory" className="transition hover:text-blue-600">
              Inventory
            </Link>

            <Link href="/sell" className="transition hover:text-blue-600">
              Sell Your Vehicle
            </Link>

            <Link href="/buyers" className="transition hover:text-blue-600">
              Dealers
            </Link>

            <Link href="/pricing" className="transition hover:text-blue-600">
              Pricing
            </Link>

            <Link href="/about" className="transition hover:text-blue-600">
              About
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden rounded-xl px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-100 sm:block"
            >
              Dealer Login
            </Link>

            <Link
              href="/sell"
              className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-500"
            >
              Sell Your Vehicle
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-indigo-600/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-24 lg:py-32">
          <div className="max-w-4xl">
            <p className="text-sm font-black uppercase tracking-[0.3em] text-blue-400">
              Canadian Vehicle Marketplace
            </p>

            <h1 className="mt-5 text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl">
              Find your next
              <span className="block text-blue-500">
                vehicle.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">
              NorthSky Auto connects vehicle buyers, sellers, and automotive
              dealers through one simple marketplace.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/inventory"
                className="rounded-xl bg-blue-600 px-8 py-4 text-center font-black text-white transition hover:bg-blue-500"
              >
                Browse Vehicles →
              </Link>

              <Link
                href="/sell"
                className="rounded-xl border border-white/15 bg-white/5 px-8 py-4 text-center font-black text-white transition hover:bg-white/10"
              >
                Sell Your Vehicle
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Search */}
      <section className="relative z-10 -mt-10 px-6">
        <div className="mx-auto max-w-6xl rounded-3xl border border-slate-200 bg-white p-6 shadow-xl md:p-8">
          <div className="mb-6">
            <p className="text-sm font-black uppercase tracking-widest text-blue-600">
              FIND YOUR VEHICLE
            </p>

            <h2 className="mt-2 text-2xl font-black text-slate-950">
              Search the marketplace
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            <select
              name="make"
              defaultValue=""
              className="rounded-xl border border-slate-200 bg-white px-4 py-4 text-sm font-semibold text-slate-600 outline-none focus:border-blue-500"
            >
              <option value="">Any Make</option>
              <option value="ford">Ford</option>
              <option value="chevrolet">Chevrolet</option>
              <option value="ram">RAM</option>
              <option value="toyota">Toyota</option>
              <option value="honda">Honda</option>
              <option value="gmc">GMC</option>
            </select>

            <select
              name="type"
              defaultValue=""
              className="rounded-xl border border-slate-200 bg-white px-4 py-4 text-sm font-semibold text-slate-600 outline-none focus:border-blue-500"
            >
              <option value="">Any Vehicle Type</option>
              <option value="cars">Cars</option>
              <option value="suv">SUVs</option>
              <option value="trucks">Trucks</option>
              <option value="vans">Vans</option>
            </select>

            <select
              name="price"
              defaultValue=""
              className="rounded-xl border border-slate-200 bg-white px-4 py-4 text-sm font-semibold text-slate-600 outline-none focus:border-blue-500"
            >
              <option value="">Any Price</option>
              <option value="under-15000">Under $15,000</option>
              <option value="15000-30000">$15,000 – $30,000</option>
              <option value="30000-50000">$30,000 – $50,000</option>
              <option value="50000-plus">$50,000+</option>
            </select>

            <Link
              href="/inventory"
              className="flex items-center justify-center rounded-xl bg-slate-950 px-5 py-4 text-sm font-black text-white transition hover:bg-slate-800"
            >
              Search Inventory
            </Link>
          </div>
        </div>
      </section>

      {/* Vehicle Categories */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:py-24">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-widest text-blue-600">
              SHOP BY TYPE
            </p>

            <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-950">
              Find the right vehicle.
            </h2>
          </div>

          <Link
            href="/inventory"
            className="font-bold text-blue-600 hover:text-blue-500"
          >
            View All Inventory →
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {vehicleTypes.map((type) => (
            <Link
              key={type.title}
              href={type.href}
              className="group rounded-2xl border border-slate-200 bg-slate-50 p-7 text-center transition hover:-translate-y-1 hover:border-blue-300 hover:bg-blue-50 hover:shadow-lg"
            >
              <div className="text-5xl transition group-hover:scale-110">
                {type.icon}
              </div>

              <h3 className="mt-5 text-lg font-black text-slate-950">
                {type.title}
              </h3>

              <p className="mt-2 text-sm font-semibold text-blue-600">
                Browse {type.title} →
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Inventory Placeholder */}
      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:py-24">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-widest text-blue-600">
                FEATURED VEHICLES
              </p>

              <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-950">
                Vehicles available through NorthSky Auto.
              </h2>

              <p className="mt-4 max-w-2xl text-slate-600">
                Browse available vehicle opportunities from participating
                sellers and dealers.
              </p>
            </div>

            <Link
              href="/inventory"
              className="font-bold text-blue-600 hover:text-blue-500"
            >
              View Inventory →
            </Link>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((vehicle) => (
              <div
                key={vehicle}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                <div className="flex h-52 items-center justify-center bg-slate-200">
                  <span className="text-sm font-bold text-slate-500">
                    Vehicle Image
                  </span>
                </div>

                <div className="p-6">
                  <p className="text-xs font-black uppercase tracking-widest text-blue-600">
                    Featured Vehicle
                  </p>

                  <h3 className="mt-2 text-xl font-black text-slate-950">
                    Vehicle Listing
                  </h3>

                  <p className="mt-2 text-sm text-slate-500">
                    Inventory details will be loaded from the NorthSky Auto
                    marketplace.
                  </p>

                  <Link
                    href="/inventory"
                    className="mt-5 block rounded-xl bg-slate-950 px-5 py-3 text-center text-sm font-black text-white transition hover:bg-slate-800"
                  >
                    View Inventory
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:py-24">
        <div className="max-w-3xl">
          <p className="text-sm font-black uppercase tracking-widest text-blue-600">
            HOW IT WORKS
          </p>

          <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-950">
            One marketplace. Three simple paths.
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Whether you're buying, selling, or operating a dealership,
            NorthSky Auto is designed to make the process easier.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {benefits.map((benefit) => (
            <div
              key={benefit.number}
              className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-sm font-black text-white">
                {benefit.number}
              </div>

              <h3 className="mt-6 text-xl font-black text-slate-950">
                {benefit.title}
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                {benefit.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Dealer CTA */}
      <section className="bg-slate-950">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-widest text-blue-400">
                FOR AUTOMOTIVE DEALERS
              </p>

              <h2 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
                Find your next inventory opportunity.
              </h2>

              <p className="mt-5 text-lg leading-8 text-slate-300">
                Access vehicle opportunities, manage leads, and grow your
                dealership through the NorthSky Auto dealer platform.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/buyers"
                  className="rounded-xl bg-blue-600 px-7 py-4 text-center font-black text-white transition hover:bg-blue-500"
                >
                  Dealer Information
                </Link>

                <Link
                  href="/pricing"
                  className="rounded-xl border border-white/15 bg-white/5 px-7 py-4 text-center font-black text-white transition hover:bg-white/10"
                >
                  View Dealer Plans
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <div className="space-y-6">
                <div>
                  <p className="text-sm font-bold text-blue-400">
                    DEALER PLATFORM
                  </p>

                  <h3 className="mt-2 text-2xl font-black text-white">
                    Built for dealerships.
                  </h3>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl bg-white/5 p-5">
                    <p className="text-2xl font-black text-white">Leads</p>
                    <p className="mt-1 text-sm text-slate-400">
                      Discover new opportunities.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white/5 p-5">
                    <p className="text-2xl font-black text-white">
                      Inventory
                    </p>
                    <p className="mt-1 text-sm text-slate-400">
                      Find vehicles that fit your dealership.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white/5 p-5">
                    <p className="text-2xl font-black text-white">
                      Analytics
                    </p>
                    <p className="mt-1 text-sm text-slate-400">
                      Track your marketplace activity.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white/5 p-5">
                    <p className="text-2xl font-black text-white">
                      Control
                    </p>
                    <p className="mt-1 text-sm text-slate-400">
                      Manage your dealer account.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seller CTA */}
      <section className="border-b border-slate-200 bg-blue-50">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center lg:py-24">
          <p className="text-sm font-black uppercase tracking-widest text-blue-600">
            READY TO SELL?
          </p>

          <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-950">
            Have a vehicle to sell?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Submit your vehicle information and start the NorthSky Auto
            vehicle opportunity process.
          </p>

          <Link
            href="/sell"
            className="mt-8 inline-flex rounded-xl bg-blue-600 px-8 py-4 font-black text-white transition hover:bg-blue-500"
          >
            Submit Your Vehicle →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-300">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <div className="grid gap-10 md:grid-cols-4">
            <div className="md:col-span-2">
              <Link
                href="/"
                className="text-2xl font-black text-white"
              >
                NorthSky <span className="text-blue-500">Auto</span>
              </Link>

              <p className="mt-4 max-w-md text-sm leading-7 text-slate-400">
                A Canadian vehicle marketplace connecting buyers, sellers,
                and automotive dealers.
              </p>
            </div>

            <div>
              <h3 className="font-black text-white">Marketplace</h3>

              <div className="mt-4 space-y-3 text-sm">
                <Link
                  href="/inventory"
                  className="block transition hover:text-white"
                >
                  Inventory
                </Link>

                <Link
                  href="/sell"
                  className="block transition hover:text-white"
                >
                  Sell Your Vehicle
                </Link>

                <Link
                  href="/buyers"
                  className="block transition hover:text-white"
                >
                  Dealers
                </Link>

                <Link
                  href="/pricing"
                  className="block transition hover:text-white"
                >
                  Pricing
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-black text-white">Company</h3>

              <div className="mt-4 space-y-3 text-sm">
                <Link
                  href="/about"
                  className="block transition hover:text-white"
                >
                  About
                </Link>

                <Link
                  href="/contact"
                  className="block transition hover:text-white"
                >
                  Contact
                </Link>

                <Link
                  href="/privacy"
                  className="block transition hover:text-white"
                >
                  Privacy
                </Link>

                <Link
                  href="/terms"
                  className="block transition hover:text-white"
                >
                  Terms
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-white/10 pt-6 text-xs text-slate-500">
            © {new Date().getFullYear()} NorthSky Auto. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}