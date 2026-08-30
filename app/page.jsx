export default function HomePage() {
  return (
    <main style={styles.main}>
      <nav style={styles.nav}>
        <div style={styles.logo}>NorthSky Auto</div>
        <div style={styles.navLinks}>
          <a href="#how-it-works">How It Works</a>
          <a href="#dealers">For Dealers</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>
      <section style={styles.hero}>
        <div style={styles.badge}>
          🇨🇦 Built for Canadian Auto Sales
        </div>
        <h1 style={styles.title}>
          Turn Vehicle Sellers Into
          <span style={styles.highlight}>
            Dealer Opportunities.
          </span>
        </h1>
        <p style={styles.subtitle}>
          NorthSky Auto connects vehicle sellers with
          dealerships looking for their next customer
          and next vehicle opportunity.
        </p>
        <div style={styles.buttons}>
          <a href="/sell" style={styles.primaryButton}>
            Sell Your Vehicle
          </a>
          <a href="/dealer" style={styles.secondaryButton}>
            Dealer Portal
          </a>
        </div>
      </section>
      <section id="how-it-works" style={styles.section}>
        <h2>How NorthSky Auto Works</h2>
        <div style={styles.cards}>
          <div style={styles.card}>
            <div style={styles.number}>1</div>
            <h3>Submit Your Vehicle</h3>
            <p>
              Tell us about the vehicle you want to
              sell or trade.
            </p>
          </div>
          <div style={styles.card}>
            <div style={styles.number}>2</div>
            <h3>Get Connected</h3>
            <p>
              Your vehicle opportunity can be matched
              with participating dealerships.
            </p>
          </div>
          <div style={styles.card}>
            <div style={styles.number}>3</div>
            <h3>Close the Deal</h3>
            <p>
              Dealers follow up and work directly
              with qualified sellers.
            </p>
          </div>
        </div>
      </section>
      <section id="dealers" style={styles.dealerSection}>
        <h2>Built for Dealers</h2>
        <p>
          Stop relying only on traditional advertising.
          NorthSky Auto gives dealerships another way
          to discover vehicle opportunities and potential
          customers.
        </p>
        <a href="/dealer" style={styles.primaryButton}>
          Join NorthSky Auto
        </a>
      </section>
      <footer id="contact" style={styles.footer}>
        <strong>NorthSky Auto</strong>
        <span>
          © 2026 NorthSky Auto. All rights reserved.
        </span>
      </footer>
    </main>
  );
}
const styles = {
  main: {
    minHeight: "100vh",
    background: "#f8fafc",
    color: "#0f172a",
    fontFamily: "Arial, sans-serif",
  },
  nav: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    fontSize: "22px",
    fontWeight: "800",
  },
  navLinks: {
    display: "flex",
    gap: "24px",
  },
  hero: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "100px 24px",
    textAlign: "center",
  },
  badge: {
    display: "inline-block",
    padding: "8px 14px",
    borderRadius: "999px",
    background: "#e2e8f0",
    fontSize: "14px",
    fontWeight: "600",
    marginBottom: "24px",
  },
  title: {
    fontSize: "clamp(42px, 7vw, 76px)",
    lineHeight: "1.05",
    margin: "0",
    fontWeight: "900",
  },
  highlight: {
    display: "block",
  },
  subtitle: {
    maxWidth: "680px",
    margin: "28px auto",
    fontSize: "20px",
    lineHeight: "1.6",
    color: "#475569",
  },
  buttons: {
    display: "flex",
    justifyContent: "center",
    gap: "14px",
    flexWrap: "wrap",
    marginTop: "32px",
  },
  primaryButton: {
    display: "inline-block",
    padding: "15px 24px",
    background: "#0f172a",
    color: "#fff",
    borderRadius: "10px",
    textDecoration: "none",
    fontWeight: "700",
  },
  secondaryButton: {
    display: "inline-block",
    padding: "15px 24px",
    background: "#fff",
    color: "#0f172a",
    border: "1px solid #cbd5e1",
    borderRadius: "10px",
    textDecoration: "none",
    fontWeight: "700",
  },
  section: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "80px 24px",
    textAlign: "center",
  },
  cards: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    marginTop: "40px",
  },
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "16px",
    border: "1px solid #e2e8f0",
    textAlign: "left",
  },
  number: {
    fontSize: "32px",
    fontWeight: "900",
    marginBottom: "15px",
  },
  dealerSection: {
    maxWidth: "900px",
    margin: "40px auto",
    padding: "80px 24px",
    textAlign: "center",
    background: "#e2e8f0",
    borderRadius: "24px",
  },
  footer: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "40px 24px",
    display: "flex",
    justifyContent: "space-between",
    gap: "20px",
    flexWrap: "wrap",
    color: "#64748b",
  },
};