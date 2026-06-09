import { BrandFormEngine, type BrandStepDef } from "./BrandFormEngine";

const STEPS: BrandStepDef[] = [
  {
    id: "brandName",
    type: "text",
    question: "What's the name of your brand?",
    placeholder: "Brand name…",
    required: true,
  },
  {
    id: "websiteUrl",
    type: "url",
    question: "What's your website URL?",
    placeholder: "yourbrand.com",
    hint: "We'll take a look at your site to get context.",
    required: false,
    optional: true,
  },
  {
    id: "category",
    type: "select",
    question: "Which category best describes your brand?",
    options: [
      "Skincare",
      "Haircare",
      "Cosmetics / Makeup",
      "Wellness & Supplements",
      "Fragrance",
      "Other",
    ],
    required: true,
  },
  {
    id: "location",
    type: "select",
    question: "Where is your brand based?",
    options: [
      "United States",
      "United Kingdom",
      "Canada",
      "Australia",
      "Europe",
      "Other",
    ],
    required: true,
  },
  {
    id: "revenue",
    type: "select",
    question: "What's your current annual revenue range?",
    options: [
      "Pre-revenue / under $100K",
      "$100K – $500K",
      "$500K – $2M",
      "$2M – $10M",
      "$10M+",
    ],
    required: true,
  },
  {
    id: "paidAds",
    type: "select",
    question: "Are you currently running paid ads?",
    options: ["Yes — Meta / TikTok / Google", "Yes — other channels", "No — exploring now", "No — organic only"],
    required: true,
  },
  {
    id: "platforms",
    type: "multiselect",
    question: "Which platforms are most important for your content?",
    hint: "Select all that apply",
    options: ["TikTok", "Instagram Reels", "YouTube Shorts", "Pinterest", "Facebook", "Other"],
    required: true,
  },
  {
    id: "challenge",
    type: "select",
    question: "What's the biggest challenge you're facing right now?",
    options: [
      "Not enough quality UGC content",
      "Creator outreach is too time-consuming",
      "Low ROAS on paid ads",
      "Building brand awareness from scratch",
      "Other",
    ],
    required: true,
  },
  {
    id: "referral",
    type: "select",
    question: "How did you hear about Plotwise?",
    options: [
      "TikTok / Instagram",
      "Word of mouth / referral",
      "Google search",
      "Podcast / newsletter",
      "Other",
    ],
    required: false,
    optional: true,
  },
  {
    id: "name",
    type: "text",
    question: "What's your name?",
    placeholder: "Your name…",
    required: true,
  },
  {
    id: "email",
    type: "email",
    question: "What's the best email to reach you?",
    placeholder: "you@yourbrand.com",
    hint: "We'll only use this to follow up on your application.",
    required: true,
  },
];

export function ManagedForm() {
  return (
    <BrandFormEngine
      formTitle="Managed Campaigns"
      formSubtitle="We run creator campaigns end-to-end for your brand."
      steps={STEPS}
      apiEndpoint="/api/managed"
      backHref="/brand"
    />
  );
}
