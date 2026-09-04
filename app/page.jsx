export default function HomePage() {
  return (
    <main style={styles.main}>
      {/* NAVIGATION */}
      <nav style={styles.nav}>
        <div style={styles.logo}>NorthSky Auto 🇨🇦</div>

        <div style={styles.navLinks}>
          <a href="/sell">Sell a Vehicle</a>
          <a href="/dealer">For Dealers</a>
          <a href="/pricing">Pricing</a>
          <a href="/login">Login</a>
        </div>
      </nav>

      {/* HERO */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <div style={styles.badge}>CANADIAN VEHICLE MARKETPLACE</div>

          <h1 style={styles.title}>
            Sell Your Vehicle.
            <br />
            <span style={styles.highlight}>Reach Dealers.</span>
          </h1>

          <p style={styles.subtitle}>
            NorthSky Auto connects vehicle sellers with Canadian dealers
            looking for inventory.
          </p>

          <div style={styles.buttons}>
            <a href="/sell" style={styles.primaryButton}>
              Sell My Vehicle →
            </a>

            <a href="/dealer" style={styles.secondaryButton}>
              I'm a Dealer
            </a>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>How NorthSky Auto Works</h2>

        <p style={styles.sectionSubtitle}>
          A simpler way to connect vehicles with dealers.
        </p>

        <div style={styles.steps}>
          <Step
            number="01"
            title="Submit Your Vehicle"
            text="Enter your vehicle details, mileage, condition and location."
          />

          <Step
            number="02"
            title="Reach Dealers"
            text="Your vehicle becomes available to participating dealers."
          />

          <Step
            number="03"
            title="Get Connected"
            text="Interested dealers can review the opportunity and connect."
          />
        </div>
      </section>

      {/* SELLER SECTION */}
      <section style={styles.splitSection}>
        <div>
          <div style={styles.smallLabel}>FOR SELLERS</div>

          <h2 style={styles.bigHeading}>
            Turn your vehicle into an opportunity.
          </h2>

          <p style={styles.text}>
            Stop calling dealerships one by one. Submit your vehicle through
            NorthSky Auto and reach dealers looking for inventory.
          </p>

          <a href="/sell" style={styles.primaryButton}>
            Sell Your Vehicle →
          </a>
        </div>

        <div style={styles.card}>
          <div style={styles.cardIcon}>🚗</div>
          <h3 style={styles.cardTitle}>Ready to Sell?</h3>
          <p style={styles.text}>
            Submit your vehicle information and start connecting with dealers.
          </p>
        </div>
      </section>

      {/* DEALER SECTION */}
      <section style={styles.dealerSection}>
        <div style={styles.dealerContent}>
          <div style={styles.smallLabel}>FOR DEALERS</div>

          <h2 style={styles.bigHeading}>
            Find inventory faster.
          </h2>

          <p style={styles.text}>
            Discover vehicle opportunities from sellers and find inventory
            that fits your dealership.
          </p>

          <a href="/dealer" style={styles.secondaryButton}>
            Explore Dealer Portal →
          </a>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={styles.cta}>
        <h2 style={styles.ctaTitle}>
          Ready to get started?
        </h2>

        <p style={styles.ctaText}>
          Whether you're selling a vehicle or looking for inventory,
          NorthSky Auto connects both sides.
        </p>

        <div style={styles.buttons}>
          <a href="/sell" style={styles.primaryButton}>
            Sell a Vehicle
          </a>

          <a href="/dealer" style={styles.secondaryButton}>
            Join as a Dealer
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <div style={styles.logo}>NorthSky Auto 🇨🇦</div>

        <p>Connecting Canadian sellers and automotive dealers.</p>

        <p style={styles.copyright}>
          © 2026 NorthSky Auto. All rights reserved.
        </p>
      </footer>
    </main>
  );
}

function Step({ number, title, text }) {
  return (
    <div style={styles.step}>
      <div style={styles.number}>{number}</div>
      <h3 style={styles.stepTitle}>{title}</h3>
      <p style={styles.text}>{text}</p>
    </div>
  );
}

const styles = {
  main: {
    minHeight: "100vh",
    background: "#ffffff",
    color: "#111827",
    fontFamily:
      "Arial, Helvetica, sans-serif",
  },

  nav: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "22px 24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
  },

  logo: {
    fontSize: "22px",
    fontWeight: "800",
    whiteSpace: "nowrap",
  },

  navLinks: {
    display: "flex",
    gap: "24px",
    alignItems: "center",
    flexWrap: "wrap",
  },

  hero: {
    background: "#f3f7fb",
    padding: "100px 24px",
    textAlign: "center",
  },

  heroContent: {
    maxWidth: "850px",
    margin: "0 auto",
  },

  badge: {
    display: "inline-block",
    fontSize: "12px",
    fontWeight: "700",
    letterSpacing: "1.5px",
    marginBottom: "20px",
  },

  title: {
    fontSize: "clamp(44px, 7vw, 76px)",
    lineHeight: "1.05",
    margin: "0 0 24px",
    fontWeight: "900",
  },

  highlight: {
    color: "#2563eb",
  },

  subtitle: {
    fontSize: "20px",
    lineHeight: "1.6",
    maxWidth: "680px",
    margin: "0 auto 36px",
    color: "#4b5563",
  },

  buttons: {
    display: "flex",
    justifyContent: "center",
    gap: "14px",
    flexWrap: "wrap",
  },

  primaryButton: {
    display: "inline-block",
    padding: "15px 25px",
    background: "#2563eb",
    color: "#ffffff",
    textDecoration: "none",
    borderRadius: "8px",
    fontWeight: "700",
  },

  secondaryButton: {
    display: "inline-block",
    padding: "15px 25px",
    background: "#ffffff",
    color: "#111827",
    textDecoration: "none",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    fontWeight: "700",
  },

  section: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "90px 24px",
    textAlign: "center",
  },

  sectionTitle: {
    fontSize: "42px",
    marginBottom: "12px",
  },

  sectionSubtitle: {
    color: "#6b7280",
    fontSize: "18px",
    marginBottom: "50px",
  },

  steps: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "30px",
    textAlign: "left",
  },

  step: {
    padding: "30px",
    border: "1px solid #e5e7eb",
    borderRadius: "14px",
    background: "#ffffff",
  },

  number: {
    fontSize: "14px",
    fontWeight: "800",
    color: "#2563eb",
    marginBottom: "18px",
  },

  stepTitle: {
    fontSize: "21px",
    marginBottom: "10px",
  },

  text: {
    color: "#6b7280",
    lineHeight: "1.7",
  },

  splitSection: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "90px 24px",
    display: "grid",
    gridTemplateColumns: "1.3fr 1fr",
    gap: "60px",
    alignItems: "center",
  },

  smallLabel: {
    fontSize: "12px",
    fontWeight: "800",
    letterSpacing: "1.5px",
    color: "#2563eb",
    marginBottom: "15px",
  },

  bigHeading: {
    fontSize: "44px",
    lineHeight: "1.15",
    margin: "0 0 20px",
  },

  card: {
    padding: "40px",
    borderRadius: "18px",
    background: "#f3f7fb",
  },

  cardIcon: {
    fontSize: "45px",
    marginBottom: "20px",
  },

  cardTitle: {
    fontSize: "26px",
    marginBottom: "10px",
  },

  dealerSection: {
    background: "#111827",
    color: "#ffffff",
    padding: "90px 24px",
  },

  dealerContent: {
    maxWidth: "800px",
    margin: "0 auto",
    textAlign: "center",
  },

  cta: {
    padding: "100px 24px",
    textAlign: "center",
    background: "#f3f7fb",
  },

  ctaTitle: {
    fontSize: "44px",
    marginBottom: "15px",
  },

  ctaText: {
    color: "#6b7280",
    fontSize: "18px",
    maxWidth: "650px",
    margin: "0 auto 30px",
    lineHeight: "1.6",
  },

  footer: {
    padding: "45px 24px",
    textAlign: "center",
    borderTop: "1px solid #e5e7eb",
    color: "#6b7280",
  },

  copyright: {
    marginTop: "20px",
    fontSize: "13px",
  },
};