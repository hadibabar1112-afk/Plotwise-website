import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { WhyItWorks } from "@/components/site/WhyItWorks";
import { HowItWorks } from "@/components/site/HowItWorks";
import { DualHook } from "@/components/site/DualHook";
import { MidCTA } from "@/components/site/MidCTA";
import {
  Problem,
  Work,
  FAQ,
  Apply,
  Footer,
} from "@/components/site/Sections";
import { UgcAnswer } from "@/components/site/UgcAnswer";
import { Creators } from "@/components/site/Creators";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "PlotWise — Turning Attention Into Action" },
      { name: "description", content: "Creator-led growth systems for beauty and beauty-adjacent e-commerce brands ready to scale. Research-led, performance-driven UGC." },
      { property: "og:title", content: "PlotWise — Turning Attention Into Action" },
      { property: "og:description", content: "Creator-led growth systems for beauty brands ready to scale." },
    ],
  }),
});

function Index() {
  return (
    <div className="bg-background text-foreground antialiased">
      <Nav />
      <main>
        <Hero />
        <Problem />
        <UgcAnswer />
        <Creators />
        <HowItWorks />
        <DualHook />
        <Work />
        <WhyItWorks />
        <MidCTA />
        <FAQ />
        <Apply />
      </main>
      <Footer />
    </div>
  );
}
