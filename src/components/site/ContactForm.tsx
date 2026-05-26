import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "./Logo";
import { ArrowLeft, Check, ChevronLeft, ChevronRight } from "lucide-react";

type AnswerValue = string | string[];

interface StepDef {
  section: number;
  part: "A" | "B" | null;
  sectionLabel: string;
  id: string;
  type: "text" | "email" | "url" | "select" | "multiselect" | "textarea" | "datepicker" | "timepicker";
  question: string;
  placeholder?: string;
  hint?: string;
  options?: string[];
  required?: boolean;
}

const STEPS: StepDef[] = [
  // ── Section 1: Brand Basics ──
  {
    section: 1, part: null, sectionLabel: "Brand Basics",
    id: "name", type: "text",
    question: "What is your name?",
    placeholder: "Your full name",
    required: true,
  },
  {
    section: 1, part: null, sectionLabel: "Brand Basics",
    id: "email", type: "email",
    question: "Write your email address",
    placeholder: "you@brand.com",
    required: true,
  },
  {
    section: 1, part: null, sectionLabel: "Brand Basics",
    id: "brandName", type: "text",
    question: "What's your brand name?",
    placeholder: "e.g. Glow Ritual",
    required: true,
  },
  {
    section: 1, part: null, sectionLabel: "Brand Basics",
    id: "websiteUrl", type: "url",
    question: "What's your website URL?",
    placeholder: "yourbrand.com",
    // optional — validated only if filled
  },
  {
    section: 1, part: null, sectionLabel: "Brand Basics",
    id: "handles", type: "text",
    question: "Your Instagram & TikTok handles?",
    placeholder: "@yourbrand, @yourtiktok",
    hint: "Separate with a comma",
    required: true,
  },
  {
    section: 1, part: null, sectionLabel: "Brand Basics",
    id: "category", type: "multiselect",
    question: "Primary product category?",
    options: ["Skincare", "Haircare", "Makeup", "Bodycare", "Wellness", "Other"],
    required: true,
  },
  // ── Section 2A: Where You Are Now ──
  {
    section: 2, part: "A", sectionLabel: "Where You Are Now",
    id: "adSpend", type: "multiselect",
    question: "Monthly ad spend range?",
    options: ["Under $5k", "$5k – $15k", "$15k – $30k", "$30k – $75k", "$75k+", "Other"],
    required: true,
  },
  {
    section: 2, part: "A", sectionLabel: "Where You Are Now",
    id: "platforms", type: "multiselect",
    question: "Platforms you're currently running paid ads on?",
    options: ["Meta", "TikTok", "Google", "Other"],
    required: true,
  },
  // ── Section 2B: Where You Are Now ──
  {
    section: 2, part: "B", sectionLabel: "Where You Are Now",
    id: "creativeHandling", type: "multiselect",
    question: "How are you currently handling creative?",
    options: ["In-house", "Freelancers", "Agency", "Mix", "Nothing structured"],
    required: true,
  },
  {
    section: 2, part: "B", sectionLabel: "Where You Are Now",
    id: "challenge", type: "textarea",
    question: "Biggest creative challenge right now?",
    placeholder: "Tell us in 2–3 sentences…",
    hint: "Be as specific as you like",
    required: true,
  },
  // ── Section 3: Schedule ──
  {
    section: 3, part: null, sectionLabel: "Schedule",
    id: "scheduledDate", type: "datepicker",
    question: "Pick a date for your call",
    hint: "Monday – Friday only · US Eastern Time",
    required: true,
  },
  {
    section: 3, part: null, sectionLabel: "Schedule",
    id: "scheduledTime", type: "timepicker",
    question: "Choose a time slot",
    hint: "9 AM – 6 PM · US Eastern Time · 30-min sessions",
    required: true,
  },
];

const TOTAL = STEPS.length;

// ── Analytics ─────────────────────────────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function gtagEvent(name: string, params?: Record<string, string | number>) {
  if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
    (window as any).gtag("event", name, params ?? {});
  }
}

