import Link from "next/link";

export const dynamic = "force-dynamic";

export default function DealerLeads() {
  return (
    <main style={styles.main}>
      <div style={styles.container}>
        <Link href="/dealer/dashboard" style={styles.back}>
          ← Dashboard
        </Link>

        <h1>Vehicle Leads</h1>
        <p style={styles.muted}>
          Browse vehicle acquisition opportunities from NorthSky Auto sellers.
        </p>

        <div style={styles.panel}>
          <h2>No leads available</h2>
          <p>
            New vehicle submissions will appear here when sellers submit
            vehicles.
          </p>
        </div>
      </div>
    </main>
  );
}

const styles = {
  main: {
    minHeight: "100vh",
    background: "#f5f7fa",
  },
  container: {
    maxWidth: 1100,
    margin: "auto",
    padding: "50px 24px",
  },
  back: {
    color: "#2563eb",
    textDecoration: "none",
    fontWeight: 600,
  },
  muted: {
    color: "#6b7280",
  },
  panel: {
    background: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: 16,
    padding: 40,
    marginTop: 30,
  },
};