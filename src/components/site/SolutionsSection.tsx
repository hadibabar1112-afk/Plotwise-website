import { useState } from "react";
import { useReveal } from "@/hooks/use-reveal";
import { ArrowRight, LayoutGrid, Zap, Globe } from "lucide-react";
import { SolutionsPopup } from "./SolutionsPopup";

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

type SolutionId = "managed" | "challenge" | "enterprise";

const CARDS: {
  id: SolutionId;
  label: string;
  title: string;
  description: string;
  whoFor: string;
  cta: string;
  icon: React.ElementType;
  accent: string;
  accentBg: string;
  delay: number;
  href?: string;
}[] = [
  {
    id: "managed",
    label: "THE SYSTEM",
    title: "Managed Campaigns",
    description:
      "Done-for-you creative built on audience psychology. We handle research, strategy, creator matching, production, and performance — you approve the work and watch the system compound.",
    whoFor: "For scaling beauty brands ready to hand over the creative engine.",
    cta: "Learn more",
    icon: LayoutGrid,
    accent: "var(--brand-deep)",
    accentBg: "rgba(0,98,92,0.07)",
    delay: 0,
    href: "/solutions/managed",
  },
  {
    id: "challenge",
    label: "THE PLATFORM",
    title: "Challenge Campaigns",
    description:
      "Self-serve access to our vetted beauty creator network. Launch campaigns, get matched to creators, approve content, and track performance — with every result feeding a system that gets smarter over time.",
    whoFor: "For beauty brands that want to move fast with the right creators.",
    cta: "Learn more",
    icon: Zap,
    accent: "#9b5800",
    accentBg: "rgba(155,88,0,0.07)",
    delay: 80,
  },
  {
    id: "enterprise",
    label: "THE NETWORK",
    title: "Enterprise Content Solutions",
    description:
      "Large-scale creator deployment for product launches that need reach, speed, and quality at once. We mobilize vetted creators across markets, handle sourcing through delivery, and capture performance at every touchpoint.",
    whoFor: "For beauty conglomerates and brands launching at scale.",
    cta: "Learn more",
    icon: Globe,
    accent: "#5b4898",
    accentBg: "rgba(91,72,152,0.07)",
    delay: 160,
  },
];

