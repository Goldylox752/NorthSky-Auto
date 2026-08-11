import Link from "next/link";
export const metadata = {
  title: "Dealer Settings | NorthSky Auto",
  description:
    "Manage your NorthSky Auto dealer account, dealership profile, subscription, marketplace access, and account settings.",
};
const settingsSections = [
  {
    title: "Dealer Profile",
    description:
      "Manage your dealership name, contact information, website, and business location.",
    href: "/dealer/profile",
    icon: "🏢",
    action: "Manage Profile",
  },
  {
    title: "Subscription",
    description:
      "View your current dealer membership, billing status, and available plans.",
    href: "/dealer/subscriptions",
    icon: "💳",
    action: "Manage Subscription",
  },
  {
    title: "Vehicle Leads",
    description:
      "Browse available vehicle acquisition opportunities from NorthSky Auto sellers.",
    href: "/dealer/leads",
    icon: "🚗",
    action: "View Leads",
  },
  {
    title: "Saved Vehicles",
    description:
      "Review vehicle opportunities you have saved for later.",
    href: "/dealer/saved",
    icon: "⭐",
    action: "View Saved",
  },
  {
    title: "Analytics",
    description:
      "Review your dealership's vehicle acquisition activity and lead performance.",
    href: "/dealer/analytics",
    icon: "📊",
    action: "View Analytics",
  },
];
export default function DealerSettingsPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* HEADER */}
      <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-800 px-6 py-16 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="inline-flex rounded-full bg-blue-500/20 px-4 py-2 text-xs font-black tracking-wide text-blue-300">
                NORTHSKY AUTO DEALER PORTAL
              </span>
              <h1 className="mt-5 text-4xl font-black md:text-5xl">
                Dealer Settings
              </h1>
              <p className="mt-4 max-w-2xl text-slate-300">
                Manage your dealership account, subscription, marketplace
                access, and dealer preferences.
              </p>
            </div>
            <Link
              href="/dealer/dashboard"
              className="inline-flex rounded-xl border border-white/20 px-6 py-3 font-black text-white transition hover:bg-white/10"
            >
              ← Dashboard
            </Link>
          </div>
        </div>
      </section>
      {/* SETTINGS */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-6xl space-y-8">
          {/* ACCOUNT SETTINGS */}
          <section className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
            <div>
              <span className="text-sm font-black uppercase tracking-wide text-blue-600">
                Account Management
              </span>
              <h2 className="mt-2 text-2xl font-black">
                Manage Your Dealer Account
              </h2>
              <p className="mt-2 max-w-2xl text-slate-600">
                Access the tools you need to manage your dealership and
                NorthSky Auto membership.
              </p>
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {settingsSections.slice(0, 2).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group rounded-2xl border border-slate-200 p-6 transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg"
                >
                  <div className="flex items-start justify-between">
                    <div className="text-4xl">{item.icon}</div>
                    <span className="text-xl text-slate-400 transition group-hover:text-blue-600">
                      →
                    </span>
                  </div>
                  <h3 className="mt-5 text-xl font-black">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {item.description}
                  </p>
                  <span className="mt-5 inline-flex rounded-lg bg-blue-50 px-4 py-2 text-sm font-black text-blue-700">
                    {item.action}
                  </span>
                </Link>
              ))}
            </div>
          </section>
          {/* MARKETPLACE */}
          <section className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
            <div>
              <span className="text-sm font-black uppercase tracking-wide text-blue-600">
                Marketplace
              </span>
              <h2 className="mt-2 text-2xl font-black">
                Vehicle Acquisition
              </h2>
              <p className="mt-2 max-w-2xl text-slate-600">
                Access vehicle opportunities and manage your dealership
                acquisition activity.
              </p>
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {settingsSections.slice(2).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group rounded-2xl border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-1 hover:bg-blue-50 hover:ring-1 hover:ring-blue-200"
                >
                  <div className="flex items-start justify-between">
                    <div className="text-3xl">{item.icon}</div>
                    <span className="text-lg text-slate-400 transition group-hover:text-blue-600">
                      →
                    </span>
                  </div>
                  <h3 className="mt-4 font-black">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {item.description}
                  </p>
                  <span className="mt-4 inline-block text-sm font-black text-blue-600">
                    {item.action} →
                  </span>
                </Link>
              ))}
            </div>
          </section>
          {/* NOTIFICATIONS */}
          <section className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
            <span className="text-sm font-black uppercase tracking-wide text-blue-600">
              Notifications
            </span>
            <h2 className="mt-2 text-2xl font-black">
              Dealer Notifications
            </h2>
            <p className="mt-2 max-w-2xl text-slate-600">
              Important notifications related to vehicle opportunities,
              leads, and your dealer membership.
            </p>
            <div className="mt-8 space-y-4">
              <NotificationRow
                title="New Vehicle Opportunities"
                description="Notifications for new vehicle acquisition opportunities."
                status="Available Soon"
              />
              <NotificationRow
                title="Lead Updates"
                description="Updates when vehicle leads change status."
                status="Available Soon"
              />
              <NotificationRow
                title="Account Notifications"
                description="Important dealership and membership notifications."
                status="Enabled"
                active
              />
            </div>
          </section>
          {/* SECURITY */}
          <section className="rounded-3xl bg-slate-950 p-8 text-white">
            <span className="text-sm font-black uppercase tracking-wide text-blue-400">
              Security
            </span>
            <h2 className="mt-2 text-2xl font-black">
              Account Security
            </h2>
            <p className="mt-2 max-w-2xl text-slate-400">
              Your dealer account should be protected through authenticated
              access and secure account controls.
            </p>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <div className="rounded-2xl bg-white/10 p-6">
                <div className="text-3xl">🔐</div>
                <h3 className="mt-4 text-lg font-black">
                  Secure Authentication
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Dealer portal access should be restricted to authenticated
                  dealer accounts.
                </p>
                <span className="mt-4 inline-flex rounded-full bg-green-500/20 px-3 py-1 text-xs font-black text-green-300">
                  Protected
                </span>
              </div>
              <div className="rounded-2xl bg-white/10 p-6">
                <div className="text-3xl">🛡️</div>
                <h3 className="mt-4 text-lg font-black">
                  Account Protection
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Dealer information and membership data should only be
                  accessible to the associated dealer account.
                </p>
                <span className="mt-4 inline-flex rounded-full bg-green-500/20 px-3 py-1 text-xs font-black text-green-300">
                  Protected
                </span>
              </div>
            </div>
          </section>
          {/* SUPPORT */}
          <section className="rounded-3xl border border-blue-200 bg-blue-50 p-8">
            <span className="text-sm font-black uppercase tracking-wide text-blue-600">
              Dealer Support
            </span>
            <h2 className="mt-2 text-2xl font-black">
              Need Help With Your Account?
            </h2>
            <p className="mt-2 max-w-2xl text-slate-600">
              Contact NorthSky Auto if you need help with your dealership
              profile, membership, billing, or dealer marketplace access.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="rounded-xl bg-blue-600 px-6 py-3 font-black text-white transition hover:bg-blue-700"
              >
                Contact NorthSky Auto →
              </Link>
              <Link
                href="/dealer/dashboard"
                className="rounded-xl border border-slate-200 bg-white px-6 py-3 font-black text-slate-900 transition hover:bg-slate-50"
              >
                Return to Dashboard
              </Link>
            </div>
          </section>
          {/* FOOTER NAV */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 pb-8 text-sm font-semibold text-slate-500">
            <Link
              href="/dealer/dashboard"
              className="transition hover:text-blue-600"
            >
              Dashboard
            </Link>
            <Link
              href="/dealer/profile"
              className="transition hover:text-blue-600"
            >
              Profile
            </Link>
            <Link
              href="/dealer/subscriptions"
              className="transition hover:text-blue-600"
            >
              Subscription
            </Link>
            <Link
              href="/dealer/leads"
              className="transition hover:text-blue-600"
            >
              Vehicle Leads
            </Link>
            <Link
              href="/contact"
              className="transition hover:text-blue-600"
            >
              Contact
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
function NotificationRow({
  title,
  description,
  status,
  active = false,
}) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-slate-50 p-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h3 className="font-black">{title}</h3>
        <p className="mt-1 text-sm leading-6 text-slate-600">
          {description}
        </p>
      </div>
      <span
        className={`w-fit rounded-full px-3 py-1 text-xs font-black ${
          active
            ? "bg-green-100 text-green-700"
            : "bg-blue-100 text-blue-700"
        }`}
      >
        {status}
      </span>
    </div>
  );
}