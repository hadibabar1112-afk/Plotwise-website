import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "./Logo";
import { ArrowLeft, Check, ChevronDown, Search } from "lucide-react";

// ── Country data ─────────────────────────────────────────────────────────────
interface CountryData { code: string; name: string; dial: string; flag: string; }
const COUNTRIES: CountryData[] = [
  { code: "AF", name: "Afghanistan", dial: "+93", flag: "🇦🇫" },
  { code: "AL", name: "Albania", dial: "+355", flag: "🇦🇱" },
  { code: "DZ", name: "Algeria", dial: "+213", flag: "🇩🇿" },
  { code: "AD", name: "Andorra", dial: "+376", flag: "🇦🇩" },
  { code: "AO", name: "Angola", dial: "+244", flag: "🇦🇴" },
  { code: "AR", name: "Argentina", dial: "+54", flag: "🇦🇷" },
  { code: "AM", name: "Armenia", dial: "+374", flag: "🇦🇲" },
  { code: "AU", name: "Australia", dial: "+61", flag: "🇦🇺" },
  { code: "AT", name: "Austria", dial: "+43", flag: "🇦🇹" },
  { code: "AZ", name: "Azerbaijan", dial: "+994", flag: "🇦🇿" },
  { code: "BS", name: "Bahamas", dial: "+1242", flag: "🇧🇸" },
  { code: "BH", name: "Bahrain", dial: "+973", flag: "🇧🇭" },
  { code: "BD", name: "Bangladesh", dial: "+880", flag: "🇧🇩" },
  { code: "BY", name: "Belarus", dial: "+375", flag: "🇧🇾" },
  { code: "BE", name: "Belgium", dial: "+32", flag: "🇧🇪" },
  { code: "BZ", name: "Belize", dial: "+501", flag: "🇧🇿" },
  { code: "BJ", name: "Benin", dial: "+229", flag: "🇧🇯" },
  { code: "BT", name: "Bhutan", dial: "+975", flag: "🇧🇹" },
  { code: "BO", name: "Bolivia", dial: "+591", flag: "🇧🇴" },
  { code: "BA", name: "Bosnia & Herzegovina", dial: "+387", flag: "🇧🇦" },
  { code: "BW", name: "Botswana", dial: "+267", flag: "🇧🇼" },
  { code: "BR", name: "Brazil", dial: "+55", flag: "🇧🇷" },
  { code: "BN", name: "Brunei", dial: "+673", flag: "🇧🇳" },
  { code: "BG", name: "Bulgaria", dial: "+359", flag: "🇧🇬" },
  { code: "BF", name: "Burkina Faso", dial: "+226", flag: "🇧🇫" },
  { code: "BI", name: "Burundi", dial: "+257", flag: "🇧🇮" },
  { code: "KH", name: "Cambodia", dial: "+855", flag: "🇰🇭" },
  { code: "CM", name: "Cameroon", dial: "+237", flag: "🇨🇲" },
  { code: "CA", name: "Canada", dial: "+1", flag: "🇨🇦" },
  { code: "CF", name: "Central African Republic", dial: "+236", flag: "🇨🇫" },
  { code: "TD", name: "Chad", dial: "+235", flag: "🇹🇩" },
  { code: "CL", name: "Chile", dial: "+56", flag: "🇨🇱" },
  { code: "CN", name: "China", dial: "+86", flag: "🇨🇳" },
  { code: "CO", name: "Colombia", dial: "+57", flag: "🇨🇴" },
  { code: "CG", name: "Congo", dial: "+242", flag: "🇨🇬" },
  { code: "CD", name: "Congo (DRC)", dial: "+243", flag: "🇨🇩" },
  { code: "CR", name: "Costa Rica", dial: "+506", flag: "🇨🇷" },
  { code: "CI", name: "Côte d'Ivoire", dial: "+225", flag: "🇨🇮" },
  { code: "HR", name: "Croatia", dial: "+385", flag: "🇭🇷" },
  { code: "CU", name: "Cuba", dial: "+53", flag: "🇨🇺" },
  { code: "CY", name: "Cyprus", dial: "+357", flag: "🇨🇾" },
  { code: "CZ", name: "Czech Republic", dial: "+420", flag: "🇨🇿" },
  { code: "DK", name: "Denmark", dial: "+45", flag: "🇩🇰" },
  { code: "DJ", name: "Djibouti", dial: "+253", flag: "🇩🇯" },
  { code: "DO", name: "Dominican Republic", dial: "+1809", flag: "🇩🇴" },
  { code: "EC", name: "Ecuador", dial: "+593", flag: "🇪🇨" },
  { code: "EG", name: "Egypt", dial: "+20", flag: "🇪🇬" },
  { code: "SV", name: "El Salvador", dial: "+503", flag: "🇸🇻" },
  { code: "GQ", name: "Equatorial Guinea", dial: "+240", flag: "🇬🇶" },
  { code: "ER", name: "Eritrea", dial: "+291", flag: "🇪🇷" },
  { code: "EE", name: "Estonia", dial: "+372", flag: "🇪🇪" },
  { code: "SZ", name: "Eswatini", dial: "+268", flag: "🇸🇿" },
  { code: "ET", name: "Ethiopia", dial: "+251", flag: "🇪🇹" },
  { code: "FJ", name: "Fiji", dial: "+679", flag: "🇫🇯" },
  { code: "FI", name: "Finland", dial: "+358", flag: "🇫🇮" },
  { code: "FR", name: "France", dial: "+33", flag: "🇫🇷" },
  { code: "GA", name: "Gabon", dial: "+241", flag: "🇬🇦" },
  { code: "GM", name: "Gambia", dial: "+220", flag: "🇬🇲" },
  { code: "GE", name: "Georgia (country)", dial: "+995", flag: "🇬🇪" },
  { code: "DE", name: "Germany", dial: "+49", flag: "🇩🇪" },
  { code: "GH", name: "Ghana", dial: "+233", flag: "🇬🇭" },
  { code: "GR", name: "Greece", dial: "+30", flag: "🇬🇷" },
  { code: "GT", name: "Guatemala", dial: "+502", flag: "🇬🇹" },
  { code: "GN", name: "Guinea", dial: "+224", flag: "🇬🇳" },
  { code: "GW", name: "Guinea-Bissau", dial: "+245", flag: "🇬🇼" },
  { code: "GY", name: "Guyana", dial: "+592", flag: "🇬🇾" },
  { code: "HT", name: "Haiti", dial: "+509", flag: "🇭🇹" },
  { code: "HN", name: "Honduras", dial: "+504", flag: "🇭🇳" },
  { code: "HU", name: "Hungary", dial: "+36", flag: "🇭🇺" },
  { code: "IS", name: "Iceland", dial: "+354", flag: "🇮🇸" },
  { code: "IN", name: "India", dial: "+91", flag: "🇮🇳" },
  { code: "ID", name: "Indonesia", dial: "+62", flag: "🇮🇩" },
  { code: "IR", name: "Iran", dial: "+98", flag: "🇮🇷" },
  { code: "IQ", name: "Iraq", dial: "+964", flag: "🇮🇶" },
  { code: "IE", name: "Ireland", dial: "+353", flag: "🇮🇪" },
  { code: "IL", name: "Israel", dial: "+972", flag: "🇮🇱" },
  { code: "IT", name: "Italy", dial: "+39", flag: "🇮🇹" },
  { code: "JM", name: "Jamaica", dial: "+1876", flag: "🇯🇲" },
  { code: "JP", name: "Japan", dial: "+81", flag: "🇯🇵" },
  { code: "JO", name: "Jordan", dial: "+962", flag: "🇯🇴" },
  { code: "KZ", name: "Kazakhstan", dial: "+7", flag: "🇰🇿" },
  { code: "KE", name: "Kenya", dial: "+254", flag: "🇰🇪" },
  { code: "KW", name: "Kuwait", dial: "+965", flag: "🇰🇼" },
  { code: "KG", name: "Kyrgyzstan", dial: "+996", flag: "🇰🇬" },
  { code: "LA", name: "Laos", dial: "+856", flag: "🇱🇦" },
  { code: "LV", name: "Latvia", dial: "+371", flag: "🇱🇻" },
  { code: "LB", name: "Lebanon", dial: "+961", flag: "🇱🇧" },
  { code: "LS", name: "Lesotho", dial: "+266", flag: "🇱🇸" },
  { code: "LR", name: "Liberia", dial: "+231", flag: "🇱🇷" },
  { code: "LY", name: "Libya", dial: "+218", flag: "🇱🇾" },
  { code: "LI", name: "Liechtenstein", dial: "+423", flag: "🇱🇮" },
  { code: "LT", name: "Lithuania", dial: "+370", flag: "🇱🇹" },
  { code: "LU", name: "Luxembourg", dial: "+352", flag: "🇱🇺" },
  { code: "MG", name: "Madagascar", dial: "+261", flag: "🇲🇬" },
  { code: "MW", name: "Malawi", dial: "+265", flag: "🇲🇼" },
  { code: "MY", name: "Malaysia", dial: "+60", flag: "🇲🇾" },
  { code: "MV", name: "Maldives", dial: "+960", flag: "🇲🇻" },
  { code: "ML", name: "Mali", dial: "+223", flag: "🇲🇱" },
  { code: "MT", name: "Malta", dial: "+356", flag: "🇲🇹" },
  { code: "MR", name: "Mauritania", dial: "+222", flag: "🇲🇷" },
  { code: "MU", name: "Mauritius", dial: "+230", flag: "🇲🇺" },
  { code: "MX", name: "Mexico", dial: "+52", flag: "🇲🇽" },
  { code: "MD", name: "Moldova", dial: "+373", flag: "🇲🇩" },
  { code: "MC", name: "Monaco", dial: "+377", flag: "🇲🇨" },
  { code: "MN", name: "Mongolia", dial: "+976", flag: "🇲🇳" },
  { code: "ME", name: "Montenegro", dial: "+382", flag: "🇲🇪" },
  { code: "MA", name: "Morocco", dial: "+212", flag: "🇲🇦" },
  { code: "MZ", name: "Mozambique", dial: "+258", flag: "🇲🇿" },
  { code: "MM", name: "Myanmar", dial: "+95", flag: "🇲🇲" },
  { code: "NA", name: "Namibia", dial: "+264", flag: "🇳🇦" },
  { code: "NP", name: "Nepal", dial: "+977", flag: "🇳🇵" },
  { code: "NL", name: "Netherlands", dial: "+31", flag: "🇳🇱" },
  { code: "NZ", name: "New Zealand", dial: "+64", flag: "🇳🇿" },
  { code: "NI", name: "Nicaragua", dial: "+505", flag: "🇳🇮" },
  { code: "NE", name: "Niger", dial: "+227", flag: "🇳🇪" },
  { code: "NG", name: "Nigeria", dial: "+234", flag: "🇳🇬" },
  { code: "NO", name: "Norway", dial: "+47", flag: "🇳🇴" },
  { code: "OM", name: "Oman", dial: "+968", flag: "🇴🇲" },
  { code: "PK", name: "Pakistan", dial: "+92", flag: "🇵🇰" },
  { code: "PS", name: "Palestine", dial: "+970", flag: "🇵🇸" },
  { code: "PA", name: "Panama", dial: "+507", flag: "🇵🇦" },
  { code: "PG", name: "Papua New Guinea", dial: "+675", flag: "🇵🇬" },
  { code: "PY", name: "Paraguay", dial: "+595", flag: "🇵🇾" },
  { code: "PE", name: "Peru", dial: "+51", flag: "🇵🇪" },
  { code: "PH", name: "Philippines", dial: "+63", flag: "🇵🇭" },
  { code: "PL", name: "Poland", dial: "+48", flag: "🇵🇱" },
  { code: "PT", name: "Portugal", dial: "+351", flag: "🇵🇹" },
  { code: "QA", name: "Qatar", dial: "+974", flag: "🇶🇦" },
  { code: "RO", name: "Romania", dial: "+40", flag: "🇷🇴" },
  { code: "RU", name: "Russia", dial: "+7", flag: "🇷🇺" },
  { code: "RW", name: "Rwanda", dial: "+250", flag: "🇷🇼" },
  { code: "SA", name: "Saudi Arabia", dial: "+966", flag: "🇸🇦" },
  { code: "SN", name: "Senegal", dial: "+221", flag: "🇸🇳" },
  { code: "RS", name: "Serbia", dial: "+381", flag: "🇷🇸" },
  { code: "SC", name: "Seychelles", dial: "+248", flag: "🇸🇨" },
  { code: "SL", name: "Sierra Leone", dial: "+232", flag: "🇸🇱" },
  { code: "SG", name: "Singapore", dial: "+65", flag: "🇸🇬" },
  { code: "SK", name: "Slovakia", dial: "+421", flag: "🇸🇰" },
  { code: "SI", name: "Slovenia", dial: "+386", flag: "🇸🇮" },
  { code: "SO", name: "Somalia", dial: "+252", flag: "🇸🇴" },
  { code: "ZA", name: "South Africa", dial: "+27", flag: "🇿🇦" },
  { code: "SS", name: "South Sudan", dial: "+211", flag: "🇸🇸" },
  { code: "ES", name: "Spain", dial: "+34", flag: "🇪🇸" },
  { code: "LK", name: "Sri Lanka", dial: "+94", flag: "🇱🇰" },
  { code: "SD", name: "Sudan", dial: "+249", flag: "🇸🇩" },
  { code: "SR", name: "Suriname", dial: "+597", flag: "🇸🇷" },
  { code: "SE", name: "Sweden", dial: "+46", flag: "🇸🇪" },
  { code: "CH", name: "Switzerland", dial: "+41", flag: "🇨🇭" },
  { code: "SY", name: "Syria", dial: "+963", flag: "🇸🇾" },
  { code: "TW", name: "Taiwan", dial: "+886", flag: "🇹🇼" },
  { code: "TJ", name: "Tajikistan", dial: "+992", flag: "🇹🇯" },
  { code: "TZ", name: "Tanzania", dial: "+255", flag: "🇹🇿" },
  { code: "TH", name: "Thailand", dial: "+66", flag: "🇹🇭" },
  { code: "TL", name: "Timor-Leste", dial: "+670", flag: "🇹🇱" },
  { code: "TG", name: "Togo", dial: "+228", flag: "🇹🇬" },
  { code: "TO", name: "Tonga", dial: "+676", flag: "🇹🇴" },
  { code: "TT", name: "Trinidad & Tobago", dial: "+1868", flag: "🇹🇹" },
  { code: "TN", name: "Tunisia", dial: "+216", flag: "🇹🇳" },
  { code: "TR", name: "Turkey", dial: "+90", flag: "🇹🇷" },
  { code: "TM", name: "Turkmenistan", dial: "+993", flag: "🇹🇲" },
  { code: "UG", name: "Uganda", dial: "+256", flag: "🇺🇬" },
  { code: "UA", name: "Ukraine", dial: "+380", flag: "🇺🇦" },
  { code: "AE", name: "United Arab Emirates", dial: "+971", flag: "🇦🇪" },
  { code: "GB", name: "United Kingdom", dial: "+44", flag: "🇬🇧" },
  { code: "US", name: "United States", dial: "+1", flag: "🇺🇸" },
  { code: "UY", name: "Uruguay", dial: "+598", flag: "🇺🇾" },
  { code: "UZ", name: "Uzbekistan", dial: "+998", flag: "🇺🇿" },
  { code: "VU", name: "Vanuatu", dial: "+678", flag: "🇻🇺" },
  { code: "VE", name: "Venezuela", dial: "+58", flag: "🇻🇪" },
  { code: "VN", name: "Vietnam", dial: "+84", flag: "🇻🇳" },
  { code: "YE", name: "Yemen", dial: "+967", flag: "🇾🇪" },
  { code: "ZM", name: "Zambia", dial: "+260", flag: "🇿🇲" },
  { code: "ZW", name: "Zimbabwe", dial: "+263", flag: "🇿🇼" },
];