export function SolutionsSection() {
  const [openId, setOpenId] = useState<SolutionId | null>(null);

  return (
    <>
      <section id="solutions" className="bg-background py-24 lg:py-36 overflow-hidden">
        {/* subtle top glow */}
        <div className="pointer-events-none absolute -translate-y-1/2 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full bg-[rgba(145,206,191,0.12)] blur-[100px]" />

        <div className="relative mx-auto max-w-7xl px-5 lg:px-10">
          {/* Header */}
          <Reveal>
            <div className="text-center">
              <div className="text-[11px] font-semibold tracking-[0.18em] uppercase text-foreground/40 mb-5">
                Our Solutions
              </div>
              <h2 className="font-display text-[38px] sm:text-[48px] lg:text-[56px] font-normal leading-[1.05] tracking-[-0.03em] text-foreground">
                Three ways to work{" "}
                <span className="font-serif italic text-brand-deep" style={{ fontSize: "1.05em" }}>
                  with Plotwise.
                </span>
              </h2>
              <p className="mt-5 text-[16px] lg:text-[17px] leading-[1.7] text-foreground/60 max-w-[1020px] mx-auto">
                Every brand is at a different stage. Whether you want us to run everything, access our creator network directly, or scale creator-led growth at enterprise level — Plotwise has a solution built for you.
              </p>
            </div>
          </Reveal>

          {/* Cards */}
          <div className="mt-14 lg:mt-18 grid grid-cols-1 md:grid-cols-3 gap-5">
            {CARDS.map((card) => {
              const Icon = card.icon;
              const cardClass = "group flex flex-col h-full w-full rounded-2xl border border-foreground/[0.08] bg-background overflow-hidden transition-all duration-300 hover:border-foreground/[0.14] hover:shadow-[0_16px_48px_-16px_rgba(19,24,24,0.12)] text-left cursor-pointer no-underline";
              const cardInner = (
                <>
                  {/* Top accent line */}
                  <div className="h-[3px] w-full shrink-0" style={{ background: `linear-gradient(90deg, ${card.accent}, transparent 70%)` }} />

                  <div className="flex flex-col flex-1 p-7 lg:p-8">
                    {/* Icon + label */}
                    <div className="flex items-center gap-3 mb-6">
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                        style={{ background: card.accentBg }}
                      >
                        <Icon size={16} style={{ color: card.accent }} strokeWidth={1.75} />
                      </div>
                      <span
                        className="text-[10px] font-bold tracking-[0.16em] uppercase"
                        style={{ color: card.accent }}
                      >
                        {card.label}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-[21px] lg:text-[23px] font-normal tracking-tight text-foreground leading-[1.15]">
                      {card.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-4 text-[14px] lg:text-[14.5px] leading-[1.7] text-foreground/60 flex-1">
                      {card.description}
                    </p>

                    {/* Who it's for tag */}
                    <div className="mt-6 pt-5 border-t border-foreground/[0.07]">
                      <p className="text-[12.5px] leading-[1.5] text-foreground/45 italic">
                        {card.whoFor}
                      </p>
                    </div>

                    {/* CTA */}
                    <div
                      className="mt-5 inline-flex items-center gap-1.5 text-[13.5px] font-semibold group/link"
                      style={{ color: card.accent }}
                    >
                      {card.cta}
                      <ArrowRight
                        size={13}
                        className="transition-transform duration-200 group-hover:translate-x-0.5"
                      />
                    </div>
                  </div>
                </>
              );
              return (
                <Reveal key={card.id} delay={card.delay}>
                  {card.href ? (
                    <a href={card.href} className={cardClass}>
                      {cardInner}
                    </a>
                  ) : (
                    <button onClick={() => setOpenId(card.id)} className={cardClass}>
                      {cardInner}
                    </button>
                  )}
                </Reveal>
              );
            })}
          </div>

          {/* Section-level CTA — matches WhyItWorks band style */}
          <Reveal delay={200}>
            <div className="mt-14 lg:mt-16">
              <div className="relative overflow-hidden bg-background border border-border rounded-[20px] px-8 lg:px-11 py-9 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 shadow-[0_1px_2px_rgba(19,24,24,0.03)]">
                {/* corner glow */}
                <div className="pointer-events-none absolute -top-24 -right-16 h-[240px] w-[240px] rounded-full bg-[radial-gradient(circle,rgba(32,119,113,0.10),transparent_70%)]" />
                <div className="relative z-[2]">
                  <div className="text-[10px] tracking-[0.22em] uppercase font-medium text-brand-dark mb-2.5">
                    Not sure which solution fits?
                  </div>
                  <div className="font-display text-[24px] lg:text-[28px] leading-[1.15] tracking-[-0.02em] font-medium text-foreground max-w-[560px]">
                    Tell us about your brand.
                    <br />
                    <span className="italic font-normal text-brand-dark">
                      We'll point you in the right direction.
                    </span>
                  </div>
                </div>
                <div className="relative z-[2] flex-none">
                  <a
                    href="/apply"
                    className="group inline-flex items-center justify-center gap-2.5 whitespace-nowrap bg-brand-dark text-background px-5 py-3.5 rounded-full text-[14px] font-medium shadow-[0_12px_24px_-12px_rgba(32,119,113,0.55)] transition-all duration-300 hover:bg-brand-deep hover:-translate-y-0.5 no-underline"
                  >
                    Apply to Work With Us
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" strokeWidth={1.8} />
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Popup */}
      <SolutionsPopup
        open={openId !== null}
        solutionId={openId}
        onClose={() => setOpenId(null)}
      />
    </>
  );
}
