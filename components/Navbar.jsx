import Link from "next/link";

const navLinks = [
  { href: "/inventory", label: "Browse Vehicles" },
  { href: "/sell", label: "Sell Your Vehicle" },
  { href: "/dealer", label: "For Dealers" },
  { href: "/pricing", label: "Pricing" },
  { href: "/how-it-works", label: "How It Works" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-1.5 text-xl font-extrabold tracking-tight text-slate-900"
        >
          NorthSky
          <span className="text-blue-600">Auto</span>
          <span className="text-base" aria-hidden="true">
            🇨🇦
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-slate-600 transition hover:text-blue-600"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="hidden text-sm font-semibold text-slate-600 transition hover:text-blue-600 sm:inline-block"
          >
            Sign In
          </Link>

          <Link
            href="/sell"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-500"
          >
            Get Started →
          </Link>
        </div>
      </div>
    </header>
  );
}