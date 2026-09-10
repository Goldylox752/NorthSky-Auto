import Link from "next/link";
export default function Layout({ children }) {
  return (
    <div className="site">
      {/* HEADER */}
      <header className="header">
        <div className="container nav">
          <Link href="/" className="logo">
            NorthSky <span>Auto</span> 🇨🇦
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
              Get Started →
            </Link>
          </div>
        </div>
      </header>
      {/* PAGE CONTENT */}
      <main>{children}</main>
      {/* FOOTER */}
      <footer className="footer">
        <div className="container footerGrid">
          {/* BRAND */}
          <div className="footerBrand">
            <Link href="/" className="footerLogo">
              NorthSky <span>Auto</span> 🇨🇦
            </Link>
            <p>
              Connecting Canadian vehicle sellers with automotive dealers
              through a simpler vehicle marketplace.
            </p>
            <Link href="/sell" className="footerCTA">
              Sell Your Vehicle →
            </Link>
          </div>
          {/* MARKETPLACE */}
          <div>
            <h4>Marketplace</h4>
            <Link href="/vehicles">
              Browse Vehicles
            </Link>
            <Link href="/sell">
              Sell Your Vehicle
            </Link>
            <Link href="/how-it-works">
              How It Works
            </Link>
          </div>
          {/* DEALERS */}
          <div>
            <h4>Dealers</h4>
            <Link href="/dealers">
              Dealer Portal
            </Link>
            <Link href="/dealer/leads">
              Dealer Leads
            </Link>
            <Link href="/pricing">
              Dealer Pricing
            </Link>
            <Link href="/dealer/register">
              Become a Dealer
            </Link>
          </div>
          {/* COMPANY */}
          <div>
            <h4>Company</h4>
            <Link href="/about">
              About
            </Link>
            <Link href="/contact">
              Contact
            </Link>
            <Link href="/privacy">
              Privacy
            </Link>
            <Link href="/terms">
              Terms
            </Link>
          </div>
        </div>
        {/* FOOTER BOTTOM */}
        <div className="container footerBottom">
          <span>
            © {new Date().getFullYear()} NorthSky Auto. All rights reserved.
          </span>
          <span>🇨🇦 Built for Canada</span>
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
          display: flex;
          flex-direction: column;
        }
        main {
          flex: 1;
        }
        .container {
          width: min(1200px, 92%);
          margin: 0 auto;
        }
        /* =========================
           HEADER
        ========================= */
        .header {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(255, 255, 255, 0.96);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid #e5e7eb;
        }
        .nav {
          min-height: 72px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
        }
        .logo {
          font-size: 22px;
          font-weight: 850;
          letter-spacing: -0.6px;
          white-space: nowrap;
        }
        .logo span {
          color: #2563eb;
        }
        .navLinks {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 22px;
          font-size: 14px;
          font-weight: 600;
        }
        .navLinks a {
          color: #374151;
          transition:
            color 0.2s ease,
            transform 0.2s ease;
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
          font-weight: 700;
          color: #374151;
        }
        .signIn:hover {
          color: #2563eb;
        }
        .getStarted {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 11px 17px;
          border-radius: 8px;
          background: #2563eb;
          color: white;
          font-size: 14px;
          font-weight: 750;
          transition:
            background 0.2s ease,
            transform 0.2s ease;
        }
        .getStarted:hover {
          background: #1d4ed8;
          transform: translateY(-1px);
        }
        /* =========================
           FOOTER
        ========================= */
        .footer {
          margin-top: 80px;
          background: #0f172a;
          color: #cbd5e1;
        }
        .footerGrid {
          padding: 65px 0;
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 50px;
        }
        .footerBrand {
          max-width: 360px;
        }
        .footerLogo {
          display: inline-block;
          color: white;
          font-size: 23px;
          font-weight: 850;
          letter-spacing: -0.5px;
          margin-bottom: 15px;
        }
        .footerLogo span {
          color: #60a5fa;
        }
        .footerGrid p {
          max-width: 330px;
          margin: 0 0 22px;
          line-height: 1.7;
          color: #94a3b8;
          font-size: 14px;
        }
        .footerCTA {
          display: inline-block;
          color: #93c5fd;
          font-size: 14px;
          font-weight: 700;
        }
        .footerCTA:hover {
          color: white;
        }
        .footerGrid h4 {
          margin: 0 0 18px;
          color: white;
          font-size: 14px;
          font-weight: 800;
        }
        .footerGrid a {
          display: block;
          margin-bottom: 12px;
          color: #94a3b8;
          font-size: 14px;
          transition: color 0.2s ease;
        }
        .footerGrid a:hover {
          color: white;
        }
        .footerBrand .footerLogo {
          display: inline-block;
        }
        .footerBottom {
          min-height: 65px;
          padding: 20px 0;
          border-top: 1px solid #1e293b;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 15px;
          font-size: 13px;
          color: #64748b;
        }
        /* =========================
           TABLET
        ========================= */
        @media (max-width: 1000px) {
          .navLinks {
            gap: 15px;
          }
          .navLinks a {
            font-size: 13px;
          }
          .nav {
            gap: 15px;
          }
        }
        /* =========================
           MOBILE
        ========================= */
        @media (max-width: 800px) {
          .navLinks {
            display: none;
          }
          .nav {
            min-height: 66px;
          }
          .footerGrid {
            grid-template-columns: 1fr 1fr;
            gap: 40px;
          }
        }
        @media (max-width: 560px) {
          .container {
            width: min(92%, 1200px);
          }
          .logo {
            font-size: 19px;
          }
          .signIn {
            display: none;
          }
          .getStarted {
            padding: 10px 13px;
            font-size: 13px;
          }
          .footer {
            margin-top: 50px;
          }
          .footerGrid {
            grid-template-columns: 1fr;
            padding: 50px 0;
            gap: 32px;
          }
          .footerBottom {
            flex-direction: column;
            align-items: flex-start;
            padding: 18px 0;
          }
        }
      `}</style>
    </div>
  );
}