import { useEffect, useRef, useState } from "react";
import { Sparkles } from "lucide-react";

const stages = [
  {
    step: "01",
    label: "Top of Funnel",
    name: <>Awareness <span className="italic font-light" style={{ fontFamily: "serif" }}>& Discovery</span></>,
    tag: "Stop the scroll. Get on the radar.",
    traits: ["Scroll-stopping hooks", "High reach & share velocity", "Discovery-oriented audience"],
    width: "100%",
    bg: "linear-gradient(180deg, #F2DCD0, #E8C9B8)",
    ink: "#6B3E2A",
    chip: "bg-white/80 border-white/60 text-[#6B3E2A]",
  },
  {
    step: "02",
    label: "Middle of Funnel",
    name: <>Consideration <span className="italic font-light" style={{ fontFamily: "serif" }}>& Education</span></>,
    tag: "Build the case. Earn the saves.",
    traits: ["In-depth product storytelling", "High save + comment rate", "Trust-building tone"],
    width: "88%",
    bg: "linear-gradient(180deg, #CFE3D5, #B6D5BF)",
    ink: "#2B5B3A",
    chip: "bg-white/70 border-white/55 text-[#2B5B3A]",
  },
  {
    step: "03",
    label: "Bottom of Funnel",
    name: <>Conversion <span className="italic font-light" style={{ fontFamily: "serif" }}>& Purchase</span></>,
    tag: "Close the loop. Drive the click.",
    traits: ["Purchase-intent language", "Niche loyal micro-community", "High link-tap behavior"],
    width: "76%",
    bg: "linear-gradient(180deg, #1F6F5E, #155244)",
    ink: "#FFFFFF",
    chip: "bg-white/15 border-white/20 text-white",
  },
] as const;

function Stage({ s, i }: { s: (typeof stages)[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setInView(true)),
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`relative rounded-[18px] px-7 lg:px-10 py-8 lg:py-9 grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-6 items-center overflow-hidden z-[1] transition-all duration-700 ease-out ${
        inView ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-[0.985]"
      }`}
      style={{ width: s.width, background: s.bg, color: s.ink }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_-10%,rgba(255,255,255,0.45),transparent_50%)]" />
      <div className="relative z-[2]">
        <div className="inline-flex items-center gap-2.5 text-[10px] tracking-[0.22em] uppercase font-medium opacity-75 mb-3.5">
          <span className="italic text-[18px] opacity-85" style={{ fontFamily: "serif" }}>{s.step}</span>
          <span>{s.label}</span>
        </div>
        <div className="text-[26px] lg:text-[28px] leading-[1.1] tracking-[-0.02em] font-medium mb-2.5">
          {s.name}
        </div>
        <div className="text-[13.5px] opacity-80">{s.tag}</div>
      </div>
      <div className="relative z-[2] flex flex-wrap lg:flex-nowrap lg:justify-end gap-2">
        {s.traits.map((t, ti) => (
          <span
            key={t}
            className={`text-[11px] font-medium px-3 py-1.5 rounded-full backdrop-blur-md border whitespace-nowrap transition-all duration-500 ease-out hover:-translate-y-0.5 ${s.chip} ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
            style={{ transitionDelay: inView ? `${0.2 + ti * 0.12}s` : "0s" }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Funnel() {
  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-[1100px] px-5 lg:px-8 text-center mb-12 lg:mb-14">
        <span className="inline-block text-[10.5px] tracking-[0.22em] uppercase text-foreground/55 font-medium px-4 py-1.5 rounded-full bg-background border border-border mb-7">
          The PlotWise System
        </span>
        <h2 className="font-display text-[40px] sm:text-[52px] lg:text-[62px] leading-[1.05] tracking-[-0.03em] font-normal text-foreground mb-5">
          The right creator
          <br />
          for every{" "}
          <span className="italic font-light text-brand-deep" style={{ fontSize: "1.05em" }}>
            stage of the funnel
          </span>
          .
        </h2>
        <p className="text-[15.5px] lg:text-[16px] leading-[1.6] text-foreground/60 max-w-[620px] mx-auto">
          Most agencies match creators by follower count. We map them to funnel stages based on content psychology, audience behavior, and creative style — then assign each creator to where they convert.
        </p>
      </div>

      <div className="relative mx-auto max-w-[1280px] px-5 lg:px-10 pb-12">
        <div className="relative flex flex-col items-center gap-3.5">
          {/* center thread */}
          <div className="pointer-events-none absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-foreground/10 to-transparent" />
          {stages.map((s, i) => (
            <div key={s.step} className="contents">
              <Stage s={s} i={i} />
              {i < stages.length - 1 && (
                <div className="relative w-px h-3.5 z-[2] flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-foreground/25" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* takeaway */}
        <div className="mt-14 flex justify-center">
          <div className="max-w-[720px] flex items-center gap-6 px-9 py-7 rounded-[18px] bg-background border border-border shadow-[0_1px_2px_rgba(19,24,24,0.03)]">
            <div className="w-[42px] h-[42px] rounded-full bg-brand-dark/10 text-brand-dark grid place-items-center flex-none">
              <Sparkles className="h-4 w-4" strokeWidth={1.6} />
            </div>
            <p className="italic text-[18px] lg:text-[20px] leading-[1.4] text-foreground/80 font-light" style={{ fontFamily: "serif" }}>
              The result: every dollar spent reaches the audience{" "}
              <span className="text-brand-dark">most likely to act</span>, not just the loudest one.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}