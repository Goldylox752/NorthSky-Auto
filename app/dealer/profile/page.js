import Link from "next/link";

export default function DealerProfile() {
  return (
    <main style={styles.main}>
      <div style={styles.container}>
        <Link href="/dealer/dashboard" style={styles.back}>
          ← Dashboard
        </Link>

        <h1>Dealer Profile</h1>
        <p style={styles.muted}>
          Manage your dealership information.
        </p>

        <div style={styles.panel}>
          <label>Dealership Name</label>
          <input placeholder="Your dealership" style={styles.input} />

          <label>Business Email</label>
          <input placeholder="dealer@example.com" style={styles.input} />

          <label>Phone</label>
          <input placeholder="780-000-0000" style={styles.input} />

          <button style={styles.button}>Save Changes</button>
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
    maxWidth: 800,
    margin: "auto",
    padding: "50px 24px",
  },
  back: {
    color: "#2563eb",
    textDecoration: "none",
  },
  muted: {
    color: "#6b7280",
  },
  panel: {
    background: "#fff",
    borderRadius: 16,
    padding: 35,
    marginTop: 30,
    border: "1px solid #e5e7eb",
  },
  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: 14,
    margin: "8px 0 20px",
    border: "1px solid #d1d5db",
    borderRadius: 10,
    fontSize: 16,
  },
  button: {
    padding: "12px 18px",
    background: "#111827",
    color: "#fff",
    border: 0,
    borderRadius: 10,
    fontWeight: 700,
  },
};