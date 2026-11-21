import { NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";
import { buildWhatsAppUrl, site } from "@/data/site";

/*
 * M-WebCraft Assistant API
 * ------------------------
 * Real AI integration: the z-ai-web-dev-sdk is called on the SERVER only,
 * so no API key is ever exposed to the frontend.
 * If the AI service is unavailable, the route falls back to a clearly
 * defined demo mode that returns prepared responses based on the studio's
 * real service information — it never pretends to be a live model.
 */

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const SYSTEM_PROMPT = `You are the M-WebCraft Assistant for M-WebCraft Studio, the studio of Muhammed Ambali, a Website Designer and AI Developer (CEO & Founder of M-WebCraft Studio).

BRAND MESSAGE: Muhammed builds professional websites and AI solutions that help businesses attract customer enquiries, improve their online presence and serve customers more effectively.

SERVICES:
1. Professional Website Design: modern, responsive websites for businesses and service providers. This covers business websites, service-based websites, landing pages, responsive design, clear calls to action and enquiry forms.
2. AI Chatbots: website chat assistants that answer common customer questions, collect enquiries and guide visitors towards services.
3. Business Automation: automating everyday tasks like appointment reminders, booking confirmations, enquiry notifications, customer follow-ups and repetitive workflows.
4. Website Redesign: improving the design, mobile experience, navigation, page structure, customer journeys and calls to action of existing websites.
5. Affordable Website Hosting: hosting options WITHOUT monthly hosting fees for eligible websites; the client pays for the domain annually and additional tools may have separate costs. Never describe all hosting as free, and never promise every website qualifies.

TARGET CLIENTS: small businesses, startups, entrepreneurs, home service businesses, restaurants, hair salons and beauty businesses, clothing and fashion brands, coaches and consultants, real estate agencies and local businesses across Nigeria, the United States, the United Kingdom and other international markets.

PROCESS: 1) Discover (learn about the business, services, customers and goals). 2) Plan (identify pages, features and the customer journey). 3) Design & Build (design and develop the solution). 4) Launch & Support (prepare for launch and explain support and hosting arrangements).

CONTACT: Email ${site.email} or WhatsApp +234 810 468 0812 (https://wa.me/${site.whatsappNumber}). Enquiries go through the contact section of this website.

RULES:
- Keep replies warm, professional and SHORT: 2-4 sentences, plain language, no markdown headings, no bullet lists unless truly necessary.
- Never use em dashes (\u2014) or long dashes in your replies. Use commas, full stops and colons instead, so replies read like natural human writing.
- You may use simple line breaks for readability.
- Never invent clients, portfolio projects, testimonials, prices, discounts, delivery dates, awards or statistics. If asked about pricing or timelines, say Muhammed discusses project details personally and invite them to send an enquiry via WhatsApp, email or the contact section.
- If a visitor seems interested in starting a project, gently guide them to the contact section or WhatsApp.
- Never claim to be human: you are the M-WebCraft Assistant.
- If asked something unrelated to the studio's services, briefly answer if harmless and steer back to how M-WebCraft Studio can help their business.`;

/* ------------------------------------------------------------------ */
/* Demo fallback: prepared responses from real studio information      */
/* ------------------------------------------------------------------ */

interface DemoAnswer {
  keywords: RegExp;
  reply: string;
  links?: { label: string; href: string }[];
}

const demoAnswers: DemoAnswer[] = [
  {
    keywords: /(hello|hi|hey|good (morning|afternoon|evening)|how are you)/i,
    reply: `Hello! Welcome to M-WebCraft Studio. I can tell you about Muhammed's website design, AI chatbot and business automation services. What would you like to know?`,
  },
  {
    keywords: /(website design|design a website|new website|build.*website|create.*website|landing page)/i,
    reply: `Muhammed builds modern, responsive websites that showcase your business, explain your services and make it easy for potential customers to contact you, including business websites, service-based websites and landing pages with clear calls to action and enquiry forms. Would you like to discuss a website for your business?`,
    links: [
      { label: "Start a project", href: "#contact" },
      { label: "Chat on WhatsApp", href: buildWhatsAppUrl() },
    ],
  },
  {
    keywords: /(redesign|re-design|existing website|improve.*website|old website)/i,
    reply: `Yes, Muhammed can redesign an existing website. That covers a modern visual redesign, mobile responsiveness, better page structure, improved navigation, clearer customer journeys and better calls to action. Tell me a little about your current website and what feels wrong with it.`,
    links: [{ label: "Chat on WhatsApp", href: buildWhatsAppUrl() }],
  },
  {
    keywords: /(chat ?bot|ai assistant|chat assistant)/i,
    reply: `Muhammed creates AI chatbots for business websites, and I'm one of them. I answer common customer questions, collect enquiries and guide visitors towards your services, day and night. The assistant you're chatting with right now is a live example of how one would work on your website.`,
    links: [
      { label: "Start a project", href: "#contact" },
      { label: "Chat on WhatsApp", href: buildWhatsAppUrl() },
    ],
  },
  {
    keywords: /(automation|automate|reminder|follow[- ]?up|booking confirmation|notification)/i,
    reply: `Muhammed helps businesses automate repetitive tasks so they save time and manage customer communication more efficiently, for example appointment reminders, booking confirmations, enquiry notifications and customer follow-ups. What task takes up too much of your time at the moment?`,
    links: [{ label: "Chat on WhatsApp", href: buildWhatsAppUrl() }],
  },
  {
    keywords: /(hosting|host|domain|monthly fee)/i,
    reply: `Muhammed provides hosting options without monthly hosting fees for eligible websites. You pay for your domain annually, while additional tools may have separate costs. He'll confirm exactly what applies to your website when you discuss your project.`,
    links: [{ label: "Ask about hosting", href: "#contact" }],
  },
  {
    keywords: /(price|pricing|cost|how much|budget|charge|fee)/i,
    reply: `Project pricing depends on what your business needs, so Muhammed discusses it personally rather than publishing fixed prices. The easiest way is to send a WhatsApp message or an email describing your project. He'll get back to you.`,
    links: [
      { label: "Chat on WhatsApp", href: buildWhatsAppUrl() },
      { label: "Send an email", href: `mailto:${site.email}` },
    ],
  },
  {
    keywords: /(contact|whatsapp|email|phone|reach|call|talk|speak)/i,
    reply: `You can reach Muhammed directly on WhatsApp at +234 810 468 0812 or by email at ${site.email}. You can also use the contact form on this page, which opens WhatsApp with your enquiry details pre-filled.`,
    links: [
      { label: "Chat on WhatsApp", href: buildWhatsAppUrl() },
      { label: "Go to contact section", href: "#contact" },
    ],
  },
  {
    keywords: /(start|begin|hire|work with|project|enquiry|quote)/i,
    reply: `Great, starting is simple. Send a message through the contact section below, or tap the WhatsApp button, and tell Muhammed about your business and the solution you're looking for. He'll reply personally and suggest the right next step.`,
    links: [
      { label: "Start a project", href: "#contact" },
      { label: "Chat on WhatsApp", href: buildWhatsAppUrl() },
    ],
  },
  {
    keywords: /(process|how.*work|steps|timeline|how long)/i,
    reply: `Muhammed keeps things simple with four steps: Discover (learning about your business and goals), Plan (identifying the pages, features and customer journey), Design & Build, and Launch & Support. Timeframes depend on the project and are discussed personally.`,
    links: [{ label: "See my process", href: "#process" }],
  },
  {
    keywords: /(who are you|who is muhammed|about|founder|ceo)/i,
    reply: `Muhammed Ambali is a Website Designer and AI Developer, and the CEO and Founder of M-WebCraft Studio. He helps small businesses build professional websites, use AI chatbots and automate simple business tasks so they can attract enquiries, serve customers better and save time.`,
    links: [{ label: "Read about Muhammed", href: "#about" }],
  },
  {
    keywords: /(international|us|usa|united states|uk|united kingdom|abroad|remote|nigeria)/i,
    reply: `Yes, Muhammed is based in Nigeria and works remotely with businesses in the United States, the United Kingdom and other countries, so time zones are never a barrier to a well-run project.`,
    links: [{ label: "Start a project", href: "#contact" }],
  },
];

const demoDefaultReply = `I can help with questions about M-WebCraft Studio's services: professional website design, website redesign, AI chatbots, business automation and website hosting. Which one would you like to know more about?`;

function fallbackReply(userText: string): { reply: string; links?: { label: string; href: string }[] } {
  const match = demoAnswers.find((a) => a.keywords.test(userText));
  if (match) return { reply: match.reply, links: match.links };
  return {
    reply: demoDefaultReply,
    links: [{ label: "Chat on WhatsApp", href: buildWhatsAppUrl() }],
  };
}

export const maxDuration = 60;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const history: ChatMessage[] = Array.isArray(body?.messages) ? body.messages : [];

    // Sanitise and cap the conversation so requests stay small and safe.
    const clean: ChatMessage[] = history
      .filter(
        (m) =>
          m &&
          (m.role === "user" || m.role === "assistant") &&
          typeof m.content === "string",
      )
      .slice(-12)
      .map((m) => ({ role: m.role, content: m.content.slice(0, 1500) }));

    const lastUser =
      [...clean].reverse().find((m) => m.role === "user")?.content ?? "";

    try {
      const zai = await ZAI.create();
      const completion = await zai.chat.completions.create({
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...clean,
        ],
      });

      const reply = completion?.choices?.[0]?.message?.content?.trim();
      if (reply) {
        return NextResponse.json({ ok: true, reply, mode: "ai" });
      }
      throw new Error("Empty AI response");
    } catch {
      // AI service unavailable — fall back to the prepared demo responses.
      const fb = fallbackReply(lastUser);
      return NextResponse.json({ ok: true, ...fb, mode: "demo" });
    }
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      {
        ok: false,
        reply:
          "Sorry, something went wrong on my side. Please try again, or reach Muhammed directly on WhatsApp.",
        mode: "demo",
        links: [{ label: "Chat on WhatsApp", href: buildWhatsAppUrl() }],
      },
      { status: 200 },
    );
  }
}
