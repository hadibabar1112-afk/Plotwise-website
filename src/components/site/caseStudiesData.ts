import cs1_1 from "@/assets/cases/cs1-new-1.webp";
import cs1_3 from "@/assets/cases/cs1-new-3.webp";
import cs1_4 from "@/assets/cases/cs1-new-4.webp";
import cs1_5 from "@/assets/cases/cs1-new-5.webp";
import cs1_6 from "@/assets/cases/cs1-new-6.webp";
import cs1_6b from "@/assets/cases/cs1-new-6b.webp";
import cs1_v1 from "@/assets/cases/cs1-new-v1.mp4";
import cs1_v2 from "@/assets/cases/cs1-new-v2.mp4";
import cs1_v1_poster from "@/assets/cases/cs1-new-v1.jpg";
import cs1_v2_poster from "@/assets/cases/cs1-new-v2.jpg";
import cs2_1 from "@/assets/cases/cs2-new-1.webp";
import cs2_2 from "@/assets/cases/cs2-new-2.webp";
import cs2_3 from "@/assets/cases/cs2-new-3.webp";
import cs2_4 from "@/assets/cases/cs2-new-4.webp";
import cs2_5 from "@/assets/cases/cs2-new-5.webp";
import cs2_5b from "@/assets/cases/cs2-new-5b.webp";
import cs2_6 from "@/assets/cases/cs2-new-6.webp";
import cs2_6b from "@/assets/cases/cs2-new-6b.webp";
import cs2_7 from "@/assets/cases/cs2-new-7.webp";
import cs2_8 from "@/assets/cases/cs2-new-8.webp";
import cs2_9 from "@/assets/cases/cs2-new-9.webp";
import cs2_v1 from "@/assets/cases/cs2-new-v1.mp4";
import cs2_v1_poster from "@/assets/cases/cs2-new-v1.jpg";
import cs3_8 from "@/assets/cases/cs3-new-8.webp";
import cs3_10 from "@/assets/cases/cs3-new-10.webp";
import cs3_10a from "@/assets/cases/cs3-new-10a.webp";
import cs3_10b from "@/assets/cases/cs3-new-10b.webp";
import cs3_11 from "@/assets/cases/cs3-new-11.webp";
import cs3_11a from "@/assets/cases/cs3-new-11a.webp";
import cs3_13 from "@/assets/cases/cs3-new-13.webp";
import cs3_v1 from "@/assets/cases/cs3-new-v1.mp4";
import cs3_v1_poster from "@/assets/cases/cs3-new-v1.jpg";
import cs1Card from "@/assets/cases/card-cs1.webp";
import cs2Card from "@/assets/cases/card-cs2.webp";
import cs3Card from "@/assets/cases/card-cs3.webp";
import type { CaseStudyData } from "./CaseStudyPopup";

