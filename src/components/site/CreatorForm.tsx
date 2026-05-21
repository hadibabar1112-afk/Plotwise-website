import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "./Logo";
import { ArrowLeft, Check } from "lucide-react";

type AnswerValue = string | string[];

interface StepDef {
  id: string;
  type: "text" | "email" | "url" | "select" | "multiselect" | "textarea" | "platformlinks" | "groupedmultiselect";
  question: string;
  placeholder?: string;
  hint?: string;
  options?: string[];
  groups?: { label: string; options: string[] }[];
  required?: boolean;
}

const STEPS: StepDef[] = [
  // Section 1: The basics
  {
    id: "name", type: "text",
    question: "What should we call you?",
    placeholder: "Your full name",
    required: true,
  },
  {
    id: "email", type: "email",
    question: "Where can we reach you?",
    placeholder: "you@email.com",
    required: true,
  },
  {
    id: "phone", type: "text",
    question: "What's your phone or WhatsApp number?",
    placeholder: "+1 234 567 8900",
    hint: "For faster coordination once you're onboarded.",
  },
  {
    id: "location", type: "text",
    question: "Which country are you based in?",
    placeholder: "e.g. United States",
    hint: "Helps us match you with brands shipping in your region.",
    required: true,
  },
  // Section 2: Your content
  {
    id: "platform", type: "multiselect",
    question: "Where do you create most content?",
    hint: "Select all that apply",
    options: ["Instagram", "TikTok", "YouTube", "Other"],
  },
  {
    id: "profileLink", type: "platformlinks",
    question: "Drop your profile link(s)",
    hint: "One link per platform",
  },
  {
    id: "followerCount", type: "select",
    question: "What's your follower count across platforms?",
    hint: "We work with all sizes — this just helps us match campaigns.",
    options: ["Under 5K", "5–25K", "25–100K", "100K+"],
  },
  {
    id: "niche", type: "multiselect",
    question: "What do you primarily create?",
    hint: "Select all that apply",
    options: ["Lifestyle", "Beauty", "Fitness", "Tech", "Storytelling", "Other"],
  },
  {
    id: "ugcSamples", type: "textarea",
    question: "Link 2–3 of your best UGC samples",
    placeholder: "Paste your links here — drive links, public posts, or portfolios all work.",
    hint: "Specifically UGC/ad-style content, not just lifestyle posts.",
    required: true,
  },
  {
    id: "contentFormats", type: "multiselect",
    question: "What content formats are you strongest at?",
    hint: "Select all that apply",
    options: ["Talking head", "Voiceover", "Demo & tutorial", "Unboxing", "Before & after", "Lifestyle B-roll", "Skits", "Static photos"],
  },
  // Section 3: Experience & fit
  {
    id: "ageRange", type: "select",
    question: "Which age bracket do you fall into?",
    options: ["18–24", "25–34", "35–44", "45+"],
  },
  {
    id: "skinToneHair", type: "groupedmultiselect",
    question: "Tell us a bit about your skin, tone & hair",
    hint: "Pick what applies. Skip anything you'd rather not share.",
    groups: [
      { label: "Skin type", options: ["Oily", "Dry", "Combination", "Sensitive", "Acne-prone"] },
      { label: "Skin tone", options: ["Fair", "Light", "Medium", "Tan", "Deep"] },
      { label: "Hair type", options: ["Straight", "Wavy", "Curly", "Coily", "Textured"] },
    ],
  },
  {
    id: "contentStyle", type: "multiselect",
    question: "What's your strongest content style?",
    hint: "Select all that apply",
    options: ["Hook-driven short ads", "Tutorial & demo", "Storytelling & narrative", "Reviews & testimonials", "Comedic & skit-based", "High-volume variant testing"],
  },
  {
    id: "experience", type: "select",
    question: "How would you describe your creator journey?",
    options: [
      "Just getting started",
      "Consistent creator",
      "Brand-experienced",
      "Performance-focused / Ad-ready",
      "Other",
    ],
  },
  // Section 4: Capacity
  {
    id: "availability", type: "text",
    question: "How many campaigns could you realistically take on per month?",
    placeholder: "e.g. 2–3",
    hint: "Enter a number or range",
  },
  {
    id: "turnaround", type: "select",
    question: "From product received → footage delivered, what can you commit to?",
    options: ["Under 5 days", "5–10 days", "10+ days"],
  },
  {
    id: "campaigns", type: "multiselect",
    question: "What type of campaigns excite you?",
    hint: "Select all that apply",
    options: [
      "Paid UGC for ads",
      "Long-term brand partnerships",
      "High-volume creative testing",
      "Performance-driven content",
      "Narrative-driven storytelling",
      "Other",
    ],
  },
  {
    id: "whyPlotwise", type: "textarea",
    question: "What made you want to join Plotwise?",
    placeholder: "Tell us in a few sentences…",
    hint: "Be as specific as you like",
  },
];

