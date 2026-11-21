/* ------------------------------------------------------------------ */
/* PORTFOLIO — data-driven, easy to update                             */
/* ------------------------------------------------------------------ */
/*
 * HOW TO ADD A PROJECT LATER (no code changes needed beyond this file):
 *
 * 1. Add a website screenshot to /public (e.g. /public/portfolio/my-project.jpg).
 * 2. Append an object to `portfolioProjects` below, for example:
 *
 *    {
 *      title: "Anchora Realty Website",
 *      industry: "Real Estate",
 *      category: "Website Design",
 *      description: "A property listing website with enquiry forms and a virtual-tour gallery.",
 *      screenshot: "/portfolio/anchora.jpg",   // optional
 *      services: ["Website Design", "Enquiry Forms"],
 *      liveUrl: "https://example.com",         // optional
 *    }
 *
 * The portfolio section renders projects automatically.
 * While the array is empty, an elegant "coming soon" state is shown.
 * Do not add projects you have not actually completed.
 */

export interface PortfolioProject {
  /** Project or website name. */
  title: string;
  /** The client's business industry, e.g. "Real Estate". */
  industry: string;
  /** Project category, e.g. "Website Design", "Website Redesign", "AI Chatbot". */
  category: string;
  /** Short description of the project. */
  description: string;
  /** Path to a screenshot inside /public (optional). */
  screenshot?: string;
  /** Services provided on this project. */
  services: string[];
  /** Live website URL (optional). */
  liveUrl?: string;
}

export const portfolioProjects: PortfolioProject[] = [
  {
    title: "Havenstone Realty",
    industry: "Real Estate",
    category: "Website Design",
    description:
      "A luxury property website showcasing homes for sale and rent across New York, Los Angeles, Miami, Palm Beach and Aspen, with featured residences, signature markets and viewing enquiries.",
    screenshot: "/portfolio/havenstone-mockup.jpg",
    services: ["Website Design", "Property Showcase", "Book a Viewing"],
    liveUrl: "https://havenstone-realty-zeta.vercel.app/",
  },
  {
    title: "BrightNest Home Services",
    industry: "Home Services",
    category: "Website Design",
    description:
      "A professional cleaning and home-care company website in Manchester, England, offering residential, deep, office and end-of-tenancy services with a step-by-step enquiry flow and clear FAQs.",
    screenshot: "/portfolio/brightnest-mockup.jpg",
    services: ["Website Design", "Service Pages", "Enquiry Flow", "FAQs"],
    liveUrl: "https://brightnest-home-services.vercel.app/",
  },
  {
    title: "Banksia Table",
    industry: "Hospitality",
    category: "Website Design",
    description:
      "A modern Australian restaurant website for Fitzroy, Melbourne, featuring a seasonal contemporary menu, private dining and table booking, all presented in a warm, atmospheric design.",
    screenshot: "/portfolio/banksia-mockup.jpg",
    services: ["Website Design", "Menu Showcase", "Private Dining", "Table Booking"],
    liveUrl: "https://banksia-table.vercel.app/",
  },
];

/** Supporting copy for the portfolio section. */
export const portfolioIntro =
  "A look at the website experiences and digital solutions I create for businesses.";

export const portfolioComingSoonNote =
  "Project showcases and website demonstrations are being prepared and will be added here soon. In the meantime, you can ask me about the type of website or AI solution your business needs.";
