import Link from "next/link";
export const metadata = {
  title: "Contact NorthSky Auto | Dealer Support & Vehicle Inquiries",
  description:
    "Contact NorthSky Auto about dealer accounts, vehicle opportunities, memberships, selling a vehicle, partnerships, and general inquiries.",
};
const contactTopics = [
  {
    icon: "🚗",
    title: "Sell a Vehicle",
    description:
      "Ready to sell a car, truck, SUV, van, or commercial vehicle? Submit your vehicle to NorthSky Auto.",
    href: "/sell",
    action: "Submit Your Vehicle",
  },
  {
    icon: "🏢",
    title: "Dealer Support",
    description:
      "Get help with your dealer account, vehicle opportunities, membership, or marketplace access.",
    href: "/dealer",
    action: "Dealer Portal",
  },
  {
    icon: "💳",
    title: "Dealer Membership",
    description:
      "Review NorthSky Auto dealer membership options and choose the plan that fits your dealership.",
    href: "/buyers",
    action: "View Dealer Plans",
  },
  {
    icon: "🤝",
    title: "Partnerships",
    description:
      "Interested in working with NorthSky Auto or developing a dealership partnership?",
    href: "#contact-form",
    action: "Contact Us",
  },
];
export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-800 px-6 py-20 text-white">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full bg-blue-500/20 px-4 py-2 text-xs font-black tracking-widest text-blue-300">
              NORTHSKY AUTO
            </span>
            <h1 className="mt-6 text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
              Let&apos;s Connect
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Have a question about NorthSky Auto, your dealer account,
              vehicle opportunities, or selling a vehicle? Send us a
              message and our team will help point you in the right
              direction.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/sell"
                className="rounded-xl bg-white px-6 py-3 font-black text-blue-700 transition hover:bg-blue-50"
              >
                Sell Your Vehicle
              </Link>
              <Link
                href="/dealer"
                className="rounded-xl border border-white/30 px-6 py-3 font-black text-white transition hover:bg-white/10"
              >
                Dealer Portal
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* CONTACT OPTIONS */}
      <section className="px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {contactTopics.map((topic) => (
              <div
                key={topic.title}
                className="group rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="text-4xl">{topic.icon}</div>
                <h2 className="mt-5 text-xl font-black">
                  {topic.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {topic.description}
                </p>
                <Link
                  href={topic.href}
                  className="mt-6 inline-flex font-black text-blue-600 transition hover:text-blue-800"
                >
                  {topic.action} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* MAIN CONTACT AREA */}
      <section id="contact-form" className="px-6 pb-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-3">
          {/* CONTACT INFO */}
          <div className="rounded-3xl bg-slate-950 p-8 text-white">
            <span className="text-sm font-black uppercase tracking-widest text-blue-400">
              Contact NorthSky
            </span>
            <h2 className="mt-4 text-3xl font-black">
              How Can We Help?
            </h2>
            <p className="mt-4 leading-7 text-slate-400">
              Whether you are a vehicle seller, dealership, or business
              partner, NorthSky Auto is here to help.
            </p>
            <div className="mt-8 space-y-4">
              <div className="rounded-2xl bg-white/10 p-5">
                <div className="text-2xl">🚗</div>
                <h3 className="mt-3 font-black">
                  Vehicle Sellers
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Submit your vehicle and provide the information needed
                  to connect with potential buyers and dealerships.
                </p>
              </div>
              <div className="rounded-2xl bg-white/10 p-5">
                <div className="text-2xl">🏢</div>
                <h3 className="mt-3 font-black">
                  Dealerships
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Get assistance with your dealer account, membership,
                  and vehicle acquisition opportunities.
                </p>
              </div>
              <div className="rounded-2xl bg-white/10 p-5">
                <div className="text-2xl">🤝</div>
                <h3 className="mt-3 font-black">
                  Business Partners
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Contact us about partnerships, integrations, and
                  business opportunities.
                </p>
              </div>
            </div>
          </div>
          {/* FORM */}
          <div className="lg:col-span-2 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200 md:p-10">
            <div>
              <span className="text-sm font-black uppercase tracking-widest text-blue-600">
                Send a Message
              </span>
              <h2 className="mt-3 text-3xl font-black">
                Contact NorthSky Auto
              </h2>
              <p className="mt-3 text-slate-600">
                Complete the form below and provide a few details about
                your inquiry.
              </p>
            </div>
            <form className="mt-8 space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="text-sm font-black"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    required
                    className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="text-sm font-black"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                    className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="phone"
                    className="text-sm font-black"
                  >
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Optional"
                    className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>
                <div>
                  <label
                    htmlFor="topic"
                    className="text-sm font-black"
                  >
                    What can we help with?
                  </label>
                  <select
                    id="topic"
                    name="topic"
                    defaultValue=""
                    required
                    className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  >
                    <option value="" disabled>
                      Select an option
                    </option>
                    <option value="dealer-account">
                      Dealer Account
                    </option>
                    <option value="dealer-membership">
                      Dealer Membership
                    </option>
                    <option value="vehicle-lead">
                      Vehicle Lead
                    </option>
                    <option value="sell-vehicle">
                      Selling a Vehicle
                    </option>
                    <option value="partnership">
                      Dealer Partnership
                    </option>
                    <option value="general">
                      General Question
                    </option>
                    <option value="other">
                      Other
                    </option>
                  </select>
                </div>
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="text-sm font-black"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={7}
                  required
                  placeholder="Tell us how we can help..."
                  className="mt-2 w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-xl bg-blue-600 px-6 py-4 font-black text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/20"
              >
                Send Message →
              </button>
              <p className="text-center text-xs leading-5 text-slate-500">
                By submitting this form, you are requesting that
                NorthSky Auto contact you regarding your inquiry.
              </p>
            </form>
          </div>
        </div>
      </section>
      {/* SELLER CTA */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white md:p-12">
          <div className="grid gap-8 md:grid-cols-3 md:items-center">
            <div className="md:col-span-2">
              <span className="text-sm font-black uppercase tracking-widest text-blue-100">
                Selling a Vehicle?
              </span>
              <h2 className="mt-3 text-3xl font-black md:text-4xl">
                Turn Your Vehicle Into an Opportunity
              </h2>
              <p className="mt-4 max-w-2xl leading-7 text-blue-100">
                Submit your vehicle information to NorthSky Auto and
                connect with potential buyers and dealerships.
              </p>
            </div>
            <div>
              <Link
                href="/sell"
                className="block rounded-xl bg-white px-6 py-4 text-center font-black text-blue-700 transition hover:bg-blue-50"
              >
                Submit Your Vehicle →
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* DEALER CTA */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-7xl rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200 md:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <span className="text-sm font-black uppercase tracking-widest text-blue-600">
                Dealerships
              </span>
              <h2 className="mt-3 text-3xl font-black">
                Looking for More Inventory?
              </h2>
              <p className="mt-3 max-w-2xl leading-7 text-slate-600">
                Access the NorthSky Auto dealer marketplace and review
                vehicle acquisition opportunities.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/dealer"
                className="rounded-xl bg-slate-950 px-6 py-3 font-black text-white transition hover:bg-slate-800"
              >
                Dealer Portal
              </Link>
              <Link
                href="/buyers"
                className="rounded-xl bg-blue-600 px-6 py-3 font-black text-white transition hover:bg-blue-700"
              >
                View Plans
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* FOOTER NAV */}
      <footer className="border-t border-slate-200 bg-white px-6 py-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm font-semibold text-slate-500">
            <Link
              href="/"
              className="transition hover:text-blue-600"
            >
              NorthSky Auto
            </Link>
            <Link
              href="/sell"
              className="transition hover:text-blue-600"
            >
              Sell Your Vehicle
            </Link>
            <Link
              href="/dealer"
              className="transition hover:text-blue-600"
            >
              Dealer Portal
            </Link>
            <Link
              href="/buyers"
              className="transition hover:text-blue-600"
            >
              Dealer Plans
            </Link>
            <Link
              href="/contact"
              className="font-black text-blue-600"
            >
              Contact
            </Link>
          </div>
          <p className="mt-6 text-center text-sm text-slate-400">
            © 2026 NorthSky Auto. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}