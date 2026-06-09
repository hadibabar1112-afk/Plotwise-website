import { createFileRoute } from "@tanstack/react-router";
import { ChallengeSolutionPage } from "@/components/site/ChallengeSolutionPage";

export const Route = createFileRoute("/solutions/challenge")({
  component: ChallengeSolutionPage,
});
