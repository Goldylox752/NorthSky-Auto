import Link from “next/link”;

export default function LoginPage() {
return (
NorthSky Auto 🇨🇦
    <div style={styles.badge}>
      NORTHSKY AUTO
    </div>
    <h1 style={styles.title}>
      Welcome back
    </h1>
    <p style={styles.subtitle}>
      Sign in to your NorthSky Auto dealer account to manage
      leads, vehicles, analytics and your subscription.
    </p>
    <Link
      href="/dealer/login"
      style={styles.primaryButton}
    >
      Dealer Login →
    </Link>
    <Link
      href="/dealer/register"
      style={styles.secondaryButton}
    >
      Create Dealer Account
    </Link>
    <div style={styles.divider}>
      <span style={styles.dividerLine} />
      <span style={styles.dividerText}>OR</span>
      <span style={styles.dividerLine} />
    </div>
    <Link href="/sell" style={styles.sellerLink}>
      Selling a vehicle?
      <span style={styles.sellerAction}>
        Submit Your Vehicle →
      </span>
    </Link>
    <Link href="/" style={styles.back}>
      ← Back to NorthSky Auto
    </Link>
  </div>
</main>

);
}

const styles = {
main: {
minHeight: “100vh”,
display: “flex”,
alignItems: “center”,
justifyContent: “center”,
padding: “24px”,
background: “#f3f7fb”,
fontFamily: “Arial, Helvetica, sans-serif”,
},

card: {
width: “100%”,
maxWidth: “460px”,
background: “#ffffff”,
borderRadius: “20px”,
padding: “44px 38px”,
boxShadow: “0 15px 50px rgba(15, 23, 42, 0.08)”,
border: “1px solid #e5e7eb”,
textAlign: “center”,
},

logo: {
display: “block”,
color: “#111827”,
fontSize: “25px”,
fontWeight: “800”,
textDecoration: “none”,
marginBottom: “32px”,
},

badge: {
display: “inline-block”,
color: “#2563eb”,
fontSize: “11px”,
fontWeight: “800”,
letterSpacing: “1.6px”,
marginBottom: “14px”,
},

title: {
margin: “0 0 12px”,
color: “#111827”,
fontSize: “36px”,
lineHeight: “1.15”,
fontWeight: “850”,
},

subtitle: {
margin: “0 auto 30px”,
maxWidth: “380px”,
color: “#6b7280”,
fontSize: “16px”,
lineHeight: “1.65”,
},

primaryButton: {
display: “block”,
width: “100%”,
boxSizing: “border-box”,
padding: “15px 20px”,
background: “#2563eb”,
color: “#ffffff”,
borderRadius: “9px”,
textDecoration: “none”,
fontWeight: “700”,
fontSize: “16px”,
marginBottom: “12px”,
},

secondaryButton: {
display: “block”,
width: “100%”,
boxSizing: “border-box”,
padding: “14px 20px”,
background: “#ffffff”,
color: “#111827”,
border: “1px solid #d1d5db”,
borderRadius: “9px”,
textDecoration: “none”,
fontWeight: “700”,
fontSize: “16px”,
},

divider: {
display: “flex”,
alignItems: “center”,
gap: “12px”,
margin: “30px 0”,
},

dividerLine: {
flex: 1,
height: “1px”,
background: “#e5e7eb”,
},

dividerText: {
color: “#9ca3af”,
fontSize: “11px”,
fontWeight: “700”,
},

sellerLink: {
display: “flex”,
flexDirection: “column”,
gap: “7px”,
color: “#6b7280”,
textDecoration: “none”,
fontSize: “14px”,
lineHeight: “1.5”,
},

sellerAction: {
color: “#2563eb”,
fontWeight: “700”,
},

back: {
display: “block”,
marginTop: “30px”,
color: “#6b7280”,
textDecoration: “none”,
fontSize: “14px”,
},
};