export const richualCase: CaseStudyData = {
  brand: "Skincare Brand Scales to 7 Figures",
  pill: "Skincare & Wellness",
  sub: "Funnel Strategy • UGC Ad Testing • Conversion Lift",
  metrics: [
    { value: "3.2x", label: "ROAS improvement in 90 days" },
    { value: "42%", label: "lower CPA than previous UGC agency" },
    { value: "28%", label: "higher CTR on Plotwise-created hooks" },
  ],
  meta: [
    { term: "Industry", def: "Skincare (Clean Beauty)" },
    { term: "Revenue Stage", def: "$600K → $850K (mid-6 to high-6 figure)" },
    { term: "Time Frame", def: "90 Days" },
    { term: "Platform Focus", def: "Meta-heavy (80% Meta, 20% TikTok)" },
    { term: "Primary Contact", def: "Sarah Chen, Founder" },
  ],
  sections: [
    {
      heading: "The Challenge",
      paragraphs: [
        "The brand had been running Meta ads for 18 months with a generic UGC agency, but growth had plateaued at $600K annual revenue. Their founder, Sarah, faced three core problems:",
        { html: "<strong>Creative Fatigue:</strong> High-performing hooks lost 35–40% effectiveness after 7–10 days, and their agency couldn't produce content fast enough to keep testing." },
        { html: "<strong>Generic Messaging:</strong> Their ads looked identical to competitors — same \"before/after\" hooks, same product demo scripts. Nothing differentiated the brand's clean beauty positioning." },
        { html: "<strong>No Funnel Strategy:</strong> They had awareness content but zero retargeting-specific videos. Cold traffic saw the same ads as warm audiences, leaving money on the table." },
      ],
      pullQuote: "Sarah knew UGC worked, but she needed a <em>system</em>, not just more videos.",
    },
    {
      heading: "The Plotwise Approach",
      phases: [
        {
          tag: "Phase 1 · Week 1–2",
          heading: "Strategic Discovery",
          paragraphs: [
            "We didn't start with production. We started with research: analyzed the brand's top 10 competitors' Meta ad libraries.",
            { html: "<strong>Identified 3 untapped angles:</strong> ingredient transparency, skin barrier repair, and \"slow beauty\" philosophy. Mapped Sarah's customer personas: Problem-Aware (knows they have acne) vs Solution-Aware (actively researching clean ingredients)." },
          ],
        },
        {
          tag: "Phase 2 · Week 2–3",
          heading: "Angle Development",
          paragraphs: ["Based on research, we engineered 5 marketing angles aligned to funnel stages:"],
          funnels: [
            {
              label: "TOF — Cold Traffic",
              items: [
                { ang: "Angle 1", text: "\"Why your skin barrier is broken (and how to fix it)\"" },
                { ang: "Angle 2", text: "\"3 ingredients dermatologists avoid (you're probably using them)\"" },
              ],
            },
            {
              label: "MOF — Retargeting · Engaged",
              items: [{ ang: "Angle 3", text: "\"Clean beauty vs greenwashing: here's the difference\"" }],
            },
            {
              label: "BOF — Retargeting · High Intent",
              items: [
                { ang: "Angle 4", text: "\"Why ordinary works when other serums don't\"" },
                { ang: "Angle 5", text: "Social proof compilation (customer testimonials)" },
              ],
            },
          ],
        },
        {
          tag: "Phase 3 · Week 3–4",
          heading: "Persona-Driven Scripting",
          paragraphs: ["We scripted each angle with 3 hook variations to test:"],
          hooks: [
            { label: "Problem-Agitate hook:", text: "\"If your skin is inflamed, red, or breaking out daily…\"" },
            { label: "Curiosity hook:", text: "\"I spent $500 on serums before I found this…\"" },
            { label: "Social proof hook:", text: "\"12,000 people switched to the brand last month…\"" },
          ],
        },
        {
          tag: "Phase 4 · Week 4–6",
          heading: "Production & Iteration",
          paragraphs: ["We matched creators to personas. First batch: 15 videos (5 angles × 2 hooks each). After 2 weeks of testing:"],
          hooks: [
            { text: "Acne-prone skin (ages 22–28)" },
            { text: "Sensitive skin (ages 30–40)" },
            { text: "Skin barrier repair focus (ages 25–35)" },
          ],
          results: [
            { kind: "winner", html: "Angle 1 (skin barrier) + Curiosity hook = <strong>4.2% CTR</strong>" },
            { kind: "loser", html: "Angle 3 (greenwashing) underperformed" },
          ],
        },
      ],
    },
    {
      heading: "What We Created",
      paragraphs: [
        { html: "<strong>TOF — Skin Barrier Angle (Cold Traffic).</strong> Hook: \"I spent $500 on serums before realizing my skin barrier was destroyed.\" Body explains skin-barrier science in 15 seconds and positions the brand as the solution. CTA: \"Try it risk-free.\" Result: <strong>4.2% CTR, 2.8x ROAS</strong>." },
        { html: "<strong>BOF — Social Proof (Retargeting).</strong> Hook: \"Here's why 12,000 people switched to the brand.\" Body: fast-cut customer testimonials across 5 different skin types. CTA: \"Join them — 20% off today.\" Result: <strong>38% lower CPA</strong> than generic product demo." },
        { html: "<strong>Funnel coherence in action:</strong> cold traffic saw skin-barrier education (TOF), engaged users saw ingredient transparency (MOF), and high-intent users saw social proof (BOF) — driving a <strong>32% conversion-rate lift</strong> on retargeting campaigns." },
      ],
    },
    {
      heading: "The Results",
      stats: [
        { value: "2.1 → 3.2", label: "ROAS — 3.2x improvement" },
        { value: "$68 → $42", label: "CPA — 42% reduction" },
        { value: "2.1% → 2.8%", label: "CTR — 28% improvement" },
        { value: "$600K → $850K", label: "Revenue — scaling toward 7 figures" },
      ],
      paragraphs: [
        { html: "<strong>Strategic outcomes beyond metrics:</strong> creative fatigue solved with weekly content keeping performance stable; the skin-barrier angle became core brand messaging; and the retargeting funnel drove repeat purchases (<strong>LTV up 18%</strong>)." },
      ],
      pullQuote: "\"Before Plotwise, I was gambling every time I launched an ad. Some worked, most didn't, and I had no idea why. Plotwise didn't just give me videos — they gave me a system. The persona research, the angle development, the funnel mapping — it all made sense. For the first time, I felt like I had predictable winners instead of random shots in the dark. We went from $600K to on track for $1M, and I finally have the confidence to scale.\" — Sarah Chen, Founder",
    },
  ],
  media: [
    { src: cs1_1, caption: "01 — Founder portrait" },
    { src: cs1_v1, caption: "02 — Final UGC video", poster: cs1_v1_poster },
    { src: cs1_3, caption: "03 — Product still life" },
    { src: cs1_4, caption: "04 — Texture study" },
    { src: cs1_5, caption: "05 — Creator B-roll" },
    { src: cs1_v2, caption: "06 — Beauty serum cut", poster: cs1_v2_poster },
    { src: cs1_6, caption: "07 — Hero asset" },
    { src: cs1_6b, caption: "08 — Editorial spread" },
  ],
  next: { name: "Haircare Brand Hits 3.6x ROAS", sub: "Creative Testing • Performance Meta Ads • Instagram Growth", idx: "02", image: cs2Card },
};

