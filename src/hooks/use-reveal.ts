import { useEffect, useRef } from "react";

export function useReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: isMobile ? 0.05 : threshold, rootMargin: isMobile ? "0px" : "0px 0px -10% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return ref;
}