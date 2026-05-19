import { useEffect, useMemo, useRef, useState } from "react";
import { Play, Pause, ChevronLeft, ChevronRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
// Tag 1 — Problem 01
import p1_1 from "@/assets/problem-imgs/p1-1.jpg";
import p1_2 from "@/assets/problem-imgs/p1-2.jpg";
import p1_3 from "@/assets/problem-imgs/p1-3.jpg";
import p1_4 from "@/assets/problem-imgs/p1-4.jpg";
// Tag 2 — Problem 02
import p2_5 from "@/assets/problem-imgs/p2-5.jpg";
// Tag 3 — Problem 03
import p3_8 from "@/assets/problem-imgs/p3-8.jpg";
import p3_9 from "@/assets/problem-imgs/p3-9.jpg";
import p3_10 from "@/assets/problem-imgs/p3-10.jpg";
// Tag 4 — Problem 04 (funnel rows)
import p4_11 from "@/assets/problem-imgs/p4-11.jpg";
import p4_12 from "@/assets/problem-imgs/p4-12.jpg";
import p4_13 from "@/assets/problem-imgs/p4-13.jpg";
import p4_14 from "@/assets/problem-imgs/p4-14.jpg";
import p4_15 from "@/assets/problem-imgs/p4-15.jpg";
import p4_16 from "@/assets/problem-imgs/p4-16.jpg";
import p4_17 from "@/assets/problem-imgs/p4-17.jpg";
import p4_18 from "@/assets/problem-imgs/p4-18.jpg";
import p4_19 from "@/assets/problem-imgs/p4-19.jpg";

/* ============================================================
 * PlotWise — Problem Section (timeline-driven, ported handoff)
 * ============================================================ */

// Brand tokens (kept as raw values to match handoff exactly inside the canvas)
const MINT = "#91CEB0";
const TEAL = "#207770";
const CREAM = "#F8FAF9";
const RED = "#C45040";
const DARK = "#131818";
const DIM = "rgba(19,24,24,0.50)";
const DIMLT = "rgba(19,24,24,0.30)";
const SANS = '"Inter", system-ui, sans-serif';
const MONO = '"JetBrains Mono", ui-monospace, monospace';

const SCENE_DURATION = 9;
const TOTAL_DURATION = 36;

const SCENES_META = [
  { id: 0, num: "01", label: "Ads don't convert", start: 0, end: 9 },
  { id: 1, num: "02", label: "Creative fatigue", start: 9, end: 18 },
  { id: 2, num: "03", label: "Generic messaging", start: 18, end: 27 },
  { id: 3, num: "04", label: "Funnel disconnect", start: 27, end: 36 },
] as const;

/* ── Easing & helpers ─────────────────────────────────────── */
const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(max, v));

const easeOutCubic = (t: number) => --t * t * t + 1;
const easeInCubic = (t: number) => t * t * t;
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;

type Ease = (t: number) => number;
const fi = (t: number, at: number, dur = 0.5) =>
  clamp((t - at) / Math.max(dur, 0.001), 0, 1);
const fo = (t: number, at: number, dur = 0.4) =>
  clamp((at - t) / Math.max(dur, 0.001), 0, 1);
const fiE = (t: number, at: number, dur = 0.5, e: Ease = easeOutCubic) =>
  e(fi(t, at, dur));
const foE = (t: number, at: number, dur = 0.4, e: Ease = easeInCubic) =>
  e(fo(t, at, dur));
const fwE = (
  t: number,
  inAt: number,
  outAt: number,
  inDur = 0.5,
  outDur = 0.5,
) => Math.min(fiE(t, inAt, inDur), foE(t, outAt, outDur));

/* ── Local image set (mapped from handoff) ────────────────── */
const IMGS = {
  // Problem 01 — Tag 1
  creator1: p1_1,
  creator2: p1_2,
  bottle: p1_3,
  flatlay: p1_4,
  // Problem 02 — Tag 2
  serum: p2_5,
  // Problem 03 — Tag 3
  cream: p3_8,
  routine: p3_9,
  // legacy aliases
  creator3: p3_10,
  creator4: p4_11,
};

/* ── Shared scene chrome ──────────────────────────────────── */
function SceneWrapper({
  children,
  scOp,
}: {
  children: React.ReactNode;
  scOp: number;
}) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: scOp,
        background: CREAM,
        overflow: "hidden",
      }}
    >
      {children}
    </div>
  );
}

function GhostNum({ n, op }: { n: number; op: number }) {
  return (
    <div
      style={{
        position: "absolute",
        right: 60,
        top: 40,
        fontFamily: SANS,
        fontSize: 200,
        fontWeight: 700,
        color: `rgba(32,119,112,${0.045 * op})`,
        lineHeight: 1,
        letterSpacing: "-0.06em",
        userSelect: "none",
        pointerEvents: "none",
      }}
    >
      {String(n).padStart(2, "0")}
    </div>
  );
}

function ProbLabel({ n, op }: { n: number; op: number }) {
  return (
    <div
      style={{
        position: "absolute",
        left: 100,
        top: 72,
        display: "flex",
        alignItems: "center",
        gap: 10,
        opacity: op,
      }}
    >
      <span
        style={{
          fontFamily: SANS,
          fontSize: 15,
          fontWeight: 500,
          color: TEAL,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
        }}
      >
        The Problem · 0{n} / 04
      </span>
    </div>
  );
}

function H({ lines, op, dy = 0 }: { lines: string[]; op: number; dy?: number }) {
  return (
    <div
      style={{
        position: "absolute",
        left: 100,
        top: 148,
        opacity: op,
        transform: `translateY(${dy}px)`,
        maxWidth: 760,
      }}
    >
      {lines.map((l, i) => (
        <div
          key={i}
          style={{
            fontFamily: SANS,
            fontSize: 64,
            fontWeight: 600,
            color: DARK,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
          }}
        >
          {l}
        </div>
      ))}
    </div>
  );
}