const TIME_SLOTS = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "1:00 PM",  "1:30 PM",  "2:00 PM",  "2:30 PM",
  "3:00 PM", "3:30 PM",  "4:00 PM",  "4:30 PM",  "5:00 PM",  "5:30 PM",
];

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
  divider:     "rgba(19,24,24,0.12)",
  dotInactive: "rgba(19,24,24,0.12)",
  dotDone:     "rgba(0,98,92,0.35)",
  error:       "#c0392b",
};

function validateStep(
  step: number,
  answers: Record<string, AnswerValue>,
  otherText: Record<string, string>
): string | null {
  const cur = STEPS[step];
  if (!cur) return null;
  const val = answers[cur.id];

  if (cur.id === "email") {
    const s = (val as string ?? "").trim();
    if (!s) return "Email address is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s))
      return "That doesn't look like a valid email — please check the format.";
    return null;
  }

  if (cur.id === "websiteUrl") {
    const s = (val as string ?? "").trim();
    if (!s) return null;
    const withProto = /^https?:\/\//i.test(s) ? s : `https://${s}`;
    try {
      const u = new URL(withProto);
      if (!u.hostname.includes("."))
        return "Enter a valid URL — e.g. yourbrand.com or yourbrand.beauty";
    } catch {
      return "Enter a valid URL — e.g. yourbrand.com or yourbrand.beauty";
    }
    return null;
  }

  if (cur.id === "scheduledDate") {
    if (!(val as string ?? "").trim()) return "Please select a date.";
    return null;
  }

  if (cur.id === "scheduledTime") {
    if (!(val as string ?? "").trim()) return "Please select a time slot.";
    return null;
  }

  if (cur.required) {
    if (cur.type === "multiselect") {
      const arr = (val as string[]) ?? [];
      if (!arr.length) return "Please select at least one option.";
      if (arr.includes("Other") && !(otherText[cur.id] ?? "").trim())
        return "Please describe what you mean by 'Other'.";
    } else if (cur.type === "select") {
      const s = (val as string ?? "").trim();
      if (!s) return "Please choose an option.";
      if (s === "Other" && !(otherText[cur.id] ?? "").trim())
        return "Please describe what you mean by 'Other'.";
    } else {
      if (!(val as string ?? "").trim()) return "This field is required.";
    }
  }

  return null;
}

