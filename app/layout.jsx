import "./globals.css";

export const metadata = {
  title: {
    default: "NorthSky Auto",
    template: "%s | NorthSky Auto",
  },
  description:
    "NorthSky Auto — Find your next vehicle, sell your vehicle, and connect with trusted automotive dealers.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}
