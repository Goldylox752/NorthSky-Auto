import Link from "next/link";
import {
  TelegramTracking,
  SellerTrackingLink,
  DealerTrackingLink,
} from "./TelegramTracking";

export const metadata = {
  title: "NorthSky Auto | Canadian Vehicle Marketplace",
  description:
    "Discover vehicle opportunities, connect with Canadian dealerships, and submit your vehicle to NorthSky Auto.",
  alternates: {
    canonical: "https://northsky-auto.vercel.app/telegram",
  },
  openGraph: {
    title: "NorthSky Auto | Canadian Vehicle Marketplace",
    description:
      "Connect Canadian vehicle sellers with dealerships looking for inventory and acquisition opportunities.",
    url: "https://northsky-auto.vercel.app/telegram",
    siteName: "NorthSky Auto",
    type: "website",
  },
};

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
            🇨🇦 Canadian Vehicle Marketplace
          </div>

          <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight sm:text-6xl">
            Find Vehicle Opportunities.
            <span className="block text-sky-400">
              Connect With NorthSky Auto.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            NorthSky Auto connects Canadian vehicle sellers with dealerships
            looking for inventory and acquisition opportunities.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <SellerTrackingLink
              href={sellUrl}
              source={source}
              campaign={campaign}
              className="rounded-xl bg-sky-500 px-7 py-4 font-semibold text-white transition hover:bg-sky-400"
            >
              🚗 Sell Your Vehicle
            </SellerTrackingLink>

            <DealerTrackingLink
              href={buyersUrl}
              source={source}
              campaign={campaign}
              className="rounded-xl border border-white/20 bg-white/5 px-7 py-4 font-semibold text-white transition hover:bg-white/10"
            >
              🏪 Dealer Network
            </DealerTrackingLink>
          </div>
        </div>
      </section>

      {/* OPPORTUNITIES */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-sky-400">
            NORTHSKY AUTO
          </p>

          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Vehicle opportunities across Canada
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Discover vehicle opportunities, seller leads, dealer inventory,
            and automotive opportunities through NorthSky Auto.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: "🚗",
              title: "Vehicle Opportunities",
              text: "Discover vehicles submitted by Canadian sellers.",
            },
            {
              icon: "💰",
              title: "Cars Under $10K",
              text: "Find affordable vehicles and potential inventory opportunities.",
            },
            {
              icon: "🇨🇦",
              title: "Canadian Market",
              text: "A marketplace built around Canadian vehicle sellers and dealers.",
            },
            {
              icon: "🏪",
              title: "Dealer Inventory",
              text: "Connect dealerships with potential vehicle acquisition opportunities.",
            },
            {
              icon: "🔥",
              title: "Featured Opportunities",
              text: "Keep up with vehicles and opportunities worth watching.",
            },
            {
              icon: "📈",
              title: "Dealer Network",
              text: "Build your dealership's acquisition pipeline.",
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
              Submit your vehicle to NorthSky Auto and give dealerships an
              opportunity to discover your vehicle.
            </p>

            <p className="mt-4 leading-8 text-slate-400">
              Provide your vehicle details, mileage, condition, history,
              asking price, and contact information.
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
              What you'll provide
            </h3>

            <ul className="mt-6 space-y-4 text-slate-300">
              <li>✓ Vehicle information</li>
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
          <div className="order-2 rounded-3xl border border-sky-400/20 bg-sky-400/5 p-8 lg:order-1">
            <h3 className="text-xl font-semibold">
              Dealer benefits
            </h3>

            <ul className="mt-6 space-y-4 text-slate-300">
              <li>✓ Discover new vehicle opportunities</li>
              <li>✓ Find potential inventory</li>
              <li>✓ Review seller submissions</li>
              <li>✓ Manage opportunities through your dealer account</li>
              <li>✓ Grow your acquisition pipeline</li>
            </ul>
          </div>

          <div className="order-1 lg:order-2">
            <div className="text-4xl">🏪</div>

            <h2 className="mt-5 text-3xl font-bold sm:text-4xl">
              Are you a Canadian dealership?
            </h2>

            <p className="mt-5 leading-8 text-slate-300">
              NorthSky Auto helps dealerships discover vehicle acquisition
              opportunities from sellers across Canada.
            </p>

            <DealerTrackingLink
              href={buyersUrl}
              source={source}
              campaign={campaign}
              className="mt-8 inline-flex rounded-xl bg-sky-500 px-6 py-3 font-semibold transition hover:bg-sky-400"
            >
              Join the Dealer Network →
            </DealerTrackingLink>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">
              How NorthSky Auto works
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-slate-400">
              A simple connection between vehicle sellers and dealerships.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              {
                number: "01",
                title: "Submit",
                text: "Vehicle sellers submit their vehicle information to NorthSky Auto.",
              },
              {
                number: "02",
                title: "Connect",
                text: "Dealers discover vehicle acquisition opportunities through the platform.",
              },
              {
                number: "03",
                title: "Grow",
                text: "Dealers build their inventory pipeline while sellers reach potential buyers.",
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

      {/* TELEGRAM COMMUNITY */}
      <section className="mx-auto max-w-4xl px-6 py-20 text-center">
        <div className="text-5xl">📲</div>

        <h2 className="mt-6 text-3xl font-bold sm:text-4xl">
          Stay connected with NorthSky Auto
        </h2>

        <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-400">
          Follow the NorthSky Auto Telegram community for vehicle
          opportunities, automotive updates, dealer opportunities, and
          featured listings.
        </p>

        {/* Replace this username once your Telegram channel is created */}
        <a
          href="https://t.me/NorthSkyAutoCanada"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex rounded-xl bg-sky-500 px-7 py-4 font-semibold transition hover:bg-sky-400"
        >
          Join NorthSky Auto on Telegram →
        </a>
      </section>

      {/* FINAL CTA */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-5xl px-6 py-20 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Ready to get started?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Whether you're selling a vehicle or looking for inventory,
            NorthSky Auto connects the two sides of the market.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <SellerTrackingLink
              href={sellUrl}
              source={source}
              campaign={campaign}
              className="rounded-xl bg-sky-500 px-7 py-4 font-semibold transition hover:bg-sky-400"
            >
              Sell Your Vehicle
            </SellerTrackingLink>

            <DealerTrackingLink
              href={buyersUrl}
              source={source}
              campaign={campaign}
              className="rounded-xl border border-white/20 px-7 py-4 font-semibold transition hover:bg-white/10"
            >
              Join as a Dealer
            </DealerTrackingLink>
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