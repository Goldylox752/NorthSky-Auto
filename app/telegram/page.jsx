import Link from "next/link";

export const metadata = {
  title: "Telegram | NorthSky Auto",
  description:
    "Join NorthSky Auto on Telegram for vehicle opportunities, dealer updates, marketplace alerts, and announcements.",
};

const TELEGRAM_URL = "https://t.me/NorthSkyAutoCanada";

const features = [
  {
    icon: "🚗",
    title: "Vehicle Opportunities",
    description:
      "Stay informed about new vehicle opportunities entering the NorthSky Auto marketplace.",
  },
  {
    icon: "🏢",
    title: "Dealer Network",
    description:
      "Follow updates as NorthSky Auto expands its network of automotive dealers across Canada.",
  },
  {
    icon: "⚡",
    title: "Fast Updates",
    description:
      "Get important marketplace announcements and NorthSky Auto updates directly through Telegram.",
  },
];

function FeatureCard({ icon, title, description }) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-slate-50 p-8 transition hover:-translate-y-1 hover:bg-white hover:shadow-lg">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-3xl">
        {icon}
      </div>
      <h3 className="mt-6 text-xl font-bold text-slate-900">{title}</h3>
      <p className="mt-3 leading-relaxed text-slate-600">{description}</p>
    </div>
  );
}

function ConnectionRow({ icon, title, text }) {
  return (
    <div className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-xl">
        {icon}
      </div>
      <div>
        <h3 className="font-bold text-slate-900">{title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-slate-500">{text}</p>
      </div>
    </div>
  );
}

export default function TelegramPage() {
  return (
    <div className="bg-white text-slate-900">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-6 py-20 text-center sm:py-24 lg:py-28">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#229ED9] text-3xl shadow-xl shadow-cyan-500/20">
            ✈️
          </div>

          <p className="mt-8 text-xs font-bold uppercase tracking-[0.25em] text-blue-400">
            NorthSky Auto Network
          </p>

          <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            NorthSky Auto{" "}
            <span className="text-[#229ED9]">on Telegram</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
            Follow NorthSky Auto for vehicle opportunities, dealer updates,
            marketplace announcements, and important news from the network.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-[#229ED9] px-8 py-4 font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:bg-[#168dcc]"
            >
              Join NorthSky Auto on Telegram →
            </a>
            <Link
              href="/"
              className="rounded-xl border border-white/15 bg-white/5 px-8 py-4 font-semibold text-white transition hover:bg-white/10"
            >
              Explore NorthSky Auto
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-slate-400">
            <span>✓ Vehicle opportunities</span>
            <span>✓ Dealer updates</span>
            <span>✓ Marketplace announcements</span>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-600">
            Why Telegram
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Stay connected to the marketplace.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            Telegram gives the NorthSky Auto community a fast way to stay
            connected as new vehicle opportunities and dealer activity move
            through the marketplace.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </section>

      {/* ================= MARKETPLACE CONNECTION ================= */}
      <section className="border-y border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-blue-600">
                Connected Marketplace
              </p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                One network.
                <br />
                Multiple ways to connect.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-slate-600">
                NorthSky Auto connects vehicle sellers, automotive dealers, and
                marketplace infrastructure into one growing Canadian automotive
                network.
              </p>

              <div className="mt-8 space-y-4">
                <ConnectionRow
                  icon="🚗"
                  title="Vehicle Sellers"
                  text="Submit vehicles and create acquisition opportunities."
                />
                <ConnectionRow
                  icon="🏢"
                  title="Automotive Dealers"
                  text="Discover and manage potential inventory opportunities."
                />
                <ConnectionRow
                  icon="📲"
                  title="Telegram Network"
                  text="Stay connected to NorthSky Auto updates and announcements."
                />
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="rounded-2xl bg-slate-950 p-7 text-white">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#229ED9] text-xl">
                    ✈️
                  </div>
                  <div>
                    <p className="font-bold">NorthSky Auto 🇨🇦</p>
                    <p className="text-sm text-slate-400">@NorthSkyAutoCanada</p>
                  </div>
                </div>

                <div className="mt-7 rounded-2xl bg-white/5 p-5">
                  <p className="text-xs font-bold uppercase tracking-widest text-blue-400">
                    NorthSky Update
                  </p>
                  <p className="mt-3 text-lg font-bold">
                    New vehicle opportunities are entering the marketplace.
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">
                    Follow NorthSky Auto on Telegram for marketplace updates and
                    announcements.
                  </p>
                </div>

                <a
                  href={TELEGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 block rounded-xl bg-[#229ED9] px-5 py-4 text-center font-semibold transition hover:bg-[#168dcc]"
                >
                  Open Telegram Channel →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-gradient-to-r from-blue-700 to-blue-900">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center text-white sm:py-24">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-200">
            Join the Network
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Stay ahead of the next opportunity.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-blue-100">
            Join the NorthSky Auto Telegram channel and stay connected as the
            marketplace grows.
          </p>
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex rounded-xl bg-white px-8 py-4 font-semibold text-blue-700 shadow-md transition hover:bg-blue-50"
          >
            Join NorthSky Auto →
          </a>
        </div>
      </section>
    </div>
  );
}