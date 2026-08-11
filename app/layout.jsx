import "./globals.css";
import Navbar from "../components/Navbar";
export const metadata = {
  title: "NorthSky Auto",
  description:
    "Canada's vehicle marketplace connecting sellers with dealerships.",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}