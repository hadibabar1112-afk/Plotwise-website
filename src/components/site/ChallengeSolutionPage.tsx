import { SolutionPageLayout, type SolutionPageData } from "./SolutionPageLayout";

const DATA: SolutionPageData = {
  // ── hero
  eyebrow: "CHALLENGE CAMPAIGNS",
  headline: "Your creators. Your campaigns.",
  headlineEmphasis: "Our network.",
  tags: ["Creator Matching", "Open Challenges", "Strategy Framework", "Performance Tracking"],
  subheadline:
    "Self-serve access to a vetted beauty creator network — with matching, performance tracking, and a system that gets smarter with every campaign you run.",
  ctaLabel: "Join the Challenge Platform",
  ctaHref: "/challenge",

  // ── who
  whoHeadline: "Built for beauty brands that want to move fast.",
  whoBody:
    "You know your brand. You know your audience. You don't need someone to run your strategy — you need access to the right creators, fast matching, and a platform that actually captures what's working. The Challenge Platform gives you the infrastructure. You drive it.",
  whoCards: [
    "You're running ads and need a steady flow of fresh beauty content.",
    "You want to pick your own creators from a vetted, beauty-only network.",
    "You want performance data that actually feeds back into your next campaign.",
  ],

  // ── how
  howHeadline: "Connect. Launch. Learn.",
  howSteps: [
    {
      title: "Connect your brand",
      body: "Sign up, connect your ad account, and tell us what you're looking for — product, audience, goals.",
    },
    {
      title: "Get matched to creators",
      body: "Our system ranks and surfaces the best-fit beauty creators for your brief. You pick the roster.",
    },
    {
      title: "Launch and approve",
      body: "Creators produce. You review and approve. Content ships in the formats you need.",
    },
    {
      title: "Track and compound",
      body: "Every campaign captures performance data — hook rate, CTR, ROAS — so the next one starts sharper.",
    },
    {
      title: "Open Challenges",
      body: "Post your brief as an open challenge. Creators compete, produce, and submit — top-performing videos become your assets. Creators earn prize money. You get volume, variety, and winners.",
    },
  ],
  howExtra: {
    label: "Also included: Plotwise Strategy Framework",
    body: "Challenge brands get full access to the Plotwise strategy framework — the same persona mapping, funnel-stage angles, and hook structures we use in Managed campaigns. It's not managed for you, but it's fully available for you to execute yourself.",
  },

  // ── deliverables
  deliverables: [
    {
      title: "Vetted creator network",
      body: "Beauty-only. Hand-selected for aesthetic alignment, audience authenticity, and camera presence.",
    },
    {
      title: "Smart creator matching",
      body: "Ranked by fit for your brand, product, and audience persona.",
    },
    {
      title: "Open challenges",
      body: "Post your brief as a challenge. Creators compete, you keep the top-performing content.",
    },
    {
      title: "Plotwise strategy framework",
      body: "Full access to our persona mapping, funnel-stage angles, and hook structures — execute the system yourself.",
    },
    {
      title: "Ad account integration",
      body: "Connect Meta or TikTok. Performance flows back automatically.",
    },
    {
      title: "Campaign management tools",
      body: "Launch campaigns, manage briefs, approve content — all in one place.",
    },
    {
      title: "Performance capture",
      body: "Structured data on every campaign. What worked, what didn't, and why.",
    },
    {
      title: "Multi-format delivery",
      body: "9:16, 1:1, 4:5, 16:9. Platform-ready.",
    },
  ],

  // ── why
  whyHeadline: "More than a marketplace. Less than an agency. Exactly what you need.",
  proofPoints: [
    {
      stat: "Beauty-only",
      label: "No generalists. Every creator in the network understands beauty content.",
    },
    {
      stat: "Tracked",
      label: "Every campaign captures structured data. The system learns whether you do or not.",
    },
    {
      stat: "Focused",
      label: "The narrower the network, the sharper the matches. Beauty brands only.",
    },
  ],

  // ── data layer
  dataHeadline: "Your campaigns build something bigger than content.",
  dataBody:
    "Every campaign you run on the Challenge Platform captures structured performance data — creator, hook, funnel stage, persona, outcome. You see your own results. But underneath, every brand on the platform is sharpening the same creative library. That means better creator matches, smarter suggestions, and a platform that improves even when you're not running campaigns. The data layer is what makes this a system, not a marketplace.",

  // ── closing
  closingHeadline: "Ready to run your own campaigns on a smarter platform?",
  closingSubheadline:
    "Connect your brand, pick your creators, and start building a content engine that improves with every cycle.",
  closingCtaLabel: "Join the Challenge Platform",
  closingCtaHref: "/challenge",
};

export function ChallengeSolutionPage() {
  return <SolutionPageLayout data={DATA} />;
}