const TOTAL = STEPS.length;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const slideVariants: any = {
  enter: (d: number) => ({ y: d * 36, opacity: 0, filter: "blur(6px)" }),
  center: {
    y: 0, opacity: 1, filter: "blur(0px)",
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
  exit: (d: number) => ({
    y: d * -36, opacity: 0, filter: "blur(6px)",
    transition: { duration: 0.25, ease: "easeIn" },
  }),
};

const T = {
  bg:          "#F5F8F7",
  text:        "#131818",
  textMuted:   "rgba(19,24,24,0.45)",
  textFaint:   "rgba(19,24,24,0.28)",
  textSubtle:  "rgba(19,24,24,0.55)",
  border:      "rgba(19,24,24,0.10)",
  borderHover: "rgba(0,98,92,0.35)",
  teal:        "#91CEBF",
  deep:        "#00625C",
  dark:        "#207771",
  optionBg:    "rgba(19,24,24,0.04)",
  optionBgHov: "rgba(19,24,24,0.07)",
  selBg:       "#91CEBF",
  selText:     "#131818",
  selBorder:   "#91CEBF",
  trackBg:     "rgba(19,24,24,0.08)",
  divider:     "rgba(19,24,24,0.12)",
  dotInactive: "rgba(19,24,24,0.12)",
  dotDone:     "rgba(0,98,92,0.35)",
};

export function CreatorForm() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [answers, setAnswers] = useState<Record<string, AnswerValue>>({});
  const [otherText, setOtherText] = useState<Record<string, string>>({});
  const [platformLinkValues, setPlatformLinkValues] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const otherInputRef = useRef<HTMLInputElement>(null);

  const current = STEPS[step];
  const answer = answers[current?.id ?? ""] ?? (
    current?.type === "multiselect" || current?.type === "groupedmultiselect" ? [] : ""
  );
  const progress = submitted ? 100 : (step / TOTAL) * 100;

  const otherSelected =
    (current?.type === "select" && answer === "Other") ||
    (current?.type === "multiselect" && (answer as string[]).includes("Other"));
  const otherFilled = (otherText[current?.id ?? ""] ?? "").trim().length > 0;

  const selectedPlatforms = (answers["platform"] as string[]) ?? [];

  const canAdvance = (() => {
    if (current?.type === "platformlinks") {
      if (selectedPlatforms.length === 0) return false;
      return selectedPlatforms.every(
        (p) => (platformLinkValues[p] ?? "").trim().length > 0
      );
    }
    if (current?.type === "groupedmultiselect") return true;
    if (otherSelected && !otherFilled) return false;
    if (current?.required) {
      if (current.type === "multiselect") return (answer as string[]).length > 0;
      return (answer as string).trim().length > 0;
    }
    return true;
  })();

  const goNext = useCallback(async () => {
    if (step < TOTAL - 1) {
      setDir(1);
      setStep((s) => s + 1);
    } else {
      const profileLinkStr = selectedPlatforms
        .map((p) => {
          const label = p === "Other" && otherText["platform"] ? otherText["platform"] : p;
          const link = (platformLinkValues[p] ?? "").trim();
          return link ? `${label}: ${link}` : null;
        })
        .filter(Boolean)
        .join("\n");

      const finalAnswers = { ...answers, profileLink: profileLinkStr };

      setSending(true);
      setSendError(null);
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000);
      try {
        const res = await fetch("/api/creator", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ answers: finalAnswers, otherText }),
          signal: controller.signal,
        });
        clearTimeout(timeout);
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error((data as { error?: string }).error || "server error");
        }
        setSubmitted(true);
      } catch (err) {
        clearTimeout(timeout);
        const isTimeout = err instanceof Error && err.name === "AbortError";
        setSendError(
          isTimeout
            ? "Request timed out — please check your connection and try again."
            : "Something went wrong sending your submission. Please try again."
        );
      } finally {
        setSending(false);
      }
    }
  }, [step, answers, otherText, platformLinkValues, selectedPlatforms]);

  const goPrev = useCallback(() => {
    if (step > 0) { setDir(-1); setStep((s) => s - 1); }
  }, [step]);

  const setAns = useCallback(
    (val: AnswerValue) => setAnswers((prev) => ({ ...prev, [current.id]: val })),
    [current?.id]
  );

  const handleSelectChoice = useCallback(
    (opt: string) => {
      setAns(opt);
      if (opt === "Other") {
        setTimeout(() => otherInputRef.current?.focus(), 100);
        return;
      }
      setTimeout(() => {
        setDir(1);
        if (step < TOTAL - 1) setStep((s) => s + 1);
        else setSubmitted(true);
      }, 350);
    },
    [step, setAns]
  );

  const toggleMulti = useCallback(
    (opt: string, id?: string) => {
      const targetId = id ?? current.id;
      const cur = (answers[targetId] as string[]) ?? [];
      const next = cur.includes(opt) ? cur.filter((o) => o !== opt) : [...cur, opt];
      setAnswers((prev) => ({ ...prev, [targetId]: next }));
      if (targetId === current.id && opt === "Other" && !cur.includes("Other")) {
        setTimeout(() => otherInputRef.current?.focus(), 100);
      }
    },
    [answers, current?.id]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (submitted || !started) return;
      if (
        e.key === "Enter" &&
        current.type !== "textarea" &&
        current.type !== "select" &&
        current.type !== "multiselect" &&
        current.type !== "groupedmultiselect" &&
        current.type !== "platformlinks"
      ) {
        if (canAdvance) goNext();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [canAdvance, goNext, current?.type, submitted, started]);

  useEffect(() => {
    if (submitted || !started) return;
    const t = setTimeout(() => {
      if (current.type === "textarea") textareaRef.current?.focus();
      else if (
        current.type === "text" ||
        current.type === "url" ||
        current.type === "email"
      )
        inputRef.current?.focus();
    }, 450);
    return () => clearTimeout(t);
  }, [step, current?.type, submitted, started]);

  const renderInput = () => {
    if (!current) return null;

    const inputBase =
      "w-full bg-transparent border-b-2 outline-none text-xl sm:text-2xl pb-3 pt-1 transition-colors duration-300 font-display tracking-tight";

    // ── Text / Email / URL ──────────────────────────────────────────────────
    if (current.type === "text" || current.type === "url" || current.type === "email") {
      return (
        <div className="w-full max-w-xl">
          <input
            ref={inputRef}
            type={current.type === "url" ? "text" : current.type}
            value={answer as string}
            onChange={(e) => setAns(e.target.value)}
            placeholder={current.placeholder}
            className={inputBase}
            style={{ color: T.text, borderColor: T.border, caretColor: T.deep }}
            onFocus={(e) => (e.currentTarget.style.borderColor = T.teal)}
            onBlur={(e) => (e.currentTarget.style.borderColor = T.border)}
            onKeyDown={(e) => { if (e.key === "Enter" && canAdvance) goNext(); }}
          />
          {current.hint && (
            <p className="mt-3 text-sm" style={{ color: T.textFaint }}>{current.hint}</p>
          )}
          <p className="mt-5 text-xs tracking-wide" style={{ color: T.textFaint }}>
            Press{" "}
            <kbd className="px-1.5 py-0.5 rounded font-mono text-[10px]"
              style={{ border: `1px solid ${T.border}`, color: T.textMuted }}>
              Enter ↵
            </kbd>{" "}
            to continue
          </p>
        </div>
      );
    }

    // ── Textarea ────────────────────────────────────────────────────────────
    if (current.type === "textarea") {
      return (
        <div className="w-full max-w-xl">
          <textarea
            ref={textareaRef}
            value={answer as string}
            onChange={(e) => {
              setAns(e.target.value);
              e.target.style.height = "auto";
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
            placeholder={current.placeholder}
            rows={1}
            className={`${inputBase} resize-none leading-relaxed`}
            style={{ color: T.text, borderColor: T.border, caretColor: T.deep, overflow: "hidden" }}
            onFocus={(e) => (e.currentTarget.style.borderColor = T.teal)}
            onBlur={(e) => (e.currentTarget.style.borderColor = T.border)}
          />
          {current.hint && (
            <p className="mt-2 text-sm" style={{ color: T.textFaint }}>{current.hint}</p>
          )}
          <p className="mt-4 text-xs" style={{ color: T.textFaint }}>
            <kbd className="px-1.5 py-0.5 rounded font-mono text-[10px]"
              style={{ border: `1px solid ${T.border}`, color: T.textMuted }}>
              Shift + Enter
            </kbd>{" "}
            for new line
          </p>
        </div>
      );
    }

    // ── Select ──────────────────────────────────────────────────────────────
    if (current.type === "select") {
      const showOther = answer === "Other";
      return (
        <div className="flex flex-col gap-4 max-w-xl">
          {current.hint && (
            <p className="text-sm -mt-2" style={{ color: T.textFaint }}>{current.hint}</p>
          )}
          <div className="flex flex-wrap gap-3">
            {current.options?.map((opt, i) => {
              const sel = answer === opt;
              return (
                <button key={opt} onClick={() => handleSelectChoice(opt)}
                  className="flex items-center gap-2.5 px-5 py-3 rounded-xl border text-sm font-medium transition-all duration-200 cursor-pointer"
                  style={{
                    background: sel ? T.selBg : T.optionBg,
                    color: sel ? T.selText : T.textSubtle,
                    borderColor: sel ? T.selBorder : T.border,
                    boxShadow: sel ? "0 0 24px -4px rgba(145,206,191,0.5)" : "none",
                  }}
                  onMouseEnter={(e) => { if (!sel) { e.currentTarget.style.borderColor = T.borderHover; e.currentTarget.style.background = T.optionBgHov; } }}
                  onMouseLeave={(e) => { if (!sel) { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.background = T.optionBg; } }}
                >
                  <span className="text-[10px] font-mono shrink-0 w-4 h-4 rounded flex items-center justify-center border transition-colors"
                    style={{
                      borderColor: sel ? "rgba(19,24,24,0.25)" : T.border,
                      color: sel ? "rgba(19,24,24,0.5)" : T.textFaint,
                      background: sel ? "rgba(19,24,24,0.07)" : "transparent",
                    }}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  {opt}
                  {sel && <Check size={13} strokeWidth={2.5} />}
                </button>
              );
            })}
          </div>
          {showOther && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
              <input ref={otherInputRef} type="text"
                value={otherText[current.id] ?? ""}
                onChange={(e) => setOtherText((prev) => ({ ...prev, [current.id]: e.target.value }))}
                placeholder="Please describe…"
                className="w-full bg-transparent border-b-2 outline-none text-lg pb-2 pt-1 transition-colors duration-300 font-display tracking-tight"
                style={{ color: T.text, borderColor: T.border, caretColor: T.deep }}
                onFocus={(e) => (e.currentTarget.style.borderColor = T.teal)}
                onBlur={(e) => (e.currentTarget.style.borderColor = T.border)}
                onKeyDown={(e) => { if (e.key === "Enter" && otherFilled) goNext(); }}
              />
            </motion.div>
          )}
        </div>
      );
    }

    // ── Multiselect ─────────────────────────────────────────────────────────
    if (current.type === "multiselect") {
      const selected = answer as string[];
      const showOther = selected.includes("Other");
      return (
        <div className="flex flex-col gap-4 max-w-xl w-full">
          {current.hint && (
            <p className="text-sm -mt-2" style={{ color: T.textFaint }}>{current.hint}</p>
          )}
          <div className="flex flex-wrap gap-3">
            {current.options?.map((opt) => {
              const sel = selected.includes(opt);
              return (
                <button key={opt} onClick={() => toggleMulti(opt)}
                  className="flex items-center gap-2.5 px-5 py-3 rounded-xl border text-sm font-medium transition-all duration-200 cursor-pointer"
                  style={{
                    background: sel ? T.selBg : T.optionBg,
                    color: sel ? T.selText : T.textSubtle,
                    borderColor: sel ? T.selBorder : T.border,
                    boxShadow: sel ? "0 0 24px -4px rgba(145,206,191,0.5)" : "none",
                  }}
                  onMouseEnter={(e) => { if (!sel) { e.currentTarget.style.borderColor = T.borderHover; e.currentTarget.style.background = T.optionBgHov; } }}
                  onMouseLeave={(e) => { if (!sel) { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.background = T.optionBg; } }}
                >
                  <span className="w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors"
                    style={{
                      borderColor: sel ? "rgba(19,24,24,0.25)" : T.border,
                      background: sel ? "rgba(19,24,24,0.07)" : "transparent",
                      color: T.selText,
                    }}>
                    {sel && <Check size={10} strokeWidth={3} />}
                  </span>
                  {opt}
                </button>
              );
            })}
          </div>
          {showOther && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
              <input ref={otherInputRef} type="text"
                value={otherText[current.id] ?? ""}
                onChange={(e) => setOtherText((prev) => ({ ...prev, [current.id]: e.target.value }))}
                placeholder="Please describe…"
                className="w-full bg-transparent border-b-2 outline-none text-lg pb-2 pt-1 transition-colors duration-300 font-display tracking-tight"
                style={{ color: T.text, borderColor: T.border, caretColor: T.deep }}
                onFocus={(e) => (e.currentTarget.style.borderColor = T.teal)}
                onBlur={(e) => (e.currentTarget.style.borderColor = T.border)}
              />
            </motion.div>
          )}
          {selected.length > 0 && (
            <p className="text-xs" style={{ color: T.textFaint }}>
              {selected.length} selected · click OK to continue
            </p>
          )}
        </div>
      );
    }

    // ── Grouped Multiselect (skin/tone/hair) ────────────────────────────────
    if (current.type === "groupedmultiselect") {
      const selected = (answers[current.id] as string[]) ?? [];
      return (
        <div className="flex flex-col gap-6 max-w-xl w-full">
          {current.hint && (
            <p className="text-sm -mt-2" style={{ color: T.textFaint }}>{current.hint}</p>
          )}
          {current.groups?.map((group) => (
            <div key={group.label}>
              <p className="mb-2.5 text-xs font-semibold tracking-widest uppercase"
                style={{ color: T.deep }}>
                {group.label}
              </p>
              <div className="flex flex-wrap gap-2.5">
                {group.options.map((opt) => {
                  const sel = selected.includes(opt);
                  return (
                    <button key={opt} onClick={() => toggleMulti(opt, current.id)}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all duration-200 cursor-pointer"
                      style={{
                        background: sel ? T.selBg : T.optionBg,
                        color: sel ? T.selText : T.textSubtle,
                        borderColor: sel ? T.selBorder : T.border,
                        boxShadow: sel ? "0 0 24px -4px rgba(145,206,191,0.5)" : "none",
                      }}
                      onMouseEnter={(e) => { if (!sel) { e.currentTarget.style.borderColor = T.borderHover; e.currentTarget.style.background = T.optionBgHov; } }}
                      onMouseLeave={(e) => { if (!sel) { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.background = T.optionBg; } }}
                    >
                      <span className="w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0 transition-colors"
                        style={{
                          borderColor: sel ? "rgba(19,24,24,0.25)" : T.border,
                          background: sel ? "rgba(19,24,24,0.07)" : "transparent",
                          color: T.selText,
                        }}>
                        {sel && <Check size={9} strokeWidth={3} />}
                      </span>
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
          {selected.length > 0 && (
            <p className="text-xs" style={{ color: T.textFaint }}>
              {selected.length} selected · click OK to continue
            </p>
          )}
        </div>
      );
    }

    // ── Platform Links — one input per selected platform ────────────────────
    if (current.type === "platformlinks") {
      if (selectedPlatforms.length === 0) {
        return (
          <p className="text-sm" style={{ color: T.textFaint }}>
            Please go back and select at least one platform.
          </p>
        );
      }
      return (
        <div className="flex flex-col gap-6 max-w-xl w-full">
          {selectedPlatforms.map((platform) => {
            const label =
              platform === "Other" && otherText["platform"]
                ? otherText["platform"]
                : platform;
            const placeholder =
              platform === "Instagram" ? "https://instagram.com/yourhandle"
              : platform === "TikTok"   ? "https://tiktok.com/@yourhandle"
              : platform === "YouTube"  ? "https://youtube.com/@yourchannel"
              : "https://yourprofilelink.com";
            return (
              <div key={platform}>
                <p className="mb-2 text-xs font-semibold tracking-widest uppercase"
                  style={{ color: T.deep }}>
                  {label}
                </p>
                <input
                  type="text"
                  value={platformLinkValues[platform] ?? ""}
                  onChange={(e) =>
                    setPlatformLinkValues((prev) => ({ ...prev, [platform]: e.target.value }))
                  }
                  placeholder={placeholder}
                  className="w-full bg-transparent border-b-2 outline-none text-lg pb-2 pt-1 transition-colors duration-300 font-display tracking-tight"
                  style={{ color: T.text, borderColor: T.border, caretColor: T.deep }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = T.teal)}
                  onBlur={(e) => (e.currentTarget.style.borderColor = T.border)}
                />
              </div>
            );
          })}
          {current.hint && (
            <p className="text-xs" style={{ color: T.textFaint }}>{current.hint}</p>
          )}
        </div>
      );
    }

    return null;
  };

  // ── Welcome screen ──────────────────────────────────────────────────────────
  if (!started) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden"
        style={{ background: T.bg }}>
        <div className="pointer-events-none fixed -top-40 -right-40 w-[500px] h-[500px] rounded-full blur-[140px]"
          style={{ background: "rgba(145,206,191,0.18)" }} />
        <div className="pointer-events-none fixed bottom-0 -left-40 w-[400px] h-[400px] rounded-full blur-[120px]"
          style={{ background: "rgba(0,98,92,0.07)" }} />
        <header className="fixed top-6 left-6 sm:left-10 z-40">
          <a href="/"><Logo variant="dark" /></a>
        </header>
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-lg w-full text-center"
        >
          <h1 style={{
            fontFamily: "'Georgia', 'Times New Roman', serif",
            fontWeight: 700,
            fontStyle: "italic",
            fontSize: "clamp(40px, 6vw, 60px)",
            color: T.deep,
            letterSpacing: "-0.02em",
            margin: 0,
            lineHeight: 1,
            marginBottom: "20px",
          }}>
            Hellooo!
          </h1>

          <p className="text-lg leading-relaxed mb-3"
            style={{ color: "rgba(19,24,24,0.75)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            You're one step away from exclusive access to{" "}
            <span style={{ color: T.deep, fontWeight: 600 }}>high-value brand campaigns.</span>
          </p>
          <p className="text-base leading-relaxed mb-10"
            style={{ color: "rgba(19,24,24,0.60)" }}>
            Answer a few quick questions to get started.
          </p>

          <button
            onClick={() => setStarted(true)}
            className="inline-flex items-center gap-2 rounded-full px-8 text-base font-medium transition-all duration-200"
            style={{
              background: T.deep,
              color: "#fff",
              height: "52px",
              boxShadow: "0 8px 28px -8px rgba(0,98,92,0.45)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = T.dark)}
            onMouseLeave={(e) => (e.currentTarget.style.background = T.deep)}
          >
            Get Started →
          </button>
          <p className="mt-6 text-xs" style={{ color: "rgba(19,24,24,0.45)" }}>
            Takes less than 2 minutes
          </p>
        </motion.div>
      </div>
    );
  }

  // ── Thank you screen ────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col" style={{ background: T.bg }}>
        <div className="fixed top-0 inset-x-0 h-[3px] z-50" style={{ background: T.trackBg }}>
          <motion.div className="h-full"
            style={{ background: `linear-gradient(90deg, ${T.deep} 0%, ${T.dark} 50%, ${T.teal} 100%)` }}
            initial={{ width: "88%" }} animate={{ width: "100%" }}
            transition={{ duration: 0.6, ease: "easeOut" }} />
        </div>
        <header className="fixed top-3 inset-x-0 z-40 px-6 sm:px-10">
          <a href="/"><Logo variant="dark" /></a>
        </header>
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-lg"
          >
            <h2 className="font-display text-4xl sm:text-5xl font-normal tracking-tight"
              style={{ color: T.text, whiteSpace: "nowrap" }}>
              You're officially on our radar.
            </h2>
            <p className="mt-5 text-lg leading-relaxed" style={{ color: T.textMuted }}>
              The Plotwise team is reviewing your profile and will get back to you{" "}
              <strong style={{ color: T.text }}>within 24 hours.</strong>
            </p>
            <p className="mt-4 text-base leading-relaxed" style={{ color: T.textFaint }}>
              If there's a fit, onboarding moves fast — and campaigns come next.
            </p>
            <p className="mt-6 text-sm italic" style={{ color: T.textMuted }}>
              This is where creators stop waiting, and start choosing &{" "}
              <strong style={{ color: T.dark }}>growing</strong>.
            </p>
            <a href="/"
              className="mt-10 inline-flex items-center gap-2 rounded-full px-7 h-12 text-sm font-medium transition-colors"
              style={{ background: T.deep, color: "#fff" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = T.dark)}
              onMouseLeave={(e) => (e.currentTarget.style.background = T.deep)}>
              Back to PlotWise
            </a>
          </motion.div>
        </div>
      </div>
    );
  }

  // ── Form ────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden" style={{ background: T.bg }}>
      <div className="pointer-events-none fixed -top-40 -right-40 w-[500px] h-[500px] rounded-full blur-[140px]"
        style={{ background: "rgba(145,206,191,0.18)" }} />
      <div className="pointer-events-none fixed bottom-0 -left-40 w-[400px] h-[400px] rounded-full blur-[120px]"
        style={{ background: "rgba(0,98,92,0.07)" }} />

      {/* Progress bar */}
      <div className="fixed top-0 inset-x-0 z-50">
        <div className="h-[3px] relative" style={{ background: T.trackBg }}>
          <motion.div className="h-full absolute top-0 left-0 z-20"
            style={{ background: `linear-gradient(90deg, ${T.deep} 0%, ${T.dark} 55%, ${T.teal} 100%)` }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }} />
        </div>
      </div>

      {/* Header */}
      <header className="fixed top-10 inset-x-0 z-40 flex items-center justify-between px-6 sm:px-10 py-3">
        <a href="/" className="opacity-80 hover:opacity-100 transition-opacity">
          <Logo variant="dark" />
        </a>
        <span className="text-sm font-mono tabular-nums" style={{ color: T.textFaint }}>
          {String(step + 1).padStart(2, "0")} / {String(TOTAL).padStart(2, "0")}
        </span>
      </header>

      {/* Main */}
      <div className="flex-1 flex items-center justify-center px-6 sm:px-10 pt-32 pb-28">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div key={step} custom={dir} variants={slideVariants}
              initial="enter" animate="center" exit="exit"
              className="flex flex-col gap-8">

              {/* Question */}
              <div className="flex gap-5 items-start">
                <span className="font-mono text-base mt-1 shrink-0 tabular-nums"
                  style={{ color: `${T.deep}80` }}>
                  {String(step + 1).padStart(2, "0")} →
                </span>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-[42px] font-normal leading-[1.08] tracking-[-0.025em]"
                  style={{ color: T.text }}>
                  {current.question}
                </h2>
              </div>

              {/* Input */}
              <div className="pl-10">{renderInput()}</div>

              {/* Back + OK / Submit */}
              {(current.type !== "select" || answer === "Other") && (
                <div className="pl-10 flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    {step > 0 && (
                      <button onClick={goPrev} disabled={sending}
                        className="flex items-center gap-1.5 px-3 h-11 text-sm font-medium transition-all duration-200"
                        style={{ color: T.textMuted, background: "transparent", border: "none", cursor: sending ? "not-allowed" : "pointer" }}
                        onMouseEnter={(e) => { if (!sending) e.currentTarget.style.color = T.text; }}
                        onMouseLeave={(e) => (e.currentTarget.style.color = T.textMuted)}>
                        <ArrowLeft size={14} /> Back
                      </button>
                    )}
                    <button onClick={goNext} disabled={!canAdvance || sending}
                      className="px-6 h-11 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2"
                      style={{
                        background: canAdvance && !sending ? T.deep : T.trackBg,
                        color: canAdvance && !sending ? "#fff" : T.textFaint,
                        cursor: canAdvance && !sending ? "pointer" : "not-allowed",
                        boxShadow: canAdvance && !sending ? `0 8px 28px -8px rgba(0,98,92,0.35)` : "none",
                      }}
                      onMouseEnter={(e) => { if (canAdvance && !sending) e.currentTarget.style.background = T.dark; }}
                      onMouseLeave={(e) => { if (canAdvance && !sending) e.currentTarget.style.background = T.deep; }}>
                      {sending ? (
                        <>
                          <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="31.4 31.4" />
                          </svg>
                          Sending…
                        </>
                      ) : step === TOTAL - 1 ? "Submit" : "OK"}
                    </button>
                  </div>
                  {sendError && (
                    <p className="text-sm" style={{ color: "#c0392b" }}>{sendError}</p>
                  )}
                </div>
              )}

              {/* Back only — for auto-advance selects */}
              {current.type === "select" && answer !== "Other" && step > 0 && (
                <div className="pl-10">
                  <button onClick={goPrev}
                    className="flex items-center gap-1.5 px-3 h-11 text-sm font-medium transition-all duration-200"
                    style={{ color: T.textMuted, background: "transparent", border: "none", cursor: "pointer" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = T.text)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = T.textMuted)}>
                    <ArrowLeft size={14} /> Back
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Dots */}
      <div className="fixed bottom-0 inset-x-0 flex items-center justify-center px-6 sm:px-10 py-6">
        <div className="flex items-center gap-1.5">
          {STEPS.map((_, i) => (
            <div key={i} className="rounded-full transition-all duration-300"
              style={{
                width: i === step ? 16 : 6,
                height: 6,
                background: i === step ? T.deep : i < step ? T.dotDone : T.dotInactive,
              }} />
          ))}
        </div>
      </div>
    </div>
  );
}
