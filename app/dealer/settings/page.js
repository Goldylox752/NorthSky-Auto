“use client”;

import Link from “next/link”;
import { useEffect, useState } from “react”;
import { useRouter } from “next/navigation”;
import { createClient } from “@/lib/supabase/client”;

export default function DealerSettingsPage() {
const router = useRouter();
const supabase = createClient();

const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);
const [saving, setSaving] = useState(false);
const [changingPassword, setChangingPassword] = useState(false);

const [message, setMessage] = useState(””);
const [error, setError] = useState(””);

const [form, setForm] = useState({
name: “”,
email: “”,
phone: “”,
address: “”,
city: “”,
province: “”,
postal_code: “”,
website: “”,
});

const [passwordForm, setPasswordForm] = useState({
password: “”,
confirmPassword: “”,
});

useEffect(() => {
let mounted = true;

async function loadDealer() {
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
    const { data: dealer, error: dealerError } =
      await supabase
        .from("dealers")
        .select("*")
        .eq("id", currentUser.id)
        .maybeSingle();
    if (dealerError) {
      throw dealerError;
    }
    if (!mounted) return;
    setForm({
      name:
        dealer?.name ||
        currentUser.user_metadata?.name ||
        "",
      email:
        dealer?.email ||
        currentUser.email ||
        "",
      phone:
        dealer?.phone ||
        currentUser.user_metadata?.phone ||
        "",
      address: dealer?.address || "",
      city: dealer?.city || "",
      province: dealer?.province || "",
      postal_code: dealer?.postal_code || "",
      website: dealer?.website || "",
    });
  } catch (err) {
    console.error("Dealer settings error:", err);
    if (mounted) {
      setError(
        err?.message ||
          "Unable to load your dealer profile."
      );
    }
  } finally {
    if (mounted) {
      setLoading(false);
    }
  }
}
loadDealer();
return () => {
  mounted = false;
};

}, [router]);

function handleChange(e) {
const { name, value } = e.target;

setForm((current) => ({
  ...current,
  [name]: value,
}));

}

function handlePasswordChange(e) {
const { name, value } = e.target;

setPasswordForm((current) => ({
  ...current,
  [name]: value,
}));

}

async function handleSave(e) {
e.preventDefault();

if (saving) return;
setMessage("");
setError("");
const name = form.name.trim();
const phone = form.phone.trim();
const address = form.address.trim();
const city = form.city.trim();
const province = form.province.trim();
const postalCode = form.postal_code.trim();
const website = form.website.trim();
if (!name) {
  setError("Dealership name is required.");
  return;
}
setSaving(true);
try {
  if (!user?.id) {
    throw new Error(
      "Your session has expired. Please sign in again."
    );
  }
  const { error: dealerError } = await supabase
    .from("dealers")
    .upsert(
      {
        id: user.id,
        name,
        email: form.email.trim().toLowerCase(),
        phone: phone || null,
        address: address || null,
        city: city || null,
        province: province || null,
        postal_code: postalCode || null,
        website: website || null,
      },
      {
        onConflict: "id",
      }
    );
  if (dealerError) {
    throw dealerError;
  }
  const { error: metadataError } =
    await supabase.auth.updateUser({
      data: {
        name,
        phone: phone || null,
      },
    });
  if (metadataError) {
    console.warn(
      "Auth metadata update failed:",
      metadataError
    );
  }
  setMessage("Your dealer profile has been saved.");
} catch (err) {
  console.error("Save dealer profile error:", err);
  setError(
    err?.message ||
      "Unable to save your dealer profile."
  );
} finally {
  setSaving(false);
}

}

async function handlePasswordUpdate(e) {
e.preventDefault();

if (changingPassword) return;
setMessage("");
setError("");
const password = passwordForm.password;
const confirmPassword = passwordForm.confirmPassword;
if (password.length < 8) {
  setError(
    "Your new password must be at least 8 characters."
  );
  return;
}
if (password !== confirmPassword) {
  setError("The passwords do not match.");
  return;
}
setChangingPassword(true);
try {
  const { error: passwordError } =
    await supabase.auth.updateUser({
      password,
    });
  if (passwordError) {
    throw passwordError;
  }
  setPasswordForm({
    password: "",
    confirmPassword: "",
  });
  setMessage("Your password has been updated.");
} catch (err) {
  console.error("Password update error:", err);
  setError(
    err?.message ||
      "Unable to update your password."
  );
} finally {
  setChangingPassword(false);
}

}

