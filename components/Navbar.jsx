import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        <Link
          href="/"
          className="text-2xl font-bold text-blue-600"
        >
          NorthSky Auto
        </Link>

        <nav className="hidden md:flex items-center gap-8">

          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>

          <Link href="/sell" className="hover:text-blue-600">
            Sell
          </Link>

          <Link href="/buyers" className="hover:text-blue-600">
            Dealers
          </Link>

          <Link href="/pricing" className="hover:text-blue-600">
            Pricing
          </Link>

          <Link href="/about" className="hover:text-blue-600">
            About
          </Link>

          <Link href="/contact" className="hover:text-blue-600">
            Contact
          </Link>

        </nav>

        <Link
          href="/sell"
          className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
        >
          Sell My Vehicle
        </Link>

      </div>
    </header>
  );
}