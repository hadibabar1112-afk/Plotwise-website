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
});

function Index() {
  return (
    <div className="bg-background text-foreground antialiased">
      <Nav />
      <main>
        <Hero />
        <Problem />
        <UgcAnswer />
        <HowItWorks />
        <DualHook />
        <Work />
        <WhyItWorks />
        <Creators />
        <MidCTA />
        <FAQ />
        <Apply />
      </main>
      <Footer />
    </div>
  );
}