// ── Steps ─────────────────────────────────────────────────────────────────────
type StepType = "text" | "email" | "phone" | "select" | "multiselect" | "textarea" | "platformlinks" | "groupedmultiselect" | "countrydropdown";
interface StepDef {
  id: string;
  type: StepType;
  question: string;
  placeholder?: string;
  hint?: string;
  options?: string[];
  groups?: { label: string; options: string[] }[];
  required?: boolean;
}

const STEPS: StepDef[] = [
  { id: "name",         type: "text",              question: "What should we call you?",                                                         placeholder: "Your full name",    required: true },
  { id: "email",        type: "email",             question: "Where can we reach you?",                                                          placeholder: "you@email.com",     required: true },
  { id: "phone",        type: "phone",             question: "What's your phone or WhatsApp number?",                                            placeholder: "300 123 4567",      hint: "For faster coordination once you're onboarded." },
  { id: "location",     type: "countrydropdown",   question: "Which country are you based in?",                                                   hint: "Helps us match you with brands shipping in your region.", required: true },
  { id: "platform",     type: "multiselect",       question: "Where do you create most content?",                                                hint: "Select all that apply",    options: ["Instagram", "TikTok", "YouTube", "Other"], required: true },
  { id: "profileLink",  type: "platformlinks",     question: "Drop your profile link(s)",                                                        hint: "One link per platform",    required: true },
  { id: "followerCount",type: "select",            question: "What's your follower count across platforms?",                                     hint: "We work with all sizes — this just helps us match campaigns.", options: ["Under 5K", "5–25K", "25–100K", "100K+"], required: true },
  { id: "niche",        type: "multiselect",       question: "What do you primarily create?",                                                    hint: "Select all that apply",    options: ["Beauty", "Skincare", "Haircare", "Makeup", "Wellness", "Lifestyle", "Fitness", "Other"], required: true },
  { id: "ugcSamples",   type: "textarea",          question: "Link 2–3 of your best UGC samples",                                               placeholder: "Paste links here…", hint: "Drive links, public posts, or portfolios all work.", required: true },
  { id: "contentFormats",type: "multiselect",      question: "What content formats are you strongest at?",                                      hint: "Select all that apply",    options: ["Talking head", "Voiceover", "Unboxing", "Before & after", "Lifestyle B-roll", "Skits", "Static photos"], required: true },
  { id: "ageRange",     type: "select",            question: "Which age bracket do you fall into?",                                              options: ["18–24", "25–34", "35–44", "45+"], required: true },
  { id: "skinToneHair", type: "groupedmultiselect",question: "Tell us a bit about your skin, tone & hair",                                      hint: "Pick what applies. Skip anything you'd rather not share.",
    groups: [
      { label: "Skin type", options: ["Oily", "Dry", "Combination", "Sensitive", "Acne-prone"] },
      { label: "Skin tone", options: ["Fair", "Light", "Medium", "Tan", "Deep"] },
      { label: "Hair type", options: ["Straight", "Wavy", "Curly", "Coily", "Textured"] },
    ], required: true },
  { id: "contentStyle", type: "multiselect",       question: "What's your strongest content style?",                                            hint: "Select all that apply",    options: ["Hook-driven short ads", "Tutorial & demo", "Storytelling & narrative", "Reviews & testimonials", "Comedic & skit-based", "High-volume variant testing"], required: true },
  { id: "availability", type: "select",            question: "How many campaigns could you realistically take on per month?",                   options: ["1–2", "3–5", "6+"],    required: true },
  { id: "turnaround",   type: "select",            question: "From product received → footage delivered, what can you commit to?",              options: ["Under 5 days", "5–10 days", "10+ days"], required: true },
];

