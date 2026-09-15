import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: {
    default: "NorthSky Auto | Canadian Vehicle Marketplace",
    template: "%s | NorthSky Auto",
  },
  description:
    "NorthSky Auto connects vehicle sellers with Canadian dealers looking for quality inventory.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-white text-slate-900 antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}