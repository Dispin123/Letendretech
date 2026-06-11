import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Letendre Tech — Managed IT & Web Development for Local Business",
    template: "%s | Letendre Tech",
  },
  description:
    "Nathan Letendre provides managed IT services, cybersecurity, network setup, and web development for small businesses across southeastern Massachusetts and Rhode Island.",
  keywords: ["managed IT services", "web design", "local SEO", "cybersecurity", "Massachusetts", "Walpole MA", "Middleborough MA"],
  openGraph: {
    siteName: "Letendre Tech",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
