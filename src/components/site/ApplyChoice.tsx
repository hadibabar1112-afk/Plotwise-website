import { useState } from "react";
import { motion } from "framer-motion";
import { Logo } from "./Logo";
import { Camera, LayoutGrid, ArrowRight } from "lucide-react";

const T = {
  bg:          "#F5F8F7",
  text:        "#131818",
  textMuted:   "rgba(19,24,24,0.50)",
  border:      "rgba(19,24,24,0.08)",
  deep:        "#00625C",
  chipBg:      "rgba(0,98,92,0.07)",
  chipBorder:  "rgba(0,98,92,0.15)",
  chipText:    "#207771",
};

export function ApplyChoice() {
  const [hovered, setHovered] = useState<"creator" | "brand" | null>(null);

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
      <header className="fixed top-0 inset-x-0 z-40 px-6 sm:px-10 h-16 flex items-center">
        <a href="/">
          <Logo variant="dark" />
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
            Creator &amp; Brand Platform
          </div>

          {/* Heading */}
          <h1
            className="font-display font-normal text-[36px] sm:text-[48px] lg:text-[56px] tracking-[-0.03em] leading-[1.05] mb-5"
            style={{ color: T.text }}
          >
            How do you want to<br />work with Plotwise?
          </h1>

          {/* Sub */}
          <p
            className="text-[16px] sm:text-[17px] leading-[1.65] mb-10 max-w-[420px] mx-auto"
            style={{ color: T.textMuted }}
          >
            One question. Then we&apos;ll get you to the right place.
          </p>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">

            {/* Creator Card */}
            <motion.a
              href="/creators"
              whileHover={{ y: -3 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              onHoverStart={() => setHovered("creator")}
              onHoverEnd={() => setHovered(null)}
              className="group flex flex-col gap-5 p-7 rounded-2xl no-underline"
              style={{
                background: "#ffffff",
                border: `1.5px solid ${hovered === "creator" ? "rgba(0,98,92,0.28)" : T.border}`,
                boxShadow:
                  hovered === "creator"
                    ? "0 14px 40px -12px rgba(0,98,92,0.14)"
                    : "0 2px 10px -4px rgba(19,24,24,0.07)",
                transition: "border-color 0.2s, box-shadow 0.2s",
              }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "rgba(0,98,92,0.07)" }}
              >
                <Camera size={19} style={{ color: T.deep }} />
              </div>
              <div className="flex-1">
                <h3
                  className="text-[17px] font-semibold mb-2"
                  style={{ color: T.text }}
                >
                  I&apos;m a creator
                </h3>
                <p
                  className="text-[13.5px] leading-[1.6]"
                  style={{ color: T.textMuted }}
                >
                  I want to create for beauty brands through Plotwise.
                </p>
              </div>
              <div
                className="flex items-center gap-1.5 text-[13px] font-semibold"
                style={{ color: T.deep }}
              >
                Get started
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </div>
            </motion.a>

            {/* Brand Card */}
            <motion.a
              href="/brand"
              whileHover={{ y: -3 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              onHoverStart={() => setHovered("brand")}
              onHoverEnd={() => setHovered(null)}
              className="group flex flex-col gap-5 p-7 rounded-2xl no-underline"
              style={{
                background: "#ffffff",
                border: `1.5px solid ${hovered === "brand" ? "rgba(0,98,92,0.28)" : T.border}`,
                boxShadow:
                  hovered === "brand"
                    ? "0 14px 40px -12px rgba(0,98,92,0.14)"
                    : "0 2px 10px -4px rgba(19,24,24,0.07)",
                transition: "border-color 0.2s, box-shadow 0.2s",
              }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "rgba(0,98,92,0.07)" }}
              >
                <LayoutGrid size={19} style={{ color: T.deep }} />
              </div>
              <div className="flex-1">
                <h3
                  className="text-[17px] font-semibold mb-2"
                  style={{ color: T.text }}
                >
                  I&apos;m a brand
                </h3>
                <p
                  className="text-[13.5px] leading-[1.6]"
                  style={{ color: T.textMuted }}
                >
                  I want Plotwise to power my creative.
                </p>
              </div>
              <div
                className="flex items-center gap-1.5 text-[13px] font-semibold"
                style={{ color: T.deep }}
              >
                Get started
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </div>
            </motion.a>

          </div>
        </motion.div>
      </div>
    </div>
  );
}
