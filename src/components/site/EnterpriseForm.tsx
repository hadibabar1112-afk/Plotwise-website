import { BrandFormEngine, type BrandStepDef } from "./BrandFormEngine";

const STEPS: BrandStepDef[] = [
  {
    id: "companyName",
    type: "text",
    question: "What's the name of your company?",
    placeholder: "Company name…",
    required: true,
  },
  {
    id: "yourName",
    type: "text",
    question: "What's your name?",
    placeholder: "Your name…",
    required: true,
  },
  {
    id: "role",
    type: "text",
    question: "What's your role?",
    placeholder: "e.g. Head of Marketing, CMO…",
    required: true,
  },
  {
    id: "websiteUrl",
    type: "url",
    question: "What's your website URL?",
    placeholder: "yourcompany.com",
    optional: true,
    required: false,
  },
  {
    id: "brands",
    type: "textarea",
    question: "Which brands or product lines are you looking to activate?",
    placeholder: "List them here — one per line if multiple…",
    required: true,
  },
  {
    id: "engagementType",
    type: "multiselect",
    question: "What type of creator engagement are you looking for?",
    hint: "Select all that apply",
    options: [
      "Always-on UGC creators",
      "Campaign-specific creators",
      "Influencer seeding / gifting",
      "Paid creator partnerships",
      "Whitelisting / dark posting",
      "Other",
    ],
    required: true,
  },
  {
    id: "creatorCount",
    type: "select",
    question: "Roughly how many creators per month are you looking to activate?",
    options: ["Under 50", "50–200", "200–500", "500–1,000", "1,000+"],
    required: true,
  },
  {
    id: "markets",
    type: "multiselect",
    question: "Which markets do you need coverage in?",
    hint: "Select all that apply",
    options: [
      "United States",
      "United Kingdom",
      "Canada",
      "Australia",
      "Europe",
      "Global / multiple",
      "Other",
    ],
    required: true,
  },
  {
    id: "timeline",
    type: "select",
    question: "What's your target timeline to get started?",
    options: [
      "ASAP — within 2 weeks",
      "Next month",
      "Next quarter",
      "Exploring for now",
    ],
    required: true,
  },
  {
    id: "notes",
    type: "textarea",
    question: "Anything else we should know before we connect?",
    placeholder: "Brief context, goals, or questions…",
    optional: true,
    required: false,
  },
  {
    id: "email",
    type: "email",
    question: "What's your work email?",
    placeholder: "you@company.com",
    hint: "We'll be in touch within 24 hours.",
    required: true,
  },
];

export function EnterpriseForm() {
  return (
    <BrandFormEngine
      formTitle="Enterprise"
      formSubtitle="Custom creator infrastructure built for your scale."
      steps={STEPS}
      apiEndpoint="/api/enterprise"
      backHref="/brand"
    />
  );
}
