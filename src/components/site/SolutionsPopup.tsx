import { useEffect, useRef, useState, useCallback } from "react";
import { ArrowRight, Check, X } from "lucide-react";

// ── Solution data ─────────────────────────────────────────────────────────────

interface SolutionData {
  id: "managed" | "challenge" | "enterprise";
  label: string;
  labelColor: string;
  labelBg: string;
  title: string;
  whoFor: string;
  subheadline: string;
  ctaLabel: string;
  ctaHref: string;
  steps: { title: string; body: string }[];
  deliverables: { title: string; body: string }[];
  proofPoints: { stat: string; label: string }[];
  dataTeaser: string;
}

const SOLUTIONS: Record<string, SolutionData> = {
  managed: {
    id: "managed",
    label: "THE SYSTEM",
    labelColor: "#00625C",
    labelBg: "rgba(0,98,92,0.09)",
    title: "Managed Campaigns",
    whoFor: "For scaling beauty brands ready to hand over the creative engine.",
    subheadline:
      "Done-for-you creative built on audience psychology. We handle research, strategy, creator matching, production, and performance — you approve the work and watch the system compound.",
    ctaLabel: "Apply for Managed Campaigns",
    ctaHref: "/managed",
    steps: [
      { title: "Research", body: "We map your audience's beliefs, fears, and motivations. Production is the last step, not the first." },
      { title: "Strategy", body: "Belief gaps become creative angles, sorted by funnel stage — awareness, consideration, conversion." },
      { title: "Production", body: "Creators matched to the persona they convert. Every video ships with structurally different hooks." },
      { title: "Compound", body: "Performance data feeds back in. Winning hooks rewrite the brief. The next batch starts smarter." },
    ],
    deliverables: [
      { title: "Audience & persona research", body: "Who your buyer is, what she believes, and what needs to change." },
      { title: "Funnel-mapped creative angles", body: "TOF for attention. MOF for consideration. BOF for conversion." },
      { title: "Creator matching & management", body: "Vetted beauty creators matched to your personas. We handle everything." },
      { title: "Multi-hook video production", body: "Every video ships with two hooks. Twice the signal, zero guesswork." },
      { title: "Performance tracking & iteration", body: "We track what works, retire what doesn't, and start the next cycle smarter." },
      { title: "Multi-format delivery", body: "9:16, 1:1, 4:5, 16:9. Ready for Reels, TikTok, Shorts, and feed." },
    ],
    proofPoints: [
      { stat: "3.2×", label: "Average ROAS uplift across managed partners" },
      { stat: "2 hooks", label: "Twice the testing surface from day one" },
      { stat: "10 brands", label: "Per season — we go deeper with fewer" },
    ],
    dataTeaser: "Behind every Managed engagement is the Plotwise data layer — a compounding library of performance signals structured by persona and funnel stage.",
  },
  challenge: {
    id: "challenge",
    label: "THE PLATFORM",
    labelColor: "#9b5800",
    labelBg: "rgba(155,88,0,0.08)",
    title: "Challenge Campaigns",
    whoFor: "For beauty brands that want to move fast with the right creators.",
    subheadline:
      "Self-serve access to our vetted beauty creator network. Launch campaigns, get matched to creators, approve content, and track performance — with every result feeding a system that gets smarter.",
    ctaLabel: "Join the Challenge Platform",
    ctaHref: "/challenge",
    steps: [
      { title: "Connect your brand", body: "Sign up, connect your ad account, and tell us what you're looking for — product, audience, goals." },
      { title: "Get matched to creators", body: "Our system ranks and surfaces the best-fit beauty creators for your brief. You pick the roster." },
      { title: "Launch and approve", body: "Creators produce. You review and approve. Content ships in the formats you need." },
      { title: "Track and compound", body: "Every campaign captures performance data — hook rate, CTR, ROAS — so the next one starts sharper." },
      { title: "Open Challenges", body: "Post your brief as an open challenge. Creators compete and submit — the top performers become your assets." },
    ],
    deliverables: [
      { title: "Vetted creator network", body: "Beauty-only. Hand-selected for aesthetic alignment, audience authenticity, and camera presence." },
      { title: "Smart creator matching", body: "Ranked by fit for your brand, product, and audience persona." },
      { title: "Open challenges", body: "Post your brief as a challenge. Creators compete, you keep the top-performing content." },
      { title: "Plotwise strategy framework", body: "Full access to persona mapping, funnel-stage angles, and hook structures." },
      { title: "Ad account integration", body: "Connect Meta or TikTok. Performance flows back automatically." },
      { title: "Performance capture", body: "Structured data on every campaign. What worked, what didn't, and why." },
    ],
    proofPoints: [
      { stat: "Beauty-only", label: "Every creator in the network understands beauty content — no generalists" },
      { stat: "Tracked", label: "Every campaign captures structured data. The system learns whether you do or not" },
      { stat: "Focused", label: "The narrower the network, the sharper the matches" },
    ],
    dataTeaser: "Every campaign you run on the Challenge Platform captures structured performance data — creator, hook, funnel stage, persona, outcome.",
  },
  enterprise: {
    id: "enterprise",
    label: "THE NETWORK",
    labelColor: "#5b4898",
    labelBg: "rgba(91,72,152,0.08)",
    title: "Enterprise Content Solutions",
    whoFor: "For beauty conglomerates and brands launching at scale.",
    subheadline:
      "Large-scale creator deployment for product launches that need reach, speed, and quality at once. We mobilize vetted creators across markets, handle sourcing through delivery, and capture performance at every touchpoint.",
    ctaLabel: "Get in Touch",
    ctaHref: "/enterprise",
    steps: [
      { title: "Brief and scope", body: "Define the launch — product, markets, timeline, creator volume. We build the deployment plan." },
      { title: "Creator mobilization", body: "We activate creators from our vetted beauty network, matched by market, persona, and aesthetic." },
      { title: "Production and delivery", body: "Creators produce. We manage sourcing, briefs, direction, review, and multi-format delivery." },
      { title: "Performance capture", body: "Reach, engagement, and conversion signals flow back from every activation. Every launch makes the next one sharper." },
    ],
    deliverables: [
      { title: "Large-scale creator deployment", body: "Deployed from a vetted, beauty-only network. No cold starts." },
      { title: "Multi-market reach", body: "US, UK, Canada, Australia, EU, and beyond. One partner, global deployment." },
      { title: "Fast launch speed", body: "From brief to live content in days. Built for product launch timelines." },
      { title: "Full production management", body: "Sourcing, briefing, directing, reviewing, delivering. End-to-end." },
      { title: "Performance data at every touchpoint", body: "Reach, engagement, and conversion captured per creator, per market." },
      { title: "Creator network density", body: "Every launch deepens the network. The next deployment starts with a stronger bench." },
    ],
    proofPoints: [
      { stat: "Beauty-native", label: "Every creator understands beauty content — no generalists, no marketplace pulls" },
      { stat: "Days", label: "From brief to market. The infrastructure is already built" },
      { stat: "Structured", label: "Every activation captures structured data — not vanity metrics" },
    ],
    dataTeaser: "Enterprise activations generate massive volumes of structured performance data — across creators, markets, personas, and content formats.",
  },
};

