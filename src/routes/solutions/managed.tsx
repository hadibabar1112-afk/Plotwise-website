import { createFileRoute } from "@tanstack/react-router";
import { ManagedSolutionPage } from "@/components/site/ManagedSolutionPage";

export const Route = createFileRoute("/solutions/managed")({
  component: ManagedSolutionPage,
});
