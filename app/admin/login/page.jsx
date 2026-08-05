"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  async function login(e) {

    e.preventDefault();

    setError("");
    setLoading(true);


    if (!email || !password) {
      setError("Please enter your email and password.");
      setLoading(false);
      return;
    }


    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });


    if (error) {

      setError(
        "Invalid login credentials. Please try again."
      );

      setLoading(false);
      return;
    }


    router.push("/admin");
    router.refresh();

  }


  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 px-6">

      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">


        {/* Logo */}

        <div className="mb-8 text-center">

          <h1 className="text-3xl font-extrabold text-slate-900">
            NorthSky Auto
          </h1>

          <p className="mt-2 text-gray-500">
            Admin Portal
          </p>

        </div>


        <form
          onSubmit={login}
          className="space-y-5"
        >


          <div>

            <label className="mb-2 block text-sm font-medium">
              Email Address
            </label>

            <input
              type="email"
              placeholder="admin@northskyauto.com"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-blue-600"
            />

          </div>



          <div>

            <label className="mb-2 block text-sm font-medium">
              Password
            </label>

            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-blue-600"
            />

          </div>



          {error && (

            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">

              {error}

            </div>

          )}



          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >

            {loading
              ? "Signing In..."
              : "Login to Dashboard"
            }

          </button>


        </form>


        <p className="mt-8 text-center text-sm text-gray-400">
          Secure access for NorthSky Auto administrators.
        </p>


      </div>

    </main>
  );
}