function Bullets({
  items,
  op,
  top,
  accent = TEAL,
}: {
  items: string[];
  op: number;
  top: number;
  accent?: string;
}) {
  // Per design: numbers + divider always use dark green (TEAL).
  const numColor = TEAL;
  const divColor = TEAL;
  return (
    <div
      style={{
        position: "absolute",
        left: 100,
        top,
        opacity: op,
        maxWidth: 780,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {items.map((item, i) => (
          <div
            key={i}
            style={{ display: "flex", alignItems: "flex-start", gap: 14 }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                border: `1.5px solid ${numColor}50`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                marginTop: 1,
              }}
            >
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: 12,
                  fontWeight: 700,
                  color: numColor,
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <span
              style={{
                fontFamily: SANS,
                fontSize: 24,
                fontWeight: 400,
                color: "rgba(19,24,24,0.82)",
                lineHeight: 1.55,
              }}
            >
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
 * Mobile carousel — auto-scrolls right→left, hug content
 * ══════════════════════════════════════════════════════════ */
function MobileProblemCarousel() {
  const trackRef = useRef<HTMLDivElement | null>(null);

  // Mouse drag-to-scroll (touch already works natively via overflow-x-auto)
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let isDown = false;
    let startX = 0;
    let startLeft = 0;
    const onDown = (e: MouseEvent) => {
      isDown = true;
      startX = e.pageX;
      startLeft = el.scrollLeft;
      el.style.cursor = "grabbing";
    };
    const onMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      el.scrollLeft = startLeft - (e.pageX - startX);
    };
    const onUp = () => {
      isDown = false;
      el.style.cursor = "grab";
    };
    el.style.cursor = "grab";
    el.addEventListener("mousedown", onDown);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      el.removeEventListener("mousedown", onDown);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  const cards: {
    num: string;
    title: string;
    stats: { value: string; label: string; highlight?: boolean; danger?: boolean }[];
    bullets: string[];
    quote: string;
    img: string;
    quoteBorder?: string;
  }[] = [
    {
      num: "01",
      title: "Ads don't convert consistently.",
      stats: [
        { value: "4", label: "Campaigns run" },
        { value: "1", label: "Profitable", highlight: true },
        { value: "1.9×", label: "Avg ROAS" },
        { value: "75%", label: "Budget wasted", danger: true },
      ],
      bullets: [
        "Without a creative framework, results are a coin flip.",
        "You can't scale what you can't predict or repeat.",
        "Most brands run the same ad more, not better.",
      ],
      quote: "“One ad works. Three don't. Scale becomes unpredictable.”",
      img: IMGS.creator1,
    },
    {
      num: "02",
      title: "Creative fatigue happens too fast.",
      stats: [
        { value: "Day 1–5", label: "Launch & Rise" },
        { value: "Day 5–12", label: "Peak ROAS", highlight: true },
        { value: "Day 12+", label: "Decay begins", danger: true },
      ],
      bullets: [
        "Your best ad has a shelf life of ~12 days at scale.",
        "Most brands react to burnout, they don't plan for it.",
        "No pipeline means scrambling every single sprint.",
      ],
      quote: "“Without a pipeline, you're always scrambling instead of growing.”",
      img: IMGS.serum,
      quoteBorder: RED,
    },
    {
      num: "03",
      title: "The message feels generic.",
      stats: [
        { value: "12%", label: "Brand distinctiveness", danger: true },
        { value: "3 of 3", label: "Ads interchangeable" },
      ],
      bullets: [
        "Your claim could belong to any other skincare brand.",
        "Generic hooks don't build brand affinity or loyalty.",
        "Sophisticated buyers spot copy-paste content instantly.",
      ],
      quote: "“If your content could belong to any other brand, it won't create belief.”",
      img: IMGS.cream,
    },
    {
      num: "04",
      title: "Content doesn't work together across the funnel.",
      stats: [
        { value: "71%", label: "TOF → MOF drop-off", danger: true },
        { value: "84%", label: "MOF → BOF drop-off", danger: true },
      ],
      bullets: [
        "TOF content built for reach, not for narrative.",
        "MOF never references what TOF established.",
        "BOF asks for purchase without earned trust.",
      ],
      quote: "“No narrative continuity. No reinforcement. No compounding persuasion.”",
      img: p4_11,
      quoteBorder: RED,
    },
  ];

  return (
    <>
    <div
      ref={trackRef}
      className="no-scrollbar -mr-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pr-5 select-none"
      style={{ scrollBehavior: "auto", touchAction: "pan-x pan-y" }}
    >
      {cards.map((c, i) => (
        <article
          key={i}
          className="snap-start shrink-0 grow-0 rounded-[24px] border border-border text-card-foreground shadow-[0_16px_40px_-28px_rgba(19,24,24,0.18)]"
          style={{
            width: "85%",
            maxWidth: 380,
            background:
              "radial-gradient(420px 220px at 100% 100%, rgba(43,162,143,0.10), transparent 65%), radial-gradient(360px 200px at 0% 0%, rgba(215,238,233,0.55), transparent 60%), linear-gradient(135deg, #FCFEFD 0%, #F4FBF9 100%)",
            marginLeft: i === 0 ? 20 : undefined,
          }}
        >
          <div className="flex flex-col p-6">
            {/* Eyebrow */}
            <div className="mb-4 flex items-center gap-2.5">
              <span
                style={{
                  fontFamily: SANS,
                  fontSize: 10,
                  fontWeight: 500,
                  color: TEAL,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                }}
              >
                Problem · {c.num} / 04
              </span>
            </div>

            {/* Heading */}
            <h3
              className="font-display"
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: DARK,
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                marginBottom: 22,
              }}
            >
              {c.title}
            </h3>

            {/* Stats */}
            <div className="flex flex-wrap gap-2.5" style={{ marginBottom: 32 }}>
              {c.stats.map((s, k) => (
                <div
                  key={k}
                  style={{
                    padding: "12px 16px",
                    borderRadius: 10,
                    background: s.highlight
                      ? "rgba(145,206,176,0.22)"
                      : s.danger
                        ? "rgba(196,80,64,0.08)"
                        : "rgba(0,0,0,0.04)",
                    border: `1px solid ${
                      s.highlight
                        ? "rgba(32,119,112,0.28)"
                        : s.danger
                          ? "rgba(196,80,64,0.22)"
                          : "rgba(0,0,0,0.08)"
                    }`,
                    flex: "1 1 calc(50% - 5px)",
                    minWidth: 0,
                  }}
                >
                  <div
                    style={{
                      fontFamily: SANS,
                      fontSize: 16,
                      fontWeight: 700,
                      color: s.highlight ? TEAL : s.danger ? RED : DARK,
                      lineHeight: 1.1,
                    }}
                  >
                    {s.value}
                  </div>
                  <div
                    style={{
                      fontFamily: SANS,
                      fontSize: 10,
                      color: DIM,
                      marginTop: 4,
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Bullets */}
            <ul className="flex flex-col" style={{ gap: 16, marginBottom: 36 }}>
              {c.bullets.map((b, k) => (
                <li key={k} className="flex items-start gap-3">
                  <span
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      border: `1.5px solid ${TEAL}50`,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      marginTop: 2,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: MONO,
                        fontSize: 11,
                        fontWeight: 700,
                        color: TEAL,
                      }}
                    >
                      {String(k + 1).padStart(2, "0")}
                    </span>
                  </span>
                  <span
                    style={{
                      fontFamily: SANS,
                      fontSize: 14,
                      lineHeight: 1.5,
                      color: "rgba(19,24,24,0.82)",
                    }}
                  >
                    {b}
                  </span>
                </li>
              ))}
            </ul>

            {/* Quote */}
            <div
              style={{
                borderLeft: `2px solid ${(c.quoteBorder || TEAL)}55`,
                paddingLeft: 14,
                marginBottom: 22,
              }}
            >
              <p
                style={{
                  fontFamily: SANS,
                  fontSize: 12,
                  fontStyle: "italic",
                  color: "rgba(19,24,24,0.72)",
                  lineHeight: 1.5,
                }}
              >
                {c.quote}
              </p>
            </div>

          </div>
        </article>
      ))}
    </div>
    <div className="mt-6 flex items-center justify-center gap-4">
      <button
        type="button"
        aria-label="Previous"
        onClick={() => {
          const el = trackRef.current;
          if (!el) return;
          const card = el.querySelector("article") as HTMLElement | null;
          const step = card ? card.offsetWidth + 16 : el.clientWidth * 0.85;
          el.scrollBy({ left: -step, behavior: "smooth" });
        }}
        className="grid h-11 w-11 place-items-center rounded-full border border-border bg-background text-foreground/75 transition-colors hover:border-brand-dark hover:text-brand-dark"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <button
        type="button"
        aria-label="Next"
        onClick={() => {
          const el = trackRef.current;
          if (!el) return;
          const card = el.querySelector("article") as HTMLElement | null;
          const step = card ? card.offsetWidth + 16 : el.clientWidth * 0.85;
          el.scrollBy({ left: step, behavior: "smooth" });
        }}
        className="grid h-11 w-11 place-items-center rounded-full bg-brand-dark text-background transition-colors hover:bg-brand-deep"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
    </>
  );
}

function Quote({
  text,
  op,
  border = TEAL,
}: {
  text: string;
  op: number;
  border?: string;
}) {
  return (
    <div
      style={{
        position: "absolute",
        left: 100,
        bottom: 60,
        opacity: op,
        borderLeft: `2px solid ${border}35`,
        paddingLeft: 18,
      }}
    >
      <div
        style={{
          fontFamily: SANS,
          fontSize: 28,
          fontStyle: "italic",
          fontWeight: 400,
          color: "rgba(19,24,24,0.72)",
          lineHeight: 1.5,
        }}
        dangerouslySetInnerHTML={{ __html: text }}
      />
    </div>
  );
}

function StatPill({
  value,
  label,
  highlight,
  danger,
}: {
  value: string;
  label: string;
  highlight?: boolean;
  danger?: boolean;
}) {
  return (
    <div
      style={{
        padding: "18px 32px",
        minWidth: 200,
        borderRadius: 12,
        background: danger
          ? "rgba(196,80,64,0.08)"
          : highlight
            ? "rgba(32,119,112,0.08)"
            : "rgba(0,0,0,0.04)",
        border: `1px solid ${
          danger
            ? "rgba(196,80,64,0.22)"
            : highlight
              ? "rgba(32,119,112,0.22)"
              : "rgba(0,0,0,0.07)"
        }`,
      }}
    >
      <div
        style={{
          fontFamily: SANS,
          fontSize: 30,
          fontWeight: 700,
          color: danger ? RED : highlight ? TEAL : DARK,
          lineHeight: 1,
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontFamily: SANS,
          fontSize: 16,
          color: DIM,
          marginTop: 8,
          letterSpacing: "0.02em",
        }}
      >
        {label}
      </div>
    </div>
  );
}

function PlatBadge({ p }: { p: string }) {
  return (
    <span
      style={{
        fontFamily: SANS,
        fontSize: 10,
        fontWeight: 600,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: TEAL,
        background: "rgba(32,119,112,0.08)",
        border: "1px solid rgba(32,119,112,0.2)",
        borderRadius: 4,
        padding: "2px 7px",
      }}
    >
      {p}
    </span>
  );
}

/* ══════════════════════════════════════════════════════════
 * SCENE 1 · Ads don't convert consistently
 * ══════════════════════════════════════════════════════════ */
function CampaignCard({
  img,
  name,
  handle,
  category,
  platform,
  roas,
  win,
  delay,
  lt,
}: {
  img: string;
  name: string;
  handle: string;
  category: string;
  platform: string;
  roas: number;
  win: boolean;
  delay: number;
  lt: number;
}) {
  const cOp = fiE(lt, delay + 2.0, 0.7);
  const cY = (1 - fiE(lt, delay + 2.0, 0.8)) * 28;
  const bPr = fiE(lt, delay + 3.8, 1.1, easeOutCubic);
  const tOp = fiE(lt, delay + 5.2, 0.6);
  const maxH = 120;
  const barH = bPr * maxH * Math.min(roas / 5.5, 1);
  return (
    <div
      style={{
        width: 218,
        opacity: cOp,
        transform: `translateY(${cY}px)`,
        background: "#fff",
        borderRadius: 14,
        overflow: "hidden",
        border: `1px solid ${win ? "rgba(32,119,112,0.22)" : "rgba(0,0,0,0.07)"}`,
        boxShadow: win
          ? "0 6px 28px rgba(32,119,112,0.13),0 2px 8px rgba(0,0,0,0.05)"
          : "0 2px 12px rgba(0,0,0,0.06)",
      }}
    >
      <div
        style={{
          height: 164,
          overflow: "hidden",
          position: "relative",
          background: "#f0f0ee",
        }}
      >
        <img
          src={img}
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            filter: win ? "none" : "grayscale(25%) brightness(0.95)",
          }}
        />
        <div style={{ position: "absolute", top: 9, left: 9 }}>
          <PlatBadge p={platform} />
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "18px 10px 7px",
            background: "linear-gradient(transparent,rgba(19,24,24,0.5))",
            fontFamily: SANS,
            fontSize: 11,
            color: "#fff",
            fontWeight: 500,
          }}
        >
          {category}
        </div>
      </div>
      <div style={{ padding: "12px 13px 13px" }}>
        <div style={{ marginBottom: 10 }}>
          <div
            style={{
              fontFamily: SANS,
              fontSize: 13,
              fontWeight: 600,
              color: DARK,
            }}
          >
            {name}
          </div>
          <div style={{ fontFamily: SANS, fontSize: 11, color: DIM }}>
            {handle}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: 10,
            marginBottom: 10,
          }}
        >
          <div
            style={{
              width: 28,
              height: maxH,
              background: "rgba(0,0,0,0.05)",
              borderRadius: 4,
              display: "flex",
              alignItems: "flex-end",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: "100%",
                height: barH,
                background: win
                  ? `linear-gradient(180deg,${MINT},rgba(145,206,176,0.55))`
                  : `linear-gradient(180deg,${RED},rgba(196,80,64,0.5))`,
                borderRadius: "3px 3px 0 0",
              }}
            />
          </div>
          <div>
            <div
              style={{
                fontFamily: MONO,
              fontSize: 25,
                fontWeight: 700,
                color: win ? TEAL : RED,
                letterSpacing: "-0.02em",
                lineHeight: 1,
              }}
            >
              {roas}×
            </div>
            <div
              style={{
                fontFamily: SANS,
              fontSize: 12,
                color: DIM,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginTop: 2,
              }}
            >
              ROAS
            </div>
          </div>
        </div>
        <div
          style={{
            opacity: tOp,
            fontFamily: SANS,
            fontSize: 12,
            fontWeight: 600,
            color: win ? TEAL : RED,
          }}
        >
          {win ? "✓ Winner" : "✗ Underperformed"}
        </div>
      </div>
    </div>
  );
}

