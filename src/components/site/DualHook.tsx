import { useEffect, useRef, useState } from "react";
import reel1 from "@/assets/hero-reel-1.jpg";
import reel2 from "@/assets/hero-reel-2.jpg";

const hooksA = [
  "Wait — you're applying it wrong.",
  "I tried this for 30 days. Here's what happened.",
  "The one step everyone skips.",
];
const hooksB = [
  "Stop. Don't buy another serum until you watch this.",
  "Your routine is missing one thing.",
  "This is the only one that worked.",
];
const ctrAVals = ["0.8%", "1.1%", "0.9%"];
const ctrBVals = ["2.4%", "2.7%", "2.3%"];
const deltas = ["+200%", "+145%", "+155%"];

function useTyping(text: string, active: boolean, startDelay = 0) {
  const [out, setOut] = useState("");
  useEffect(() => {
    if (!active) return;
    setOut("");
    let i = 0;
    let cancelled = false;
    const start = setTimeout(function tick() {
      if (cancelled) return;
      if (i <= text.length) {
        setOut(text.slice(0, i));
        i++;
        setTimeout(tick, 28 + Math.random() * 40);
      }
    }, startDelay);
    return () => {
      cancelled = true;
      clearTimeout(start);
    };
  }, [text, active, startDelay]);
  return out;
}

