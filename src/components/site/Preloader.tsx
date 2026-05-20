import { useEffect, useRef, useState } from "react";

const BUBBLE =
  "M134.013 337.724C134.013 302.703 134.013 269.454 134.013 235.299C138.261 235.052 141.545 234.696 144.822 234.696C172.468 234.65 200.114 234.735 227.76 234.657C254.835 234.58 275.311 216.714 276.144 189.567C277.377 149.009 276.714 108.388 276.76 67.7915C276.768 59.222 276.814 50.6138 276.036 42.0985C273.916 18.8958 254.819 0.418733 231.622 0.279517C169.199 -0.0839914 106.784 -0.107194 44.3686 0.310454C21.1942 0.465138 0.69489 21.0536 0.409643 44.5889C-0.168561 92.9046 -0.0529205 141.228 0.270874 189.544C0.363386 202.947 6.53861 214.37 16.0443 223.713C52.8797 259.91 89.7923 296.021 126.72 332.124C128.447 333.81 130.56 335.094 134.013 337.724Z";

const W_LOGO =
  "M223.819 78.8504C221.445 93.878 216.773 107.962 209.564 121.017C202.086 134.575 192.496 146.007 180.855 155.303C167.009 166.355 151.605 173.448 134.706 176.526C132.301 176.967 131.954 176.688 131.946 173.981C131.931 167.067 131.954 160.153 131.892 153.238C131.885 152.527 131.615 151.498 131.16 151.219C130.744 150.972 129.811 151.366 129.287 151.769C125.486 154.638 121.855 157.786 117.954 160.477C105.858 168.83 92.6977 174.159 78.6127 176.781C76.5543 177.16 76.03 176.65 76.03 174.322C76.0223 162.697 76.03 151.073 76.03 139.448C76.03 136.695 76.1148 136.524 78.6127 135.875C86.0908 133.918 93.1372 130.77 99.5591 126.145C102.99 123.678 106.189 120.816 109.435 118.04C109.89 117.653 110.198 116.671 110.113 116.044C110.059 115.696 109.057 115.464 108.456 115.279C108.093 115.17 107.685 115.248 107.292 115.248C97.732 115.325 88.1723 115.395 78.605 115.472C77.703 115.48 77.1016 115.402 76.693 115.124C76.8087 114.884 76.8704 114.606 76.8704 114.273V75.2926C76.9937 75.1689 77.1248 75.0529 77.2713 74.9523C78.1655 75.0838 78.7746 75.254 79.3836 75.254C89.6217 75.3081 99.8521 75.3468 110.09 75.3932C112.179 75.4009 112.457 75.7412 112.449 78.1079C112.434 83.6765 112.418 89.2452 112.411 94.8061C112.403 100.189 112.388 105.572 112.449 110.955C112.457 111.574 112.842 112.525 113.266 112.703C113.706 112.881 114.407 112.324 114.97 112.03C115.155 111.93 115.263 111.667 115.41 111.489C123.289 101.682 128.639 90.413 131.407 77.6902C131.761 76.0661 132.37 75.37 133.997 75.3854C144.736 75.4783 155.468 75.4473 166.207 75.4551C168.072 75.4551 168.496 75.9887 168.219 77.9455C166.091 92.9808 161.396 106.987 154.319 120.051C153.355 121.837 152.23 123.523 151.328 125.341C150.988 126.029 151.05 126.965 150.927 127.785C151.682 127.754 152.43 127.754 153.17 127.653C153.425 127.622 153.656 127.367 153.887 127.205C171.017 115.658 182.096 99.1914 187.076 77.7908C187.485 76.0274 188.125 75.4086 189.774 75.4164C200.228 75.4783 210.698 75.4473 221.159 75.4473C223.966 75.4473 224.282 75.8727 223.819 78.8504Z";

const VH = 338;
const VW = 277;
const FILL_DURATION = 3500; // 3.5 s fill animation = 3.5 s minimum display