const TOTAL = STEPS.length;

// ── Theme ─────────────────────────────────────────────────────────────────────
const C = {
  bg:       "#F5F8F7",
  text:     "#131818",
  muted:    "rgba(19,24,24,0.45)",
  faint:    "rgba(19,24,24,0.28)",
  subtle:   "rgba(19,24,24,0.55)",
  border:   "rgba(19,24,24,0.10)",
  bHover:   "rgba(0,98,92,0.35)",
  teal:     "#91CEBF",
  deep:     "#00625C",
  dark:     "#207771",
  optBg:    "rgba(19,24,24,0.04)",
  optHov:   "rgba(19,24,24,0.07)",
  selBg:    "#91CEBF",
  track:    "rgba(19,24,24,0.08)",
  error:    "#c0392b",
};

const slide = {
  enter: (d: number) => ({ y: d * 36, opacity: 0, filter: "blur(6px)" }),
  center: { y: 0, opacity: 1, filter: "blur(0px)", transition: { duration: 0.42, ease: [0.16, 1, 0.3, 1] } },
  exit:  (d: number) => ({ y: d * -36, opacity: 0, filter: "blur(6px)", transition: { duration: 0.22, ease: "easeIn" } }),
};

// ── Analytics ─────────────────────────────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function gtagEvent(name: string, params?: Record<string, string | number>) {
  if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
    (window as any).gtag("event", name, params ?? {});
  }
}

