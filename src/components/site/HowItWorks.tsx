import { useEffect, useRef, useState, type ReactElement } from "react";

function MobileStageCanvas({ Slide, label }: { Slide: (p: { active: boolean }) => ReactElement; label: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const update = () => {
      const w = el.clientWidth;
      setScale(w / 600);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <div
      ref={wrapRef}
      className="lg:hidden mt-4 relative w-full overflow-hidden rounded-2xl border border-foreground/10 shadow-[0_16px_40px_-24px_rgba(19,24,24,0.18)]"
      style={{
        height: `${480 * scale}px`,
        background:
          "radial-gradient(420px 220px at 100% 100%, color-mix(in oklab, var(--brand-deep) 10%, transparent), transparent 65%), radial-gradient(360px 200px at 0% 0%, color-mix(in oklab, var(--brand-teal) 28%, transparent), transparent 60%), linear-gradient(135deg, #FCFEFD 0%, #F4FBF9 100%)",
      }}
    >
      <div
        className="absolute top-0 left-0 origin-top-left"
        style={{ width: "600px", height: "480px", transform: `scale(${scale})` }}
      >
        <Slide active={true} />
      </div>
    </div>
  );
}

const stages = [
  {
    num: "i",
    label: "Psychology",
    title: ["We start with ", { it: "psychology," }, " not production."],
    lead: ["We map your audience's beliefs, fears, and motivations to identify ", { em: "what needs to change" }, " before they'll buy. Production is the last step, not the first."],
    canvasLabel: "Psychology",
  },
  {
    num: "ii",
    label: "Angles",
    title: ["Belief gaps become ", { it: "creative angles." }],
    lead: ["Each belief gap generates marketing angles, sorted into ", { em: "awareness, consideration, and conversion" }, ". Production becomes the output of strategy, not the input."],
    canvasLabel: "Angles",
  },
  {
    num: "iii",
    label: "Production",
    title: ["Matched creators.", { br: true }, { it: "Six hooks." }, { br: true }, "Intentional production."],
    lead: ["Creators are matched to the persona they actually convert. Every video ships with ", { em: "structurally different hooks" }, ", scripted in the same session."],
    canvasLabel: "Production",
  },
  {
    num: "iv",
    label: "Compound",
    title: ["Every result makes the ", { it: "next one smarter." }],
    lead: ["Performance data feeds back into the system. Winning hooks ", { em: "rewrite the brief" }, ", losing angles get retired, and the next batch starts smarter than the last."],
    canvasLabel: "Compound",
  },
] as const;

type Frag = string | { it: string } | { em: string } | { br: true };
function renderFrags(frags: readonly Frag[]) {
  return frags.map((f, i) => {
    if (typeof f === "string") return <span key={i}>{f}</span>;
    if ("br" in f) return <br key={i} />;
    if ("it" in f)
      return (
        <span key={i} className="font-serif italic text-brand-deep" style={{ fontSize: "1.05em" }}>
          {f.it}
        </span>
      );
    return (
      <em key={i} className="not-italic font-serif italic text-brand-deep" style={{ fontSize: "1.05em", fontWeight: 400 }}>
        {f.em}
      </em>
    );
  });
}

function Slide1({ active }: { active: boolean }) {
  return (
    <div className={`absolute inset-0 transition-all duration-500 ${active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"}`}>
      <div className="absolute inset-8 grid grid-rows-[auto_1fr] gap-4">
        <div className="relative grid grid-cols-[auto_1fr_auto] items-center gap-5 px-6 py-5 bg-gradient-to-br from-white to-brand-mist/30 border border-foreground/10 rounded-2xl shadow-sm overflow-hidden">
          <div className="w-[68px] h-[68px] rounded-full overflow-hidden border-[2.5px] border-white ring-1 ring-brand-teal/40 shadow-md flex-none">
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&q=85" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col gap-1.5 min-w-0">
            <div className="text-[22px] font-semibold tracking-tight leading-tight">Maya, 28</div>
            <div className="flex items-center gap-2 text-[12.5px] text-foreground/60">Skincare buyer<span className="w-[3px] h-[3px] rounded-full bg-foreground/40" />Gen Z minimalist</div>
          </div>
          <div className="inline-flex items-center gap-1.5 bg-white text-brand-deep border border-brand-teal/40 px-3 py-1.5 rounded-full text-[10px] tracking-[0.18em] uppercase font-semibold">
            <span className="w-[5px] h-[5px] rounded-full bg-brand-deep" />Persona
          </div>
        </div>
        <div className="grid grid-rows-3 gap-2">
          {[
            ["Belief", `"Clean beauty doesn't actually work."`],
            ["Fear", `"It'll break me out like the last one."`],
            ["Motivation", `"I want a 30-second routine."`],
          ].map(([tag, q], i) => (
            <div
              key={i}
              className={`grid grid-cols-[96px_1fr] items-center gap-3 bg-white border border-foreground/10 rounded-lg px-3.5 py-2.5 shadow-sm transition-all duration-500 ${active ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-3"}`}
              style={{ transitionDelay: active ? `${200 + i * 160}ms` : "0ms" }}
            >
              <div className="text-[9.5px] tracking-[0.18em] uppercase font-medium text-brand-deep flex items-center gap-1.5">
                <span className="w-[5px] h-[5px] rounded-full bg-brand-deep" />{tag}
              </div>
              <div className="text-[12.5px] leading-tight text-foreground/80 font-serif italic">{q}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Slide2({ active }: { active: boolean }) {
  const widths = ["100%", "84%", "64%"];
  const layers = [
    ["Awareness", ["Myth-bust", "Pattern interrupt"], "Top of funnel"],
    ["Consideration", ["Ingredient story"], "Middle of funnel"],
    ["Conversion", ["Risk reversal"], "Bottom of funnel"],
  ] as const;
  return (
    <div className={`absolute inset-0 transition-all duration-500 ${active ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3.5 px-12 py-9">
        <div className={`bg-white border border-foreground/10 rounded-xl px-4 py-2.5 shadow-sm transition-all duration-500 ${active ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}>
          <div className="text-[9.5px] tracking-[0.18em] uppercase text-foreground/60 font-medium mb-1">Belief gap</div>
          <div className="text-[13px] font-medium">"Clean beauty doesn't work."</div>
        </div>
        <div className={`w-px bg-gradient-to-b from-brand-teal to-brand-deep rounded transition-all duration-700 delay-300 ${active ? "h-8" : "h-0"}`} />
        <div className="flex flex-col gap-2 w-full max-w-[440px]">
          {layers.map(([name, angles, funnel], i) => (
            <div
              key={i}
              className={`bg-white border border-foreground/10 rounded-lg px-4 py-2.5 flex items-center justify-between gap-3 shadow-sm self-center transition-all duration-500 ${active ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-3"}`}
              style={{ width: widths[i], transitionDelay: active ? `${1200 + i * 200}ms` : "0ms" }}
            >
              <div className="flex flex-col gap-0.5">
                <div className="text-[9.5px] tracking-[0.18em] uppercase text-foreground/60 font-medium">{name}</div>
                <div className="text-[8.5px] tracking-[0.16em] uppercase text-brand-deep font-semibold">{funnel}</div>
              </div>
              <div className="flex gap-1.5 flex-wrap">
                {angles.map((a) => (
                  <span key={a} className="bg-brand-teal/15 border border-brand-teal/40 text-brand-deep px-2.5 py-[3px] rounded-full text-[11px] font-medium">{a}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Slide3({ active }: { active: boolean }) {
  const pairs = [
    { img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&q=85", nm: "Danielle E.", niche: "Skincare · clean", pn: "Maya · Gen Z minimalist" },
    { img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&h=120&fit=crop&q=85", nm: "Anaya K.", niche: "Wellness · ritual", pn: "Anaya · ritual-driven 30s" },
  ];
  const hooks = [
    ["Hook A · Curiosity", `"You're applying it wrong."`],
    ["Hook B · Pattern break", `"Stop. Don't buy another serum."`],
    ["Hook C · Contrarian", `"Everyone's doing this backwards."`],
    ["Hook D · Proof", `"30 days. No filter. Watch."`],
    ["Hook E · Question", `"Why does nobody talk about this?"`],
    ["Hook F · Story", `"My derm told me to stop."`],
  ];
  return (
    <div className={`absolute inset-0 transition-all duration-500 ${active ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
      <div className="absolute inset-0 grid grid-rows-[auto_1fr] gap-3.5 px-8 py-7 min-h-0">
        <div className="flex flex-col gap-2.5">
          <div className="text-[9.5px] tracking-[0.22em] uppercase text-foreground/60 font-medium">Creators → Personas</div>
          {pairs.map((p, i) => (
            <div key={i} className={`grid grid-cols-[1fr_28px_1fr] items-center gap-2.5 transition-all duration-500 ${active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`} style={{ transitionDelay: active ? `${150 * i}ms` : "0ms" }}>
              <div className="flex items-center gap-2.5 bg-white border border-foreground/10 rounded-xl px-3 py-2 shadow-sm">
                <div className="w-[30px] h-[30px] rounded-full overflow-hidden flex-none"><img src={p.img} alt="" className="w-full h-full object-cover" /></div>
                <div>
                  <div className="text-[12.5px] font-medium">{p.nm}</div>
                  <div className="text-[10.5px] text-foreground/60">{p.niche}</div>
                </div>
              </div>
              <div className="h-px bg-gradient-to-r from-brand-teal/40 to-brand-deep relative">
                <span className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-l-[5px] border-l-brand-deep border-y-[3.5px] border-y-transparent" />
              </div>
              <div className="bg-white border border-foreground/10 rounded-xl px-3 py-2 shadow-sm">
                <div className="text-[9px] tracking-[0.16em] uppercase text-brand-deep font-semibold mb-0.5">Persona</div>
                <div className="text-[12px] text-foreground/80">{p.pn}</div>
              </div>
            </div>
          ))}
        </div>
        <div className={`bg-white border border-foreground/10 rounded-xl p-4 shadow-sm grid grid-rows-[auto_1fr] gap-3 min-h-0 transition-all duration-500 ${active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`} style={{ transitionDelay: active ? "500ms" : "0ms" }}>
          <div className="text-[9.5px] tracking-[0.22em] uppercase text-foreground/60 font-medium">Same body · six openings</div>
          <div className="grid grid-cols-2 grid-rows-3 gap-2 min-h-0">
            {hooks.map(([nbr, q], i) => (
              <div key={i} className="bg-brand-teal/15 border border-brand-teal/40 rounded-lg px-3 py-2 text-brand-deep flex flex-col justify-center">
                <span className="block text-[9px] tracking-[0.18em] uppercase text-brand-deep/80 font-medium mb-1">{nbr}</span>
                <span className="font-serif italic text-[12px] leading-tight text-foreground">{q}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Slide4({ active }: { active: boolean }) {
  const acts = [
    "Pattern-break hooks promoted to lead position",
    'Underperforming "clean ingredient" angle retired',
    "Creator Danielle queued for pattern-break script",
  ];
  return (
    <div className={`absolute inset-0 transition-all duration-500 ${active ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
      <div className="absolute inset-9 grid grid-rows-[auto_auto_1fr] gap-3.5">
        <div className={`grid grid-cols-[auto_1fr_auto] items-center gap-3.5 bg-white border border-foreground/10 rounded-xl px-4 py-3 shadow-sm transition-all duration-500 ${active ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}>
          <span className="w-2 h-2 rounded-full bg-brand-deep ring-4 ring-brand-teal/30 animate-pulse" />
          <div>
            <div className="text-[10px] tracking-[0.18em] uppercase text-foreground/60 font-medium">Live Result</div>
            <div className="text-[13px] mt-0.5">Hook B · pattern break — <strong className="text-brand-deep font-semibold">3.2× CTR</strong> over Hook A</div>
          </div>
          <div className="text-[10px] tracking-[0.18em] uppercase text-foreground/60 font-medium text-right">Day 7</div>
        </div>
        <div className={`flex items-center justify-center gap-2.5 text-foreground/60 text-[10px] tracking-[0.18em] uppercase font-medium transition-opacity delay-200 duration-500 ${active ? "opacity-100" : "opacity-0"}`}>
          <span>Data</span>
          <span className="flex-1 h-px max-w-[80px] bg-gradient-to-r from-transparent via-brand-deep to-transparent" />
          <span>Rewrites brief</span>
        </div>
        <div className={`bg-white border border-foreground/10 rounded-2xl p-4 grid grid-rows-[auto_1fr] gap-3.5 shadow-sm min-h-0 transition-all duration-500 ${active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`} style={{ transitionDelay: active ? "400ms" : "0ms" }}>
          <div className="flex items-center justify-between text-[10px] tracking-[0.18em] uppercase text-foreground/60 font-medium">
            <span>Next batch — auto-updated</span>
            <span className="inline-flex items-center gap-1.5 text-brand-deep font-semibold"><span className="w-1.5 h-1.5 rounded-full bg-brand-deep animate-pulse" />Live</span>
          </div>
          <div className="grid grid-rows-3 gap-2">
            {acts.map((t, i) => (
              <div key={i} className={`grid grid-cols-[24px_1fr_auto] items-center gap-3 px-3 py-2.5 bg-brand-teal/15 border border-brand-teal/40 rounded-lg transition-all duration-500 ${active ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"}`} style={{ transitionDelay: active ? `${700 + i * 200}ms` : "0ms" }}>
                <div className="w-6 h-6 rounded-md bg-white grid place-items-center text-brand-deep border border-brand-teal/40 text-[12px]">✓</div>
                <div className="text-[12.5px] font-medium">{t}</div>
                <div className="w-[18px] h-[18px] rounded-full bg-brand-deep text-white grid place-items-center text-[10px]">✓</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const Slides = [Slide1, Slide2, Slide3, Slide4];

export function HowItWorks() {
  const [active, setActive] = useState(0);
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const onScroll = () => {
      const target = window.innerHeight * 0.45;
      let bestIdx = 0;
      let bestDist = Infinity;
      blockRefs.current.forEach((b, i) => {
        if (!b) return;
        const r = b.getBoundingClientRect();
        const center = r.top + r.height / 2;
        const dist = Math.abs(center - target);
        if (dist < bestDist) {
          bestDist = dist;
          bestIdx = i;
        }
      });
      setActive(bestIdx);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const Slide = Slides[active];
  const ratio = (active + 1) / stages.length;

  return (
    <section id="system" className="relative">
      <div className="pt-6 pb-4 lg:pt-24 lg:pb-8 text-center w-full px-6 sm:px-10 lg:px-[116px]">
        <h2 className="font-display text-[40px] sm:text-[48px] lg:text-[54px] leading-[1.05] tracking-[-0.03em] font-normal">
          Watch the system <span className="font-serif italic text-brand-deep" style={{ fontSize: "1.05em" }}>think.</span>
        </h2>
        <p className="mt-3.5 text-[15.5px] leading-relaxed text-foreground/60 max-w-[560px] mx-auto">
          Most agencies rent attention. We build a system that compounds, psychology in, performance out, every result making the next one smarter.
        </p>
      </div>
      <div className="max-w-[1280px] mx-auto pb-16 relative px-6 sm:px-10 lg:px-[116px]">
        <div className="grid lg:grid-cols-[1fr_1.05fr] gap-10 lg:gap-20 items-start relative mt-1 lg:mt-4">
          <div className="flex flex-col">
            {stages.map((s, i) => {
              const SlideC = Slides[i];
              return (
              <div
                key={i}
                ref={(el) => { blockRefs.current[i] = el; }}
                className={`flex flex-col justify-center py-4 lg:py-9 lg:min-h-[62vh] ${i > 0 ? "border-t border-dashed border-foreground/15" : ""}`}
              >
                <div className="inline-flex items-center gap-3.5 text-[11px] tracking-[0.22em] uppercase text-foreground/60 font-medium mb-4">
                  <span className={`w-[30px] h-[30px] rounded-full grid place-items-center font-serif italic text-[15px] transition-all duration-500 ${active === i ? "bg-brand-deep text-white border-brand-deep ring-[5px] ring-brand-teal/30" : "bg-white border-[1.5px] border-foreground/15 text-foreground/60"}`}>
                    {s.num}
                  </span>
                  <span className={active === i ? "text-foreground" : ""}>{s.label}</span>
                </div>
                <h3 className="font-display text-[26px] lg:text-[38px] leading-[1.08] tracking-[-0.025em] font-normal">
                  {renderFrags(s.title as readonly Frag[])}
                </h3>
                <p className="text-[13.5px] lg:text-[14.5px] leading-[1.65] text-foreground/60 max-w-[420px] mt-3">
                  {renderFrags(s.lead as readonly Frag[])}
                </p>
                {i === 3 && (
                  <a
                    href="#apply"
                    className="hidden lg:inline-flex mt-6 group items-center gap-2 rounded-full text-background pl-6 pr-2 h-[52px] py-2 text-[14px] font-medium transition-all shadow-[0_10px_30px_-10px_rgba(32,119,113,0.55)] hover:shadow-[0_14px_34px_-10px_rgba(32,119,113,0.7)] hover:brightness-110 self-start"
                    style={{ background: "linear-gradient(135deg, #0F4F4A 0%, #207770 55%, #2C8A82 100%)" }}
                  >
                    Start your growth system
                    <span className="ml-1 h-9 w-9 rounded-full bg-background text-brand-deep flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </a>
                )}
                {/* Mobile static stage card */}
                <MobileStageCanvas Slide={SlideC} label={s.canvasLabel} />
                {i === 3 && (
                  <a
                    href="#apply"
                    className="lg:hidden mt-5 group inline-flex items-center justify-center gap-2 rounded-full text-background pl-6 pr-2 h-[48px] py-2 text-[14px] font-medium transition-all shadow-[0_10px_30px_-10px_rgba(32,119,113,0.55)] self-start"
                    style={{ background: "linear-gradient(135deg, #0F4F4A 0%, #207770 55%, #2C8A82 100%)" }}
                  >
                    Start your growth system
                    <span className="ml-1 h-8 w-8 rounded-full bg-background text-brand-deep flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </a>
                )}
              </div>
              );
            })}
          </div>

          <div className="hidden lg:block sticky self-start" style={{ top: 280 }}>
            <div className="relative w-full h-[480px] border border-foreground/10 rounded-3xl overflow-hidden shadow-[0_24px_60px_-32px_rgba(19,24,24,0.22)]"
              style={{ background: "radial-gradient(420px 220px at 100% 100%, color-mix(in oklab, var(--brand-deep) 10%, transparent), transparent 65%), radial-gradient(360px 200px at 0% 0%, color-mix(in oklab, var(--brand-teal) 28%, transparent), transparent 60%), linear-gradient(135deg, #FCFEFD 0%, #F4FBF9 100%)" }}>
              <Slide active />
              <div className="absolute left-5 right-5 bottom-5 h-[3px] rounded-full overflow-hidden bg-foreground/10 z-10">
                <div className="h-full rounded-full bg-gradient-to-r from-brand-teal to-brand-deep transition-all duration-500" style={{ width: `${ratio * 100}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