// Hero poster images to preload while the loader is visible
const HERO_POSTERS = [
  "/videos/reel-1.jpg",
  "/videos/reel-2.jpg",
  "/videos/reel-3.jpg",
  "/videos/reel-4.jpg",
];

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

function buildWavePath(fillY: number, offset: number): string {
  const amp = 4.5;
  const per = 68;
  const extra = per * 4;
  const sx = -extra + (offset % per);
  let d = `M${sx},${fillY}`;
  for (let x = sx; x < VW + extra; x += per) {
    d += ` Q${x + per / 4},${fillY - amp} ${x + per / 2},${fillY}`;
    d += ` Q${x + (3 * per) / 4},${fillY + amp} ${x + per},${fillY}`;
  }
  d += ` L${VW + extra},${VH + 10} L${sx},${VH + 10} Z`;
  return d;
}

export function Preloader() {
  const [fillY, setFillY] = useState(VH);
  const [waveOff, setWaveOff] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [gone, setGone] = useState(false);

  const startTs = useRef<number | null>(null);
  const raf = useRef<number | null>(null);

  // Kick off hero asset preloading immediately so resources are warm by the time
  // the loader dismisses and the hero section becomes visible.
  useEffect(() => {
    HERO_POSTERS.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
    // Hint reel videos so the browser starts fetching them during the 3.5 s window.
    // Mobile gets the lightweight 360p versions (~350-670 KB each).
    // Desktop gets the full 720p first video as a preload hint.
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    if (isMobile) {
      // All 4 mobile videos total ~1.76 MB — should fully buffer before loader ends
      [1, 2, 3, 4].forEach((n) => {
        const link = document.createElement("link");
        link.rel = "preload";
        link.as = "video";
        link.href = `/videos/reel-${n}-mobile.mp4`;
        document.head.appendChild(link);
      });
    } else {
      // Desktop: just hint the first video; the rest load progressively
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "video";
      link.href = "/videos/reel-1.mp4";
      document.head.appendChild(link);
    }
  }, []);

  useEffect(() => {
    function tick(ts: number) {
      if (!startTs.current) startTs.current = ts;
      const t = Math.min((ts - startTs.current) / FILL_DURATION, 1);
      const eased = easeInOut(t);
      setFillY(VH * (1 - eased));
      setWaveOff(ts * 0.042);
      if (t < 1) {
        raf.current = requestAnimationFrame(tick);
      } else {
        // Animation complete at exactly 3.5 s — start exit fade
        setExiting(true);
        setTimeout(() => setGone(true), 750);
      }
    }
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  if (gone) return null;

  const wp = buildWavePath(fillY, waveOff);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#F7FAF9",
        opacity: exiting ? 0 : 1,
        transition: "opacity 0.75s ease",
        pointerEvents: exiting ? "none" : "all",
      }}
    >
      <svg
        viewBox="-4 -4 285 346"
        width="116"
        height="141"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Clips water fill inside bubble shape */}
          <clipPath id="pw-clip-bubble">
            <path d={BUBBLE} />
          </clipPath>

          {/* Clips to region above the water line */}
          <clipPath id="pw-clip-above">
            <rect x="-10" y="-10" width="300" height={Math.max(0, fillY) + 10} />
          </clipPath>

          {/* Mask = bubble ∩ below-water: reveals white W only where water covers it */}
          <mask id="pw-mask-wet">
            <rect x="-10" y="-10" width="300" height="360" fill="black" />
            <path d={BUBBLE} fill="white" />
            <rect x="-10" y="-10" width="300" height={Math.max(0, fillY) + 10} fill="black" />
          </mask>
        </defs>

        {/* Rising water — clipped to bubble interior */}
        <g clipPath="url(#pw-clip-bubble)">
          <path d={wp} fill="#73BCB7" />
        </g>

        {/* W logo — dark teal, only above water line */}
        <path d={W_LOGO} fill="#1A6059" clipPath="url(#pw-clip-above)" />

        {/* W logo — white, only below water line and inside bubble */}
        <path d={W_LOGO} fill="#FEF7FA" mask="url(#pw-mask-wet)" />
      </svg>
    </div>
  );
}
