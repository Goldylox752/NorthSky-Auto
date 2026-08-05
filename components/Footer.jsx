import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-6 py-16">

        <div className="grid gap-10 md:grid-cols-4">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-white">
              NorthSky Auto
            </h2>

            <p className="mt-4 text-sm leading-7">
              Canada's vehicle marketplace connecting private sellers
              with trusted dealerships and qualified buyers.
            </p>
          </div>

          {/* Sell */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              Sell
            </h3>

            <ul className="space-y-3">
              <li>
                <Link href="/sell" className="hover:text-white">
                  Sell My Vehicle
                </Link>
              </li>

              <li>
                <Link href="/pricing" className="hover:text-white">
                  Pricing
                </Link>
              </li>

              <li>
                <Link href="/buyers" className="hover:text-white">
                  Dealer Network
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              Company
            </h3>

            <ul className="space-y-3">
              <li>
                <Link href="/about" className="hover:text-white">
                  About
                </Link>
              </li>

              <li>
                <Link href="/contact" className="hover:text-white">
                  Contact
                </Link>
              </li>

              <li>
                <Link href="/faq" className="hover:text-white">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              Legal
            </h3>

            <ul className="space-y-3">
              <li>
                <Link href="/privacy" className="hover:text-white">
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link href="/terms" className="hover:text-white">
                  Terms of Service
                </Link>
              </li>

              <li>
                <Link href="/cookies" className="hover:text-white">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* CTA */}
        <div className="mt-16 rounded-2xl bg-blue-600 p-8 text-center">

          <h2 className="text-3xl font-bold text-white">
            Ready to Sell Your Vehicle?
          </h2>

          <p className="mt-3 text-blue-100">
            Submit your vehicle today and start receiving offers from
            verified dealerships across Canada.
          </p>

          <Link
            href="/sell"
            className="mt-6 inline-block rounded-xl bg-white px-8 py-3 font-semibold text-blue-600 transition hover:bg-gray-100"
          >
            Sell My Vehicle
          </Link>

        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-slate-700 pt-8 text-center text-sm text-gray-400">

          <p>
            © {year} NorthSky Auto. All rights reserved.
          </p>

          <p className="mt-2">
            Built for Canadian vehicle buyers, sellers, and dealerships.
          </p>

        </div>

      </div>
    </footer>
  );
}