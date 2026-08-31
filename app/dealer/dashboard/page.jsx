import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
export const dynamic = "force-dynamic";
export const metadata = {
  title: "Dealer Dashboard | NorthSky Auto",
  description: "NorthSky Auto dealer dashboard.",
};
export default async function DealerDashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/dealer/login");
  }
  const dealershipName =
    user.user_metadata?.dealership_name ||
    "Dealer Account";
  const email = user.email || "";
  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link
            href="/"
            className="text-xl font-black text-slate-950"
          >
            NorthSky Auto
          </Link>
          <form
            action="/api/auth/signout"
            method="POST"
          >
            <button
              type="submit"
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-bold hover:bg-slate-100"
            >
              Sign Out
            </button>
          </form>
        </div>
      </header>
      {/* Dashboard */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-6xl">
          {/* Welcome */}
          <div className="rounded-2xl bg-slate-950 p-8 text-white">
            <p className="text-sm font-bold uppercase tracking-wider text-blue-400">
              Dealer Dashboard
            </p>
            <h1 className="mt-3 text-3xl font-black">
              Welcome, {dealershipName}
            </h1>
            <p className="mt-3 text-slate-300">
              Manage your NorthSky Auto dealer account.
            </p>
          </div>
          {/* Navigation */}
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <Link
              href="/dealer/vehicles"
              className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:ring-blue-400"
            >
              <div className="text-3xl">🚗</div>
              <h2 className="mt-4 text-xl font-black">
                Vehicles
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Browse available vehicle opportunities.
              </p>
              <p className="mt-5 font-bold text-blue-600">
                View Vehicles →
              </p>
            </Link>
            <Link
              href="/dealer/profile"
              className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:ring-blue-400"
            >
              <div className="text-3xl">🏢</div>
              <h2 className="mt-4 text-xl font-black">
                Dealer Profile
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Manage your dealership information.
              </p>
              <p className="mt-5 font-bold text-blue-600">
                Open Profile →
              </p>
            </Link>
            <Link
              href="/pricing"
              className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:ring-blue-400"
            >
              <div className="text-3xl">💳</div>
              <h2 className="mt-4 text-xl font-black">
                Plans & Billing
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                View dealer plans and subscription options.
              </p>
              <p className="mt-5 font-bold text-blue-600">
                View Plans →
              </p>
            </Link>
          </div>
          {/* Account */}
          <div className="mt-8 rounded-2xl bg-white p-7 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-xl font-black">
              Account
            </h2>
            <div className="mt-5 space-y-4">
              <div>
                <p className="text-xs font-bold uppercase text-slate-400">
                  Dealership
                </p>
                <p className="mt-1 font-bold">
                  {dealershipName}
                </p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase text-slate-400">
                  Email
                </p>
                <p className="mt-1 font-bold">
                  {email}
                </p>
              </div>
            </div>
          </div>
          {/* Footer */}
          <div className="mt-8 text-center text-sm text-slate-500">
            NorthSky Auto — Dealer Portal
          </div>
        </div>
      </section>
    </main>
  );
}