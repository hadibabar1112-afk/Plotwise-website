import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "./Logo";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

type AnswerValue = string | string[];

export interface BrandStepDef {
  id: string;
  type: "text" | "email" | "url" | "select" | "multiselect" | "textarea";
  question: string;
  placeholder?: string;
  hint?: string;
  options?: string[];
  required?: boolean;
  optional?: boolean;
}

export interface BrandFormEngineProps {
  formTitle: string;
  formSubtitle: string;
  steps: BrandStepDef[];
  apiEndpoint: string;
  backHref?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function gtagEvent(name: string, params?: Record<string, string | number>) {
  if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
    (window as any).gtag("event", name, params ?? {});
  }
}

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
  chipBg:      "rgba(0,98,92,0.07)",
  chipBorder:  "rgba(0,98,92,0.18)",
  chipText:    "#207771",
  optionBg:    "rgba(19,24,24,0.04)",
  optionBgHov: "rgba(19,24,24,0.07)",
  selBg:       "#91CEBF",
  selText:     "#131818",
  selBorder:   "#91CEBF",
  trackBg:     "rgba(19,24,24,0.08)",
  dotInactive: "rgba(19,24,24,0.12)",
  dotDone:     "rgba(0,98,92,0.35)",
  error:       "#c0392b",
};

function validateStep(
  stepIdx: number,
  steps: BrandStepDef[],
  answers: Record<string, AnswerValue>,
  otherText: Record<string, string>
): string | null {
  const cur = steps[stepIdx];
  if (!cur) return null;
  const val = answers[cur.id];

  if (cur.type === "email") {
    const s = (val as string ?? "").trim();
    if (!s) return "Email address is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s))
      return "That doesn't look like a valid email — please check the format.";
    return null;
  }

  if (cur.type === "url") {
    const s = (val as string ?? "").trim();
    if (!s) return null;
    const withProto = /^https?:\/\//i.test(s) ? s : `https://${s}`;
    try {
      const u = new URL(withProto);
      if (!u.hostname.includes(".")) return "Enter a valid URL — e.g. yourbrand.com";
    } catch {
      return "Enter a valid URL — e.g. yourbrand.com";
    }
    return null;
  }

  if (!cur.required) return null;

  if (cur.type === "multiselect") {
    const arr = (val as string[]) ?? [];
    if (!arr.length) return "Please select at least one option.";
    if (arr.includes("Other") && !(otherText[cur.id] ?? "").trim())
      return "Please describe what you mean by 'Other'.";
    return null;
  }

  if (cur.type === "select") {
    const s = (val as string ?? "").trim();
    if (!s) return "Please choose an option.";
    if (s === "Other" && !(otherText[cur.id] ?? "").trim())
      return "Please describe what you mean by 'Other'.";
    return null;
  }

  if (!(val as string ?? "").trim()) return "This field is required.";
  return null;
}

