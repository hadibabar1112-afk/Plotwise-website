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
    optional: true,
    required: false,
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
    id: "paidAds",
    type: "select",
    question: "Are you currently running paid ads?",
    options: ["Yes — Meta / TikTok / Google", "Yes — other channels", "No — exploring now", "No — organic only"],
    required: true,
  },
  {
    id: "adAccount",
    type: "select",
    question: "Do you have a TikTok ad account set up?",
    options: ["Yes, active and running", "Yes, set up but not active", "No, not yet", "Not sure"],
    required: true,
  },
  {
    id: "contentVolume",
    type: "select",
    question: "How much content are you currently producing per month?",
    options: ["0–5 videos", "6–20 videos", "21–50 videos", "50+ videos"],
    required: true,
  },
  {
    id: "goal",
    type: "select",
    question: "What's the primary goal for your challenge campaign?",
    options: [
      "Brand awareness at scale",
      "Drive direct sales / ROAS",
      "Build a library of UGC",
      "Go viral on TikTok",
      "Other",
    ],
    required: true,
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

export function ChallengeForm() {
  return (
    <BrandFormEngine
      formTitle="Challenge Campaigns"
      formSubtitle="Viral creator challenges designed to generate mass awareness."
      steps={STEPS}
      apiEndpoint="/api/challenge"
      backHref="/brand"
    />
  );
}