export const ritualCase: CaseStudyData = {
  brand: "Haircare Brand Hits 3.6x ROAS",
  pill: "Haircare & Curly Specialist",
  sub: "Creative Testing • Performance Meta Ads • Instagram Growth",
  metrics: [
    { value: "3.6x", label: "ROAS on Meta (Instagram-first)" },
    { value: "41%", label: "lower CPM after creative system overhaul" },
    { value: "860K", label: "organic reach in 30 days before scaling paid" },
  ],
  meta: [
    { term: "Category", def: "Haircare (Curly Hair Specialist)" },
    { term: "Stage", def: "$450K → $720K (mid-six to high-six figures)" },
    { term: "Time Frame", def: "60 Days" },
    { term: "Platform Focus", def: "Instagram-native (Reels + Feed + Stories)" },
    { term: "Primary Contact", def: "Jasmine Williams, Founder" },
  ],
  sections: [
    {
      heading: "The Real Bottleneck",
      paragraphs: [
        "They had consistent organic posting, but conversion performance was unstable.",
        "Reels would spike engagement, but paid campaigns struggled to scale. The issue wasn't content volume — it was lack of a system that tied organic resonance to paid performance.",
      ],
    },
    {
      heading: "What We Diagnosed",
      paragraphs: [
        { html: "<strong>1) Content didn't create belief.</strong> Engagement wasn't translating to action because messaging wasn't closing objections." },
        { html: "<strong>2) Hooks weren't designed for paid.</strong> Reels opened slow and lost attention in the first 3 seconds." },
        { html: "<strong>3) No structured testing.</strong> Ideas were posted, not tested against a clear hypothesis." },
      ],
    },
    {
      heading: "The Plotwise Strategy",
      paragraphs: ["We built an Instagram-native system focused on belief + performance."],
      phases: [
        {
          tag: "Phase 1 · Week 1",
          heading: "Audience Psychology",
          paragraphs: ["We mapped the core beliefs blocking purchase:"],
          hooks: [
            { text: "\"It won't work for my curl type.\"" },
            { text: "\"Results don't last.\"" },
            { text: "\"Premium haircare — is it worth it?\"" },
          ],
        },
        {
          tag: "Phase 2 · Week 2–3",
          heading: "Angle Architecture",
          paragraphs: ["We built an angle system tied to funnel stages. Each concept shipped with 2 hook variations."],
          funnels: [
            { label: "TOF", items: [{ text: "Curiosity + myth-busting" }] },
            { label: "MOF", items: [{ text: "Proof + differentiation" }] },
            { label: "BOF", items: [{ text: "Objection handling + urgency" }] },
          ],
        },
        {
          tag: "Phase 3 · Week 3–4",
          heading: "Creator Matching",
          paragraphs: ["Creators were shortlisted for curl-type credibility, delivery style, and funnel fit."],
        },
        {
          tag: "Phase 4 · Week 4–8",
          heading: "Test + Iterate",
          paragraphs: ["We tested angles across Reels + Ads, then scaled only the winners."],
        },
      ],
    },
    {
      heading: "What We Created",
      paragraphs: [
        { html: "<strong>9 creator-led Reels</strong> aligned to belief gaps, with <strong>2 hooks per Reel</strong> to accelerate learning." },
        { html: "<strong>Retargeting creatives</strong> for MOF + BOF, plus multi-placement cuts for Feed, Reels, and Stories." },
      ],
    },
    {
      heading: "What Actually Worked",
      paragraphs: ["Three winning angles emerged from testing:"],
      phases: [
        {
          tag: "Winner 1",
          heading: "Curl-Type Credibility",
          paragraphs: [
            { html: "<strong>Hook:</strong> \"If you have 4C hair, this will change your routine.\"" },
            { html: "<strong>Why it worked:</strong> instant relevance + belief alignment." },
          ],
        },
        {
          tag: "Winner 2",
          heading: "Objection Handling",
          paragraphs: [
            { html: "<strong>Hook:</strong> \"I didn't want to pay premium either — until I saw this.\"" },
            { html: "<strong>Why it worked:</strong> addresses value hesitation with proof." },
          ],
        },
        {
          tag: "Winner 3",
          heading: "Proof + Transformation",
          paragraphs: [
            { html: "<strong>Hook:</strong> \"This is what 14 days of consistent use looks like.\"" },
            { html: "<strong>Why it worked:</strong> tangible results + timeline clarity." },
          ],
        },
      ],
    },
    {
      heading: "Outcome",
      paragraphs: [
        "Once content was engineered around belief gaps and hooks:",
        { html: "<strong>CPMs dropped 41%</strong>, <strong>ROAS stabilized at 3.6x</strong>, and revenue run rate increased to $720K. Performance became predictable, not random." },
      ],
    },
    {
      heading: "What This Proved",
      paragraphs: [
        { html: "<strong>1) Belief drives conversion.</strong> Engagement isn't enough unless the narrative changes what buyers believe." },
        { html: "<strong>2) Angles scale, assets don't.</strong> Winning angles created repeatable winners." },
        { html: "<strong>3) Instagram rewards clarity + credibility.</strong> Hooks that speak directly to the buyer outperform aesthetic content alone." },
      ],
      pullQuote: "\"Plotwise didn't just make Reels — they built the system behind them. Once we fixed the belief gaps, performance started being predictable and we felt comfortable spending more budget on the performance marketing.\" — Jasmine Williams, Founder",
    },
  ],
  media: [
    { src: cs2_1, caption: "01 — Creator portrait" },
    { src: cs2_v1, caption: "02 — Final UGC video", poster: cs2_v1_poster },
    { src: cs2_2, caption: "03 — Product still life" },
    { src: cs2_3, caption: "04 — Texture detail" },
    { src: cs2_4, caption: "05 — Behind the scenes" },
    { src: cs2_5, caption: "06 — Hero range shot" },
    { src: cs2_5b, caption: "07 — Editorial spread" },
    { src: cs2_6, caption: "08 — Product detail" },
    { src: cs2_6b, caption: "09 — Creator moment" },
    { src: cs2_7, caption: "10 — Studio still" },
    { src: cs2_8, caption: "11 — Lifestyle shot" },
    { src: cs2_9, caption: "12 — Editorial close-up" },
  ],
  forceSoloTail: 2,
  next: { name: "Beauty Brand Boosts Content Velocity by 42%", sub: "Content Systems • Omnichannel Creative • Brand Scale", idx: "03", image: cs3Card },
};