export function BrandFormEngine({
  formTitle,
  formSubtitle,
  steps,
  apiEndpoint,
  backHref = "/brand",
}: BrandFormEngineProps) {
  const TOTAL = steps.length;
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [answers, setAnswers] = useState<Record<string, AnswerValue>>({});
  const [otherText, setOtherText] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [fieldError, setFieldError] = useState<string | null>(null);

  const inputRef      = useRef<HTMLInputElement>(null);
  const textareaRef   = useRef<HTMLTextAreaElement>(null);
  const otherInputRef = useRef<HTMLInputElement>(null);

  const current = steps[step];
  const answer  = answers[current?.id ?? ""] ?? (current?.type === "multiselect" ? [] : "");
  const progress = submitted ? 100 : (step / TOTAL) * 100;

  const setAns = useCallback((val: AnswerValue) => {
    setAnswers(prev => ({ ...prev, [current.id]: val }));
    setFieldError(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current?.id]);

  const goNext = useCallback(async () => {
    const err = validateStep(step, steps, answers, otherText);
    if (err) { setFieldError(err); return; }
    setFieldError(null);

    if (step < TOTAL - 1) {
      gtagEvent("brand_form_step_complete", { step_index: step, step_id: current.id });
      setDir(1);
      setStep(s => s + 1);
    } else {
      setSending(true);
      setSendError(null);

      // In local Vite dev the /api/* serverless functions don't run — skip the
      // network call so the success screen is always reachable during development.
      if (import.meta.env.DEV) {
        await new Promise(r => setTimeout(r, 600)); // brief fake delay
        gtagEvent("brand_form_submit", { form: formTitle });
        setSending(false);
        setSubmitted(true);
        return;
      }

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000);
      try {
        const res = await fetch(apiEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ answers, otherText }),
          signal: controller.signal,
        });
        clearTimeout(timeout);
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error((data as { error?: string }).error || "server error");
        }
        gtagEvent("brand_form_submit", { form: formTitle });
        setSubmitted(true);
      } catch (err) {
        clearTimeout(timeout);
        const isTimeout = err instanceof Error && err.name === "AbortError";
        setSendError(isTimeout
          ? "Request timed out — please check your connection and try again."
          : "Something went wrong. Please try again.");
      } finally {
        setSending(false);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, steps, answers, otherText, apiEndpoint, formTitle, TOTAL]);

  const goPrev = useCallback(() => {
    if (step > 0) { setDir(-1); setStep(s => s - 1); setFieldError(null); }
  }, [step]);

  const handleSelectChoice = useCallback((opt: string) => {
    setAns(opt);
    if (opt === "Other") {
      setTimeout(() => otherInputRef.current?.focus(), 100);
      return;
    }
    setTimeout(() => {
      setDir(1);
      if (step < TOTAL - 1) setStep(s => s + 1);
    }, 350);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, TOTAL, setAns]);

  const toggleMulti = useCallback((opt: string) => {
    const cur = (answers[current.id] as string[]) ?? [];
    const next = cur.includes(opt) ? cur.filter(o => o !== opt) : [...cur, opt];
    setAns(next);
    if (opt === "Other" && !cur.includes("Other"))
      setTimeout(() => otherInputRef.current?.focus(), 100);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answers, current?.id, setAns]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { gtagEvent("brand_form_start", { form: formTitle }); }, []);
  useEffect(() => { setFieldError(null); }, [step]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (submitted) return;
      if (
        e.key === "Enter" &&
        current.type !== "textarea" &&
        current.type !== "select" &&
        current.type !== "multiselect"
      ) goNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goNext, current?.type, submitted]);

  useEffect(() => {
    if (submitted) return;
    const t = setTimeout(() => {
      if (current.type === "textarea") textareaRef.current?.focus();
      else if (["text", "url", "email"].includes(current.type)) inputRef.current?.focus();
    }, 450);
    return () => clearTimeout(t);
  }, [step, current?.type, submitted]);

  // ── Input renderer ────────────────────────────────────────────────────────
  const renderInput = () => {
    if (!current) return null;
    const hasError = !!fieldError;
    const inputBase =
      "w-full bg-transparent border-b-2 outline-none text-xl sm:text-2xl pb-3 pt-1 transition-colors duration-300 font-display tracking-tight";

    if (["text", "url", "email"].includes(current.type)) {
      return (
        <div className="w-full max-w-xl">
          <input
            ref={inputRef}
            type={current.type === "url" ? "text" : current.type}
            value={answer as string}
            onChange={e => setAns(e.target.value)}
            placeholder={current.placeholder}
            className={inputBase}
            style={{ color: T.text, borderColor: hasError ? T.error : T.border, caretColor: T.deep }}
            onFocus={e => (e.currentTarget.style.borderColor = hasError ? T.error : T.teal)}
            onBlur={e => (e.currentTarget.style.borderColor = hasError ? T.error : T.border)}
            onKeyDown={e => { if (e.key === "Enter") goNext(); }}
          />
          {current.hint && <p className="mt-3 text-sm" style={{ color: T.textFaint }}>{current.hint}</p>}
          {!hasError && (
            <p className="mt-5 text-xs tracking-wide" style={{ color: T.textFaint }}>
              Press{" "}
              <kbd className="px-1.5 py-0.5 rounded font-mono text-[10px]"
                style={{ border: `1px solid ${T.border}`, color: T.textSubtle }}>
                Enter ↵
              </kbd>{" "}
              to continue
            </p>
          )}
        </div>
      );
    }

    if (current.type === "textarea") {
      return (
        <div className="w-full max-w-xl">
          <textarea
            ref={textareaRef}
            value={answer as string}
            onChange={e => {
              setAns(e.target.value);
              e.target.style.height = "auto";
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
            placeholder={current.placeholder}
            rows={1}
            className={`${inputBase} resize-none leading-relaxed`}
            style={{ color: T.text, borderColor: hasError ? T.error : T.border, caretColor: T.deep, overflow: "hidden" }}
            onFocus={e => (e.currentTarget.style.borderColor = hasError ? T.error : T.teal)}
            onBlur={e => (e.currentTarget.style.borderColor = hasError ? T.error : T.border)}
          />
          {current.hint && <p className="mt-2 text-sm" style={{ color: T.textFaint }}>{current.hint}</p>}
          {!hasError && (
            <p className="mt-4 text-xs" style={{ color: T.textFaint }}>
              <kbd className="px-1.5 py-0.5 rounded font-mono text-[10px]"
                style={{ border: `1px solid ${T.border}`, color: T.textSubtle }}>
                Shift + Enter
              </kbd>{" "}
              for new line
            </p>
          )}
        </div>
      );
    }

    if (current.type === "select") {
      const showOther = answer === "Other";
      return (
        <div className="flex flex-col gap-4 max-w-xl">
          <div className="flex flex-wrap gap-3">
            {current.options?.map((opt, i) => {
              const sel = answer === opt;
              return (
                <button key={opt} onClick={() => handleSelectChoice(opt)}
                  className="flex items-center gap-2.5 px-5 py-3 rounded-xl border text-sm font-medium transition-all duration-200 cursor-pointer"
                  style={{ background: sel ? T.selBg : T.optionBg, color: sel ? T.selText : T.textSubtle, borderColor: sel ? T.selBorder : T.border, boxShadow: sel ? "0 0 24px -4px rgba(145,206,191,0.5)" : "none" }}
                  onMouseEnter={e => { if (!sel) { e.currentTarget.style.borderColor = T.borderHover; e.currentTarget.style.background = T.optionBgHov; } }}
                  onMouseLeave={e => { if (!sel) { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.background = T.optionBg; } }}
                >
                  <span className="text-[10px] font-mono shrink-0 w-4 h-4 rounded flex items-center justify-center border"
                    style={{ borderColor: sel ? "rgba(19,24,24,0.25)" : T.border, color: sel ? "rgba(19,24,24,0.5)" : T.textFaint, background: sel ? "rgba(19,24,24,0.07)" : "transparent" }}>
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
              <input ref={otherInputRef} type="text" value={otherText[current.id] ?? ""}
                onChange={e => { setOtherText(p => ({ ...p, [current.id]: e.target.value })); setFieldError(null); }}
                placeholder="Please describe…"
                className="w-full bg-transparent border-b-2 outline-none text-lg pb-2 pt-1 transition-colors duration-300 font-display tracking-tight"
                style={{ color: T.text, borderColor: T.border, caretColor: T.deep }}
                onFocus={e => (e.currentTarget.style.borderColor = T.teal)}
                onBlur={e => (e.currentTarget.style.borderColor = T.border)}
                onKeyDown={e => { if (e.key === "Enter") goNext(); }}
              />
            </motion.div>
          )}
        </div>
      );
    }

    if (current.type === "multiselect") {
      const selected = answer as string[];
      const showOther = selected.includes("Other");
      return (
        <div className="flex flex-col gap-4 max-w-xl w-full">
          <div className="flex flex-wrap gap-3">
            {current.options?.map(opt => {
              const sel = selected.includes(opt);
              return (
                <button key={opt} onClick={() => toggleMulti(opt)}
                  className="flex items-center gap-2.5 px-5 py-3 rounded-xl border text-sm font-medium transition-all duration-200 cursor-pointer"
                  style={{ background: sel ? T.selBg : T.optionBg, color: sel ? T.selText : T.textSubtle, borderColor: sel ? T.selBorder : T.border, boxShadow: sel ? "0 0 24px -4px rgba(145,206,191,0.5)" : "none" }}
                  onMouseEnter={e => { if (!sel) { e.currentTarget.style.borderColor = T.borderHover; e.currentTarget.style.background = T.optionBgHov; } }}
                  onMouseLeave={e => { if (!sel) { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.background = T.optionBg; } }}
                >
                  <span className="w-4 h-4 rounded border flex items-center justify-center shrink-0"
                    style={{ borderColor: sel ? "rgba(19,24,24,0.25)" : T.border, background: sel ? "rgba(19,24,24,0.07)" : "transparent", color: T.selText }}>
                    {sel && <Check size={10} strokeWidth={3} />}
                  </span>
                  {opt}
                </button>
              );
            })}
          </div>
          {showOther && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
              <input ref={otherInputRef} type="text" value={otherText[current.id] ?? ""}
                onChange={e => { setOtherText(p => ({ ...p, [current.id]: e.target.value })); setFieldError(null); }}
                placeholder="Please describe…"
                className="w-full bg-transparent border-b-2 outline-none text-lg pb-2 pt-1 transition-colors duration-300 font-display tracking-tight"
                style={{ color: T.text, borderColor: T.border, caretColor: T.deep }}
                onFocus={e => (e.currentTarget.style.borderColor = T.teal)}
                onBlur={e => (e.currentTarget.style.borderColor = T.border)}
              />
            </motion.div>
          )}
          {selected.length > 0 && !hasError && (
            <p className="text-xs" style={{ color: T.textFaint }}>
              {selected.length} selected · click OK to continue
            </p>
          )}
        </div>
      );
    }

    return null;
  };

  // ── Back button helper ────────────────────────────────────────────────────
  const BackBtn = ({ disabled = false }: { disabled?: boolean }) =>
    step === 0 ? (
      <a href={backHref}
        className="flex items-center gap-1.5 px-3 h-11 text-sm font-medium transition-all duration-200 no-underline"
        style={{ color: T.textMuted }}
        onMouseEnter={e => (e.currentTarget.style.color = T.text)}
        onMouseLeave={e => (e.currentTarget.style.color = T.textMuted)}
      >
        <ArrowLeft size={14} /> Back
      </a>
    ) : (
      <button onClick={goPrev} disabled={disabled}
        className="flex items-center gap-1.5 px-3 h-11 text-sm font-medium transition-all duration-200"
        style={{ color: T.textMuted, background: "transparent", border: "none", cursor: disabled ? "not-allowed" : "pointer" }}
        onMouseEnter={e => { if (!disabled) e.currentTarget.style.color = T.text; }}
        onMouseLeave={e => (e.currentTarget.style.color = T.textMuted)}
      >
        <ArrowLeft size={14} /> Back
      </button>
    );

  // ── Success ───────────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col" style={{ background: T.bg }}>
        <div className="fixed top-0 inset-x-0 h-[3px] z-50" style={{ background: T.trackBg }}>
          <motion.div className="h-full"
            style={{ background: `linear-gradient(90deg, ${T.deep} 0%, ${T.dark} 50%, ${T.teal} 100%)` }}
            initial={{ width: "90%" }} animate={{ width: "100%" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
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
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-8"
              style={{ background: "rgba(0,98,92,0.08)", border: "1.5px solid rgba(0,98,92,0.2)" }}>
              <Check size={28} style={{ color: T.deep }} strokeWidth={2} />
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-normal tracking-[-0.025em] leading-[1.1]"
              style={{ color: T.text }}>
              We've got it.
            </h2>
            <p className="mt-5 text-lg leading-relaxed" style={{ color: T.textMuted }}>
              Thanks for applying. Our team reviews every submission personally — expect to hear from us within 24 hours.
            </p>
            <a href="/#system"
              className="mt-10 inline-flex items-center gap-2 rounded-full px-6 h-12 text-sm font-medium group no-underline"
              style={{ background: "rgba(0,98,92,0.06)", color: T.deep, border: "1px solid rgba(0,98,92,0.15)", transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.background = T.deep; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(0,98,92,0.06)"; e.currentTarget.style.color = T.deep; }}
            >
              While you wait — see how the system works
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </a>
          </motion.div>
        </div>
      </div>
    );
  }

  // ── Form ──────────────────────────────────────────────────────────────────
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
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Header */}
      <header className="fixed top-10 inset-x-0 z-40 flex items-center justify-between px-6 sm:px-10 py-3">
        <a href="/" className="opacity-80 hover:opacity-100 transition-opacity">
          <Logo variant="dark" />
        </a>
        <div className="flex items-center gap-3">
          <span className="hidden sm:block text-[11px] font-semibold tracking-[0.1em] uppercase rounded-full px-3 py-1"
            style={{ color: T.chipText, background: T.chipBg, border: `1px solid ${T.chipBorder}` }}>
            {formTitle}
          </span>
          <span className="text-sm font-mono tabular-nums" style={{ color: T.textFaint }}>
            {String(step + 1).padStart(2, "0")} / {String(TOTAL).padStart(2, "0")}
          </span>
        </div>
      </header>

      {/* Main */}
      <div className="flex-1 flex items-center justify-center px-6 sm:px-10 pt-32 pb-28">
        <div className="w-full max-w-2xl">

          {/* Subtitle on step 0 */}
          <AnimatePresence>
            {step === 0 && (
              <motion.p
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="text-base mb-6 pl-10 italic" style={{ color: T.textMuted }}
              >
                {formSubtitle}
              </motion.p>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait" custom={dir}>
            <motion.div key={step} custom={dir} variants={slideVariants}
              initial="enter" animate="center" exit="exit"
              className="flex flex-col gap-8"
            >
              {/* Question */}
              <div className="flex gap-5 items-start">
                <span className="font-mono text-base mt-1 shrink-0 tabular-nums" style={{ color: `${T.deep}80` }}>
                  {String(step + 1).padStart(2, "0")} →
                </span>
                <div>
                  <h2 className="font-display text-3xl sm:text-4xl lg:text-[42px] font-normal leading-[1.08] tracking-[-0.025em]"
                    style={{ color: T.text }}>
                    {current.question}
                  </h2>
                  {current.optional && (
                    <p className="mt-2 text-sm" style={{ color: T.textFaint }}>Optional</p>
                  )}
                </div>
              </div>

              {/* Input */}
              <div className="pl-10">{renderInput()}</div>

              {/* OK + Back (hidden for auto-advance selects) */}
              {(current.type !== "select" || answer === "Other") && (
                <div className="pl-10 flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <BackBtn disabled={sending} />
                    <button onClick={goNext} disabled={sending}
                      className="px-6 h-11 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2"
                      style={{
                        background: sending ? T.trackBg : T.deep,
                        color: sending ? T.textMuted : "#fff",
                        cursor: sending ? "not-allowed" : "pointer",
                        boxShadow: sending ? "none" : "0 8px 28px -8px rgba(0,98,92,0.35)",
                        border: "none",
                      }}
                      onMouseEnter={e => { if (!sending) e.currentTarget.style.background = T.dark; }}
                      onMouseLeave={e => { if (!sending) e.currentTarget.style.background = T.deep; }}
                    >
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
                  {fieldError && (
                    <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                      className="text-sm font-medium flex items-center gap-1.5" style={{ color: T.error }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                      </svg>
                      {fieldError}
                    </motion.p>
                  )}
                  {sendError && <p className="text-sm" style={{ color: T.error }}>{sendError}</p>}
                </div>
              )}

              {/* Back only — for auto-advance selects */}
              {current.type === "select" && answer !== "Other" && (
                <div className="pl-10">
                  <BackBtn />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Step dots */}
      <div className="fixed bottom-8 inset-x-0 flex justify-center pointer-events-none">
        <div className="flex items-center gap-1.5">
          {steps.map((_, i) => (
            <div key={i} className="rounded-full transition-all duration-300"
              style={{
                width: i === step ? 20 : 6,
                height: 6,
                background: i < step ? T.dotDone : i === step ? T.deep : T.dotInactive,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
