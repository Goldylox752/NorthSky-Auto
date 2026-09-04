import Link from "next/link";

export default function Layout({ children }) {
  return (
    <div className="site">
      {/* HEADER */}
      <header className="header">
        <div className="container nav">
          <Link href="/" className="logo">
            NorthSky <span>Auto</span>
          </Link>

          <nav className="navLinks">
            <Link href="/vehicles">Browse Vehicles</Link>
            <Link href="/sell">Sell Your Vehicle</Link>
            <Link href="/dealers">For Dealers</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/how-it-works">How It Works</Link>
          </nav>

          <div className="navActions">
            <Link href="/login" className="signIn">
              Sign In
            </Link>

            <Link href="/sell" className="getStarted">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* PAGE CONTENT */}
      <main>{children}</main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container footerGrid">
          <div>
            <Link href="/" className="footerLogo">
              NorthSky Auto
            </Link>

            <p>
              Connecting Canadian vehicle sellers with automotive dealers.
            </p>
          </div>

          <div>
            <h4>Marketplace</h4>
            <Link href="/vehicles">Browse Vehicles</Link>
            <Link href="/sell">Sell Your Vehicle</Link>
          </div>

          <div>
            <h4>Dealers</h4>
            <Link href="/dealers">Dealer Portal</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/dealer/leads">Dealer Leads</Link>
          </div>

          <div>
            <h4>Company</h4>
            <Link href="/how-it-works">How It Works</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </div>
        </div>

        <div className="container footerBottom">
          <span>
            © {new Date().getFullYear()} NorthSky Auto
          </span>

          <span>🇨🇦 Canada</span>
        </div>
      </footer>

      <style jsx global>{`
        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          background: #ffffff;
          color: #111827;
          font-family:
            Inter,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .site {
          min-height: 100vh;
        }

        .container {
          width: min(1200px, 92%);
          margin: 0 auto;
        }

        /* HEADER */

        .header {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(255, 255, 255, 0.96);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid #e5e7eb;
        }

        .nav {
          min-height: 72px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 25px;
        }

        .logo {
          font-size: 22px;
          font-weight: 800;
          letter-spacing: -0.5px;
          white-space: nowrap;
        }

        .logo span {
          color: #2563eb;
        }

        .navLinks {
          display: flex;
          align-items: center;
          gap: 24px;
          font-size: 14px;
          font-weight: 600;
        }

        .navLinks a {
          color: #374151;
          transition: color 0.2s ease;
        }

        .navLinks a:hover {
          color: #2563eb;
        }

        .navActions {
          display: flex;
          align-items: center;
          gap: 14px;
          white-space: nowrap;
        }

        .signIn {
          font-size: 14px;
          font-weight: 600;
        }

        .getStarted {
          padding: 11px 18px;
          border-radius: 8px;
          background: #2563eb;
          color: white;
          font-size: 14px;
          font-weight: 700;
        }

        .getStarted:hover {
          background: #1d4ed8;
        }

        /* FOOTER */

        .footer {
          margin-top: 80px;
          background: #0f172a;
          color: #cbd5e1;
        }

        .footerGrid {
          padding: 60px 0;
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 50px;
        }

        .footerLogo {
          display: inline-block;
          color: white;
          font-size: 23px;
          font-weight: 800;
          margin-bottom: 15px;
        }

        .footerGrid p {
          max-width: 300px;
          line-height: 1.6;
          color: #94a3b8;
        }

        .footerGrid h4 {
          margin: 0 0 18px;
          color: white;
          font-size: 14px;
        }

        .footerGrid a {
          display: block;
          margin-bottom: 12px;
          color: #94a3b8;
          font-size: 14px;
        }

        .footerGrid a:hover {
          color: white;
        }

        .footerBottom {
          padding: 20px 0;
          border-top: 1px solid #1e293b;
          display: flex;
          justify-content: space-between;
          font-size: 13px;
          color: #64748b;
        }

        /* MOBILE */

        @media (max-width: 900px) {
          .navLinks {
            display: none;
          }

          .nav {
            min-height: 65px;
          }

          .footerGrid {
            grid-template-columns: 1fr 1fr;
            gap: 35px;
          }
        }

        @media (max-width: 600px) {
          .signIn {
            display: none;
          }

          .getStarted {
            padding: 10px 14px;
          }

          .footerGrid {
            grid-template-columns: 1fr;
            padding: 45px 0;
          }

          .footerBottom {
            flex-direction: column;
            gap: 8px;
          }
        }
      `}</style>
    </div>
  );
}