export const cocoaCase: CaseStudyData = {
  brand: "Beauty Brand Boosts Content Velocity by 42%",
  pill: "Beauty · DTC + Retail",
  sub: "Content Systems • Omnichannel Creative • Brand Scale",
  metrics: [
    { value: "3.4x", label: "blended ROAS with stable performance across channels" },
    { value: "42%", label: "increase in content velocity without quality drop" },
    { value: "↑", label: "higher brand recall (repeat engagement + branded search lift)" },
  ],
  meta: [
    { term: "Category", def: "Beauty (DTC + Retail)" },
    { term: "Stage", def: "$1.5M – $2M ARR" },
    { term: "Platform Focus", def: "Omnichannel (Meta, TikTok, YouTube, Email, In-Store)" },
    { term: "Primary Contact", def: "Growth CMO" },
  ],
  sections: [
    {
      heading: "The Real Bottleneck",
      paragraphs: [
        "This brand wasn't struggling to win — they were struggling to stay remembered.",
        "They already had winners and a functioning content system — but they faced three new challenges:",
        { html: "<strong>1)</strong> Creative volume couldn't scale without diluting brand quality." },
        { html: "<strong>2)</strong> Performance content didn't build long-term brand memory." },
        { html: "<strong>3)</strong> Assets weren't cohesive across channels (ads, email, retail, social)." },
      ],
      pullQuote: "At this stage, reputation and consistency mattered as much as ROAS.",
    },
    {
      heading: "What We Diagnosed",
      paragraphs: [
        { html: "<strong>Winning ads ≠ long-term brand equity.</strong>" },
        { html: "<strong>High volume without narrative consistency creates forgettable brands.</strong>" },
        { html: "<strong>Teams were optimising for clicks, not memory.</strong> They didn't need more ads — they needed a brand-anchored content engine." },
      ],
    },
    {
      heading: "The Plotwise Strategy",
      paragraphs: ["We built a Content Memory System — designed to scale content volume while deepening brand recall."],
      phases: [
        {
          tag: "Phase 1 · Week 1–2",
          heading: "Memory Anchors",
          paragraphs: ["We defined the brand's memory anchors — the 3–4 ideas the market must associate with the brand."],
          hooks: [
            { text: "\"Performance without compromise\"" },
            { text: "\"Clean beauty that lasts\"" },
            { text: "\"Real results, not hype\"" },
          ],
        },
        {
          tag: "Phase 2 · Week 2–3",
          heading: "Narrative Standardization",
          paragraphs: ["We built a brand narrative grid that ensured every asset reinforced the same core memory anchors, regardless of channel."],
        },
        {
          tag: "Phase 3 · Week 3–5",
          heading: "Creator + Asset Expansion",
          paragraphs: ["We scaled output through creator briefs tied to the same anchor system, producing:"],
          hooks: [
            { text: "UGC for paid" },
            { text: "Founder-style organic" },
            { text: "Email-ready assets" },
            { text: "Retail/in-store content" },
          ],
        },
        {
          tag: "Phase 4 · Week 5–8",
          heading: "Omnichannel Distribution",
          paragraphs: ["We mapped each asset to multiple distribution points to create constant repetition without fatigue."],
        },
      ],
    },
    {
      heading: "What We Created",
      paragraphs: [
        { html: "<strong>18 creator-led videos</strong> tied to memory anchors." },
        { html: "<strong>3 narrative frameworks</strong> reused across paid, organic, and email." },
        { html: "<strong>Multi-format cuts</strong> for Reels, Stories, YouTube, and PDPs." },
        { html: "<strong>Evergreen content</strong> for in-house outlets and retail screens." },
      ],
    },
    {
      heading: "Outcome",
      paragraphs: [
        "Performance held while content volume increased.",
        "Brand recall improved because messaging stayed consistent, and assets became reusable across every channel.",
        "The brand became easier to remember — not just easier to click.",
      ],
    },
    {
      heading: "What This Proved",
      paragraphs: [
        { html: "<strong>1) Brand memory is a performance lever.</strong> When people remember you, CAC stabilizes and LTV rises." },
        { html: "<strong>2) Consistency scales better than novelty.</strong> A repeatable narrative beats random creative spikes." },
        { html: "<strong>3) Omnipresence only works if it's coherent.</strong> More channels don't help unless the message stays aligned." },
      ],
      pullQuote: "\"Before Plotwise, we had plenty of ads running but no real story holding it all together. We needed someone who could guide the content around a clear plan, not just ship more assets. Plotwise helped us define the narrative, align every channel, and build a system we could actually scale. The result was steadier performance and a brand people remembered, not just clicked.\" — Growth CMO",
    },
  ],
  media: [
    { src: cs3_8, caption: "01 — Brand portrait" },
    { src: cs3_v1, caption: "02 — Final UGC video", poster: cs3_v1_poster },
    { src: cs3_10, caption: "03 — Product still life" },
    { src: cs3_10a, caption: "04 — Beauty close-up" },
    { src: cs3_10b, caption: "05 — Range hero" },
    { src: cs3_11, caption: "06 — Editorial spread" },
    { src: cs3_11a, caption: "07 — Creator moment" },
    { src: cs3_13, caption: "08 — Texture grid" },
  ],
  forceSoloTail: 2,
  next: { name: "Skincare Brand Scales to 7 Figures", sub: "Funnel Strategy • UGC Ad Testing • Conversion Lift", idx: "01", image: cs1Card },
};
