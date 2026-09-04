“use client”;

import Link from “next/link”;
import { useEffect, useState } from “react”;
import { useRouter } from “next/navigation”;
import { createClient } from “@/lib/supabase/client”;

export default function DealerDashboardPage() {
const router = useRouter();
const supabase = createClient();

const [user, setUser] = useState(null);
const [dealer, setDealer] = useState(null);
const [loading, setLoading] = useState(true);
const [signingOut, setSigningOut] = useState(false);
const [error, setError] = useState(””);

useEffect(() => {
let mounted = true;

async function loadDashboard() {
  try {
    setLoading(true);
    setError("");
    const {
      data: { user: currentUser },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError) {
      throw userError;
    }
    if (!currentUser) {
      router.replace("/dealer/login");
      return;
    }
    if (!mounted) return;
    setUser(currentUser);
    const { data: dealerData, error: dealerError } =
      await supabase
        .from("dealers")
        .select("*")
        .eq("id", currentUser.id)
        .maybeSingle();
    if (dealerError) {
      console.error("Dealer profile error:", dealerError);
    }
    if (mounted) {
      setDealer(dealerData || null);
    }
  } catch (err) {
    console.error("Dashboard error:", err);
    if (mounted) {
      setError(
        err?.message ||
          "Unable to load your dealer dashboard."
      );
    }
  } finally {
    if (mounted) {
      setLoading(false);
    }
  }
}
loadDashboard();
return () => {
  mounted = false;
};

}, [router]);

async function handleSignOut() {
if (signingOut) return;

setSigningOut(true);
try {
  const { error: signOutError } =
    await supabase.auth.signOut();
  if (signOutError) {
    throw signOutError;
  }
  router.replace("/dealer/login");
  router.refresh();
} catch (err) {
  console.error("Sign out error:", err);
  setError(
    err?.message ||
      "Unable to sign out. Please try again."
  );
  setSigningOut(false);
}

}

const dealerName =
dealer?.name ||
user?.user_metadata?.name ||
“Dealer”;

const dealerEmail =
dealer?.email ||
user?.email ||
“”;

if (loading) {
return ;
}

return (
{/* Header */}
NS
        <div>
          <div className="font-black tracking-tight text-slate-950">
            NorthSky Auto
          </div>
          <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            Dealer Portal
          </div>
        </div>
      </Link>
      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="hidden rounded-lg px-3 py-2 text-sm font-bold text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 sm:block"
        >
          Marketplace
        </Link>
        <button
          type="button"
          onClick={handleSignOut}
          disabled={signingOut}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-black text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {signingOut ? "Signing out..." : "Sign Out"}
        </button>
      </div>
    </div>
  </header>
  {/* Hero */}
  <section className="overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 text-white">
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 md:py-14 lg:px-8">
      <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <div>
          <span className="inline-flex rounded-full bg-blue-500/15 px-4 py-2 text-xs font-black uppercase tracking-widest text-blue-300 ring-1 ring-blue-400/20">
            Dealer Dashboard
          </span>
          <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">
            Welcome back,
            <span className="block text-blue-400">
              {dealerName}
            </span>
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
            Manage your NorthSky Auto dealership account,
            discover vehicle opportunities, and build your
            acquisition pipeline.
          </p>
        </div>
        <Link
          href="/dealer/leads"
          className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-blue-900/30 transition hover:bg-blue-500"
        >
          Browse Vehicle Leads →
        </Link>
      </div>
    </div>
  </section>
  {/* Main */}
  <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-10 lg:px-8">
    {error && (
      <div className="mb-7 rounded-2xl border border-red-200 bg-red-50 p-5">
        <p className="text-sm font-black text-red-900">
          Dashboard notice
        </p>
        <p className="mt-1 text-sm leading-6 text-red-700">
          {error}
        </p>
      </div>
    )}
    {/* Stats */}
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        icon="🚘"
        label="Vehicle Opportunities"
        value="Browse"
        description="Find available vehicles"
        href="/dealer/leads"
      />
      <StatCard
        icon="📋"
        label="My Leads"
        value="View"
        description="Manage your opportunities"
        href="/dealer/leads"
      />
      <StatCard
        icon="💳"
        label="Membership"
        value="Manage"
        description="View your dealer plan"
        href="/dealer/subscriptions"
      />
      <StatCard
        icon="⚙️"
        label="Account"
        value="Settings"
        description="Manage dealer profile"
        href="/dealer/settings"
      />
    </div>
    {/* Main grid */}
    <div className="mt-8 grid gap-6 lg:grid-cols-3">
      {/* Acquisition */}
      <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200 lg:col-span-2">
        <div className="border-b border-slate-100 p-6 sm:p-7">
          <p className="text-xs font-black uppercase tracking-widest text-blue-600">
            Acquisition
          </p>
          <h2 className="mt-2 text-2xl font-black text-slate-950">
            Vehicle Opportunities
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Browse seller-submitted vehicles and identify
            inventory that may be a fit for your dealership.
          </p>
        </div>
        <div className="grid gap-4 p-6 sm:grid-cols-2 sm:p-7">
          <ActionCard
            icon="🔎"
            title="Browse Vehicle Leads"
            description="Search available vehicle opportunities."
            href="/dealer/leads"
            primary
          />
          <ActionCard
            icon="📊"
            title="Lead Management"
            description="Review and manage your acquisition activity."
            href="/dealer/leads"
          />
        </div>
      </div>
      {/* Account */}
      <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-7">
        <p className="text-xs font-black uppercase tracking-widest text-blue-600">
          Dealer Account
        </p>
        <h2 className="mt-2 text-2xl font-black text-slate-950">
          Your Account
        </h2>
        <div className="mt-6 rounded-2xl bg-slate-50 p-4">
          <p className="text-xs font-black uppercase tracking-widest text-slate-400">
            Dealer
          </p>
          <p className="mt-1 break-words text-sm font-black text-slate-800">
            {dealerName}
          </p>
        </div>
        <div className="mt-3 rounded-2xl bg-slate-50 p-4">
          <p className="text-xs font-black uppercase tracking-widest text-slate-400">
            Email
          </p>
          <p className="mt-1 break-words text-sm font-bold text-slate-700">
            {dealerEmail || "Not available"}
          </p>
        </div>
        <Link
          href="/dealer/settings"
          className="mt-5 flex w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-700 transition hover:bg-slate-50"
        >
          Manage Account
        </Link>
      </div>
    </div>
    {/* Membership */}
    <section className="mt-8 overflow-hidden rounded-3xl bg-slate-950 text-white shadow-xl">
      <div className="grid gap-8 p-7 sm:p-9 lg:grid-cols-[1fr_auto] lg:items-center lg:p-10">
        <div>
          <span className="inline-flex rounded-full bg-blue-500/15 px-4 py-2 text-xs font-black uppercase tracking-widest text-blue-300 ring-1 ring-blue-400/20">
            NorthSky Auto Dealer Membership
          </span>
          <h2 className="mt-4 text-2xl font-black sm:text-3xl">
            Grow your vehicle acquisition pipeline.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
            Manage your dealer membership and access the
            tools available to help source inventory through
            NorthSky Auto.
          </p>
        </div>
        <Link
          href="/dealer/subscriptions"
          className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-black text-white transition hover:bg-blue-500"
        >
          Manage Membership →
        </Link>
      </div>
    </section>
    {/* Quick links */}
    <section className="mt-8">
      <div className="mb-5">
        <p className="text-xs font-black uppercase tracking-widest text-blue-600">
          Quick Access
        </p>
        <h2 className="mt-2 text-2xl font-black text-slate-950">
          Dealer Tools
        </h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <QuickLink
          icon="🚘"
          title="Vehicle Leads"
          href="/dealer/leads"
        />
        <QuickLink
          icon="💳"
          title="Subscriptions"
          href="/dealer/subscriptions"
        />
        <QuickLink
          icon="⚙️"
          title="Settings"
          href="/dealer/settings"
        />
        <QuickLink
          icon="🏠"
          title="NorthSky Auto"
          href="/"
        />
      </div>
    </section>
  </section>
  {/* Footer */}
  <footer className="border-t border-slate-200 bg-white">
    <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-7 text-sm text-slate-400 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
      <p>
        © {new Date().getFullYear()} NorthSky Auto
      </p>
      <div className="flex gap-5">
        <Link
          href="/privacy"
          className="font-semibold transition hover:text-slate-700"
        >
          Privacy
        </Link>
        <Link
          href="/terms"
          className="font-semibold transition hover:text-slate-700"
        >
          Terms
        </Link>
      </div>
    </div>
  </footer>
</main>

);
}

