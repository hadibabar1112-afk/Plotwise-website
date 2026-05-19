import { useEffect, useRef } from "react";
import rm1 from "@/assets/reframe-model-1.jpg";
import rm2 from "@/assets/reframe-model-2.jpg";
import rm3 from "@/assets/reframe-model-3.jpg";
import rm4 from "@/assets/reframe-model-4.jpg";
import rm5 from "@/assets/reframe-model-5.jpg";
import rm6 from "@/assets/reframe-model-6.jpg";
import rm7 from "@/assets/reframe-model-7.jpg";
import rm8 from "@/assets/reframe-model-8.jpg";
import rm9 from "@/assets/reframe-model-9.jpg";

const reframeCss = `
.reframe-root *,.reframe-root *::before,.reframe-root *::after{box-sizing:border-box}
.reframe-root{
  position:relative;
  background:linear-gradient(151deg,#145F5A 0%,#376F68 60%,#0E4C49 100%);
  overflow:visible;
}
.reframe-root .cards-area{position:relative;width:480px;height:540px;margin-left:auto}
.reframe-root .card{position:absolute;border-radius:8px;background:#fff;overflow:hidden;
  transition:left 0.85s cubic-bezier(0.77,0,0.175,1),top 0.85s cubic-bezier(0.77,0,0.175,1),opacity 0.5s ease}
.reframe-root .card-teal{width:96px;height:114px;border:2px solid rgba(0,187,167,0.85);box-shadow:0 6px 22px rgba(0,0,0,0.25)}
.reframe-root .card-grey{width:90px;height:108px;border:1.5px solid #E8EAED;box-shadow:0 4px 14px rgba(0,0,0,0.14);
  transition:left 0.85s cubic-bezier(0.77,0,0.175,1),top 0.85s cubic-bezier(0.77,0,0.175,1),opacity 0.5s ease,border-color 0.5s ease 0.7s}
.reframe-root .grid-active .card-grey{border-color:rgba(0,187,167,0.85)}

/* SCATTER positions (scaled to ~480x520) */
.reframe-root .s-grey1{left:188px;top:0px}
.reframe-root .s-grey2{left:36px;top:36px}
.reframe-root .s-teal1{left:344px;top:50px}
.reframe-root .s-teal2{left:276px;top:166px}
.reframe-root .s-grey3{left:0px;top:200px}
.reframe-root .s-grey4{left:376px;top:238px}
.reframe-root .s-grey5{left:388px;top:338px}
.reframe-root .s-teal3{left:88px;top:348px}
.reframe-root .s-teal4{left:246px;top:392px}

/* GRID positions: 3 cols x 3 rows, 150px steps */
.reframe-root .grid .c-grey2{left:0px;top:0px}
.reframe-root .grid .c-grey1{left:150px;top:0px}
.reframe-root .grid .c-teal1{left:300px;top:0px}
.reframe-root .grid .c-teal3{left:0px;top:160px}
.reframe-root .grid .c-teal2{left:150px;top:160px}
.reframe-root .grid .c-grey3{left:300px;top:160px}
.reframe-root .grid .c-teal4{left:0px;top:320px}
.reframe-root .grid .c-grey4{left:150px;top:320px}
.reframe-root .grid .c-grey5{left:300px;top:320px}

.reframe-root .thumb{position:absolute;left:6px;top:6px;width:calc(100% - 12px);height:60%;border-radius:6px;overflow:hidden}
.reframe-root .thumb img{width:100%;height:100%;object-fit:cover;display:block}
.reframe-root .thumb-teal{background:#c8ede8}
.reframe-root .thumb-teal::after{content:'';position:absolute;inset:0;background:#009689;opacity:0.18;pointer-events:none}
.reframe-root .thumb-grey{background:#ECF5F3;transition:background 0.6s ease 0.6s}
.reframe-root .thumb-grey::after{content:'';position:absolute;inset:0;background:#C45040;opacity:0.55;transition:opacity 0.6s ease 0.6s,background 0.6s ease 0.6s;pointer-events:none}
.reframe-root .grid-active .card-grey .thumb-grey::after{background:#009689;opacity:0.18}

.reframe-root .play-wrap{position:absolute;left:6px;top:6px;width:calc(100% - 12px);height:60%;display:flex;align-items:center;justify-content:center;z-index:2;pointer-events:none;transition:opacity 0.35s ease}
.reframe-root .play-tri{width:0;height:0;border-style:solid;border-width:8px 0 8px 14px;border-color:transparent transparent transparent #00BBA7;filter:drop-shadow(0 0 3px rgba(0,187,167,0.5))}
.reframe-root .x-wrap{position:absolute;left:6px;top:6px;width:calc(100% - 12px);height:60%;display:flex;align-items:center;justify-content:center;z-index:2;pointer-events:none;transition:opacity 0.3s ease}
.reframe-root .x-icon{width:18px;height:18px;position:relative}
.reframe-root .x-icon::before,.reframe-root .x-icon::after{content:'';position:absolute;top:50%;left:0;width:100%;height:1.5px;background:#FFFFFF;border-radius:2px}
.reframe-root .x-icon::before{transform:translateY(-50%) rotate(45deg)}
.reframe-root .x-icon::after{transform:translateY(-50%) rotate(-45deg)}
.reframe-root .card-grey .play-wrap{opacity:0}
.reframe-root .grid-active .card-grey .x-wrap{opacity:0;transition-delay:0.5s}
.reframe-root .grid-active .card-grey .play-wrap{opacity:1;transition-delay:0.8s}

.reframe-root .bar1,.reframe-root .bar2{position:absolute;left:9px;height:5px;border-radius:3px;background:#E5E7EB}
.reframe-root .card-teal .bar1{width:44px;top:calc(60% + 10px + 12px)}
.reframe-root .card-teal .bar2{width:28px;top:calc(60% + 10px + 22px)}
.reframe-root .card-grey .bar1{width:40px;top:calc(60% + 8px + 12px)}
.reframe-root .card-grey .bar2{width:26px;top:calc(60% + 8px + 22px)}

.reframe-root .more-label{position:absolute;left:240px;top:495px;transform:translateX(-50%);text-align:center;font-family:'JetBrains Mono',Consolas,monospace;font-size:13px;letter-spacing:0.1em;line-height:1.4;color:#A9A7A1;white-space:nowrap;transition:color 0.6s ease,left 0.6s ease,opacity 0.35s ease,top 0.6s ease;margin:0}
.reframe-root.grid-area .more-label,.reframe-root .cards-area.grid ~ * .more-label{}
.reframe-root .cards-area.grid .more-label{top:460px;left:198px}
.reframe-root .label-system{color:#46ECD5 !important}

@keyframes reframeFloatUp{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
.reframe-root .floating{animation:reframeFloatUp var(--fd,4s) ease-in-out var(--fdelay,0s) infinite}
@keyframes reframeTealGlow{0%,100%{box-shadow:0 6px 22px rgba(0,187,167,0.25)}50%{box-shadow:0 8px 28px rgba(0,187,167,0.55),0 0 14px rgba(0,187,167,0.25)}}
.reframe-root .grid .card-teal{animation:reframeTealGlow 2.8s ease-in-out infinite}

@media (max-width: 1024px){
  .reframe-root .cards-area{margin:40px auto 0;transform:scale(0.85);transform-origin:top center}
}
@media (max-width: 640px){
  .reframe-root .cards-area{
    transform: none;
    width: 224px;
    height: 320px;
    position: relative;
    left: auto;
    top: auto;
    margin: 4px auto 0 !important;
  }
  .reframe-root .lg\\:col-span-5{
    position: relative;
    width: 100%;
    margin: 0;
    overflow: visible;
    height: auto;
    display: flex;
    justify-content: center;
    margin-top: 16px;
  }
  .reframe-root .card-teal{width:64px;height:76px}
  .reframe-root .card-grey{width:60px;height:72px}
  .reframe-root .card-teal .bar1{width:30px;top:calc(60% + 6px + 10px)}
  .reframe-root .card-teal .bar2{width:18px;top:calc(60% + 6px + 18px)}
  .reframe-root .card-grey .bar1{width:28px;top:calc(60% + 6px + 10px)}
  .reframe-root .card-grey .bar2{width:16px;top:calc(60% + 6px + 18px)}
  .reframe-root{overflow:hidden}
  .reframe-root .more-label{white-space:nowrap;width:auto;left:50%;transform:translateX(-50%);top:290px;font-size:11px}
  .reframe-root .cards-area.grid .more-label{top:268px}
}
`;

