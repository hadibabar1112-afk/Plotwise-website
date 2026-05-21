import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "./Logo";
import { ArrowLeft, Check, ChevronDown, Search } from "lucide-react";

// ── Country data ────────────────────────────────────────────────────────────
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

// ── Types ────────────────────────────────────────────────────────────────────
type AnswerValue = string | string[];

interface StepDef {
  id: string;
  type: "text" | "email" | "phone" | "url" | "select" | "multiselect" | "textarea" | "platformlinks" | "groupedmultiselect" | "countrydropdown";
  question: string;
  placeholder?: string;
  hint?: string;
  options?: string[];
  groups?: { label: string; options: string[] }[];
  required?: boolean;
  rows?: number;
}

// ── Steps ────────────────────────────────────────────────────────────────────
const STEPS: StepDef[] = [
  // Section 1: The basics
  { id: "name", type: "text", question: "What should we call you?", placeholder: "Your full name", required: true },
  { id: "email", type: "email", question: "Where can we reach you?", placeholder: "you@email.com", required: true },
  { id: "phone", type: "phone", question: "What's your phone or WhatsApp number?", placeholder: "300 123 4567", hint: "For faster coordination once you're onboarded.", required: true },
  { id: "location", type: "countrydropdown", question: "Which country are you based in?", hint: "Helps us match you with brands shipping in your region.", required: true },
  // Section 2: Your content
  { id: "platform", type: "multiselect", question: "Where do you create most content?", hint: "Select all that apply", options: ["Instagram", "TikTok", "YouTube", "Other"], required: true },
  { id: "profileLink", type: "platformlinks", question: "Drop your profile link(s)", hint: "One link per platform", required: true },
  { id: "followerCount", type: "select", question: "What's your follower count across platforms?", hint: "We work with all sizes — this just helps us match campaigns.", options: ["Under 5K", "5–25K", "25–100K", "100K+"], required: true },
  { id: "niche", type: "multiselect", question: "What do you primarily create?", hint: "Select all that apply", options: ["Beauty", "Skincare", "Haircare", "Makeup", "Wellness", "Lifestyle", "Fitness", "Other"], required: true },
  { id: "ugcSamples", type: "textarea", question: "Link 2–3 of your best UGC samples", placeholder: "Paste links here…", hint: "UGC/ad-style content — drive links, public posts, or portfolios all work.", required: true, rows: 1 },
  { id: "contentFormats", type: "multiselect", question: "What content formats are you strongest at?", hint: "Select all that apply", options: ["Talking head", "Voiceover", "Demo & tutorial", "Unboxing", "Before & after", "Lifestyle B-roll", "Skits", "Static photos"], required: true },
  // Section 3: Experience & fit
  { id: "ageRange", type: "select", question: "Which age bracket do you fall into?", options: ["18–24", "25–34", "35–44", "45+"], required: true },
  {
    id: "skinToneHair", type: "groupedmultiselect",
    question: "Tell us a bit about your skin, tone & hair",
    hint: "Pick what applies. Skip anything you'd rather not share.",
    groups: [
      { label: "Skin type", options: ["Oily", "Dry", "Combination", "Sensitive", "Acne-prone"] },
      { label: "Skin tone", options: ["Fair", "Light", "Medium", "Tan", "Deep"] },
      { label: "Hair type", options: ["Straight", "Wavy", "Curly", "Coily", "Textured"] },
    ],
    required: true,
  },
  { id: "contentStyle", type: "multiselect", question: "What's your strongest content style?", hint: "Select all that apply", options: ["Hook-driven short ads", "Tutorial & demo", "Storytelling & narrative", "Reviews & testimonials", "Comedic & skit-based", "High-volume variant testing"], required: true },
  { id: "experience", type: "select", question: "How would you describe your creator journey?", options: ["Just getting started", "Consistent creator", "Brand-experienced", "Performance-focused / Ad-ready", "Other"], required: true },
  // Section 4: Capacity
  { id: "availability", type: "text", question: "How many campaigns could you realistically take on per month?", placeholder: "e.g. 2–3", hint: "Enter a number or range", required: true },
  { id: "turnaround", type: "select", question: "From product received → footage delivered, what can you commit to?", options: ["Under 5 days", "5–10 days", "10+ days"], required: true },
  { id: "campaigns", type: "multiselect", question: "What type of campaigns excite you?", hint: "Select all that apply", options: ["Paid UGC for ads", "Long-term brand partnerships", "High-volume creative testing", "Performance-driven content", "Narrative-driven storytelling", "Other"], required: true },
  { id: "whyPlotwise", type: "textarea", question: "What made you want to join Plotwise?", placeholder: "Tell us in a few sentences…", hint: "Be as specific as you like", rows: 1 },
];

