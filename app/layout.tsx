import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { Analytics } from "@vercel/analytics/react"
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nightclub Explorer",
  description: "Discover and explore nightclubs and events in your city. Find event details, artist lineups, ticket prices and register for guestlists.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="bg-black">
      <body className={`${inter.className} bg-black min-h-screen`}>
        <Navigation />
        <main className="min-h-screen">
          {children}
          <Analytics />
        </main>
      </body>
    </html>
  );
}
