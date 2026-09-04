“use client”;

import Link from “next/link”;
import { useState } from “react”;
import { createClient } from “@/lib/supabase/client”;

export default function ForgotPasswordPage() {
const supabase = createClient();

const [email, setEmail] = useState(””);
const [loading, setLoading] = useState(false);
const [message, setMessage] = useState(””);
const [error, setError] = useState(””);

async function handleReset(event) {
event.preventDefault();

setLoading(true);
setMessage("");
setError("");
const cleanEmail = email.trim().toLowerCase();
if (!cleanEmail) {
  setError("Please enter your email address.");
  setLoading(false);
  return;
}
const { error } = await supabase.auth.resetPasswordForEmail(
  cleanEmail,
  {
    redirectTo: `${window.location.origin}/dealer/reset-password`,
  }
);
if (error) {
  setError(error.message);
  setLoading(false);
  return;
}
setMessage(
  "If an account exists for that email, we've sent a password reset link."
);
setLoading(false);

}

return (
{/* Left side */}
NS
          <div>
            <div className="text-xl font-black tracking-tight">
              NorthSky Auto
            </div>
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-200">
              Dealer Portal
            </div>
          </div>
        </Link>
        <div className="mt-28 max-w-lg">
          <span className="inline-flex rounded-full bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-widest text-blue-100 ring-1 ring-white/10">
            Account Recovery
          </span>
          <h1 className="mt-6 text-5xl font-black leading-tight tracking-tight">
            Get back into your dealer account.
          </h1>
          <p className="mt-6 text-lg leading-8 text-blue-100">
            Enter your email address and we'll send you a secure
            link to create a new password.
          </p>
        </div>
      </div>
      <div className="grid gap-4">
        <RecoveryFeature
          icon="🔐"
          title="Secure recovery"
          text="Password resets are handled through Supabase authentication."
        />
        <RecoveryFeature
          icon="🚘"
          title="Dealer access"
          text="Return to your vehicle opportunities and dealer dashboard."
        />
        <RecoveryFeature
          icon="⚡"
          title="Quick setup"
          text="Use the link in your email to create a new password."
        />
      </div>
    </section>
    {/* Right side */}
    <section className="flex items-center justify-center bg-slate-50 px-5 py-10 text-slate-900 sm:px-8">
      <div className="w-full max-w-md">
        {/* Mobile logo */}
        <div className="mb-10 flex justify-center lg:hidden">
          <Link
            href="/"
            className="flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-sm font-black text-white shadow-lg shadow-blue-600/20">
              NS
            </div>
            <div>
              <div className="font-black tracking-tight text-slate-950">
                NorthSky Auto
              </div>
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                Dealer Portal
              </div>
            </div>
          </Link>
        </div>
        <div className="rounded-3xl bg-white p-7 shadow-xl shadow-slate-900/5 ring-1 ring-slate-200 sm:p-9">
          <div className="mb-8">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-2xl">
              🔐
            </div>
            <h2 className="text-3xl font-black tracking-tight text-slate-950">
              Forgot your password?
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              Enter the email address associated with your dealer
              account.
            </p>
          </div>
          {message && (
            <div className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm leading-6 text-emerald-800">
              <div className="font-black">
                Check your email
              </div>
              <div className="mt-1">
                {message}
              </div>
            </div>
          )}
          {error && (
            <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-700">
              {error}
            </div>
          )}
          <form onSubmit={handleReset} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-black text-slate-800"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="dealer@example.com"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-black text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Sending reset link..."
                : "Send Reset Link"}
            </button>
          </form>
          <div className="my-7 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-xs font-bold text-slate-400">
              OR
            </span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>
          <div className="space-y-3 text-center">
            <Link
              href="/dealer/login"
              className="block rounded-xl border border-slate-200 px-5 py-3.5 text-sm font-black text-slate-700 transition hover:bg-slate-50"
            >
              ← Back to Dealer Login
            </Link>
            <p className="text-sm text-slate-500">
              Don't have a dealer account?{" "}
              <Link
                href="/dealer/register"
                className="font-black text-blue-600 hover:text-blue-700"
              >
                Register here
              </Link>
            </p>
          </div>
        </div>
        <p className="mt-6 text-center text-xs font-semibold text-slate-400">
          © {new Date().getFullYear()} NorthSky Auto
        </p>
      </div>
    </section>
  </div>
</main>

);
}

function RecoveryFeature({ icon, title, text }) {
return (
{icon}
  <div>
    <h3 className="font-black">{title}</h3>
    <p className="mt-1 text-sm leading-6 text-blue-100">
      {text}
    </p>
  </div>
</div>

);
}