function StatCard({
icon,
label,
value,
description,
href,
}) {
return (
{icon}
    <span className="text-xs font-black text-blue-600 transition group-hover:translate-x-0.5">
      →
    </span>
  </div>
  <p className="mt-5 text-xs font-black uppercase tracking-widest text-slate-400">
    {label}
  </p>
  <p className="mt-1 text-xl font-black text-slate-950">
    {value}
  </p>
  <p className="mt-1 text-sm text-slate-500">
    {description}
  </p>
</Link>

);
}

function ActionCard({
icon,
title,
description,
href,
primary = false,
}) {
return (
<Link
href={href}
className={rounded-2xl p-5 transition ${ primary ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700" : "bg-slate-50 text-slate-900 ring-1 ring-slate-200 hover:bg-slate-100" }}
>
{icon}

  <h3
    className={`mt-4 font-black ${
      primary ? "text-white" : "text-slate-950"
    }`}
  >
    {title}
  </h3>
  <p
    className={`mt-2 text-sm leading-6 ${
      primary ? "text-blue-100" : "text-slate-500"
    }`}
  >
    {description}
  </p>
  <div
    className={`mt-5 text-sm font-black ${
      primary ? "text-white" : "text-blue-600"
    }`}
  >
    Open →
  </div>
</Link>

);
}

function QuickLink({ icon, title, href }) {
return (
{icon}
  <div className="min-w-0">
    <p className="truncate text-sm font-black text-slate-900">
      {title}
    </p>
    <p className="mt-1 text-xs font-semibold text-slate-400">
      Open →
    </p>
  </div>
</Link>

);
}

function DashboardSkeleton() {
return (
      <div className="h-9 w-20 rounded-lg bg-slate-200" />
    </div>
  </div>
  <div className="h-64 bg-slate-900" />
  <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {[1, 2, 3, 4].map((item) => (
        <div
          key={item}
          className="h-36 rounded-2xl bg-white ring-1 ring-slate-200"
        />
      ))}
    </div>
    <div className="mt-8 grid gap-6 lg:grid-cols-3">
      <div className="h-72 rounded-3xl bg-white ring-1 ring-slate-200 lg:col-span-2" />
      <div className="h-72 rounded-3xl bg-white ring-1 ring-slate-200" />
    </div>
  </div>
</main>

);
}