const TOTAL = STEPS.length;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const slideVariants: any = {
  enter: (d: number) => ({ y: d * 36, opacity: 0, filter: "blur(6px)" }),
  center: { y: 0, opacity: 1, filter: "blur(0px)", transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
  exit: (d: number) => ({ y: d * -36, opacity: 0, filter: "blur(6px)", transition: { duration: 0.25, ease: "easeIn" } }),
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
  dotInactive: "rgba(19,24,24,0.12)",
  dotDone:     "rgba(0,98,92,0.35)",
  error:       "#c0392b",
};

const DEFAULT_DIAL: CountryData = { code: "US", name: "United States", dial: "+1", flag: "🇺🇸" };

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
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [platformLinkErrors, setPlatformLinkErrors] = useState<Record<string, string>>({});

  // Phone dial code state
  const [phoneDialCode, setPhoneDialCode] = useState<CountryData>(DEFAULT_DIAL);
  const [phoneDialOpen, setPhoneDialOpen] = useState(false);
  const [phoneDialSearch, setPhoneDialSearch] = useState("");

  // Country dropdown state
  const [countryOpen, setCountryOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const otherInputRef = useRef<HTMLInputElement>(null);
  const phoneDropdownRef = useRef<HTMLDivElement>(null);
  const countryDropdownRef = useRef<HTMLDivElement>(null);

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

  // ── Close dropdowns on outside click ──────────────────────────────────────
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (phoneDropdownRef.current && !phoneDropdownRef.current.contains(e.target as Node)) {
        setPhoneDialOpen(false);
      }
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(e.target as Node)) {
        setCountryOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ── Can advance ────────────────────────────────────────────────────────────
  const canAdvance = (() => {
    if (current?.type === "platformlinks") {
      if (selectedPlatforms.length === 0) return false;
      return selectedPlatforms.every((p) => (platformLinkValues[p] ?? "").trim().length > 0);
    }
    if (current?.type === "groupedmultiselect") {
      if (current.required) return ((answers[current.id] as string[]) ?? []).length > 0;
      return true;
    }
    if (otherSelected && !otherFilled) return false;
    if (current?.required) {
      if (current.type === "multiselect") return (answer as string[]).length > 0;
      return (answer as string).trim().length > 0;
    }
    return true;
  })();

  const clearError = useCallback((id: string) => {
    setFieldErrors((prev) => {
      if (!prev[id]) return prev;
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }, []);

  const setAns = useCallback(
    (val: AnswerValue) => {
      setAnswers((prev) => ({ ...prev, [current.id]: val }));
      clearError(current.id);
    },
    [current?.id, clearError]
  );

  // ── Validation (runs on OK click) ──────────────────────────────────────────
  const validateCurrentStep = useCallback((): string | null => {
    const id = current.id;
    const val = answers[id] ?? (
      current.type === "multiselect" || current.type === "groupedmultiselect" ? [] : ""
    );

    // Email format
    if (current.type === "email") {
      const str = (val as string).trim();
      if (!str) return "Email address is required.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str)) return "Please enter a valid email address.";
      return null;
    }

    // Phone — numbers only
    if (current.type === "phone") {
      const str = (val as string).trim();
      if (!str) return "Phone number is required.";
      if (!/^\d+$/.test(str)) return "Only numbers are allowed — please remove any letters or special characters.";
      return null;
    }

    // Platform links — per-field errors, auto-prepend https://
    if (current.type === "platformlinks") {
      const newPlatformErrors: Record<string, string> = {};
      let hasError = false;
      for (const platform of selectedPlatforms) {
        const raw = (platformLinkValues[platform] ?? "").trim();
        if (!raw) {
          newPlatformErrors[platform] = `Please enter your ${platform} profile link.`;
          hasError = true;
          continue;
        }
        const link = /^https?:\/\//.test(raw) ? raw : `https://${raw}`;
        if (platform === "Instagram" && !link.includes("instagram.com")) {
          newPlatformErrors[platform] = `Doesn't look like an Instagram link. Try: instagram.com/yourhandle`;
          hasError = true;
        } else if (platform === "TikTok" && !link.includes("tiktok.com")) {
          newPlatformErrors[platform] = `Doesn't look like a TikTok link. Try: tiktok.com/@yourhandle`;
          hasError = true;
        } else if (platform === "YouTube" && !link.includes("youtube.com") && !link.includes("youtu.be")) {
          newPlatformErrors[platform] = `Doesn't look like a YouTube link. Try: youtube.com/@yourchannel`;
          hasError = true;
        }
      }
      setPlatformLinkErrors(newPlatformErrors);
      return hasError ? "__platform_errors__" : null;
    }

    // Country dropdown
    if (current.type === "countrydropdown") {
      if (current.required && !(val as string)) return "Please select your country.";
      return null;
    }

    // Required multiselect / grouped
    if (current.type === "multiselect" || current.type === "groupedmultiselect") {
      if (current.required && ((val as string[]) ?? []).length === 0) return "Please select at least one option.";
      return null;
    }

    // Other text required when Other selected
    if (otherSelected && !otherFilled) return "Please describe your choice.";

    // Generic required text/textarea
    if (current.required && current.type !== "select") {
      if (!(val as string).trim()) return "This field is required.";
    }

    return null;
  }, [current, answers, selectedPlatforms, platformLinkValues, otherSelected, otherFilled]);

  // ── Navigation ─────────────────────────────────────────────────────────────
  const goNext = useCallback(async () => {
    const error = validateCurrentStep();
    if (error) {
      if (error !== "__platform_errors__") {
        setFieldErrors((prev) => ({ ...prev, [current.id]: error }));
      }
      return;
    }

    if (step < TOTAL - 1) {
      setDir(1);
      setStep((s) => s + 1);
    } else {
      const profileLinkStr = selectedPlatforms
        .map((p) => {
          const label = p === "Other" && otherText["platform"] ? otherText["platform"] : p;
          const raw = (platformLinkValues[p] ?? "").trim();
          if (!raw) return null;
          const link = /^https?:\/\//.test(raw) ? raw : `https://${raw}`;
          return `${label}: ${link}`;
        })
        .filter(Boolean)
        .join("\n");

      const phoneVal = (answers["phone"] as string ?? "").trim();
      const finalAnswers = {
        ...answers,
        profileLink: profileLinkStr,
        phone: phoneVal ? `${phoneDialCode.dial} ${phoneVal}` : "",
      };

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
  }, [step, current, answers, otherText, platformLinkValues, selectedPlatforms, phoneDialCode, validateCurrentStep]);

  const goPrev = useCallback(() => {
    if (step > 0) { setDir(-1); setStep((s) => s - 1); }
  }, [step]);

  const handleSelectChoice = useCallback(
    (opt: string) => {
      setAnswers((prev) => ({ ...prev, [current.id]: opt }));
      clearError(current.id);
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
    [step, current?.id, clearError]
  );

  const toggleMulti = useCallback(
    (opt: string, id?: string) => {
      const targetId = id ?? current.id;
      const cur = (answers[targetId] as string[]) ?? [];
      const next = cur.includes(opt) ? cur.filter((o) => o !== opt) : [...cur, opt];
      setAnswers((prev) => ({ ...prev, [targetId]: next }));
      clearError(targetId);
      if (targetId === current.id && opt === "Other" && !cur.includes("Other")) {
        setTimeout(() => otherInputRef.current?.focus(), 100);
      }
    },
    [answers, current?.id, clearError]
  );

  // ── Keyboard + autofocus ───────────────────────────────────────────────────
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (submitted || !started) return;
      if (
        e.key === "Enter" &&
        current.type !== "textarea" &&
        current.type !== "select" &&
        current.type !== "multiselect" &&
        current.type !== "groupedmultiselect" &&
        current.type !== "platformlinks" &&
        current.type !== "countrydropdown"
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
      else if (current.type === "text" || current.type === "url" || current.type === "email")
        inputRef.current?.focus();
    }, 450);
    return () => clearTimeout(t);
  }, [step, current?.type, submitted, started]);

  // ── Input renderer ─────────────────────────────────────────────────────────
  const renderInput = () => {
    if (!current) return null;
    const err = fieldErrors[current.id];

    const inputBase =
      "w-full bg-transparent border-b-2 outline-none text-xl sm:text-2xl pb-3 pt-1 transition-colors duration-300 font-display tracking-tight";

    const ErrorMsg = ({ msg }: { msg: string }) => (
      <p className="mt-2 text-sm font-medium" style={{ color: T.error }}>{msg}</p>
    );

    // ── Text / Email / URL ─────────────────────────────────────────────────
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
            style={{ color: T.text, borderColor: err ? T.error : T.border, caretColor: T.deep }}
            onFocus={(e) => (e.currentTarget.style.borderColor = err ? T.error : T.teal)}
            onBlur={(e) => (e.currentTarget.style.borderColor = err ? T.error : T.border)}
            onKeyDown={(e) => { if (e.key === "Enter" && canAdvance) goNext(); }}
          />
          {current.hint && <p className="mt-3 text-sm" style={{ color: T.textFaint }}>{current.hint}</p>}
          {err ? <ErrorMsg msg={err} /> : (
            <p className="mt-5 text-xs tracking-wide" style={{ color: T.textFaint }}>
              Press{" "}
              <kbd className="px-1.5 py-0.5 rounded font-mono text-[10px]"
                style={{ border: `1px solid ${T.border}`, color: T.textMuted }}>
                Enter ↵
              </kbd>{" "}
              to continue
            </p>
          )}
        </div>
      );
    }

    // ── Phone ──────────────────────────────────────────────────────────────
    if (current.type === "phone") {
      const filteredDials = COUNTRIES.filter((c) =>
        c.name.toLowerCase().includes(phoneDialSearch.toLowerCase()) ||
        c.dial.includes(phoneDialSearch)
      );
      return (
        <div className="w-full max-w-xl">
          <div className="flex items-stretch gap-0">
            {/* Dial code selector */}
            <div ref={phoneDropdownRef} className="relative shrink-0">
              <button
                type="button"
                onClick={() => { setPhoneDialOpen((o) => !o); setPhoneDialSearch(""); }}
                className="flex items-center gap-1.5 px-3 h-full border-b-2 transition-colors duration-300"
                style={{ borderColor: err ? T.error : T.border, color: T.text, background: "transparent" }}
              >
                <span style={{ fontSize: "20px", lineHeight: 1 }}>{phoneDialCode.flag}</span>
                <span className="text-base font-mono tabular-nums" style={{ color: T.textSubtle }}>{phoneDialCode.dial}</span>
                <motion.span animate={{ rotate: phoneDialOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown size={13} style={{ color: T.textFaint }} />
                </motion.span>
              </button>

              <AnimatePresence>
                {phoneDialOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scaleY: 0.96 }}
                    animate={{ opacity: 1, y: 0, scaleY: 1 }}
                    exit={{ opacity: 0, y: -8, scaleY: 0.96 }}
                    transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                    style={{ transformOrigin: "top", background: "#fff", border: `1px solid ${T.border}`, width: "280px" }}
                    className="absolute top-full left-0 z-50 mt-1 rounded-xl shadow-2xl overflow-hidden"
                  >
                    <div className="p-2.5" style={{ borderBottom: `1px solid ${T.border}` }}>
                      <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg" style={{ background: T.optionBg }}>
                        <Search size={13} style={{ color: T.textFaint }} />
                        <input
                          type="text"
                          value={phoneDialSearch}
                          onChange={(e) => setPhoneDialSearch(e.target.value)}
                          placeholder="Search country or code…"
                          className="flex-1 outline-none text-sm bg-transparent"
                          style={{ color: T.text }}
                          autoFocus
                        />
                      </div>
                    </div>
                    <div className="overflow-y-auto" style={{ maxHeight: "220px" }}>
                      {filteredDials.length === 0 && (
                        <p className="px-4 py-3 text-sm" style={{ color: T.textFaint }}>No results</p>
                      )}
                      {filteredDials.map((c) => (
                        <button key={c.code} type="button"
                          onClick={() => { setPhoneDialCode(c); setPhoneDialOpen(false); setPhoneDialSearch(""); }}
                          className="w-full flex items-center gap-2.5 px-3.5 py-2 text-sm text-left transition-colors"
                          style={{
                            color: phoneDialCode.code === c.code ? T.deep : T.text,
                            background: phoneDialCode.code === c.code ? "rgba(0,98,92,0.06)" : "transparent",
                            fontWeight: phoneDialCode.code === c.code ? 600 : 400,
                          }}
                          onMouseEnter={(e) => { if (phoneDialCode.code !== c.code) e.currentTarget.style.background = T.optionBg; }}
                          onMouseLeave={(e) => { if (phoneDialCode.code !== c.code) e.currentTarget.style.background = "transparent"; }}
                        >
                          <span>{c.flag}</span>
                          <span className="flex-1 truncate">{c.name}</span>
                          <span className="font-mono text-xs shrink-0" style={{ color: T.textFaint }}>{c.dial}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Number input */}
            <input
              ref={inputRef}
              type="tel"
              inputMode="numeric"
              value={answer as string}
              onChange={(e) => setAns(e.target.value)}
              placeholder={current.placeholder}
              className={`${inputBase} flex-1 pl-3`}
              style={{ color: T.text, borderColor: err ? T.error : T.border, caretColor: T.deep }}
              onFocus={(e) => (e.currentTarget.style.borderColor = err ? T.error : T.teal)}
              onBlur={(e) => (e.currentTarget.style.borderColor = err ? T.error : T.border)}
              onKeyDown={(e) => { if (e.key === "Enter" && canAdvance) goNext(); }}
            />
          </div>
          {current.hint && <p className="mt-3 text-sm" style={{ color: T.textFaint }}>{current.hint}</p>}
          {err && <ErrorMsg msg={err} />}
        </div>
      );
    }

    // ── Country dropdown ───────────────────────────────────────────────────
    if (current.type === "countrydropdown") {
      const selected = answer as string;
      const filteredCountries = COUNTRIES.filter((c) =>
        c.name.toLowerCase().includes(countrySearch.toLowerCase())
      );
      return (
        <div className="w-full max-w-xl relative" ref={countryDropdownRef}>
          <button
            type="button"
            onClick={() => { setCountryOpen((o) => !o); setCountrySearch(""); }}
            className="w-full flex items-center justify-between gap-3 border-b-2 pb-3 pt-1 text-xl sm:text-2xl font-display tracking-tight transition-colors duration-300 text-left"
            style={{
              color: selected ? T.text : T.textFaint,
              borderColor: err ? T.error : (countryOpen ? T.teal : T.border),
              background: "transparent",
            }}
          >
            <span className="flex items-center gap-2.5">
              {selected && (
                <span style={{ fontSize: "20px", lineHeight: 1 }}>
                  {COUNTRIES.find((c) => c.name === selected)?.flag}
                </span>
              )}
              <span>{selected || "Select your country"}</span>
            </span>
            <motion.span animate={{ rotate: countryOpen ? 180 : 0 }} transition={{ duration: 0.2 }} className="shrink-0">
              <ChevronDown size={20} style={{ color: T.textFaint }} />
            </motion.span>
          </button>

          <AnimatePresence>
            {countryOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scaleY: 0.96 }}
                animate={{ opacity: 1, y: 0, scaleY: 1 }}
                exit={{ opacity: 0, y: -8, scaleY: 0.96 }}
                transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: "top", background: "#fff", border: `1px solid ${T.border}` }}
                className="absolute top-full left-0 right-0 mt-1 z-50 rounded-xl shadow-2xl overflow-hidden"
              >
                <div className="p-2.5" style={{ borderBottom: `1px solid ${T.border}` }}>
                  <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg" style={{ background: T.optionBg }}>
                    <Search size={13} style={{ color: T.textFaint }} />
                    <input
                      type="text"
                      value={countrySearch}
                      onChange={(e) => setCountrySearch(e.target.value)}
                      placeholder="Search country…"
                      className="flex-1 outline-none text-sm bg-transparent"
                      style={{ color: T.text }}
                      autoFocus
                    />
                  </div>
                </div>
                <div className="overflow-y-auto" style={{ maxHeight: "240px" }}>
                  {filteredCountries.length === 0 && (
                    <p className="px-4 py-3 text-sm" style={{ color: T.textFaint }}>No countries found</p>
                  )}
                  {filteredCountries.map((c) => (
                    <button key={c.code} type="button"
                      onClick={() => { setAns(c.name); setCountryOpen(false); setCountrySearch(""); }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left transition-colors"
                      style={{
                        color: selected === c.name ? T.deep : T.text,
                        background: selected === c.name ? "rgba(0,98,92,0.06)" : "transparent",
                        fontWeight: selected === c.name ? 600 : 400,
                      }}
                      onMouseEnter={(e) => { if (selected !== c.name) e.currentTarget.style.background = T.optionBg; }}
                      onMouseLeave={(e) => { if (selected !== c.name) e.currentTarget.style.background = "transparent"; }}
                    >
                      <span style={{ fontSize: "16px" }}>{c.flag}</span>
                      <span className="flex-1">{c.name}</span>
                      {selected === c.name && <Check size={13} strokeWidth={2.5} style={{ color: T.deep }} />}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          {current.hint && <p className="mt-3 text-sm" style={{ color: T.textFaint }}>{current.hint}</p>}
          {err && <ErrorMsg msg={err} />}
        </div>
      );
    }

    // ── Textarea ───────────────────────────────────────────────────────────
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
            rows={current.rows ?? 1}
            className={`${inputBase} resize-none leading-relaxed`}
            style={{
              color: T.text,
              borderColor: err ? T.error : T.border,
              caretColor: T.deep,
              overflow: "hidden",
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = err ? T.error : T.teal)}
            onBlur={(e) => (e.currentTarget.style.borderColor = err ? T.error : T.border)}
          />
          {current.hint && <p className="mt-2 text-sm" style={{ color: T.textFaint }}>{current.hint}</p>}
          {err ? <ErrorMsg msg={err} /> : (
            <p className="mt-3 text-xs" style={{ color: T.textFaint }}>
              <kbd className="px-1.5 py-0.5 rounded font-mono text-[10px]"
                style={{ border: `1px solid ${T.border}`, color: T.textMuted }}>
                Shift + Enter
              </kbd>{" "}
              for new line
            </p>
          )}
        </div>
      );
    }

    // ── Select ─────────────────────────────────────────────────────────────
    if (current.type === "select") {
      const showOther = answer === "Other";
      return (
        <div className="flex flex-col gap-4 max-w-xl">
          {current.hint && <p className="text-sm -mt-2" style={{ color: T.textFaint }}>{current.hint}</p>}
          <div className="flex flex-wrap gap-3">
            {current.options?.map((opt, i) => {
              const sel = answer === opt;
              return (
                <button key={opt} type="button" onClick={() => handleSelectChoice(opt)}
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
                onChange={(e) => { setOtherText((prev) => ({ ...prev, [current.id]: e.target.value })); clearError(current.id); }}
                placeholder="Please describe…"
                className="w-full bg-transparent border-b-2 outline-none text-lg pb-2 pt-1 transition-colors duration-300 font-display tracking-tight"
                style={{ color: T.text, borderColor: T.border, caretColor: T.deep }}
                onFocus={(e) => (e.currentTarget.style.borderColor = T.teal)}
                onBlur={(e) => (e.currentTarget.style.borderColor = T.border)}
                onKeyDown={(e) => { if (e.key === "Enter" && otherFilled) goNext(); }}
              />
            </motion.div>
          )}
          {err && <ErrorMsg msg={err} />}
        </div>
      );
    }

    // ── Multiselect ────────────────────────────────────────────────────────
    if (current.type === "multiselect") {
      const selected = answer as string[];
      const showOther = selected.includes("Other");
      return (
        <div className="flex flex-col gap-4 max-w-xl w-full">
          {current.hint && <p className="text-sm -mt-2" style={{ color: T.textFaint }}>{current.hint}</p>}
          <div className="flex flex-wrap gap-3">
            {current.options?.map((opt) => {
              const sel = selected.includes(opt);
              return (
                <button key={opt} type="button" onClick={() => toggleMulti(opt)}
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
                onChange={(e) => { setOtherText((prev) => ({ ...prev, [current.id]: e.target.value })); clearError(current.id); }}
                placeholder="Please describe…"
                className="w-full bg-transparent border-b-2 outline-none text-lg pb-2 pt-1 transition-colors duration-300 font-display tracking-tight"
                style={{ color: T.text, borderColor: T.border, caretColor: T.deep }}
                onFocus={(e) => (e.currentTarget.style.borderColor = T.teal)}
                onBlur={(e) => (e.currentTarget.style.borderColor = T.border)}
              />
            </motion.div>
          )}
          {err ? <ErrorMsg msg={err} /> : selected.length > 0 && (
            <p className="text-xs" style={{ color: T.textFaint }}>{selected.length} selected · click OK to continue</p>
          )}
        </div>
      );
    }

    // ── Grouped multiselect ────────────────────────────────────────────────
    if (current.type === "groupedmultiselect") {
      const selected = (answers[current.id] as string[]) ?? [];
      return (
        <div className="flex flex-col gap-6 max-w-xl w-full">
          {current.hint && <p className="text-sm -mt-2" style={{ color: T.textFaint }}>{current.hint}</p>}
          {current.groups?.map((group) => (
            <div key={group.label}>
              <p className="mb-2.5 text-xs font-semibold tracking-widest uppercase" style={{ color: T.deep }}>{group.label}</p>
              <div className="flex flex-wrap gap-2.5">
                {group.options.map((opt) => {
                  const sel = selected.includes(opt);
                  return (
                    <button key={opt} type="button" onClick={() => toggleMulti(opt, current.id)}
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
          {err ? <ErrorMsg msg={err} /> : selected.length > 0 && (
            <p className="text-xs" style={{ color: T.textFaint }}>{selected.length} selected · click OK to continue</p>
          )}
        </div>
      );
    }

    // ── Platform links ─────────────────────────────────────────────────────
    if (current.type === "platformlinks") {
      if (selectedPlatforms.length === 0) {
        return <p className="text-sm" style={{ color: T.textFaint }}>Please go back and select at least one platform.</p>;
      }
      return (
        <div className="flex flex-col gap-6 max-w-xl w-full">
          {selectedPlatforms.map((platform) => {
            const label = platform === "Other" && otherText["platform"] ? otherText["platform"] : platform;
            const placeholder =
              platform === "Instagram" ? "instagram.com/yourhandle"
              : platform === "TikTok" ? "tiktok.com/@yourhandle"
              : platform === "YouTube" ? "youtube.com/@yourchannel"
              : "yourprofilelink.com";
            const fieldErr = platformLinkErrors[platform];
            return (
              <div key={platform}>
                <p className="mb-2 text-xs font-semibold tracking-widest uppercase" style={{ color: T.deep }}>{label}</p>
                <input
                  type="text"
                  value={platformLinkValues[platform] ?? ""}
                  onChange={(e) => {
                    setPlatformLinkValues((prev) => ({ ...prev, [platform]: e.target.value }));
                    if (platformLinkErrors[platform]) {
                      setPlatformLinkErrors((prev) => { const n = { ...prev }; delete n[platform]; return n; });
                    }
                  }}
                  placeholder={placeholder}
                  className="w-full bg-transparent border-b-2 outline-none text-lg pb-2 pt-1 transition-colors duration-300 font-display tracking-tight"
                  style={{ color: T.text, borderColor: fieldErr ? T.error : T.border, caretColor: T.deep }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = fieldErr ? T.error : T.teal)}
                  onBlur={(e) => (e.currentTarget.style.borderColor = fieldErr ? T.error : T.border)}
                />
                {fieldErr && <p className="mt-1.5 text-xs font-medium" style={{ color: T.error }}>{fieldErr}</p>}
              </div>
            );
          })}
          {current.hint && <p className="text-xs" style={{ color: T.textFaint }}>{current.hint}</p>}
        </div>
      );
    }

    return null;
  };

  // ── Welcome screen ─────────────────────────────────────────────────────────
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
            fontSize: "clamp(36px, 8vw, 60px)",
            color: T.deep,
            letterSpacing: "-0.02em",
            margin: 0,
            lineHeight: 1,
            marginBottom: "20px",
            whiteSpace: "nowrap",
          }}>
            Hellooo!
          </h1>

          <p className="text-base sm:text-lg leading-relaxed mb-3"
            style={{ color: "rgba(19,24,24,0.75)" }}>
            You're one step away from exclusive access to{" "}
            <strong style={{ color: T.deep }}>high-value brand campaigns.</strong>
          </p>
          <p className="text-base leading-relaxed mb-10"
            style={{ color: "rgba(19,24,24,0.60)" }}>
            Answer a few quick questions to get started.
          </p>

          <button
            onClick={() => setStarted(true)}
            className="inline-flex items-center gap-2 rounded-full px-8 text-base font-medium transition-all duration-200"
            style={{ background: T.deep, color: "#fff", height: "52px", boxShadow: "0 8px 28px -8px rgba(0,98,92,0.45)" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = T.dark)}
            onMouseLeave={(e) => (e.currentTarget.style.background = T.deep)}
          >
            Get Started →
          </button>
          <p className="mt-6 text-xs" style={{ color: "rgba(19,24,24,0.45)" }}>Takes less than 2 minutes</p>
        </motion.div>
      </div>
    );
  }

  // ── Thank you screen ───────────────────────────────────────────────────────
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
            <h2 style={{
              fontFamily: "'Georgia', 'Times New Roman', serif",
              fontStyle: "italic",
              fontWeight: 700,
              fontSize: "clamp(28px, 5vw, 48px)",
              color: T.deep,
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
              margin: 0,
              marginBottom: "20px",
            }}>
              You're officially on our radar.
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: T.textMuted }}>
              The Plotwise team is reviewing your profile and will get back to you{" "}
              <strong style={{ color: T.text }}>within 24 hours.</strong>
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

  // ── Form ───────────────────────────────────────────────────────────────────
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
                      <button type="button" onClick={goPrev} disabled={sending}
                        className="flex items-center gap-1.5 px-3 h-11 text-sm font-medium transition-all duration-200"
                        style={{ color: T.textMuted, background: "transparent", border: "none", cursor: sending ? "not-allowed" : "pointer" }}
                        onMouseEnter={(e) => { if (!sending) e.currentTarget.style.color = T.text; }}
                        onMouseLeave={(e) => (e.currentTarget.style.color = T.textMuted)}>
                        <ArrowLeft size={14} /> Back
                      </button>
                    )}
                    <button type="button" onClick={goNext} disabled={sending}
                      className="px-6 h-11 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2"
                      style={{
                        background: !sending ? T.deep : T.trackBg,
                        color: !sending ? "#fff" : T.textFaint,
                        cursor: !sending ? "pointer" : "not-allowed",
                        boxShadow: !sending ? `0 8px 28px -8px rgba(0,98,92,0.35)` : "none",
                        opacity: canAdvance ? 1 : 0.5,
                      }}
                      onMouseEnter={(e) => { if (!sending) e.currentTarget.style.background = T.dark; }}
                      onMouseLeave={(e) => { if (!sending) e.currentTarget.style.background = T.deep; }}>
                      {sending ? (
                        <>
                          <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="31.4 31.4" />
                          </svg>
                          Sending…
                        </>
                      ) : step === TOTAL - 1 ? "Submit" : "OK →"}
                    </button>
                  </div>
                  {sendError && (
                    <p className="text-sm font-medium" style={{ color: T.error }}>{sendError}</p>
                  )}
                </div>
              )}

              {/* Back only — for auto-advance selects */}
              {current.type === "select" && answer !== "Other" && step > 0 && (
                <div className="pl-10">
                  <button type="button" onClick={goPrev}
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
