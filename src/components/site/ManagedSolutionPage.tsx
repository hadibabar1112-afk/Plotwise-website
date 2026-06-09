import { SolutionPageLayout, type SolutionPageData } from "./SolutionPageLayout";

const DATA: SolutionPageData = {
  // ── hero
  eyebrow: "MANAGED CAMPAIGNS",
  headline: "Your creative engine.",
  headlineEmphasis: "Fully managed.",
  tags: ["Strategy", "Production", "Performance", "Iteration"],
  subheadline:
    "We build the system, run the process, and deliver content that compounds — so you can focus on scaling the brand.",
  ctaLabel: "Apply for Managed Campaigns",
  ctaHref: "/managed",

  // ── who
  whoHeadline: "Built for scaling beauty brands.",
  whoBody:
    "You've outgrown freelancers. Agencies are slow and expensive. Marketplaces don't know your brand. You need a creative partner that understands beauty, runs on performance data, and improves with every campaign — without eating your founder hours.",
  whoCards: [
    "You're running Meta or TikTok ads and need creative that actually converts.",
    "You've tried agencies, freelancers, or marketplaces — and hit a ceiling.",
    "You want a system that learns, not a vendor you have to re-brief every month.",
  ],

  // ── how
  howHeadline: "Psychology in. Performance out.",
  howSteps: [
    {
      title: "Research",
      body: "We map your audience's beliefs, fears, and motivations. Production is the last step, not the first.",
    },
    {
      title: "Strategy",
      body: "Belief gaps become creative angles, sorted by funnel stage — awareness, consideration, conversion. Every video has a job before it's shot.",
    },
    {
      title: "Production",
      body: "Creators matched to the persona they convert. Every video ships with structurally different hooks. Scripted, directed, delivered.",
    },
    {
      title: "Compound",
      body: "Performance data feeds back in. Winning hooks rewrite the brief. Losing angles get retired. The next batch starts smarter than the last.",
    },
  ],

  // ── deliverables
  deliverables: [
    {
      title: "Audience and persona research",
      body: "Who your buyer is, what she believes, and what needs to change.",
    },
    {
      title: "Funnel-mapped creative angles",
      body: "TOF for attention. MOF for consideration. BOF for conversion.",
    },
    {
      title: "Creator matching and management",
      body: "Vetted beauty creators matched to your personas. We handle everything.",
    },
    {
      title: "Multi-hook video production",
      body: "Every video ships with two hooks. Twice the signal, zero guesswork.",
    },
    {
      title: "Performance tracking and iteration",
      body: "We track what works, retire what doesn't, and start the next cycle smarter.",
    },
    {
      title: "Multi-format delivery",
      body: "9:16, 1:1, 4:5, 16:9. Ready for Reels, TikTok, Shorts, and feed.",
    },
  ],

  // ── why
  whyHeadline: "This isn't content production. It's a growth system.",
  proofPoints: [
    {
      stat: "3.2×",
      label: "Average ROAS uplift across managed partners.",
    },
    {
      stat: "2 hooks",
      label: "Twice the testing surface from day one.",
    },
    {
      stat: "10 brands",
      label: "We go deeper with fewer. That's the point.",
    },
  ],

  // ── data layer
  dataHeadline: "Every campaign feeds a system that gets smarter.",
  dataBody:
    "Behind every Managed engagement is the Plotwise data layer — a compounding library of performance signals structured by persona and funnel stage. Which creator. Which hook. Which audience. Which outcome. Over time, the system learns what converts for your buyer profile and starts each campaign sharper than the last. This is what separates a creative system from a content vendor.",

  // ── closing
  closingHeadline: "Ready to hand over the creative engine?",
  closingSubheadline:
    "We work with 10 brands per season — deeply, not broadly. If you're scaling beauty and want a system that compounds, let's talk.",
  closingCtaLabel: "Apply for Managed Campaigns",
  closingCtaHref: "/managed",
};

export function ManagedSolutionPage() {
  return <SolutionPageLayout data={DATA} />;
}
