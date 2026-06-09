import { createFileRoute } from "@tanstack/react-router";
import { ChallengeForm } from "@/components/site/ChallengeForm";

export const Route = createFileRoute("/challenge")({
  component: ChallengePage,
});

function ChallengePage() {
  return <ChallengeForm />;
}
