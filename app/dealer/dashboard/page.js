“use client”;

import Link from “next/link”;
import { useEffect, useState } from “react”;
import { createClient } from “@/lib/supabase/client”;

export const dynamic = “force-dynamic”;

export default function DealerDashboard() {
const [loading, setLoading] = useState(true);
const [dealer, setDealer] = useState(null);
const [leads, setLeads] = useState([]);
const [error, setError] = useState(””);

useEffect(() => {
async function loadDashboard() {
try {
const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      window.location.href = "/dealer/login";
      return;
    }
    setDealer(user);
    const response = await fetch("/api/leads?limit=100", {
      cache: "no-store",
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data?.error || "Unable to load leads.");
    }
    setLeads(Array.isArray(data.leads) ? data.leads : []);
  } catch (err) {
    console.error(err);
    setError(err.message || "Unable to load dashboard.");
  } finally {
    setLoading(false);
  }
}
loadDashboard();

}, []);

const newLeads = leads.filter((lead) => lead.status === “new”).length;

const activeLeads = leads.filter(
(lead) =>
lead.status === “active” || lead.status === “available”
).length;

const currentMonth = new Date();
const monthlyLeads = leads.filter((lead) => {
if (!lead.created_at) return false;

const date = new Date(lead.created_at);
return (
  date.getMonth() === currentMonth.getMonth() &&
  date.getFullYear() === currentMonth.getFullYear()
);

}).length;

const recentLeads = leads.slice(0, 5);

const dealerName =
dealer?.user_metadata?.name ||
dealer?.user_metadata?.full_name ||
dealer?.email ||
“Dealer”;