function Scene1({ t }: { t: number }) {
  const S = 0;
  const lt = t - S;
  const scOp = Math.min(fiE(lt, 0, 0.6), foE(lt, 8.3, 0.7));
  const lOp = fwE(lt, 0.3, 8.6, 0.5, 0.5);
  const hOp = fwE(lt, 0.5, 8.4, 0.6, 0.5);
  const hY = (1 - fiE(lt, 0.5, 0.8)) * 20;
  const stOp = fwE(lt, 1.4, 8.3, 0.6, 0.5);
  const bOp = fwE(lt, 1.8, 8.3, 0.6, 0.5);
  const iOp = fwE(lt, 6.2, 8.3, 0.7, 0.5);
  if (t < S || t > 8.8) return null;

  const cards = [
    {
      img: IMGS.creator1,
      name: "Danielle E.",
      handle: "@danielllestrada",
      category: "Glass Skin Routine",
      platform: "TikTok",
      roas: 4.8,
      win: true,
      delay: 0,
    },
    {
      img: IMGS.creator2,
      name: "Mei Lin",
      handle: "@meilinbeauty",
      category: "GRWM Morning Routine",
      platform: "Instagram",
      roas: 0.9,
      win: false,
      delay: 0.2,
    },
    {
      img: IMGS.bottle,
      name: "Serum Launch",
      handle: "@novaskinco",
      category: "Product Reveal",
      platform: "Instagram",
      roas: 1.2,
      win: false,
      delay: 0.4,
    },
    {
      img: IMGS.flatlay,
      name: "Ritual Skin",
      handle: "@ritualskinco",
      category: "Flat Lay Ad",
      platform: "TikTok",
      roas: 0.7,
      win: false,
      delay: 0.6,
    },
  ];

  return (
    <SceneWrapper scOp={scOp}>
      <GhostNum n={1} op={scOp} />
      <ProbLabel n={1} op={lOp} />
      <H lines={["Ads don't convert", "consistently."]} op={hOp} dy={hY} />

      <div
        style={{
          position: "absolute",
          left: 100,
          top: 380,
          display: "flex",
          gap: 14,
          opacity: stOp,
        }}
      >
        <StatPill value="4" label="Campaigns run" />
        <StatPill value="1" label="Profitable" highlight />
        <StatPill value="1.9×" label="Avg ROAS" />
        <StatPill value="75%" label="Budget wasted" danger />
      </div>

      <Bullets
        items={[
          "Without a creative framework, results are a coin flip.",
          "You can't scale what you can't predict or repeat.",
          "Most brands run the same ad more, not better.",
        ]}
        op={bOp}
        top={560}
      />

      <div
        style={{
          position: "absolute",
          right: 100,
          top: 130,
          display: "grid",
          gridTemplateColumns: "repeat(2,220px)",
          gap: 22,
        }}
      >
        {cards.map((c, i) => (
          <CampaignCard key={i} {...c} lt={lt} />
        ))}
      </div>

      <Quote
        text={'"One ad works. Three don\'t. Scale becomes unpredictable."'}
        op={iOp}
      />
    </SceneWrapper>
  );
}