// ── Date Picker ───────────────────────────────────────────────────────────────
function DatePickerInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const todayRef = useRef(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  });
  const today = todayRef.current();

  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const monthLabel = new Date(viewYear, viewMonth, 1).toLocaleString("en-US", {
    month: "long", year: "numeric",
  });
  const firstDow = new Date(viewYear, viewMonth, 1).getDay(); // 0=Sun
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  function isDisabled(day: number) {
    const d = new Date(viewYear, viewMonth, day);
    if (d < today) return true;
    const dow = d.getDay();
    return dow === 0 || dow === 6;
  }

  function formatVal(day: number) {
    return new Date(viewYear, viewMonth, day).toLocaleDateString("en-US", {
      weekday: "long", month: "long", day: "numeric", year: "numeric",
    });
  }

  function isSelected(day: number) { return value === formatVal(day); }
  function isToday(day: number) {
    const d = new Date(viewYear, viewMonth, day);
    return d.getTime() === today.getTime();
  }

  const canPrev =
    viewYear > today.getFullYear() || viewMonth > today.getMonth();

  function prevMonth() {
    if (!canPrev) return;
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
    else setViewMonth(m => m - 1);
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
    else setViewMonth(m => m + 1);
  }

  const cells: (number | null)[] = [
    ...Array(firstDow).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const btnBase: React.CSSProperties = {
    width: "100%", aspectRatio: "1", borderRadius: 8,
    border: "1.5px solid transparent", fontSize: 13,
    display: "flex", alignItems: "center", justifyContent: "center",
    cursor: "pointer", transition: "background 0.15s, color 0.15s",
  };

  return (
    <div style={{ maxWidth: 294 }}>
      {/* Month nav */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <button
          type="button"
          onClick={prevMonth}
          disabled={!canPrev}
          style={{
            background: "transparent", border: "none", cursor: canPrev ? "pointer" : "not-allowed",
            color: canPrev ? T.text : T.textFaint, padding: 4, borderRadius: 6,
          }}
        >
          <ChevronLeft size={16} />
        </button>
        <span style={{ fontSize: 14, fontWeight: 600, color: T.text }}>{monthLabel}</span>
        <button
          type="button"
          onClick={nextMonth}
          style={{ background: "transparent", border: "none", cursor: "pointer", color: T.text, padding: 4, borderRadius: 6 }}
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Day-of-week headers */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2, marginBottom: 4 }}>
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
          <div key={d} style={{ textAlign: "center", fontSize: 11, color: T.textFaint, padding: "4px 0" }}>
            {d}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2 }}>
        {cells.map((day, i) =>
          day === null ? (
            <div key={`e-${i}`} />
          ) : (
            <button
              key={day}
              type="button"
              disabled={isDisabled(day)}
              onClick={() => { if (!isDisabled(day)) onChange(formatVal(day)); }}
              style={{
                ...btnBase,
                background: isSelected(day) ? T.deep : "transparent",
                color: isSelected(day) ? "#fff" : isDisabled(day) ? T.textFaint : T.text,
                fontWeight: isSelected(day) ? 600 : 400,
                opacity: isDisabled(day) ? 0.3 : 1,
                cursor: isDisabled(day) ? "default" : "pointer",
                borderColor: isToday(day) && !isSelected(day) ? T.border : "transparent",
              }}
              onMouseEnter={e => {
                if (!isDisabled(day) && !isSelected(day))
                  e.currentTarget.style.background = T.chipBg;
              }}
              onMouseLeave={e => {
                if (!isSelected(day)) e.currentTarget.style.background = "transparent";
              }}
            >
              {day}
            </button>
          )
        )}
      </div>
    </div>
  );
}

