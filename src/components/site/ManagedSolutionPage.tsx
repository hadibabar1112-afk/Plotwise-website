import { useState, useRef, useEffect, type ReactElement } from "react";
import { useReveal } from "@/hooks/use-reveal";
import { Nav } from "./Nav";
import { Logo } from "./Logo";
import { ArrowRight, ArrowUpRight, Check, ChevronDown } from "lucide-react";
import { ManagedProblemTimeline } from "./ManagedProblemTimeline";

const CTA_HREF = "/managed";

// Mint-gradient canvas used for every artifact, matching the homepage system visuals.
const CANVAS_BG =
  "radial-gradient(420px 220px at 100% 100%, color-mix(in oklab, var(--brand-deep) 10%, transparent), transparent 65%), radial-gradient(360px 200px at 0% 0%, color-mix(in oklab, var(--brand-teal) 28%, transparent), transparent 60%), linear-gradient(135deg, #FCFEFD 0%, #F4FBF9 100%)";

const ROMAN = ["i", "ii", "iii", "iv", "v"];

// â"€â"€ Helpers â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€

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

function Eyebrow({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={`text-[11px] font-bold tracking-[0.20em] uppercase text-brand-deep/80 mb-5 ${className}`}>
      {children}
    </p>
  );
}

// â"€â"€ Artifacts (match homepage system visuals: mint canvas, white cards, teal pills) â"€â"€

function Canvas({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`relative w-full border border-foreground/10 rounded-3xl overflow-hidden shadow-[0_24px_60px_-32px_rgba(19,24,24,0.22)] ${className}`}
      style={{ background: CANVAS_BG }}
    >
      {children}
    </div>
  );
}

function MicroLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-1.5 text-[9.5px] tracking-[0.18em] uppercase text-foreground/60 font-medium">
      <span className="w-[5px] h-[5px] rounded-full bg-brand-deep" />
      {children}
    </div>
  );
}