// ── Component ─────────────────────────────────────────────────────────────────

export function SolutionsPopup({
  open,
  solutionId,
  onClose,
}: {
  open: boolean;
  solutionId: "managed" | "challenge" | "enterprise" | null;
  onClose: () => void;
}) {
  const [phase, setPhase] = useState<"peek" | "full">("peek");
  const [mounted, setMounted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const data = solutionId ? SOLUTIONS[solutionId] : null;

  // Mount → animate in
  useEffect(() => {
    if (!open) {
      setMounted(false);
      setPhase("peek");
      return;
    }
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setMounted(true)));
    return () => cancelAnimationFrame(id);
  }, [open]);

  // Reset scroll when solution changes
  useEffect(() => {
    if (!open) return;
    scrollRef.current?.scrollTo({ top: 0, behavior: "auto" });
    setPhase("peek");
  }, [solutionId, open]);

  // Lock body scroll + Escape key
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  // Scroll → go full
  const onScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    if (phase === "peek" && e.currentTarget.scrollTop > 4) setPhase("full");
  }, [phase]);

  // Wheel handler
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || !open) return;
    const handler = (e: WheelEvent) => {
      if (phase === "peek" && e.deltaY > 0) setPhase("full");
      else if (phase === "full" && el.scrollTop <= 0 && e.deltaY < -20) setPhase("peek");
    };
    el.addEventListener("wheel", handler, { passive: true });
    return () => el.removeEventListener("wheel", handler);
  }, [phase, open]);

  // Touch drag-down to collapse
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || !open) return;
    let startY = 0;
    const onTouchStart = (e: TouchEvent) => { startY = e.touches[0].clientY; };
    const onTouchMove = (e: TouchEvent) => {
      if (phase !== "full") return;
      if (el.scrollTop <= 0 && e.touches[0].clientY - startY > 40) setPhase("peek");
    };
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: true });
    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
    };
  }, [phase, open]);

  if (!open || !data) return null;

  const accentColor = data.labelColor;

  return (
    <>
      <style>{CSS}</style>
      <div
        className={`sp-shell ${mounted ? "sp-mounted" : ""} sp-phase-${phase}`}
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      >
        <div className="sp-card">
          {/* Handle bar */}
          <div className="sp-handle-bar">
            <div className="sp-grip" />
            <button className="sp-close" onClick={onClose} aria-label="Close">
              <X size={16} strokeWidth={1.8} />
            </button>
          </div>

          {/* Scrollable content */}
          <div className="sp-scroll" ref={scrollRef} onScroll={onScroll}>
            <div className="sp-inner">

              {/* ── Header ─────────────────────────────────────────────────── */}
              <header className="sp-header">
                {/* Accent top line */}
                <div className="sp-accent-line" style={{ background: `linear-gradient(90deg, ${accentColor}, transparent 70%)` }} />
                <div className="sp-label-row">
                  <span className="sp-label" style={{ color: accentColor, background: data.labelBg }}>
                    {data.label}
                  </span>
                </div>
                <h1 className="sp-title">{data.title}</h1>
                <p className="sp-subheadline">{data.subheadline}</p>
                <p className="sp-who-for">{data.whoFor}</p>
                <a href={data.ctaHref} className="sp-cta" style={{ background: accentColor }}>
                  {data.ctaLabel}
                  <ArrowRight size={14} strokeWidth={1.8} />
                </a>
              </header>

              {/* ── How it works ────────────────────────────────────────────── */}
              <section className="sp-section">
                <h2 className="sp-section-title">How it works</h2>
                <div className="sp-steps">
                  {data.steps.map((step, i) => (
                    <div className="sp-step" key={i}>
                      <div className="sp-step-num" style={{ color: accentColor, borderColor: `${accentColor}30` }}>
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <div>
                        <div className="sp-step-title">{step.title}</div>
                        <div className="sp-step-body">{step.body}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── What you get ────────────────────────────────────────────── */}
              <section className="sp-section">
                <h2 className="sp-section-title">What you get</h2>
                <div className="sp-deliverables">
                  {data.deliverables.map((d, i) => (
                    <div className="sp-deliverable" key={i}>
                      <div className="sp-d-check" style={{ background: `${accentColor}12`, color: accentColor }}>
                        <Check size={10} strokeWidth={2.5} />
                      </div>
                      <div>
                        <div className="sp-d-title">{d.title}</div>
                        <div className="sp-d-body">{d.body}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── Proof points ────────────────────────────────────────────── */}
              <section className="sp-section">
                <div className="sp-proof-grid">
                  {data.proofPoints.map((pt, i) => (
                    <div className="sp-proof-block" key={i}>
                      <div className="sp-proof-stat" style={{ color: accentColor }}>{pt.stat}</div>
                      <div className="sp-proof-label">{pt.label}</div>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── Data layer teaser ───────────────────────────────────────── */}
              <section className="sp-data-teaser" style={{ borderColor: `${accentColor}20`, background: `${accentColor}05` }}>
                <div className="sp-data-badge">
                  <span className="sp-data-dot" />
                  Coming Soon
                </div>
                <p className="sp-data-body">{data.dataTeaser}</p>
              </section>

              {/* ── Bottom CTA ──────────────────────────────────────────────── */}
              <div className="sp-bottom-cta">
                <a href={data.ctaHref} className="sp-cta sp-cta-lg" style={{ background: accentColor }}>
                  {data.ctaLabel}
                  <ArrowRight size={15} strokeWidth={1.8} />
                </a>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ── CSS ───────────────────────────────────────────────────────────────────────

const CSS = `
.sp-shell {
  position: fixed; inset: 0; z-index: 500;
  /* Override the global "main > div { padding: 56px }" rule — this div renders
     as a direct child of <main>, so without the override the shell gets 56px
     padding-bottom which lifts the card off the viewport bottom. */
  padding: 0 !important;
  margin: 0 !important;
  background: rgba(8,12,12,0);
  transition: background .35s ease;
  display: flex; align-items: flex-end; justify-content: center;
  font-family: 'Inter', system-ui, sans-serif;
}
.sp-shell.sp-mounted { background: rgba(8,12,12,0.50); }

.sp-card {
  /* Match CaseStudyPopup proportions */
  width: min(1320px, calc(100% - 48px));
  /* dvh = dynamic viewport height (excludes mobile browser chrome) */
  height: 60vh; height: 60dvh;
  background: #fff;
  border-radius: 24px 24px 0 0;
  box-shadow: 0 -30px 80px rgba(8,12,12,0.18);
  transform: translateY(100%);
  transition:
    height .55s cubic-bezier(.2,.7,.3,1),
    transform .55s cubic-bezier(.2,.7,.3,1),
    border-radius .35s,
    width .55s cubic-bezier(.2,.7,.3,1);
  overflow: hidden;
  display: flex; flex-direction: column;
  border: 1px solid #e6ebea; border-bottom: none;
}
.sp-shell.sp-mounted .sp-card { transform: translateY(0); }
.sp-shell.sp-phase-full .sp-card {
  height: 100vh; height: 100dvh;
  width: 100%; border-radius: 0; border: none;
}

.sp-handle-bar {
  flex-shrink: 0;
  position: relative;
  z-index: 10;
  /* Tall enough to fully contain the 36 px close button */
  padding: 0 24px;
  height: 56px;
  display: flex; justify-content: center; align-items: center;
  background: #fff;
  border-bottom: 1px solid #e6ebea;
}
.sp-grip { width: 44px; height: 4px; border-radius: 2px; background: #c5cdcd; }
.sp-close {
  position: absolute; right: 18px; top: 50%; transform: translateY(-50%);
  width: 36px; height: 36px; border-radius: 50%;
  background: #f5f7f6; color: #0e1414;
  display: grid; place-items: center; border: none; cursor: pointer;
  transition: background .2s, color .2s;
}
.sp-close:hover { background: #009689; color: white; }

.sp-scroll {
  flex: 1; overflow-y: auto;
  scroll-behavior: smooth;
  scrollbar-width: none; -ms-overflow-style: none;
}
.sp-scroll::-webkit-scrollbar { display: none; }

.sp-inner {
  max-width: 1320px;
  margin: 0 auto;
  padding: 40px 48px 80px;
}

/* ── Header ── */
.sp-accent-line { height: 3px; width: 100%; margin-bottom: 24px; border-radius: 2px; }
.sp-label-row { margin-bottom: 12px; }
.sp-label {
  display: inline-block;
  font-size: 10px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase;
  padding: 5px 12px; border-radius: 999px;
}
.sp-title {
  font-family: 'Inter Tight', 'Inter', system-ui, sans-serif;
  font-size: clamp(28px, 4vw, 48px); font-weight: 400;
  letter-spacing: -0.025em; line-height: 1.1;
  color: #0e1414; margin: 0 0 16px;
}
.sp-subheadline {
  font-size: 15.5px; line-height: 1.7; color: #4a5a5a;
  max-width: 680px; margin: 0 0 10px;
}
.sp-who-for {
  font-size: 13.5px; color: #7a8a8a; font-style: italic;
  margin: 0 0 24px;
}
.sp-cta {
  display: inline-flex; align-items: center; gap: 8px;
  color: white; text-decoration: none;
  padding: 12px 22px; border-radius: 999px;
  font-size: 13.5px; font-weight: 500;
  box-shadow: 0 8px 20px -8px rgba(0,0,0,0.25);
  transition: opacity .2s, transform .2s;
}
.sp-cta:hover { opacity: .88; transform: translateY(-1px); }
.sp-cta-lg { font-size: 14.5px; padding: 14px 26px; }

/* ── Sections ── */
.sp-section { margin-top: 52px; }
.sp-section-title {
  font-family: 'Inter Tight', 'Inter', system-ui, sans-serif;
  font-size: 20px; font-weight: 500; letter-spacing: -0.015em;
  color: #0e1414; margin: 0 0 24px;
  padding-bottom: 14px; border-bottom: 1px solid #e6ebea;
}

/* Steps */
.sp-steps { display: grid; gap: 18px; }
.sp-step { display: flex; gap: 16px; align-items: flex-start; }
.sp-step-num {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 11px; font-weight: 600; letter-spacing: 0.06em;
  min-width: 28px; height: 28px; border-radius: 50%; border: 1px solid;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 1px;
}
.sp-step-title {
  font-size: 14.5px; font-weight: 600; color: #0e1414; margin-bottom: 3px;
}
.sp-step-body { font-size: 13.5px; line-height: 1.65; color: #5a6a6a; }

/* Deliverables */
.sp-deliverables {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}
.sp-deliverable { display: flex; gap: 12px; align-items: flex-start; }
.sp-d-check {
  width: 20px; height: 20px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; margin-top: 2px;
}
.sp-d-title { font-size: 13.5px; font-weight: 600; color: #0e1414; margin-bottom: 2px; }
.sp-d-body { font-size: 12.5px; line-height: 1.55; color: #6b7b7b; }

/* Proof points */
.sp-proof-grid {
  display: grid; grid-template-columns: repeat(3, 1fr);
  gap: 1px; background: #e6ebea;
  border: 1px solid #e6ebea; border-radius: 14px; overflow: hidden;
}
.sp-proof-block { background: #fff; padding: 22px 24px; }
.sp-proof-stat {
  font-family: 'Inter Tight', 'Inter', system-ui, sans-serif;
  font-size: 30px; font-weight: 400; letter-spacing: -0.02em;
  line-height: 1; margin-bottom: 8px;
}
.sp-proof-label { font-size: 12.5px; line-height: 1.5; color: #6b7b7b; }

/* Data teaser */
.sp-data-teaser {
  margin-top: 48px;
  border: 1px solid;
  border-radius: 14px;
  padding: 22px 24px;
}
.sp-data-badge {
  display: inline-flex; align-items: center; gap: 7px;
  font-size: 10px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase;
  color: #7a8a8a; margin-bottom: 10px;
}
.sp-data-dot {
  width: 7px; height: 7px; border-radius: 50%;
  background: #91CEBF; animation: spPulse 2s ease-in-out infinite;
}
@keyframes spPulse { 0%,100% { opacity: 1; } 50% { opacity: 0.35; } }
.sp-data-body { font-size: 13.5px; line-height: 1.7; color: #5a6a6a; margin: 0; }

/* Bottom CTA */
.sp-bottom-cta { margin-top: 48px; display: flex; }

/* Responsive */
@media (max-width: 860px) {
  .sp-inner { padding: 28px 20px 72px; }
  .sp-deliverables { grid-template-columns: 1fr; }
  .sp-proof-grid { grid-template-columns: 1fr; }
}
@media (max-width: 560px) {
  .sp-title { font-size: 26px; }
  .sp-proof-grid { grid-template-columns: 1fr 1fr; }
  .sp-proof-grid .sp-proof-block:last-child { grid-column: 1 / -1; }
}
`;
