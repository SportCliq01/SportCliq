import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "SportCliq - Find your Cliq, Feel the Game!",
  description:
    "Real-time fan conversations, personalized feeds, and local event discovery — built for sports communities across the world.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">     <body style={{ fontFamily: "'Outfit', sans-serif" }}>
        <Navbar />
        <main className="pt-18">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}