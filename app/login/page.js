"use client";

import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    // Supabase authentication will be connected here
    console.log("Login:", email);
  }

  return (
    <main style={styles.main}>
      <div style={styles.card}>
        <Link href="/" style={styles.logo}>
          NorthSky Auto
        </Link>

        <h1 style={styles.title}>Welcome back</h1>
        <p style={styles.subtitle}>
          Sign in to your NorthSky Auto account.
        </p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />

          <label style={styles.label}>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />

          <button type="submit" style={styles.button}>
            Sign In
          </button>
        </form>

        <div style={styles.links}>
          <Link href="/dealer/login" style={styles.link}>
            Dealer login
          </Link>

          <Link href="/dealer/register" style={styles.link}>
            Create dealer account
          </Link>
        </div>

        <Link href="/" style={styles.back}>
          ← Back to NorthSky Auto
        </Link>
      </div>
    </main>
  );
}

const styles = {
  main: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
    background: "#f5f7fa",
  },
  card: {
    width: "100%",
    maxWidth: "440px",
    background: "#ffffff",
    borderRadius: "18px",
    padding: "40px",
    boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
  },
  logo: {
    display: "block",
    textAlign: "center",
    fontSize: "26px",
    fontWeight: "800",
    color: "#111827",
    textDecoration: "none",
    marginBottom: "30px",
  },
  title: {
    margin: "0 0 8px",
    textAlign: "center",
    fontSize: "30px",
    color: "#111827",
  },
  subtitle: {
    textAlign: "center",
    color: "#6b7280",
    marginBottom: "30px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontWeight: "600",
    color: "#374151",
    marginBottom: "7px",
  },
  input: {
    padding: "14px",
    borderRadius: "10px",
    border: "1px solid #d1d5db",
    marginBottom: "18px",
    fontSize: "16px",
    outline: "none",
  },
  button: {
    padding: "14px",
    borderRadius: "10px",
    border: "none",
    background: "#111827",
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
    marginTop: "5px",
  },
  links: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "25px",
    gap: "15px",
  },
  link: {
    color: "#2563eb",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "14px",
  },
  back: {
    display: "block",
    textAlign: "center",
    marginTop: "30px",
    color: "#6b7280",
    textDecoration: "none",
    fontSize: "14px",
  },
};