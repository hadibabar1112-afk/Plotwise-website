import { useRef, useState } from "react";
import { Check, ChevronLeft, ChevronRight, Play, X, Pause } from "lucide-react";
import alinaProfile from "@/assets/alina-profile.jpg";
import gabiProfile from "@/assets/gabi-profile.jpg";
import kateProfile from "@/assets/kate-profile.jpg";

type Video = { src: string; poster: string };
type Stat = { n: string; suf: string; lab: string; accent?: boolean };
type Creator = {
  name: string;
  handle: string;
  avatar: string;
  bio: string;
  funnel: string;
  followers: string;
  views: string;
  eng: string;
  niches: string[];
  quote: string;
  videos: Video[];
  /** Stats shown in the campaign-results banner */
  stats: [Stat, Stat, Stat];
};

const creators: Creator[] = [
  {
    name: "Alina Osachenko",
    handle: "@alinaaosh",
    avatar: alinaProfile,
    bio: "Alina creates aesthetic-driven content for beauty and lifestyle brands that feels effortlessly natural and actually converts.",
    funnel: "Top & Middle of Funnel",
    followers: "7.5K",
    views: "7–9K",
    eng: "14%",
    niches: ["Skincare", "Beauty", "Haircare"],
    quote: "\"Great content doesn't look like an ad. It looks like something you'd send to a friend.\"",
    videos: [
      { src: "/creators/alina/1.mp4", poster: "/creators/alina/1.webp" },
      { src: "/creators/alina/2.mp4", poster: "/creators/alina/2.webp" },
      { src: "/creators/alina/3.mp4", poster: "/creators/alina/3.webp" },
    ],
    stats: [
      { n: "2.1",  suf: "M", lab: "Total campaign views" },
      { n: "14",   suf: "%", lab: "Avg engagement rate", accent: true },
      { n: "4.8",  suf: "x", lab: "ROAS this season" },
    ],
  },
  {
    name: "Gabriela Fragaso",
    handle: "@gabrielafragoso__",
    avatar: gabiProfile,
    bio: "Gabriela crafts relatable beauty and lifestyle content rooted in authentic storytelling and built to drive real performance for brands.",
    funnel: "Top & Middle of Funnel",
    followers: "12.8K",
    views: "69.4K",
    eng: "4%",
    niches: ["Beauty", "Haircare", "Lifestyle"],
    quote: "\"When content feels real, people don't scroll past. They stop, they feel it, they buy.\"",
    videos: [
      { src: "/creators/gabi/1.mp4", poster: "/creators/gabi/1.jpg" },
      { src: "/creators/gabi/2.mp4", poster: "/creators/gabi/2.jpg" },
      { src: "/creators/gabi/3.mp4", poster: "/creators/gabi/3.jpg" },
    ],
    stats: [
      { n: "8.4",  suf: "M", lab: "Total campaign views" },
      { n: "4",    suf: "%", lab: "Avg engagement rate" },
      { n: "3.6",  suf: "x", lab: "ROAS this season", accent: true },
    ],
  },
  {
    name: "Kate Vinnik",
    handle: "@katevinnik.ugc",
    avatar: kateProfile,
    bio: "Kate produces premium skincare and beauty visuals that are clean, elevated, and designed to move modern consumers from discovery to purchase.",
    funnel: "Middle & Bottom of Funnel",
    followers: "5,167",
    views: "2K+",
    eng: "2%",
    niches: ["Beauty", "Wellness", "Luxury Lifestyle UGC"],
    quote: "\"Clean beauty content should feel aspirational and honest at the same time. That's what makes it sell.\"",
    videos: [
      { src: "/creators/kate/1.mp4", poster: "/creators/kate/1.jpg" },
      { src: "/creators/kate/2.mp4", poster: "/creators/kate/2.jpg" },
      { src: "/creators/kate/3.mp4", poster: "/creators/kate/3.jpg" },
    ],
    stats: [
      { n: "1.2",  suf: "M", lab: "Total campaign views" },
      { n: "2",    suf: "%", lab: "Avg engagement rate" },
      { n: "5.2",  suf: "x", lab: "ROAS this season", accent: true },
    ],
  },
];

