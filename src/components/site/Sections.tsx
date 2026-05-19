import { useState } from "react";
import { useReveal } from "@/hooks/use-reveal";
import {
  Target,
  Sparkles,
  Repeat,
  Network,
  Search,
  PenLine,
  Camera,
  TrendingUp,
  CheckCircle2,
  Instagram,
  Linkedin,
  ArrowUpRight,
  ChevronDown,
} from "lucide-react";
import { Logo } from "./Logo";
import { ProblemTimeline } from "./ProblemTimeline";
import { CaseStudyPopup } from "./CaseStudyPopup";
import { richualCase, ritualCase, cocoaCase } from "./caseStudiesData";
import type { CaseStudyMetric } from "./CaseStudyPopup";
import work1 from "@/assets/work-1.jpg";
import work2 from "@/assets/work-2.jpg";
import work3 from "@/assets/work-3.jpg";
import work4 from "@/assets/work-4.jpg";
import cs1Card from "@/assets/cases/card-cs1.webp";
import cs2Card from "@/assets/cases/card-cs2.webp";
import cs3Card from "@/assets/cases/card-cs3.webp";

/* ============== MARQUEE ============== */

export function BrandMarquee() {
  const items = [
    "Glow Atelier",
    "Lume & Co",
    "Maison Dew",
    "North Skin",
    "Velvet Hour",
    "Petal Lab",
    "Soft Focus",
    "Cherie Beauté",
  ];
  const list = [...items, ...items];
  return (
    <section className="border-y border-border/60 bg-background py-7 overflow-hidden">
      <div className="flex items-center gap-12 animate-marquee whitespace-nowrap">
        {list.map((b, i) => (
          <span key={i} className="font-display text-[22px] tracking-tight text-foreground/35 hover:text-foreground/80 transition-colors">
            {b}
            <span className="inline-block mx-12 h-1 w-1 rounded-full bg-foreground/20 align-middle" />
          </span>
        ))}
      </div>
    </section>
  );
}

