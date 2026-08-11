import Link from "next/link";
const navigation = [
  {
    name: "Dashboard",
    href: "/dealer/dashboard",
    icon: "📊",
  },
  {
    name: "Vehicle Leads",
    href: "/dealer/leads",
    icon: "🚗",
  },
  {
    name: "Saved Vehicles",
    href: "/dealer/saved",
    icon: "⭐",
  },
  {
    name: "Analytics",
    href: "/dealer/analytics",
    icon: "📈",
  },
  {
    name: "Subscription",
    href: "/dealer/subscriptions",
    icon: "💳",
  },
  {
    name: "Profile",
    href: "/dealer/profile",
    icon: "🏢",
  },
  {
    name: "Settings",
    href: "/dealer/settings",
    icon: "⚙️",
  },
];
export default function DealerLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* TOP HEADER */}
      <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950 text-white">
        <div className="mx-auto flex h-20 max-w-[1600px] items-center justify-between px-4 sm:px-6">
          <Link
            href="/dealer/dashboard"
            className="group flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-xl font-black shadow-lg shadow-blue-900/30">
              N
            </div>
            <div>
              <div className="text-lg font-black tracking-tight">
                NorthSky Auto
              </div>
              <div className="text-xs font-semibold text-slate-400">
                Dealer Portal
              </div>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="hidden rounded-lg px-4 py-2 text-sm font-bold text-slate-300 transition hover:bg-white/10 hover:text-white sm:block"
            >
              Main Site
            </Link>
            <Link
              href="/dealer/profile"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-black text-white transition hover:bg-blue-500"
              aria-label="Dealer profile"
            >
              D
            </Link>
          </div>
        </div>
      </header>
      {/* MOBILE NAV */}
      <div className="border-b border-slate-200 bg-white px-4 py-3 md:hidden">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex shrink-0 items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-blue-50 hover:text-blue-700"
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
      <div className="mx-auto flex max-w-[1600px]">
        {/* SIDEBAR */}
        <aside className="hidden min-h-[calc(100vh-80px)] w-64 shrink-0 border-r border-slate-200 bg-white md:block">
          <div className="sticky top-20 p-5">
            <div className="mb-5 px-3">
              <p className="text-xs font-black uppercase tracking-wider text-slate-400">
                Dealer Portal
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-500">
                Manage your dealership
              </p>
            </div>
            <nav className="space-y-1.5">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-center gap-3 rounded-xl px-4 py-3 font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-700"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-base transition group-hover:bg-blue-100">
                    {item.icon}
                  </span>
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>
            <div className="my-6 h-px bg-slate-200" />
            {/* SELLER CTA */}
            <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 p-5 text-white">
              <div className="text-2xl">🚗</div>
              <h3 className="mt-3 font-black">
                Looking for vehicles?
              </h3>
              <p className="mt-2 text-sm leading-5 text-blue-100">
                Browse available vehicle acquisition opportunities.
              </p>
              <Link
                href="/dealer/leads"
                className="mt-4 flex justify-center rounded-lg bg-white px-4 py-2.5 text-sm font-black text-blue-700 transition hover:bg-blue-50"
              >
                View Leads →
              </Link>
            </div>
            {/* MAIN SITE */}
            <Link
              href="/"
              className="mt-5 flex items-center justify-center rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
            >
              ← Back to NorthSky Auto
            </Link>
          </div>
        </aside>
        {/* MAIN CONTENT */}
        <main className="min-w-0 flex-1">
          <div className="min-h-[calc(100vh-80px)] p-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}