export function Reframe() {
  const areaRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const area = areaRef.current;
    const label = labelRef.current;
    if (!area || !label) return;
    const cards = area.querySelectorAll<HTMLElement>(".card");

    const GRID: Record<string, { left: number; top: number }> = {
      "c-grey2": { left: 0, top: 0 },
      "c-grey1": { left: 150, top: 0 },
      "c-teal1": { left: 300, top: 0 },
      "c-teal3": { left: 0, top: 160 },
      "c-teal2": { left: 150, top: 160 },
      "c-grey3": { left: 300, top: 160 },
      "c-teal4": { left: 0, top: 320 },
      "c-grey4": { left: 150, top: 320 },
      "c-grey5": { left: 300, top: 320 },
    };
    const SCATTER: Record<string, { left: number; top: number }> = {
      "c-grey1": { left: 188, top: 0 },
      "c-grey2": { left: 36, top: 36 },
      "c-teal1": { left: 344, top: 50 },
      "c-teal2": { left: 276, top: 166 },
      "c-grey3": { left: 0, top: 200 },
      "c-grey4": { left: 376, top: 238 },
      "c-grey5": { left: 388, top: 338 },
      "c-teal3": { left: 88, top: 348 },
      "c-teal4": { left: 246, top: 392 },
    };
    // Mobile-only positions: container 208x280, cards teal 64x76 / grey 60x72, gap 8
    const GRID_M: Record<string, { left: number; top: number }> = {
      "c-grey2": { left: 0, top: 0 },
      "c-grey1": { left: 80, top: 0 },
      "c-teal1": { left: 160, top: 0 },
      "c-teal3": { left: 0, top: 92 },
      "c-teal2": { left: 80, top: 92 },
      "c-grey3": { left: 160, top: 92 },
      "c-teal4": { left: 0, top: 184 },
      "c-grey4": { left: 80, top: 184 },
      "c-grey5": { left: 160, top: 184 },
    };
    const SCATTER_M: Record<string, { left: number; top: number }> = {
      "c-grey2": { left: 10, top: 18 },
      "c-grey1": { left: 82, top: 0 },
      "c-teal1": { left: 160, top: 24 },
      "c-grey3": { left: 0, top: 110 },
      "c-teal2": { left: 80, top: 96 },
      "c-grey4": { left: 164, top: 118 },
      "c-teal3": { left: 10, top: 200 },
      "c-grey5": { left: 82, top: 198 },
      "c-teal4": { left: 160, top: 204 },
    };

    const getId = (c: HTMLElement) =>
      [...c.classList].find((x) => x.startsWith("c-")) || "";

    const applyScatter = () =>
      cards.forEach((c) => {
        const isMobile = window.matchMedia("(max-width: 640px)").matches;
        const p = isMobile ? SCATTER_M[getId(c)] : SCATTER[getId(c)];
        if (p) {
          c.style.left = p.left + "px";
          c.style.top = p.top + "px";
        }
      });
    const applyGrid = () =>
      cards.forEach((c) => {
        const isMobile = window.matchMedia("(max-width: 640px)").matches;
        const p = isMobile ? GRID_M[getId(c)] : GRID[getId(c)];
        if (p) {
          c.style.left = p.left + "px";
          c.style.top = p.top + "px";
        }
      });
    const enableFloat = (on: boolean) =>
      cards.forEach((c) => c.classList.toggle("floating", on));
    const setLabel = (text: string, teal: boolean) => {
      label.style.opacity = "0";
      setTimeout(() => {
        label.textContent = text;
        label.style.opacity = "1";
        label.classList.toggle("label-system", teal);
      }, 350);
    };

    const T_SCATTER = 2400, T_TRAVEL = 900, T_GRID = 3000, T_UNTRAVEL = 900;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const push = (t: ReturnType<typeof setTimeout>) => { timers.push(t); return t; };

    const runLoop = () => {
      enableFloat(true);
      applyScatter();
      area.classList.remove("grid", "grid-active");
      setLabel("BROKEN CONTENT SYSTEM", false);

      push(setTimeout(() => {
        enableFloat(false);
        applyGrid();
        area.classList.add("grid");
        push(setTimeout(() => area.classList.add("grid-active"), T_TRAVEL + 100));
        push(setTimeout(() => setLabel("STRATEGIC CONTENT SYSTEM", true), T_TRAVEL + 200));
        push(setTimeout(() => {
          area.classList.remove("grid-active", "grid");
          applyScatter();
          setLabel("BROKEN CONTENT SYSTEM", false);
          push(setTimeout(() => {
            enableFloat(true);
            push(setTimeout(runLoop, T_SCATTER));
          }, T_UNTRAVEL));
        }, T_TRAVEL + T_GRID));
      }, T_SCATTER));
    };

    runLoop();
    return () => { timers.forEach(clearTimeout); };
  }, []);

  return (
    <section className="reframe-root py-24 lg:py-32">
      <style>{reframeCss}</style>
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7">
            <h2 className="font-display text-[32px] sm:text-[50px] lg:text-[62px] leading-[1.05] tracking-tight text-[#CBFBF1] break-words">
              UGC isn't the answer.
            </h2>
            <p className="font-display italic font-light text-[22px] sm:text-[32px] lg:text-[38px] leading-tight text-white mt-2 break-words">
              A content system is.
            </p>

            <ol className="mt-10 space-y-5 list-none p-0">
              {[
                "Brands don't need more videos. They need a system that turns attention into action.",
                "Your highest-value ads use audience psychology, not production budget.",
                "It connects emotional resonance with performance data.",
                "It creates content that works together, not in isolation.",
              ].map((t, i) => (
                <li key={i} className="flex gap-4 items-start">
                  <span className="font-mono text-[11px] leading-7 text-[#46ECD5] shrink-0">0{i + 1}</span>
                  <p className="text-[15px] lg:text-[16px] leading-relaxed text-[#F0FDFA] m-0">{t}</p>
                </li>
              ))}
            </ol>

              <blockquote className="mt-10 m-0">
              <p className="font-display italic font-light text-[20px] sm:text-[22px] lg:text-[30px] leading-snug text-white max-w-2xl m-0 break-words">
                There is a difference between random content and compounding growth.
              </p>
            </blockquote>
          </div>

          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <aside className="cards-area" ref={areaRef}>
              <div className="card card-teal s-teal1 c-teal1" style={{ ["--fd" as never]: "4.6s", ["--fdelay" as never]: "0.2s" }}>
                <div className="thumb thumb-teal"><img src={rm1} alt="" loading="lazy" /></div>
                <div className="play-wrap"><div className="play-tri"></div></div>
                <div className="bar1"></div><div className="bar2"></div>
              </div>
              <div className="card card-teal s-teal2 c-teal2" style={{ ["--fd" as never]: "4.2s", ["--fdelay" as never]: "0.8s" }}>
                <div className="thumb thumb-teal"><img src={rm2} alt="" loading="lazy" /></div>
                <div className="play-wrap"><div className="play-tri"></div></div>
                <div className="bar1"></div><div className="bar2"></div>
              </div>
              <div className="card card-teal s-teal3 c-teal3" style={{ ["--fd" as never]: "4.7s", ["--fdelay" as never]: "0.3s" }}>
                <div className="thumb thumb-teal"><img src={rm3} alt="" loading="lazy" /></div>
                <div className="play-wrap"><div className="play-tri"></div></div>
                <div className="bar1"></div><div className="bar2"></div>
              </div>
              <div className="card card-teal s-teal4 c-teal4" style={{ ["--fd" as never]: "4.0s", ["--fdelay" as never]: "0.9s" }}>
                <div className="thumb thumb-teal"><img src={rm4} alt="" loading="lazy" /></div>
                <div className="play-wrap"><div className="play-tri"></div></div>
                <div className="bar1"></div><div className="bar2"></div>
              </div>
              <div className="card card-grey s-grey1 c-grey1" style={{ ["--fd" as never]: "4.1s", ["--fdelay" as never]: "0.0s" }}>
                <div className="thumb thumb-grey"><img src={rm5} alt="" loading="lazy" /></div>
                <div className="x-wrap"><div className="x-icon"></div></div>
                <div className="play-wrap"><div className="play-tri"></div></div>
                <div className="bar1"></div><div className="bar2"></div>
              </div>
              <div className="card card-grey s-grey2 c-grey2" style={{ ["--fd" as never]: "4.4s", ["--fdelay" as never]: "0.5s" }}>
                <div className="thumb thumb-grey"><img src={rm6} alt="" loading="lazy" /></div>
                <div className="x-wrap"><div className="x-icon"></div></div>
                <div className="play-wrap"><div className="play-tri"></div></div>
                <div className="bar1"></div><div className="bar2"></div>
              </div>
              <div className="card card-grey s-grey3 c-grey3" style={{ ["--fd" as never]: "4.8s", ["--fdelay" as never]: "1.1s" }}>
                <div className="thumb thumb-grey"><img src={rm7} alt="" loading="lazy" /></div>
                <div className="x-wrap"><div className="x-icon"></div></div>
                <div className="play-wrap"><div className="play-tri"></div></div>
                <div className="bar1"></div><div className="bar2"></div>
              </div>
              <div className="card card-grey s-grey4 c-grey4" style={{ ["--fd" as never]: "3.9s", ["--fdelay" as never]: "0.6s" }}>
                <div className="thumb thumb-grey"><img src={rm8} alt="" loading="lazy" /></div>
                <div className="x-wrap"><div className="x-icon"></div></div>
                <div className="play-wrap"><div className="play-tri"></div></div>
                <div className="bar1"></div><div className="bar2"></div>
              </div>
              <div className="card card-grey s-grey5 c-grey5" style={{ ["--fd" as never]: "4.3s", ["--fdelay" as never]: "1.4s" }}>
                <div className="thumb thumb-grey"><img src={rm9} alt="" loading="lazy" /></div>
                <div className="x-wrap"><div className="x-icon"></div></div>
                <div className="play-wrap"><div className="play-tri"></div></div>
                <div className="bar1"></div><div className="bar2"></div>
              </div>
              <p className="more-label" ref={labelRef}>BROKEN CONTENT SYSTEM</p>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