export function DualHook() {
  const stageRef = useRef<HTMLDivElement>(null);
  const closingRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [closingIn, setClosingIn] = useState(false);
  const [idx, setIdx] = useState(0);
  const [showWinner, setShowWinner] = useState(false);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setActive(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = closingRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setClosingIn(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!active) return;
    const t = setInterval(() => {
      setShowWinner(false);
      setIdx((i) => (i + 1) % hooksA.length);
    }, 6500);
    return () => clearInterval(t);
  }, [active]);

  useEffect(() => {
    if (!active) return;
    setShowWinner(false);
    const t = setTimeout(() => setShowWinner(true), 2400);
    return () => clearTimeout(t);
  }, [idx, active]);

  const capA = useTyping(hooksA[idx], active, 0);
  const capB = useTyping(hooksB[idx], active, 600);

  return (
    <section className="relative bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        {/* Centered heading */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-display text-[40px] sm:text-[48px] lg:text-[54px] leading-[1.05] tracking-[-0.03em] font-normal text-foreground">
            Every video ships with<br className="hidden lg:inline" />{" "}
            <span className="font-serif italic text-brand-deep" style={{ fontSize: "1.05em" }}>
              two hooks
            </span>
            .
          </h2>
          <p className="mt-5 text-[16px] leading-[1.3] tracking-normal text-foreground/80 font-semibold">
            Here's why
          </p>
          <p className="mt-3 text-[15.5px] leading-[1.65] text-foreground/75 max-w-[640px] mx-auto">
            The hook makes or breaks an ad. Most agencies ship one. PlotWise ships two, each built for a different psychological trigger.
          </p>
        </div>

        <div className="mt-14 grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-12 items-start">
          {/* AB STAGE — left */}
          <div
            ref={stageRef}
            className="relative rounded-[24px] p-6 lg:p-9 border border-foreground/5 overflow-hidden bg-gradient-to-b from-[#F4F6F4] to-[#E8EEEA] shadow-[0_30px_60px_-30px_rgba(19,24,24,0.18)]"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(800px_300px_at_50%_-20%,rgba(255,255,255,0.6),transparent_60%)]" />

            <div className="relative z-[2] flex justify-between items-center mb-5">
              <span className="inline-flex items-center gap-2 text-[9.5px] tracking-[0.22em] uppercase text-foreground/60 font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-dark animate-pulse-dot shadow-[0_0_0_3px_rgba(32,119,113,0.18)]" />
                Live A/B Test
              </span>
              <span className="italic text-[13px] text-foreground/55">
                test_0427 · same body, two openings
              </span>
            </div>

            <div className="relative z-[2] grid grid-cols-2 gap-4 lg:gap-[18px]">
              {/* HOOK A */}
              <HookCard
                src={reel1}
                tone="A"
                label="Hook A"
                sublabel="Curiosity"
                caption={capA}
                ctr={ctrAVals[idx]}
                highlight="red"
              />
              {/* HOOK B */}
              <HookCard
                src={reel2}
                tone="B"
                label="Hook B"
                sublabel="Pattern Break"
                caption={capB}
                ctr={ctrBVals[idx]}
                winner={showWinner}
                highlight="green"
              />
            </div>

            <div className="relative z-[2] mt-5 flex items-center justify-between gap-3.5">
              <span className="inline-flex items-center gap-2 text-[13px] tracking-[0.16em] uppercase text-foreground/55 font-medium">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="opacity-60">
                  <path d="M5 12h14M5 12l4-4M5 12l4 4M19 12l-4-4M19 12l-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
                Same body content
              </span>
              <span className="text-[13px] uppercase tracking-[0.08em] text-foreground/55">
                HOOK B OUTPERFORMS BY{" "}
                <strong className="text-brand-dark font-medium">{deltas[idx]}</strong>
              </span>
            </div>
          </div>

          {/* Supporting points — right column */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-[18px]">
          {[
            { num: "01", title: "Isolate the variable that matters most.", copy: "Two hooks, same body content. You learn exactly what's driving performance instead of guessing." },
            { num: "02", title: "Double testing surface from day one.", copy: "One video becomes two testable assets. Five videos become ten. More signal, faster learning." },
            { num: "03", title: "Built in, not bolted on.", copy: "Both hooks are scripted and shot in the same session. No additional cost, no reshoots." },
          ].map((p) => (
            <article
              key={p.num}
              className="relative overflow-hidden border border-foreground/5 rounded-[18px] p-7 shadow-[0_1px_2px_rgba(19,24,24,0.03)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_18px_32px_-18px_rgba(32,119,113,0.28)]"
              style={{
                background:
                  "radial-gradient(420px 220px at 100% 100%, rgba(44,138,130,0.14), transparent 65%), radial-gradient(360px 200px at 0% 0%, rgba(215,238,233,0.55), transparent 60%), linear-gradient(135deg, #FCFEFD 0%, #F1F9F7 100%)",
              }}
            >
              <div className="italic text-[26px] text-brand-dark mb-3.5 font-light">
                {p.num}
              </div>
              <h3 className="font-display text-[17px] font-medium tracking-[-0.015em] leading-[1.3] text-foreground mb-2.5">
                {p.title}
              </h3>
              <p className="text-[13px] leading-[1.6] text-foreground/55">{p.copy}</p>
            </article>
          ))}
          </div>
        </div>

        {/* Closing pill */}
        <div className="mt-10 lg:mt-14 text-center">
          <div
            ref={closingRef}
            className={`relative inline-flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 sm:flex-wrap sm:whitespace-nowrap px-4 py-3 sm:px-9 sm:py-5 rounded-2xl sm:rounded-full bg-transparent sm:bg-background border-0 sm:border sm:border-border sm:shadow-[0_1px_2px_rgba(19,24,24,0.03)] overflow-hidden transition-all duration-700 ${closingIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3.5"}`}
          >
            {(() => {
              const items = [
                { t: "One video.", ital: false },
                { t: "Two hooks.", ital: true },
                { t: "Twice the signal.", ital: false },
                { t: "Zero guesswork.", ital: false },
              ];
              const renderItem = (s: typeof items[number], i: number, arr: typeof items, isLastInRow: boolean) => (
                <span key={i} className="contents">
                  <span
                    className={
                      s.ital
                        ? "italic font-light text-brand-deep text-[15px] sm:text-[18px] tracking-[0.02em]"
                        : "text-[14px] sm:text-[15px] tracking-[0.02em] font-medium text-foreground"
                    }
                  >
                    {s.t}
                  </span>
                  {/* dot: hide between rows on mobile */}
                  {i < arr.length - 1 && (
                    <span
                      className={`h-[3px] w-[3px] sm:h-1 sm:w-1 rounded-full bg-foreground/35 ${isLastInRow ? "hidden sm:inline-block" : ""}`}
                    />
                  )}
                </span>
              );
              return (
                <>
                  {/* Mobile: two rows */}
                  <div className="flex sm:contents flex-col items-center gap-2">
                    <div className="inline-flex items-center justify-center gap-2 sm:hidden flex-nowrap whitespace-nowrap">
                      {renderItem(items[0], 0, items, false)}
                      {renderItem(items[1], 1, items, true)}
                    </div>
                    <div className="inline-flex items-center justify-center gap-2 sm:hidden flex-nowrap whitespace-nowrap">
                      {renderItem(items[2], 2, items, false)}
                      {renderItem(items[3], 3, items, false)}
                    </div>
                  </div>
                  {/* Desktop/tab: single row, original layout */}
                  <div className="hidden sm:contents">
                    {items.map((s, i, arr) => renderItem(s, i, arr, false))}
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      </div>
    </section>
  );
}

function HookCard({
  src,
  tone,
  label,
  sublabel,
  caption,
  ctr,
  winner,
  highlight,
}: {
  src: string;
  tone: "A" | "B";
  label: string;
  sublabel: string;
  caption: string;
  ctr: string;
  winner?: boolean;
  highlight?: "red" | "green";
}) {
  const dotColor = tone === "A" ? "bg-[#C77C5A]" : "bg-brand-dark";
  const highlightBg =
    highlight === "red"
      ? "rgba(220,68,55,0.55)"
      : highlight === "green"
        ? "rgba(34,160,90,0.55)"
        : "transparent";
  return (
    <div className="relative">
      {tone === "B" && (
        <div
          className={`absolute -top-3 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:right-3.5 z-10 bg-brand-dark text-background text-[9.5px] tracking-[0.18em] uppercase font-medium px-2.5 py-1.5 rounded-full shadow-[0_6px_14px_-6px_rgba(32,119,113,0.5)] whitespace-nowrap transition-all duration-500 ${winner ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"}`}
        >
          Winner · 3×
        </div>
      )}
      <div className="relative rounded-[18px] bg-[#1A1A1A] aspect-[9/14] overflow-hidden shadow-[0_16px_36px_-18px_rgba(19,24,24,0.35)]">
        <img src={src} alt="" className="w-full h-full object-cover opacity-85" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/10 to-black/65" />
        <div className="absolute top-3 left-3 z-[3] inline-flex items-center gap-1.5 text-[10px] tracking-[0.18em] uppercase font-medium px-2 py-1 rounded-full bg-background/90 text-foreground">
          <span className={`h-1.5 w-1.5 rounded-full ${dotColor}`} />
          <span className="flex flex-col leading-[1.1] sm:flex-row sm:items-center sm:gap-1.5">
            <span>{label}</span>
            <span className="hidden sm:inline">·</span>
            <span className="whitespace-nowrap">{sublabel}</span>
          </span>
        </div>
        <div className="absolute left-3.5 right-3.5 bottom-16 z-[3] text-background text-[13px] font-semibold leading-[1.3] min-h-[34px] [text-shadow:0_1px_4px_rgba(0,0,0,0.5)]">
          <span
            style={{
              backgroundColor: highlightBg,
              boxShadow: highlight ? `0 0 0 2px ${highlightBg}` : undefined,
              borderRadius: "3px",
            }}
          >
            {caption}
          </span>
          <span className="inline-block w-[1.5px] h-[1em] bg-background align-[-2px] ml-0.5 animate-blink" />
        </div>
        <div className="absolute left-3.5 right-3.5 bottom-8 z-[3] h-0.5 rounded bg-background/20 overflow-hidden">
          <div className="h-full bg-background" style={{ animation: "shimmer 6s linear infinite" }} />
        </div>
      </div>
      <div className="mt-3.5 bg-background border border-foreground/5 rounded-[14px] px-3.5 py-2.5 flex items-center justify-between gap-3 shadow-[0_10px_22px_-14px_rgba(19,24,24,0.18)]">
        <div className="flex items-center gap-2.5">
          <span className={`h-2 w-2 rounded-full ${dotColor}`} />
          <span className="text-[9.5px] tracking-[0.18em] uppercase text-foreground/55 font-medium">CTR</span>
        </div>
        <span className={`italic text-[24px] leading-none tracking-[-0.01em] font-light ${tone === "B" ? "text-brand-dark" : "text-foreground"}`}>
          {ctr}
        </span>
      </div>
    </div>
  );
}