import Image from "next/image";
import { ArrowUpRight, FolderOpen, Globe, LayoutDashboard, MessageSquare } from "lucide-react";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";
import {
  portfolioComingSoonNote,
  portfolioIntro,
  portfolioProjects,
  type PortfolioProject,
} from "@/data/portfolio";

function ProjectCard({ project }: { project: PortfolioProject }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-[0_18px_44px_-18px_rgba(7,59,43,0.28)]">
      <div className="relative aspect-[16/10] overflow-hidden bg-ivory-dark">
        {project.screenshot ? (
          <Image
            src={project.screenshot}
            alt={`Website screenshot — ${project.title}`}
            fill
            sizes="(min-width: 1024px) 33vw, 92vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div
            aria-hidden="true"
            className="flex h-full items-center justify-center bg-gradient-to-br from-ivory-dark via-white to-forest/10"
          >
            <Globe className="size-10 text-forest/25" />
          </div>
        )}
        <span className="absolute left-4 top-4 rounded-full bg-forest px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-ivory">
          {project.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-deep">
          {project.industry}
        </p>
        <h3 className="mt-2 font-serif text-xl font-semibold text-forest">
          {project.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-charcoal/75">
          {project.description}
        </p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.services.map((s) => (
            <li
              key={s}
              className="rounded-full border border-border bg-ivory px-3 py-1 text-xs font-semibold text-charcoal/70"
            >
              {s}
            </li>
          ))}
        </ul>

        {/* two actions per project: open the real site, or start an enquiry */}
        <div className="mt-auto flex flex-col gap-2.5 pt-6">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-forest px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-ivory transition-colors hover:bg-gold hover:text-espresso focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              View Live Website
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          ) : null}
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-forest/30 bg-transparent px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-forest transition-colors hover:border-forest hover:bg-forest hover:text-ivory focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            Discuss a Similar Project
            <MessageSquare className="size-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  );
}

function ComingSoon() {
  const slotIcons = [Globe, MessageSquare, LayoutDashboard];
  return (
    <div className="mx-auto mt-14 max-w-5xl">
      {/* three elegant preview slots */}
      <div className="grid gap-5 sm:grid-cols-3">
        {slotIcons.map((Icon, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
              {/* browser chrome */}
              <div className="flex items-center gap-1.5 border-b border-border bg-ivory px-4 py-3">
                <span className="size-2.5 rounded-full bg-espresso/20" />
                <span className="size-2.5 rounded-full bg-gold/50" />
                <span className="size-2.5 rounded-full bg-forest/30" />
                <span className="ml-3 h-4 w-24 rounded-full bg-border/70" />
              </div>
              <div className="flex aspect-[16/10] items-center justify-center bg-gradient-to-br from-ivory via-white to-forest/8">
                <div className="flex flex-col items-center gap-2 text-forest/30">
                  <Icon className="size-9" aria-hidden="true" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                    Showcase slot {i + 1}
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.15} className="mt-10 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-gold/45 bg-gold/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-gold-deep">
          <FolderOpen className="size-3.5" aria-hidden="true" />
          New projects in preparation
        </span>
        <h3 className="mt-5 font-serif text-2xl font-semibold text-forest sm:text-3xl">
          Project showcases are on the way.
        </h3>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-charcoal/75">
          {portfolioComingSoonNote}
        </p>
        <p className="mt-3 text-sm italic text-charcoal/55">
          Only real, completed projects will be displayed here.
        </p>
        <a
          href="#contact"
          className="mt-7 inline-flex items-center gap-2 rounded-full bg-forest px-7 py-3.5 text-sm font-bold uppercase tracking-[0.14em] text-ivory transition-colors hover:bg-gold hover:text-espresso"
        >
          Discuss a project for your business
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </a>
      </Reveal>
    </div>
  );
}

/**
 * Portfolio section — fully data-driven.
 * Add projects in src/data/portfolio.ts; the layout updates automatically.
 */
export function Portfolio() {
  const hasProjects = portfolioProjects.length > 0;

  return (
    <section id="portfolio" className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <SectionHeading
          label="Portfolio"
          title="Selected Work & Website Demonstrations."
          description={portfolioIntro}
        />

        {hasProjects ? (
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {portfolioProjects.map((project, index) => (
              <Reveal key={`${project.title}-${index}`} delay={(index % 3) * 0.08}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        ) : (
          <ComingSoon />
        )}
      </div>
    </section>
  );
}
