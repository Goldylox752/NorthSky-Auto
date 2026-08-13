import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Dealer Dashboard | NorthSky Auto",
  description:
    "Manage your NorthSky Auto dealer account, subscription, and vehicle acquisition opportunities.",
};

function formatPlan(plan) {
  if (!plan) return "No Active Plan";

  const plans = {
    starter: "Dealer Starter",
    professional: "Dealer Professional",
    pro: "Dealer Professional",
  };

  return (
    plans[String(plan).toLowerCase()] ||
    String(plan)
      .replace(/[-_]/g, " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase())
  );
}

function formatStatus(status) {
  if (!status) return "Inactive";

  return String(status)
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function statusClasses(status) {
  const value = String(status || "").toLowerCase();

  if (value === "active" || value === "trialing") {
    return "bg-green-100 text-green-700 ring-green-200";
  }

  if (value === "past_due" || value === "unpaid") {
    return "bg-yellow-100 text-yellow-700 ring-yellow-200";
  }

  if (value === "canceled" || value === "cancelled") {
    return "bg-red-100 text-red-700 ring-red-200";
  }

  return "bg-slate-100 text-slate-600 ring-slate-200";
}

function StatCard({
  icon,
  label,
  value,
  description,
}) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-slate-500">
            {label}
          </p>

          <p className="mt-3 text-3xl font-black text-slate-950">
            {value}
          </p>

          {description && (
            <p className="mt-2 text-sm text-slate-500">
              {description}
            </p>
          )}
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-2xl">
          {icon}
        </div>
      </div>
    </div>
  );
}

async function getDealer(supabase, user) {
  if (!user?.id) {
    return null;