/* ══════════════════════════════════════════════════════════
 * SCENE 2 · Creative fatigue happens too fast
 * ══════════════════════════════════════════════════════════ */
function DecayCurve({
  progress,
  W = 720,
  H = 200,
}: {
  progress: number;
  W?: number;
  H?: number;
}) {
  const pathRef = useRef<SVGPathElement | null>(null);
  const [dotPos, setDotPos] = useState<{ x: number; y: number } | null>(null);
  const px = (d: number) => (d / 30) * W;
  const py = (v: number) => H - (v / 100) * H;
  const pts: [number, number][] = [
    [0, 10],
    [2, 32],
    [5, 86],
    [7, 80],
    [10, 68],
    [13, 50],
    [16, 35],
    [20, 22],
    [25, 14],
    [30, 9],
  ];
  const path = pts.reduce((a, [d, v], i) => {
    const [pd, pv] = pts[Math.max(i - 1, 0)];
    return i === 0
      ? `M${px(d)} ${py(v)}`
      : `${a} C${px((d + pd) / 2)} ${py(pv)},${px((d + pd) / 2)} ${py(v)},${px(d)} ${py(v)}`;
  }, "");
  const [pathLen, setPathLen] = useState(900);
  const PL = pathLen;
  const drawn = progress * PL;
  const fatX = px(13);
  const fatOp = clamp((progress - 0.65) / 0.2, 0, 1);
  useEffect(() => {
    const p = pathRef.current;
    if (!p) return;
    const total = p.getTotalLength();
    setPathLen(total);
    const pt = p.getPointAtLength(Math.min(progress, 1) * total);
    setDotPos({ x: pt.x, y: pt.y });
  }, [progress, W, H]);
  const dx = dotPos?.x ?? 0;
  const dy = dotPos?.y ?? 0;
  const fat = dx > fatX;

  return (
    <svg width={W} height={H + 36} overflow="visible">
      <defs>
        <linearGradient id="dcg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={TEAL} stopOpacity="0.09" />
          <stop offset="100%" stopColor={TEAL} stopOpacity="0" />
        </linearGradient>
        <clipPath id="dcc">
          <rect width={drawn} height={H + 36} />
        </clipPath>
      </defs>
      {[25, 50, 75].map((v) => (
        <line
          key={v}
          x1={0}
          y1={py(v)}
          x2={W}
          y2={py(v)}
          stroke="rgba(19,24,24,0.07)"
          strokeWidth={1}
          strokeDasharray="4 8"
        />
      ))}
      {fatOp > 0.05 && (
        <rect
          x={fatX}
          y={0}
          width={W - fatX}
          height={H}
          fill={`rgba(196,80,64,${0.07 * fatOp})`}
        />
      )}
      <path
        d={path + ` L${px(30)} ${H} L0 ${H} Z`}
        fill="url(#dcg)"
        clipPath="url(#dcc)"
      />
      <path
        ref={pathRef}
        d={path}
        fill="none"
        stroke={fat ? RED : TEAL}
        strokeWidth={2.5}
        strokeDasharray={PL}
        strokeDashoffset={PL - drawn}
        strokeLinecap="round"
      />
      {progress > 0.05 && dotPos && <circle cx={dx} cy={dy} r={5} fill={fat ? RED : TEAL} />}
      {progress > 0.22 && (
        <g opacity={clamp((progress - 0.22) / 0.15, 0, 1)}>
          <circle cx={px(5)} cy={py(86)} r={4} fill={TEAL} opacity={0.7} />
          <text
            x={px(5) + 10}
            y={py(86) - 4}
            fill={TEAL}
            fontFamily={SANS}
            fontSize={12}
            fontWeight={500}
          >
            Peak
          </text>
        </g>
      )}
      {fatOp > 0.1 && (
        <g opacity={fatOp}>
          <line
            x1={fatX}
            y1={0}
            x2={fatX}
            y2={H}
            stroke={RED}
            strokeWidth={1}
            strokeDasharray="5 5"
            opacity={0.35}
          />
          <text
            x={fatX + 7}
            y={15}
            fill={RED}
            fontFamily={SANS}
            fontSize={11}
            fontWeight={600}
            letterSpacing="0.07em"
          >
            FATIGUE ZONE
          </text>
        </g>
      )}
      {[0, 5, 10, 15, 20, 25, 30].map((d) => (
        <g key={d}>
          <line
            x1={px(d)}
            y1={H}
            x2={px(d)}
            y2={H + 6}
            stroke="rgba(19,24,24,0.12)"
            strokeWidth={1}
          />
          <text
            x={px(d)}
            y={H + 22}
            textAnchor="middle"
            fill={DIM}
            fontFamily={MONO}
            fontSize={10}
          >
            Day {d}
          </text>
        </g>
      ))}
    </svg>
  );
}

