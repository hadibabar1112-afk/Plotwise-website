import { useState } from "react";
import { motion } from "framer-motion";
import { Logo } from "./Logo";
import { LayoutGrid, Zap, Globe, ArrowRight, ArrowLeft, Star } from "lucide-react";

const T = {
  bg:          "#F5F8F7",
  text:        "#131818",
  textMuted:   "rgba(19,24,24,0.50)",
  textFaint:   "rgba(19,24,24,0.30)",
  border:      "rgba(19,24,24,0.08)",
  deep:        "#00625C",
  dark:        "#207771",
  teal:        "#91CEBF",
  chipBg:      "rgba(0,98,92,0.07)",
  chipBorder:  "rgba(0,98,92,0.15)",
  chipText:    "#207771",
};

interface CampaignCard {
  id: string;
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  badge?: string;
  badgeColor?: string;
  badgeBg?: string;
  disabled?: boolean;
}

const CARDS: CampaignCard[] = [
  {
    id: "managed",
    href: "/managed",
    icon: <LayoutGrid size={20} style={{ color: T.deep }} />,
    title: "Managed Campaigns",
    description:
      "We handle everything — creator sourcing, briefs, approvals, and reporting. You get content that converts.",
    badge: "Most Popular",
    badgeColor: T.deep,
    badgeBg: "rgba(0,98,92,0.09)",
    disabled: false,
  },
  {
    id: "challenge",
    href: "/challenge",
    icon: <Zap size={20} style={{ color: "#9b5800" }} />,
    title: "Challenge Campaigns",
    description:
      "Viral creator challenges that flood TikTok and Reels with authentic content about your brand at scale.",
    badge: "Coming Soon",
    badgeColor: "#9b5800",
    badgeBg: "rgba(155,88,0,0.08)",
    disabled: true,
  },
  {
    id: "enterprise",
    href: "/enterprise",
    icon: <Globe size={20} style={{ color: "#5b4898" }} />,
    title: "Enterprise",
    description:
      "Custom creator infrastructure for brands running high-volume campaigns across multiple markets.",
    badge: "By Introduction",
    badgeColor: "#5b4898",
    badgeBg: "rgba(91,72,152,0.08)",
    disabled: false,
  },
];

export function BrandChoice() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{ background: T.bg }}
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 55% at 50% -5%, rgba(145,206,191,0.20) 0%, transparent 65%)",
        }}
      />

      {/* Header */}
      <header className="fixed top-0 inset-x-0 z-40 px-6 sm:px-10 h-16 flex items-center justify-between">
        <a href="/">
          <Logo variant="dark" />
        </a>
        <a href="/apply"
          className="flex items-center gap-1.5 text-sm font-medium no-underline transition-colors"
          style={{ color: T.textMuted }}
          onMouseEnter={e => (e.currentTarget.style.color = T.text)}
          onMouseLeave={e => (e.currentTarget.style.color = T.textMuted)}
        >
          <ArrowLeft size={14} /> Back
        </a>
      </header>

      {/* Main */}
      <div className="flex-1 flex flex-col items-center justify-center px-5 text-center pt-20 pb-16">
        <motion.div
          className="w-full max-w-2xl"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Chip */}
          <div
            className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 mb-8 text-[11px] font-semibold tracking-[0.12em] uppercase"
            style={{
              background: T.chipBg,
              color: T.chipText,
              border: `1px solid ${T.chipBorder}`,
            }}
          >
            <Star size={10} strokeWidth={2.5} />
            Brand Platform
          </div>

          {/* Heading */}
          <h1
            className="font-display font-normal text-[34px] sm:text-[46px] lg:text-[54px] tracking-[-0.03em] leading-[1.05] mb-5"
            style={{ color: T.text }}
          >
            What are you looking for?
          </h1>

          {/* Sub */}
          <p
            className="text-[16px] sm:text-[17px] leading-[1.65] mb-10 max-w-[420px] mx-auto"
            style={{ color: T.textMuted }}
          >
            Choose the campaign type that fits your goals — we'll route you to the right form.
          </p>

          {/* Cards */}
          <div className="grid grid-cols-1 gap-4 text-left">
            {CARDS.map(card => {
              const isHovered = hovered === card.id;
              return (
                <motion.a
                  key={card.id}
                  href={card.disabled ? undefined : card.href}
                  onClick={card.disabled ? (e) => e.preventDefault() : undefined}
                  whileHover={card.disabled ? {} : { y: -2 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  onHoverStart={() => !card.disabled && setHovered(card.id)}
                  onHoverEnd={() => setHovered(null)}
                  className="group flex items-start gap-5 p-6 rounded-2xl no-underline"
                  style={{
                    background: "#ffffff",
                    border: `1.5px solid ${isHovered ? "rgba(0,98,92,0.28)" : T.border}`,
                    boxShadow: isHovered
                      ? "0 14px 40px -12px rgba(0,98,92,0.14)"
                      : "0 2px 10px -4px rgba(19,24,24,0.07)",
                    transition: "border-color 0.2s, box-shadow 0.2s",
                    cursor: card.disabled ? "default" : "pointer",
                    opacity: card.disabled ? 0.7 : 1,
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: "rgba(0,98,92,0.06)" }}
                  >
                    {card.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2.5 mb-2">
                      <h3
                        className="text-[16px] font-semibold"
                        style={{ color: T.text }}
                      >
                        {card.title}
                      </h3>
                      {card.badge && (
                        <span
                          className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold tracking-[0.06em] uppercase"
                          style={{
                            color: card.badgeColor,
                            background: card.badgeBg,
                          }}
                        >
                          {card.badge}
                        </span>
                      )}
                    </div>
                    <p
                      className="text-[13.5px] leading-[1.6]"
                      style={{ color: T.textMuted }}
                    >
                      {card.description}
                    </p>
                  </div>
                  {!card.disabled && (
                    <ArrowRight
                      size={16}
                      className="shrink-0 mt-2.5 transition-transform group-hover:translate-x-0.5"
                      style={{ color: T.deep }}
                    />
                  )}
                </motion.a>
              );
            })}
          </div>

          {/* Footer note */}
          <p className="mt-7 text-[13px]" style={{ color: T.textFaint }}>
            Not sure? Start with Managed — it's the most popular.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