export function Problem() {
  return (
    <section id="problem" className="relative bg-secondary py-24 lg:py-32">
      <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-brand-teal/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-20 h-[28rem] w-[28rem] rounded-full bg-brand-deep/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-10">
        {/* Header */}
        <div className="text-center max-w-5xl mx-auto mb-12 w-full overflow-visible">
          <h2 className="font-display text-[clamp(26px,5vw,32px)] sm:text-[38px] lg:text-[46px] leading-[1.08] tracking-[-0.03em] font-normal text-foreground">
            <span>The hidden cost of the creative that</span>{" "}
            <span className="font-serif italic text-brand-deep" style={{ fontSize: "1.05em" }}>doesn't convert.</span>
          </h2>
          <p className="mt-5 text-[15.5px] lg:text-[16px] leading-relaxed text-foreground/60 max-w-[560px] mx-auto px-5 sm:px-0">
            Your brand isn't failing because of budget or reach. It's failing because your creative has no system.
          </p>
        </div>

        <ProblemTimeline />

        <Reveal>
          <p className="mt-14 max-w-3xl mx-auto text-center font-display text-[24px] lg:text-[32px] tracking-tight text-foreground leading-snug">
            The result?{" "}
            <span className="text-foreground/50">
              You burn budget, lose momentum, and never find predictable winners.
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ============== REFRAME ============== */

export { Reframe } from "./Reframe";

/* ============== DIFFERENTIATORS ============== */

export { Differentiators } from "./Differentiators";

/* ============== WORK ============== */

const ugcWork = [
  {
    src: cs1Card,
    index: "01",
    name: "Skincare Brand Scales to 7 Figures",
    sub: "Funnel Strategy • UGC Ad Testing • Conversion Lift",
    metrics: richualCase.metrics,
    cta: "View case study",
    status: "live" as const,
  },
  {
    src: cs2Card,
    index: "02",
    name: "Haircare Brand Hits 3.6x ROAS",
    sub: "Creative Testing • Performance Meta Ads • Instagram Growth",
    metrics: ritualCase.metrics,
    status: "soon" as const,
  },
  {
    src: cs3Card,
    index: "03",
    name: "Beauty Brand Boosts Content Velocity by 42%",
    sub: "Content Systems • Omnichannel Creative • Brand Scale",
    metrics: cocoaCase.metrics,
    status: "soon" as const,
  },
];

export function Work() {
  const [hero, ...rest] = ugcWork;
  const [openKey, setOpenKey] = useState<null | "richual" | "ritual" | "cocoa">(null);
  const dataMap = { richual: richualCase, ritual: ritualCase, cocoa: cocoaCase } as const;
  const keyFor = (name: string): "richual" | "ritual" | "cocoa" | null =>
    name === "Skincare Brand Scales to 7 Figures"
      ? "richual"
      : name === "Haircare Brand Hits 3.6x ROAS"
      ? "ritual"
      : name === "Beauty Brand Boosts Content Velocity by 42%"
      ? "cocoa"
      : null;

  return (
    <section id="work" className="bg-secondary py-24 lg:py-36">
      <div className="w-full px-5 lg:px-[116px]">
        <div className="text-center max-w-3xl mx-auto">
          <Eyebrow>Our Work</Eyebrow>
          <h2 className="font-display text-[40px] sm:text-[48px] lg:text-[54px] leading-[1.05] tracking-[-0.03em] font-normal text-foreground mt-3 text-balance">
            <span className="font-serif italic text-brand-deep" style={{ fontSize: "1.05em" }}>Case studies</span> that speak for themselves.
          </h2>
          <div className="mt-7 hidden lg:flex justify-center">
            <a
              href="/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-brand-deep text-background pl-6 pr-2 h-[52px] text-[14px] font-medium shadow-[0_12px_28px_-12px_rgba(15,79,74,0.5)] transition-all hover:bg-brand-dark hover:-translate-y-0.5"
            >
              Apply to Work With Us
              <span className="ml-1 h-9 w-9 rounded-full bg-background text-brand-deep flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </a>
          </div>
        </div>

        <div className="mt-14 lg:mt-20 grid grid-cols-1 lg:grid-cols-5 lg:grid-rows-2 gap-5 lg:auto-rows-fr">
          <Reveal className="lg:col-span-3 lg:row-span-2">
            <WorkCard item={hero} featured onClick={() => setOpenKey(keyFor(hero.name))} />
          </Reveal>
          {rest.map((it, i) => (
            <Reveal key={it.name} delay={(i + 1) * 90} className="lg:col-span-2">
              <WorkCard item={it} onClick={() => setOpenKey(keyFor(it.name))} />
            </Reveal>
          ))}
        </div>

        <div className="mt-8 flex lg:hidden justify-center">
          <a
            href="/contact"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-brand-deep text-background pl-6 pr-2 h-[52px] text-[14px] font-medium shadow-[0_12px_28px_-12px_rgba(15,79,74,0.5)] transition-all hover:bg-brand-dark hover:-translate-y-0.5"
          >
            Apply to Work With Us
            <span className="ml-1 h-9 w-9 rounded-full bg-background text-brand-deep flex items-center justify-center transition-transform group-hover:translate-x-0.5">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </a>
        </div>
      </div>
      <CaseStudyPopup
        open={openKey !== null}
        onClose={() => setOpenKey(null)}
        data={dataMap[openKey ?? "richual"]}
        onNext={() => {
          const nextMap = { richual: "ritual", ritual: "cocoa", cocoa: "richual" } as const;
          if (openKey) setOpenKey(nextMap[openKey]);
        }}
      />
    </section>
  );
}

type WorkItem = (typeof ugcWork)[number];

function WorkCard({ item, featured = false, onClick }: { item: WorkItem; featured?: boolean; onClick?: () => void }) {
  return (
    <a
      href="#"
      onClick={(e) => {
        if (onClick) {
          e.preventDefault();
          onClick();
        }
      }}
      className={`group relative block w-full h-full overflow-hidden rounded-3xl ring-1 ring-border bg-foreground/90 ${
        featured ? "aspect-[4/5] lg:aspect-auto lg:min-h-[640px]" : "aspect-[16/9] lg:aspect-auto lg:min-h-[310px]"
      }`}
    >
      <img
        src={item.src}
        alt={item.name}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]"
      />
      {/* Bottom gradient for legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />

      {/* Top row: pill + index */}
      <div className="absolute top-4 left-4 right-4 flex items-start justify-between text-background">
        <span className="inline-flex items-center rounded-full bg-background/15 backdrop-blur-md px-3 py-1 text-[10px] font-medium uppercase tracking-[0.14em] ring-1 ring-background/25">
          PlotWise UGC
        </span>
        <span className="text-[11px] font-medium opacity-70 tabular-nums">{item.index}</span>
      </div>

      {/* Bottom content */}
      <div className={`absolute inset-x-0 bottom-0 text-background ${featured ? "p-7 lg:p-9" : "p-5 lg:p-6"}`}>
        <div className={`font-display font-medium tracking-tight leading-[1.05] ${featured ? "text-[22px] lg:text-[31px]" : "text-[16px] lg:text-[22px]"}`}>
          {item.name}
        </div>
        <div className={`mt-3 flex flex-wrap ${featured ? "gap-2" : "gap-1.5"}`}>
          {item.sub.split("•").map((part) => part.trim()).filter(Boolean).map((tag) => (
            <span
              key={tag}
              className={`inline-flex items-center rounded-full bg-background/15 backdrop-blur-md ring-1 ring-background/25 text-background/90 font-medium ${
                featured ? "px-3 py-1 text-[11px] lg:text-[12px]" : "px-2.5 py-0.5 text-[10px] lg:text-[11px]"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
        {item.metrics && item.metrics.length > 0 && (
          <div
            className={`mt-5 hidden sm:flex items-start overflow-hidden max-h-0 opacity-0 -translate-y-1 group-hover:max-h-40 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out ${featured ? "gap-6 lg:gap-8" : "gap-4 lg:gap-5"}`}
          >
            {(item.metrics as CaseStudyMetric[]).map((m, i) => (
              <div
                key={i}
                className={`flex-1 min-w-0 ${i > 0 ? "pl-4 lg:pl-5 border-l border-background/20" : ""}`}
              >
                <div
                  className={`font-display font-medium leading-none text-background tracking-tight ${
                    featured ? "text-[22px] lg:text-[28px]" : "text-[16px] lg:text-[19px]"
                  }`}
                >
                  {m.value}
                </div>
                <div
                  className={`mt-1.5 text-background/65 leading-snug ${
                    featured ? "text-[11px] lg:text-[12px]" : "text-[9.5px] lg:text-[10.5px]"
                  }`}
                >
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </a>
  );
}

/* ============== CREATORS ============== */

export { Creators } from "./Creators";

/* ============== PROCESS ============== */

const steps = [
  { icon: Search, title: "Strategic Discovery", body: "We deep-dive into your product, audience, and market to identify the real drivers of belief and conversion." },
  { icon: PenLine, title: "Narrative Engineering", body: "We map belief gaps, develop angles, and script creator-led narratives aligned to each funnel stage." },
  { icon: Camera, title: "Production & Direction", body: "Creators are briefed scene-by-scene so the final content feels native and intentional." },
  { icon: TrendingUp, title: "Delivery & Optimization", body: "You receive multi-platform formats, hook variations, and performance recommendations to scale." },
];

export function Process() {
  return (
    <section id="process" className="bg-secondary py-24 lg:py-36">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <SectionHead
          eyebrow="Our Process"
          title={<>How we turn attention <span className="italic font-light text-brand-deep">into action.</span></>}
        />

        <div className="mt-16 relative">
          {/* connector line */}
          <div className="hidden lg:block absolute left-0 right-0 top-8 h-px bg-border" />
          <div className="grid lg:grid-cols-4 gap-10 lg:gap-6">
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <Reveal key={s.title} delay={i * 100}>
                  <div className="relative">
                    <div className="flex items-center gap-3">
                      <div className="relative z-10 h-16 w-16 rounded-full bg-background ring-1 ring-border flex items-center justify-center">
                        <Icon className="h-5 w-5 text-brand-deep" strokeWidth={1.5} />
                      </div>
                      <span className="font-display text-2xl text-foreground/30">0{i + 1}</span>
                    </div>
                    <h3 className="mt-6 font-display text-[20px] tracking-tight text-foreground">{s.title}</h3>
                    <p className="mt-2.5 text-[14px] text-foreground/65 leading-relaxed">{s.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============== WHY IT WORKS ============== */

const whys = [
  { title: "Platform-Native", body: "Designed specifically for Meta, TikTok, and YouTube — not one-size-fits-all content.", stat: "3 platforms" },
  { title: "Hook Variations", body: "Every video includes 2 hook variations so you can test and learn faster.", stat: "2× hooks" },
  { title: "Validation Before Scale", body: "We prioritize organic validation before pushing budgets into paid.", stat: "Validate → Scale" },
  { title: "Funnel Coherence", body: "Your content works together — awareness, consideration, conversion.", stat: "TOF · MOF · BOF" },
];

export function Why() {
  return (
    <section className="bg-background py-24 lg:py-36">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <SectionHead
          eyebrow="Why It Works"
          title={<>The science behind <span className="italic font-light text-brand-deep">performance-driven UGC.</span></>}
        />

        <div className="mt-16 grid md:grid-cols-2 gap-px bg-border rounded-3xl overflow-hidden ring-1 ring-border">
          {whys.map((w, i) => (
            <Reveal key={w.title} delay={i * 80}>
              <div className="bg-background p-8 lg:p-10 h-full">
                <div className="flex items-center justify-between">
                  <CheckCircle2 className="h-6 w-6 text-brand-deep" strokeWidth={1.5} />
                  <span className="text-[11px] uppercase tracking-wider text-foreground/50">{w.stat}</span>
                </div>
                <h3 className="mt-8 font-display text-[22px] tracking-tight">{w.title}</h3>
                <p className="mt-3 text-[14.5px] text-foreground/65 leading-relaxed">{w.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============== WHO WE WORK WITH ============== */

export function WhoWeWorkWith() {
  const filled = 7;
  return (
    <section className="bg-secondary py-24 lg:py-36">
      <div className="mx-auto max-w-7xl px-5 lg:px-10 grid lg:grid-cols-12 gap-14 items-center">
        <div className="lg:col-span-7">
          <Eyebrow>Who We Work With</Eyebrow>
          <h2 className="display-xl text-[40px] lg:text-[60px] mt-3 text-balance">
            We work with{" "}
            <span className="text-brand-deep">10 brands per season</span>, by design.
          </h2>
          <p className="mt-5 text-foreground/65 max-w-lg text-[16px]">
            We aren't built for volume. We're built for depth. Every client gets
            strategic attention and a content system designed to compound.
          </p>

          <ul className="mt-10 space-y-3">
            {[
              "Beauty & beauty-adjacent ecommerce brands",
              "Serious about testing, learning, and scaling",
              "Ready for creative strategy, not just execution",
            ].map((c) => (
              <li key={c} className="flex items-center gap-3 text-[15px] text-foreground/85">
                <CheckCircle2 className="h-5 w-5 text-brand-deep shrink-0" strokeWidth={1.5} />
                {c}
              </li>
            ))}
          </ul>

          <a href="/contact" target="_blank" rel="noopener noreferrer" className="mt-10 inline-flex items-center gap-2 rounded-full bg-foreground text-background pl-6 pr-2 h-[52px] py-2 text-[14px] font-medium hover:bg-brand-dark transition-colors group">
            Apply for the next cohort
            <span className="ml-1 h-9 w-9 rounded-full bg-background text-foreground flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </a>
        </div>

        <div className="lg:col-span-5">
          <Reveal>
            <div className="rounded-3xl bg-background p-8 ring-1 ring-border">
              <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-foreground/55">
                <span>Spring 2026 cohort</span>
                <span className="text-brand-deep">{10 - filled} slots left</span>
              </div>
              <div className="mt-4 grid grid-cols-10 gap-1.5">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-12 rounded-md transition-all ${
                      i < filled ? "bg-brand-deep" : "bg-brand-mist border border-brand-deep/30"
                    }`}
                    style={{ transitionDelay: `${i * 60}ms` }}
                  />
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-border space-y-3 text-[13.5px]">
                {[
                  ["Glow Atelier", "Confirmed"],
                  ["Lume & Co", "Confirmed"],
                  ["Maison Dew", "Confirmed"],
                  ["Petal Lab", "In review"],
                ].map(([n, s]) => (
                  <div key={n} className="flex items-center justify-between">
                    <span className="text-foreground">{n}</span>
                    <span className={`text-[11px] uppercase tracking-wider ${s === "Confirmed" ? "text-brand-deep" : "text-foreground/50"}`}>{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ============== FAQ ============== */

const faqs = [
  {
    q: "What's the minimum engagement?",
    a: "We work with brands that need at least Five Videos.\n\nFewer than that doesn't provide enough signal to test effectively. Strategic content requires systematic testing.",
  },
  {
    q: "Do you work with brands outside beauty?",
    a: "Our focus is beauty and personal care (skincare, haircare, cosmetics, body care, and more).\n\nWe intentionally stay niche so we can operate with deep domain expertise, we know your customers, your competitors, and what creative patterns work in this space.",
  },
  {
    q: "How long does production take?",
    a: "One-time projects: First delivery in 3–4 weeks because we complete full research and strategy before production.\n\nQuarterly partners: First batch in 3–4 weeks, then new content delivered weekly or bi-weekly since the research foundation is already built.",
  },
  {
    q: "Do you provide multiple formats?",
    a: "Yes, all aspect ratios (9:16, 1:1, 16:9, 4:5) ready for Instagram Reels, TikTok, YouTube Shorts, and feed posts.",
  },
  {
    q: "Do you handle creator sourcing?",
    a: "Yes. We shortlist and manage creators based on persona fit and campaign objectives.\n\nYou approve the final roster, but we handle everything else, outreach, negotiation, briefing, communication, and payments.",
  },
  {
    q: "What if the content doesn't perform?",
    a: "We analyze performance signals (ROAS, hook rate, CTR, CPA) and iterate based on data.\n\nOur process is built for learning and optimization. Month 2 content is smarter than Month 1 because performance feedback loops back into the system.",
  },
  {
    q: "What makes Plotwise different from UGC marketplaces?",
    a: "Marketplaces are self-service, you write briefs, pick creators, and figure out strategy yourself.\n\nPlotwise is done-for-you, we do research first (belief gaps, customer psychology), develop strategic angles, match creators to your personas, and manage the entire production process.\n\nBottom line: Marketplaces give you access to creators. We give you a creative system.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="bg-background py-24 lg:py-36">
      <div className="mx-auto max-w-4xl px-5 lg:px-10">
        <Eyebrow>FAQs</Eyebrow>
        <h2 className="font-serif italic text-brand-deep text-[34px] lg:text-[52px] tracking-tight mt-3 text-balance">
          FAQs
        </h2>

        <div className="mt-14 divide-y divide-border border-y border-border">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full text-left py-6 flex items-start justify-between gap-6 group"
                >
                  <span className="font-display text-[19px] lg:text-[22px] text-foreground tracking-tight">{f.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-foreground/50 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-500 ease-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100 pb-6" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-[15px] text-foreground/70 leading-relaxed max-w-2xl whitespace-pre-line">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============== APPLY ============== */

export function Apply() {
  return (
    <section id="apply" className="relative gradient-deep grain text-background py-28 lg:py-40 overflow-hidden">
      {/* grid texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.05]">
        <svg className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <pattern id="grid2" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid2)" />
        </svg>
      </div>
      {/* ambient glow */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-brand-teal/20 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-[500px] w-[500px] rounded-full bg-white/5 blur-[120px]" />

      <div className="relative mx-auto max-w-3xl px-5 lg:px-10 text-center">
        <div className="text-[11px] tracking-[0.22em] uppercase text-background/55 mb-5">
          Work with us
        </div>
        <h2 className="font-display text-[40px] sm:text-[54px] lg:text-[64px] leading-[1.04] tracking-[-0.03em] font-normal text-balance">
          Ready to turn attention{" "}
          <span className="font-serif italic" style={{ fontSize: "1.05em" }}>
            into growth?
          </span>
        </h2>
        <p className="mt-6 text-[16px] leading-[1.7] text-background/70 max-w-[520px] mx-auto">
          We work with 10 brands per season — deeply, not broadly. If you're ready
          to build a system that compounds, let's talk.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/contact"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-background text-brand-deep pl-7 pr-2 h-[54px] text-[14px] font-medium shadow-[0_16px_40px_-16px_rgba(0,0,0,0.4)] transition-all hover:bg-brand-teal hover:text-background"
          >
            Connect with us
            <span className="ml-1 h-10 w-10 rounded-full bg-brand-deep text-background flex items-center justify-center transition-transform group-hover:translate-x-0.5">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </a>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[12px] text-background/50 tracking-wide">
          <span>10 brands per season</span>
          <span className="hidden sm:block w-1 h-1 rounded-full bg-background/30" />
          <span>Response within 24 hours</span>
          <span className="hidden sm:block w-1 h-1 rounded-full bg-background/30" />
          <span>No long-term lock-in</span>
        </div>
      </div>
    </section>
  );
}

/* ============== FOOTER ============== */

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-background text-foreground bg-[radial-gradient(1170px_630px_at_0%_0%,rgba(215,238,233,0.85),transparent_70%),radial-gradient(1170px_630px_at_100%_100%,rgba(43,162,143,0.18),transparent_70%),linear-gradient(135deg,#FCFEFD_0%,#F4FBF9_100%)]">
      <div className="relative">
      <div className="mx-auto max-w-7xl px-5 lg:px-10 py-16">
        <div className="grid md:grid-cols-12 gap-10 items-end">
          <div className="md:col-span-7">
            <Logo className="h-8" />
            <h3 className="mt-8 font-display text-[34px] lg:text-[52px] tracking-tight max-w-2xl text-balance">
              Turning attention <span className="font-serif italic text-brand-deep" style={{ fontSize: "1.05em" }}>into action.</span>
            </h3>
          </div>
          <div className="md:col-span-5 flex flex-wrap gap-x-8 gap-y-4 md:justify-end text-[13px] text-foreground/70">
            {[
              ["About", "#"],
              ["Creators", "#creators"],
              ["Apply", "/contact"],
              ["FAQ", "#faq"],
            ].map(([l, h]) => (
              <a
                key={l}
                href={h}
                {...(h === "/contact" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="hover:text-foreground transition-colors"
              >{l}</a>
            ))}
            <a href="#" className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"><Instagram className="h-4 w-4" /> Instagram</a>
            <a href="#" className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"><Linkedin className="h-4 w-4" /> LinkedIn</a>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-foreground/10 flex flex-wrap items-center justify-between gap-4 text-[12px] text-foreground/50">
          <span>© {new Date().getFullYear()} PlotWise Studio. All rights reserved.</span>
          <span>theplotwise.com</span>
        </div>
      </div>
      </div>
    </footer>
  );
}

/* ============== SHARED ============== */

function Eyebrow(_: { children: React.ReactNode }) {
  return null;
}

function SectionHead({ eyebrow, title, body }: { eyebrow: string; title: React.ReactNode; body?: string }) {
  return (
    <div className="max-w-3xl">
      <h2 className="display-xl text-[40px] lg:text-[60px] text-balance">{title}</h2>
      {body && <p className="mt-5 text-foreground/65 max-w-xl text-[16px] lg:text-[17px]">{body}</p>}
    </div>
  );
}

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={`reveal-up h-full ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}