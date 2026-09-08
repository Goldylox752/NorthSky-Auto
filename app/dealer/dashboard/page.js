import Link from "next/link";

export const dynamic = "force-dynamic";

export default function DealerDashboard() {
  return (
    <main style={styles.main}>
      <nav style={styles.nav}>
        <Link href="/" style={styles.logo}>
          NorthSky Auto
        </Link>

        <div style={styles.navLinks}>
          <Link href="/dealer/leads">Vehicle Leads</Link>
          <Link href="/dealer/vehicles">Vehicles</Link>
          <Link href="/dealer/analytics">Analytics</Link>
          <Link href="/dealer/profile">Profile</Link>
        </div>
      </nav>

      <section style={styles.container}>
        <div style={styles.header}>
          <div>
            <p style={styles.eyebrow}>DEALER PORTAL</p>
            <h1>Dealer Dashboard</h1>
            <p style={styles.muted}>
              Manage your NorthSky Auto vehicle opportunities.
            </p>
          </div>

          <Link href="/dealer/leads" style={styles.primaryButton}>
            View Leads
          </Link>
        </div>

        <div style={styles.grid}>
          <Stat title="New Leads" value="0" />
          <Stat title="Active Vehicles" value="0" />
          <Stat title="Saved Vehicles" value="0" />
          <Stat title="Monthly Leads" value="0" />
        </div>

        <section style={styles.panel}>
          <h2>Recent Vehicle Opportunities</h2>

          <div style={styles.empty}>
            <h3>No vehicle opportunities yet</h3>
            <p>
              New seller submissions that match your dealership will appear
              here.
            </p>

            <Link href="/dealer/leads" style={styles.primaryButton}>
              Browse Leads
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}

function Stat({ title, value }) {
  return (
    <div style={styles.stat}>
      <p>{title}</p>
      <strong>{value}</strong>
    </div>
  );
}

const styles = {
  main: {
    minHeight: "100vh",
    background: "#f5f7fa",
    color: "#111827",
  },
  nav: {
    height: 70,
    background: "#fff",
    borderBottom: "1px solid #e5e7eb",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 6%",
  },
  logo: {
    fontSize: 22,
    fontWeight: 800,
    color: "#111827",
    textDecoration: "none",
  },
  navLinks: {
    display: "flex",
    gap: 20,
  },
  container: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "50px 24px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
    marginBottom: 35,
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: 800,
    letterSpacing: 2,
    color: "#2563eb",
  },
  muted: {
    color: "#6b7280",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
    gap: 20,
    marginBottom: 30,
  },
  stat: {
    background: "#fff",
    padding: 25,
    borderRadius: 16,
    border: "1px solid #e5e7eb",
  },
  panel: {
    background: "#fff",
    padding: 30,
    borderRadius: 16,
    border: "1px solid #e5e7eb",
  },
  empty: {
    textAlign: "center",
    padding: "60px 20px",
    color: "#6b7280",
  },
  primaryButton: {
    display: "inline-block",
    background: "#111827",
    color: "#fff",
    padding: "12px 18px",
    borderRadius: 10,
    textDecoration: "none",
    fontWeight: 700,
  },
};