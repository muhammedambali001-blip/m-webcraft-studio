import { MotionConfig } from "framer-motion";

import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { TrustStrip } from "@/components/site/trust-strip";
import { About } from "@/components/site/about";
import { Services } from "@/components/site/services";
import { Industries } from "@/components/site/industries";
import { Portfolio } from "@/components/site/portfolio";
import { Process } from "@/components/site/process";
import { WhyMe } from "@/components/site/why-me";
import { Faq } from "@/components/site/faq";
import { Contact } from "@/components/site/contact";
import { FinalCta } from "@/components/site/final-cta";
import { Footer } from "@/components/site/footer";
import { ChatWidget } from "@/components/site/chat-widget";

/**
 * M-WebCraft Studio — personal brand website for Muhammed Ambali.
 * Single-page layout with anchored navigation.
 */
export default function Home() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="flex min-h-screen flex-col bg-ivory text-charcoal">
        <Navbar />
        <main className="flex-1">
          <Hero />
          <TrustStrip />
          <About />
          <Services />
          <Industries />
          <Portfolio />
          <Process />
          <WhyMe />
          <Faq />
          <Contact />
          <FinalCta />
        </main>
        <Footer />
        <ChatWidget />
      </div>
    </MotionConfig>
  );
}
