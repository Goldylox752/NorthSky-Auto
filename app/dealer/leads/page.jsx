“use client”;

import Link from “next/link”;
import { useEffect, useState } from “react”;

export default function DealerLeads() {
const [leads, setLeads] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(””);

useEffect(() => {
async function loadLeads() {
try {
const response = await fetch(”/api/leads?limit=100”, {
cache: “no-store”,
});

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data?.error || "Unable to load vehicle leads.");
    }
    setLeads(Array.isArray(data.leads) ? data.leads : []);
  } catch (err) {
    console.error(err);
    setError(err.message || "Unable to load vehicle leads.");
  } finally {
    setLoading(false);
  }
}
loadLeads();

}, []);

return (
NorthSky Auto
    <div style={styles.navLinks}>
      <Link href="/dealer/dashboard">Dashboard</Link>
      <Link href="/dealer/saved">Saved</Link>
      <Link href="/dealer/analytics">Analytics</Link>
      <Link href="/dealer/profile">Profile</Link>
    </div>
  </nav>
  <div style={styles.container}>
    <Link href="/dealer/dashboard" style={styles.back}>
      ← Dashboard
    </Link>
    <div style={styles.header}>
      <div>
        <p style={styles.eyebrow}>DEALER MARKETPLACE</p>
        <h1 style={styles.title}>Vehicle Leads</h1>
        <p style={styles.muted}>
          Browse vehicle acquisition opportunities from NorthSky Auto
          sellers.
        </p>
      </div>
      <div style={styles.count}>
        {loading ? "Loading..." : `${leads.length} opportunities`}
      </div>
    </div>
    {error && (
      <div style={styles.error}>
        {error}
      </div>
    )}
    {loading ? (
      <div style={styles.panel}>
        <div style={styles.empty}>
          <h2>Loading vehicle opportunities...</h2>
          <p>
            We're checking the NorthSky Auto marketplace for available
            seller submissions.
          </p>
        </div>
      </div>
    ) : leads.length === 0 ? (
      <div style={styles.panel}>
        <div style={styles.empty}>
          <div style={styles.emptyIcon}>🚗</div>
          <h2>No leads available</h2>
          <p>
            New vehicle submissions will appear here when sellers submit
            vehicles through NorthSky Auto.
          </p>
          <Link href="/sell" style={styles.primaryButton}>
            View Seller Page
          </Link>
        </div>
      </div>
    ) : (
      <div style={styles.grid}>
        {leads.map((lead) => (
          <Link
            key={lead.id}
            href={`/dealer/leads/${lead.id}`}
            style={styles.card}
          >
            <div style={styles.cardTop}>
              <span style={styles.status}>
                {lead.status || "available"}
              </span>
              {lead.asking_price != null && (
                <strong style={styles.price}>
                  ${Number(lead.asking_price).toLocaleString()}
                </strong>
              )}
            </div>
            <h2 style={styles.vehicle}>
              {lead.year} {lead.make} {lead.model}
            </h2>
            {lead.trim && (
              <p style={styles.trim}>
                {lead.trim}
              </p>
            )}
            <div style={styles.details}>
              {lead.mileage != null && (
                <span>
                  {Number(lead.mileage).toLocaleString()} km
                </span>
              )}
              {lead.condition && (
                <span>{lead.condition}</span>
              )}
              {lead.postal_code && (
                <span>{lead.postal_code}</span>
              )}
            </div>
            {lead.description && (
              <p style={styles.description}>
                {lead.description.length > 140
                  ? `${lead.description.substring(0, 140)}...`
                  : lead.description}
              </p>
            )}
            <div style={styles.cardBottom}>
              <span>
                View vehicle opportunity
              </span>
              <span style={styles.arrow}>→</span>
            </div>
          </Link>
        ))}
      </div>
    )}
  </div>
</main>

);
}

const styles = {
main: {
minHeight: “100vh”,
background: “#f5f7fa”,
color: “#111827”,
},

nav: {
minHeight: 70,
background: “#fff”,
borderBottom: “1px solid #e5e7eb”,
display: “flex”,
alignItems: “center”,
justifyContent: “space-between”,
padding: “0 6%”,
gap: 20,
flexWrap: “wrap”,
},

logo: {
fontSize: 22,
fontWeight: 800,
color: “#111827”,
textDecoration: “none”,
},

navLinks: {
display: “flex”,
gap: 18,
flexWrap: “wrap”,
fontSize: 14,
fontWeight: 700,
},

container: {
maxWidth: 1150,
margin: “0 auto”,
padding: “45px 24px 70px”,
},

back: {
color: “#2563eb”,
textDecoration: “none”,
fontWeight: 700,
fontSize: 14,
},

header: {
display: “flex”,
justifyContent: “space-between”,
alignItems: “flex-end”,
gap: 20,
marginTop: 30,
marginBottom: 30,
flexWrap: “wrap”,
},

eyebrow: {
color: “#2563eb”,
fontSize: 12,
fontWeight: 800,
letterSpacing: 2,
marginBottom: 8,
},

title: {
margin: 0,
fontSize: 38,
lineHeight: 1.1,
},

muted: {
color: “#6b7280”,
maxWidth: 650,
lineHeight: 1.6,
},

count: {
background: “#fff”,
border: “1px solid #e5e7eb”,
borderRadius: 10,
padding: “10px 14px”,
fontWeight: 700,
fontSize: 14,
},

error: {
background: “#fef2f2”,
border: “1px solid #fecaca”,
color: “#b91c1c”,
padding: 15,
borderRadius: 10,
marginBottom: 20,
},

panel: {
background: “#fff”,
border: “1px solid #e5e7eb”,
borderRadius: 16,
padding: 20,
},

empty: {
textAlign: “center”,
padding: “70px 20px”,
color: “#6b7280”,
},

emptyIcon: {
fontSize: 42,
marginBottom: 15,
},

primaryButton: {
display: “inline-block”,
marginTop: 20,
background: “#111827”,
color: “#fff”,
padding: “12px 18px”,
borderRadius: 10,
textDecoration: “none”,
fontWeight: 700,
},

grid: {
display: “grid”,
gridTemplateColumns: “repeat(auto-fit,minmax(290px,1fr))”,
gap: 20,
},

card: {
display: “block”,
background: “#fff”,
border: “1px solid #e5e7eb”,
borderRadius: 16,
padding: 22,
textDecoration: “none”,
color: “#111827”,
},

cardTop: {
display: “flex”,
justifyContent: “space-between”,
alignItems: “center”,
gap: 10,
marginBottom: 15,
},

status: {
color: “#2563eb”,
background: “#eff6ff”,
padding: “5px 9px”,
borderRadius: 999,
fontSize: 11,
fontWeight: 800,
textTransform: “uppercase”,
},

price: {
fontSize: 18,
},

vehicle: {
margin: 0,
fontSize: 21,
},

trim: {
margin: “5px 0 0”,
color: “#6b7280”,
},

details: {
display: “flex”,
flexWrap: “wrap”,
gap: 8,
marginTop: 15,
color: “#6b7280”,
fontSize: 13,
},

description: {
color: “#6b7280”,
fontSize: 14,
lineHeight: 1.5,
marginTop: 18,
},

cardBottom: {
display: “flex”,
justifyContent: “space-between”,
alignItems: “center”,
borderTop: “1px solid #e5e7eb”,
marginTop: 20,
paddingTop: 15,
fontSize: 13,
fontWeight: 700,
color: “#2563eb”,
},

arrow: {
fontSize: 20,
},
};