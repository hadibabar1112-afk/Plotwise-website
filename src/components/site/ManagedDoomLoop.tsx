import { useState, useEffect, useRef, useCallback } from "react";
import { useReveal } from "@/hooks/use-reveal";

// ─── Data ─────────────────────────────────────────────────────────────────────

const STAGES = [
  {
    num: "01", shortName: "Test",
    headline: "Most lose.\nOne breaks through.",
    body: "You run a batch of creatives. Most flatline or fade. Then one starts to climb — and the signal is unmistakable.",
    metric: { label: "Batch size", value: "6", sub: "1 of 6 wins", color: "neutral" },
    hasClones: false,
  },
  {
    num: "02", shortName: "Winner",
    headline: "CAC drops.\nYou scale spend.",
    body: "One creative earns its budget back and then some. The account performs better than it has all quarter.",
    metric: { label: "CAC change", value: "↓38%", sub: "Scale immediately", color: "green" },
    hasClones: false,
  },
  {
    num: "03", shortName: "Scale",
    headline: "Two or three weeks\nof strong performance.",
    body: "The winner carries the month. You push more budget behind it. For a moment, everything is working.",
    metric: { label: "ROAS", value: "4.1×", sub: "While it lasts", color: "gold" },
    hasClones: false,
  },
  {
    num: "04", shortName: "Fatigue",
    headline: "Frequency climbs.\nCPA creeps upward.",
    body: "The same audience has seen it too many times. The creative carrying your month quietly loses its edge.",
    metric: { label: "Frequency", value: "3.2×", sub: "Winner is fading", color: "amber" },
    hasClones: false,
  },
  {
    num: "05", shortName: "Clone",
    headline: '"Make more\nlike that one."',
    body: "New creator, new hook line, new b-roll — but the angle underneath is identical. And the clones underperform. Every time.",
    metric: null as null | { label: string; value: string; sub: string; color: string },
    hasClones: true,
  },
];

const CLONES = [
  { platform: "TikTok",    title: '"Glass Skin Routine"',  handle: "@creator.two",  roas: "0.8×" },
  { platform: "Instagram", title: '"Glass Skin Routine"',  handle: "@skincare.mel", roas: "0.9×" },
  { platform: "Meta",      title: '"Morning Skin Ritual"', handle: "@dailyglow.co", roas: "0.7×" },
];

const DURATIONS = [2800, 2800, 2800, 2800, 5200];

const METRIC_COLORS: Record<string, string> = {
  neutral: "text-foreground/50",
  green:   "text-emerald-600",
  gold:    "text-brand-deep",
  amber:   "text-amber-500",
  red:     "text-red-500",
};

// ─── Performance Graph ─────────────────────────────────────────────────────────

