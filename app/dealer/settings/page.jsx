import Link from "next/link";
export const metadata = {
  title: "Dealer Settings | NorthSky Auto",
  description:
    "Manage your NorthSky Auto dealer account settings, preferences, and account access.",
};
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
                Manage your dealer account preferences and portal settings.
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
      {/* CONTENT */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-5xl space-y-8">
          {/* ACCOUNT */}
          <section className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
            <div>
              <span className="text-sm font-black uppercase tracking-wide text-blue-600">
                Account
              </span>
              <h2 className="mt-2 text-2xl font-black">
                Dealer Account
              </h2>
              <p className="mt-2 text-slate-600">
                Manage your dealership profile and account information.
              </p>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <Link
                href="/dealer/profile"
                className="group rounded-2xl border border-slate-200 p-6 transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg"
              >
                <div className="flex items-start justify-between">
                  <div className="text-3xl">🏢</div>
                  <span className="text-xl text-slate-400 transition group-hover:text-blue-600">
                    →
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-black">
                  Dealer Profile
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Review your dealership name, contact information,
                  location, and business details.
                </p>
              </Link>
              <Link
                href="/dealer/subscriptions"
                className="group rounded-2xl border border-slate-200 p-6 transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg"
              >
                <div className="flex items-start justify-between">
                  <div className="text-3xl">💳</div>
                  <span className="text-xl text-slate-400 transition group-hover:text-blue-600">
                    →
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-black">
                  Subscription
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Review your NorthSky Auto dealer plan and subscription
                  status.
                </p>
              </Link>
            </div>
          </section>
          {/* MARKETPLACE SETTINGS */}
          <section className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
            <div>
              <span className="text-sm font-black uppercase tracking-wide text-blue-600">
                Marketplace
              </span>
              <h2 className="mt-2 text-2xl font-black">
                Dealer Marketplace
              </h2>
              <p className="mt-2 text-slate-600">
                Access the tools used to find and manage vehicle
                acquisition opportunities.
              </p>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <Link
                href="/dealer/leads"
                className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200 transition hover:bg-blue-50 hover:ring-blue-200"
              >
                <div className="text-3xl">🚗</div>
                <h3 className="mt-4 font-black">
                  Vehicle Leads
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Browse available vehicle opportunities.
                </p>
              </Link>
              <Link
                href="/dealer/saved"
                className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200 transition hover:bg-blue-50 hover:ring-blue-200"
              >
                <div className="text-3xl">⭐</div>
                <h3 className="mt-4 font-black">
                  Saved Vehicles
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Review opportunities you have saved.
                </p>
              </Link>
              <Link
                href="/dealer/analytics"
                className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200 transition hover:bg-blue-50 hover:ring-blue-200"
              >
                <div className="text-3xl">📊</div>
                <h3 className="mt-4 font-black">
                  Analytics
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Review your vehicle acquisition activity.
                </p>
              </Link>
            </div>
          </section>
          {/* NOTIFICATIONS */}
          <section className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
            <div>
              <span className="text-sm font-black uppercase tracking-wide text-blue-600">
                Notifications
              </span>
              <h2 className="mt-2 text-2xl font-black">
                Dealer Notifications
              </h2>
              <p className="mt-2 text-slate-600">
                Notification preferences will be available here as the
                dealer portal expands.
              </p>
            </div>
            <div className="mt-8 space-y-4">
              <div className="flex items-center justify-between gap-6 rounded-2xl bg-slate-50 p-5">
                <div>
                  <h3 className="font-black">
                    New Vehicle Opportunities
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">
                    Receive notifications when new vehicle opportunities
                    become available.
                  </p>
                </div>
                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-black text-blue-700">
                  Coming Soon
                </span>
              </div>
              <div className="flex items-center justify-between gap-6 rounded-2xl bg-slate-50 p-5">
                <div>
                  <h3 className="font-black">
                    Lead Updates
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">
                    Receive updates when your vehicle leads change status.
                  </p>
                </div>
                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-black text-blue-700">
                  Coming Soon
                </span>
              </div>
              <div className="flex items-center justify-between gap-6 rounded-2xl bg-slate-50 p-5">
                <div>
                  <h3 className="font-black">
                    Account Notifications
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">
                    Important account and membership notifications.
                  </p>
                </div>
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-black text-green-700">
                  Enabled
                </span>
              </div>
            </div>
          </section>
          {/* SECURITY */}
          <section className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
            <div>
              <span className="text-sm font-black uppercase tracking-wide text-blue-600">
                Security
              </span>
              <h2 className="mt-2 text-2xl font-black">
                Account Security
              </h2>
              <p className="mt-2 text-slate-600">
                Security controls will be managed through your NorthSky
                Auto account authentication system.
              </p>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 p-6">
                <div className="text-3xl">🔐</div>
                <h3 className="mt-4 font-black">
                  Authentication
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Dealer authentication is handled securely through the
                  account system.
                </p>
                <span className="mt-4 inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-black text-blue-700">
                  Coming Soon
                </span>
              </div>
              <div className="rounded-2xl border border-slate-200 p-6">
                <div className="text-3xl">🛡️</div>
                <h3 className="mt-4 font-black">
                  Account Protection
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Dealer account security and access controls will be
                  managed here.
                </p>
                <span className="mt-4 inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-black text-blue-700">
                  Coming Soon
                </span>
              </div>
            </div>
          </section>
          {/* DANGER ZONE */}
          <section className="rounded-3xl border border-red-200 bg-white p-8 shadow-sm">
            <span className="text-sm font-black uppercase tracking-wide text-red-600">
              Account
            </span>
            <h2 className="mt-2 text-2xl font-black">
              Need Help With Your Account?
            </h2>
            <p className="mt-2 max-w-2xl text-slate-600">
              Contact NorthSky Auto before making changes to your dealer
              membership or account if you need assistance.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex rounded-xl bg-red-600 px-6 py-3 font-black text-white transition hover:bg-red-700"
            >
              Contact NorthSky Auto →
            </Link>
          </section>
          {/* FOOTER NAVIGATION */}
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
              Leads
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