function ResearchSnippet() {
  const groups: [string, [string, string][]][] = [
    ["Audience", [["Behavioral drivers", "Beliefs, fears, and motivations"], ["Buyer vocabulary", "The words she uses, not the category's"]]],
    ["Beliefs & Barriers", [["Belief", `"Clean beauty doesn't actually work."`], ["Fear", `"It'll break me out like the last one."`]]],
    ["Hook Library", [["Pattern interrupt", `"Stop. Don't buy another serum."`], ["Proof-led", `"30 days. No filter. Watch."`]]],
  ];
  return (
    <Canvas>
      <div className="p-6 lg:p-7 flex flex-col gap-4">
        {groups.map(([label, rows]) => (
          <div key={label} className="bg-white border border-foreground/10 rounded-2xl px-4 py-3.5 shadow-sm">
            <MicroLabel>{label}</MicroLabel>
            <div className="mt-2.5 flex flex-col gap-2">
              {rows.map(([tag, q], i) => (
                <div key={i} className="grid grid-cols-[110px_1fr] items-center gap-3">
                  <span className="text-[9px] tracking-[0.16em] uppercase text-brand-deep font-semibold">{tag}</span>
                  <span className="text-[12.5px] leading-tight text-foreground/80 font-serif italic">{q}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Canvas>
  );
}

function CastingSnippet() {
  const creators = [
    { nm: "Danielle E.", niche: "Skincare Â· clean", angle: "Barrier repair", fit: 94 },
    { nm: "Anaya K.", niche: "Wellness Â· ritual", angle: "Routine simplicity", fit: 91 },
    { nm: "Sofia R.", niche: "Skincare Â· sensitive", angle: "Sensitive-skin proof", fit: 88 },
  ];
  return (
    <Canvas>
      <div className="p-6 lg:p-7">
        <div className="mb-3.5">
          <MicroLabel>Creators â†’ Angles</MicroLabel>
        </div>
        <div className="flex flex-col gap-2.5">
          {creators.map((c) => (
            <div
              key={c.nm}
              className="flex items-center gap-3 bg-white border border-foreground/10 rounded-xl px-3.5 py-2.5 shadow-sm"
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-teal/50 to-brand-deep/30 ring-1 ring-brand-teal/40 shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-[12.5px] font-medium text-foreground">{c.nm}</div>
                <div className="text-[10.5px] text-foreground/60">{c.niche}</div>
              </div>
              <span className="bg-brand-teal/15 border border-brand-teal/40 text-brand-deep px-2.5 py-[3px] rounded-full text-[11px] font-medium shrink-0">
                {c.angle}
              </span>
              <div className="text-right shrink-0 w-9">
                <div className="font-serif italic text-[17px] text-brand-deep leading-none">{c.fit}</div>
                <div className="text-[8.5px] text-foreground/40 uppercase tracking-[0.16em]">fit</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Canvas>
  );
}

function MethodologySnippet() {
  return (
    <Canvas>
      <div className="p-6 lg:p-9">
        <div className="bg-white border border-foreground/10 rounded-2xl p-6 lg:p-8 shadow-sm">
          <div className="inline-flex items-center gap-1.5 bg-white text-brand-deep border border-brand-teal/40 px-3 py-1.5 rounded-full text-[10px] tracking-[0.18em] uppercase font-semibold mb-5">
            <span className="w-[5px] h-[5px] rounded-full bg-brand-deep" />
            How we approach this
          </div>
          <h4 className="font-display text-[22px] lg:text-[26px] font-normal tracking-[-0.02em] text-foreground mb-3">
            Persona <span className="font-serif italic text-brand-deep">methodology.</span>
          </h4>
          <p className="text-[14px] leading-[1.75] text-foreground/65 max-w-2xl">
            We build each persona around what moves a buyer, not who she is on paper. Every
            persona names the belief blocking the purchase, the moment the product becomes
            relevant, and the language that reframes it. As performance data comes in, the
            model sharpens: angles that convert get reinforced, the ones that don't get retired.
          </p>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {[
              { q: "What does she believe today?", a: "The barrier in her words." },
              { q: "What has to change?", a: "The belief shift that unlocks the buy." },
              { q: "How do we prove it?", a: "The angle, hook, and creator that lands it." },
            ].map((row) => (
              <div key={row.q} className="bg-brand-teal/[0.08] border border-brand-teal/30 rounded-xl px-4 py-3.5">
                <div className="text-[12.5px] font-semibold text-foreground mb-1.5">{row.q}</div>
                <div className="text-[12px] leading-[1.55] text-foreground/60">{row.a}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Canvas>
  );
}


// ── Section 4 — scroll-tracked stages ────────────────────────────────────

type MFrag = string | { it: string } | { em: string } | { br: true };
function renderMFrags(frags: readonly MFrag[]) {
  return frags.map((f, i) => {
    if (typeof f === "string") return <span key={i}>{f}</span>;
    if ("br" in f) return <br key={i} />;
    if ("it" in f) return <span key={i} className="font-serif italic text-brand-deep" style={{ fontSize: "1.05em" }}>{f.it}</span>;
    return <em key={i} className="not-italic font-serif italic text-brand-deep" style={{ fontSize: "1.05em", fontWeight: 400 }}>{f.em}</em>;
  });
}

const MANAGED_STAGES = [
  {
    num: "i", label: "Research",
    title: ["We map ", { it: "why" }, " she buys, not who she is."],
    lead: ["Behavioral drivers, not demographics — beliefs, barriers, and ", { em: "the exact vocabulary your buyers use" }, " that your category doesn't."],
    canvasLabel: "Research",
  },
  {
    num: "ii", label: "Angles",
    title: ["Belief gaps become ", { it: "creative angles." }],
    lead: ["Each belief gap maps to angles, hooks, and funnel stages. You see the strategy ", { em: "and the reasoning behind it" }, " before anything gets filmed."],
    canvasLabel: "Angles",
  },
  {
    num: "iii", label: "Casting",
    title: ["Not whoever's available.", { br: true as const }, { it: "Whoever fits." }],
    lead: ["Creators from our vetted beauty network, matched to a specific angle and funnel stage — ", { em: "cast for a reason, not pulled from a list." }],
    canvasLabel: "Casting",
  },
  {
    num: "iv", label: "Production",
    title: ["You approve.", { br: true as const }, "We handle ", { it: "everything else." }],
    lead: ["Briefs, scripts, and delivery, end-to-end. ", { em: "Two hook variations per video" }, ", scripted in the same session."],
    canvasLabel: "Production",
  },
  {
    num: "v", label: "Diagnosis",
    title: ["Every winner ", { it: "teaches the next one." }],
    lead: ["When a video wins, we isolate the angle, hook, and persona. That insight gets banked — ", { em: "the next batch starts from knowledge, not zero." }],
    canvasLabel: "Diagnosis",
  },
];

function ManagedMobileCanvas({ Slide }: { Slide: (p: { active: boolean }) => ReactElement; label: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [mScale, setMScale] = useState(0.5);
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const update = () => setMScale(el.clientWidth / 600);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <div ref={wrapRef} className="lg:hidden mt-4 relative w-full overflow-hidden rounded-2xl border border-foreground/10 shadow-[0_16px_40px_-24px_rgba(19,24,24,0.18)]" style={{ height: `${480 * mScale}px`, background: CANVAS_BG }}>
      <div className="absolute top-0 left-0 origin-top-left" style={{ width: "600px", height: "480px", transform: `scale(${mScale})` }}>
        <Slide active={true} />
      </div>
    </div>
  );
}

function ManagedSlide1({ active }: { active: boolean }) {
  const rows: [string, string][] = [
    ["Belief", `"Clean beauty doesn't actually work."`],
    ["Fear", `"It'll break me out like the last one."`],
    ["Motivation", `"I want a 30-second routine."`],
    ["Her words", `"gentle, ingredient-forward, no fluff"`],
  ];
  return (
    <div className={`absolute inset-0 transition-all duration-500 ${active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"}`}>
      <div className="absolute inset-7 grid grid-rows-[auto_1fr] gap-3.5">
        <div className="bg-white border border-foreground/10 rounded-2xl px-4 py-3 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border-[2px] border-white ring-1 ring-brand-teal/40 shrink-0">
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&q=85" alt="" className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div>
            <div className="text-[14px] font-semibold">Maya, 28</div>
            <div className="text-[11px] text-foreground/60">Gen Z minimalist · Skincare buyer</div>
          </div>
          <div className="ml-auto inline-flex items-center gap-1.5 bg-white text-brand-deep border border-brand-teal/40 px-2.5 py-1 rounded-full text-[9.5px] tracking-[0.16em] uppercase font-semibold">
            <span className="w-[4px] h-[4px] rounded-full bg-brand-deep" />Persona
          </div>
        </div>
        <div className="grid grid-rows-4 gap-2">
          {rows.map(([tag, q], i) => (
            <div key={i} className={`grid grid-cols-[90px_1fr] items-center gap-3 bg-white border border-foreground/10 rounded-lg px-3.5 py-2.5 shadow-sm transition-all duration-500 ${active ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-3"}`} style={{ transitionDelay: active ? `${180 + i * 130}ms` : "0ms" }}>
              <div className="text-[9px] tracking-[0.18em] uppercase font-medium text-brand-deep flex items-center gap-1.5"><span className="w-[4px] h-[4px] rounded-full bg-brand-deep" />{tag}</div>
              <div className="text-[12px] leading-tight text-foreground/80 font-serif italic">{q}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ManagedSlide2({ active }: { active: boolean }) {
  const layers = [
    ["Awareness",     ["Myth-bust", "Pattern interrupt"],   "Top of funnel"],
    ["Consideration", ["Ingredient story", "Social proof"], "Middle of funnel"],
    ["Conversion",    ["Risk reversal", "Proof-led"],       "Bottom of funnel"],
  ] as const;
  const widths = ["100%", "84%", "66%"];
  return (
    <div className={`absolute inset-0 transition-all duration-500 ${active ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-10 py-8">
        <div className={`bg-white border border-foreground/10 rounded-xl px-4 py-2.5 shadow-sm transition-all duration-500 ${active ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}>
          <div className="text-[9.5px] tracking-[0.18em] uppercase text-foreground/60 font-medium mb-1">Belief gap</div>
          <div className="text-[13px] font-medium">"Clean beauty doesn't work."</div>
        </div>
        <div className={`w-px bg-gradient-to-b from-brand-teal to-brand-deep rounded transition-all duration-700 delay-300 ${active ? "h-7" : "h-0"}`} />
        <div className="flex flex-col gap-2 w-full max-w-[440px]">
          {layers.map(([name, angles, funnel], i) => (
            <div key={i} className={`bg-white border border-foreground/10 rounded-lg px-4 py-2.5 flex items-center justify-between gap-3 shadow-sm self-center transition-all duration-500 ${active ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-3"}`} style={{ width: widths[i], transitionDelay: active ? `${1100 + i * 200}ms` : "0ms" }}>
              <div className="flex flex-col gap-0.5">
                <div className="text-[9.5px] tracking-[0.18em] uppercase text-foreground/60 font-medium">{name}</div>
                <div className="text-[8.5px] tracking-[0.14em] uppercase text-brand-deep font-semibold">{funnel}</div>
              </div>
              <div className="flex gap-1.5 flex-wrap">
                {angles.map((a) => (<span key={a} className="bg-brand-teal/15 border border-brand-teal/40 text-brand-deep px-2 py-[3px] rounded-full text-[10.5px] font-medium">{a}</span>))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ManagedSlide3({ active }: { active: boolean }) {
  const creators = [
    { nm: "Danielle E.", niche: "Skincare · clean",      angle: "Barrier repair",       fit: 94, img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&q=85" },
    { nm: "Anaya K.",    niche: "Wellness · ritual",     angle: "Routine simplicity",   fit: 91, img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&h=80&fit=crop&q=85" },
    { nm: "Sofia R.",    niche: "Skincare · sensitive",  angle: "Sensitive-skin proof", fit: 88, img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop&q=85" },
  ];
  return (
    <div className={`absolute inset-0 transition-all duration-500 ${active ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
      <div className="absolute inset-7 flex flex-col gap-3.5">
        <div className={`text-[9.5px] tracking-[0.22em] uppercase text-foreground/60 font-medium transition-all duration-500 ${active ? "opacity-100" : "opacity-0"}`}>Creators → Angles</div>
        <div className="flex flex-col gap-2.5">
          {creators.map((c, i) => (
            <div key={c.nm} className={`flex items-center gap-3 bg-white border border-foreground/10 rounded-xl px-3.5 py-2.5 shadow-sm transition-all duration-500 ${active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`} style={{ transitionDelay: active ? `${150 + i * 150}ms` : "0ms" }}>
              <div className="w-9 h-9 rounded-full overflow-hidden border-[2px] border-white ring-1 ring-brand-teal/40 shrink-0">
                <img src={c.img} alt="" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[12.5px] font-medium text-foreground">{c.nm}</div>
                <div className="text-[10.5px] text-foreground/60">{c.niche}</div>
              </div>
              <span className="bg-brand-teal/15 border border-brand-teal/40 text-brand-deep px-2.5 py-[3px] rounded-full text-[11px] font-medium shrink-0">{c.angle}</span>
              <div className="text-right shrink-0 w-9">
                <div className="font-serif italic text-[17px] text-brand-deep leading-none">{c.fit}</div>
                <div className="text-[8.5px] text-foreground/40 uppercase tracking-[0.16em]">fit</div>
              </div>
            </div>
          ))}
        </div>
        <div className={`bg-white border border-foreground/10 rounded-2xl px-4 py-3 shadow-sm transition-all duration-500 delay-700 ${active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
          <div className="text-[9.5px] tracking-[0.22em] uppercase text-foreground/60 font-medium mb-2.5">Included per creator</div>
          <div className="grid grid-cols-3 gap-2">
            {["1 primary video", "2 hook variants", "Full brief"].map((item) => (
              <div key={item} className="bg-brand-teal/10 border border-brand-teal/30 rounded-lg px-2.5 py-2 text-center">
                <span className="text-[11px] font-medium text-brand-deep">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ManagedSlide4({ active }: { active: boolean }) {
  const hooks: [string, string][] = [
    ["Hook A · Curiosity",     `"You're applying it wrong."`],
    ["Hook B · Pattern break", `"Stop. Don't buy another serum."`],
  ];
  return (
    <div className={`absolute inset-0 transition-all duration-500 ${active ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
      <div className="absolute inset-7 grid grid-rows-[auto_1fr_auto] gap-3.5">
        <div className={`bg-white border border-foreground/10 rounded-2xl px-4 py-3 shadow-sm transition-all duration-500 ${active ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}>
          <div className="text-[9.5px] tracking-[0.22em] uppercase text-foreground/60 font-medium mb-2">Brief</div>
          <div className="grid grid-cols-[80px_1fr] gap-y-1.5 gap-x-3 text-[12px]">
            <span className="text-foreground/50">Creator</span><span className="font-medium">Danielle E.</span>
            <span className="text-foreground/50">Angle</span><span className="font-medium">Barrier repair</span>
            <span className="text-foreground/50">Stage</span><span className="font-medium">Top of funnel</span>
          </div>
        </div>
        <div className={`bg-white border border-foreground/10 rounded-2xl p-4 shadow-sm flex flex-col gap-2.5 transition-all duration-500 ${active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`} style={{ transitionDelay: active ? "300ms" : "0ms" }}>
          <div className="text-[9.5px] tracking-[0.22em] uppercase text-foreground/60 font-medium">Same body · two openings</div>
          {hooks.map(([nbr, q], i) => (
            <div key={i} className={`bg-brand-teal/15 border border-brand-teal/40 rounded-xl px-3.5 py-3 transition-all duration-500 ${active ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"}`} style={{ transitionDelay: active ? `${500 + i * 200}ms` : "0ms" }}>
              <span className="block text-[9px] tracking-[0.18em] uppercase text-brand-deep/80 font-medium mb-1">{nbr}</span>
              <span className="font-serif italic text-[13px] leading-tight text-foreground">{q}</span>
            </div>
          ))}
        </div>
        <div className={`flex items-center gap-2 text-[11px] text-foreground/50 transition-all duration-500 delay-700 ${active ? "opacity-100" : "opacity-0"}`}>
          <Check className="w-3.5 h-3.5 text-brand-deep shrink-0" />
          You approve. We handle scripts, briefs, and delivery.
        </div>
      </div>
    </div>
  );
}

function ManagedSlide5({ active }: { active: boolean }) {
  const acts = [
    "Hook B · pattern break promoted to lead position",
    `Underperforming "clean ingredient" angle retired`,
    "Creator Danielle queued for follow-up script",
  ];
  return (
    <div className={`absolute inset-0 transition-all duration-500 ${active ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
      <div className="absolute inset-7 grid grid-rows-[auto_auto_1fr] gap-3.5">
        <div className={`grid grid-cols-[auto_1fr_auto] items-center gap-3 bg-white border border-foreground/10 rounded-xl px-4 py-3 shadow-sm transition-all duration-500 ${active ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}>
          <span className="w-2 h-2 rounded-full bg-brand-deep ring-4 ring-brand-teal/30 animate-pulse" />
          <div>
            <div className="text-[10px] tracking-[0.18em] uppercase text-foreground/60 font-medium">Live Result</div>
            <div className="text-[12.5px] mt-0.5">Hook B · pattern break — <strong className="text-brand-deep font-semibold">3.2× CTR</strong> over Hook A</div>
          </div>
          <div className="text-[10px] tracking-[0.18em] uppercase text-foreground/60 font-medium">Day 7</div>
        </div>
        <div className={`flex items-center justify-center gap-2.5 text-foreground/60 text-[10px] tracking-[0.18em] uppercase font-medium transition-opacity delay-200 duration-500 ${active ? "opacity-100" : "opacity-0"}`}>
          <span>Data</span>
          <span className="flex-1 h-px max-w-[80px] bg-gradient-to-r from-transparent via-brand-deep to-transparent" />
          <span>Rewrites next batch</span>
        </div>
        <div className={`bg-white border border-foreground/10 rounded-2xl p-4 grid grid-rows-[auto_1fr] gap-3 shadow-sm min-h-0 transition-all duration-500 ${active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`} style={{ transitionDelay: active ? "400ms" : "0ms" }}>
          <div className="flex items-center justify-between text-[10px] tracking-[0.18em] uppercase text-foreground/60 font-medium">
            <span>Next batch — auto-updated</span>
            <span className="inline-flex items-center gap-1.5 text-brand-deep font-semibold"><span className="w-1.5 h-1.5 rounded-full bg-brand-deep animate-pulse" />Live</span>
          </div>
          <div className="grid grid-rows-3 gap-2">
            {acts.map((t, i) => (
              <div key={i} className={`grid grid-cols-[24px_1fr] items-center gap-3 px-3 py-2.5 bg-brand-teal/15 border border-brand-teal/40 rounded-lg transition-all duration-500 ${active ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"}`} style={{ transitionDelay: active ? `${700 + i * 200}ms` : "0ms" }}>
                <div className="w-6 h-6 rounded-md bg-white grid place-items-center text-brand-deep border border-brand-teal/40 text-[12px]">✓</div>
                <div className="text-[12px] font-medium">{t}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const ManagedSlides = [ManagedSlide1, ManagedSlide2, ManagedSlide3, ManagedSlide4, ManagedSlide5];

// â"€â"€ FAQ accordion â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€

const FAQS = [
  {
    q: "“We already have a UGC agency.”",
    a: "Keep them if they're working. The question isn't who makes your videos. It's whether anyone can tell you why your last winner won. If the answer is no, that's the gap we fill, and it's the gap that's costing you.",
  },
  {
    q: "“Why is it free?”",
    a: "Because we're building our beauty roster deliberately, and one campaign of ours is a better pitch than any sales call. We expect a portion of the first 5 to stay. That's the bet.",
  },
  {
    q: "“We're not big enough / too big for this.”",
    a: "We work with beauty brands doing 6 to 8 figures in ARR. Below that, you don't have the spend data for the loop to learn from. If that's you, this page will still be here when you're ready.",
  },
  {
    q: "“What do you need from us?”",
    a: "Very little to start. Claim your spot, answer a short set of questions about your brand, and schedule a call with our team. We gather everything else on that call and set you up with access to our platform. Your involvement from there is review and approval, not production.",
  },
];

function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-border border-y border-border">
      {FAQS.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
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
  );
}

// â"€â"€ Footer â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€

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
          Â© {new Date().getFullYear()} Plotwise. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

// â"€â"€ Solution steps â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€

const STEPS = [
  {
    title: "Research",
    body: "We build your audience around behavioral drivers, not demographics. Beliefs, barriers, the exact vocabulary your buyers use that your category doesn't.",
  },
  {
    title: "Angles",
    body: "Every persona gets mapped to specific angles, hooks, and funnel stages. You see the strategy and the reasoning behind it before anything gets filmed.",
  },
  {
    title: "Casting",
    body: "Creators from our vetted beauty network, matched to a specific angle and funnel stage. Not whoever's available. Whoever fits.",
  },
  {
    title: "Production",
    body: "We handle briefs, scripts, and delivery. You approve the work. Your team stays off the content treadmill.",
  },
  {
    title: "Diagnosis",
    body: "This is the part nobody else does. When a video wins, we isolate why. Persona, angle, hook, stage. The insight gets banked, so the next batch starts from knowledge instead of zero.",
  },
];

const INCLUDED = [
  "Behavioral audience research for your brand",
  "Angle and hook strategy mapped to funnel stages",
  "Creators cast specifically for your angles",
  "5 produced, ready-to-launch videos, each with 2 hook variations",
  "5 professional photos of your product",
  "3 static social media posts, ready to publish",
  "The diagnosis layer on whatever you run",
];

// ── Creator Network Canvas ──────────────────────────────────────────────────

function NetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = canvas.offsetHeight * dpr;
    if (!canvas.width || !canvas.height) return;

    const ctx = canvas.getContext("2d")!;
    const W = canvas.width;
    const H = canvas.height;

    let seed = 42;
    const rng = () => {
      seed = (seed * 1664525 + 1013904223) & 0xffffffff;
      return (seed >>> 0) / 4294967296;
    };

    const N = 68;
    const nodes = Array.from({ length: N }, () => ({
      x: (0.06 + rng() * 0.88) * W,
      y: (0.06 + rng() * 0.88) * H,
      r: (1.5 + rng() * 1.6) * dpr,
      vx: (rng() - 0.5) * 0.22 * dpr,
      vy: (rng() - 0.5) * 0.22 * dpr,
      phase: rng() * Math.PI * 2,
    }));

    let t = 0;
    const THRESH = 86 * dpr;

    const draw = () => {
      t += 0.011;
      ctx.clearRect(0, 0, W, H);

      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0.04 * W || n.x > 0.96 * W) n.vx *= -1;
        if (n.y < 0.04 * H || n.y > 0.96 * H) n.vy *= -1;
      });

      const reveal = Math.min(t / 1.4, 1);

      // Edges
      for (let i = 0; i < N; i++) {
        if (i / N > reveal) break;
        for (let j = i + 1; j < N; j++) {
          if (j / N > reveal) break;
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < THRESH) {
            const a = (1 - d / THRESH) * 0.3 * reveal;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(32,119,112,${a})`;
            ctx.lineWidth = 0.9 * dpr;
            ctx.stroke();
          }
        }
      }

      // Nodes
      nodes.forEach((n, i) => {
        if (i / N > reveal) return;
        const pulse = 0.5 + 0.5 * Math.sin(t * 1.5 + n.phase);
        const alpha = Math.min((reveal - i / N) * N, 1);
        // Dot
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * (1 + pulse * 0.3), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(32,119,112,${0.82 * alpha})`;
        ctx.fill();
      });

      // Animated counter
      const countVal = Math.floor(Math.min(t / 1.1, 1) * 35000);
      ctx.textAlign = "center";
      ctx.font = `700 ${38 * dpr}px "Plus Jakarta Sans", sans-serif`;
      ctx.fillStyle = `rgba(32,119,112,${Math.min(t * 0.55, 0.9)})`;
      ctx.fillText(countVal.toLocaleString() + "+", W * 0.5, H * 0.52);
      ctx.font = `500 ${8.5 * dpr}px "Plus Jakarta Sans", sans-serif`;
      ctx.letterSpacing = `${2 * dpr}px`;
      ctx.fillStyle = `rgba(32,119,112,${Math.min((t - 0.5) * 0.55, 0.55)})`;
      ctx.fillText("CREATORS", W * 0.5, H * 0.52 + 22 * dpr);

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full block" />;
}

// ── Page ────────────────────────────────────────────────────────────────────

export function ManagedSolutionPage() {
  const stageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const target = window.innerHeight * 0.45;
      let bestIdx = 0, bestDist = Infinity;
      stageRefs.current.forEach((b, i) => {
        if (!b) return;
        const r = b.getBoundingClientRect();
        const dist = Math.abs(r.top + r.height / 2 - target);
        if (dist < bestDist) { bestDist = dist; bestIdx = i; }
      });
      setActiveStage(bestIdx);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);

  return (
    <div className="bg-background text-foreground antialiased">
      <Nav />

      {/* â"€â"€ SECTION 1 â€" HERO â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€ */}
      <section id="top" className="relative !pt-[64px] md:!pt-[88px] pb-24 lg:pb-32 overflow-hidden">
        {/* Background ornaments */}
        <div className="pointer-events-none absolute -top-20 -right-32 h-[520px] w-[520px] rounded-full bg-brand-teal/30 blur-[120px]" />
        <div className="pointer-events-none absolute top-1/2 -left-40 h-[420px] w-[420px] rounded-full bg-brand-dark/15 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-5 lg:px-10 mt-6">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left: Headline */}
            <div className="lg:col-span-7 order-2 lg:order-1">
              <Reveal>
                <Eyebrow className="mb-6">
                  Managed Campaigns Â· For Beauty Brands Doing 6 to 8 Figures
                </Eyebrow>
                <h1 className="font-display text-[44px] sm:text-[60px] lg:text-[76px] font-normal leading-[1.02] tracking-[-0.03em] text-foreground text-balance">
                  Your winning ad is{" "}
                  <span className="font-serif italic text-brand-deep" style={{ fontSize: "1.02em" }}>
                    already dying.
                  </span>
                </h1>

                <p className="mt-7 text-[17px] lg:text-[19px] leading-relaxed text-foreground/70 max-w-xl text-pretty">
                  Beauty creative fatigues in 2 to 3 weeks. Your ad account tells you which
                  creative won. It never tells you why, or what to make next. So every time a
                  winner dies, you're back to guessing with your own money.
                </p>

                <div className="mt-8 flex flex-col items-start gap-4">
                  <a
                    href={CTA_HREF}
                    className="group inline-flex items-center gap-2 rounded-full bg-brand-deep text-background pl-7 pr-2 h-[56px] text-[14.5px] font-medium shadow-[0_16px_40px_-12px_rgba(0,98,92,0.55)] transition-all hover:bg-brand-dark hover:-translate-y-0.5 no-underline"
                  >
                    Claim one of 5 free campaign spots
                    <span className="ml-1 h-11 w-11 rounded-full bg-background text-brand-deep flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </a>
                  <p className="text-[13px] text-foreground/45">
                    First 5 beauty brands get 5 videos produced free. No retainer, no commitment.
                  </p>
                </div>
              </Reveal>
            </div>

            {/* Right: Hero visual */}
            <div className="lg:col-span-5 relative order-1 lg:order-2 flex items-center justify-center">
              <div
                className="w-full max-w-[520px] mx-auto"
                style={{
                  animation: "heroFloat 6s ease-in-out infinite",
                }}
              >
                <img
                  src="/hero-visual.svg"
                  alt=""
                  className="w-full h-auto"
                  draggable={false}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* â"€â"€ SECTION 2 â€" THE LOOP â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€ */}
      <section id="the-loop" className="relative bg-secondary py-24 lg:py-32">
        <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-brand-teal/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -right-20 h-[28rem] w-[28rem] rounded-full bg-brand-deep/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-10">
          <div className="text-center max-w-5xl mx-auto mb-12 w-full overflow-visible">
            <Reveal>
              <h2 className="font-display text-[clamp(26px,5vw,32px)] sm:text-[38px] lg:text-[46px] leading-[1.08] tracking-[-0.03em] font-normal text-foreground">
                <span>The loop every beauty brand</span>{" "}
                <span className="font-serif italic text-brand-deep" style={{ fontSize: "1.05em" }}>is stuck in.</span>
              </h2>
              <p className="mt-5 text-[15.5px] lg:text-[16px] leading-relaxed text-foreground/60 max-w-[560px] mx-auto">
                You're not running out of videos. You're running out of angles â€" and nobody told you that was the problem.
              </p>
            </Reveal>
          </div>
          <ManagedProblemTimeline />
          <Reveal>
            <p className="mt-14 max-w-3xl mx-auto text-center font-display text-[24px] lg:text-[32px] tracking-tight text-foreground leading-snug">
              The result?{" "}
              <span className="text-foreground/50">
                You burn budget, lose momentum, and never build predictable winners.
              </span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* â"€â"€ SECTION 3 â€" THE REFRAME â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€ */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-5xl px-5 lg:px-10 text-center">
          <Reveal>
            <Eyebrow className="justify-center">Why More Volume Won't Fix It</Eyebrow>
            <h2 className="font-display text-[30px] lg:text-[42px] font-normal tracking-[-0.025em] leading-[1.12] text-foreground max-w-3xl mx-auto">
              The platforms left you the creative lever. Nobody handed you the manual.
            </h2>
            <div className="mt-6 flex flex-col gap-4 text-[15.5px] leading-[1.8] text-foreground/70 max-w-2xl mx-auto">
              <p>
                The algorithms now find your buyers on their own — leaving creative as the
                one lever you fully control. The market responded with volume: 30 videos a
                month, AI tools promising 300. But more creatives built on the same shallow
                understanding produce the same results, just faster.
              </p>
              <p>
                Knowing which ad won tells you nothing about how to produce the next winner.
                That gap is where rising CAC comes from.
              </p>
            </div>
          </Reveal>
          <Reveal delay={100} className="mt-12">
            <img
              src="/reframe-visual.svg"
              alt=""
              className="w-full max-w-[960px] h-auto mx-auto"
              draggable={false}
            />
          </Reveal>
        </div>
      </section>

      {/* ── SECTION 4 — THE SOLUTION ─────────────────────────────────────────── */}
      <section id="how-it-works" className="relative bg-white">
        <div className="pt-6 pb-4 lg:pt-24 lg:pb-8 text-center w-full px-6 sm:px-10 lg:px-[116px]">
          <Eyebrow className="justify-center">Managed Campaigns</Eyebrow>
          <h2 className="font-display text-[40px] sm:text-[48px] lg:text-[54px] leading-[1.05] tracking-[-0.03em] font-normal">
            An engine that finds your next angle before your current one{" "}
            <span className="font-serif italic text-brand-deep" style={{ fontSize: "1.05em" }}>fatigues.</span>
          </h2>
          <p className="mt-3.5 text-[15.5px] leading-relaxed text-foreground/60 max-w-[560px] mx-auto">
            Done-for-you creative strategy, production, and diagnosis for beauty brands — a closed loop where every video informs what the next one should be.
          </p>
        </div>
        <div className="max-w-[1280px] mx-auto pb-16 relative px-6 sm:px-10 lg:px-[116px]">
          <div className="grid lg:grid-cols-[1fr_1.05fr] gap-10 lg:gap-20 items-start relative mt-1 lg:mt-4">
            <div className="flex flex-col">
              {MANAGED_STAGES.map((s, i) => {
                const SlideC = ManagedSlides[i];
                return (
                  <div
                    key={i}
                    ref={(el) => { stageRefs.current[i] = el; }}
                    className={`flex flex-col justify-center py-4 lg:py-9 lg:min-h-[62vh] ${i > 0 ? "border-t border-dashed border-foreground/15" : ""}`}
                  >
                    <div className="inline-flex items-center gap-3.5 text-[11px] tracking-[0.22em] uppercase text-foreground/60 font-medium mb-4">
                      <span className={`w-[30px] h-[30px] rounded-full grid place-items-center font-serif italic text-[15px] transition-all duration-500 ${activeStage === i ? "bg-brand-deep text-white ring-[5px] ring-brand-teal/30" : "bg-white border-[1.5px] border-foreground/15 text-foreground/60"}`}>
                        {s.num}
                      </span>
                      <span className={activeStage === i ? "text-foreground" : ""}>{s.label}</span>
                    </div>
                    <h3 className="font-display text-[26px] lg:text-[38px] leading-[1.08] tracking-[-0.025em] font-normal">
                      {renderMFrags(s.title as readonly MFrag[])}
                    </h3>
                    <p className="text-[13.5px] lg:text-[14.5px] leading-[1.65] text-foreground/60 max-w-[420px] mt-3">
                      {renderMFrags(s.lead as readonly MFrag[])}
                    </p>
                    {i === 4 && (
                      <a
                        href={CTA_HREF}
                        className="hidden lg:inline-flex mt-6 group items-center gap-2 rounded-full text-background pl-6 pr-2 h-[52px] py-2 text-[14px] font-medium transition-all shadow-[0_10px_30px_-10px_rgba(32,119,113,0.55)] hover:shadow-[0_14px_34px_-10px_rgba(32,119,113,0.7)] hover:brightness-110 self-start"
                        style={{ background: "linear-gradient(135deg, #0F4F4A 0%, #207770 55%, #2C8A82 100%)" }}
                      >
                        Claim your spot
                        <span className="ml-1 h-9 w-9 rounded-full bg-background text-brand-deep flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                          <ArrowRight className="w-[14px] h-[14px]" />
                        </span>
                      </a>
                    )}
                    <ManagedMobileCanvas Slide={SlideC} label={s.canvasLabel} />
                    {i === 4 && (
                      <a
                        href={CTA_HREF}
                        className="lg:hidden mt-5 group inline-flex items-center justify-center gap-2 rounded-full text-background pl-6 pr-2 h-[48px] py-2 text-[14px] font-medium transition-all shadow-[0_10px_30px_-10px_rgba(32,119,113,0.55)] self-start"
                        style={{ background: "linear-gradient(135deg, #0F4F4A 0%, #207770 55%, #2C8A82 100%)" }}
                      >
                        Claim your spot
                        <span className="ml-1 h-8 w-8 rounded-full bg-background text-brand-deep flex items-center justify-center">
                          <ArrowRight className="w-[13px] h-[13px]" />
                        </span>
                      </a>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="hidden lg:block sticky self-start" style={{ top: 280 }}>
              <div
                className="relative w-full h-[480px] border border-foreground/10 rounded-3xl overflow-hidden shadow-[0_24px_60px_-32px_rgba(19,24,24,0.22)]"
                style={{ background: CANVAS_BG }}
              >
                {ManagedSlides.map((SlideC, i) => (
                  <SlideC key={i} active={activeStage === i} />
                ))}
                <div className="absolute left-5 right-5 bottom-5 h-[3px] rounded-full overflow-hidden bg-foreground/10 z-10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-brand-teal to-brand-deep transition-all duration-500"
                    style={{ width: `${((activeStage + 1) / MANAGED_STAGES.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* â"€â"€ SECTION 5 â€" TRANSPARENCY PROOF â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€ */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-5xl px-5 lg:px-10">
          <Reveal>
            <Eyebrow>You See The Thinking, Not Just The Deliverables</Eyebrow>
            <h2 className="font-display text-[30px] lg:text-[44px] font-normal tracking-[-0.025em] leading-[1.12] text-foreground max-w-3xl">
              The reasoning behind every decision, documented inside your campaign.
            </h2>
            <p className="mt-6 text-[15.5px] lg:text-[16.5px] leading-[1.8] text-foreground/70 max-w-2xl">
              Agencies hand you outputs. We hand you the reasoning behind them. Inside every
              campaign, each section carries the framework that produced it: how we approached
              it, which questions it answers, and how it becomes more precise as performance data
              comes in. Every decision is documented in plain language before the first video
              enters production. Reviews become conversations about results, not exercises in
              reconstructing why something was made.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-12">
              <MethodologySnippet />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SECTION 6 – WHY US ─────────────────────────────────────────────── */}
      <section className="bg-white py-20 lg:py-32">
        <div className="mx-auto max-w-6xl px-5 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Left: text */}
            <div>
              <Reveal>
                <Eyebrow>Why Beauty. Why Us.</Eyebrow>
                <h2 className="font-display text-[30px] lg:text-[42px] font-normal tracking-[-0.025em] leading-[1.12] text-foreground">
                  We helped build a 35,000-creator network. Then we watched the value in advertising
                  move to creative.
                </h2>
              </Reveal>
              <Reveal delay={80}>
                <div className="mt-8 flex flex-col gap-5 text-[15.5px] lg:text-[16.5px] leading-[1.8] text-foreground/70">
                  <p>
                    Before Plotwise, our team worked at the core of the creator economy, helping a
                    media company scale its network past 35,000 content creators and managing those
                    creator relationships day to day. That experience gave us two things: a deep
                    understanding of what makes creator content perform, and a front-row view of
                    advertising's biggest shift, where creative has become the single most valuable
                    lever in the stack.
                  </p>
                  <p>
                    Plotwise is where we put that understanding to work. And we only work in beauty:
                    skincare, haircare, fragrance, body care, wellness. Deep, not wide. Because what
                    makes a buyer stop scrolling for a serum transfers to a hair oil. It does not
                    transfer from a phone case.
                  </p>
                </div>
              </Reveal>
            </div>

            {/* Right: creator network animation */}
            <div className="relative h-[380px] lg:h-[480px] overflow-hidden bg-white">
              <NetworkCanvas />
            </div>

          </div>
        </div>
      </section>

      {/* â"€â"€ SECTION 7 â€" THE OFFER â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€ */}
      <section className="relative py-24 lg:py-32 overflow-hidden gradient-deep grain text-background">
        <div className="pointer-events-none absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-brand-teal/20 blur-[130px]" />
        <div className="pointer-events-none absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-white/5 blur-[130px]" />
        <div className="relative mx-auto max-w-6xl px-5 lg:px-10">

          {/* Centered heading at top */}
          <Reveal>
            <div className="text-center mb-14">
              <p className="text-[11px] font-bold tracking-[0.22em] uppercase text-brand-teal mb-5">
                The First 5 Brands
              </p>
              <h2 className="font-display text-[34px] sm:text-[46px] lg:text-[58px] font-normal leading-[1.06] tracking-[-0.03em] max-w-4xl mx-auto text-balance">
                5 videos. Fully produced. Free. For the first 5 beauty brands that claim a spot.
              </h2>
            </div>
          </Reveal>

          {/* 2-col: left = text + CTA, right = card */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

            {/* Left: description + CTA */}
            <Reveal delay={80}>
              <p className="text-[16px] leading-[1.75] text-background/75">
                We're selective about who we take on, and we'd rather prove the system than pitch
                it. So for the first 5 brands that claim a spot, we'll run the full engine free:
                research, angles, creator casting, and 5 produced videos, ready to run. No
                retainer. No contract. If the work doesn't speak for itself, walk away and keep
                the videos.
              </p>
              <div className="mt-10 flex flex-col items-start gap-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-background/20 bg-background/[0.08] px-4 py-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-teal animate-pulse" />
                  <span className="text-[12px] font-medium tracking-wide text-background/80">
                    5 of 5 spots remaining
                  </span>
                </div>
                <a
                  href={CTA_HREF}
                  className="group inline-flex items-center gap-2 rounded-full bg-background text-brand-deep pl-7 pr-2 h-[56px] text-[15px] font-medium shadow-[0_16px_48px_-16px_rgba(0,0,0,0.4)] transition-all hover:bg-brand-teal hover:text-background no-underline"
                >
                  Claim your spot
                  <span className="ml-1 h-11 w-11 rounded-full bg-brand-deep text-background flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </a>
                <p className="text-[13px] text-background/55">
                  5 spots total. When they're gone, they're gone.
                </p>
              </div>
            </Reveal>

            {/* Right: What's Included card */}
            <Reveal delay={140}>
              <div className="rounded-2xl border border-background/15 bg-background/[0.06] backdrop-blur-sm p-8">
                <p className="text-[11px] font-bold tracking-[0.16em] uppercase text-brand-teal mb-6">
                  What's Included
                </p>
                <ul className="flex flex-col gap-4">
                  {INCLUDED.map((item) => (
                    <li key={item} className="flex gap-3 items-start">
                      <span className="mt-0.5 w-5 h-5 rounded-full bg-brand-teal/25 flex items-center justify-center shrink-0">
                        <Check size={11} className="text-brand-teal" strokeWidth={2.5} />
                      </span>
                      <span className="text-[14.5px] leading-[1.6] text-background/85">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* â"€â"€ SECTION 8 â€" OBJECTIONS â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€ */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-5 lg:px-10">
          <Reveal>
            <Eyebrow>Before You Talk Yourself Out Of It</Eyebrow>
            <h2 className="font-display text-[30px] lg:text-[42px] font-normal tracking-[-0.025em] leading-[1.12] text-foreground mb-10">
              The four things every founder asks.
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <FaqAccordion />
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-10 flex flex-col items-start gap-3">
              <a
                href={CTA_HREF}
                className="group inline-flex items-center gap-2 rounded-full bg-brand-deep text-background pl-7 pr-2 h-[54px] text-[14px] font-medium shadow-[0_12px_32px_-12px_rgba(0,98,92,0.50)] transition-all hover:bg-brand-dark hover:-translate-y-0.5 no-underline"
              >
                Sign up and schedule your call
                <span className="ml-1 h-10 w-10 rounded-full bg-background text-brand-deep flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </a>
              <p className="text-[13px] text-foreground/45">
                Takes under 3 minutes. The call is where we map your first campaign.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* â"€â"€ SECTION 9 â€" FINAL CTA â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€ */}
      <section className="relative py-28 lg:py-40 overflow-hidden gradient-deep grain text-background">
        {/* grid texture */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.05]">
          <svg className="w-full h-full" preserveAspectRatio="none">
            <defs>
              <pattern id="grid-managed" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.4" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-managed)" />
          </svg>
        </div>
        {/* ambient glows */}
        <div className="pointer-events-none absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-brand-teal/20 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-32 -right-32 h-[500px] w-[500px] rounded-full bg-white/5 blur-[120px]" />

        <div className="relative mx-auto max-w-3xl px-5 lg:px-10 text-center">
          <Reveal>
            <div className="text-[11px] tracking-[0.22em] uppercase text-background/55 mb-5">
              First 5 beauty brands
            </div>
            <h2 className="font-display text-[40px] sm:text-[54px] lg:text-[64px] leading-[1.04] tracking-[-0.03em] font-normal text-balance">
              Your next winner shouldn't be a{" "}
              <span className="font-serif italic" style={{ fontSize: "1.05em" }}>coincidence.</span>
            </h2>
            <p className="mt-6 text-[16px] leading-[1.7] text-background/70 max-w-[520px] mx-auto">
              5 free campaign spots for beauty brands doing 6 to 8 figures. After that, the engine
              runs paid.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={CTA_HREF}
                className="group inline-flex items-center gap-2 rounded-full bg-background text-brand-deep pl-7 pr-2 h-[54px] text-[14px] font-medium shadow-[0_16px_40px_-16px_rgba(0,0,0,0.4)] transition-all hover:bg-brand-teal hover:text-background no-underline"
              >
                Claim one of 5 free spots
                <span className="ml-1 h-10 w-10 rounded-full bg-brand-deep text-background flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </a>
            </div>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[12px] text-background/50 tracking-wide">
              <span>5 videos produced free</span>
              <span className="hidden sm:block w-1 h-1 rounded-full bg-background/30" />
              <span>No retainer required</span>
              <span className="hidden sm:block w-1 h-1 rounded-full bg-background/30" />
              <span>Response within 24 hours</span>
            </div>
          </Reveal>
        </div>
      </section>

      <SolFooter />
    </div>
  );
}
