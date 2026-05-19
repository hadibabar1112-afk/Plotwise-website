import { useEffect, useRef, useState } from "react";

const PILLARS = [
  { tag: "Research", title: "Research-First", desc: "We invest deeply in your audience psychology before a single frame is shot.", tint: "#D9E5DD" },
  { tag: "Strategy", title: "Angle Discovery", desc: "We engineer marketing angles that move buyers through TOF → MOF → BOF.", tint: "#F2EADB" },
  { tag: "Production", title: "Funnel-Specific Content", desc: "Every creative has a role. Nothing is made just to post.", tint: "#D9E5DD" },
  { tag: "Optimization", title: "Data + Emotion", desc: "We track performance signals and translate them into better storytelling.", tint: "#F2EADB" },
];

export function Differentiators() {
  const wrapRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setVisible(e.isIntersecting && e.intersectionRatio > 0.1),
      { threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={wrapRef} className="bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <div className="text-center mb-14 lg:mb-16">
          <h2 className="font-display text-[40px] sm:text-[48px] lg:text-[54px] leading-[1.08] tracking-[-0.03em] font-normal text-foreground">
            Creative strategists with{" "}
            <br className="hidden sm:block" />
            <span className="italic font-light text-brand-deep" style={{ fontSize: "1.05em" }}>
              a marketer's mind.
            </span>
          </h2>
          <p className="mt-5 text-[15.5px] leading-[1.65] text-foreground/70 max-w-[640px] mx-auto">
            We sit at the intersection of{" "}
            <strong className="font-semibold text-foreground">creativity + strategy + marketing</strong>.
            That's why our content connects emotionally and performs commercially.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PILLARS.map((p, i) => (
            <PillarCard
              key={p.title}
              p={p}
              idx={i}
              active={visible}
              elevated={hovered === i}
              onEnter={() => setHovered(i)}
              onLeave={() => setHovered(null)}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pw-spin-slow { to { transform: rotate(360deg); } }
        @keyframes pw-spin-rev  { to { transform: rotate(-360deg); } }
        @keyframes pw-pulse-ring { 0%,100% { transform: scale(1); opacity: 0.6; } 50% { transform: scale(1.15); opacity: 0.2; } }
        @keyframes pw-float-y   { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        @keyframes pw-float-y2  { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-9px); } }
        @keyframes pw-dash-flow { to { stroke-dashoffset: -40; } }
        @keyframes pw-spark     { 0%,100% { opacity: 0; } 30%,70% { opacity: 1; } }
        @keyframes pw-scroll-up { 0% { transform: translateY(0); } 100% { transform: translateY(-50%); } }
      `}</style>
    </section>
  );
}

function PillarCard({
  p,
  idx,
  active,
  elevated,
  onEnter,
  onLeave,
}: {
  p: (typeof PILLARS)[number];
  idx: number;
  active: boolean;
  elevated: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  const Visuals = [ResearchVisual, AngleVisual, FunnelVisual, DataVisual];
  const Visual = Visuals[idx];

  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={`relative bg-background rounded-[18px] p-7 pb-8 border overflow-hidden transition-all duration-500 ${
        elevated
          ? "border-brand-dark/30 shadow-[0_18px_48px_-18px_rgba(32,119,112,0.22)] -translate-y-1.5"
          : "border-foreground/[0.07] shadow-[0_2px_12px_rgba(19,24,24,0.04)]"
      }`}
    >
      <div
        className="w-full h-[210px] rounded-xl mb-6 relative overflow-hidden flex items-center justify-center"
        style={{ background: p.tint }}
      >
        <Visual active={active} />
      </div>

      <div className="text-center">
        <h3 className="font-display text-[19px] font-medium tracking-[-0.015em] text-foreground mb-2.5">
          {p.title}
        </h3>
        <p className="text-[13.5px] leading-[1.6] text-foreground/60 max-w-[240px] mx-auto">
          {p.desc}
        </p>
      </div>

      <div
        className={`absolute left-0 right-0 bottom-0 h-[3px] transition-colors duration-300 ${
          elevated ? "bg-brand-dark" : "bg-transparent"
        }`}
      />
    </div>
  );
}

const TEAL = "hsl(var(--brand-deep, 174 57% 28%))";

/* ──────────────── Visual 1: Research orbit ──────────────── */
function ResearchVisual({ active }: { active: boolean }) {
  return (
    <svg width="260" height="180" viewBox="0 0 260 180" className="text-brand-dark">
      <circle cx="130" cy="90" r="72" fill="none" stroke="currentColor" strokeOpacity="0.18" strokeWidth="1" strokeDasharray="3 4"
        style={{ animation: active ? "pw-spin-slow 24s linear infinite" : "none", transformOrigin: "130px 90px" }} />
      <circle cx="130" cy="90" r="48" fill="none" stroke="currentColor" strokeOpacity="0.22" strokeWidth="1" strokeDasharray="2 3"
        style={{ animation: active ? "pw-spin-rev 18s linear infinite" : "none", transformOrigin: "130px 90px" }} />
      <g>
        <circle cx="130" cy="90" r="32" fill="#fff" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="130" cy="82" r="9" fill="currentColor" opacity="0.6" />
        <path d="M 112 108 Q 130 96 148 108 L 148 122 L 112 122 Z" fill="currentColor" opacity="0.6" />
        <circle cx="130" cy="90" r="32" fill="none" stroke="currentColor" strokeWidth="1.5"
          style={{ animation: active ? "pw-pulse-ring 2.4s ease-in-out infinite" : "none", transformOrigin: "130px 90px" }} />
      </g>
      <g style={{ animation: active ? "pw-spin-slow 24s linear infinite" : "none", transformOrigin: "130px 90px" }}>
        <g transform="translate(202, 90)">
          <circle r="14" fill="#fff" stroke="currentColor" strokeWidth="1" />
          <circle cx="-2" cy="-2" r="5" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <line x1="2" y1="2" x2="6" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </g>
        <g transform="translate(130, 18)">
          <circle r="14" fill="#fff" stroke="currentColor" strokeWidth="1" />
          <polyline points="-7,4 -2,-1 2,2 7,-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <g transform="translate(58, 90)">
          <circle r="14" fill="#fff" stroke="currentColor" strokeWidth="1" />
          <circle cx="-4" cy="-3" r="3" fill="currentColor" />
          <circle cx="4" cy="-3" r="3" fill="currentColor" />
          <path d="M -8 6 Q -4 3 0 6 Q 4 3 8 6" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </g>
        <g transform="translate(130, 162)">
          <circle r="14" fill="#fff" stroke="currentColor" strokeWidth="1" />
          <rect x="-7" y="-5" width="14" height="9" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <polygon points="-3,4 -5,7 -1,4" fill="currentColor" />
        </g>
      </g>
      <text x="18" y="22" fontSize="8" fill="currentColor" opacity="0.5" className="font-mono">PSYCHOGRAPHIC</text>
      <text x="242" y="22" textAnchor="end" fontSize="8" fill="currentColor" opacity="0.5" className="font-mono">N = 2.4K</text>
      <text x="18" y="170" fontSize="8" fill="currentColor" opacity="0.5" className="font-mono">INSIGHTS: 14</text>
      <text x="242" y="170" textAnchor="end" fontSize="8" fill="currentColor" opacity="0.5" className="font-mono">● LIVE</text>
    </svg>
  );
}

/* ──────────────── Visual 2: Angle Discovery ──────────────── */
function AngleVisual({ active }: { active: boolean }) {
  const nodes = [
    { y: 60, label: "TOF", note: "Hook" },
    { y: 95, label: "MOF", note: "Proof" },
    { y: 130, label: "BOF", note: "Offer" },
  ];
  return (
    <svg width="260" height="180" viewBox="0 0 260 180" className="text-brand-dark">
      <g transform="translate(60, 70)">
        <rect x="0" y="0" width="62" height="44" rx="5" fill="#fff" stroke="currentColor" strokeWidth="1" />
        <rect x="6" y="8" width="28" height="2.5" rx="1" fill="currentColor" opacity="0.7" />
        <rect x="6" y="15" width="50" height="2" rx="1" fill="currentColor" opacity="0.35" />
        <rect x="6" y="21" width="44" height="2" rx="1" fill="currentColor" opacity="0.35" />
        <rect x="6" y="27" width="38" height="2" rx="1" fill="currentColor" opacity="0.35" />
        <rect x="6" y="33" width="46" height="2" rx="1" fill="currentColor" opacity="0.35" />
        <text x="6" y="-3" fontSize="7" fill="currentColor" opacity="0.6" className="font-mono">BRIEF</text>
      </g>
      {nodes.map(({ y }) => (
        <path key={y} d={`M 122 92 C 150 92, 160 ${y}, 200 ${y}`}
          fill="none" stroke="currentColor" strokeWidth="1.3" opacity="0.7" strokeDasharray="4 3"
          style={{ animation: active ? "pw-dash-flow 1.2s linear infinite" : "none" }} />
      ))}
      {nodes.map((n, i) => (
        <g key={i} transform={`translate(200, ${n.y})`}>
          <rect x="0" y="-14" width="54" height="28" rx="14" fill="#fff" stroke="currentColor" strokeWidth="1" />
          <text x="12" y="0" fontSize="9" fontWeight="700" fill="currentColor" className="font-mono">{n.label}</text>
          <text x="12" y="9" fontSize="7" fill="currentColor" opacity="0.6">{n.note}</text>
          <circle cx="6" cy="0" r="2.5" fill="#91CEB0" />
        </g>
      ))}
      <text x="18" y="22" fontSize="8" fill="currentColor" opacity="0.5" className="font-mono">ANGLES</text>
      <text x="242" y="22" textAnchor="end" fontSize="8" fill="currentColor" opacity="0.5" className="font-mono">32 TESTED</text>
      <text x="18" y="170" fontSize="8" fill="currentColor" opacity="0.5" className="font-mono">FUNNEL MAP</text>
      <text x="242" y="170" textAnchor="end" fontSize="8" fill="currentColor" opacity="0.5" className="font-mono">3 / 3 ACTIVE</text>
    </svg>
  );
}

/* ──────────────── Visual 3: Funnel-specific phone ──────────────── */
function FunnelVisual({ active }: { active: boolean }) {
  return (
    <svg width="260" height="180" viewBox="0 0 260 180" className="text-brand-dark">
      <g transform="translate(85, 18)">
        <rect x="0" y="0" width="90" height="150" rx="14" fill="#1F2623" />
        <rect x="3" y="3" width="84" height="144" rx="11" fill="#fff" />
        <rect x="36" y="8" width="18" height="4" rx="2" fill="#1F2623" />
        <clipPath id="pw-phone-clip">
          <rect x="6" y="18" width="78" height="126" rx="3" />
        </clipPath>
        <g clipPath="url(#pw-phone-clip)">
          <g style={{ animation: active ? "pw-scroll-up 6s linear infinite" : "none" }}>
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <g key={i} transform={`translate(0, ${i * 44})`}>
                <rect x="9" y="22" width="72" height="40" rx="4" fill={i % 2 === 0 ? "#D9E5DD" : "#E8E0D0"} />
                <circle cx="18" cy="32" r="4" fill="currentColor" opacity="0.7" />
                <rect x="25" y="30" width="24" height="1.5" rx="0.7" fill="currentColor" opacity="0.5" />
                <rect x="25" y="34" width="18" height="1.5" rx="0.7" fill="currentColor" opacity="0.3" />
                <rect x="12" y="42" width="66" height="16" rx="2" fill="#fff" opacity="0.7" />
                <rect x="16" y="48" width="40" height="1.5" rx="0.7" fill="currentColor" opacity="0.4" />
                <rect x="16" y="52" width="30" height="1.5" rx="0.7" fill="currentColor" opacity="0.3" />
              </g>
            ))}
          </g>
        </g>
      </g>
      {[
        { y: 34, label: "TOF", role: "Awareness" },
        { y: 86, label: "MOF", role: "Consider" },
        { y: 138, label: "BOF", role: "Convert" },
      ].map((f, i) => (
        <g key={i} transform={`translate(18, ${f.y})`}>
          <rect x="0" y="-12" width="56" height="24" rx="12" fill="#fff" stroke="currentColor" strokeWidth="1" />
          <text x="8" y="-1" fontSize="8" fontWeight="700" fill="currentColor" className="font-mono">{f.label}</text>
          <text x="8" y="7" fontSize="6.5" fill="currentColor" opacity="0.6">{f.role}</text>
          <line x1="56" y1="0" x2="72" y2="0" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
          <circle cx="72" cy="0" r="1.5" fill="currentColor" />
        </g>
      ))}
      <g transform="translate(195, 40)">
        <circle cx="0" cy="0" r="4" fill="#91CEB0"
          style={{ animation: active ? "pw-pulse-ring 2s ease-in-out infinite" : "none", transformOrigin: "0 0" }} />
        <text x="10" y="3" fontSize="8" fill="currentColor" className="font-mono">PLAYING</text>
      </g>
      <g transform="translate(195, 90)">
        <text x="0" y="0" fontSize="8" fill="currentColor" opacity="0.6" className="font-mono">ROLE</text>
        <text x="0" y="12" fontSize="11" fontWeight="700" fill="#1F2623">Hook</text>
      </g>
      <g transform="translate(195, 130)">
        <text x="0" y="0" fontSize="8" fill="currentColor" opacity="0.6" className="font-mono">FORMAT</text>
        <text x="0" y="12" fontSize="11" fontWeight="700" fill="#1F2623">Reel</text>
      </g>
    </svg>
  );
}

/* ──────────────── Visual 4: Data + Emotion ──────────────── */
function DataVisual({ active }: { active: boolean }) {
  const bars = [42, 68, 54, 82, 74, 96, 88];
  return (
    <svg width="260" height="180" viewBox="0 0 260 180" className="text-brand-dark">
      {[40, 80, 120].map((y) => (
        <line key={y} x1="20" y1={y} x2="240" y2={y} stroke="currentColor" strokeOpacity="0.12" strokeWidth="1" strokeDasharray="2 3" />
      ))}
      {bars.map((h, i) => {
        const x = 32 + i * 22;
        const barH = h * 0.85;
        return (
          <rect key={i} x={x} y={140 - barH} width="14" height={barH} rx="2"
            fill={i === 5 ? "currentColor" : "#91CEB0"} opacity={i === 5 ? 0.95 : 0.75} />
        );
      })}
      <path d="M 20 70 L 60 70 L 72 50 L 82 90 L 92 35 L 104 70 L 150 70 L 162 55 L 172 85 L 182 70 L 240 70"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        strokeDasharray="280" strokeDashoffset={active ? 0 : 280}
        style={{ transition: "stroke-dashoffset 1.6s ease-out" }} />
      <circle cx="142" cy="44" r="4" fill="currentColor"
        style={{ animation: active ? "pw-pulse-ring 2s ease-in-out infinite" : "none", transformOrigin: "142px 44px" }} />
      <circle cx="142" cy="44" r="6" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <text x="152" y="38" fontSize="8" fontWeight="700" fill="currentColor" className="font-mono">PEAK</text>
      <text x="152" y="48" fontSize="7" fill="currentColor" opacity="0.6">+96.5%</text>
      <g style={{ animation: active ? "pw-spark 3s ease-in-out infinite" : "none" }}>
        <text x="40" y="28" fontSize="12" fill="currentColor">♥</text>
      </g>
      <g style={{ animation: active ? "pw-spark 3s ease-in-out 0.6s infinite" : "none" }}>
        <text x="200" y="32" fontSize="10" fill="currentColor">✦</text>
      </g>
      <text x="18" y="22" fontSize="8" fill="currentColor" opacity="0.55" className="font-mono">SIGNAL</text>
      <text x="242" y="22" textAnchor="end" fontSize="8" fill="currentColor" opacity="0.55" className="font-mono">+ STORY</text>
      <text x="18" y="170" fontSize="8" fill="currentColor" opacity="0.55" className="font-mono">ROAS 4.8×</text>
      <text x="242" y="170" textAnchor="end" fontSize="8" fill="currentColor" opacity="0.55" className="font-mono">● LIVE</text>
    </svg>
  );
}