return (
NorthSky Auto
    <div style={styles.navLinks}>
      <Link href="/dealer/leads" style={styles.navLink}>
        Vehicle Leads
      </Link>
      <Link href="/dealer/saved" style={styles.navLink}>
        Saved
      </Link>
      <Link href="/dealer/analytics" style={styles.navLink}>
        Analytics
      </Link>
      <Link href="/dealer/profile" style={styles.navLink}>
        Profile
      </Link>
    </div>
  </nav>
  <section style={styles.container}>
    <div style={styles.header}>
      <div>
        <p style={styles.eyebrow}>DEALER PORTAL</p>
        <h1 style={styles.title}>
          Welcome, {dealerName}
        </h1>
        <p style={styles.muted}>
          Manage your NorthSky Auto vehicle opportunities.
        </p>
      </div>
      <Link href="/dealer/leads" style={styles.primaryButton}>
        View Leads
      </Link>
    </div>
    {error && (
      <div style={styles.error}>
        {error}
      </div>
    )}
    <div style={styles.grid}>
      <Stat
        title="New Leads"
        value={loading ? "—" : newLeads}
      />
      <Stat
        title="Active Opportunities"
        value={loading ? "—" : activeLeads}
      />
      <Stat
        title="Saved Vehicles"
        value="—"
      />
      <Stat
        title="Monthly Leads"
        value={loading ? "—" : monthlyLeads}
      />
    </div>
    <section style={styles.panel}>
      <div style={styles.panelHeader}>
        <div>
          <h2 style={styles.panelTitle}>
            Recent Vehicle Opportunities
          </h2>
          <p style={styles.muted}>
            The latest seller submissions available to your dealership.
          </p>
        </div>
        <Link href="/dealer/leads" style={styles.secondaryButton}>
          View All
        </Link>
      </div>
      {loading ? (
        <div style={styles.empty}>
          <h3>Loading opportunities...</h3>
          <p>Please wait while your dealer dashboard loads.</p>
        </div>
      ) : recentLeads.length === 0 ? (
        <div style={styles.empty}>
          <h3>No vehicle opportunities yet</h3>
          <p>
            New seller submissions will appear here when vehicles become
            available through NorthSky Auto.
          </p>
          <Link href="/dealer/leads" style={styles.primaryButton}>
            Browse Leads
          </Link>
        </div>
      ) : (
        <div style={styles.leads}>
          {recentLeads.map((lead) => (
            <Link
              key={lead.id}
              href={`/dealer/leads/${lead.id}`}
              style={styles.lead}
            >
              <div>
                <strong style={styles.vehicle}>
                  {lead.year} {lead.make} {lead.model}
                </strong>
                {lead.trim && (
                  <span style={styles.trim}>
                    {lead.trim}
                  </span>
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
              </div>
              <div style={styles.leadRight}>
                {lead.asking_price != null && (
                  <strong>
                    $
                    {Number(lead.asking_price).toLocaleString()}
                  </strong>
                )}
                <span style={styles.status}>
                  {lead.status}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  </section>
</main>

);
}

function Stat({ title, value }) {
return (
{title}

  <strong style={styles.statValue}>
    {value}
  </strong>
</div>

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
alignItems: “center”,
flexWrap: “wrap”,
},

navLink: {
color: “#374151”,
textDecoration: “none”,
fontSize: 14,
fontWeight: 700,
},

container: {
maxWidth: 1200,
margin: “0 auto”,
padding: “50px 24px”,
},

header: {
display: “flex”,
justifyContent: “space-between”,
alignItems: “center”,
gap: 20,
marginBottom: 35,
flexWrap: “wrap”,
},

eyebrow: {
fontSize: 12,
fontWeight: 800,
letterSpacing: 2,
color: “#2563eb”,
marginBottom: 8,
},

title: {
margin: 0,
fontSize: 36,
lineHeight: 1.15,
},

muted: {
color: “#6b7280”,
marginTop: 8,
},

grid: {
display: “grid”,
gridTemplateColumns: “repeat(auto-fit,minmax(200px,1fr))”,
gap: 20,
marginBottom: 30,
},

stat: {
background: “#fff”,
padding: 25,
borderRadius: 16,
border: “1px solid #e5e7eb”,
},

statTitle: {
color: “#6b7280”,
fontSize: 14,
fontWeight: 700,
margin: 0,
},

statValue: {
display: “block”,
fontSize: 32,
marginTop: 8,
},

panel: {
background: “#fff”,
padding: 30,
borderRadius: 16,
border: “1px solid #e5e7eb”,
},

panelHeader: {
display: “flex”,
justifyContent: “space-between”,
alignItems: “center”,
gap: 20,
marginBottom: 20,
flexWrap: “wrap”,
},

panelTitle: {
margin: 0,
fontSize: 22,
},

primaryButton: {
display: “inline-block”,
background: “#111827”,
color: “#fff”,
padding: “12px 18px”,
borderRadius: 10,
textDecoration: “none”,
fontWeight: 700,
},

secondaryButton: {
display: “inline-block”,
background: “#f3f4f6”,
color: “#111827”,
padding: “10px 15px”,
borderRadius: 10,
textDecoration: “none”,
fontWeight: 700,
fontSize: 14,
},

error: {
background: “#fef2f2”,
color: “#b91c1c”,
border: “1px solid #fecaca”,
padding: 15,
borderRadius: 10,
marginBottom: 20,
},

empty: {
textAlign: “center”,
padding: “60px 20px”,
color: “#6b7280”,
},

leads: {
display: “flex”,
flexDirection: “column”,
gap: 10,
},

lead: {
display: “flex”,
justifyContent: “space-between”,
alignItems: “center”,
gap: 20,
padding: 18,
border: “1px solid #e5e7eb”,
borderRadius: 12,
textDecoration: “none”,
color: “#111827”,
},

vehicle: {
display: “block”,
fontSize: 17,
},

trim: {
display: “block”,
color: “#6b7280”,
fontSize: 14,
marginTop: 3,
},

details: {
display: “flex”,
gap: 12,
flexWrap: “wrap”,
color: “#6b7280”,
fontSize: 13,
marginTop: 8,
},

leadRight: {
textAlign: “right”,
display: “flex”,
flexDirection: “column”,
gap: 6,
whiteSpace: “nowrap”,
},

status: {
display: “inline-block”,
fontSize: 11,
fontWeight: 800,
textTransform: “uppercase”,
color: “#2563eb”,
},
};