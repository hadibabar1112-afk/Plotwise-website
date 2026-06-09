import { SolutionPageLayout, type SolutionPageData } from "./SolutionPageLayout";

const DATA: SolutionPageData = {
  // ── hero
  eyebrow: "ENTERPRISE CONTENT SOLUTIONS",
  headline: "Scale that",
  headlineEmphasis: "doesn't break.",
  tags: ["Distribution", "Multi-Market", "Creator Deployment", "Launch Speed"],
  subheadline:
    "Deploy vetted beauty creators on a single launch. Multi-market. Performance-tracked. Delivered in days, not months.",
  ctaLabel: "Get in Touch",
  ctaHref: "/enterprise",
  minimumQualifier: "For campaigns requiring 25+ videos.",

  // ── who
  whoHeadline: "Built for brands that launch at a different scale.",
  whoBody:
    "You're launching a hero product, entering a new market, or activating across regions simultaneously. You need volume, speed, and quality — and you need it orchestrated, not cobbled together. Plotwise deploys a vetted creator network at the scale and speed an internal team can't match.\n\nEnterprise is for campaigns requiring 25 or more videos.",
  whoCards: [
    "You're launching a product and need creators mobilized in days, not months.",
    "You need multi-market deployment — US, UK, EU, APAC — from a single partner.",
    "You want reach and engagement data captured at every touchpoint, not just a content dump.",
  ],

  // ── how
  howHeadline: "One brief. Hundreds of creators. Full orchestration.",
  howSteps: [
    {
      title: "Brief and scope",
      body: "Define the launch — product, markets, timeline, creator volume. We build the deployment plan.",
    },
    {
      title: "Creator mobilization",
      body: "We activate creators from our vetted beauty network, matched by market, persona, and aesthetic.",
    },
    {
      title: "Production and delivery",
      body: "Creators produce. We manage sourcing, briefs, direction, review, and multi-format delivery. You approve the final cut.",
    },
    {
      title: "Performance capture",
      body: "Reach, engagement, and conversion signals flow back from every activation. Every launch makes the next one sharper.",
    },
  ],

  // ── deliverables
  deliverables: [
    {
      title: "Large-scale creator deployment",
      body: "Deployed from a vetted, beauty-only network. No cold starts.",
    },
    {
      title: "Multi-market reach",
      body: "US, UK, Canada, Australia, EU, and beyond. One partner, global deployment.",
    },
    {
      title: "Fast launch speed",
      body: "From brief to live content in days. Built for product launch timelines.",
    },
    {
      title: "Full production management",
      body: "Sourcing, briefing, directing, reviewing, delivering. End-to-end.",
    },
    {
      title: "Performance data at every touchpoint",
      body: "Reach, engagement, and conversion captured per creator, per market.",
    },
    {
      title: "Creator network density",
      body: "Every launch deepens the network. The next deployment starts with a stronger bench.",
    },
  ],

  // ── why
  whyHeadline: "One launch. Hundreds of voices. One system capturing it all.",
  proofPoints: [
    {
      stat: "Beauty-native",
      label: "Every creator in the pool understands beauty content. No generalists, no marketplace pulls.",
    },
    {
      stat: "Days",
      label: "From brief to market. The infrastructure is already built.",
    },
    {
      stat: "Structured",
      label: "Every activation captures structured data — not vanity metrics.",
    },
  ],

  // ── data layer
  dataHeadline: "Every launch trains the next one.",
  dataBody:
    "Enterprise activations generate massive volumes of structured performance data — across creators, markets, personas, and content formats. Reach, engagement, and conversion signals flow back from every deployment, building a compounding picture of what works at scale for beauty launches. Each campaign leaves the network smarter and the next deployment faster to execute.",

  // ── closing
  closingHeadline: "Launching something big?",
  closingSubheadline:
    "Tell us about the product, the markets, and the timeline. We'll build the deployment plan.",
  closingCtaLabel: "Get in Touch",
  closingCtaHref: "/enterprise",
};

export function EnterpriseSolutionPage() {
  return <SolutionPageLayout data={DATA} />;
}