// ── Component ─────────────────────────────────────────────────────────────────
export function CreatorForm() {
  const [screen,  setScreen]  = useState<"welcome" | "form" | "success">("welcome");
  const [step,    setStep]    = useState(0);
  const [dir,     setDir]     = useState(1);

  // Answers: plain values
  const [answers,  setAnswers]  = useState<Record<string, string | string[]>>({});
  const [otherText, setOtherText] = useState<Record<string, string>>({});

  // Platform links stored separately (keyed by platform name)
  const [platLinks, setPlatLinks] = useState<Record<string, string>>({});
  const [platErrs,  setPlatErrs]  = useState<Record<string, string>>({});

  // Phone dial code
  const [dial,       setDial]       = useState<CountryData>(COUNTRIES.find(c => c.code === "US")!);
  const [dialOpen,   setDialOpen]   = useState(false);
  const [dialSearch, setDialSearch] = useState("");

  // Country dropdown
  const [cOpen,   setCOpen]   = useState(false);
  const [cSearch, setCSearch] = useState("");

  // Submission
  const [sending,    setSending]    = useState(false);
  const submittedRef     = useRef(false);
  const autoAdvanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [submitErr,  setSubmitErr]  = useState<string | null>(null);

  // Per-step inline error
  const [fieldErr,  setFieldErr]  = useState<string | null>(null);

  // Refs
  const inputRef    = useRef<HTMLInputElement>(null);
  const taRef       = useRef<HTMLTextAreaElement>(null);
  const otherRef    = useRef<HTMLInputElement>(null);
  const dialRef     = useRef<HTMLDivElement>(null);
  const countryRef  = useRef<HTMLDivElement>(null);

  const cur = STEPS[step];
  const ans = answers[cur?.id ?? ""] ?? (
    cur?.type === "multiselect" || cur?.type === "groupedmultiselect" ? [] : ""
  );
  const selectedPlatforms = (answers["platform"] as string[]) ?? [];
  const otherSelected =
    (cur?.type === "select" && ans === "Other") ||
    (cur?.type === "multiselect" && (ans as string[]).includes("Other"));
  const otherVal = otherText[cur?.id ?? ""] ?? "";

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dialRef.current && !dialRef.current.contains(e.target as Node)) setDialOpen(false);
      if (countryRef.current && !countryRef.current.contains(e.target as Node)) setCOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Focus input when step changes
  useEffect(() => {
    const id = setTimeout(() => {
      inputRef.current?.focus();
      taRef.current?.focus();
    }, 80);
    return () => clearTimeout(id);
  }, [step]);

  // ── Validate current step ──────────────────────────────────────────────────
  function validate(overrideAnswers?: Record<string, string | string[]>): string | null {
    const a = overrideAnswers ?? answers;
    const val = a[cur.id] ?? (cur.type === "multiselect" || cur.type === "groupedmultiselect" ? [] : "");

    if (cur.type === "email") {
      const s = (val as string).trim();
      if (!s) return "Email address is required.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)) return "Please enter a valid email address.";
      return null;
    }

    if (cur.type === "phone") {
      const s = (val as string).trim();
      if (!s) return null; // optional
      if (!/^[\d\s\-()+]+$/.test(s)) return "Please enter a valid phone number.";
      return null;
    }

    if (cur.type === "countrydropdown") {
      if (cur.required && !(val as string)) return "Please select your country.";
      return null;
    }

    if (cur.type === "multiselect" || cur.type === "groupedmultiselect") {
      if (cur.required && (val as string[]).length === 0) return "Please select at least one option.";
      return null;
    }

    if (cur.type === "platformlinks") {
      return null; // validated separately in validatePlatformLinks
    }

    if (otherSelected && !otherVal.trim()) return "Please describe your choice.";

    if (cur.required) {
      if (!(val as string).trim()) return "This field is required.";
    }

    return null;
  }

  function validatePlatformLinks(): boolean {
    const errs: Record<string, string> = {};
    let ok = true;
    for (const p of selectedPlatforms) {
      const raw = (platLinks[p] ?? "").trim();
      if (!raw) {
        errs[p] = `Please enter your ${p} profile link.`;
        ok = false;
        continue;
      }
      const url = /^https?:\/\//.test(raw) ? raw : `https://${raw}`;
      if (p === "Instagram" && !url.includes("instagram.com")) {
        errs[p] = "Doesn't look like an Instagram link. Try: instagram.com/yourhandle";
        ok = false;
      } else if (p === "TikTok" && !url.includes("tiktok.com")) {
        errs[p] = "Doesn't look like a TikTok link. Try: tiktok.com/@yourhandle";
        ok = false;
      } else if (p === "YouTube" && !url.includes("youtube.com") && !url.includes("youtu.be")) {
        errs[p] = "Doesn't look like a YouTube link. Try: youtube.com/@yourchannel";
        ok = false;
      }
    }
    setPlatErrs(errs);
    return ok;
  }

  // ── Submit to API ──────────────────────────────────────────────────────────
  async function submitForm(finalAnswers: Record<string, string | string[]>) {
    if (submittedRef.current) return;
    submittedRef.current = true;
    setSending(true);
    setSubmitErr(null);

    // Build profile link string
    const profileLink = selectedPlatforms
      .map(p => {
        const raw = (platLinks[p] ?? "").trim();
        if (!raw) return null;
        const url = /^https?:\/\//.test(raw) ? raw : `https://${raw}`;
        const label = p === "Other" && otherText["platform"] ? otherText["platform"] : p;
        return `${label}: ${url}`;
      })
      .filter(Boolean)
      .join("\n");

    // Build phone string
    const rawPhone = ((finalAnswers["phone"] as string) ?? "").trim();
    const phone = rawPhone ? `${dial.dial} ${rawPhone}` : "";

    const payload = {
      answers: { ...finalAnswers, profileLink, phone },
      otherText,
    };

    try {
      const controller = new AbortController();
      const t = setTimeout(() => controller.abort(), 15000);
      const res = await fetch("/api/creator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      clearTimeout(t);
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error((body as { error?: string }).error ?? "server error");
      }
      gtagEvent("creator_form_submit");
      setScreen("success");
    } catch (err) {
      const isTimeout = err instanceof Error && err.name === "AbortError";
      gtagEvent("creator_form_error", { error_type: isTimeout ? "timeout" : "server" });
      setSubmitErr(isTimeout
        ? "Request timed out — please check your connection and try again."
        : "Something went wrong. Please try again.");
      submittedRef.current = false;
    } finally {
      setSending(false);
    }
  }

  // ── Proceed: advance or submit — ALL navigation goes through here ──────────
  // This is the single source of truth. No path bypasses the API on last step.
  function proceed(overrideAnswers?: Record<string, string | string[]>) {
    if (autoAdvanceTimer.current) { clearTimeout(autoAdvanceTimer.current); autoAdvanceTimer.current = null; }
    const a = overrideAnswers ?? answers;
    setFieldErr(null);
    if (step < TOTAL - 1) {
      gtagEvent("creator_form_step_complete", { step_index: step, step_id: cur.id });
      setDir(1);
      setStep(s => s + 1);
    } else {
      submitForm(a);
    }
  }

  // ── OK button handler ──────────────────────────────────────────────────────
  function handleOK() {
    if (cur.type === "platformlinks") {
      if (!validatePlatformLinks()) return;
      proceed();
      return;
    }
    const err = validate();
    if (err) { setFieldErr(err); return; }
    proceed();
  }

  // ── Select: click choice → auto-advance after short delay ─────────────────
  // Key fix: calls proceed() which hits the API on last step — no bypass.
  function handleSelectChoice(opt: string) {
    const newAnswers = { ...answers, [cur.id]: opt };
    setAnswers(newAnswers);
    setFieldErr(null);
    if (opt === "Other") {
      setTimeout(() => otherRef.current?.focus(), 80);
      return;
    }
    if (autoAdvanceTimer.current) clearTimeout(autoAdvanceTimer.current);
    autoAdvanceTimer.current = setTimeout(() => {
      autoAdvanceTimer.current = null;
      proceed(newAnswers);
    }, 320);
  }

  // ── Multi-select toggle ────────────────────────────────────────────────────
  function toggleMulti(opt: string, id?: string) {
    const targetId = id ?? cur.id;
    const prev = (answers[targetId] as string[]) ?? [];
    const next = prev.includes(opt) ? prev.filter(o => o !== opt) : [...prev, opt];
    setAnswers(a => ({ ...a, [targetId]: next }));
    setFieldErr(null);
    if (opt === "Other" && !prev.includes("Other")) {
      setTimeout(() => otherRef.current?.focus(), 80);
    }
  }

  // ── Render input for current step ─────────────────────────────────────────
  function renderInput() {
    const inputBase = "w-full bg-transparent border-b-2 outline-none text-xl sm:text-2xl pb-3 pt-1 transition-colors duration-200 font-display tracking-tight";
    const errBorder = fieldErr ? C.error : C.border;

    // TEXT / EMAIL
    if (cur.type === "text" || cur.type === "email") {
      return (
        <div className="w-full max-w-xl">
          <input
            ref={inputRef}
            type={cur.type}
            value={ans as string}
            onChange={e => { setAnswers(a => ({ ...a, [cur.id]: e.target.value })); setFieldErr(null); }}
            placeholder={cur.placeholder}
            className={inputBase}
            style={{ color: C.text, borderColor: errBorder, caretColor: C.deep }}
            onFocus={e => (e.currentTarget.style.borderColor = fieldErr ? C.error : C.teal)}
            onBlur={e => (e.currentTarget.style.borderColor = fieldErr ? C.error : C.border)}
            onKeyDown={e => { if (e.key === "Enter") handleOK(); }}
          />
          {cur.hint && <p className="mt-3 text-sm" style={{ color: C.faint }}>{cur.hint}</p>}
          {fieldErr
            ? <p className="mt-2 text-sm font-medium" style={{ color: C.error }}>{fieldErr}</p>
            : <p className="mt-5 text-xs tracking-wide" style={{ color: C.faint }}>Press <kbd className="px-1.5 py-0.5 rounded font-mono text-[10px]" style={{ border: `1px solid ${C.border}`, color: C.subtle }}>Enter ↵</kbd> to continue</p>
          }
        </div>
      );
    }

    // PHONE
    if (cur.type === "phone") {
      const filtered = COUNTRIES.filter(c =>
        c.name.toLowerCase().includes(dialSearch.toLowerCase()) || c.dial.includes(dialSearch)
      );
      return (
        <div className="w-full max-w-xl">
          <div className="flex items-stretch gap-0">
            <div ref={dialRef} className="relative shrink-0">
              <button type="button"
                onClick={() => { setDialOpen(o => !o); setDialSearch(""); }}
                className="flex items-center gap-1.5 px-3 h-full border-b-2 transition-colors duration-200"
                style={{ borderColor: fieldErr ? C.error : C.border, color: C.text, background: "transparent" }}
              >
                <span style={{ fontSize: "20px", lineHeight: 1 }}>{dial.flag}</span>
                <span className="text-base font-mono" style={{ color: C.subtle }}>{dial.dial}</span>
                <motion.span animate={{ rotate: dialOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown size={13} style={{ color: C.faint }} />
                </motion.span>
              </button>
              <AnimatePresence>
                {dialOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scaleY: 0.96 }} animate={{ opacity: 1, y: 0, scaleY: 1 }}
                    exit={{ opacity: 0, y: -8, scaleY: 0.96 }} transition={{ duration: 0.16 }}
                    style={{ transformOrigin: "top", background: "#fff", border: `1px solid ${C.border}`, width: "280px" }}
                    className="absolute top-full left-0 z-50 mt-1 rounded-xl shadow-2xl overflow-hidden"
                  >
                    <div className="p-2.5" style={{ borderBottom: `1px solid ${C.border}` }}>
                      <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg" style={{ background: C.optBg }}>
                        <Search size={13} style={{ color: C.faint }} />
                        <input type="text" value={dialSearch} onChange={e => setDialSearch(e.target.value)}
                          placeholder="Search country or code…" className="flex-1 outline-none text-sm bg-transparent"
                          style={{ color: C.text }} autoFocus />
                      </div>
                    </div>
                    <div className="overflow-y-auto" style={{ maxHeight: "220px" }}>
                      {filtered.length === 0 && <p className="px-4 py-3 text-sm" style={{ color: C.faint }}>No results</p>}
                      {filtered.map(c => (
                        <button key={c.code} type="button"
                          onClick={() => { setDial(c); setDialOpen(false); setDialSearch(""); }}
                          className="w-full flex items-center gap-2.5 px-3.5 py-2 text-sm text-left transition-colors"
                          style={{ color: dial.code === c.code ? C.deep : C.text, background: dial.code === c.code ? "rgba(0,98,92,0.06)" : "transparent", fontWeight: dial.code === c.code ? 600 : 400 }}
                          onMouseEnter={e => { if (dial.code !== c.code) e.currentTarget.style.background = C.optBg; }}
                          onMouseLeave={e => { if (dial.code !== c.code) e.currentTarget.style.background = "transparent"; }}
                        >
                          <span>{c.flag}</span><span className="flex-1 truncate">{c.name}</span>
                          <span className="font-mono text-xs shrink-0" style={{ color: C.faint }}>{c.dial}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <input ref={inputRef} type="tel" inputMode="numeric"
              value={ans as string}
              onChange={e => { setAnswers(a => ({ ...a, [cur.id]: e.target.value })); setFieldErr(null); }}
              placeholder={cur.placeholder}
              className={`${inputBase} flex-1 pl-3`}
              style={{ color: C.text, borderColor: fieldErr ? C.error : C.border, caretColor: C.deep }}
              onFocus={e => (e.currentTarget.style.borderColor = fieldErr ? C.error : C.teal)}
              onBlur={e => (e.currentTarget.style.borderColor = fieldErr ? C.error : C.border)}
              onKeyDown={e => { if (e.key === "Enter") handleOK(); }}
            />
          </div>
          {cur.hint && <p className="mt-3 text-sm" style={{ color: C.faint }}>{cur.hint}</p>}
          {fieldErr && <p className="mt-2 text-sm font-medium" style={{ color: C.error }}>{fieldErr}</p>}
        </div>
      );
    }

    // COUNTRY DROPDOWN
    if (cur.type === "countrydropdown") {
      const selected = ans as string;
      const filteredC = COUNTRIES.filter(c => c.name.toLowerCase().includes(cSearch.toLowerCase()));
      return (
        <div className="w-full max-w-xl relative" ref={countryRef}>
          <button type="button"
            onClick={() => { setCOpen(o => !o); setCSearch(""); }}
            className="w-full flex items-center justify-between gap-3 border-b-2 pb-3 pt-1 text-xl sm:text-2xl font-display tracking-tight transition-colors duration-200 text-left"
            style={{ color: selected ? C.text : C.faint, borderColor: fieldErr ? C.error : (cOpen ? C.teal : C.border), background: "transparent" }}
          >
            <span className="flex items-center gap-2.5">
              {selected && <span style={{ fontSize: "20px", lineHeight: 1 }}>{COUNTRIES.find(c => c.name === selected)?.flag}</span>}
              <span>{selected || "Select your country"}</span>
            </span>
            <motion.span animate={{ rotate: cOpen ? 180 : 0 }} transition={{ duration: 0.2 }} className="shrink-0">
              <ChevronDown size={20} style={{ color: C.faint }} />
            </motion.span>
          </button>
          <AnimatePresence>
            {cOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scaleY: 0.96 }} animate={{ opacity: 1, y: 0, scaleY: 1 }}
                exit={{ opacity: 0, y: -8, scaleY: 0.96 }} transition={{ duration: 0.16 }}
                style={{ transformOrigin: "top", background: "#fff", border: `1px solid ${C.border}` }}
                className="absolute top-full left-0 right-0 mt-1 z-50 rounded-xl shadow-2xl overflow-hidden"
              >
                <div className="p-2.5" style={{ borderBottom: `1px solid ${C.border}` }}>
                  <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg" style={{ background: C.optBg }}>
                    <Search size={13} style={{ color: C.faint }} />
                    <input type="text" value={cSearch} onChange={e => setCSearch(e.target.value)}
                      placeholder="Search country…" className="flex-1 outline-none text-sm bg-transparent"
                      style={{ color: C.text }} autoFocus />
                  </div>
                </div>
                <div className="overflow-y-auto" style={{ maxHeight: "240px" }}>
                  {filteredC.length === 0 && <p className="px-4 py-3 text-sm" style={{ color: C.faint }}>No results</p>}
                  {filteredC.map(c => (
                    <button key={c.code} type="button"
                      onClick={() => { setAnswers(a => ({ ...a, [cur.id]: c.name })); setCOpen(false); setCSearch(""); setFieldErr(null); }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left transition-colors"
                      style={{ color: selected === c.name ? C.deep : C.text, background: selected === c.name ? "rgba(0,98,92,0.06)" : "transparent", fontWeight: selected === c.name ? 600 : 400 }}
                      onMouseEnter={e => { if (selected !== c.name) e.currentTarget.style.background = C.optBg; }}
                      onMouseLeave={e => { if (selected !== c.name) e.currentTarget.style.background = "transparent"; }}
                    >
                      <span style={{ fontSize: "16px" }}>{c.flag}</span>
                      <span className="flex-1">{c.name}</span>
                      {selected === c.name && <Check size={13} strokeWidth={2.5} style={{ color: C.deep }} />}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          {cur.hint && <p className="mt-3 text-sm" style={{ color: C.faint }}>{cur.hint}</p>}
          {fieldErr && <p className="mt-2 text-sm font-medium" style={{ color: C.error }}>{fieldErr}</p>}
        </div>
      );
    }

    // TEXTAREA
    if (cur.type === "textarea") {
      return (
        <div className="w-full max-w-xl">
          <textarea ref={taRef}
            value={ans as string}
            onChange={e => {
              setAnswers(a => ({ ...a, [cur.id]: e.target.value }));
              setFieldErr(null);
              e.target.style.height = "auto";
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
            placeholder={cur.placeholder} rows={1}
            className={`${inputBase} resize-none leading-relaxed`}
            style={{ color: C.text, borderColor: fieldErr ? C.error : C.border, caretColor: C.deep, overflow: "hidden" }}
            onFocus={e => (e.currentTarget.style.borderColor = fieldErr ? C.error : C.teal)}
            onBlur={e => (e.currentTarget.style.borderColor = fieldErr ? C.error : C.border)}
          />
          {cur.hint && <p className="mt-2 text-sm" style={{ color: C.faint }}>{cur.hint}</p>}
          {fieldErr
            ? <p className="mt-2 text-sm font-medium" style={{ color: C.error }}>{fieldErr}</p>
            : <p className="mt-3 text-xs" style={{ color: C.faint }}><kbd className="px-1.5 py-0.5 rounded font-mono text-[10px]" style={{ border: `1px solid ${C.border}`, color: C.subtle }}>Shift + Enter</kbd> for new line</p>
          }
        </div>
      );
    }

    // SELECT
    if (cur.type === "select") {
      return (
        <div className="flex flex-col gap-4 max-w-xl">
          {cur.hint && <p className="text-sm -mt-2" style={{ color: C.faint }}>{cur.hint}</p>}
          <div className="flex flex-wrap gap-3">
            {cur.options?.map((opt, i) => {
              const sel = ans === opt;
              return (
                <button key={opt} type="button" onClick={() => handleSelectChoice(opt)}
                  className="flex items-center gap-2.5 px-5 py-3 rounded-xl border text-sm font-medium transition-all duration-200"
                  style={{ background: sel ? C.selBg : C.optBg, color: sel ? C.text : C.subtle, borderColor: sel ? C.teal : C.border, boxShadow: sel ? "0 0 24px -4px rgba(145,206,191,0.5)" : "none" }}
                  onMouseEnter={e => { if (!sel) { e.currentTarget.style.borderColor = C.bHover; e.currentTarget.style.background = C.optHov; } }}
                  onMouseLeave={e => { if (!sel) { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = C.optBg; } }}
                >
                  <span className="text-[10px] font-mono w-4 h-4 rounded flex items-center justify-center border"
                    style={{ borderColor: sel ? "rgba(19,24,24,0.25)" : C.border, color: sel ? "rgba(19,24,24,0.5)" : C.faint, background: sel ? "rgba(19,24,24,0.07)" : "transparent" }}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  {opt}
                  {sel && <Check size={13} strokeWidth={2.5} />}
                </button>
              );
            })}
          </div>
          {/* "Other" text input */}
          {otherSelected && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.22 }}>
              <input ref={otherRef} type="text" value={otherVal}
                onChange={e => { setOtherText(t => ({ ...t, [cur.id]: e.target.value })); setFieldErr(null); }}
                placeholder="Please describe…"
                className="w-full bg-transparent border-b-2 outline-none text-lg pb-2 pt-1 transition-colors duration-200 font-display tracking-tight"
                style={{ color: C.text, borderColor: C.border, caretColor: C.deep }}
                onFocus={e => (e.currentTarget.style.borderColor = C.teal)}
                onBlur={e => (e.currentTarget.style.borderColor = C.border)}
                onKeyDown={e => { if (e.key === "Enter" && otherVal.trim()) handleOK(); }}
              />
            </motion.div>
          )}
          {fieldErr && <p className="text-sm font-medium" style={{ color: C.error }}>{fieldErr}</p>}
        </div>
      );
    }

    // MULTISELECT
    if (cur.type === "multiselect") {
      const selected = ans as string[];
      const showOther = selected.includes("Other");
      return (
        <div className="flex flex-col gap-4 max-w-xl w-full">
          {cur.hint && <p className="text-sm -mt-2" style={{ color: C.faint }}>{cur.hint}</p>}
          <div className="flex flex-wrap gap-3">
            {cur.options?.map(opt => {
              const sel = selected.includes(opt);
              return (
                <button key={opt} type="button" onClick={() => toggleMulti(opt)}
                  className="flex items-center gap-2.5 px-5 py-3 rounded-xl border text-sm font-medium transition-all duration-200"
                  style={{ background: sel ? C.selBg : C.optBg, color: sel ? C.text : C.subtle, borderColor: sel ? C.teal : C.border, boxShadow: sel ? "0 0 24px -4px rgba(145,206,191,0.5)" : "none" }}
                  onMouseEnter={e => { if (!sel) { e.currentTarget.style.borderColor = C.bHover; e.currentTarget.style.background = C.optHov; } }}
                  onMouseLeave={e => { if (!sel) { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = C.optBg; } }}
                >
                  <span className="w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0"
                    style={{ borderColor: sel ? "rgba(19,24,24,0.25)" : C.border, background: sel ? "rgba(19,24,24,0.07)" : "transparent" }}>
                    {sel && <Check size={9} strokeWidth={3} />}
                  </span>
                  {opt}
                </button>
              );
            })}
          </div>
          {showOther && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.22 }}>
              <input ref={otherRef} type="text" value={otherVal}
                onChange={e => { setOtherText(t => ({ ...t, [cur.id]: e.target.value })); setFieldErr(null); }}
                placeholder="Please describe…"
                className="w-full bg-transparent border-b-2 outline-none text-lg pb-2 pt-1 transition-colors duration-200 font-display tracking-tight"
                style={{ color: C.text, borderColor: C.border, caretColor: C.deep }}
                onFocus={e => (e.currentTarget.style.borderColor = C.teal)}
                onBlur={e => (e.currentTarget.style.borderColor = C.border)}
              />
            </motion.div>
          )}
          {fieldErr
            ? <p className="text-sm font-medium" style={{ color: C.error }}>{fieldErr}</p>
            : selected.length > 0 && <p className="text-xs" style={{ color: C.faint }}>{selected.length} selected · click OK to continue</p>
          }
        </div>
      );
    }

    // GROUPED MULTISELECT
    if (cur.type === "groupedmultiselect") {
      const selected = ans as string[];
      return (
        <div className="flex flex-col gap-6 max-w-xl w-full">
          {cur.hint && <p className="text-sm -mt-2" style={{ color: C.faint }}>{cur.hint}</p>}
          {cur.groups?.map(group => (
            <div key={group.label}>
              <p className="mb-2.5 text-xs font-semibold tracking-widest uppercase" style={{ color: C.deep }}>{group.label}</p>
              <div className="flex flex-wrap gap-2.5">
                {group.options.map(opt => {
                  const sel = selected.includes(opt);
                  return (
                    <button key={opt} type="button" onClick={() => toggleMulti(opt)}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all duration-200"
                      style={{ background: sel ? C.selBg : C.optBg, color: sel ? C.text : C.subtle, borderColor: sel ? C.teal : C.border, boxShadow: sel ? "0 0 20px -4px rgba(145,206,191,0.45)" : "none" }}
                      onMouseEnter={e => { if (!sel) { e.currentTarget.style.borderColor = C.bHover; e.currentTarget.style.background = C.optHov; } }}
                      onMouseLeave={e => { if (!sel) { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = C.optBg; } }}
                    >
                      <span className="w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0"
                        style={{ borderColor: sel ? "rgba(19,24,24,0.25)" : C.border, background: sel ? "rgba(19,24,24,0.07)" : "transparent" }}>
                        {sel && <Check size={9} strokeWidth={3} />}
                      </span>
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
          {fieldErr
            ? <p className="text-sm font-medium" style={{ color: C.error }}>{fieldErr}</p>
            : selected.length > 0 && <p className="text-xs" style={{ color: C.faint }}>{selected.length} selected · click OK to continue</p>
          }
        </div>
      );
    }

    // PLATFORM LINKS
    if (cur.type === "platformlinks") {
      if (selectedPlatforms.length === 0) {
        return <p className="text-sm" style={{ color: C.faint }}>Please go back and select at least one platform.</p>;
      }
      return (
        <div className="flex flex-col gap-6 max-w-xl w-full">
          {selectedPlatforms.map(platform => {
            const label = platform === "Other" && otherText["platform"] ? otherText["platform"] : platform;
            const placeholder =
              platform === "Instagram" ? "instagram.com/yourhandle"
              : platform === "TikTok"   ? "tiktok.com/@yourhandle"
              : platform === "YouTube"  ? "youtube.com/@yourchannel"
              : "yourprofilelink.com";
            const pErr = platErrs[platform];
            return (
              <div key={platform}>
                <p className="mb-2 text-xs font-semibold tracking-widest uppercase" style={{ color: C.deep }}>{label}</p>
                <input type="text" value={platLinks[platform] ?? ""}
                  onChange={e => {
                    setPlatLinks(p => ({ ...p, [platform]: e.target.value }));
                    if (platErrs[platform]) setPlatErrs(p => { const n = { ...p }; delete n[platform]; return n; });
                  }}
                  placeholder={placeholder}
                  className="w-full bg-transparent border-b-2 outline-none text-lg pb-2 pt-1 transition-colors duration-200 font-display tracking-tight"
                  style={{ color: C.text, borderColor: pErr ? C.error : C.border, caretColor: C.deep }}
                  onFocus={e => (e.currentTarget.style.borderColor = pErr ? C.error : C.teal)}
                  onBlur={e => (e.currentTarget.style.borderColor = pErr ? C.error : C.border)}
                />
                {pErr && <p className="mt-1.5 text-xs font-medium" style={{ color: C.error }}>{pErr}</p>}
              </div>
            );
          })}
          {cur.hint && <p className="text-xs" style={{ color: C.faint }}>{cur.hint}</p>}
        </div>
      );
    }

    return null;
  }

  // ── Show OK button? ────────────────────────────────────────────────────────
  // Select steps auto-advance on click; only show OK if "Other" is chosen
  const showOK = cur?.type !== "select" || otherSelected;

  // ── WELCOME ───────────────────────────────────────────────────────────────
  if (screen === "welcome") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden" style={{ background: C.bg }}>
        <div className="pointer-events-none fixed -top-40 -right-40 w-[500px] h-[500px] rounded-full blur-[140px]" style={{ background: "rgba(145,206,191,0.18)" }} />
        <div className="pointer-events-none fixed bottom-0 -left-40 w-[400px] h-[400px] rounded-full blur-[120px]" style={{ background: "rgba(0,98,92,0.07)" }} />
        <header className="fixed top-6 left-6 sm:left-10 z-40"><a href="/"><Logo variant="dark" /></a></header>
        <motion.div initial={{ opacity: 0, y: 28, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="max-w-lg w-full text-center">
          <h1 style={{ fontFamily: "'Georgia','Times New Roman',serif", fontWeight: 700, fontStyle: "italic", fontSize: "clamp(36px,8vw,60px)", color: C.deep, letterSpacing: "-0.02em", lineHeight: 1, marginBottom: "20px", whiteSpace: "nowrap" }}>
            Hellooo!
          </h1>
          <p className="text-base sm:text-lg leading-relaxed mb-3" style={{ color: "rgba(19,24,24,0.75)" }}>
            You're one step away from exclusive access to{" "}
            <strong style={{ color: C.deep }}>high-value brand campaigns.</strong>
          </p>
          <p className="text-base leading-relaxed mb-10" style={{ color: "rgba(19,24,24,0.60)" }}>
            Answer a few quick questions to get started.
          </p>
          <button onClick={() => { gtagEvent("creator_form_start"); setScreen("form"); }}
            className="inline-flex items-center gap-2 rounded-full px-8 text-base font-medium transition-all duration-200"
            style={{ background: C.deep, color: "#fff", height: "52px", boxShadow: "0 8px 28px -8px rgba(0,98,92,0.45)" }}
            onMouseEnter={e => (e.currentTarget.style.background = C.dark)}
            onMouseLeave={e => (e.currentTarget.style.background = C.deep)}>
            Let's go →
          </button>
        </motion.div>
      </div>
    );
  }

  // ── SUCCESS ───────────────────────────────────────────────────────────────
  if (screen === "success") {
    return (
      <div className="min-h-screen flex flex-col" style={{ background: C.bg }}>
        <div className="fixed top-0 inset-x-0 h-[3px] z-50" style={{ background: C.track }}>
          <motion.div className="h-full" style={{ background: `linear-gradient(90deg,${C.deep} 0%,${C.dark} 50%,${C.teal} 100%)` }}
            initial={{ width: "88%" }} animate={{ width: "100%" }} transition={{ duration: 0.6, ease: "easeOut" }} />
        </div>
        <header className="fixed top-3 inset-x-0 z-40 px-6 sm:px-10"><a href="/"><Logo variant="dark" /></a></header>
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 24, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="max-w-lg">
            <h2 style={{ fontFamily: "'Georgia','Times New Roman',serif", fontStyle: "italic", fontWeight: 700, fontSize: "clamp(28px,5vw,48px)", color: C.deep, letterSpacing: "-0.02em", lineHeight: 1.15, margin: "0 0 20px" }}>
              You're officially on our radar.
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: C.muted }}>
              The Plotwise team is reviewing your profile and will get back to you{" "}
              <strong style={{ color: C.text }}>within 24 hours.</strong>
            </p>
            <p className="mt-6 text-sm italic" style={{ color: C.muted }}>
              This is where creators stop waiting, and start choosing &{" "}
              <strong style={{ color: C.dark }}>growing</strong>.
            </p>
            <a href="/" className="mt-10 inline-flex items-center gap-2 rounded-full px-7 h-12 text-sm font-medium transition-colors"
              style={{ background: C.deep, color: "#fff" }}
              onMouseEnter={e => (e.currentTarget.style.background = C.dark)}
              onMouseLeave={e => (e.currentTarget.style.background = C.deep)}>
              Back to PlotWise
            </a>
          </motion.div>
        </div>
      </div>
    );
  }

  // ── FORM ──────────────────────────────────────────────────────────────────
  const progress = (step / TOTAL) * 100;
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden" style={{ background: C.bg }}>
      <div className="pointer-events-none fixed -top-40 -right-40 w-[500px] h-[500px] rounded-full blur-[140px]" style={{ background: "rgba(145,206,191,0.18)" }} />
      <div className="pointer-events-none fixed bottom-0 -left-40 w-[400px] h-[400px] rounded-full blur-[120px]" style={{ background: "rgba(0,98,92,0.07)" }} />

      {/* Progress bar */}
      <div className="fixed top-0 inset-x-0 z-50">
        <div className="h-[3px] relative" style={{ background: C.track }}>
          <motion.div className="h-full absolute top-0 left-0 z-20"
            style={{ background: `linear-gradient(90deg,${C.deep} 0%,${C.dark} 55%,${C.teal} 100%)` }}
            animate={{ width: `${progress}%` }} transition={{ duration: 0.4, ease: "easeOut" }} />
        </div>
      </div>

      {/* Header */}
      <header className="fixed top-10 inset-x-0 z-40 flex items-center justify-between px-6 sm:px-10 py-3">
        <a href="/" className="opacity-80 hover:opacity-100 transition-opacity"><Logo variant="dark" /></a>
        <span className="text-sm font-mono tabular-nums" style={{ color: C.faint }}>
          {String(step + 1).padStart(2, "0")} / {String(TOTAL).padStart(2, "0")}
        </span>
      </header>

      {/* Main */}
      <div className="flex-1 flex items-center justify-center px-6 sm:px-10 pt-32 pb-28">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div key={step} custom={dir} variants={slide} initial="enter" animate="center" exit="exit"
              className="flex flex-col gap-8">

              {/* Question */}
              <div className="flex gap-5 items-start">
                <span className="font-mono text-base mt-1 shrink-0 tabular-nums" style={{ color: `${C.deep}80` }}>
                  {String(step + 1).padStart(2, "0")} →
                </span>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-[42px] font-normal leading-[1.08] tracking-[-0.025em]" style={{ color: C.text }}>
                  {cur.question}
                </h2>
              </div>

              {/* Input */}
              <div className="pl-10">{renderInput()}</div>

              {/* Navigation */}
              {showOK && (
                <div className="pl-10 flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    {step > 0 && (
                      <button type="button" onClick={() => { setDir(-1); setStep(s => s - 1); setFieldErr(null); }} disabled={sending}
                        className="flex items-center gap-1.5 px-3 h-11 text-sm font-medium transition-colors"
                        style={{ color: C.muted, background: "transparent", border: "none", cursor: sending ? "not-allowed" : "pointer" }}
                        onMouseEnter={e => { if (!sending) e.currentTarget.style.color = C.text; }}
                        onMouseLeave={e => (e.currentTarget.style.color = C.muted)}>
                        <ArrowLeft size={14} /> Back
                      </button>
                    )}
                    <button type="button" onClick={handleOK} disabled={sending}
                      className="px-6 h-11 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2"
                      style={{
                        background: sending ? C.track : C.deep,
                        color: sending ? C.muted : "#fff",
                        cursor: sending ? "not-allowed" : "pointer",
                        boxShadow: sending ? "none" : "0 6px 20px -6px rgba(0,98,92,0.45)",
                      }}
                      onMouseEnter={e => { if (!sending) e.currentTarget.style.background = C.dark; }}
                      onMouseLeave={e => { if (!sending) e.currentTarget.style.background = C.deep; }}>
                      {sending ? (
                        <><svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round"/></svg> Submitting…</>
                      ) : step < TOTAL - 1 ? "OK ✓" : "Submit →"}
                    </button>
                  </div>
                  {submitErr && <p className="text-sm font-medium" style={{ color: C.error }}>{submitErr}</p>}
                  {!otherSelected && step < TOTAL - 1 && (
                    <p className="text-xs" style={{ color: C.faint }}>
                      Press <kbd className="px-1.5 py-0.5 rounded font-mono text-[10px]" style={{ border: `1px solid ${C.border}`, color: C.subtle }}>Enter ↵</kbd> to continue
                    </p>
                  )}
                </div>
              )}

              {/* Back button for select steps (when OK is hidden) */}
              {!showOK && step > 0 && (
                <div className="pl-10">
                  <button type="button" onClick={() => { setDir(-1); setStep(s => s - 1); setFieldErr(null); }}
                    className="flex items-center gap-1.5 px-3 h-11 text-sm font-medium transition-colors"
                    style={{ color: C.muted, background: "transparent", border: "none" }}
                    onMouseEnter={e => (e.currentTarget.style.color = C.text)}
                    onMouseLeave={e => (e.currentTarget.style.color = C.muted)}>
                    <ArrowLeft size={14} /> Back
                  </button>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Step dots */}
      <div className="fixed bottom-8 inset-x-0 flex justify-center gap-1.5 z-40">
        {STEPS.map((_, i) => (
          <div key={i} className="rounded-full transition-all duration-300"
            style={{
              width: i === step ? "20px" : "6px",
              height: "6px",
              background: i < step ? C.deep : i === step ? C.dark : "rgba(19,24,24,0.12)",
            }} />
        ))}
      </div>
    </div>
  );
}
