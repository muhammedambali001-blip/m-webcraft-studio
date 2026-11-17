/**
 * Central site configuration for M-WebCraft Studio.
 * Update contact details here once and they change everywhere.
 */
export const site = {
  name: "M-WebCraft Studio",
  founder: "Muhammed Ambali",
  founderRole: "CEO & Founder",
  founderTitle: "Website Designer and AI Developer",
  brandMessage:
    "I build professional websites and AI solutions that help businesses attract customer enquiries, improve their online presence and serve customers more effectively.",
  email: "muhammedambali001@gmail.com",
  phoneDisplay: "+234 810 468 0812",
  whatsappNumber: "2348104680812",
  whatsappPrefill:
    "Hello Muhammed, I visited your website and would like to discuss a project for my business.",
} as const;

/** Build a WhatsApp link with an optional pre-filled message. */
export function buildWhatsAppUrl(message: string = site.whatsappPrefill): string {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/** Pre-filled email link. */
export function buildMailtoUrl(subject: string, body: string): string {
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "My Process", href: "#process" },
  { label: "FAQs", href: "#faqs" },
  { label: "Contact", href: "#contact" },
] as const;
