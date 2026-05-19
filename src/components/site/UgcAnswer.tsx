import { useEffect, useRef, useState } from "react";

const SECTION_BG =
  "linear-gradient(135deg, oklch(0.44 0.07 188) 0%, oklch(0.50 0.06 185) 60%, oklch(0.38 0.06 190) 100%)";

export function UgcAnswer() {
  const ref = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState<number>(760);

  useEffect(() => {
    function onMsg(e: MessageEvent) {
      const d = e.data;
      if (d && d.type === "ugc-answer-height" && typeof d.height === "number") {
        setHeight(Math.ceil(d.height));
      }
    }
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, []);

  useEffect(() => {
    const iframe = ref.current;
    if (!iframe) return;

    function injectStyles() {
      try {
        const doc = iframe!.contentDocument;
        if (!doc) return;

        // Flat background + mobile hide right card
        if (!doc.getElementById("ugc-style-overrides")) {
          const style = doc.createElement("style");
          style.id = "ugc-style-overrides";
          style.textContent = `
            html, body { background: transparent !important; background-image: none !important; }
            .ugc-cta-wrap { margin-top: 24px; display: flex; justify-content: flex-start; }
            .ugc-cta {
              display: inline-flex; align-items: center; gap: 8px;
              background: #fff; color: #0a0a0a;
              padding-left: 24px; padding-right: 8px; height: 52px;
              border-radius: 999px; font-size: 14px; font-weight: 500;
              text-decoration: none;
              box-shadow: 0 12px 28px -12px rgba(0,0,0,0.35);
              transition: transform .2s ease, background .2s ease;
              font-family: 'Inter', system-ui, sans-serif;
            }
            .ugc-cta:hover { transform: translateY(-2px); }
            .ugc-cta .ugc-cta-icon {
              margin-left: 4px; height: 36px; width: 36px;
              border-radius: 999px; background: #0a0a0a; color: #fff;
              display: inline-flex; align-items: center; justify-content: center;
              transition: transform .2s ease;
            }
            .ugc-cta:hover .ugc-cta-icon { transform: translateX(2px); }
            @media (max-width: 768px) {
              body [class*="grid"], body [class*="Grid"] {
                display: block !important;
                grid-template-columns: 1fr !important;
                zoom: 1 !important;
              }
              body [class*="grid"] > *:first-child,
              body [class*="Grid"] > *:first-child {
                width: 100% !important; max-width: 100% !important; flex: 1 1 100% !important;
              }
              body .vis-col { display: none !important; }
            }
          `;
          doc.head?.appendChild(style);
        }

        // Inject CTA after the closing blockquote text
        const closing = doc.querySelector("p.closing");
        if (closing && !doc.getElementById("ugc-injected-cta")) {
          const wrap = doc.createElement("div");
          wrap.id = "ugc-injected-cta";
          wrap.className = "ugc-cta-wrap";
          wrap.innerHTML = `
            <a href="#system" target="_top" class="ugc-cta">
              See How the System Works
              <span class="ugc-cta-icon" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
              </span>
            </a>
          `;
          closing.parentNode?.insertBefore(wrap, closing.nextSibling);
        }

        // Replace the 9 card tile images
        const base =
          (typeof window !== "undefined" ? window.location.origin : "") +
          "/ugc-tiles/";
        for (let i = 1; i <= 9; i++) {
          const el = doc.getElementById("tile" + i);
          if (el) {
            (el as HTMLElement).style.backgroundImage = `url("${base}${i}.webp")`;
            (el as HTMLElement).style.backgroundSize = "cover";
            (el as HTMLElement).style.backgroundPosition = "center";
          }
        }
      } catch {}
    }

    iframe.addEventListener("load", injectStyles);
    injectStyles();
    return () => iframe.removeEventListener("load", injectStyles);
  }, []);

  return (
    <section className="ugc-answer-root w-full" style={{ background: SECTION_BG }}>
      <iframe
        ref={ref}
        src="/ugc-isnt-the-answer.html"
        title="UGC Isn't the Answer"
        className="block w-full border-0"
        style={{ height, display: "block", background: "transparent" }}
        allowTransparency
        scrolling="no"
        loading="lazy"
      />
    </section>
  );
}
