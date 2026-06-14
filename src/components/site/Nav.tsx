import { useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";
import { Menu, X, ChevronDown, ChevronRight, LayoutGrid, Zap, Globe } from "lucide-react";

const links = [
  { label: "How It Works", href: "/#system" },
  { label: "Our Work", href: "/#work" },
  { label: "Creators", href: "/#creators" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact Us", href: "/apply" },
];

const solutionItems = [
  {
    label: "Managed Campaigns",
    desc: "Done-for-you creative system",
    href: "/solutions/managed",
    icon: LayoutGrid,
    accent: "#00625C",
    accentBg: "rgba(0,98,92,0.08)",
  },
  {
    label: "Challenge Campaigns",
    desc: "Self-serve creator network",
    href: "/#solutions",
    icon: Zap,
    accent: "#9b5800",
    accentBg: "rgba(155,88,0,0.08)",
  },
  {
    label: "Enterprise Content Solutions",
    desc: "Large-scale creator deployment",
    href: "/#solutions",
    icon: Globe,
    accent: "#5b4898",
    accentBg: "rgba(91,72,152,0.08)",
  },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const solutionsRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  // Close solutions dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (solutionsRef.current && !solutionsRef.current.contains(e.target as Node)) {
        setSolutionsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/60"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-10 h-16 flex items-center justify-between">
        <a href="/" className="text-foreground hover:opacity-80 transition-opacity">
          <Logo />
        </a>

        <nav className="hidden md:flex items-center gap-9">
          {/* Solutions dropdown */}
          <div
            ref={solutionsRef}
            className="relative"
            onMouseEnter={() => {
              if (closeTimer.current) clearTimeout(closeTimer.current);
              setSolutionsOpen(true);
            }}
            onMouseLeave={() => {
              closeTimer.current = setTimeout(() => setSolutionsOpen(false), 200);
            }}
          >
            <button
              className="flex items-center gap-1 text-[13.5px] text-foreground/75 hover:text-foreground transition-colors relative group"
              onClick={() => setSolutionsOpen((v) => !v)}
            >
              Solutions
              <ChevronDown
                size={13}
                className="transition-transform duration-200"
                style={{ transform: solutionsOpen ? "rotate(180deg)" : "rotate(0deg)" }}
              />
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-foreground transition-all duration-300 group-hover:w-full" />
            </button>

            {/* Dropdown panel */}
            <div
              className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 w-72 rounded-2xl border border-border/60 bg-background/85 backdrop-blur-xl shadow-[0_16px_48px_-12px_rgba(19,24,24,0.14)] transition-all duration-200 overflow-hidden ${
                solutionsOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-1 pointer-events-none"
              }`}
            >
              <div className="p-2">
                {solutionItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => setSolutionsOpen(false)}
                      className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-foreground/[0.06] transition-colors no-underline group/item cursor-pointer"
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-200 group-hover/item:scale-110"
                        style={{ background: item.accentBg }}
                      >
                        <Icon size={14} style={{ color: item.accent }} strokeWidth={1.75} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-[13px] font-medium text-foreground leading-tight">
                          {item.label}
                        </div>
                        <div className="text-[11.5px] text-foreground/45 mt-0.5">
                          {item.desc}
                        </div>
                      </div>
                      <ChevronRight
                        size={15}
                        className="text-foreground/25 shrink-0 -translate-x-1 opacity-0 transition-all duration-200 group-hover/item:translate-x-0 group-hover/item:opacity-100"
                        style={{ color: item.accent }}
                      />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[13.5px] text-foreground/75 hover:text-foreground transition-colors relative group"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-foreground transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="/apply"
            className="hidden sm:inline-flex items-center gap-2 rounded-full bg-foreground text-background px-4 h-10 text-[13px] font-medium hover:bg-brand-dark transition-colors"
          >
            Apply to Work With Us
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 -mr-2 text-foreground"
            aria-label="Menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-500 bg-background/95 backdrop-blur-xl border-b border-border/60 ${
          open ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-5 py-6 flex flex-col gap-5">
          {/* Solutions collapsible */}
          <div>
            <button
              onClick={() => setMobileSolutionsOpen((v) => !v)}
              className="flex items-center justify-between w-full text-lg font-display text-foreground"
            >
              Solutions
              <ChevronDown
                size={16}
                className="transition-transform duration-200"
                style={{ transform: mobileSolutionsOpen ? "rotate(180deg)" : "rotate(0deg)" }}
              />
            </button>
            <div
              className={`overflow-hidden transition-[max-height,opacity] duration-300 ${
                mobileSolutionsOpen ? "max-h-60 opacity-100 mt-3" : "max-h-0 opacity-0"
              }`}
            >
              <div className="flex flex-col gap-1 pl-2 border-l border-border/40">
                {solutionItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => { setOpen(false); setMobileSolutionsOpen(false); }}
                    className="text-[15px] text-foreground/70 py-2 no-underline hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-lg font-display text-foreground"
            >
              {l.label}
            </a>
          ))}
          <a
            href="/apply"
            onClick={() => setOpen(false)}
            className="mt-2 inline-flex w-fit items-center rounded-full bg-foreground text-background px-5 h-11 text-sm"
          >
            Apply to Work With Us
          </a>
        </div>
      </div>
    </header>
  );
}