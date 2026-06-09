/**
 * Shared layout shell for all three Solution pages.
 * Each page passes its own `SolutionPageData` config.
 */
import { useReveal } from "@/hooks/use-reveal";
import { Nav } from "./Nav";
import { Logo } from "./Logo";
import { ArrowRight, Check, ArrowUpRight } from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface SolutionPageData {
  /** hero */
  eyebrow: string;
  headline: string;
  headlineEmphasis?: string; // italic teal suffix
  tags: string[];
  subheadline: string;
  ctaLabel: string;
  ctaHref: string;
  minimumQualifier?: string;

  /** who section */
  whoHeadline: string;
  whoBody: string;
  whoCards: string[];

  /** how it works */
  howHeadline: string;
  howSteps: { title: string; body: string }[];
  howExtra?: { label: string; body: string }; // optional extra note (Challenge's strategy framework)

  /** what you get */
  deliverables: { title: string; body: string }[];

  /** why proof points */
  whyHeadline: string;
  proofPoints: { stat: string; label: string }[];

  /** data layer */
  dataHeadline: string;
  dataBody: string;

  /** closing cta */
  closingHeadline: string;
  closingSubheadline: string;
  closingCtaLabel: string;
  closingCtaHref: string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={`reveal-up ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-bold tracking-[0.20em] uppercase text-brand-deep/80 mb-5">
      {children}
    </p>
  );
}

// ── Footer (lightweight version for solution pages) ───────────────────────────

function SolFooter() {
  return (
    <footer className="bg-background border-t border-foreground/[0.07] py-10 px-5 lg:px-10">
      <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <a href="/" className="opacity-70 hover:opacity-100 transition-opacity">
          <Logo variant="dark" />
        </a>
        <div className="flex flex-wrap gap-x-8 gap-y-3 text-[13px] text-foreground/50">
          <a href="/" className="hover:text-foreground transition-colors no-underline">Home</a>
          <a href="/solutions/managed" className="hover:text-foreground transition-colors no-underline">Managed</a>
          <a href="/solutions/challenge" className="hover:text-foreground transition-colors no-underline">Challenge</a>
          <a href="/solutions/enterprise" className="hover:text-foreground transition-colors no-underline">Enterprise</a>
          <a href="/creators" className="hover:text-foreground transition-colors no-underline">Creators</a>
          <a href="/apply" className="hover:text-foreground transition-colors no-underline">Apply</a>
        </div>
        <p className="text-[12px] text-foreground/30 sm:text-right">
          © {new Date().getFullYear()} Plotwise. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export function SolutionPageLayout({ data }: { data: SolutionPageData }) {
  return (
    <div className="bg-background text-foreground antialiased">
      <Nav />

      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      <section className="relative bg-background pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-[rgba(145,206,191,0.15)] blur-[140px]" />
        </div>
        <div className="relative mx-auto max-w-5xl px-5 lg:px-10">
          <Reveal>
            <Eyebrow>{data.eyebrow}</Eyebrow>
            <h1 className="font-display text-[42px] sm:text-[56px] lg:text-[68px] font-normal leading-[1.04] tracking-[-0.03em] text-foreground text-balance">
              {data.headline}
              {data.headlineEmphasis && (
                <>
                  {" "}
                  <span className="font-serif italic text-brand-deep" style={{ fontSize: "1.02em" }}>
                    {data.headlineEmphasis}
                  </span>
                </>
              )}
            </h1>
            {/* Tags */}
            <div className="mt-7 flex flex-wrap gap-2">
              {data.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-foreground/[0.10] bg-foreground/[0.04] px-3.5 py-1.5 text-[12px] font-medium text-foreground/60"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="mt-8 text-[17px] lg:text-[18px] leading-[1.7] text-foreground/65 max-w-[600px]">
              {data.subheadline}
            </p>
            {data.minimumQualifier && (
              <p className="mt-3 text-[13px] text-foreground/40 italic">{data.minimumQualifier}</p>
            )}
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href={data.ctaHref}
                className="group inline-flex items-center gap-2 rounded-full bg-brand-deep text-background pl-7 pr-2 h-[54px] text-[14px] font-medium shadow-[0_12px_32px_-12px_rgba(0,98,92,0.50)] transition-all hover:bg-brand-dark hover:-translate-y-0.5 no-underline"
              >
                {data.ctaLabel}
                <span className="ml-1 h-10 w-10 rounded-full bg-background text-brand-deep flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </a>
              <a
                href="/solutions"
                className="inline-flex items-center h-[54px] px-6 rounded-full border border-foreground/[0.10] text-[14px] text-foreground/60 hover:text-foreground hover:border-foreground/[0.20] transition-colors no-underline"
              >
                See all solutions
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── WHO THIS IS FOR ─────────────────────────────────────────────────── */}
      <section className="bg-secondary py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <Reveal>
            <Eyebrow>Who This Is For</Eyebrow>
            <h2 className="font-display text-[34px] lg:text-[46px] font-normal tracking-[-0.025em] leading-[1.1] text-foreground max-w-3xl">
              {data.whoHeadline}
            </h2>
            <p className="mt-5 text-[15.5px] lg:text-[16px] leading-[1.75] text-foreground/65 max-w-[640px]">
              {data.whoBody}
            </p>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
            {data.whoCards.map((text, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="flex gap-3.5 rounded-xl border border-foreground/[0.08] bg-background p-6">
                  <div className="mt-0.5 w-5 h-5 rounded-full bg-brand-deep/10 flex items-center justify-center shrink-0">
                    <Check size={11} className="text-brand-deep" strokeWidth={2.5} />
                  </div>
                  <p className="text-[14.5px] leading-[1.65] text-foreground/70 italic">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ────────────────────────────────────────────────────── */}
      <section className="bg-background py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <Reveal>
            <Eyebrow>How It Works</Eyebrow>
            <h2 className="font-display text-[34px] lg:text-[46px] font-normal tracking-[-0.025em] leading-[1.1] text-foreground max-w-3xl">
              {data.howHeadline}
            </h2>
          </Reveal>
          <div className="mt-12 relative">
            {/* connector line — desktop only */}
            <div className="hidden lg:block absolute top-5 left-5 right-5 h-px bg-foreground/[0.07]" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
              {data.howSteps.map((step, i) => (
                <Reveal key={i} delay={i * 60}>
                  <div className="relative flex flex-col gap-4">
                    {/* Step number bubble */}
                    <div className="relative z-10 w-10 h-10 rounded-full bg-background border border-foreground/[0.10] flex items-center justify-center shrink-0">
                      <span className="font-mono text-[11px] text-brand-deep font-semibold">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="font-display text-[17px] font-medium tracking-tight text-foreground">
                      {step.title}
                    </h3>
                    <p className="text-[14px] leading-[1.7] text-foreground/60">{step.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            {/* Optional extra block (e.g. strategy framework) */}
            {data.howExtra && (
              <Reveal delay={200}>
                <div className="mt-10 rounded-xl border border-brand-deep/20 bg-brand-deep/[0.04] px-7 py-6">
                  <p className="text-[12px] font-bold tracking-[0.14em] uppercase text-brand-deep/70 mb-2">
                    {data.howExtra.label}
                  </p>
                  <p className="text-[14.5px] leading-[1.7] text-foreground/65">{data.howExtra.body}</p>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* ── WHAT YOU GET ────────────────────────────────────────────────────── */}
      <section className="bg-secondary py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <Reveal>
            <Eyebrow>What You Get</Eyebrow>
            <h2 className="font-display text-[34px] lg:text-[46px] font-normal tracking-[-0.025em] leading-[1.1] text-foreground max-w-3xl">
              Every engagement includes{" "}
              <span className="font-serif italic text-brand-deep" style={{ fontSize: "1.02em" }}>
                the full stack.
              </span>
            </h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.deliverables.map((d, i) => (
              <Reveal key={i} delay={i * 40}>
                <div className="rounded-xl border border-foreground/[0.08] bg-background p-6 h-full">
                  <h4 className="font-display text-[15px] font-semibold tracking-tight text-foreground">
                    {d.title}
                  </h4>
                  <p className="mt-2 text-[13.5px] leading-[1.65] text-foreground/55">{d.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY PROOF POINTS ────────────────────────────────────────────────── */}
      <section className="bg-background py-20 lg:py-28 overflow-hidden">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <Reveal>
            <h2 className="font-display text-[32px] lg:text-[44px] font-normal tracking-[-0.025em] leading-[1.1] text-foreground max-w-3xl">
              {data.whyHeadline}
            </h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-px bg-foreground/[0.07] rounded-2xl overflow-hidden ring-1 ring-foreground/[0.07]">
            {data.proofPoints.map((pt, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="bg-background p-8 lg:p-10 h-full">
                  <div className="font-display text-[36px] lg:text-[48px] font-normal tracking-tight text-brand-deep leading-none">
                    {pt.stat}
                  </div>
                  <p className="mt-4 text-[14px] leading-[1.65] text-foreground/60">{pt.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── DATA LAYER (COMING SOON) ─────────────────────────────────────────── */}
      <section className="bg-secondary py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <Reveal>
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-foreground/[0.10] bg-background px-3.5 py-1.5 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-teal animate-pulse" />
                <span className="text-[11px] font-semibold tracking-[0.12em] uppercase text-foreground/50">
                  Coming Soon
                </span>
              </div>
              <h2 className="font-display text-[32px] lg:text-[44px] font-normal tracking-[-0.025em] leading-[1.1] text-foreground">
                {data.dataHeadline}
              </h2>
              <p className="mt-5 text-[15.5px] leading-[1.75] text-foreground/60">{data.dataBody}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CLOSING CTA ─────────────────────────────────────────────────────── */}
      <section className="relative py-24 lg:py-36 overflow-hidden gradient-deep grain text-background">
        <div className="pointer-events-none absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-brand-teal/20 blur-[130px]" />
        <div className="pointer-events-none absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-white/5 blur-[130px]" />
        <div className="relative mx-auto max-w-3xl px-5 lg:px-10 text-center">
          <h2 className="font-display text-[38px] sm:text-[52px] lg:text-[60px] font-normal leading-[1.06] tracking-[-0.03em] text-balance">
            {data.closingHeadline}
          </h2>
          <p className="mt-6 text-[16px] leading-[1.7] text-background/70 max-w-[500px] mx-auto">
            {data.closingSubheadline}
          </p>
          <div className="mt-10">
            <a
              href={data.closingCtaHref}
              className="group inline-flex items-center gap-2 rounded-full bg-background text-brand-deep pl-7 pr-2 h-[54px] text-[14px] font-medium shadow-[0_16px_48px_-16px_rgba(0,0,0,0.35)] transition-all hover:bg-brand-teal hover:text-background no-underline"
            >
              {data.closingCtaLabel}
              <span className="ml-1 h-10 w-10 rounded-full bg-brand-deep text-background flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                <ArrowRight className="h-4 w-4" />
              </span>
            </a>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3 text-[12px] text-background/45 tracking-wide">
            <span>10 brands per season</span>
            <span className="hidden sm:block w-1 h-1 rounded-full bg-background/30 self-center" />
            <span>Response within 24 hours</span>
            <span className="hidden sm:block w-1 h-1 rounded-full bg-background/30 self-center" />
            <span>No long-term lock-in</span>
          </div>
        </div>
      </section>

      <SolFooter />
    </div>
  );
}
