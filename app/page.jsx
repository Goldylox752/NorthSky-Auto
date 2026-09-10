import Link from "next/link";
export default function HomePage() {
  return (
    <main style={styles.main}>
      {/* NAVIGATION */}
      <nav style={styles.nav}>
        <Link href="/" style={styles.logo}>
          NorthSky Auto 🇨🇦
        </Link>
        <div style={styles.navLinks}>
          <Link href="/sell" style={styles.navLink}>
            Sell a Vehicle
          </Link>
          <Link href="/dealer" style={styles.navLink}>
            For Dealers
          </Link>
          <Link href="/pricing" style={styles.navLink}>
            Pricing
          </Link>
          <Link href="/login" style={styles.loginLink}>
            Login
          </Link>
        </div>
      </nav>
      {/* HERO */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <div style={styles.badge}>
            CANADIAN VEHICLE MARKETPLACE
          </div>
          <h1 style={styles.title}>
            Sell Your Vehicle.
            <br />
            <span style={styles.highlight}>Reach Dealers.</span>
          </h1>
          <p style={styles.subtitle}>
            NorthSky Auto connects vehicle sellers with Canadian dealers
            looking for quality inventory.
          </p>
          <div style={styles.buttons}>
            <Link href="/sell" style={styles.primaryButton}>
              Sell My Vehicle →
            </Link>
            <Link href="/dealer" style={styles.secondaryButton}>
              I'm a Dealer
            </Link>
          </div>
          <p style={styles.heroNote}>
            Simple submission. Dealer exposure. No obligation.
          </p>
        </div>
      </section>
      {/* HOW IT WORKS */}
      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <div style={styles.smallLabel}>HOW IT WORKS</div>
          <h2 style={styles.sectionTitle}>
            A simpler way to connect vehicles with dealers.
          </h2>
          <p style={styles.sectionSubtitle}>
            Submit your vehicle once and let NorthSky Auto help connect
            you with participating dealers.
          </p>
        </div>
        <div style={styles.steps}>
          <Step
            number="01"
            title="Submit Your Vehicle"
            text="Tell us about your vehicle, including mileage, condition, location and selling details."
          />
          <Step
            number="02"
            title="Reach Dealers"
            text="Your vehicle information becomes available to participating dealers looking for inventory."
          />
          <Step
            number="03"
            title="Get Connected"
            text="Interested dealers can review the opportunity and connect with you."
          />
        </div>
      </section>
      {/* SELLER SECTION */}
      <section style={styles.splitSection}>
        <div style={styles.splitContent}>
          <div style={styles.smallLabel}>FOR SELLERS</div>
          <h2 style={styles.bigHeading}>
            Turn your vehicle into an opportunity.
          </h2>
          <p style={styles.text}>
            Instead of contacting dealerships one by one, submit your
            vehicle through NorthSky Auto and reach dealers looking for
            inventory.
          </p>
          <div style={styles.featureList}>
            <div style={styles.feature}>
              <span style={styles.check}>✓</span>
              Submit your vehicle online
            </div>
            <div style={styles.feature}>
              <span style={styles.check}>✓</span>
              Reach participating dealers
            </div>
            <div style={styles.feature}>
              <span style={styles.check}>✓</span>
              Get connected with interested buyers
            </div>
          </div>
          <Link href="/sell" style={styles.primaryButton}>
            Sell Your Vehicle →
          </Link>
        </div>
        {/* VEHICLE PREVIEW */}
        <div style={styles.vehicleCard}>
          <div style={styles.vehicleTop}>
            <span style={styles.vehicleBadge}>
              VEHICLE OPPORTUNITY
            </span>
            <span style={styles.vehicleStatus}>
              Available
            </span>
          </div>
          <div style={styles.vehicleIcon}>🚗</div>
          <h3 style={styles.vehicleTitle}>
            Your Vehicle Could Be Here
          </h3>
          <p style={styles.vehicleDescription}>
            Submit your vehicle details and make your opportunity
            visible to participating dealers.
          </p>
          <div style={styles.vehicleDetails}>
            <span>📍 Canada</span>
            <span>✓ Dealer Ready</span>
          </div>
          <Link href="/sell" style={styles.cardButton}>
            Submit Vehicle →
          </Link>
        </div>
      </section>
      {/* DEALER SECTION */}
      <section style={styles.dealerSection}>
        <div style={styles.dealerContent}>
          <div style={styles.dealerLabel}>FOR DEALERS</div>
          <h2 style={styles.dealerHeading}>
            Find inventory faster.
          </h2>
          <p style={styles.dealerText}>
            Discover vehicle opportunities from sellers and find
            inventory that fits your dealership.
          </p>
          <div style={styles.dealerFeatures}>
            <div>✓ Browse vehicle opportunities</div>
            <div>✓ Review seller information</div>
            <div>✓ Connect with potential sellers</div>
          </div>
          <div style={styles.buttons}>
            <Link href="/dealer" style={styles.dealerButton}>
              Explore Dealer Portal →
            </Link>
            <Link href="/pricing" style={styles.dealerOutlineButton}>
              View Dealer Pricing
            </Link>
          </div>
        </div>
      </section>
      {/* WHY NORTHSKY */}
      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <div style={styles.smallLabel}>WHY NORTHSKY AUTO</div>
          <h2 style={styles.sectionTitle}>
            Built to make vehicle connections simpler.
          </h2>
        </div>
        <div style={styles.benefits}>
          <Benefit
            icon="🇨🇦"
            title="Canadian Focus"
            text="Built around connecting Canadian vehicle sellers and automotive dealers."
          />
          <Benefit
            icon="⚡"
            title="Simple Process"
            text="Submit vehicle information online without having to contact dealerships one by one."
          />
          <Benefit
            icon="🤝"
            title="Better Connections"
            text="Bring sellers and dealers together in one marketplace."
          />
        </div>
      </section>
      {/* FINAL CTA */}
      <section style={styles.cta}>
        <div style={styles.ctaContent}>
          <div style={styles.smallLabel}>GET STARTED</div>
          <h2 style={styles.ctaTitle}>
            Ready to connect?
          </h2>
          <p style={styles.ctaText}>
            Whether you're selling a vehicle or looking for inventory,
            NorthSky Auto helps connect both sides of the automotive
            marketplace.
          </p>
          <div style={styles.buttons}>
            <Link href="/sell" style={styles.primaryButton}>
              Sell a Vehicle →
            </Link>
            <Link href="/dealer" style={styles.secondaryButton}>
              Join as a Dealer
            </Link>
          </div>
        </div>
      </section>
      {/* FOOTER */}
      <footer style={styles.footer}>
        <div style={styles.footerInner}>
          <div>
            <Link href="/" style={styles.footerLogo}>
              NorthSky Auto 🇨🇦
            </Link>
            <p style={styles.footerText}>
              Connecting Canadian vehicle sellers and automotive dealers.
            </p>
          </div>
          <div style={styles.footerLinks}>
            <Link href="/sell">Sell</Link>
            <Link href="/dealer">Dealers</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </div>
        </div>
        <div style={styles.copyright}>
          © 2026 NorthSky Auto. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
function Step({ number, title, text }) {
  return (
    <div style={styles.step}>
      <div style={styles.number}>{number}</div>
      <h3 style={styles.stepTitle}>
        {title}
      </h3>
      <p style={styles.text}>
        {text}
      </p>
    </div>
  );
}
function Benefit({ icon, title, text }) {
  return (
    <div style={styles.benefit}>
      <div style={styles.benefitIcon}>
        {icon}
      </div>
      <h3 style={styles.benefitTitle}>
        {title}
      </h3>
      <p style={styles.text}>
        {text}
      </p>
    </div>
  );
}
const styles = {
  main: {
    minHeight: "100vh",
    background: "#ffffff",
    color: "#111827",
    fontFamily: "Arial, Helvetica, sans-serif",
  },
  nav: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px 24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    flexWrap: "wrap",
  },
  logo: {
    fontSize: "22px",
    fontWeight: "800",
    color: "#111827",
    textDecoration: "none",
    whiteSpace: "nowrap",
  },
  navLinks: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  navLink: {
    color: "#4b5563",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "15px",
  },
  loginLink: {
    color: "#ffffff",
    background: "#111827",
    textDecoration: "none",
    fontWeight: "700",
    fontSize: "15px",
    padding: "10px 18px",
    borderRadius: "8px",
  },
  hero: {
    background: "#f3f7fb",
    padding: "105px 24px 100px",
    textAlign: "center",
    borderTop: "1px solid #eef2f7",
  },
  heroContent: {
    maxWidth: "900px",
    margin: "0 auto",
  },
  badge: {
    display: "inline-block",
    fontSize: "12px",
    fontWeight: "800",
    letterSpacing: "1.8px",
    color: "#2563eb",
    marginBottom: "20px",
  },
  title: {
    fontSize: "clamp(44px, 7vw, 78px)",
    lineHeight: "1.04",
    margin: "0 0 25px",
    fontWeight: "900",
    letterSpacing: "-2px",
  },
  highlight: {
    color: "#2563eb",
  },
  subtitle: {
    fontSize: "20px",
    lineHeight: "1.65",
    maxWidth: "700px",
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
    boxShadow: "0 5px 15px rgba(37, 99, 235, 0.15)",
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
  heroNote: {
    marginTop: "22px",
    fontSize: "14px",
    color: "#6b7280",
  },
  section: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "90px 24px",
  },
  sectionHeader: {
    maxWidth: "760px",
    margin: "0 auto 50px",
    textAlign: "center",
  },
  smallLabel: {
    fontSize: "12px",
    fontWeight: "800",
    letterSpacing: "1.6px",
    color: "#2563eb",
    marginBottom: "15px",
  },
  sectionTitle: {
    fontSize: "clamp(32px, 5vw, 44px)",
    lineHeight: "1.15",
    margin: "0 0 15px",
    fontWeight: "800",
  },
  sectionSubtitle: {
    color: "#6b7280",
    fontSize: "18px",
    lineHeight: "1.6",
    margin: "0",
  },
  steps: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
    gap: "24px",
  },
  step: {
    padding: "32px",
    border: "1px solid #e5e7eb",
    borderRadius: "14px",
    background: "#ffffff",
    boxShadow: "0 5px 20px rgba(15, 23, 42, 0.04)",
  },
  number: {
    fontSize: "14px",
    fontWeight: "800",
    color: "#2563eb",
    marginBottom: "18px",
  },
  stepTitle: {
    fontSize: "21px",
    margin: "0 0 12px",
    fontWeight: "800",
  },
  text: {
    color: "#6b7280",
    lineHeight: "1.7",
    margin: "0 0 25px",
  },
  splitSection: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "90px 24px",
    display: "grid",
    gridTemplateColumns: "1.15fr 1fr",
    gap: "70px",
    alignItems: "center",
  },
  splitContent: {
    maxWidth: "620px",
  },
  bigHeading: {
    fontSize: "clamp(34px, 5vw, 48px)",
    lineHeight: "1.12",
    margin: "0 0 20px",
    fontWeight: "850",
  },
  featureList: {
    display: "grid",
    gap: "13px",
    marginBottom: "30px",
  },
  feature: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontWeight: "600",
    color: "#374151",
  },
  check: {
    color: "#2563eb",
    fontWeight: "900",
  },
  vehicleCard: {
    padding: "34px",
    borderRadius: "20px",
    background: "#f3f7fb",
    border: "1px solid #e5e7eb",
    boxShadow: "0 15px 40px rgba(15, 23, 42, 0.07)",
  },
  vehicleTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "10px",
    marginBottom: "30px",
  },
  vehicleBadge: {
    fontSize: "10px",
    fontWeight: "800",
    letterSpacing: "1px",
    color: "#2563eb",
  },
  vehicleStatus: {
    fontSize: "12px",
    fontWeight: "700",
    color: "#166534",
    background: "#dcfce7",
    padding: "6px 10px",
    borderRadius: "999px",
  },
  vehicleIcon: {
    fontSize: "58px",
    marginBottom: "18px",
  },
  vehicleTitle: {
    fontSize: "26px",
    margin: "0 0 12px",
    fontWeight: "800",
  },
  vehicleDescription: {
    color: "#6b7280",
    lineHeight: "1.6",
    marginBottom: "25px",
  },
  vehicleDetails: {
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
    padding: "15px 0",
    borderTop: "1px solid #dbe3ec",
    borderBottom: "1px solid #dbe3ec",
    fontSize: "13px",
    fontWeight: "600",
    color: "#4b5563",
    marginBottom: "22px",
  },
  cardButton: {
    display: "block",
    textAlign: "center",
    padding: "13px 20px",
    background: "#111827",
    color: "#ffffff",
    textDecoration: "none",
    borderRadius: "8px",
    fontWeight: "700",
  },
  dealerSection: {
    background: "#111827",
    color: "#ffffff",
    padding: "95px 24px",
  },
  dealerContent: {
    maxWidth: "820px",
    margin: "0 auto",
    textAlign: "center",
  },
  dealerLabel: {
    fontSize: "12px",
    fontWeight: "800",
    letterSpacing: "1.6px",
    color: "#93c5fd",
    marginBottom: "15px",
  },
  dealerHeading: {
    fontSize: "clamp(38px, 6vw, 54px)",
    lineHeight: "1.1",
    margin: "0 0 20px",
    fontWeight: "850",
  },
  dealerText: {
    color: "#d1d5db",
    fontSize: "19px",
    lineHeight: "1.65",
    maxWidth: "650px",
    margin: "0 auto 30px",
  },
  dealerFeatures: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap",
    color: "#e5e7eb",
    fontSize: "14px",
    fontWeight: "600",
    marginBottom: "35px",
  },
  dealerButton: {
    display: "inline-block",
    padding: "15px 25px",
    background: "#2563eb",
    color: "#ffffff",
    textDecoration: "none",
    borderRadius: "8px",
    fontWeight: "700",
  },
  dealerOutlineButton: {
    display: "inline-block",
    padding: "15px 25px",
    background: "transparent",
    color: "#ffffff",
    textDecoration: "none",
    borderRadius: "8px",
    border: "1px solid #4b5563",
    fontWeight: "700",
  },
  benefits: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "24px",
  },
  benefit: {
    padding: "30px",
    textAlign: "center",
    border: "1px solid #e5e7eb",
    borderRadius: "14px",
  },
  benefitIcon: {
    fontSize: "38px",
    marginBottom: "15px",
  },
  benefitTitle: {
    fontSize: "21px",
    margin: "0 0 10px",
    fontWeight: "800",
  },
  cta: {
    padding: "100px 24px",
    textAlign: "center",
    background: "#f3f7fb",
  },
  ctaContent: {
    maxWidth: "750px",
    margin: "0 auto",
  },
  ctaTitle: {
    fontSize: "clamp(38px, 6vw, 52px)",
    margin: "0 0 15px",
    fontWeight: "850",
  },
  ctaText: {
    color: "#6b7280",
    fontSize: "18px",
    maxWidth: "650px",
    margin: "0 auto 30px",
    lineHeight: "1.6",
  },
  footer: {
    padding: "50px 24px 25px",
    borderTop: "1px solid #e5e7eb",
    color: "#6b7280",
  },
  footerInner: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "30px",
    flexWrap: "wrap",
  },
  footerLogo: {
    color: "#111827",
    fontSize: "20px",
    fontWeight: "800",
    textDecoration: "none",
  },
  footerText: {
    marginTop: "8px",
    fontSize: "14px",
  },
  footerLinks: {
    display: "flex",
    gap: "18px",
    flexWrap: "wrap",
  },
  copyright: {
    maxWidth: "1200px",
    margin: "35px auto 0",
    paddingTop: "20px",
    borderTop: "1px solid #e5e7eb",
    fontSize: "13px",
    textAlign: "center",
  },
};