import type { LucideIcon } from "lucide-react";
import {
  MonitorSmartphone,
  Bot,
  Workflow,
  Paintbrush,
  Server,
  Hammer,
  UtensilsCrossed,
  Scissors,
  Shirt,
  Presentation,
  KeyRound,
  Store,
  Rocket,
  Search,
  PenLine,
  Code2,
  LifeBuoy,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Services                                                            */
/* ------------------------------------------------------------------ */

export interface Service {
  id: string;
  title: string;
  description: string;
  /** Label shown above the bullet list ("Features" or "Examples"). */
  listLabel: string;
  items: string[];
  icon: LucideIcon;
  /** Question used when the visitor clicks "Learn more" (opens the assistant). */
  askQuestion: string;
}

export const services: Service[] = [
  {
    id: "website-design",
    title: "Professional Website Design",
    description:
      "I build modern, responsive websites that showcase your business, explain your services and make it easy for potential customers to contact you.",
    listLabel: "Features",
    items: [
      "Business websites",
      "Service-based websites",
      "Landing pages",
      "Responsive website design",
      "Clear calls to action",
      "Enquiry forms",
    ],
    icon: MonitorSmartphone,
    askQuestion: "Tell me about your professional website design service.",
  },
  {
    id: "ai-chatbots",
    title: "AI Chatbots",
    description:
      "I create helpful AI chatbots that answer common customer questions, collect enquiries and guide visitors towards your services.",
    listLabel: "Features",
    items: [
      "Website chat assistants",
      "Customer question handling",
      "Lead and enquiry collection",
      "Product and service information",
      "Customer support assistance",
    ],
    icon: Bot,
    askQuestion: "Tell me about your AI chatbot service.",
  },
  {
    id: "business-automation",
    title: "Business Automation",
    description:
      "I help businesses automate repetitive tasks so they can save time and manage customer communication more efficiently.",
    listLabel: "Examples",
    items: [
      "Appointment reminders",
      "Booking confirmations",
      "Enquiry notifications",
      "Customer follow-ups",
      "Repetitive business workflows",
    ],
    icon: Workflow,
    askQuestion: "Tell me about your business automation service.",
  },
  {
    id: "website-redesign",
    title: "Website Redesign",
    description:
      "Already have a website? I can improve its appearance, mobile experience, navigation and overall user experience.",
    listLabel: "Features",
    items: [
      "Modern visual redesign",
      "Mobile responsiveness",
      "Better page structure",
      "Improved navigation",
      "Clearer customer journeys",
      "Better calls to action",
    ],
    icon: Paintbrush,
    askQuestion: "Tell me about your website redesign service.",
  },
  {
    id: "website-hosting",
    title: "Affordable Website Hosting",
    description:
      "I also provide hosting options without monthly hosting fees for eligible websites. You pay for your domain annually, while additional tools may have separate costs.",
    listLabel: "Good to know",
    items: [
      "No monthly hosting fees for eligible websites",
      "You pay for your domain annually",
      "Additional tools may have separate costs",
    ],
    icon: Server,
    askQuestion: "Tell me about your website hosting options.",
  },
];

/* ------------------------------------------------------------------ */
/* Businesses I help (target audience)                                 */
/* ------------------------------------------------------------------ */

export interface Industry {
  label: string;
  icon: LucideIcon;
}

export const industries: Industry[] = [
  { label: "Home Services", icon: Hammer },
  { label: "Restaurants & Food Businesses", icon: UtensilsCrossed },
  { label: "Hair Salons & Beauty Businesses", icon: Scissors },
  { label: "Clothing & Fashion Brands", icon: Shirt },
  { label: "Coaches & Consultants", icon: Presentation },
  { label: "Real Estate Agencies", icon: KeyRound },
  { label: "Local Businesses", icon: Store },
  { label: "Startups & Entrepreneurs", icon: Rocket },
];

export const industriesIntro =
  "I work with businesses, startups, entrepreneurs and service providers who want to improve their online presence, attract more customer enquiries and make better use of digital tools.";

/* ------------------------------------------------------------------ */
/* How I work (process)                                                */
/* ------------------------------------------------------------------ */

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Discover",
    description:
      "I learn about your business, services, customers and what you want your website or automation solution to achieve.",
    icon: Search,
  },
  {
    number: "02",
    title: "Plan",
    description:
      "I identify the important pages, features and customer journey needed for your project.",
    icon: PenLine,
  },
  {
    number: "03",
    title: "Design & Build",
    description:
      "I design and develop a solution that reflects your business and makes it easier for customers to interact with you.",
    icon: Code2,
  },
  {
    number: "04",
    title: "Launch & Support",
    description:
      "I help prepare your project for launch and explain the available support and hosting arrangements.",
    icon: LifeBuoy,
  },
];

/* ------------------------------------------------------------------ */
/* Why choose M-WebCraft Studio                                        */
/* ------------------------------------------------------------------ */

export interface WhyPoint {
  title: string;
  detail: string;
}

export const whyPoints: WhyPoint[] = [
  {
    title: "Business-focused solutions",
    detail:
      "Every project starts with your business goals and the customers you want to reach.",
  },
  {
    title: "Professional and responsive website design",
    detail:
      "Websites that look sharp and work smoothly on phones, tablets and desktops.",
  },
  {
    title: "Practical AI chatbot solutions",
    detail:
      "Chat assistants that answer real customer questions and collect enquiries for your business.",
  },
  {
    title: "Automation focused on everyday business tasks",
    detail:
      "Reminders, confirmations, notifications and follow-ups handled automatically.",
  },
  {
    title: "Clear communication",
    detail:
      "Plain language, honest timelines and updates you can actually understand.",
  },
  {
    title: "Solutions suited to your business needs",
    detail:
      "Recommendations based on what your business genuinely needs, and nothing more.",
  },
  {
    title: "Remote collaboration with international businesses",
    detail:
      "Based in Nigeria and working smoothly with clients across different time zones.",
  },
];

/* ------------------------------------------------------------------ */
/* FAQs                                                                */
/* ------------------------------------------------------------------ */

export interface Faq {
  question: string;
  answer: string;
}

export const faqs: Faq[] = [
  {
    question: "What types of websites do you build?",
    answer:
      "I build professional websites for small businesses, startups, entrepreneurs and service providers.",
  },
  {
    question: "Can you redesign an existing website?",
    answer:
      "Yes. I can improve the design, navigation, mobile experience and overall user experience of an existing website.",
  },
  {
    question: "Can you integrate AI chatbots into a website?",
    answer:
      "Yes. I create AI chatbot solutions that can answer common questions, collect customer enquiries and guide visitors.",
  },
  {
    question: "What business tasks can you automate?",
    answer:
      "Examples include appointment reminders, booking confirmations, enquiry notifications and customer follow-ups.",
  },
  {
    question: "Do you offer website hosting?",
    answer:
      "I provide hosting options without monthly hosting fees for eligible websites. Domains are paid annually, and additional tools may have separate costs.",
  },
  {
    question: "Do you work with international clients?",
    answer:
      "Yes. I'm based in Nigeria and work remotely with businesses in the United States, the United Kingdom and other countries.",
  },
  {
    question: "How can I start a project?",
    answer:
      "You can contact me through WhatsApp or email and tell me about your business and the solution you need.",
  },
];

/* ------------------------------------------------------------------ */
/* Services offered in the enquiry form                                */
/* ------------------------------------------------------------------ */

export const enquiryServiceOptions = [
  "Professional Website Design",
  "Website Redesign",
  "AI Chatbots",
  "Business Automation",
  "Website Hosting",
  "Not sure yet, I need advice",
] as const;