function PerformanceGraph({ activeStage }: { activeStage: number }) {
  const TEAL  = "#207770";
  const RED   = "#C45040";
  const AMBER = "#C87830";
  const GREEN = "#2D9E6E";

  const regionColors = [
    "rgba(32,119,112,0.05)",
    "rgba(45,158,110,0.07)",
    "rgba(32,119,112,0.05)",
    "rgba(200,120,48,0.06)",
    "rgba(196,80,64,0.06)",
  ];

  const phaseRects    = [{ x: 50, w: 181 }, { x: 231, w: 180 }, { x: 411, w: 61 }, { x: 472, w: 60 }, { x: 532, w: 183 }];
  const phaseDividers = [231, 411, 472, 532];
  const phaseLabels   = [
    { x: 140, text: "TEST",    ac: TEAL  },
    { x: 321, text: "WINNER",  ac: GREEN },
    { x: 441, text: "SCALE",   ac: TEAL  },
    { x: 502, text: "FATIGUE", ac: AMBER },
    { x: 623, text: "CLONE",   ac: RED   },
  ];

  const winnerPath =
    "M 50,124 C 73,123 90,122 110,122 C 130,122 152,120 170,120 " +
    "C 190,119 215,110 231,103 C 248,95 272,68 291,63 " +
    "C 308,54 333,37 351,37 C 365,37 390,39 411,40 " +
    "C 430,42 456,53 472,57 C 490,64 514,79 532,83 " +
    "C 550,88 572,101 592,106 C 612,109 633,116 652,118 " +
    "C 668,119 690,121 715,122";

  const failLines = [
    "M 55,140 C 90,141 130,147 185,152 C 215,154 235,155 265,156",
    "M 55,146 C 82,143 118,151 158,155 C 192,158 215,159 252,160",
    "M 55,135 C 88,140 115,144 155,150 C 190,154 212,156 245,157",
  ];

  const cloneLines = [
    "M 532,116 C 554,112 572,113 595,122 C 618,131 652,146 715,156",
    "M 592,124 C 614,124 636,128 660,136 C 680,143 698,148 715,151",
    "M 622,128 C 640,130 658,136 678,144 C 694,149 706,152 715,155",
  ];

  const grid  = "rgba(19,24,24,0.07)";
  const axis  = "rgba(19,24,24,0.12)";
  const muted = "rgba(19,24,24,0.28)";

  return (
    <svg viewBox="0 0 730 200" className="w-full h-auto block overflow-visible">
      {phaseRects.map((r, i) => (
        <rect key={i} x={r.x} y="14" width={r.w} height="162"
          fill={i === activeStage ? regionColors[i] : "transparent"}
          style={{ transition: "fill 0.5s ease" }} />
      ))}

      {[50, 85, 120, 155].map(y => (
        <line key={y} x1="50" y1={y} x2="715" y2={y} stroke={grid} strokeWidth="1" />
      ))}

      <line x1="50" y1="14" x2="50" y2="176" stroke={axis} strokeWidth="1" />
      <text x="42" y="22" textAnchor="end" fontSize="7" fill={muted}>High</text>
      <text x="42" y="176" textAnchor="end" fontSize="7" fill={muted}>Low</text>
      <text x="14" y="100" textAnchor="middle" fontSize="7" fill={muted} transform="rotate(-90 14 100)">Performance</text>

      {phaseDividers.map(x => (
        <line key={x} x1={x} y1="14" x2={x} y2="176" stroke={grid} strokeWidth="1" strokeDasharray="3,5" />
      ))}

      {failLines.map((d, i) => (
        <path key={i} d={d} fill="none" stroke={`rgba(19,24,24,${0.08 - i * 0.02})`} strokeWidth="1" />
      ))}

      <path d={winnerPath} fill="none" stroke={TEAL} strokeWidth="2"
        opacity={activeStage === 0 ? 0.35 : 1}
        style={{ transition: "opacity 0.5s ease" }} />

      {activeStage >= 1 && (
        <g>
          <circle cx="351" cy="37" r="3" fill={TEAL} />
          <line x1="351" y1="37" x2="390" y2="24" stroke={TEAL} strokeWidth="0.8" opacity="0.45" />
          <text x="393" y="23" fontSize="7.5" fill={TEAL} fontWeight="600">Winner peak</text>
        </g>
      )}

      {activeStage >= 3 && (
        <text x="455" y="46" fontSize="7.5" fill={AMBER} fontWeight="600">Freq. 3.2× ↑</text>
      )}

      {activeStage >= 4 && cloneLines.map((d, i) => (
        <path key={i} d={d} fill="none" stroke={RED}
          strokeWidth="1.5" strokeDasharray="5,4"
          opacity={0.8 - i * 0.2} />
      ))}
      {activeStage >= 4 && (
        <text x="545" y="104" fontSize="7.5" fill={RED} fontWeight="600">Clones — all declining</text>
      )}

      <line x1="50" y1="176" x2="715" y2="176" stroke={axis} strokeWidth="1" />

      {phaseLabels.map((pl, i) => (
        <text key={i} x={pl.x} y="192" textAnchor="middle" fontSize="7.5"
          fontWeight="700" letterSpacing="0.08em"
          fill={i === activeStage ? pl.ac : muted}
          style={{ transition: "fill 0.4s ease" }}>
          {pl.text}
        </text>
      ))}
    </svg>
  );
}

