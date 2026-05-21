import { createFileRoute } from "@tanstack/react-router";
import { CreatorForm } from "@/components/site/CreatorForm";

export const Route = createFileRoute("/creators")({
  component: CreatorPage,
});

function CreatorPage() {
  return <CreatorForm />;
}
