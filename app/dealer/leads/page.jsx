"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
export default function DealerLeadsPage() {
  const router = useRouter();
  const supabase = createClient();
  const [user, setUser] = useState(null);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    loadLeads();
  }, []);
  async function loadLeads() {
    setLoading(true);
    setError("");
    try {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();
      if (authError || !user) {
        router.replace("/dealer/login");
        return;
      }
      setUser(user);
      const { data, error: leadsError } = await supabase
        .from("leads")
        .select(`
          id,
          seller_name,
          seller_email,
          seller_phone,
          vehicle_make,
          vehicle_model,
          vehicle_year,
          mileage,
          asking_price,
          description,
          city,
          province,
          status,
          created_at,
          vehicle_id
        `)
        .eq("status", "available")
        .order("created_at", { ascending: false });
      if (leadsError) {
        console.error(leadsError);
        setError("Unable to load vehicle opportunities.");
        return;
      }
      setLeads(data || []);
    } catch (err) {
      console.error(err);
      setError("Something went wrong while loading leads.");
    } finally {
      setLoading(false);
    }
  }
  async function signOut() {
    await supabase.auth.signOut();
    router.replace("/dealer/login");
  }
  function formatPrice(price) {
    if (price === null || price === undefined || price === "") {
      return "Price unavailable";
    }
    return new Intl.NumberFormat("en-CA", {
      style: "currency",
      currency: "CAD",
      maximumFractionDigits: 0,
    }).format(Number(price));
  }
  function formatMileage(mileage) {
    if (mileage === null || mileage === undefined || mileage === "") {
      return "Mileage unavailable";
    }
    return `${Number(mileage).toLocaleString("en-CA")} km`;
  }
  function formatDate(date) {
    if (!date) return "Recently added";
    return new Date(date).toLocaleDateString("en-CA", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
  return (
    <main style={styles.page}>
      {/* HEADER */}
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <Link href="/dealer/dashboard" style={styles.logo}>
            NorthSky <span>Auto</span>
          </Link>
          <nav style={styles.nav}>
            <Link href="/dealer/dashboard" style={styles.navLink}>
              Dashboard
            </Link>
            <Link
              href="/dealer/leads"
              style={{ ...styles.navLink, ...styles.activeNav }}
            >
              Opportunities
            </Link>
            <Link href="/dealer/saved" style={styles.navLink}>
              Saved
            </Link>
            <Link href="/dealer/analytics" style={styles.navLink}>
              Analytics
            </Link>
            <Link href="/dealer/settings" style={styles.navLink}>
              Settings
            </Link>
            <button onClick={signOut} style={styles.signOut}>
              Sign out
            </button>
          </nav>
        </div>
      </header>
      {/* MAIN */}
      <section style={styles.container}>
        <div style={styles.hero}>
          <div>
            <div style={styles.eyebrow}>DEALER MARKETPLACE</div>
            <h1 style={styles.title}>
              Vehicle Opportunities
            </h1>
            <p style={styles.subtitle}>
              Find vehicles available for dealer acquisition through
              NorthSky Auto.
            </p>
          </div>
          <div style={styles.heroBadge}>
            <strong>{leads.length}</strong>
            <span>Available</span>
          </div>
        </div>
        {/* ERROR */}
        {error && (
          <div style={styles.errorBox}>
            <strong>Unable to load opportunities</strong>
            <p>{error}</p>
            <button onClick={loadLeads} style={styles.retryButton}>
              Try again
            </button>
          </div>
        )}
        {/* LOADING */}
        {loading ? (
          <div style={styles.loadingGrid}>
            {[1, 2, 3].map((item) => (
              <div key={item} style={styles.loadingCard}>
                <div style={styles.skeletonSmall}></div>
                <div style={styles.skeletonLarge}></div>
                <div style={styles.skeletonMedium}></div>
                <div style={styles.skeletonButton}></div>
              </div>
            ))}
          </div>
        ) : leads.length === 0 ? (
          /* EMPTY STATE */
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>🚗</div>
            <h2>No vehicle opportunities yet</h2>
            <p>
              New vehicle acquisition opportunities will appear here when
              they become available.
            </p>
            <Link href="/dealer/dashboard" style={styles.primaryButton}>
              Back to Dashboard
            </Link>
          </div>
        ) : (
          /* LEADS */
          <div style={styles.grid}>
            {leads.map((lead) => {
              const vehicleName = [
                lead.vehicle_year,
                lead.vehicle_make,
                lead.vehicle_model,
              ]
                .filter(Boolean)
                .join(" ");
              return (
                <article key={lead.id} style={styles.card}>
                  <div style={styles.cardTop}>
                    <span style={styles.status}>
                      Available
                    </span>
                    <span style={styles.date}>
                      {formatDate(lead.created_at)}
                    </span>
                  </div>
                  <div style={styles.vehicleIcon}>
                    🚙
                  </div>
                  <h2 style={styles.vehicleTitle}>
                    {vehicleName || "Vehicle Opportunity"}
                  </h2>
                  <p style={styles.location}>
                    📍{" "}
                    {lead.city || lead.province
                      ? `${lead.city || ""}${
                          lead.city && lead.province ? ", " : ""
                        }${lead.province || ""}`
                      : "Location unavailable"}
                  </p>
                  <div style={styles.details}>
                    <div>
                      <span style={styles.detailLabel}>
                        Asking Price
                      </span>
                      <strong style={styles.price}>
                        {formatPrice(lead.asking_price)}
                      </strong>
                    </div>
                    <div>
                      <span style={styles.detailLabel}>
                        Mileage
                      </span>
                      <strong style={styles.detailValue}>
                        {formatMileage(lead.mileage)}
                      </strong>
                    </div>
                  </div>
                  {lead.description && (
                    <p style={styles.description}>
                      {lead.description.length > 120
                        ? `${lead.description.slice(0, 120)}...`
                        : lead.description}
                    </p>
                  )}
                  <Link
                    href={`/dealer/leads/${lead.id}`}
                    style={styles.viewButton}
                  >
                    View Opportunity →
                  </Link>
                </article>
              );
            })}
          </div>
        )}
        {/* FOOTER LINKS */}
        <div style={styles.bottomNav}>
          <Link href="/dealer/dashboard">
            ← Dealer Dashboard
          </Link>
          <Link href="/dealer/subscriptions">
            Membership Plans
          </Link>
          <Link href="/dealer/settings">
            Account Settings
          </Link>
        </div>
      </section>
      <footer style={styles.footer}>
        <strong>NorthSky Auto</strong>
        <span>
          Dealer vehicle acquisition marketplace
        </span>
      </footer>
    </main>
  );
}
const styles = {
  page: {
    minHeight: "100vh",
    background: "#f5f7fb",
    color: "#0f172a",
    fontFamily:
      "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
  },
  header: {
    background: "#071426",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
  },
  headerInner: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "18px 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "24px",
  },
  logo: {
    color: "#ffffff",
    textDecoration: "none",
    fontSize: "22px",
    fontWeight: 800,
    letterSpacing: "-0.5px",
  },
  logoSpan: {
    color: "#38bdf8",
  },
  nav: {
    display: "flex",
    alignItems: "center",
    gap: "18px",
    flexWrap: "wrap",
  },
  navLink: {
    color: "#cbd5e1",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: 600,
  },
  activeNav: {
    color: "#ffffff",
  },
  signOut: {
    border: "1px solid rgba(255,255,255,0.18)",
    background: "transparent",
    color: "#ffffff",
    padding: "9px 14px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: 600,
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "52px 24px 70px",
  },
  hero: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "30px",
    marginBottom: "36px",
  },
  eyebrow: {
    fontSize: "12px",
    fontWeight: 800,
    letterSpacing: "1.5px",
    color: "#0284c7",
    marginBottom: "10px",
  },
  title: {
    fontSize: "42px",
    lineHeight: 1.05,
    letterSpacing: "-1.5px",
    margin: 0,
  },
  subtitle: {
    marginTop: "14px",
    marginBottom: 0,
    maxWidth: "650px",
    color: "#64748b",
    fontSize: "17px",
    lineHeight: 1.6,
  },
  heroBadge: {
    minWidth: "130px",
    padding: "20px",
    borderRadius: "16px",
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(15,23,42,0.05)",
  },
  heroBadgeStrong: {
    display: "block",
    fontSize: "30px",
    fontWeight: 800,
  },
  heroBadgeSpan: {
    display: "block",
    color: "#64748b",
    fontSize: "13px",
    marginTop: "3px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
    gap: "22px",
  },
  card: {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "18px",
    padding: "22px",
    boxShadow: "0 10px 30px rgba(15,23,42,0.05)",
  },
  cardTop: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "10px",
  },
  status: {
    display: "inline-flex",
    padding: "6px 10px",
    borderRadius: "999px",
    background: "#dcfce7",
    color: "#166534",
    fontSize: "12px",
    fontWeight: 800,
  },
  date: {
    color: "#94a3b8",
    fontSize: "12px",
  },
  vehicleIcon: {
    marginTop: "22px",
    width: "54px",
    height: "54px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "14px",
    background: "#e0f2fe",
    fontSize: "27px",
  },
  vehicleTitle: {
    fontSize: "22px",
    lineHeight: 1.2,
    margin: "18px 0 8px",
  },
  location: {
    margin: 0,
    color: "#64748b",
    fontSize: "14px",
  },
  details: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
    marginTop: "22px",
    paddingTop: "18px",
    borderTop: "1px solid #e2e8f0",
  },
  detailLabel: {
    display: "block",
    color: "#94a3b8",
    fontSize: "11px",
    textTransform: "uppercase",
    letterSpacing: "0.8px",
    marginBottom: "5px",
  },
  price: {
    fontSize: "18px",
  },
  detailValue: {
    fontSize: "16px",
  },
  description: {
    color: "#64748b",
    fontSize: "14px",
    lineHeight: 1.55,
    marginTop: "18px",
  },
  viewButton: {
    display: "block",
    textAlign: "center",
    marginTop: "20px",
    padding: "12px 16px",
    borderRadius: "10px",
    background: "#0f172a",
    color: "#ffffff",
    textDecoration: "none",
    fontWeight: 700,
    fontSize: "14px",
  },
  emptyState: {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "18px",
    padding: "70px 30px",
    textAlign: "center",
  },
  emptyIcon: {
    fontSize: "48px",
    marginBottom: "14px",
  },
  primaryButton: {
    display: "inline-block",
    marginTop: "18px",
    padding: "12px 18px",
    background: "#0f172a",
    color: "#ffffff",
    borderRadius: "9px",
    textDecoration: "none",
    fontWeight: 700,
  },
  errorBox: {
    background: "#fff1f2",
    border: "1px solid #fecdd3",
    color: "#9f1239",
    borderRadius: "14px",
    padding: "18px",
    marginBottom: "24px",
  },
  retryButton: {
    marginTop: "10px",
    border: "none",
    background: "#9f1239",
    color: "#ffffff",
    padding: "9px 14px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: 700,
  },
  loadingGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
    gap: "22px",
  },
  loadingCard: {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "18px",
    padding: "22px",
  },
  skeletonSmall: {
    width: "90px",
    height: "18px",
    background: "#e2e8f0",
    borderRadius: "6px",
  },
  skeletonLarge: {
    width: "70%",
    height: "26px",
    background: "#e2e8f0",
    borderRadius: "6px",
    marginTop: "24px",
  },
  skeletonMedium: {
    width: "45%",
    height: "18px",
    background: "#e2e8f0",
    borderRadius: "6px",
    marginTop: "15px",
  },
  skeletonButton: {
    width: "100%",
    height: "44px",
    background: "#e2e8f0",
    borderRadius: "9px",
    marginTop: "28px",
  },
  bottomNav: {
    display: "flex",
    justifyContent: "center",
    gap: "25px",
    flexWrap: "wrap",
    marginTop: "45px",
    fontSize: "14px",
  },
  footer: {
    borderTop: "1px solid #e2e8f0",
    padding: "25px 24px",
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    flexWrap: "wrap",
    color: "#64748b",
    fontSize: "13px",
  },
};