// ── Time Picker ───────────────────────────────────────────────────────────────
function TimePickerInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div style={{ maxWidth: 340 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
        {TIME_SLOTS.map((slot) => {
          const sel = value === slot;
          return (
            <button
              key={slot}
              type="button"
              onClick={() => onChange(sel ? "" : slot)}
              style={{
                padding: "10px 6px",
                borderRadius: 10,
                border: `1.5px solid ${sel ? T.deep : T.border}`,
                background: sel ? T.deep : T.optionBg,
                color: sel ? "#fff" : T.textSubtle,
                fontSize: 13,
                fontWeight: sel ? 600 : 400,
                cursor: "pointer",
                transition: "all 0.15s",
              }}
              onMouseEnter={e => {
                if (!sel) {
                  e.currentTarget.style.borderColor = T.borderHover;
                  e.currentTarget.style.background = T.optionBgHov;
                }
              }}
              onMouseLeave={e => {
                if (!sel) {
                  e.currentTarget.style.borderColor = T.border;
                  e.currentTarget.style.background = T.optionBg;
                }
              }}
            >
              {slot}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Main Form ─────────────────────────────────────────────────────────────────
export function ContactForm() {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [answers, setAnswers] = useState<Record<string, AnswerValue>>({});
  const [otherText, setOtherText] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [fieldError, setFieldError] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const otherInputRef = useRef<HTMLInputElement>(null);

  const current = STEPS[step];
  const answer = answers[current?.id ?? ""] ?? (current?.type === "multiselect" ? [] : "");
  const progress = submitted ? 100 : (step / TOTAL) * 100;

  const setAns = useCallback(
    (val: AnswerValue) => {
      setAnswers((prev) => ({ ...prev, [current.id]: val }));
      setFieldError(null);
    },
    [current?.id]
  );

  const goNext = useCallback(async () => {
    const err = validateStep(step, answers, otherText);
    if (err) { setFieldError(err); return; }
    setFieldError(null);

    if (step < TOTAL - 1) {
      gtagEvent("contact_form_step_complete", { step_index: step, step_id: current.id });
      setDir(1);
      setStep((s) => s + 1);
    } else {
      setSending(true);
      setSendError(null);
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000);
      try {
        const res = await fetch("/api/contact", {
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
        gtagEvent("contact_form_submit");
        setSubmitted(true);
      } catch (err) {
        clearTimeout(timeout);
        const isTimeout = err instanceof Error && err.name === "AbortError";
        gtagEvent("contact_form_error", { error_type: isTimeout ? "timeout" : "server" });
        setSendError(
          isTimeout
            ? "Request timed out — please check your connection and try again."
            : "Something went wrong sending your submission. Please try again."
        );
      } finally {
        setSending(false);
      }
    }
  }, [step, answers, otherText]);

  const goPrev = useCallback(() => {
    if (step > 0) { setDir(-1); setStep((s) => s - 1); setFieldError(null); }
  }, [step]);

  const handleSelectChoice = useCallback(
    (opt: string) => {
      setAns(opt);
      if (opt === "Other") {
        setTimeout(() => otherInputRef.current?.focus(), 100);
        return;
      }
      setTimeout(() => { setDir(1); if (step < TOTAL - 1) setStep((s) => s + 1); else setSubmitted(true); }, 350);
    },
    [step, setAns]
  );

  const toggleMulti = useCallback(
    (opt: string) => {
      const cur = (answers[current.id] as string[]) ?? [];
      const next = cur.includes(opt) ? cur.filter((o) => o !== opt) : [...cur, opt];
      setAns(next);
      if (opt === "Other" && !cur.includes("Other"))
        setTimeout(() => otherInputRef.current?.focus(), 100);
    },
    [answers, current?.id, setAns]
  );

  // Fire once when the form first mounts
  useEffect(() => { gtagEvent("contact_form_start"); }, []);

  useEffect(() => { setFieldError(null); }, [step]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (submitted) return;
      if (
        e.key === "Enter" &&
        current.type !== "textarea" &&
        current.type !== "select" &&
        current.type !== "multiselect" &&
        current.type !== "datepicker" &&
        current.type !== "timepicker"
      ) {
        goNext();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goNext, current?.type, submitted]);

  useEffect(() => {
    if (submitted) return;
    const t = setTimeout(() => {
      if (current.type === "textarea") textareaRef.current?.focus();
      else if (current.type === "text" || current.type === "url" || current.type === "email")
        inputRef.current?.focus();
    }, 450);
    return () => clearTimeout(t);
  }, [step, current?.type, submitted]);

  const renderInput = () => {
    if (!current) return null;
    const hasError = !!fieldError;
    const inputBase =
      "w-full bg-transparent border-b-2 outline-none text-xl sm:text-2xl pb-3 pt-1 transition-colors duration-300 font-display tracking-tight";

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
            style={{ color: T.text, borderColor: hasError ? T.error : T.border, caretColor: T.deep }}
            onFocus={(e) => (e.currentTarget.style.borderColor = hasError ? T.error : T.teal)}
            onBlur={(e) => (e.currentTarget.style.borderColor = hasError ? T.error : T.border)}
            onKeyDown={(e) => { if (e.key === "Enter") goNext(); }}
          />
          {current.hint && <p className="mt-3 text-sm" style={{ color: T.textFaint }}>{current.hint}</p>}
          {!hasError && (
            <p className="mt-5 text-xs tracking-wide" style={{ color: T.textFaint }}>
              Press{" "}
              <kbd className="px-1.5 py-0.5 rounded font-mono text-[10px]" style={{ border: `1px solid ${T.border}`, color: T.textMuted }}>
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
            onChange={(e) => {
              setAns(e.target.value);
              e.target.style.height = "auto";
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
            placeholder={current.placeholder}
            rows={1}
            className={`${inputBase} resize-none leading-relaxed`}
            style={{ color: T.text, borderColor: hasError ? T.error : T.border, caretColor: T.deep, overflow: "hidden" }}
            onFocus={(e) => (e.currentTarget.style.borderColor = hasError ? T.error : T.teal)}
            onBlur={(e) => (e.currentTarget.style.borderColor = hasError ? T.error : T.border)}
          />
          {current.hint && <p className="mt-2 text-sm" style={{ color: T.textFaint }}>{current.hint}</p>}
          {!hasError && (
            <p className="mt-4 text-xs" style={{ color: T.textFaint }}>
              <kbd className="px-1.5 py-0.5 rounded font-mono text-[10px]" style={{ border: `1px solid ${T.border}`, color: T.textMuted }}>
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
                  <span className="text-[10px] font-mono shrink-0 w-4 h-4 rounded flex items-center justify-center border transition-colors"
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
                onChange={(e) => { setOtherText(p => ({ ...p, [current.id]: e.target.value })); setFieldError(null); }}
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
            {current.options?.map((opt) => {
              const sel = selected.includes(opt);
              return (
                <button key={opt} onClick={() => toggleMulti(opt)}
                  className="flex items-center gap-2.5 px-5 py-3 rounded-xl border text-sm font-medium transition-all duration-200 cursor-pointer"
                  style={{ background: sel ? T.selBg : T.optionBg, color: sel ? T.selText : T.textSubtle, borderColor: sel ? T.selBorder : T.border, boxShadow: sel ? "0 0 24px -4px rgba(145,206,191,0.5)" : "none" }}
                  onMouseEnter={e => { if (!sel) { e.currentTarget.style.borderColor = T.borderHover; e.currentTarget.style.background = T.optionBgHov; } }}
                  onMouseLeave={e => { if (!sel) { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.background = T.optionBg; } }}
                >
                  <span className="w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors"
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
                onChange={(e) => { setOtherText(p => ({ ...p, [current.id]: e.target.value })); setFieldError(null); }}
                placeholder="Please describe…"
                className="w-full bg-transparent border-b-2 outline-none text-lg pb-2 pt-1 transition-colors duration-300 font-display tracking-tight"
                style={{ color: T.text, borderColor: T.border, caretColor: T.deep }}
                onFocus={e => (e.currentTarget.style.borderColor = T.teal)}
                onBlur={e => (e.currentTarget.style.borderColor = T.border)}
              />
            </motion.div>
          )}
          {selected.length > 0 && !hasError && (
            <p className="text-xs" style={{ color: T.textFaint }}>{selected.length} selected · click OK to continue</p>
          )}
        </div>
      );
    }

    if (current.type === "datepicker") {
      return (
        <div className="w-full max-w-xl">
          <DatePickerInput value={answer as string} onChange={(v) => setAns(v)} />
          {current.hint && (
            <p className="mt-4 text-sm flex items-center gap-1.5" style={{ color: T.textFaint }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              {current.hint}
            </p>
          )}
        </div>
      );
    }

    if (current.type === "timepicker") {
      return (
        <div className="w-full max-w-xl">
          <TimePickerInput value={answer as string} onChange={(v) => setAns(v)} />
          {current.hint && (
            <p className="mt-4 text-sm flex items-center gap-1.5" style={{ color: T.textFaint }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              {current.hint}
            </p>
          )}
        </div>
      );
    }

    return null;
  };

  // ── Thank you / Booking Confirmed screen ──────────────────────────────────
  if (submitted) {
    const bookedDate = answers["scheduledDate"] as string ?? "";
    const bookedTime = answers["scheduledTime"] as string ?? "";
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
            <h2 className="font-display text-4xl sm:text-5xl font-normal tracking-tight leading-tight" style={{ color: T.text }}>
              Thank you —<br />Booking confirmed.
            </h2>
            {bookedDate && bookedTime && (
              <div className="mt-6 inline-flex items-center gap-3 rounded-2xl px-5 py-4"
                style={{ background: "rgba(0,98,92,0.06)", border: "1px solid rgba(0,98,92,0.12)" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={T.deep} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                <span className="text-sm font-medium" style={{ color: T.deep }}>
                  {bookedDate} · {bookedTime} ET
                </span>
              </div>
            )}
            <p className="mt-5 text-lg leading-relaxed" style={{ color: T.textMuted }}>
              We've received your request and will send a calendar invite to your email shortly.
            </p>
            <a href="/"
              className="mt-10 inline-flex items-center gap-2 rounded-full px-7 h-12 text-sm font-medium transition-colors"
              style={{ background: T.deep, color: "#fff" }}
              onMouseEnter={e => (e.currentTarget.style.background = T.dark)}
              onMouseLeave={e => (e.currentTarget.style.background = T.deep)}
            >
              Back to PlotWise
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
          {[60, 80].map(pct => (
            <div key={pct} className="absolute top-0 bottom-0 w-px z-10"
              style={{ left: `${pct}%`, background: T.divider }} />
          ))}
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
                  {current.id === "websiteUrl" && (
                    <p className="mt-2 text-sm" style={{ color: T.textFaint }}>Optional</p>
                  )}
                </div>
              </div>

              {/* Input */}
              <div className="pl-10">{renderInput()}</div>

              {/* OK / Submit */}
              {(current.type !== "select" || answer === "Other") && (
                <div className="pl-10 flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    {step > 0 && (
                      <button onClick={goPrev} disabled={sending}
                        className="flex items-center gap-1.5 px-3 h-11 text-sm font-medium transition-all duration-200"
                        style={{ color: T.textMuted, background: "transparent", border: "none", cursor: sending ? "not-allowed" : "pointer" }}
                        onMouseEnter={e => { if (!sending) e.currentTarget.style.color = T.text; }}
                        onMouseLeave={e => (e.currentTarget.style.color = T.textMuted)}
                      >
                        <ArrowLeft size={14} /> Back
                      </button>
                    )}
                    <button onClick={goNext} disabled={sending}
                      className="px-6 h-11 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2"
                      style={{
                        background: sending ? T.trackBg : T.deep,
                        color: sending ? T.textFaint : "#fff",
                        cursor: sending ? "not-allowed" : "pointer",
                        boxShadow: sending ? "none" : "0 8px 28px -8px rgba(0,98,92,0.35)",
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
                      className="text-sm font-medium flex items-center gap-1.5"
                      style={{ color: T.error }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                      </svg>
                      {fieldError}
                    </motion.p>
                  )}

                  {sendError && (
                    <p className="text-sm" style={{ color: T.error }}>{sendError}</p>
                  )}
                </div>
              )}

              {/* Back only — for auto-advance selects */}
              {current.type === "select" && answer !== "Other" && step > 0 && (
                <div className="pl-10">
                  <button onClick={goPrev}
                    className="flex items-center gap-1.5 px-3 h-11 text-sm font-medium transition-all duration-200"
                    style={{ color: T.textMuted, background: "transparent", border: "none", cursor: "pointer" }}
                    onMouseEnter={e => (e.currentTarget.style.color = T.text)}
                    onMouseLeave={e => (e.currentTarget.style.color = T.textMuted)}
                  >
                    <ArrowLeft size={14} /> Back
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Step dots */}
      <div className="fixed bottom-0 inset-x-0 flex items-center justify-center px-6 sm:px-10 py-6">
        <div className="flex items-center gap-1.5">
          {STEPS.map((_, i) => (
            <div key={i} className="rounded-full transition-all duration-300"
              style={{
                width: i === step ? 16 : 6, height: 6,
                background: i === step ? T.deep : i < step ? T.dotDone : T.dotInactive,
              }} />
          ))}
        </div>
      </div>
    </div>
  );
}
