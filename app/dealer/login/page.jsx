"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function DealerLoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (loading) return;

    setLoading(true);
    setMessage("");
    setSuccess(false);

    try {
      const email = form.email.trim().toLowerCase();

      if (!email) {
        throw new Error("Please enter your email address.");
      }

      if (!form.password) {
        throw new Error("Please enter your password.");
      }

      const supabase = createClient();

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: form.password,
      });

      if (error) {
        console.error("Dealer login error:", error);

        const errorMessage = error.message?.toLowerCase() || "";

        if (
          errorMessage.includes("invalid login") ||
          errorMessage.includes("invalid credentials")
        ) {
          throw new Error(
            "Invalid email or password. Please check your credentials and try again."
          );
        }

        if (errorMessage.includes("email not confirmed")) {
          throw new Error(
            "Please confirm your email address before signing in."
          );
        }

        throw new Error(
          error.message || "Unable to sign in. Please try again."
        );
      }

      if (!data?.user) {
        throw new Error(
          "Unable to create a dealer session. Please try again."
        );
      }

      setSuccess(true);
      setMessage("Login successful. Redirecting...");

      router.push("/dealer/dashboard");
      router.refresh();
    } catch (error) {
      console.error("Dealer login error:", error);

      setSuccess(false);
      setMessage(
        error?.message || "Unable to sign in. Please try again."
      );

      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-5xl px-6 py-14 text-center md:py-20">
          <Link
            href="/"
            className="inline-flex text-sm font-bold text-blue-300 transition hover:text-white"
          >
            ← NorthSky Auto
          </Link>

          <p className="mt-8 text-sm font-black uppercase tracking-[0.2em] text-blue-400">
            Dealer Portal
          </p>

          <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
            Dealer Sign In
          </h1>

          <p className="mx-auto mt-