function Scene2({ t }: { t: number }) {
  const S = 8.5;
  const lt = t - S;
  const scOp = Math.min(fiE(lt, 0, 0.6), foE(lt, 8.3, 0.7));
  const lOp = fwE(lt, 0.3, 8.6, 0.5, 0.5);
  const hOp = fwE(lt, 0.5, 8.4, 0.6, 0.5);
  const hY = (1 - fiE(lt, 0.5, 0.8)) * 20;
  const bOp = fwE(lt, 1.2, 8.3, 0.6, 0.5);
  const gOp = fwE(lt, 1.5, 8.3, 0.7, 0.5);
  const cPr = fiE(lt, 2.0, 4.5, easeInOutCubic);
  const iOp = fwE(lt, 6.8, 8.3, 0.6, 0.5);
  const decP = clamp((cPr - 0.65) / 0.3, 0, 1);
  const sat = 1 - decP * 0.88;
  const bri = 1 - decP * 0.12;
  const brnOp = clamp((decP - 0.5) / 0.4, 0, 1);
  if (t < 8.5 || t > 17.8) return null;

  return (
    <SceneWrapper scOp={scOp}>
      <GhostNum n={2} op={scOp} />
      <ProbLabel n={2} op={lOp} />
      <H lines={["Creative fatigue", "happens too fast."]} op={hOp} dy={hY} />

      <div
        style={{
          position: "absolute",
          left: 100,
          top: 360,
          display: "flex",
          gap: 16,
          opacity: bOp,
        }}
      >
        {[
          {
            day: "Day 1–5",
            label: "Launch & Rise",
            c: DIM,
            bg: "rgba(0,0,0,0.05)",
            border: "rgba(0,0,0,0.10)",
          },
          {
            day: "Day 5–12",
            label: "Peak ROAS",
            c: TEAL,
            bg: "rgba(145,206,176,0.22)",
            border: "rgba(32,119,112,0.28)",
          },
          {
            day: "Day 12+",
            label: "Decay begins",
            c: RED,
            bg: "rgba(196,80,64,0.10)",
            border: "rgba(196,80,64,0.25)",
          },
        ].map((s, i) => (
          <div
            key={i}
            style={{
              padding: "18px 32px",
              minWidth: 200,
              borderRadius: 12,
              background: s.bg,
              border: `1px solid ${s.border}`,
            }}
          >
            <div
              style={{
                fontFamily: SANS,
                fontSize: 22,
                fontWeight: 700,
                color: s.c,
              }}
            >
              {s.day}
            </div>
            <div
              style={{
                fontFamily: SANS,
                fontSize: 15,
                color: DIM,
                marginTop: 6,
              }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>

      <Bullets
        items={[
          "Your best ad has a shelf life of ~12 days at scale.",
          "Most brands react to burnout, they don't plan for it.",
          "No pipeline means scrambling every single sprint.",
        ]}
        op={bOp}
        top={540}
        accent={TEAL}
      />

      <div style={{ position: "absolute", right: 70, top: 110, opacity: gOp }}>
        <div
          style={{
            position: "relative",
            width: 470,
            height: 510,
            borderRadius: 18,
            overflow: "hidden",
            boxShadow: "0 12px 48px rgba(0,0,0,0.12)",
          }}
        >
          <img
            src={IMGS.serum}
            alt="Winning creative"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: `saturate(${sat}) brightness(${bri})`,
              display: "block",
            }}
          />
          {brnOp > 0.3 && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: `rgba(196,80,64,${0.22 * brnOp})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  background: "rgba(196,80,64,0.88)",
                  borderRadius: 10,
                  padding: "14px 28px",
                  fontFamily: SANS,
                  fontSize: 16,
                  fontWeight: 700,
                  color: "#fff",
                  letterSpacing: "0.09em",
                  opacity: brnOp,
                }}
              >
                CREATIVE BURNOUT
              </div>
            </div>
          )}
          {cPr < 0.65 && (
            <div
              style={{
                position: "absolute",
                top: 18,
                left: 18,
                background: TEAL,
                borderRadius: 8,
                padding: "8px 18px",
                fontFamily: SANS,
                fontSize: 14,
                fontWeight: 600,
                color: "#fff",
                opacity: 1 - decP * 3,
                letterSpacing: "0.06em",
              }}
            >
              ✓ Winning Ad
            </div>
          )}
        </div>
        <div style={{ marginTop: 24 }}>
          <DecayCurve progress={cPr} W={860} H={220} />
        </div>
      </div>
      <Quote
        text={
          '"Without a pipeline, you\'re always scrambling<br/>instead of growing."'
        }
        op={iOp}
        border={RED}
      />
    </SceneWrapper>
  );
}

/* ══════════════════════════════════════════════════════════
 * SCENE 3 · The message feels generic
 * ══════════════════════════════════════════════════════════ */
const BRANDS = [
  ["Lumira Beauty", "Silk & Clay", "Velvet Lab"],
  ["Aurora Skin", "Petal & Dew", "The Ritual Co."],
  ["Glow Theory", "Bare Botany", "Moonlit Skin"],
];
const CARD_IMGS_S3 = [p3_8, p3_9, p3_10];

function AdCard({ idx, lt }: { idx: number; lt: number }) {
  const delay = idx * 0.35;
  const cOp = fiE(lt, delay + 1.6, 0.7);
  const cX = (1 - fiE(lt, delay + 1.6, 0.8)) * 40;
  const cyc = fiE(lt, 4.0, 3.2);
  const row = Math.min(Math.floor(cyc * 3), 2);
  const fr = (cyc * 3) % 1;
  const bOp = Math.max(0.2, 1 - Math.abs(fr - 0.5) * 1.5);
  const brand = BRANDS[row][idx];
  const hiOp = fiE(lt, 5.5, 0.6);

  return (
    <div
      style={{
        width: 272,
        opacity: cOp,
        transform: `translateX(${cX}px)`,
        background: "#fff",
        border: "1px solid rgba(0,0,0,0.07)",
        borderRadius: 14,
        overflow: "hidden",
        boxShadow: "0 4px 18px rgba(0,0,0,0.07)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 9,
          padding: "11px 14px 9px",
          borderBottom: "1px solid rgba(0,0,0,0.05)",
        }}
      >
        <div
          style={{
            width: 26,
            height: 26,
            borderRadius: "50%",
            background: "rgba(32,119,112,0.1)",
            border: "1.5px solid rgba(32,119,112,0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontFamily: SANS,
              fontSize: 9,
              fontWeight: 700,
              color: TEAL,
            }}
          >
            {["AB", "ZM", "CR"][idx]}
          </span>
        </div>
        <div>
          <div
            style={{
              fontFamily: SANS,
              fontSize: 11,
              fontWeight: 600,
              color: DARK,
            }}
          >
            {["@aminaboraey", "@zaramali", "@cleoritual"][idx]}
          </div>
          <PlatBadge p={["TikTok", "Instagram", "TikTok"][idx]} />
        </div>
      </div>
      <div style={{ height: 175, overflow: "hidden", background: "#f4f4f2" }}>
        <img
          src={CARD_IMGS_S3[idx]}
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>
      <div style={{ padding: "13px 14px 15px" }}>
        <div
          style={{
            fontFamily: SANS,
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: TEAL,
            marginBottom: 6,
            opacity: bOp,
          }}
        >
          {brand}
        </div>
        <div
          style={{
            fontFamily: SANS,
            fontSize: 14,
            fontWeight: 700,
            color: DARK,
            lineHeight: 1.3,
            marginBottom: 6,
            background: `rgba(255,180,0,${0.15 * hiOp})`,
            borderRadius: 3,
            padding: `${2 * hiOp}px ${3 * hiOp}px`,
          }}
        >
          Deeply Hydrating Formula. Clinically Proven Results.
        </div>
        <div
          style={{
            fontFamily: SANS,
            fontSize: 12,
            color: DIM,
            lineHeight: 1.5,
            marginBottom: 13,
            background: `rgba(255,180,0,${0.07 * hiOp})`,
            borderRadius: 3,
          }}
        >
          Advanced active complex. Visible results in 14 days.
        </div>
        <div
          style={{
            display: "inline-flex",
            padding: "8px 15px",
            background: TEAL,
            borderRadius: 6,
            fontFamily: SANS,
            fontSize: 12,
            fontWeight: 600,
            color: "#fff",
            letterSpacing: "0.04em",
          }}
        >
          Shop Now →
        </div>
      </div>
    </div>
  );
}

function Scene3({ t }: { t: number }) {
  const S = 17.5;
  const lt = t - S;
  const scOp = Math.min(fiE(lt, 0, 0.6), foE(lt, 8.3, 0.7));
  const lOp = fwE(lt, 0.3, 8.6, 0.5, 0.5);
  const hOp = fwE(lt, 0.5, 8.4, 0.6, 0.5);
  const hY = (1 - fiE(lt, 0.5, 0.8)) * 20;
  const bOp = fwE(lt, 1.2, 8.3, 0.6, 0.5);
  const stOp = fwE(lt, 2.4, 8.3, 0.6, 0.5);
  const iOp = fwE(lt, 3.4, 8.3, 0.6, 0.5);
  if (t < 17.5 || t > 26.8) return null;

  return (
    <SceneWrapper scOp={scOp}>
      <GhostNum n={3} op={scOp} />
      <ProbLabel n={3} op={lOp} />
      <H lines={["The message feels", "generic."]} op={hOp} dy={hY} />

      <Bullets
        items={[
          "Your claim could belong to any other skincare brand.",
          "Generic hooks don't build brand affinity or loyalty.",
          "Sophisticated buyers spot copy-paste content instantly.",
        ]}
        op={bOp}
        top={380}
      />

      <div
        style={{
          position: "absolute",
          left: 100,
          top: 660,
          display: "flex",
          gap: 16,
          opacity: stOp,
        }}
      >
        <div
          style={{
            padding: "18px 32px",
            minWidth: 200,
            borderRadius: 12,
            background: "rgba(196,80,64,0.06)",
            border: "1px solid rgba(196,80,64,0.2)",
          }}
        >
          <div
            style={{
              fontFamily: SANS,
              fontSize: 30,
              fontWeight: 700,
              color: RED,
            }}
          >
            12%
          </div>
          <div
            style={{
              fontFamily: SANS,
              fontSize: 15,
              color: DIM,
              marginTop: 8,
            }}
          >
            Brand distinctiveness score
          </div>
        </div>
        <div
          style={{
            padding: "18px 32px",
            minWidth: 200,
            borderRadius: 12,
            background: "rgba(0,0,0,0.04)",
            border: "1px solid rgba(0,0,0,0.07)",
          }}
        >
          <div
            style={{
              fontFamily: SANS,
              fontSize: 30,
              fontWeight: 700,
              color: DARK,
            }}
          >
            3 of 3
          </div>
          <div
            style={{
              fontFamily: SANS,
              fontSize: 15,
              color: DIM,
              marginTop: 8,
            }}
          >
            Ads are interchangeable
          </div>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          right: 48,
          top: 85,
          display: "flex",
          gap: 16,
        }}
      >
        {[0, 1, 2].map((i) => (
          <AdCard key={i} idx={i} lt={lt} />
        ))}
      </div>

      <div
        style={{
          position: "absolute",
          right: 48,
          top: 668,
          width: 864,
          display: "flex",
          alignItems: "center",
          gap: 12,
          opacity: stOp,
        }}
      >
        <div style={{ flex: 1, height: 1, background: "rgba(255,160,0,0.2)" }} />
        <span
          style={{
            fontFamily: MONO,
            fontSize: 15,
            letterSpacing: "0.16em",
            color: "rgba(140,100,0,0.5)",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
          }}
        >
          Identical content · 3 different brands
        </span>
        <div style={{ flex: 1, height: 1, background: "rgba(255,160,0,0.2)" }} />
      </div>

      <Quote
        text={
          '"If your content could belong to any other brand,<br/>it won\'t create belief."'
        }
        op={iOp}
      />
    </SceneWrapper>
  );
}

/* ══════════════════════════════════════════════════════════
 * SCENE 4 · Funnel disconnect
 * ══════════════════════════════════════════════════════════ */
type TileT = { img: string; title: string; type: string; creator: string };

function Tile({
  img,
  title,
  type,
  creator,
  d,
  lt,
}: TileT & { d: number; lt: number }) {
  const op = fiE(lt, d, 0.5);
  const y = (1 - fiE(lt, d, 0.5)) * 12;
  return (
    <div
      style={{
        width: 210,
        opacity: op,
        transform: `translateY(${y}px)`,
        background: "#fff",
        border: "1px solid rgba(0,0,0,0.07)",
        borderRadius: 10,
        overflow: "hidden",
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
      }}
    >
      <div style={{ width: 210, height: 180, overflow: "hidden", background: "#f0f0ee" }}>
        <img
          src={img}
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            display: "block",
          }}
        />
      </div>
      <div style={{ padding: "8px 10px 10px" }}>
        <div
          style={{
            fontFamily: SANS,
            fontSize: 11,
            fontWeight: 600,
            color: DARK,
            marginBottom: 2,
          }}
        >
          {title}
        </div>
        <div style={{ fontFamily: MONO, fontSize: 10, color: DIM }}>{type}</div>
        <div
          style={{
            fontFamily: SANS,
            fontSize: 10,
            color: DIMLT,
            marginTop: 2,
          }}
        >
          {creator}
        </div>
      </div>
    </div>
  );
}

function FRow({
  label,
  sub,
  color,
  tiles,
  d,
  lt,
  gap,
  gOp,
}: {
  label: string;
  sub: string;
  color: string;
  tiles: TileT[];
  d: number;
  lt: number;
  gap: boolean;
  gOp: number;
}) {
  const rOp = fiE(lt, d, 0.8);
  return (
    <div style={{ position: "relative", opacity: rOp }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 9,
          marginBottom: 10,
        }}
      >
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: color,
            boxShadow: `0 0 7px ${color}`,
          }}
        />
        <span
          style={{
            fontFamily: SANS,
            fontSize: 15,
            fontWeight: 600,
            color,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >
          {label}
        </span>
        <span style={{ fontFamily: SANS, fontSize: 15, color: DIM }}>
          , {sub}
        </span>
      </div>
      <div style={{ display: "flex", gap: 12, paddingLeft: 15 }}>
        {tiles.map((ti, i) => (
          <Tile key={i} {...ti} d={d + 0.35 + i * 0.18} lt={lt} />
        ))}
      </div>
      {gap && (
        <div
          style={{
            position: "absolute",
            left: 15,
            bottom: -26,
            right: 0,
            display: "flex",
            alignItems: "center",
            gap: 10,
            opacity: gOp,
            justifyContent: "flex-end",
          }}
        >
          <div
            style={{
              width: 180,
              borderTop: "1.5px dashed rgba(196,80,64,0.3)",
            }}
          />
          <span
            style={{
              fontFamily: MONO,
              fontSize: 17,
              color: RED,
              letterSpacing: "0.12em",
              background: CREAM,
              padding: "1px 8px",
            }}
          >
            NO CONNECTION
          </span>
        </div>
      )}
    </div>
  );
}

function Scene4({ t }: { t: number }) {
  const S = 26.5;
  const lt = t - S;
  const scOp = Math.min(fiE(lt, 0, 0.6), foE(lt, 8.5, 0.5));
  const lOp = fwE(lt, 0.3, 8.6, 0.5, 0.5);
  const hOp = fwE(lt, 0.5, 8.4, 0.6, 0.5);
  const hY = (1 - fiE(lt, 0.5, 0.8)) * 20;
  const bOp = fwE(lt, 1.2, 8.3, 0.6, 0.5);
  const iOp = fwE(lt, 6.8, 8.4, 0.6, 0.5);
  const gOp = fwE(lt, 5.8, 8.5, 0.7, 0.4);
  if (t < 26.5 || t > 36) return null;

  return (
    <SceneWrapper scOp={scOp}>
      <GhostNum n={4} op={scOp} />
      <ProbLabel n={4} op={lOp} />
      <H
        lines={["Content doesn't work", "together across", "the funnel."]}
        op={hOp}
        dy={hY}
      />

      <Bullets
        items={[
          "TOF content built for reach, not for narrative.",
          "MOF never references what TOF established.",
          "BOF asks for purchase without earned trust.",
        ]}
        op={bOp}
        top={440}
      />

      <div
        style={{
          position: "absolute",
          left: 100,
          top: 700,
          display: "flex",
          gap: 16,
          opacity: gOp,
        }}
      >
        <div
          style={{
            padding: "18px 32px",
            minWidth: 220,
            borderRadius: 12,
            background: "rgba(196,80,64,0.06)",
            border: "1px solid rgba(196,80,64,0.18)",
          }}
        >
          <div
            style={{
              fontFamily: SANS,
              fontSize: 30,
              fontWeight: 700,
              color: RED,
            }}
          >
            71%
          </div>
          <div
            style={{
              fontFamily: SANS,
              fontSize: 16,
              color: DIM,
              marginTop: 8,
            }}
          >
            TOF → MOF drop-off
          </div>
        </div>
        <div
          style={{
            padding: "18px 32px",
            minWidth: 220,
            borderRadius: 12,
            background: "rgba(196,80,64,0.06)",
            border: "1px solid rgba(196,80,64,0.18)",
          }}
        >
          <div
            style={{
              fontFamily: SANS,
              fontSize: 30,
              fontWeight: 700,
              color: RED,
            }}
          >
            84%
          </div>
          <div
            style={{
              fontFamily: SANS,
              fontSize: 16,
              color: DIM,
              marginTop: 8,
            }}
          >
            MOF → BOF drop-off
          </div>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 940,
          top: 98,
          width: 930,
          display: "flex",
          flexDirection: "column",
          gap: 40,
        }}
      >
        <FRow
          label="Top of Funnel"
          sub="Awareness & Discovery"
          color={TEAL}
          tiles={[
            { img: p4_11, title: "Glass Skin Routine", type: "TikTok · Viral Reel", creator: "@danielllestrada" },
            { img: p4_12, title: "Morning GRWM", type: "Instagram · Reels", creator: "@meilinbeauty" },
            { img: p4_13, title: "Skincare Check", type: "TikTok · Trending", creator: "@amiraglows" },
          ]}
          d={2.0}
          lt={lt}
          gap
          gOp={gOp}
        />
        <FRow
          label="Mid Funnel"
          sub="Consideration & Education"
          color={MINT}
          tiles={[
            { img: p4_14, title: "Ingredient Deep Dive", type: "YouTube · Long-form", creator: "@richualofficial" },
            { img: p4_15, title: "5-Step Routine", type: "Instagram · Carousel", creator: "@skincarelab" },
            { img: p4_16, title: "Before & After", type: "TikTok · UGC", creator: "@glowjourney" },
          ]}
          d={3.4}
          lt={lt}
          gap
          gOp={gOp}
        />
        <FRow
          label="Bottom of Funnel"
          sub="Conversion & Purchase"
          color="rgba(32,119,112,0.5)"
          tiles={[
            { img: p4_17, title: "Honest Review Ad", type: "TikTok · Paid Ad", creator: "@cleoritual" },
            { img: p4_18, title: "Testimonial Reel", type: "Instagram · Story Ad", creator: "@skinbyaria" },
            { img: p4_19, title: "Last Chance Offer", type: "Meta · Retargeting", creator: "@novaskinco" },
          ]}
          d={4.8}
          lt={lt}
          gap={false}
          gOp={gOp}
        />
      </div>

      <Quote
        text={
          '"No narrative continuity. No reinforcement.<br/>No compounding persuasion."'
        }
        op={iOp}
        border={RED}
      />
    </SceneWrapper>
  );
}

/* ══════════════════════════════════════════════════════════
 * Public component: ProblemTimeline
 * ══════════════════════════════════════════════════════════ */
export function ProblemTimeline() {
  const isMobile = useIsMobile();
  const [time, setTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);

  // Scale 1920px-wide canvas to container
  const DESIGN_W = 1920;
  const DESIGN_H = 1080;
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => setScale(el.clientWidth / DESIGN_W);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  // Autoplay when in view
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setPlaying(e.isIntersecting && e.intersectionRatio > 0.2),
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Animation loop
  useEffect(() => {
    if (!playing) {
      lastTsRef.current = null;
      return;
    }
    const step = (ts: number) => {
      if (lastTsRef.current != null) {
        const dt = (ts - lastTsRef.current) / 1000;
        setTime((t) => {
          const n = t + dt;
          return n >= TOTAL_DURATION ? n % TOTAL_DURATION : n;
        });
      }
      lastTsRef.current = ts;
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastTsRef.current = null;
    };
  }, [playing]);

  const activeScene =
    SCENES_META.find((s) => time >= s.start && time < s.end) || SCENES_META[0];
  const sceneProgress = (time - activeScene.start) / SCENE_DURATION;
  const canvasH = Math.round(DESIGN_H * scale);

  const jumpTo = (sceneIdx: number) => {
    setTime(SCENES_META[sceneIdx].start + 0.3);
  };

  // memo unused but kept for clarity
  useMemo(() => time, [time]);

  if (isMobile) return <MobileProblemCarousel />;

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="mb-5">
        <div className="flex gap-1 border-b border-foreground/10 overflow-x-auto no-scrollbar">
          {SCENES_META.map((s, i) => {
            const active = activeScene.id === i;
            return (
              <button
                key={i}
                onClick={() => jumpTo(i)}
                className="relative flex items-center gap-2 whitespace-nowrap px-5 py-3 text-[13px] transition-colors"
                style={{
                  fontWeight: active ? 600 : 400,
                  color: active ? TEAL : "rgba(19,24,24,0.4)",
                  letterSpacing: "-0.01em",
                }}
              >
                <span
                  style={{
                    fontFamily: MONO,
                    fontSize: 11,
                    color: active ? MINT : "rgba(19,24,24,0.25)",
                    fontWeight: 500,
                  }}
                >
                  {s.num}
                </span>
                {s.label}
              </button>
            );
          })}

          <div className="ml-auto flex items-center pb-3 pl-3">
            <button
              onClick={() => setPlaying((p) => !p)}
              className="inline-flex items-center gap-1.5 rounded-md px-3 py-1 text-[12px] font-medium transition"
              style={{
                color: TEAL,
                border: "1px solid rgba(32,119,112,0.25)",
                background: "transparent",
              }}
              aria-label={playing ? "Pause" : "Play"}
            >
              {playing ? (
                <>
                  <Pause className="h-3 w-3" /> Pause
                </>
              ) : (
                <>
                  <Play className="h-3 w-3 fill-current" /> Play
                </>
              )}
            </button>
          </div>
        </div>

        {/* Scene-wide progress strip */}
        <div
          style={{
            height: 2,
            background: "rgba(32,119,112,0.08)",
            borderRadius: 1,
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              width: `${clamp(time / TOTAL_DURATION, 0, 1) * 100}%`,
              height: "100%",
              background: `linear-gradient(to right, ${TEAL}, ${MINT})`,
              borderRadius: 1,
              transition: playing ? "none" : "width 0.2s",
            }}
          />
        </div>
      </div>

      {/* Canvas */}
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden ring-1 ring-border"
        style={{
          height: canvasH || 600,
          background: CREAM,
          borderRadius: 28,
          boxShadow:
            "0 4px 40px rgba(19,24,24,0.06), 0 1px 0 rgba(19,24,24,0.06)",
        }}
      >
        <div
          style={{
            width: DESIGN_W,
            height: DESIGN_H,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        >
          <Scene1 t={time} />
          <Scene2 t={time} />
          <Scene3 t={time} />
          <Scene4 t={time} />
        </div>
      </div>
    </div>
  );
}
