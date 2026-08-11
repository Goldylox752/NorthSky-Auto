import Link from "next/link";
export const metadata = {
  title: "Contact NorthSky Auto | Get in Touch",
  description:
    "Contact NorthSky Auto with questions about selling a vehicle, dealership access, vehicle opportunities, or our Canadian automotive marketplace.",
  alternates: {
    canonical: "https://northsky-auto.vercel.app/contact",
  },
  openGraph: {
    title: "Contact NorthSky Auto | Get in Touch",
    description:
      "Get in touch with NorthSky Auto about vehicle submissions, dealership access, and marketplace opportunities.",
    url: "https://northsky-auto.vercel.app/contact",
    siteName: "NorthSky Auto",
    type: "website",
  },
};
export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-300">
              Contact NorthSky Auto
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
              Let’s talk about your vehicle or dealership needs.
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              Have a question about selling a vehicle, joining the dealership
              marketplace, or how NorthSky Auto works? Get in touch with our
              team.
            </p>
          </div>
        </div>
      </section>
      {/* Contact Content */}
      <section className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-3">
          {/* Contact Info */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold">
              How can we help?
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              Whether you're a vehicle seller, dealership, or automotive
              business, we're here to help answer your questions.
            </p>
            <div className="mt-8 space-y-6">
              <div>
                <h3 className="font-semibold text-slate-900">
                  Vehicle Sellers
                </h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Questions about submitting your vehicle or how the selling
                  process works?
                </p>
                <Link
                  href="/sell"
                  className="mt-2 inline-block text-sm font-semibold text-blue-600 hover:text-blue-500"
                >
                  Submit a Vehicle →
                </Link>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">
                  Dealerships
                </h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Interested in accessing vehicle opportunities through
                  NorthSky Auto?
                </p>
                <Link
                  href="/buyers"
                  className="mt-2 inline-block text-sm font-semibold text-blue-600 hover:text-blue-500"
                >
                  Dealer Information →
                </Link>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">
                  General Questions
                </h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  For general questions, partnerships, or support, use the
                  contact form.
                </p>
              </div>
            </div>
          </div>
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold">
                Send us a message
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Fill out the form below and provide as much detail as possible.
              </p>
              <form className="mt-8 space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-slate-700"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Your name"
                      className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-slate-700"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-semibold text-slate-700"
                  >
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Optional"
                    className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
                <div>
                  <label
                    htmlFor="reason"
                    className="block text-sm font-semibold text-slate-700"
                  >
                    What can we help with?
                  </label>
                  <select
                    id="reason"
                    name="reason"
                    defaultValue=""
                    className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="" disabled>
                      Select an option
                    </option>
                    <option value="selling">
                      Selling a vehicle
                    </option>
                    <option value="dealer">
                      Dealership access
                    </option>
                    <option value="vehicle">
                      Vehicle opportunity
                    </option>
                    <option value="partnership">
                      Partnership
                    </option>
                    <option value="general">
                      General question
                    </option>
                    <option value="support">
                      Technical support
                    </option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-slate-700"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    placeholder="How can we help?"
                    className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500 sm:w-auto"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      {/* CTA */}
      <section className="bg-slate-50 border-t border-slate-200">
        <div className="mx-auto max-w-6xl px-6 py-16 text-center lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight">
            Looking to sell a vehicle?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Skip the contact form and submit your vehicle directly to
            NorthSky Auto.
          </p>
          <div className="mt-7">
            <Link
              href="/sell"
              className="inline-flex rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500"
            >
              Submit Your Vehicle
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}