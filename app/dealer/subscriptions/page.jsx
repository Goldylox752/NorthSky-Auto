"use client";
import Link from "next/link";
const plans = [
  {
    name: "Starter",
    price: "$99",
    period: "/month",
    description: "For dealers getting started with NorthSky Auto.",
    features: [
      "Dealer account",
      "Vehicle opportunities",
      "Lead marketplace access",
      "Saved opportunities",
      "Dealer dashboard",
      "Email support",
    ],
    button: "Get Started",
    featured: false,
  },
  {
    name: "Dealer Pro",
    price: "$299",
    period: "/month",
    description: "For active dealers who want more opportunities and tools.",
    features: [
      "Everything in Starter",
      "Priority vehicle opportunities",
      "Advanced lead management",
      "Dealer analytics",
      "Saved opportunities",
      "Priority support",
      "Early access to new features",
    ],
    button: "Choose Dealer Pro",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For dealer groups and larger automotive organizations.",
    features: [
      "Everything in Dealer Pro",
      "Multiple dealer locations",
      "Custom onboarding",
      "Dedicated support",
      "Custom integrations",
      "Volume pricing",
      "Enterprise solutions",
    ],
    button: "Contact NorthSky",
    featured: false,
  },
];
export default function DealerSubscriptionsPage() {
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
            <Link href="/dealer/leads" style={styles.navLink}>
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
          </nav>
        </div>
      </header>
      {/* HERO */}
      <section style={styles.hero}>
        <div style={styles.eyebrow}>DEALER MEMBERSHIP</div>
        <h1 style={styles.title}>
          Choose the right plan for your dealership.
        </h1>
        <p style={styles.subtitle}>
          Get access to NorthSky Auto's dealer marketplace and vehicle
          acquisition opportunities.
        </p>
      </section>
      {/* PLANS */}
      <section style={styles.plansSection}>
        <div style={styles.plansGrid}>
          {plans.map((plan) => (
            <div
              key={plan.name}
              style={{
                ...styles.plan,
                ...(plan.featured ? styles.featuredPlan : {}),
              }}
            >
              {plan.featured && (
                <div style={styles.popular}>
                  MOST POPULAR
                </div>
              )}
              <div style={styles.planContent}>
                <h2 style={styles.planName}>{plan.name}</h2>
                <p style={styles.planDescription}>
                  {plan.description}
                </p>
                <div style={styles.priceRow}>
                  <span
                    style={{
                      ...styles.price,
                      ...(plan.featured ? styles.featuredPrice : {}),
                    }}
                  >
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span style={styles.period}>
                      {plan.period}
                    </span>
                  )}
                </div>
                <Link
                  href={
                    plan.name === "Enterprise"
                      ? "/contact"
                      : "/dealer/register"
                  }
                  style={{
                    ...styles.planButton,
                    ...(plan.featured
                      ? styles.featuredButton
                      : {}),
                  }}
                >
                  {plan.button}
                </Link>
                <div style={styles.divider}></div>
                <div style={styles.includes}>
                  <strong>Includes:</strong>
                </div>
                <ul style={styles.features}>
                  {plan.features.map((feature) => (
                    <li key={feature} style={styles.feature}>
                      <span style={styles.check}>✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* WHY NORTHSKY */}
      <section style={styles.whySection}>
        <div style={styles.sectionHeader}>
          <div style={styles.eyebrow}>WHY NORTHSKY AUTO</div>
          <h2 style={styles.sectionTitle}>
            Built for modern vehicle acquisition.
          </h2>
          <p style={styles.sectionText}>
            NorthSky Auto connects dealerships with vehicle opportunities
            through one centralized dealer marketplace.
          </p>
        </div>
        <div style={styles.benefitGrid}>
          <div style={styles.benefit}>
            <div style={styles.benefitIcon}>🚗</div>
            <h3>Vehicle Opportunities</h3>
            <p>
              Discover vehicles available for dealer acquisition.
            </p>
          </div>
          <div style={styles.benefit}>
            <div style={styles.benefitIcon}>📊</div>
            <h3>Dealer Analytics</h3>
            <p>
              Track your activity and opportunities from one dashboard.
            </p>
          </div>
          <div style={styles.benefit}>
            <div style={styles.benefitIcon}>⚡</div>
            <h3>Faster Acquisition</h3>
            <p>
              Spend less time searching and more time evaluating
              opportunities.
            </p>
          </div>
        </div>
      </section>
      {/* CTA */}
      <section style={styles.ctaSection}>
        <div style={styles.cta}>
          <h2>Ready to grow your inventory?</h2>
          <p>
            Start using NorthSky Auto to discover new vehicle
            opportunities.
          </p>
          <div style={styles.ctaButtons}>
            <Link
              href="/dealer/register"
              style={styles.ctaPrimary}
            >
              Create Dealer Account
            </Link>
            <Link
              href="/dealer/dashboard"
              style={styles.ctaSecondary}
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </section>
      {/* FOOTER */}
      <footer style={styles.footer}>
        <div>
          <strong>NorthSky Auto</strong>
          <span>Dealer vehicle acquisition marketplace</span>
        </div>
        <div style={styles.footerLinks}>
          <Link href="/dealer/dashboard">Dashboard</Link>
          <Link href="/dealer/leads">Opportunities</Link>
          <Link href="/dealer/settings">Settings</Link>
        </div>
      </footer>
    </main>
  );
}
const styles = {
  page: {
    minHeight: "100vh",
    background: "#f6f8fb",
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
    gap: "25px",
  },
  logo: {
    color: "#ffffff",
    textDecoration: "none",
    fontSize: "22px",
    fontWeight: 800,
    letterSpacing: "-0.5px",
  },
  nav: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    flexWrap: "wrap",
  },
  navLink: {
    color: "#cbd5e1",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: 600,
  },
  hero: {
    maxWidth: "850px",
    margin: "0 auto",
    padding: "75px 24px 50px",
    textAlign: "center",
  },
  eyebrow: {
    color: "#0284c7",
    fontSize: "12px",
    fontWeight: 800,
    letterSpacing: "1.7px",
    marginBottom: "13px",
  },
  title: {
    margin: 0,
    fontSize: "clamp(36px, 6vw, 58px)",
    lineHeight: 1.04,
    letterSpacing: "-2px",
    fontWeight: 850,
  },
  subtitle: {
    maxWidth: "650px",
    margin: "20px auto 0",
    color: "#64748b",
    fontSize: "17px",
    lineHeight: 1.65,
  },
  plansSection: {
    maxWidth: "1180px",
    margin: "0 auto",
    padding: "0 24px 80px",
  },
  plansGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(285px, 1fr))",
    gap: "22px",
    alignItems: "stretch",
  },
  plan: {
    position: "relative",
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 15px 40px rgba(15,23,42,0.06)",
  },
  featuredPlan: {
    border: "2px solid #0284c7",
    transform: "translateY(-7px)",
    boxShadow: "0 20px 50px rgba(2,132,199,0.14)",
  },
  popular: {
    background: "#0284c7",
    color: "#ffffff",
    textAlign: "center",
    fontSize: "11px",
    fontWeight: 900,
    letterSpacing: "1px",
    padding: "9px",
  },
  planContent: {
    padding: "30px",
  },
  planName: {
    margin: 0,
    fontSize: "25px",
    fontWeight: 800,
  },
  planDescription: {
    color: "#64748b",
    minHeight: "68px",
    lineHeight: 1.5,
    fontSize: "14px",
    margin: "10px 0 0",
  },
  priceRow: {
    display: "flex",
    alignItems: "baseline",
    marginTop: "25px",
    marginBottom: "25px",
  },
  price: {
    fontSize: "42px",
    fontWeight: 850,
    letterSpacing: "-1.5px",
  },
  featuredPrice: {
    color: "#0284c7",
  },
  period: {
    color: "#64748b",
    fontSize: "14px",
    marginLeft: "5px",
  },
  planButton: {
    display: "block",
    textAlign: "center",
    padding: "13px 16px",
    borderRadius: "10px",
    background: "#0f172a",
    color: "#ffffff",
    textDecoration: "none",
    fontWeight: 750,
    fontSize: "14px",
  },
  featuredButton: {
    background: "#0284c7",
  },
  divider: {
    height: "1px",
    background: "#e2e8f0",
    margin: "28px 0 20px",
  },
  includes: {
    fontSize: "13px",
    marginBottom: "14px",
  },
  features: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  feature: {
    display: "flex",
    alignItems: "flex-start",
    gap: "10px",
    marginBottom: "13px",
    color: "#475569",
    fontSize: "14px",
    lineHeight: 1.45,
  },
  check: {
    color: "#16a34a",
    fontWeight: 900,
  },
  whySection: {
    background: "#ffffff",
    borderTop: "1px solid #e2e8f0",
    borderBottom: "1px solid #e2e8f0",
    padding: "80px 24px",
  },
  sectionHeader: {
    maxWidth: "700px",
    margin: "0 auto 45px",
    textAlign: "center",
  },
  sectionTitle: {
    margin: 0,
    fontSize: "36px",
    letterSpacing: "-1px",
  },
  sectionText: {
    color: "#64748b",
    lineHeight: 1.6,
    fontSize: "16px",
  },
  benefitGrid: {
    maxWidth: "1050px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
    gap: "24px",
  },
  benefit: {
    padding: "25px",
    border: "1px solid #e2e8f0",
    borderRadius: "16px",
  },
  benefitIcon: {
    fontSize: "28px",
    marginBottom: "15px",
  },
  benefit h3: {
    margin: 0,
    fontSize: "18px",
  },
  benefit p: {
    color: "#64748b",
    fontSize: "14px",
    lineHeight: 1.55,
  },
  ctaSection: {
    maxWidth: "1050px",
    margin: "0 auto",
    padding: "70px 24px",
  },
  cta: {
    background: "#071426",
    color: "#ffffff",
    borderRadius: "22px",
    padding: "55px 30px",
    textAlign: "center",
  },
  cta h2: {
    margin: 0,
    fontSize: "34px",
    letterSpacing: "-1px",
  },
  cta p: {
    color: "#cbd5e1",
    margin: "14px 0 25px",
  },
  ctaButtons: {
    display: "flex",
    justifyContent: "center",
    gap: "12px",
    flexWrap: "wrap",
  },
  ctaPrimary: {
    background: "#0284c7",
    color: "#ffffff",
    padding: "13px 20px",
    borderRadius: "10px",
    textDecoration: "none",
    fontWeight: 800,
  },
  ctaSecondary: {
    background: "#ffffff",
    color: "#0f172a",
    padding: "13px 20px",
    borderRadius: "10px",
    textDecoration: "none",
    fontWeight: 800,
  },
  footer: {
    borderTop: "1px solid #e2e8f0",
    padding: "28px 24px",
    display: "flex",
    justifyContent: "space-between",
    gap: "20px",
    flexWrap: "wrap",
    maxWidth: "1200px",
    margin: "0 auto",
    color: "#64748b",
    fontSize: "13px",
  },
  footerLinks: {
    display: "flex",
    gap: "18px",
  },
};