export function Creators() {
  const [cur, setCur] = useState(0);
  const [swap, setSwap] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [vidIdx, setVidIdx] = useState(0);
  const [playingIdx, setPlayingIdx] = useState<number | null>(null);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const popupVideoRef = useRef<HTMLVideoElement | null>(null);
  const [popupPlaying, setPopupPlaying] = useState(false);
  const c = creators[cur];

  const stopAll = () => {
    videoRefs.current.forEach((v) => {
      if (v) {
        v.pause();
        v.currentTime = 0;
      }
    });
    setPlayingIdx(null);
  };

  const go = (dir: 1 | -1) => {
    stopAll();
    setSwap(true);
    setTimeout(() => {
      setCur((i) => (i + dir + creators.length) % creators.length);
      setSwap(false);
    }, 250);
  };

  const togglePlay = (i: number) => {
    const target = videoRefs.current[i];
    if (!target) return;
    // pause all others
    videoRefs.current.forEach((v, idx) => {
      if (v && idx !== i) {
        v.pause();
        v.currentTime = 0;
      }
    });
    if (target.paused) {
      target.play();
      setPlayingIdx(i);
    } else {
      target.pause();
      setPlayingIdx(null);
    }
  };

  const openPopup = () => {
    setVidIdx(0);
    setPopupOpen(true);
    setPopupPlaying(false);
  };

  const closePopup = () => {
    if (popupVideoRef.current) {
      popupVideoRef.current.pause();
    }
    setPopupOpen(false);
    setPopupPlaying(false);
  };

  const goVid = (dir: 1 | -1) => {
    if (popupVideoRef.current) popupVideoRef.current.pause();
    setPopupPlaying(false);
    setVidIdx((i) => (i + dir + c.videos.length) % c.videos.length);
  };

  const togglePopupPlay = () => {
    const v = popupVideoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPopupPlaying(true);
    } else {
      v.pause();
      setPopupPlaying(false);
    }
  };

  return (
    <section id="creators" className="bg-background pt-12 lg:pt-16 pb-24 lg:pb-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <div className="text-center mb-12 lg:mb-14">
          <h2 className="font-display text-[40px] sm:text-[48px] lg:text-[54px] leading-[1.05] tracking-[-0.03em] font-normal text-foreground">
            Meet our{" "}
            <span className="font-serif italic text-brand-deep" style={{ fontSize: "1.05em" }}>
              star creators.
            </span>
          </h2>
          <p className="mt-3 text-[15px] leading-[1.6] text-foreground/60 max-w-[560px] mx-auto">
            We've built a vetted network of creators who understand beauty, storytelling, and performance. This is the
            caliber of content they deliver.
          </p>
        </div>

        <div className="grid lg:grid-cols-[340px_1fr] gap-9 items-stretch">
          {/* PROFILE */}
          <aside
            className={`relative overflow-hidden rounded-[24px] border border-border p-7 lg:p-8 bg-[radial-gradient(420px_220px_at_100%_100%,rgba(43,162,143,0.10),transparent_65%),radial-gradient(360px_200px_at_0%_0%,rgba(215,238,233,0.55),transparent_60%),linear-gradient(135deg,#FCFEFD_0%,#F4FBF9_100%)] shadow-[0_16px_40px_-28px_rgba(19,24,24,0.18)] transition-all duration-300 ${swap ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"}`}
          >
            <div className="relative w-[110px] h-[110px] mx-auto mb-4">
              <div className="w-[110px] h-[110px] rounded-full overflow-hidden border-[3px] border-background shadow-[0_8px_22px_-10px_rgba(19,24,24,0.25)]">
                <img src={c.avatar} alt={c.name} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="absolute right-1 bottom-1 w-[26px] h-[26px] rounded-full bg-brand-dark text-background grid place-items-center shadow-[0_0_0_3px_var(--background)]">
                <Check className="h-3 w-3" strokeWidth={2.4} />
              </div>
            </div>

            <div className="text-center font-semibold text-[20px] tracking-[-0.015em] text-foreground">{c.name}</div>
            <div className="text-center text-[13px] text-foreground/55 mt-0.5 mb-3.5">{c.handle}</div>

            <p className="text-center text-[13px] leading-[1.55] text-foreground/60 mb-5 px-1">{c.bio}</p>

            <div className="flex justify-center mb-5">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-brand-teal/20 border border-brand-dark/30 text-[10.5px] font-semibold tracking-[0.14em] uppercase text-brand-deep">
                {c.funnel}
              </span>
            </div>

            <div className="text-center text-[9.5px] tracking-[0.22em] uppercase text-foreground/55 font-medium mb-3">
              Platform stats
            </div>
            <div className="grid grid-cols-3 gap-1.5 text-center mb-5">
              {[
                { n: c.followers, l: "Followers" },
                { n: c.views, l: "Avg Views" },
                { n: c.eng, l: "Engagement" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="text-[18px] font-semibold tracking-[-0.015em] text-foreground leading-none">
                    {s.n}
                  </div>
                  <div className="text-[11px] text-foreground/55 mt-1">{s.l}</div>
                </div>
              ))}
            </div>

            {/* Mobile-only View content button */}
            <button
              type="button"
              onClick={openPopup}
              className="lg:hidden mb-5 inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-full border border-brand-dark bg-background text-brand-deep text-[13.5px] font-medium transition-all hover:bg-brand-teal/30"
            >
              <Play className="h-3.5 w-3.5" fill="currentColor" />
              View content
            </button>

            <div className="text-center text-[9.5px] tracking-[0.22em] uppercase text-foreground/55 font-medium mb-3">
              Niche
            </div>
            <div className="flex justify-center gap-1.5 mb-5 flex-wrap">
              {c.niches.map((n) => (
                <span
                  key={n}
                  className="px-3 py-1 rounded-full bg-background border border-border text-[11.5px] font-medium text-foreground transition-colors hover:bg-brand-teal/30 hover:border-brand-dark hover:text-brand-deep"
                >
                  {n}
                </span>
              ))}
            </div>

            <div className="text-center text-[9.5px] tracking-[0.22em] uppercase text-foreground/55 font-medium mb-3">
              Creator in their own words
            </div>
            <p className="text-[12.5px] leading-[1.55] text-foreground/75 italic text-center mb-5 px-2">{c.quote}</p>

            <div className="flex items-center justify-between border-t border-border/60 pt-4">
              <button
                onClick={() => go(-1)}
                aria-label="Previous creator"
                className="w-9 h-9 rounded-full border border-border bg-background text-foreground/75 grid place-items-center transition-all hover:border-brand-dark hover:text-brand-dark hover:-translate-y-0.5"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>
              <div className="text-[13px] text-foreground/55 tracking-[0.04em]">
                <strong className="text-foreground font-semibold">{String(cur + 1).padStart(2, "0")}</strong> /{" "}
                {String(creators.length).padStart(2, "0")}
              </div>
              <button
                onClick={() => go(1)}
                aria-label="Next creator"
                className="w-9 h-9 rounded-full bg-brand-dark text-background grid place-items-center transition-all hover:bg-brand-deep hover:-translate-y-0.5"
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </aside>

          {/* RIGHT */}
          <div className="hidden lg:flex flex-col gap-10">
            <div key={cur} className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-[18px]">
              {c.videos.map((v, i) => {
                const isPlaying = playingIdx === i;
                return (
                  <div
                    key={v.src}
                    onClick={() => togglePlay(i)}
                    className="group relative rounded-[18px] overflow-hidden bg-[#222] aspect-[9/16] cursor-pointer shadow-[0_18px_36px_-22px_rgba(19,24,24,0.22)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-28px_rgba(19,24,24,0.35)] opacity-0 translate-y-3 animate-[vIn_0.8s_cubic-bezier(0.2,0.7,0.2,1)_forwards]"
                    style={{ animationDelay: `${0.05 + i * 0.1}s` }}
                  >
                    <video
                      ref={(el) => {
                        videoRefs.current[i] = el;
                      }}
                      src={v.src}
                      poster={v.poster}
                      playsInline
                      preload="metadata"
                      onEnded={() => setPlayingIdx((p) => (p === i ? null : p))}
                      onPause={() => setPlayingIdx((p) => (p === i ? null : p))}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/40 transition-opacity ${isPlaying ? "opacity-0" : "opacity-100"}`} />
                    <div
                      className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[56px] h-[56px] rounded-full bg-background/20 backdrop-blur-md border border-background/40 grid place-items-center text-background z-[2] transition-all duration-300 ${
                        isPlaying ? "opacity-0 scale-75" : "opacity-100 scale-100 group-hover:scale-110"
                      }`}
                    >
                      <Play className="h-4 w-4 ml-0.5" fill="currentColor" />
                    </div>
                  </div>
                );
              })}
            </div>

            <div
              className={`relative overflow-hidden rounded-[18px] border border-border px-7 lg:px-9 py-[34px] grid grid-cols-1 sm:grid-cols-3 items-center bg-[radial-gradient(420px_220px_at_100%_100%,rgba(43,162,143,0.10),transparent_65%),radial-gradient(360px_200px_at_0%_0%,rgba(215,238,233,0.55),transparent_60%),linear-gradient(135deg,#FCFEFD_0%,#F4FBF9_100%)] transition-all duration-300 ${swap ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"}`}
            >
              {c.stats.map((s, i) => (
                <div key={s.lab} className={`text-center px-3 py-1.5 ${i > 0 ? "sm:border-l border-border/60" : ""}`}>
                  <div className="text-[34px] font-semibold tracking-[-0.025em] leading-none text-foreground">
                    <span className={s.accent ? "text-brand-dark" : ""}>{s.n}</span>
                    <span className="text-[0.6em] font-medium ml-0.5 text-foreground/55">{s.suf}</span>
                  </div>
                  <div className="mt-2.5 text-[11px] font-medium tracking-[0.16em] uppercase text-foreground/55">
                    {s.lab}
                  </div>
                </div>
              ))}
            </div>

            <p className="font-serif italic text-center text-brand-deep tracking-[-0.025em] leading-[1.1] font-normal text-[clamp(14px,1.7vw,24px)]">
              They are not just creators. They are extensions of your customer voice.
            </p>
          </div>
        </div>
      </div>

      {/* Mobile popup */}
      {popupOpen && (
        <div
          className="lg:hidden fixed inset-0 z-[100] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closePopup}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              closePopup();
            }}
            aria-label="Close"
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-background/15 border border-background/30 text-background grid place-items-center backdrop-blur-md"
          >
            <X className="h-4 w-4" />
          </button>

          <div
            className="relative w-full max-w-[360px] aspect-[9/16] rounded-[20px] overflow-hidden bg-[#111] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]"
            onClick={(e) => {
              e.stopPropagation();
              togglePopupPlay();
            }}
          >
            <video
              ref={popupVideoRef}
              key={vidIdx}
              src={c.videos[vidIdx].src}
              poster={c.videos[vidIdx].poster}
              playsInline
              preload="metadata"
              onPause={() => setPopupPlaying(false)}
              onPlay={() => setPopupPlaying(true)}
              onEnded={() => setPopupPlaying(false)}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goVid(-1);
              }}
              aria-label="Previous video"
              className="absolute left-2.5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-black/55 border border-background/40 text-background grid place-items-center backdrop-blur-md active:scale-95"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goVid(1);
              }}
              aria-label="Next video"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-black/55 border border-background/40 text-background grid place-items-center backdrop-blur-md active:scale-95"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <div
              className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[64px] h-[64px] rounded-full bg-background/15 backdrop-blur-md border border-background/40 grid place-items-center text-background pointer-events-none transition-opacity ${
                popupPlaying ? "opacity-0" : "opacity-100"
              }`}
            >
              {popupPlaying ? <Pause className="h-5 w-5" fill="currentColor" /> : <Play className="h-5 w-5 ml-0.5" fill="currentColor" />}
            </div>
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5">
            {c.videos.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all ${i === vidIdx ? "w-6 bg-background" : "w-1.5 bg-background/40"}`}
              />
            ))}
          </div>
        </div>
      )}

      <style>{`@keyframes vIn { to { opacity: 1; transform: translateY(0); } }`}</style>

      {/* Preload all creator avatars, posters and videos so switches are instant */}
      <div aria-hidden className="hidden">
        {creators.map((cr) => (
          <div key={cr.name}>
            <img src={cr.avatar} alt="" />
            {cr.videos.map((v) => (
              <div key={v.src}>
                <img src={v.poster} alt="" />
                <link rel="preload" as="video" href={v.src} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