async function handleSignOut() {
setError(””);

const { error: signOutError } =
  await supabase.auth.signOut();
if (signOutError) {
  setError(signOutError.message);
  return;
}
router.replace("/dealer/login");
router.refresh();

}

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
      <div className="flex items-center gap-2">
        <Link
          href="/dealer/dashboard"
          className="rounded-lg px-3 py-2 text-sm font-bold text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
        >
          Dashboard
        </Link>
        <button
          type="button"
          onClick={handleSignOut}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-black text-slate-600 transition hover:bg-slate-50"
        >
          Sign Out
        </button>
      </div>
    </div>
  </header>
  {/* Hero */}
  <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 text-white">
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 md:py-14 lg:px-8">
      <span className="inline-flex rounded-full bg-blue-500/15 px-4 py-2 text-xs font-black uppercase tracking-widest text-blue-300 ring-1 ring-blue-400/20">
        Account Management
      </span>
      <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">
        Dealer Settings
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
        Manage your dealership profile and account security.
      </p>
    </div>
  </section>
  {/* Content */}
  <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6 md:py-10 lg:px-8">
    {error && (
      <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-5">
        <p className="text-sm font-black text-red-900">
          Something went wrong
        </p>
        <p className="mt-1 text-sm leading-6 text-red-700">
          {error}
        </p>
      </div>
    )}
    {message && (
      <div className="mb-6 rounded-2xl border border-green-200 bg-green-50 p-5">
        <p className="text-sm font-black text-green-900">
          ✓ {message}
        </p>
      </div>
    )}
    {/* Profile */}
    <form
      onSubmit={handleSave}
      className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8"
    >
      <div>
        <p className="text-xs font-black uppercase tracking-widest text-blue-600">
          Dealership Profile
        </p>
        <h2 className="mt-2 text-2xl font-black text-slate-950">
          Business Information
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Keep your dealership information up to date.
        </p>
      </div>
      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <Field
          label="Dealership Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your dealership"
          required
        />
        <Field
          label="Email Address"
          name="email"
          value={form.email}
          disabled
          type="email"
          helper="Your login email is managed by your account."
        />
        <Field
          label="Phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="780-555-0123"
          type="tel"
        />
        <Field
          label="Website"
          name="website"
          value={form.website}
          onChange={handleChange}
          placeholder="https://yourdealership.com"
          type="url"
        />
        <div className="sm:col-span-2">
          <Field
            label="Street Address"
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="123 Main Street"
          />
        </div>
        <Field
          label="City"
          name="city"
          value={form.city}
          onChange={handleChange}
          placeholder="Edmonton"
        />
        <Field
          label="Province"
          name="province"
          value={form.province}
          onChange={handleChange}
          placeholder="Alberta"
        />
        <Field
          label="Postal Code"
          name="postal_code"
          value={form.postal_code}
          onChange={handleChange}
          placeholder="T5A 1A1"
        />
      </div>
      <div className="mt-7 flex justify-end border-t border-slate-100 pt-6">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
    {/* Password */}
    <form
      onSubmit={handlePasswordUpdate}
      className="mt-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8"
    >
      <div>
        <p className="text-xs font-black uppercase tracking-widest text-blue-600">
          Security
        </p>
        <h2 className="mt-2 text-2xl font-black text-slate-950">
          Change Password
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Use a strong password that you do not use on other
          websites.
        </p>
      </div>
      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <Field
          label="New Password"
          name="password"
          type="password"
          value={passwordForm.password}
          onChange={handlePasswordChange}
          placeholder="At least 8 characters"
          autoComplete="new-password"
        />
        <Field
          label="Confirm New Password"
          name="confirmPassword"
          type="password"
          value={passwordForm.confirmPassword}
          onChange={handlePasswordChange}
          placeholder="Repeat your new password"
          autoComplete="new-password"
        />
      </div>
      <div className="mt-7 flex justify-end border-t border-slate-100 pt-6">
        <button
          type="submit"
          disabled={changingPassword}
          className="rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-black text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {changingPassword
            ? "Updating..."
            : "Update Password"}
        </button>
      </div>
    </form>
    {/* Navigation */}
    <div className="mt-6 grid gap-4 sm:grid-cols-3">
      <NavigationCard
        icon="🚘"
        title="Vehicle Leads"
        description="Browse opportunities"
        href="/dealer/leads"
      />
      <NavigationCard
        icon="💳"
        title="Membership"
        description="Manage your plan"
        href="/dealer/subscriptions"
      />
      <NavigationCard
        icon="📊"
        title="Dashboard"
        description="Return to overview"
        href="/dealer/dashboard"
      />
    </div>
    {/* Danger zone */}
    <div className="mt-8 rounded-3xl border border-red-200 bg-white p-6 sm:p-8">
      <p className="text-xs font-black uppercase tracking-widest text-red-600">
        Account
      </p>
      <h2 className="mt-2 text-xl font-black text-slate-950">
        Sign Out
      </h2>
      <p className="mt-2 text-sm leading-6 text-slate-500">
        Sign out of your NorthSky Auto dealer account on this
        device.
      </p>
      <button
        type="button"
        onClick={handleSignOut}
        className="mt-5 rounded-xl border border-red-200 bg-red-50 px-5 py-3 text-sm font-black text-red-700 transition hover:bg-red-100"
      >
        Sign Out
      </button>
    </div>
  </section>
</main>

);
}

function Field({
label,
name,
value,
onChange,
placeholder,
type = “text”,
required = false,
disabled = false,
helper,
autoComplete,
}) {
return (
{label}
{required && (
*
)}
  <input
    id={name}
    name={name}
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    required={required}
    disabled={disabled}
    autoComplete={autoComplete}
    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500"
  />
  {helper && (
    <p className="mt-2 text-xs text-slate-400">
      {helper}
    </p>
  )}
</div>

);
}

function NavigationCard({
icon,
title,
description,
href,
}) {
return (
{icon}
  <h3 className="mt-4 font-black text-slate-950">
    {title}
  </h3>
  <p className="mt-1 text-sm text-slate-500">
    {description}
  </p>
</Link>

);
}

function SettingsSkeleton() {
return (
        <div>
          <div className="h-4 w-32 rounded bg-slate-200" />
          <div className="mt-2 h-2 w-20 rounded bg-slate-200" />
        </div>
      </div>
      <div className="h-9 w-20 rounded-lg bg-slate-200" />
    </div>
  </header>
  <div className="h-56 bg-slate-900" />
  <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
    <div className="h-96 rounded-3xl bg-white ring-1 ring-slate-200" />
    <div className="mt-6 h-72 rounded-3xl bg-white ring-1 ring-slate-200" />
  </section>
</main>

);
}