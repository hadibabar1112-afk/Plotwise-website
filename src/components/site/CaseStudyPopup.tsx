import { useState, useEffect, useRef, useCallback, type ReactNode, type CSSProperties } from "react";

export type CaseStudyMetric = { value: string; label: string };
export type CaseStudyMeta = { term: string; def: string };
export type CaseStudyMedia = { src: string; caption: string; poster?: string };
export type CaseStudyPhase = {
  tag: string;
  heading: string;
  paragraphs: (string | { html: string })[];
  funnels?: { label: string; items: { ang?: string; text: string }[] }[];
  hooks?: { label?: string; text: string }[];
  results?: { kind: "winner" | "loser"; html: string }[];
};
export type CaseStudySection = {
  heading: string;
  paragraphs?: (string | { html: string })[];
  pullQuote?: string;
  phases?: CaseStudyPhase[];
  stats?: { value: string; label: string }[];
};
export type CaseStudyData = {
  brand: string;
  pill: string;
  sub: string;
  metrics: CaseStudyMetric[];
  meta: CaseStudyMeta[];
  sections: CaseStudySection[];
  media: CaseStudyMedia[];
  forceSoloTail?: number;
  next: { name: string; sub: string; idx: string; image: string };
};

export function CaseStudyPopup({
  open,
  onClose,
  data,
  onNext,
}: {
  open: boolean;
  onClose: () => void;
  data: CaseStudyData;
  onNext?: () => void;
}) {
  const [phase, setPhase] = useState<"peek" | "full">("peek");
  const [mounted, setMounted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      setMounted(false);
      setPhase("peek");
      return;
    }
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setMounted(true));
    });
    return () => cancelAnimationFrame(id);
  }, [open]);

  // When data changes (next case study clicked), reset scroll to top
  useEffect(() => {
    if (!open) return;
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: 0, behavior: "auto" });
    setPhase("full");
  }, [data, open]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const onScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const el = e.currentTarget;
      if (phase === "peek" && el.scrollTop > 4) setPhase("full");
    },
    [phase],
  );

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

  // Mobile: dragging down from scrollTop=0 collapses back to peek so the
  // backdrop and close button become reachable
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || !open) return;
    let startY = 0;
    const onTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (phase !== "full") return;
      const dy = e.touches[0].clientY - startY;
      if (el.scrollTop <= 0 && dy > 40) setPhase("peek");
    };
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: true });
    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
    };
  }, [phase, open]);

  if (!open) return null;

  const isVideo = (src: string) => /\.(mp4|webm|mov)(\?|$)/i.test(src);
  // Unique themed gradient backgrounds per case study video container
  const brandBgStyle: CSSProperties = data.brand.startsWith("Skincare")
    ? {
        // Skincare — abstract blush bloom with peach orbs
        background:
          "radial-gradient(40% 35% at 18% 22%, rgba(255,214,196,0.95) 0%, rgba(255,214,196,0) 70%), radial-gradient(35% 30% at 82% 78%, rgba(201,122,102,0.85) 0%, rgba(201,122,102,0) 72%), radial-gradient(30% 28% at 70% 18%, rgba(255,180,156,0.7) 0%, rgba(255,180,156,0) 70%), conic-gradient(from 210deg at 50% 50%, #fde7df 0deg, #f4b9a6 120deg, #e08c76 220deg, #fde7df 360deg)",
      }
    : data.brand.startsWith("Haircare")
      ? {
          // Haircare — abstract caramel swirl with bronze glow
          background:
            "radial-gradient(45% 40% at 80% 18%, rgba(247,227,196,0.95) 0%, rgba(247,227,196,0) 70%), radial-gradient(40% 35% at 22% 82%, rgba(94,58,35,0.9) 0%, rgba(94,58,35,0) 72%), radial-gradient(28% 26% at 30% 30%, rgba(230,168,108,0.7) 0%, rgba(230,168,108,0) 70%), conic-gradient(from 40deg at 60% 50%, #5e3a23 0deg, #b67a44 110deg, #f0c98a 220deg, #5e3a23 360deg)",
        }
      : {
          // Beauty — abstract cocoa marble with cream highlights
          background:
            "radial-gradient(42% 38% at 28% 80%, rgba(243,230,216,0.95) 0%, rgba(243,230,216,0) 72%), radial-gradient(38% 34% at 78% 22%, rgba(59,37,25,0.92) 0%, rgba(59,37,25,0) 72%), radial-gradient(26% 24% at 70% 70%, rgba(168,118,82,0.75) 0%, rgba(168,118,82,0) 70%), conic-gradient(from 130deg at 45% 55%, #2a1a12 0deg, #8a5a3c 130deg, #e6cdb2 240deg, #2a1a12 360deg)",
        };
  const MediaEl = ({ src, poster }: { src: string; poster?: string }) =>
    isVideo(src) ? (
      <div className="rcp-video-mockup" style={brandBgStyle}>
        <div className="rcp-phone">
          <div className="rcp-phone-notch" />
          <video src={src} poster={poster} autoPlay muted loop playsInline preload="metadata" />
        </div>
      </div>
    ) : (
      <img src={src} alt="" loading="lazy" />
    );

  const renderPara = (p: string | { html: string }, key: number) =>
    typeof p === "string" ? (
      <p key={key}>{p}</p>
    ) : (
      <p key={key} dangerouslySetInnerHTML={{ __html: p.html }} />
    );

  // Distribute media across sections for mobile view (varied 1/2 per section)
  const sectionCount = data.sections.length || 1;
  const mediaBuckets: CaseStudyMedia[][] = Array.from({ length: sectionCount }, () => []);
  data.media.forEach((m, i) => {
    mediaBuckets[i % sectionCount].push(m);
  });

  return (
    <>
      <style>{CSS}</style>
      <div
        className={`rcp-shell ${mounted ? "mounted" : ""} phase-${phase}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div className="rcp-card">
          <div className="rcp-handle-bar">
            <div className="rcp-grip" />
            <button className="rcp-close" onClick={onClose} aria-label="Close">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M6 6L18 18M18 6L6 18" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div className="rcp-scroll" ref={scrollRef} onScroll={onScroll}>
            <div className="rcp-inner">
              <header className="rcp-pop-header">
                <div className="rcp-brand-row">
                  <h1 className="rcp-brand">{data.brand}</h1>
                  <div className="rcp-pill">{data.pill}</div>
                </div>
                <p className="rcp-sub">{data.sub}</p>
                <p className="rcp-disclaimer">Due to client confidentiality, the brand name is withheld. The strategy and outcomes below reflect real work executed by Plotwise.</p>
              </header>

              <div className="rcp-grid">
                <div className="rcp-left">
                  <div className="rcp-metric-stack">
                    {data.metrics.map((m, i) => (
                      <div className="rcp-metric-block" key={i} style={{ animationDelay: `${i * 80}ms` }}>
                        <div className="rcp-mb-value">{m.value}</div>
                        <div className="rcp-mb-label">{m.label}</div>
                      </div>
                    ))}
                  </div>

                  <dl className="rcp-meta-list">
                    {data.meta.map((m, i) => (
                      <div key={i}>
                        <dt>{m.term}</dt>
                        <dd>{m.def}</dd>
                      </div>
                    ))}
                  </dl>

                  {data.sections.map((s, si) => (
                    <section key={si} className="rcp-section">
                      <h2 className="rcp-dh">{s.heading}</h2>
                      {s.paragraphs?.map((p, i) => renderPara(p, i))}
                      {mediaBuckets[si] && mediaBuckets[si].length > 0 && (
                        <div className="rcp-mobile-media">
                          {(() => {
                            const items = mediaBuckets[si];
                            const blocks: ReactNode[] = [];
                            let i = 0;
                            let n = 0;
                            while (i < items.length) {
                              const m = items[i];
                              if (isVideo(m.src)) {
                                blocks.push(
                                  <figure className="rcp-media is-video" key={n++}>
                                    <MediaEl src={m.src} poster={m.poster} />
                                  </figure>
                                );
                                i += 1;
                              } else if (i + 1 < items.length && !isVideo(items[i + 1].src)) {
                                blocks.push(
                                  <div className="rcp-mobile-pair" key={n++}>
                                    <figure className="rcp-media is-image"><MediaEl src={items[i].src} /></figure>
                                    <figure className="rcp-media is-image"><MediaEl src={items[i + 1].src} /></figure>
                                  </div>
                                );
                                i += 2;
                              } else {
                                blocks.push(
                                  <figure className="rcp-media is-image" key={n++}>
                                    <MediaEl src={m.src} />
                                  </figure>
                                );
                                i += 1;
                              }
                            }
                            return blocks;
                          })()}
                        </div>
                      )}
                      {s.stats && (
                        <div className="rcp-stats-grid">
                          {s.stats.map((st, i) => (
                            <div className="rcp-stat-box" key={i}>
                              <div className="rcp-stat-value">{st.value}</div>
                              <div className="rcp-stat-label">{st.label}</div>
                            </div>
                          ))}
                        </div>
                      )}
                      {s.pullQuote && (
                        <p className="rcp-pull-quote" dangerouslySetInnerHTML={{ __html: s.pullQuote }} />
                      )}
                      {s.phases?.map((ph, pi) => (
                        <div className="rcp-phase" key={pi}>
                          <div className="rcp-phase-tag">{ph.tag}</div>
                          <h3 className="rcp-ph">{ph.heading}</h3>
                          {ph.paragraphs.map((p, i) => renderPara(p, i))}
                          {ph.funnels?.map((f, fi) => (
                            <div className="rcp-funnel-block" key={fi}>
                              <div className="rcp-funnel-label">{f.label}</div>
                              <ul>
                                {f.items.map((it, ii) => (
                                  <li key={ii}>
                                    {it.ang && <span className="rcp-ang">{it.ang}</span>}
                                    {it.text}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                          {ph.hooks && (
                            <ul className="rcp-hook-list">
                              {ph.hooks.map((h, hi) => (
                                <li key={hi}>
                                  {h.label && <strong>{h.label}</strong>} {h.text}
                                </li>
                              ))}
                            </ul>
                          )}
                          {ph.results && (
                            <div className="rcp-result-box">
                              {ph.results.map((r, ri) => (
                                <div className="rcp-result-row" key={ri}>
                                  <span className={`rcp-result-tag ${r.kind}`}>{r.kind === "winner" ? "Winner" : "Loser"}</span>
                                  <span dangerouslySetInnerHTML={{ __html: r.html }} />
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </section>
                  ))}
                </div>

                <aside className="rcp-right">
                  <div className="rcp-right-stack">
                    {(() => {
                      const rows: { kind: "video" | "pair" | "solo"; items: CaseStudyMedia[] }[] = [];
                      let pending: CaseStudyMedia | null = null;
                      const tail = data.forceSoloTail ?? 0;
                      const soloFromIdx = data.media.length - tail;
                      data.media.forEach((m, idx) => {
                        if (isVideo(m.src)) {
                          if (pending) {
                            rows.push({ kind: "solo", items: [pending] });
                            pending = null;
                          }
                          rows.push({ kind: "video", items: [m] });
                        } else if (idx >= soloFromIdx) {
                          if (pending) {
                            rows.push({ kind: "solo", items: [pending] });
                            pending = null;
                          }
                          rows.push({ kind: "solo", items: [m] });
                        } else {
                          if (pending) {
                            rows.push({ kind: "pair", items: [pending, m] });
                            pending = null;
                          } else {
                            pending = m;
                          }
                        }
                      });
                      if (pending) rows.push({ kind: "solo", items: [pending] });
                      return rows.map((row, ri) => {
                        if (row.kind === "video") {
                          return (
                            <figure className="rcp-media is-video rcp-row-full" key={ri}>
                              <MediaEl src={row.items[0].src} poster={row.items[0].poster} />
                            </figure>
                          );
                        }
                        if (row.kind === "solo") {
                          return (
                            <figure className="rcp-media is-image rcp-row-full" key={ri}>
                              <MediaEl src={row.items[0].src} />
                            </figure>
                          );
                        }
                        return (
                          <div className="rcp-row-pair" key={ri}>
                            {row.items.map((m, i) => (
                              <figure className="rcp-media is-image" key={i}>
                                <MediaEl src={m.src} />
                              </figure>
                            ))}
                          </div>
                        );
                      });
                    })()}
                  </div>
                </aside>

              </div>
            </div>

            <section className="rcp-next">
              <div className="rcp-next-inner">
                <div className="rcp-next-eyebrow">Next case study</div>
                <h2 className="rcp-next-heading">{data.next.name}</h2>
                <a
                  className="rcp-next-card"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onNext) onNext();
                  }}
                >
                  <img src={data.next.image} alt={data.next.name} loading="lazy" />
                  <div className="rcp-next-card-grad" />
                  <div className="rcp-next-card-top">
                    <span className="rcp-next-card-pill">PlotWise UGC</span>
                    <span className="rcp-next-card-idx">{data.next.idx}</span>
                  </div>
                  <div className="rcp-next-card-bottom">
                    <div className="rcp-next-card-name">{data.next.name}</div>
                    <div className="rcp-next-card-sub">{data.next.sub}</div>
                  </div>
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

const CSS = `
.rcp-shell {
  --rcp-ink: #0e1414;
  --rcp-ink-2: #3a4a4a;
  --rcp-ink-3: #6b7878;
  --rcp-ink-4: #c5cdcd;
  --rcp-rule: #e6ebea;
  --rcp-bg-2: #f5f7f6;
  --rcp-green: #009689;
  --rcp-green-deep: #04766c;
  --rcp-green-soft: #e1f4f1;
  position: fixed; inset: 0; z-index: 100;
  background: rgba(8,12,12,0);
  transition: background .35s ease;
  display: flex; align-items: flex-end; justify-content: center;
  font-family: 'Inter', system-ui, sans-serif;
  color: var(--rcp-ink);
}
.rcp-shell.mounted { background: rgba(8,12,12,0.45); }
.rcp-card {
  width: min(1320px, calc(100% - 48px));
  height: 60vh;
  background: white;
  border-radius: 24px 24px 0 0;
  box-shadow: 0 -30px 80px rgba(8,12,12,0.18);
  transform: translateY(100%);
  transition: height .55s cubic-bezier(.2,.7,.3,1), transform .55s cubic-bezier(.2,.7,.3,1), border-radius .35s, width .55s cubic-bezier(.2,.7,.3,1);
  overflow: hidden;
  display: flex; flex-direction: column;
  border: 1px solid var(--rcp-rule); border-bottom: none;
}
.rcp-shell.mounted .rcp-card { transform: translateY(0); }
.rcp-shell.phase-full .rcp-card { height: 100vh; width: 100%; border-radius: 0; border: none; }
.rcp-handle-bar {
  flex-shrink: 0; position: relative;
  padding: 14px 24px 8px;
  display: flex; justify-content: center; align-items: center;
  background: white; border-bottom: 1px solid var(--rcp-rule);
}
.rcp-grip { width: 44px; height: 4px; border-radius: 2px; background: var(--rcp-ink-4); }
.rcp-close {
  position: absolute; right: 18px; top: 10px;
  width: 36px; height: 36px; border-radius: 50%;
  background: var(--rcp-bg-2); color: var(--rcp-ink);
  display: grid; place-items: center; border: none; cursor: pointer;
  transition: background .2s, color .2s;
}
.rcp-close:hover { background: var(--rcp-green); color: white; }
.rcp-scroll { flex: 1; overflow-y: auto; scroll-behavior: smooth; scrollbar-width: none; -ms-overflow-style: none; }
.rcp-scroll::-webkit-scrollbar { display: none; width: 0; height: 0; }
.rcp-inner { max-width: 1320px; margin: 0 auto; padding: 40px 48px 80px; }
.rcp-pop-header { margin-bottom: 40px; }
.rcp-brand-row { display: flex; align-items: center; gap: 18px; flex-wrap: wrap; margin-bottom: 10px; }
.rcp-brand {
  font-family: 'Fraunces', 'Times New Roman', serif;
  font-size: clamp(29px, 3.78vw, 55px); line-height: 1.05; letter-spacing: -0.025em;
  font-weight: 400; margin: 0; color: var(--rcp-ink);
}
.rcp-pill { background: var(--rcp-green); color: white; padding: 8px 18px; border-radius: 999px; font-size: 13px; font-weight: 500; }
.rcp-sub { font-size: 16px; color: var(--rcp-ink-3); margin: 0; }
.rcp-disclaimer { font-size: 12px; line-height: 1.5; color: var(--rcp-ink-3); opacity: 0.75; margin: 10px 0 0; font-style: italic; max-width: 620px; }
.rcp-grid { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 0.85fr); gap: 48px; align-items: start; }
.rcp-left { position: sticky; bottom: 0; align-self: start; }
.rcp-right { align-self: start; }
.rcp-right-stack { display: flex; flex-direction: column; gap: 16px; }
.rcp-row-pair { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.rcp-row-full { width: 100%; }
.rcp-metric-stack { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 32px; }
.rcp-metric-stack .rcp-metric-block:first-child { grid-column: 1 / -1; }
.rcp-metric-block {
  border: 1px solid var(--rcp-rule); background: var(--rcp-green-soft);
  border-radius: 10px; padding: 20px 22px;
  opacity: 0; animation: rcpMetricIn .55s cubic-bezier(.2,.7,.3,1) forwards;
}
@keyframes rcpMetricIn { from { opacity:0; transform: translateY(8px);} to {opacity:1; transform:none;} }
.rcp-mb-value { font-family: 'Fraunces', serif; font-size: 30px; font-weight: 500; letter-spacing: -0.015em; line-height: 1; margin-bottom: 6px; color: var(--rcp-green-deep); }
.rcp-mb-label { font-size: 12px; color: var(--rcp-ink-2); line-height: 1.4; }
.rcp-meta-list { margin: 0 0 48px; padding: 22px 0; border-top: 1px solid var(--rcp-rule); border-bottom: 1px solid var(--rcp-rule); display: grid; gap: 12px; }
.rcp-meta-list > div { display: grid; grid-template-columns: 160px 1fr; gap: 16px; align-items: baseline; }
.rcp-meta-list dt { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--rcp-ink-3); margin: 0; }
.rcp-meta-list dd { margin: 0; font-size: 14.5px; color: var(--rcp-ink-2); }
.rcp-section { margin-bottom: 56px; }
.rcp-dh { font-family: 'Fraunces', serif; font-weight: 400; font-size: 34px; letter-spacing: -0.02em; margin: 0 0 22px; padding-bottom: 14px; border-bottom: 1px solid var(--rcp-rule); color: var(--rcp-ink); }
.rcp-section p { font-size: 15.5px; line-height: 1.65; color: var(--rcp-ink-2); margin: 0 0 16px; }
.rcp-section p strong { color: var(--rcp-ink); font-weight: 600; }
.rcp-pull-quote { font-family: 'Fraunces', serif !important; font-style: italic; font-size: 22px !important; line-height: 1.4 !important; color: var(--rcp-ink) !important; border-left: 2px solid var(--rcp-green); padding: 4px 0 4px 22px !important; margin: 28px 0 !important; }
.rcp-phase { margin-bottom: 40px; padding-top: 24px; border-top: 1px dashed var(--rcp-rule); }
.rcp-phase:first-of-type { border-top: none; padding-top: 0; }
.rcp-phase-tag { font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--rcp-green); margin-bottom: 12px; }
.rcp-ph { font-family: 'Fraunces', serif; font-weight: 400; font-size: 26px; letter-spacing: -0.015em; margin: 0 0 14px; color: var(--rcp-ink); }
.rcp-funnel-block { margin: 18px 0; padding: 16px 20px; background: var(--rcp-bg-2); border-radius: 8px; border-left: 2px solid var(--rcp-green); }
.rcp-funnel-label { font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--rcp-ink); margin-bottom: 10px; }
.rcp-funnel-block ul, .rcp-hook-list { margin: 0; padding: 0; list-style: none; display: grid; gap: 8px; }
.rcp-funnel-block li, .rcp-hook-list li { font-size: 14.5px; color: var(--rcp-ink-2); line-height: 1.5; padding-left: 16px; position: relative; }
.rcp-funnel-block li::before, .rcp-hook-list li::before { content: ''; position: absolute; left: 0; top: 0.7em; width: 8px; height: 1px; background: var(--rcp-ink-4); }
.rcp-funnel-block li:has(.rcp-ang)::before { display: none; }
.rcp-funnel-block li:has(.rcp-ang) { padding-left: 0; }
.rcp-ang { font-family: 'JetBrains Mono', monospace; font-size: 11px; background: white; border: 1px solid var(--rcp-rule); padding: 2px 7px; border-radius: 3px; margin-right: 8px; color: var(--rcp-ink); }
.rcp-result-box { margin-top: 22px; border: 1px solid var(--rcp-rule); border-radius: 10px; overflow: hidden; }
.rcp-result-row { display: flex; align-items: center; gap: 14px; padding: 14px 20px; font-size: 15px; color: var(--rcp-ink-2); border-bottom: 1px solid var(--rcp-rule); }
.rcp-result-row:last-child { border-bottom: none; }
.rcp-result-row strong { color: var(--rcp-ink); font-weight: 600; }
.rcp-result-tag { font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; padding: 4px 9px; border-radius: 3px; flex-shrink: 0; }
.rcp-result-tag.winner { background: var(--rcp-green-soft); color: var(--rcp-green-deep); }
.rcp-result-tag.loser { background: #fbe6e2; color: #b35142; }
.rcp-stats-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin: 8px 0 16px; }
.rcp-stats-grid > :first-child { grid-column: 1 / -1; }
.rcp-stat-box { border: 1px solid var(--rcp-rule); background: var(--rcp-green-soft); border-radius: 10px; padding: 20px 22px; }
.rcp-stat-box .rcp-stat-value { font-family: 'Fraunces', serif; font-size: 30px; font-weight: 500; letter-spacing: -0.015em; line-height: 1; margin-bottom: 6px; color: var(--rcp-green-deep); }
.rcp-stat-box .rcp-stat-label { font-size: 12px; color: var(--rcp-ink-2); line-height: 1.4; }
.rcp-media { margin: 0; border-radius: 12px; overflow: hidden; background: var(--rcp-bg-2); }
.rcp-media img {
  width: 100%;
  height: auto;
  display: block;
  background: var(--rcp-bg-2);
}
.rcp-row-pair .rcp-media { aspect-ratio: 4 / 5; }
.rcp-row-pair .rcp-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
.rcp-media video {
  width: 100%;
  height: auto;
  display: block;
  background: transparent;
}
.rcp-media.is-video { background: transparent; border-radius: 16px; overflow: hidden; }
.rcp-video-mockup {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 5;
  background-size: cover;
  background-position: center;
  display: grid;
  place-items: center;
  border-radius: 16px;
  overflow: hidden;
}
.rcp-phone {
  position: relative;
  width: 60%;
  max-width: 280px;
  aspect-ratio: 9 / 19.5;
  background: #0e1414;
  border-radius: 28px;
  padding: 8px;
  box-shadow:
    0 1px 0 rgba(255,255,255,0.18) inset,
    0 0 0 1.5px rgba(14,20,20,0.9),
    0 24px 48px rgba(8,12,12,0.28),
    0 8px 16px rgba(8,12,12,0.18);
  overflow: hidden;
}
.rcp-phone-notch {
  position: absolute;
  top: 10px; left: 50%; transform: translateX(-50%);
  width: 38%; height: 18px;
  background: #0e1414;
  border-radius: 0 0 14px 14px;
  z-index: 2;
}
.rcp-phone video {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  border-radius: 20px;
  background: #0e1414;
}
.rcp-media-pair { display: none; }
@media (max-width: 1100px) {
  .rcp-meta-list > div { grid-template-columns: 140px 1fr; }
  .rcp-grid { grid-template-columns: minmax(0, 1fr); }
  .rcp-right { position: static; }
  .rcp-phone { width: 51%; max-width: 238px; }
  .rcp-left { position: static; }
}
@media (max-width: 720px) {
  .rcp-card { width: 100%; }
  .rcp-inner { padding: 28px 24px 60px; }
  .rcp-meta-list > div { grid-template-columns: 1fr; gap: 4px; }
  .rcp-metric-stack { grid-template-columns: 1fr; }
  .rcp-metric-stack .rcp-metric-block:first-child { grid-column: auto; }
  .rcp-mb-value, .rcp-stat-box .rcp-stat-value { font-size: 22px; white-space: nowrap; }
}
.rcp-mobile-media { display: none; }
@media (max-width: 1100px) {
  .rcp-right { display: none; }
  .rcp-mobile-media { display: flex; flex-direction: column; gap: 14px; margin: 22px 0 8px; }
  .rcp-mobile-pair { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .rcp-mobile-media .rcp-media.is-image { aspect-ratio: 4 / 5; }
  .rcp-mobile-media .rcp-media.is-image img { width: 100%; height: 100%; object-fit: cover; }
}
.rcp-next { margin-top: 80px; padding: 64px 48px 96px; background: var(--rcp-bg-2); border-top: 1px solid var(--rcp-rule); }
.rcp-next-inner { max-width: 1320px; margin: 0 auto; }
.rcp-next-eyebrow { font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--rcp-green); margin-bottom: 14px; }
.rcp-next-heading { font-family: 'Fraunces', serif; font-weight: 400; font-size: clamp(36px, 4.5vw, 60px); letter-spacing: -0.02em; margin: 0 0 32px; color: var(--rcp-ink); }
.rcp-next-card { position: relative; display: block; width: 100%; min-height: 420px; border-radius: 24px; overflow: hidden; background: #111; }
.rcp-next-card img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; transition: transform 1.2s ease; }
.rcp-next-card:hover img { transform: scale(1.04); }
.rcp-next-card-grad { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.15) 60%, rgba(0,0,0,0.05)); }
.rcp-next-card-top { position: absolute; top: 18px; left: 18px; right: 18px; display: flex; justify-content: space-between; color: white; }
.rcp-next-card-pill { background: rgba(255,255,255,0.16); backdrop-filter: blur(10px); padding: 6px 12px; border-radius: 999px; font-size: 10px; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; border: 1px solid rgba(255,255,255,0.25); }
.rcp-next-card-idx { font-size: 11px; opacity: 0.7; font-variant-numeric: tabular-nums; }
.rcp-next-card-bottom { position: absolute; bottom: 0; left: 0; right: 0; padding: 32px 36px; color: white; }
.rcp-next-card-name { font-family: 'Fraunces', serif; font-size: clamp(32px, 4vw, 52px); font-weight: 500; letter-spacing: -0.02em; line-height: 1.05; }
.rcp-next-card-sub { margin-top: 10px; font-size: 14px; color: rgba(255,255,255,0.7); }
@media (max-width: 720px) {
  .rcp-next { padding: 48px 24px 72px; }
  .rcp-next-card { min-height: 320px; }
  .rcp-next-card-bottom { padding: 22px 24px; }
}
`;
