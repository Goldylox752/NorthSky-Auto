import Link from "next/link";
export const metadata = {
  title: "Contact NorthSky Auto | Dealer Support & Vehicle Inquiries",
  description:
    "Contact NorthSky Auto for dealer support, vehicle submissions, memberships, partnerships, and general inquiries across Canada.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact NorthSky Auto",
    description:
      "Get in touch with NorthSky Auto about selling a vehicle, dealer memberships, vehicle opportunities, partnerships, and support.",
    type: "website",
  },
};
const contactTopics = [
  {
    icon: "🚗",
    title: "Sell a Vehicle",
    description:
      "Submit your car, truck, SUV, van, or commercial vehicle and provide the details dealers need to evaluate the opportunity.",
    href: "/sell",
    action: "Sell Your Vehicle",
  },
  {
    icon: "🏢",
    title: "Dealer Support",
    description:
      "Get help with your dealer account, marketplace access, memberships, or vehicle acquisition opportunities.",
    href: "/dealer",
    action: "Dealer Portal",
  },
  {
    icon: "💳",
    title: "Dealer Membership",
    description:
      "Review NorthSky Auto dealer plans and choose the membership that fits your dealership's sourcing needs.",
    href: "/buyers",
    action: "View Memberships",
  },
  {
    icon: "🤝",
    title: "Partnerships",
    description:
      "Interested in working with NorthSky Auto? Tell us about your dealership, business, integration, or partnership idea.",
    href: "#contact-form",
    action: "Start a Conversation",
  },
];
const faqs = [
  {
    question: "How do I sell my vehicle?",
    answer:
      "Complete the vehicle submission form with your vehicle details, mileage, condition, asking price, and contact information.",
    href: "/sell",
    label: "Submit a Vehicle",
  },
  {
    question: "Who is NorthSky Auto for?",
    answer:
      "NorthSky Auto is designed to connect vehicle sellers with participating dealerships and give dealers an organized vehicle acquisition marketplace.",
    href: "/about",
    label: "Learn About Us",
  },
  {
    question: "How do dealer memberships work?",
    answer:
      "Dealers can review available membership options and select the plan that best fits their vehicle sourcing requirements.",
    href: "/buyers",
    label: "View Dealer Plans",
  },
];
function ContactTopic({ topic }) {
  return (
    <article className="group flex h-full flex-col rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div
        aria-hidden="true"
        className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-3xl"
      >
        {topic.icon}
      </div>
      <h2 className="mt-5 text-xl font-black tracking-tight">
        {topic.title}
      </h2>
      <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">
        {topic.description}
      </p>
      <Link
        href={topic.href}
        className="mt-6 inline-flex items-center font-black text-blue-600 transition hover:text-blue-800"
      >
        {topic.action}
        <span
          aria-hidden="true"
          className="ml-2 transition-transform group-hover:translate-x-1"
        >
          →
        </span>
      </Link>
    </article>
  );
}
export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-900 text-white">
        <div
          aria-hidden="true"
          className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl"
        />
        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-24 lg:py-28">
          <div className="max-w-4xl">
            <Link
              href="/"
              className="inline-flex rounded-full bg-blue-500/10 px-4 py-2 text-xs font-black uppercase tracking-widest text-blue-300 ring-1 ring-blue-400/20 transition hover:bg-blue-500/20"
            >
              NorthSky Auto
            </Link>
            <h1 className="mt-7 text-5xl font-black tracking-tight sm:text-6xl md:text-7xl">
              Let's Get
              <span className="block text-blue-400">
                You Moving.
              </span>
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 md:text-xl">
              Questions about selling a vehicle, dealer memberships,
              vehicle opportunities, or partnerships? Send NorthSky Auto
              a message and tell us how we can help.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/sell"
                className="rounded-xl bg-blue-600 px-7 py-4 font-black text-white shadow-lg shadow-blue-950/30 transition hover:bg-blue-500"
              >
                Sell My Vehicle →
              </Link>
              <Link
                href="/buyers"
                className="rounded-xl border border-white/20 bg-white/5 px-7 py-4 font-black text-white backdrop-blur transition hover:bg-white hover:text-slate-950"
              >
                I'm a Dealer
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-slate-300">
              <span>✓ Canadian-focused</span>
              <span>✓ Seller support</span>
              <span>✓ Dealer support</span>
              <span>✓ Business inquiries</span>
            </div>
          </div>
        </div>
      </section>
      {/* CONTACT OPTIONS */}
      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-widest text-blue-600">
              How Can We Help?
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">
              Choose the Right Place to Start
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Whether you are selling a vehicle, looking for inventory,
              managing a dealership account, or exploring a partnership,
              start here.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {contactTopics.map((topic) => (
              <ContactTopic
                key={topic.title}
                topic={topic}
              />
            ))}
          </div>
        </div>
      </section>
      {/* CONTACT FORM */}
      <section
        id="contact-form"
        className="scroll-mt-20 px-6 pb-20"
      >
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-3">
          {/* INFORMATION PANEL */}
          <aside className="rounded-3xl bg-slate-950 p-8 text-white shadow-xl md:p-10">
            <p className="text-sm font-black uppercase tracking-widest text-blue-400">
              Contact NorthSky
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-tight">
              We're Here to Help
            </h2>
            <p className="mt-4 leading-7 text-slate-400">
              Tell us what you need help with and provide enough detail
              for our team to understand your inquiry.
            </p>
            <div className="mt-8 space-y-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div
                  aria-hidden="true"
                  className="text-2xl"
                >
                  🚗
                </div>
                <h3 className="mt-3 font-black">
                  Vehicle Sellers
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Looking to sell? The fastest way to get started is
                  through the NorthSky Auto vehicle submission form.
                </p>
                <Link
                  href="/sell"
                  className="mt-4 inline-flex text-sm font-black text-blue-400 transition hover:text-blue-300"
                >
                  Submit Vehicle →
                </Link>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div
                  aria-hidden="true"
                  className="text-2xl"
                >
                  🏢
                </div>
                <h3 className="mt-3 font-black">
                  Dealerships
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Need help with your dealer account, membership, or
                  vehicle sourcing?
                </p>
                <Link
                  href="/dealer"
                  className="mt-4 inline-flex text-sm font-black text-blue-400 transition hover:text-blue-300"
                >
                  Open Dealer Portal →
                </Link>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div
                  aria-hidden="true"
                  className="text-2xl"
                >
                  🤝
                </div>
                <h3 className="mt-3 font-black">
                  Business Partners
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Contact us about partnerships, integrations, or other
                  business opportunities.
                </p>
                <a
                  href="#contact-form"
                  className="mt-4 inline-flex text-sm font-black text-blue-400 transition hover:text-blue-300"
                >
                  Contact Us →
                </a>
              </div>
            </div>
          </aside>
          {/* FORM */}
          <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200 md:p-10 lg:col-span-2">
            <div className="max-w-2xl">
              <p className="text-sm font-black uppercase tracking-widest text-blue-600">
                Send a Message
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">
                Contact NorthSky Auto
              </h2>
              <p className="mt-4 leading-7 text-slate-600">
                Complete the form below with your question or request.
                Please do not include passwords, payment information,
                vehicle VINs, or other sensitive information.
              </p>
            </div>
            <form
              action="/api/contact"
              method="POST"
              className="relative mt-8 space-y-6"
            >
              {/* HONEYPOT */}
              <div
                aria-hidden="true"
                className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden"
              >
                <label htmlFor="website">
                  Website
                </label>
                <input
                  id="website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>
              {/* NAME / EMAIL */}
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="text-sm font-black text-slate-800"
                  >
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    autoComplete="name"
                    maxLength={150}
                    required
                    className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="text-sm font-black text-slate-800"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    maxLength={254}
                    required
                    className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>
              </div>
              {/* PHONE / TOPIC */}
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="phone"
                    className="text-sm font-black text-slate-800"
                  >
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Optional"
                    autoComplete="tel"
                    maxLength={50}
                    className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>
                <div>
                  <label
                    htmlFor="topic"
                    className="text-sm font-black text-slate-800"
                  >
                    Inquiry Type
                  </label>
                  <select
                    id="topic"
                    name="topic"
                    defaultValue=""
                    required
                    className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
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
                    <option value="vehicle-opportunity">
                      Vehicle Opportunity
                    </option>
                    <option value="sell-vehicle">
                      Selling a Vehicle
                    </option>
                    <option value="partnership">
                      Partnership
                    </option>
                    <option value="technical-support">
                      Technical Support
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
              {/* MESSAGE */}
              <div>
                <label
                  htmlFor="message"
                  className="text-sm font-black text-slate-800"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={7}
                  maxLength={5000}
                  required
                  placeholder="Tell us what you need help with..."
                  className="mt-2 w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />
                <p className="mt-2 text-xs text-slate-400">
                  Maximum 5,000 characters.
                </p>
              </div>
              <button
                type="submit"
                className="w-full rounded-xl bg-blue-600 px-6 py-4 text-base font-black text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/20"
              >
                Send Message →
              </button>
              <p className="text-center text-xs leading-5 text-slate-500">
                By submitting this form, you are requesting that NorthSky
                Auto contact you regarding your inquiry.
              </p>
            </form>
          </div>
        </div>
      </section>
      {/* FAQ */}
      <section className="bg-white px-6 py-20 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-widest text-blue-600">
              Frequently Asked Questions
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">
              Before You Contact Us
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              You may find the answer you need in one of these NorthSky
              Auto resources.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {faqs.map((faq) => (
              <article
                key={faq.question}
                className="rounded-3xl bg-slate-50 p-7 ring-1 ring-slate-200"
              >
                <h3 className="text-lg font-black">
                  {faq.question}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {faq.answer}
                </p>
                <Link
                  href={faq.href}
                  className="mt-5 inline-flex text-sm font-black text-blue-600 transition hover:text-blue-800"
                >
                  {faq.label} →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      {/* SELLER CTA */}
      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white shadow-xl md:p-12">
          <div className="grid gap-8 md:grid-cols-3 md:items-center">
            <div className="md:col-span-2">
              <p className="text-sm font-black uppercase tracking-widest text-blue-100">
                Ready to Sell?
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">
                Submit Your Vehicle to NorthSky Auto
              </h2>
              <p className="mt-4 max-w-2xl leading-7 text-blue-100">
                Provide your vehicle details and create a potential
                acquisition opportunity for participating dealerships.
              </p>
            </div>
            <div>
              <Link
                href="/sell"
                className="block rounded-xl bg-white px-6 py-4 text-center font-black text-blue-700 shadow-lg transition hover:bg-blue-50"
              >
                Submit My Vehicle →
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* DEALER CTA */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-7xl rounded-3xl bg-slate-950 p-8 text-white shadow-xl md:p-10">
          <div className="flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-widest text-blue-400">
                For Dealerships
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight">
                Looking for More Inventory?
              </h2>
              <p className="mt-3 max-w-2xl leading-7 text-slate-400">
                Explore NorthSky Auto dealer memberships and access
                vehicle acquisition opportunities.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/dealer"
                className="rounded-xl bg-white px-6 py-3 font-black text-slate-950 transition hover:bg-slate-100"
              >
                Dealer Portal
              </Link>
              <Link
                href="/buyers"
                className="rounded-xl bg-blue-600 px-6 py-3 font-black text-white transition hover:bg-blue-500"
              >
                View Plans
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white px-6 py-10">
        <div className="mx-auto max-w-7xl">
          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm font-semibold text-slate-500"
          >
            <Link href="/" className="transition hover:text-blue-600">
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
              href="/about"
              className="transition hover:text-blue-600"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="font-black text-blue-600"
            >
              Contact
            </Link>
            <Link
              href="/privacy"
              className="transition hover:text-blue-600"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="transition hover:text-blue-600"
            >
              Terms
            </Link>
          </nav>
          <p className="mt-6 text-center text-sm text-slate-400">
            © 2026 NorthSky Auto. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}