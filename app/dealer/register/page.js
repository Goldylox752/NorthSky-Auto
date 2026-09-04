“use client”;

import Link from “next/link”;
import { useState } from “react”;
import { useRouter } from “next/navigation”;
import { createClient } from “@/lib/supabase/client”;

export default function DealerRegisterPage() {
const router = useRouter();
const supabase = createClient();

const [form, setForm] = useState({
name: “”,
email: “”,
phone: “”,
password: “”,
confirmPassword: “”,
});

const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(””);
const [success, setSuccess] = useState(false);

function updateField(field, value) {
setForm((current) => ({
…current,
[field]: value,
}));
}

async function handleRegister(event) {
event.preventDefault();

setLoading(true);
setError("");
setSuccess(false);
const name = form.name.trim();
const email = form.email.trim().toLowerCase();
const phone = form.phone.trim();
if (!name || !email || !form.password) {
  setError("Please complete all required fields.");
  setLoading(false);
  return;
}
if (form.password.length < 8) {
  setError("Your password must be at least 8 characters.");
  setLoading(false);
  return;
}
if (form.password !== form.confirmPassword) {
  setError("Your passwords do not match.");
  setLoading(false);
  return;
}
const {
  data: { user },
  error: authError,
} = await supabase.auth.getUser();
if (user && !authError) {
  router.replace("/dealer/dashboard");
  return;
}
const { data, error: signUpError } = await supabase.auth.signUp({
  email,
  password: form.password,
  options: {
    data: {
      name,
      phone,
      account_type: "dealer",
    },
    emailRedirectTo: `${window.location.origin}/dealer/login`,
  },
});
if (signUpError) {
  if (
    signUpError.message
      .toLowerCase()
      .includes("already registered")
  ) {
    setError(
      "An account with this email already exists. Try signing in instead."
    );
  } else {
    setError(signUpError.message);
  }
  setLoading(false);
  return;
}
/*
 * If Supabase email confirmation is disabled, a session is
 * normally returned immediately. In that case we can create
 * the dealer profile and send the user directly to the dashboard.
 *
 * If email confirmation is enabled, session will normally be
 * null. The dealer profile should then be created by a database
 * trigger on auth.users or another secure server-side process.
 */
if (data.session && data.user) {
  const { error: dealerError } = await supabase
    .from("dealers")
    .upsert(
      {
        id: data.user.id,
        name,
        email,
        phone,
      },
      {
        onConflict: "id",
      }
    );
  if (dealerError) {
    console.error("Dealer profile error:", dealerError);
    /*
     * Authentication succeeded even if the dealer profile
     * could not be created. Do not delete the auth account.
     */
  }
  router.replace("/dealer/dashboard");
  return;
}
setSuccess(true);
setLoading(false);

}

return (
{/* Brand panel */}
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
            Dealer Registration
          </span>
          <h1 className="mt-6 text-5xl font-black leading-tight tracking-tight">
            Grow your inventory with NorthSky Auto.
          </h1>
          <p className="mt-6 text-lg leading-8 text-blue-100">
            Create your dealer account and gain access to vehicle
            opportunities through the NorthSky Auto marketplace.
          </p>
        </div>
      </div>
      <div className="grid gap-4">
        <Feature
          icon="🚘"
          title="Vehicle Opportunities"
          text="Discover vehicles that may fit your dealership."
        />
        <Feature
          icon="📊"
          title="Dealer Dashboard"
          text="Manage your opportunities and account from one place."
        />
        <Feature
          icon="🔐"
          title="Secure Account"
          text="Your authentication is protected by Supabase."
        />
      </div>
    </section>
    {/* Registration form */}
    <section className="flex items-center justify-center bg-slate-50 px-5 py-10 text-slate-900 sm:px-8">
      <div className="w-full max-w-md">
        {/* Mobile logo */}
        <div className="mb-8 flex justify-center lg:hidden">
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
          <div className="mb-7">
            <p className="text-xs font-black uppercase tracking-widest text-blue-600">
              Create Account
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
              Become a NorthSky dealer
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              Create your account to access the NorthSky Auto dealer
              portal.
            </p>
          </div>
          {error && (
            <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-700">
              <div className="font-black">
                Registration failed
              </div>
              <div className="mt-1">
                {error}
              </div>
            </div>
          )}
          {success ? (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-2xl shadow-sm">
                ✉️
              </div>
              <h3 className="mt-5 text-xl font-black text-emerald-950">
                Check your email
              </h3>
              <p className="mt-3 text-sm leading-6 text-emerald-800">
                Your dealer account has been created. Check your
                email for the confirmation link, then return to
                NorthSky Auto and sign in.
              </p>
              <Link
                href="/dealer/login"
                className="mt-6 block rounded-xl bg-emerald-600 px-5 py-3.5 text-center text-sm font-black text-white transition hover:bg-emerald-700"
              >
                Go to Dealer Login
              </Link>
            </div>
          ) : (
            <form
              onSubmit={handleRegister}
              className="space-y-5"
            >
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-black text-slate-800"
                >
                  Dealership name
                </label>
                <input
                  id="name"
                  type="text"
                  autoComplete="organization"
                  placeholder="Your Dealership"
                  value={form.name}
                  onChange={(event) =>
                    updateField("name", event.target.value)
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-black text-slate-800"
                >
                  Business email
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="dealer@example.com"
                  value={form.email}
                  onChange={(event) =>
                    updateField("email", event.target.value)
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-black text-slate-800"
                >
                  Phone number
                  <span className="ml-2 font-semibold text-slate-400">
                    Optional
                  </span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="780-555-0123"
                  value={form.phone}
                  onChange={(event) =>
                    updateField("phone", event.target.value)
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-black text-slate-800"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="At least 8 characters"
                    value={form.password}
                    onChange={(event) =>
                      updateField(
                        "password",
                        event.target.value
                      )
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 pr-20 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    required
                    minLength={8}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((current) => !current)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-xs font-black text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-black text-slate-800"
                >
                  Confirm password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    autoComplete="new-password"
                    placeholder="Enter your password again"
                    value={form.confirmPassword}
                    onChange={(event) =>
                      updateField(
                        "confirmPassword",
                        event.target.value
                      )
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 pr-20 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        (current) => !current
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-xs font-black text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                  >
                    {showConfirmPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
              <div className="rounded-xl bg-slate-50 p-4 text-xs leading-5 text-slate-500 ring-1 ring-slate-100">
                By creating a dealer account, you agree to use
                NorthSky Auto for legitimate vehicle acquisition
                and dealership purposes.
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-black text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "Creating Dealer Account..."
                  : "Create Dealer Account"}
              </button>
            </form>
          )}
          {!success && (
            <>
              <div className="my-7 flex items-center gap-3">
                <div className="h-px flex-1 bg-slate-200" />
                <span className="text-xs font-bold text-slate-400">
                  ALREADY A DEALER?
                </span>
                <div className="h-px flex-1 bg-slate-200" />
              </div>
              <Link
                href="/dealer/login"
                className="block rounded-xl border border-slate-200 px-5 py-3.5 text-center text-sm font-black text-slate-700 transition hover:bg-slate-50"
              >
                Sign In to Dealer Portal
              </Link>
            </>
          )}
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

function Feature({ icon, title, text }) {
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