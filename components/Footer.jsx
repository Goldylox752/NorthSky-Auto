import Link from "next/link";

const TELEGRAM_URL = "https://t.me/NorthSkyAutoCanada";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Main grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="text-2xl font-extrabold tracking-tight text-white"
            >
              NorthSky <span className="text-blue-400">Auto</span>{" "}
              <span className="text-base">🇨🇦</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
              Connecting Canadian vehicle sellers with automotive dealers
              through a simpler vehicle marketplace.
            </p>
            <Link
              href="/sell"
              className="mt-5 inline-block text-sm font-semibold text-blue-300 transition hover:text-white"
            >
              Sell Your Vehicle →
            </Link>
          </div>

          {/* Marketplace */}
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
              Marketplace
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/inventory" className="transition hover:text-white">
                  Browse Vehicles
                </Link>
              </li>
              <li>
                <Link href="/sell" className="transition hover:text-white">
                  Sell Your Vehicle
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="transition hover:text-white">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="transition hover:text-white">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Dealers */}
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
              Dealers
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/dealer" className="transition hover:text-white">
                  Dealer Portal
                </Link>
              </li>
              <li>
                <Link href="/dealer/register" className="transition hover:text-white">
                  Become a Dealer
                </Link>
              </li>
              <li>
                <Link href="/dealer-application" className="transition hover:text-white">
                  Dealer Application
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="transition hover:text-white">
                  Dealer Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
              Company
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about" className="transition hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/telegram" className="transition hover:text-white">
                  Telegram
                </Link>
              </li>
              <li>
                <a
                  href={TELEGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-white"
                >
                  Join Channel ↗
                </a>
              </li>
              <li>
                <Link href="/privacy" className="transition hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="transition hover:text-white">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-slate-800 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center">
          <span>© {year} NorthSky Auto. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[#229ED9] transition hover:text-[#4db8e8]"
            >
              Telegram
            </a>
            <span>🇨🇦 Built for Canada</span>
          </div>
        </div>
      </div>
    </footer>
  );
}