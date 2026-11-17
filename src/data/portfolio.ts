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

export const portfolioProjects: PortfolioProject[] = [];

/** Supporting copy for the portfolio section. */
export const portfolioIntro =
  "A look at the website experiences and digital solutions I create for businesses.";

export const portfolioComingSoonNote =
  "Project showcases and website demonstrations are being prepared and will be added here soon. In the meantime, you can ask me about the type of website or AI solution your business needs.";