// ─── Clone Cards ───────────────────────────────────────────────────────────────

function CloneCards({ count, stamped }: { count: number; stamped: boolean }) {
  return (
    <div className="flex gap-2.5 mt-7 flex-wrap items-start">
      <div className="w-36 shrink-0 rounded-lg bg-emerald-50 border border-emerald-200 p-3.5">
        <div className="text-[7.5px] font-bold tracking-[0.16em] uppercase text-emerald-600 mb-1.5">TikTok · Original</div>
        <div className="text-[11.5px] font-medium text-foreground/70 leading-tight mb-1">"Glass Skin Routine"</div>
        <div className="text-[9.5px] text-foreground/40 mb-2.5">@original.creator</div>
        <div className="font-serif italic text-[26px] leading-none text-emerald-600">4.8×</div>
        <div className="text-[8.5px] font-bold tracking-[0.1em] uppercase text-emerald-500 mt-0.5">✓ Winner</div>
      </div>

      <div className="flex items-center pt-9 text-foreground/25 text-sm shrink-0 px-1">→</div>

      <div className="flex gap-2.5 flex-wrap">
        {CLONES.map((c, i) => (
          <div
            key={i}
            className="w-36 rounded-lg bg-background border border-foreground/[0.08] p-3.5 relative overflow-hidden"
            style={{
              opacity: i < count ? 1 : 0,
              transform: i < count ? "translateY(0)" : "translateY(8px)",
              transition: `opacity 0.4s ease ${i * 0.08}s, transform 0.4s ease ${i * 0.08}s`,
            }}
          >
            <div className="text-[7.5px] font-bold tracking-[0.16em] uppercase text-foreground/35 mb-1.5">{c.platform}</div>
            <div className="text-[11.5px] font-medium text-foreground/60 leading-tight mb-1">{c.title}</div>
            <div className="text-[9.5px] text-foreground/30 mb-2.5">{c.handle}</div>
            <div className="font-serif italic text-[26px] leading-none text-red-500">{c.roas}</div>
            <div className="text-[8.5px] font-bold tracking-[0.1em] uppercase text-red-400 mt-0.5">✗ Underperformed</div>

            {stamped && i < count && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/80"
                style={{ transition: "opacity 0.4s ease" }}>
                <div className="-rotate-6 border border-red-300 px-2.5 py-1 text-[8px] font-bold tracking-[0.18em] uppercase text-red-500">
                  Same Angle
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Export ───────────────────────────────────────────────────────────────

export function ManagedDoomLoop() {
  const [activeStage, setActiveStage] = useState(0);
  const [contentVisible, setContentVisible] = useState(true);
  const [cloneCount, setCloneCount] = useState(0);
  const [cloneStamped, setCloneStamped] = useState(false);
  const [barFilled, setBarFilled] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const timersRef  = useRef<ReturnType<typeof setTimeout>[]>([]);
  const headerRef  = useReveal<HTMLDivElement>();

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  const addTimer = useCallback((fn: () => void, ms: number) => {
    timersRef.current.push(setTimeout(fn, ms));
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setIsInView(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const goToStage = useCallback((next: number) => {
    clearTimers();
    setBarFilled(false);
    setContentVisible(false);
    setTimeout(() => {
      setActiveStage(next);
      setCloneCount(0);
      setCloneStamped(false);
      setContentVisible(true);
    }, 320);
  }, [clearTimers]);

  useEffect(() => {
    if (!isInView) return;
    clearTimers();
    setBarFilled(false);
    addTimer(() => setBarFilled(true), 60);

    const dur = DURATIONS[activeStage];

    if (activeStage === 4) {
      CLONES.forEach((_, i) => addTimer(() => setCloneCount(i + 1), 700 + i * 900));
      addTimer(() => setCloneStamped(true), 700 + CLONES.length * 900 + 400);
      addTimer(() => goToStage(0), dur);
    } else {
      addTimer(() => goToStage(activeStage + 1), dur);
    }

    return clearTimers;
  }, [activeStage, isInView]); // eslint-disable-line react-hooks/exhaustive-deps

  const stage = STAGES[activeStage];
  const dur   = DURATIONS[activeStage];

  return (
    <section id="the-loop" ref={sectionRef} className="relative bg-secondary py-24 lg:py-32">
      <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-brand-teal/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-20 h-[28rem] w-[28rem] rounded-full bg-brand-deep/10 blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-5 lg:px-10">

        {/* Header */}
        <div ref={headerRef} className="reveal-up mb-14">
          <p className="flex items-center gap-2.5 text-[10px] font-bold tracking-[0.20em] uppercase text-brand-deep/70 mb-5">
            <span className="block w-5 h-px bg-brand-deep/30" />
            The Loop
          </p>
          <h2 className="font-display text-[clamp(26px,5vw,32px)] sm:text-[38px] lg:text-[46px] leading-[1.08] tracking-[-0.03em] font-normal text-foreground mb-5">
            You already know{" "}
            <span className="font-serif italic text-brand-deep" style={{ fontSize: "1.02em" }}>this feeling.</span>
          </h2>
          <p className="text-[15.5px] lg:text-[16px] leading-relaxed text-foreground/60 max-w-[500px]">
            You found a winner. Then you watched it die.{" "}
            <span className="text-foreground/80 font-medium">Then you paid to start over.</span>
          </p>
        </div>

        {/* Stage Tracker */}
        <div className="relative flex items-start mb-5">
          <div className="absolute top-[11px] left-[10%] right-[10%] h-px bg-foreground/[0.08]" />
          <div
            className="absolute top-[11px] left-[10%] h-px bg-foreground/20"
            style={{
              width: `calc(${(activeStage / (STAGES.length - 1)) * 80}%)`,
              transition: "width 0.5s ease",
            }}
          />
          {STAGES.map((s, i) => (
            <div
              key={i}
              className="flex-1 flex flex-col items-center gap-[7px] cursor-pointer relative z-10"
              onClick={() => goToStage(i)}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[7.5px] font-bold tracking-[0.04em] border transition-all duration-300 ${
                  i === activeStage
                    ? "bg-brand-deep border-brand-deep text-background shadow-[0_0_20px_rgba(32,119,112,0.28)]"
                    : i < activeStage
                    ? "bg-foreground/[0.06] border-foreground/[0.10] text-foreground/30"
                    : "bg-background border-foreground/[0.15] text-foreground/25"
                }`}
              >
                {s.num}
              </div>
              <span
                className={`text-[8.5px] font-bold tracking-[0.1em] uppercase text-center transition-colors duration-300 ${
                  i === activeStage ? "text-brand-deep" : "text-foreground/25"
                }`}
              >
                {s.shortName}
              </span>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="h-px bg-foreground/[0.06] mb-7 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-brand-deep to-brand-teal origin-left"
            style={{
              transform: barFilled ? "scaleX(1)" : "scaleX(0)",
              transition: barFilled ? `transform ${dur - 360}ms linear` : "none",
            }}
          />
        </div>

        {/* Visualizer */}
        <div className="rounded-2xl bg-background border border-foreground/[0.08] px-6 sm:px-10 pt-10 pb-8 mb-14">
          <div className="grid sm:grid-cols-[1fr_260px] gap-10 sm:gap-12 items-start min-h-[200px]">

            {/* Left: stage narrative */}
            <div
              style={{
                opacity: contentVisible ? 1 : 0,
                transform: contentVisible ? "translateY(0)" : "translateY(10px)",
                transition: "opacity 0.35s ease, transform 0.35s ease",
              }}
            >
              <div className="text-[9px] font-bold tracking-[0.16em] uppercase text-foreground/30 mb-3.5">
                {stage.num} / 05
              </div>
              <h3 className="font-serif italic text-[30px] sm:text-[34px] font-medium leading-[1.14] text-foreground mb-4 whitespace-pre-line">
                {stage.headline}
              </h3>
              <p className="text-[14px] leading-[1.75] text-foreground/60 max-w-[400px] font-light">
                {stage.body}
              </p>
              {stage.hasClones && (
                <CloneCards count={cloneCount} stamped={cloneStamped} />
              )}
            </div>

            {/* Right: metric card */}
            <div
              style={{
                opacity: contentVisible ? 1 : 0,
                transition: "opacity 0.35s ease",
              }}
            >
              {stage.metric && (
                <div className="rounded-xl bg-secondary border border-foreground/[0.07] px-6 py-5">
                  <div className="text-[8.5px] font-bold tracking-[0.14em] uppercase text-foreground/35 mb-2.5">
                    {stage.metric.label}
                  </div>
                  <div className={`font-serif italic text-[54px] font-medium leading-none mb-2 ${METRIC_COLORS[stage.metric.color]}`}>
                    {stage.metric.value}
                  </div>
                  <div className="text-[9px] font-semibold tracking-[0.08em] uppercase text-foreground/30">
                    {stage.metric.sub}
                  </div>
                </div>
              )}
              {stage.hasClones && cloneCount > 0 && (
                <div className="rounded-xl bg-secondary border border-foreground/[0.07] px-6 py-5 mt-2.5">
                  <div className="text-[8.5px] font-bold tracking-[0.14em] uppercase text-foreground/35 mb-2.5">
                    Clone avg ROAS
                  </div>
                  <div className={`font-serif italic text-[54px] font-medium leading-none mb-2 ${METRIC_COLORS.red}`}>
                    0.8×
                  </div>
                  <div className="text-[9px] font-semibold tracking-[0.08em] uppercase text-foreground/30">
                    New outfit. Same angle.
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Performance graph */}
          <div className="mt-10 border-t border-foreground/[0.06] pt-7">
            <div className="text-[8.5px] font-bold tracking-[0.14em] uppercase text-foreground/30 mb-3.5">
              Creative Performance Over Time
            </div>
            <PerformanceGraph activeStage={activeStage} />
          </div>
        </div>

        {/* Body copy */}
        <div className="max-w-[660px] mx-auto mb-14 space-y-5 text-[15.5px] lg:text-[16.5px] leading-[1.85] text-foreground/60 font-light">
          <p>
            Here's the loop every scaling beauty brand is stuck in. You test a batch of creatives. Most lose.{" "}
            <strong className="text-foreground/80 font-medium">One breaks through.</strong> CAC drops, you
            scale spend, and for two or three weeks the account performs better than it has all quarter.
          </p>
          <p>
            Then the curve bends. Frequency climbs, CPA creeps upward, and{" "}
            <strong className="text-foreground/80 font-medium">
              the winner carrying your month quietly loses its edge.
            </strong>{" "}
            So you brief your team to make more like that one.
          </p>
          <p>
            And the clones underperform. Every time. Because a clone isn't a new ad — it's the same
            idea in a different outfit. Surface-level changes don't reset fatigue. They accelerate it.
          </p>
          <p>
            The real problem is what cloning lets you avoid:{" "}
            <strong className="text-foreground/80 font-medium">discovering the next angle.</strong> That's
            why the clones lose. Not bad luck. No new ground.
          </p>
        </div>

        {/* Final callout */}
        <div className="relative border border-foreground/[0.08] rounded-2xl px-10 sm:px-16 py-14 text-center bg-background overflow-hidden">
          <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-60 h-px bg-gradient-to-r from-transparent via-brand-deep/25 to-transparent" />
          <p className="font-display text-[clamp(18px,3vw,30px)] text-foreground/40 leading-snug mb-1.5 font-light">
            Fatigue isn't a creative problem.
          </p>
          <p className="font-display text-[clamp(18px,3vw,30px)] text-foreground font-normal leading-snug mb-6">
            It's a discovery problem.
          </p>
          <p className="text-[12px] text-foreground/40 font-semibold tracking-[0.08em] uppercase">
            Brands don't run out of videos. They run out of{" "}
            <span className="text-brand-deep">angles.</span>
          </p>
        </div>

      </div>
    </section>
  );
}
