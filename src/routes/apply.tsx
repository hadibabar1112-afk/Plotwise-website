import { createFileRoute } from "@tanstack/react-router";
import { ApplyChoice } from "@/components/site/ApplyChoice";

export const Route = createFileRoute("/apply")({
  component: ApplyPage,
});

function ApplyPage() {
  return <ApplyChoice />;
}
