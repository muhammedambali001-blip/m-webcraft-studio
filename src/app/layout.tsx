import type { Metadata, Viewport } from "next";
import { Playfair_Display, Manrope } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

/* Elegant serif for headlines */
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

/* Modern sans-serif for body, navigation and buttons */
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Muhammed Ambali | Website Designer & AI Developer | M-WebCraft Studio",
  description:
    "Muhammed Ambali, founder of M-WebCraft Studio, helps businesses build professional websites, AI chatbots and business automation solutions that make customer enquiries easier.",
  keywords: [
    "website designer",
    "business website design",
    "website redesign",
    "AI chatbot development",
    "business automation",
    "small business website",
    "M-WebCraft Studio",
    "Muhammed Ambali",
  ],
  authors: [{ name: "Muhammed Ambali" }],
  creator: "M-WebCraft Studio",
  openGraph: {
    title: "Muhammed Ambali | Website Designer & AI Developer | M-WebCraft Studio",
    description:
      "Professional websites, AI chatbots and practical business automation solutions that help businesses attract more customer enquiries.",
    siteName: "M-WebCraft Studio",
    type: "website",
    locale: "en",
  },
  twitter: {
    card: "summary",
    title: "Muhammed Ambali | Website Designer & AI Developer",
    description:
      "Professional websites, AI chatbots and business automation that turn visitors into customer enquiries.",
  },
};

export const viewport: Viewport = {
  themeColor: "#073B2B",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* suppressHydrationWarning on <body>: browser extensions and embedded
          preview environments may add their own attributes (e.g. injected
          scripts) before React hydrates — that is never the app's markup. */}
      <body
        suppressHydrationWarning
        className={`${playfair.variable} ${manrope.variable} antialiased bg-background text-foreground font-sans`}
      >
        {children}
        <Toaster position="top-center" richColors closeButton />
      </body>
    </html>
  );
}
