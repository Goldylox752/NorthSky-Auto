“use client”;

import Link from “next/link”;
import { useState } from “react”;
import { useRouter } from “next/navigation”;
import { createClient } from “@/lib/supabase/client”;

export default function DealerLoginPage() {
const router = useRouter();
const supabase = createClient();

const [form, setForm] = useState({
email: “”,
password: “”,
});

const [showPassword, setShowPassword] = useState(false);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(””);
const [success, setSuccess] = useState(””);

function handleChange(e) {
const { name, value } = e.target;

setForm((current) => ({
  ...current,
  [name]: value,
}));

}

async function handleSubmit(e) {
e.preventDefault();

if (loading) return;
setError("");
setSuccess("");
const email = form.email.trim().toLowerCase();
const password = form.password;
if (!email || !password) {
  setError("Please enter your email and password.");
  return;
}
setLoading(true);
try {
  const { data, error: loginError } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });
  if (loginError) {
    throw loginError;
  }
  if (!data?.user) {
    throw new Error("Unable to sign you in. Please try again.");
  }
  setSuccess("Login successful. Redirecting...");
  router.push("/dealer/dashboard");
  router.refresh();
} catch (err) {
  console.error("Dealer login error:", err);
  const message = String(err?.message || "").toLowerCase();
  if (
    message.includes("email not confirmed") ||
    message.includes("email_not_confirmed")
  ) {
    setError(
      "Please confirm your email address before signing in."
    );
  } else if (
    message.includes("invalid login credentials")
  ) {
    setError(
      "Incorrect email or password. Please try again."
    );
  } else {
    setError(
      err?.message ||
        "Unable to sign in. Please try again."
    );
  }
} finally {
  setLoading(false);
}

}

return (
{/* Background */}
    <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(59,130,246,0.25)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.25)_1px,transparent_1px)] [background-size:50px_50px]" />
    <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-blue-600/20 blur-3xl" />
    <div className="absolute -right-32 bottom-20 h-80 w-80 rounded-full bg-indigo-600/20 blur-3xl" />
    {/* Content */}
    <div className="relative z-10 w-full max-w-5xl">
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-white shadow-2xl">
        <div className="grid lg:grid-cols-2">
          {/* Brand panel */}
          <section className="hidden bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-950 p-10 text-white lg:flex lg:flex-col lg:justify-between xl:p-14">
            <div>
              <Link
                href="/"
                className="inline-flex items-center gap-3"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-xl font-black text-blue-700 shadow-lg">
                  NS
                </div>
                <div>
                  <div className="text-xl font-black tracking-tight">
                    NorthSky Auto
                  </div>
                  <div className="text-xs font-bold uppercase tracking-widest text-blue-200">
                    Dealer Portal
                  </div>
                </div>
              </Link>
              <div className="mt-20">
                <span className="inline-flex rounded-full bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-widest text-blue-100 ring-1 ring-white/10">
                  Dealer Access
                </span>
                <h1 className="mt-6 text-4xl font-black leading-tight xl:text-5xl">
                  Welcome
                  <span className="block text-blue-200">
                    Back.
                  </span>
                </h1>
                <p className="mt-6 max-w-md text-base leading-7 text-blue-100">
                  Sign in to your NorthSky Auto dealer account
                  to manage your dealership and vehicle
                  acquisition opportunities.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <Feature
                icon="🚘"
                title="Vehicle Opportunities"
                text="Discover seller-submitted vehicles."
              />
              <Feature
                icon="📊"
                title="Dealer Dashboard"
                text="Manage your dealership activity."
              />
              <Feature
                icon="🔒"
                title="Secure Access"
                text="Your dealer account stays protected."
              />
            </div>
          </section>
          {/* Login panel */}
          <section className="bg-white p-6 text-slate-900 sm:p-10 xl:p-14">
            {/* Mobile logo */}
            <div className="mb-8 lg:hidden">
              <Link
                href="/"
                className="inline-flex items-center gap-3"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-sm font-black text-white">
                  NS
                </div>
                <div>
                  <div className="font-black text-slate-950">
                    NorthSky Auto
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    Dealer Portal
                  </div>
                </div>
              </Link>
            </div>
            <div className="mx-auto max-w-md">
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-blue-600">
                  Dealer Login
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                  Sign in to your account
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-500">
                  Enter your dealer account credentials to
                  continue.
                </p>
              </div>
              {/* Error */}
              {error && (
                <div
                  role="alert"
                  className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4"
                >
                  <div className="flex gap-3">
                    <span className="text-lg">⚠️</span>
                    <div>
                      <p className="text-sm font-black text-red-900">
                        Sign-in failed
                      </p>
                      <p className="mt-1 text-sm leading-6 text-red-700">
                        {error}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              {/* Success */}
              {success && (
                <div
                  role="status"
                  className="mt-6 rounded-2xl border border-green-200 bg-green-50 p-4"
                >
                  <div className="flex gap-3">
                    <span className="text-lg">✓</span>
                    <p className="text-sm font-bold text-green-800">
                      {success}
                    </p>
                  </div>
                </div>
              )}
              <form
                onSubmit={handleSubmit}
                className="mt-8 space-y-5"
              >
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-bold text-slate-700"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    autoComplete="email"
                    autoCapitalize="none"
                    spellCheck="false"
                    placeholder="dealer@example.com"
                    maxLength={254}
                    disabled={loading}
                    required
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100"
                  />
                </div>
                {/* Password */}
                <div>
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <label
                      htmlFor="password"
                      className="block text-sm font-bold text-slate-700"
                    >
                      Password
                    </label>
                    <Link
                      href="/dealer/forgot-password"
                      className="text-xs font-black text-blue-600 transition hover:text-blue-800"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={
                        showPassword ? "text" : "password"
                      }
                      value={form.password}
                      onChange={handleChange}
                      autoComplete="current-password"
                      placeholder="Enter your password"
                      maxLength={128}
                      disabled={loading}
                      required
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 pr-20 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword((current) => !current)
                      }
                      disabled={loading}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-xs font-black text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 disabled:opacity-50"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>
                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center rounded-xl bg-blue-600 px-5 py-4 text-sm font-black text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 hover:shadow-blue-600/30 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <span className="mr-3 h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Signing in...
                    </>
                  ) : (
                    "Sign In →"
                  )}
                </button>
              </form>
              {/* Register */}
              <div className="mt-8 border-t border-slate-200 pt-7 text-center">
                <p className="text-sm text-slate-500">
                  Don't have a dealer account?
                </p>
                <Link
                  href="/dealer/register"
                  className="mt-2 inline-block text-sm font-black text-blue-600 transition hover:text-blue-800"
                >
                  Create Dealer Account →
                </Link>
              </div>
              {/* Footer links */}
              <div className="mt-8 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs font-semibold text-slate-400">
                <Link
                  href="/"
                  className="transition hover:text-slate-700"
                >
                  NorthSky Auto
                </Link>
                <Link
                  href="/privacy"
                  className="transition hover:text-slate-700"
                >
                  Privacy
                </Link>
                <Link
                  href="/terms"
                  className="transition hover:text-slate-700"
                >
                  Terms
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
      <p className="mt-6 text-center text-xs font-semibold text-slate-500">
        © {new Date().getFullYear()} NorthSky Auto. Dealer
        marketplace and acquisition platform.
      </p>
    </div>
  </div>
</main>

);
}

function Feature({ icon, title, text }) {
return (
{icon}
  <div>
    <p className="text-sm font-black text-white">{title}</p>
    <p className="mt-0.5 text-xs text-blue-200">{text}</p>
  </div>
</div>

);
}