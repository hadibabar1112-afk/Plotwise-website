import { Search, Menu, Sparkles, ArrowRight } from "lucide-react";

export function WhyItWorks() {
  return (
    <section id="why-it-works" className="relative pt-24 lg:pt-32 pb-12 lg:pb-16 overflow-hidden">
      {/* soft ambient glow */}
      <div className="pointer-events-none absolute -top-20 right-0 h-[500px] w-[900px] rounded-full bg-brand-teal/15 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-display text-[40px] sm:text-[48px] lg:text-[54px] leading-[1.05] tracking-[-0.03em] text-foreground font-normal">
            The system{" "}
            <span className="font-serif italic text-brand-deep" style={{ fontSize: "1.05em" }}>
              behind the results
            </span>
            .
          </h2>
        </div>

        {/* Bento grid */}
        <div className="mt-14 lg:mt-16 grid grid-cols-1 lg:grid-cols-3 gap-[18px] items-stretch">
          {/* LEFT — teal large */}
          <article className="group relative rounded-[22px] overflow-hidden p-8 lg:p-9 lg:row-span-3 min-h-[400px] lg:min-h-[560px] flex flex-col text-background bg-[radial-gradient(120%_90%_at_100%_0%,#2C8A82_0%,#207771_38%,#1A5F5A_100%)] shadow-[0_24px_48px_-24px_rgba(32,119,113,0.45)] transition-transform duration-500 hover:-translate-y-1">
            {/* horizon */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_10%,rgba(255,255,255,0.18),transparent_60%)] transition-transform duration-1000 group-hover:translate-x-[-10px] group-hover:translate-y-[4px] group-hover:scale-105" />
            {/* topo lines */}
            <div
              className="pointer-events-none absolute inset-0 opacity-30"
              style={{
                WebkitMaskImage: "radial-gradient(circle at 90% 0%, #000 30%, transparent 75%)",
                maskImage: "radial-gradient(circle at 90% 0%, #000 30%, transparent 75%)",
              }}
              aria-hidden
            >
              <svg viewBox="0 0 400 600" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
                {[80, 130, 180, 240, 310, 380].map((y, i) => (
                  <path
                    key={i}
                    d={`M-20,${y} Q${120 + i * 10},${y - 40} ${260 + i * 10},${y + 10} T520,${y}`}
                    fill="none"
                    stroke="rgba(255,255,255,0.55)"
                    strokeWidth="0.6"
                  />
                ))}
              </svg>
            </div>

            {/* live tag */}
            <div className="absolute top-6 right-6 z-10 inline-flex items-center gap-1.5 text-[10px] tracking-[0.18em] uppercase text-background/85 font-medium px-2.5 py-1.5 rounded-full bg-background/10 border border-background/20 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-background animate-pulse-dot" />
              Live network
            </div>

            <div className="relative z-[2]">
              <div className="text-[10px] tracking-[0.22em] uppercase font-medium text-background/70">
                Creator network
              </div>
            </div>

            <div className="relative z-[2] mt-auto">
              <div className="font-display text-[88px] lg:text-[96px] font-light leading-none tracking-[-0.04em] mb-2 flex items-end">
                200<span className="italic font-normal">+</span>
              </div>
              <div className="text-[14px] text-background/85 mb-4">
                vetted beauty creators
              </div>
              <p className="text-[13.5px] leading-[1.6] text-background/75 max-w-[340px]">
                Hand-selected for aesthetic alignment, audience authenticity, and on-camera presence. No marketplace pulls. No batch casting.
              </p>
            </div>
          </article>

          {/* CENTER — light large */}
          <article className="group relative rounded-[22px] overflow-hidden p-8 lg:p-9 lg:row-span-3 min-h-[400px] lg:min-h-[560px] flex flex-col bg-[#F2F4F2] border border-foreground/5 transition-transform duration-500 hover:-translate-y-1">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/50 to-transparent to-30%" />
            <div className="pointer-events-none absolute -top-16 -right-16 h-[200px] w-[200px] rounded-full bg-[radial-gradient(circle,rgba(32,119,113,0.08),transparent_70%)] transition-transform duration-700 group-hover:scale-125" />

            <div className="relative z-[2]">
              <div className="text-[10px] tracking-[0.22em] uppercase font-medium text-brand-dark">
                Performance first
              </div>
            </div>

            {/* sparkline */}
            <svg
              className="absolute left-8 right-8 lg:left-9 lg:right-9 top-20 h-[90px] opacity-40 pointer-events-none"
              style={{ width: "calc(100% - 4rem)" }}
              viewBox="0 0 400 90"
              preserveAspectRatio="none"
              aria-hidden
            >
              <defs>
                <linearGradient id="sparkGrad" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#207771" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="#207771" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                className="opacity-0 group-hover:opacity-90 transition-opacity duration-700 delay-300"
                fill="url(#sparkGrad)"
                d="M0,70 L40,64 L80,66 L120,52 L160,55 L200,40 L240,42 L280,26 L320,30 L360,14 L400,16 L400,90 L0,90 Z"
              />
              <path
                fill="none"
                stroke="#207771"
                strokeWidth="1.4"
                strokeDasharray="600"
                strokeDashoffset="600"
                className="group-hover:[stroke-dashoffset:0] transition-all duration-[1600ms] ease-out delay-150"
                d="M0,70 L40,64 L80,66 L120,52 L160,55 L200,40 L240,42 L280,26 L320,30 L360,14 L400,16"
              />
              <circle cx="400" cy="16" r="3" fill="#207771" className="opacity-0 group-hover:opacity-100 transition-opacity delay-700" />
            </svg>

            <div className="relative z-[2] mt-auto">
              <div className="font-display text-[88px] lg:text-[96px] font-light leading-none tracking-[-0.04em] mb-2 flex items-end text-foreground">
                3.2<span className="italic font-normal">x</span>
              </div>
              <div className="text-[14px] text-foreground/75 mb-4">
                average ROAS uplift
              </div>
              <p className="text-[13.5px] leading-[1.6] text-foreground/60 max-w-[340px]">
                Every creative is built against a specific funnel stage and tested with structured hook variations. Signal over gut.
              </p>
            </div>

            <div className="absolute bottom-7 right-7 z-[3] h-9 w-9 rounded-full bg-background border border-foreground/10 grid place-items-center text-brand-dark transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:bg-brand-dark group-hover:text-background">
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.7} />
            </div>
          </article>

          {/* RIGHT column - 3 small cards */}
          {[
            {
              icon: <Search className="h-3 w-3" strokeWidth={1.7} />,
              label: "Strategy",
              title: <>Research <span className="italic text-brand-dark">before</span> production</>,
              copy: "We map belief gaps, identify funnel-stage angles, and script every frame before a single thing is shot. The research is the product. The video is the artifact.",
              bg: "bg-gradient-to-b from-background to-[#FAFCFB]",
            },
            {
              icon: <Menu className="h-3 w-3" strokeWidth={1.7} />,
              label: "Operations",
              title: <>End-to-end, <span className="italic text-brand-dark">no loose ends</span></>,
              copy: "Creator sourcing, scene-by-scene direction, multi-format delivery, and performance recommendations. A system, not a hand-off.",
              bg: "bg-gradient-to-b from-[#EEF3F1] to-[#E6EDEA]",
            },
            {
              icon: <Sparkles className="h-3 w-3" strokeWidth={1.7} fill="currentColor" />,
              label: "Commitment",
              title: <>10 brands per season. <span className="italic text-brand-dark">By design.</span></>,
              copy: "We scale by going deeper with fewer. If we're not the right fit, we'll tell you.",
              bg: "bg-gradient-to-b from-background to-[#F8FAF8]",
            },
          ].map((c, i) => (
            <article
              key={i}
              className={`group relative rounded-[22px] overflow-hidden p-6 lg:p-7 border border-foreground/5 ${c.bg} shadow-[0_1px_2px_rgba(19,24,24,0.03)] transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_16px_30px_-18px_rgba(19,24,24,0.18)]`}
            >
              <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-brand-dark origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500" />
              <div className="absolute top-5 right-5 h-[22px] w-[22px] rounded-full bg-brand-dark/10 text-brand-dark grid place-items-center transition-all duration-300 group-hover:bg-brand-dark/20 group-hover:-rotate-[25deg] group-hover:scale-110">
                {c.icon}
              </div>
              <div className="text-[10px] tracking-[0.22em] uppercase font-medium text-brand-dark">
                {c.label}
              </div>
              <h3 className="font-display text-[18px] lg:text-[19px] font-medium tracking-[-0.015em] leading-[1.25] text-foreground mt-2.5 mb-2.5">
                {c.title}
              </h3>
              <p className="text-[12.5px] leading-[1.55] text-foreground/55">
                {c.copy}
              </p>
            </article>
          ))}
        </div>

        {/* CTA band */}
        <div className="mt-14 lg:mt-16">
          <div className="relative overflow-hidden bg-background border border-border rounded-[20px] px-8 lg:px-11 py-9 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 shadow-[0_1px_2px_rgba(19,24,24,0.03)]">
            <div className="pointer-events-none absolute -top-24 -right-16 h-[240px] w-[240px] rounded-full bg-[radial-gradient(circle,rgba(32,119,113,0.10),transparent_70%)]" />
            <div className="relative z-[2]">
              <div className="text-[10px] tracking-[0.22em] uppercase font-medium text-brand-dark mb-2.5">
                Ready to build a system?
              </div>
              <div className="font-display text-[24px] lg:text-[28px] leading-[1.15] tracking-[-0.02em] font-medium text-foreground max-w-[560px]">
                Stop renting attention.
                <br />
                <span className="italic font-normal text-brand-dark">
                  Start owning conversion.
                </span>
              </div>
            </div>
            <div className="relative z-[2] flex flex-col sm:flex-row sm:items-center items-stretch gap-4 sm:gap-5 flex-none">
              <a
                href="/contact"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2.5 whitespace-nowrap bg-brand-dark text-background px-5 py-3.5 rounded-full text-[14px] font-medium shadow-[0_12px_24px_-12px_rgba(32,119,113,0.55)] transition-all duration-300 hover:bg-brand-deep hover:-translate-y-0.5"
              >
                Apply to Work With Us
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" strokeWidth={1.8} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}