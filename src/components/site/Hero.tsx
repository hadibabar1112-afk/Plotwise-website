import { useEffect, useState } from "react";
import reel1 from "@/assets/reel-1.jpg";
import reel2 from "@/assets/reel-2.jpg";
import reel3 from "@/assets/reel-3.jpg";
import creator1 from "@/assets/creator-1.jpg";
import creator2 from "@/assets/creator-2.jpg";
import creator3 from "@/assets/creator-3.jpg";
import creator4 from "@/assets/creator-4.jpg";

/** True on phones/small tablets — avoids downloading 10 MB of hero videos on mobile */
function useIsMobile() {
  const [mobile, setMobile] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches
  );
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const handler = (e: MediaQueryListEvent) => setMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return mobile;
}

const rotatingWords = ["Belief", "Conversion", "Growth", "Resonance"];

function ReelCard({
  src,
  delay,
  label,
  views,
  video,
  poster,
  isMobile,
}: {
  src: string;
  delay: number;
  label: string;
  views: string;
  video?: string;
  poster?: string;
  isMobile?: boolean;
}) {
  // On mobile: skip video entirely — show the poster/image to save ~2–3 MB per card
  const showVideo = video && !isMobile;
  return (
    <div
      className="relative aspect-[9/16] rounded-[28px] overflow-hidden ring-1 ring-foreground/10 shadow-[0_30px_80px_-30px_rgba(0,98,92,0.45)] animate-float isolate"
      style={{ animationDelay: `${delay}s`, clipPath: "inset(0 round 28px)" }}
    >
      {showVideo ? (
        <video
          src={video}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover rounded-[28px]"
        />
      ) : (
        <img
          src={poster ?? src}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
      )}
      {/* gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />
      {/* Live dot */}
      <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/40 backdrop-blur-md rounded-full px-2.5 py-1">
        <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse-dot" />
        <span className="text-[10px] font-medium text-white tracking-wide">LIVE</span>
      </div>
      {/* Bottom UI */}
      <div className="absolute inset-x-0 bottom-0 p-3 text-white">
        <div className="flex items-end justify-between gap-2">
          <div>
            <div className="text-[11px] opacity-80">@{label}</div>
            <div className="text-[12px] font-medium leading-tight mt-0.5">{views} views · 24h</div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M12 21s-7-4.5-9.5-9C.8 8.5 3 5 6.5 5c1.7 0 3.2.9 4 2.3.8-1.4 2.3-2.3 4-2.3C18 5 20.2 8.5 18.5 12 16 16.5 12 21 12 21z"/></svg>
            </div>
            <div className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            </div>
          </div>
        </div>
        {/* progress */}
        <div className="mt-2 h-0.5 w-full bg-white/20 rounded overflow-hidden relative">
          <div className="absolute inset-y-0 left-0 w-1/2 bg-white/80 animate-shimmer" />
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  const isMobile = useIsMobile();
  const [wordIdx, setWordIdx] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">("typing");

  useEffect(() => {
    const current = rotatingWords[wordIdx];
    let delay = 90;
    if (phase === "typing") {
      if (text.length < current.length) {
        delay = 110;
        const t = setTimeout(() => setText(current.slice(0, text.length + 1)), delay);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setPhase("pausing"), 1400);
      return () => clearTimeout(t);
    }
    if (phase === "pausing") {
      const t = setTimeout(() => setPhase("deleting"), 600);
      return () => clearTimeout(t);
    }
    // deleting
    if (text.length > 0) {
      const t = setTimeout(() => setText(current.slice(0, text.length - 1)), 55);
      return () => clearTimeout(t);
    }
    setWordIdx((i) => (i + 1) % rotatingWords.length);
    setPhase("typing");
  }, [text, phase, wordIdx]);

  return (
    <section id="top" className="relative !pt-[64px] md:!pt-[88px] pb-24 lg:pb-32 overflow-hidden">
      {/* Background ornaments */}
      <div className="pointer-events-none absolute -top-20 -right-32 h-[520px] w-[520px] rounded-full bg-brand-teal/30 blur-[120px]" />
      <div className="pointer-events-none absolute top-1/2 -left-40 h-[420px] w-[420px] rounded-full bg-brand-dark/15 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-10 mt-6">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left: Headline */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <h1 className="display-xl text-[44px] sm:text-[60px] lg:text-[76px] text-foreground text-balance">
              Turning Attention <br />
              <span className="whitespace-nowrap">
              Into{" "}
              <span className="relative inline-block align-baseline">
                <span className="relative z-10 text-brand-deep font-serif italic font-normal" style={{ fontSize: "1.05em" }}>
                  {text}
                  <span className="ml-0.5 inline-block w-[3px] h-[0.85em] -mb-1 bg-brand-deep align-middle animate-blink" />
                </span>
              </span>
              </span>
              .
            </h1>

            <p className="mt-7 text-[17px] lg:text-[19px] leading-relaxed text-foreground/70 max-w-xl text-pretty">
              Creator-led growth systems for beauty and beauty-adjacent e-commerce
              brands ready to scale. We design narratives that build trust, spark
              connection, and translate attention into real growth.
            </p>

            {/* Trust line */}
            <div className="mt-9 flex items-center gap-4">
              <div className="flex -space-x-2.5">
                {[creator1, creator2, creator3, creator4].map((src, i) => (
                  <span
                    key={i}
                    className="relative h-9 w-9 rounded-full ring-2 ring-background overflow-hidden shadow-[0_4px_12px_-4px_rgba(0,98,92,0.3)]"
                    style={{ zIndex: 4 - i }}
                  >
                    <img
                      src={src}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover"
                      draggable={false}
                    />
                  </span>
                ))}
              </div>
              <p className="text-[13.5px] text-foreground/70 leading-snug">
                Trusted by{" "}
                <span className="text-foreground font-medium">40+ beauty brands</span>{" "}
                scaling past <span className="text-brand-deep font-medium">$1M ARR</span>
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="/contact"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full text-background pl-6 pr-2 h-[52px] py-2 text-[14px] font-medium transition-all shadow-[0_10px_30px_-10px_rgba(32,119,113,0.55)] hover:shadow-[0_14px_34px_-10px_rgba(32,119,113,0.7)] hover:brightness-110"
                style={{ backgroundImage: "linear-gradient(135deg, hsl(var(--brand-deep, 175 55% 22%)) 0%, #207770 50%, #2C8A82 100%)", background: "linear-gradient(135deg, #0F4F4A 0%, #207770 55%, #2C8A82 100%)" }}
              >
                Work with PlotWise
                <span className="ml-1 h-9 w-9 rounded-full bg-background text-brand-deep flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </a>
              <a href="#system" className="text-[14px] text-foreground/70 hover:text-foreground underline-offset-4 hover:underline">
                How we work →
              </a>
            </div>

            {/* Glass stat + logos card */}
            <div className="mt-12 max-w-xl">
              <div
                className="relative rounded-[22px] p-[1px] overflow-hidden shadow-[0_24px_70px_-28px_rgba(15,79,74,0.55)]"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(44,138,130,0.55) 0%, rgba(15,79,74,0.35) 45%, rgba(255,255,255,0.25) 100%)",
                }}
              >
                <div
                  className="relative rounded-[21px] p-5 sm:p-6 overflow-hidden backdrop-blur-xl"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(15,79,74,0.92) 0%, rgba(32,119,113,0.88) 55%, rgba(44,138,130,0.92) 100%)",
                  }}
                >
                  {/* glow accents */}
                  <div className="pointer-events-none absolute -top-16 -left-10 h-40 w-40 rounded-full bg-brand-teal/40 blur-3xl" />
                  <div className="pointer-events-none absolute -bottom-20 -right-10 h-44 w-44 rounded-full bg-white/10 blur-3xl" />
                  {/* sheen */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-transparent" />

                  <div className="relative flex items-center gap-5">
                    <div className="shrink-0 pr-5 border-r border-white/15">
                      <div className="font-display text-4xl sm:text-5xl text-background leading-none tracking-tight">
                        10
                      </div>
                      <div className="text-[10px] uppercase tracking-[0.18em] text-background/70 mt-2 whitespace-nowrap">
                        brands<br />per season
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="h-1.5 w-1.5 rounded-full bg-brand-teal animate-pulse-dot" />
                        <span className="text-[10px] uppercase tracking-[0.2em] text-background/65">
                          trusted by
                        </span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-2 gap-y-3 sm:gap-y-0 items-center justify-items-center">
                        {["LUMÉ", "ATELIER", "RICHUAL", "ÉCLAT"].map((name) => (
                          <div
                            key={name}
                            className="font-display text-[11px] sm:text-[13px] lg:text-[15px] tracking-[0.14em] text-background/75 hover:text-background transition-colors text-center whitespace-nowrap"
                          >
                            {name}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Reels collage */}
          <div className="lg:col-span-5 relative order-1 lg:order-2">
            <div className="relative grid grid-cols-2 gap-3.5 max-w-[392px] mx-auto">
              <div className="space-y-3.5 pt-8">
                <ReelCard src={reel1} video="/videos/reel-1.mp4" poster="/videos/reel-1.jpg" delay={0} label="lumeskin" views="284K" isMobile={isMobile} />
                <ReelCard src={reel3} video="/videos/reel-2.mp4" poster="/videos/reel-2.jpg" delay={1.2} label="atelierbeaute" views="1.2M" isMobile={isMobile} />
              </div>
              <div className="space-y-3.5">
                <ReelCard src={reel2} video="/videos/reel-3.mp4" poster="/videos/reel-3.jpg" delay={0.6} label="dewdaily" views="612K" isMobile={isMobile} />
                <ReelCard src={reel2} video="/videos/reel-4.mp4" poster="/videos/reel-4.jpg" delay={1.8} label="glowritual" views="892K" isMobile={isMobile} />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}