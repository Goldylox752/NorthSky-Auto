"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
export default function DealerLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });
      if (error) {
        setError(error.message);
        return;
      }
      router.push("/dealer/dashboard");
      router.refresh();
    } catch (err) {
      console.error(err);
      setError("Unable to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  }
  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      <header className="bg-slate-950 px-6 py-12 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <Link
            href="/"
            className="text-sm font-bold text-blue-400 hover:text-blue-300"
          >
            ← NorthSky Auto
          </Link>
          <p className="mt-8 text-sm font-black uppercase tracking-widest text-blue-400">
            Dealer Portal
          </p>
          <h1 className="mt-3 text-4xl font-black">
            Dealer Login
          </h1>
          <p className="mt-4 text-slate-300">
            Sign in to your NorthSky Auto dealer account.
          </p>
        </div>
      </header>
      <section className="px-6 py-12">
        <div className="mx-auto max-w-md">
          <div className="rounded-3xl bg-white p-8 shadow-xl ring-1 ring-slate-200">
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-2xl font-black text-white">
                N
              </div>
              <h2 className="mt-6 text-2xl font-black">
                Welcome Back
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Enter your dealer account credentials.
              </p>
            </div>
            {error && (
              <div className="mt-6 rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-700">
                {error}
              </div>
            )}
            <form
              onSubmit={handleSubmit}
              className="mt-7 space-y-5"
            >
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-bold"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  placeholder="dealer@example.com"
                  autoComplete="email"
                  required
                  disabled={loading}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3.5 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-bold"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                  disabled={loading}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3.5 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-blue-600 px-6 py-4 font-black text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? "Signing In..." : "Sign In →"}
              </button>
            </form>
            <div className="mt-8 border-t border-slate-200 pt-7 text-center">
              <p className="text-sm text-slate-500">
                Don't have a dealer account?
              </p>
              <Link
                href="/dealer/register"
                className="mt-2 inline-block font-bold text-blue-600 hover:underline"
              >
                Create Dealer Account →
              </Link>
            </div>
          </div>
          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-sm font-semibold text-slate-500 hover:text-slate-900"
            >
              ← Back to NorthSky Auto
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}