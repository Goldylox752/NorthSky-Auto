import Link from "next/link";
import {
  TelegramTracking,
  SellerTrackingLink,
  DealerTrackingLink,
} from "./TelegramTracking";

export const metadata = {
  title: "NorthSky Auto on Telegram | Vehicle Opportunities & Dealer Network",
  description:
    "Follow NorthSky Auto on Telegram for Canadian vehicle opportunities, automotive updates, featured vehicles, and dealer acquisition opportunities.",
  alternates: {
    canonical: "https://northsky-auto.vercel.app/telegram",
  },
  openGraph: {
    title: "NorthSky Auto on Telegram | Canadian Vehicle Opportunities",
    description:
      "Follow NorthSky Auto on Telegram for vehicle opportunities, automotive updates, featured vehicles, and dealer opportunities across Canada.",
    url: "https://northsky-auto.vercel.app/telegram",
    siteName: "NorthSky Auto",
    type: "website",
  },
};

const TELEGRAM_URL = "https://t.me/NorthSkyAutoCanada";

export default async function TelegramPage({ searchParams }) {
  const params = await searchParams;

  const source =
    typeof params?.source === "string" && params.source.trim()
      ? params.source.trim().slice(0, 100)
      : "telegram";

  const campaign =
    typeof params?.campaign === "string" && params.campaign.trim()
      ? params.campaign.trim().slice(0, 150)
      : "telegram-general";

  const trackingParams = new URLSearchParams({
    source,
    campaign,
  }).toString();

  const sellUrl = `/sell?${trackingParams}`;
  const buyersUrl = `/buyers?${trackingParams}`;

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <TelegramTracking
        source={source}
        campaign={campaign}
      />

      {/* HERO */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20 text-center sm:py-28">
          <div className="mb-6 inline-flex items-center rounded-full border border-sky-400/30 bg-sky-400/10 px-4 py-2 text-sm font-medium text-sky-300">
            📲 NorthSky Auto on Telegram
          </div>

          <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight sm:text-6xl">
            Stay Connected to
            <span className="block text-sky-400">
              NorthSky Auto
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Follow NorthSky Auto on Telegram for Canadian vehicle
            opportunities, featured vehicles, automotive updates, and
            dealership acquisition opportunities.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-sky-500 px-7 py-4 font-semibold text-white transition hover:bg-sky-400"
            >
              📲 Join Telegram
            </a>

            <SellerTrackingLink
              href={sellUrl}
              source={source}
              campaign={campaign}
              className="rounded-xl border border-white/20 bg-white/5 px-7 py-4 font-semibold text-white transition hover:bg-white/10"
            >
              🚗 Sell Your Vehicle
            </SellerTrackingLink>
          </div>

          <p className="mt-5 text-sm text-slate-500">
            Follow the channel for updates and return to NorthSky Auto when
            you are ready to take action.
          </p>
        </div>
      </section>

      {/* WHAT YOU'LL FIND */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-sky-400">
            NORTHSKY AUTO TELEGRAM
          </p>

          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            What you can follow
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Our Telegram community gives sellers and dealerships another
            way to stay connected with NorthSky Auto.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: "🚗",
              title: "Vehicle Opportunities",
              text: "Keep an eye on vehicle opportunities submitted through NorthSky Auto.",
            },
            {
              icon: "🔥",
              title: "Featured Vehicles",
              text: "Discover selected vehicle opportunities and automotive content.",
            },
            {
              icon: "🏪",
              title: "Dealer Opportunities",
              text: "Stay connected to information relevant to dealerships and vehicle acquisition.",
            },
            {
              icon: "🇨🇦",
              title: "Canadian Market",
              text: "Follow a marketplace focused on Canadian vehicle sellers and dealers.",
            },
            {
              icon: "📈",
              title: "Acquisition Updates",
              text: "Stay informed about NorthSky Auto and its growing dealer network.",
            },
            {
              icon: "📲",
              title: "Direct Access",
              text: "Use Telegram to stay connected and return to NorthSky Auto when an opportunity interests you.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition hover:border-sky-400/30 hover:bg-white/[0.05]"
            >
              <div className="text-3xl">{item.icon}</div>

              <h3 className="mt-5 text-xl font-semibold">
                {item.title}
              </h3>

              <p className="mt-3 leading-7 text-slate-400">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SELLERS */}
      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="text-4xl">🚗</div>

            <h2 className="mt-5 text-3xl font-bold sm:text-4xl">
              Have a vehicle to sell?
            </h2>

            <p className="mt-5 leading-8 text-slate-300">
              You can submit your vehicle directly through NorthSky Auto.
              Provide the details dealerships need to evaluate your vehicle
              and potential acquisition opportunity.
            </p>

            <p className="mt-4 leading-8 text-slate-400">
              Submit information such as the year, make, model, mileage,
              condition, history, asking price, and contact details.
            </p>

            <SellerTrackingLink
              href={sellUrl}
              source={source}
              campaign={campaign}
              className="mt-8 inline-flex rounded-xl bg-sky-500 px-6 py-3 font-semibold transition hover:bg-sky-400"
            >
              Submit Your Vehicle →
            </SellerTrackingLink>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900 p-8">
            <h3 className="text-xl font-semibold">
              Vehicle information
            </h3>

            <ul className="mt-6 space-y-4 text-slate-300">
              <li>✓ Year, make and model</li>
              <li>✓ Mileage and condition</li>
              <li>✓ Vehicle history</li>
              <li>✓ Asking price</li>
              <li>✓ Contact information</li>
            </ul>
          </div>
        </div>
      </section>

      {/* DEALERS */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="rounded-3xl border border-sky-400/20 bg-sky-400/5 p-8">
            <h3 className="text-xl font-semibold">
              Dealer network benefits
            </h3>

            <ul className="mt-6 space-y-4 text-slate-300">
              <li>✓ Discover potential vehicle opportunities</li>
              <li>✓ Review seller submissions</li>
              <li>✓ Find potential inventory</li>
              <li>✓ Manage opportunities through your dealer account</li>
              <li>✓ Build a stronger acquisition pipeline</li>
            </ul>
          </div>

          <div>
            <div className="text-4xl">🏪</div>

            <h2 className="mt-5 text-3xl font-bold sm:text-4xl">
              Are you a Canadian dealership?
            </h2>

            <p className="mt-5 leading-8 text-slate-300">
              NorthSky Auto helps dealerships discover vehicle acquisition
              opportunities from sellers across Canada.
            </p>

            <p className="mt-4 leading-8 text-slate-400">
              Use the dealer network to explore opportunities and build your
              dealership's vehicle acquisition pipeline.
            </p>

            <DealerTrackingLink
              href={buyersUrl}
              source={source}
              campaign={campaign}
              className="mt-8 inline-flex rounded-xl bg-sky-500 px-6 py-3 font-semibold transition hover:bg-sky-400"
            >
              Explore Dealer Network →
            </DealerTrackingLink>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-sky-400">
              HOW IT WORKS
            </p>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              From Telegram to NorthSky Auto
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-slate-400">
              Telegram keeps you connected. NorthSky Auto is where sellers
              submit vehicles and dealers explore opportunities.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              {
                number: "01",
                title: "Follow",
                text: "Join the NorthSky Auto Telegram community and stay connected to updates.",
              },
              {
                number: "02",
                title: "Discover",
                text: "Explore vehicle and dealership opportunities through NorthSky Auto.",
              },
              {
                number: "03",
                title: "Take Action",
                text: "Submit a vehicle or access the dealer network when an opportunity fits your needs.",
              },
            ].map((step) => (
              <div key={step.number} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sky-500 text-lg font-bold">
                  {step.number}
                </div>

                <h3 className="mt-5 text-xl font-semibold">
                  {step.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-400">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TELEGRAM CTA */}
      <section className="mx-auto max-w-4xl px-6 py-20 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-sky-400/10 text-4xl">
          📲
        </div>

        <h2 className="mt-7 text-3xl font-bold sm:text-4xl">
          Join NorthSky Auto on Telegram
        </h2>

        <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-400">
          Follow the NorthSky Auto Telegram community for vehicle
          opportunities, featured vehicles, automotive updates, and dealer
          opportunities.
        </p>

        <a
          href={TELEGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex rounded-xl bg-sky-500 px-7 py-4 font-semibold transition hover:bg-sky-400"
        >
          Open NorthSky Auto Telegram →
        </a>

        <p className="mt-4 text-xs text-slate-600">
          Telegram is operated separately from the NorthSky Auto website.
        </p>
      </section>

      {/* FINAL CTA */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-5xl px-6 py-20 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Ready to connect with NorthSky Auto?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Whether you're selling a vehicle or looking for inventory,
            NorthSky Auto connects sellers and dealerships through one
            marketplace.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <SellerTrackingLink
              href={sellUrl}
              source={source}
              campaign={campaign}
              className="rounded-xl bg-sky-500 px-7 py-4 font-semibold transition hover:bg-sky-400"
            >
              🚗 Sell Your Vehicle
            </SellerTrackingLink>

            <DealerTrackingLink
              href={buyersUrl}
              source={source}
              campaign={campaign}
              className="rounded-xl border border-white/20 px-7 py-4 font-semibold transition hover:bg-white/10"
            >
              🏪 Dealer Network
            </DealerTrackingLink>

            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-white/20 px-7 py-4 font-semibold transition hover:bg-white/10"
            >
              📲 Telegram
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-8">
        <div className="mx-auto max-w-6xl px-6 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} NorthSky Auto. Canadian Vehicle
          Marketplace.
        </div>
      </footer>
    </main>
  );
}