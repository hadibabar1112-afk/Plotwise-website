import { createFileRoute } from "@tanstack/react-router";
import { EnterpriseSolutionPage } from "@/components/site/EnterpriseSolutionPage";

export const Route = createFileRoute("/solutions/enterprise")({
  component: EnterpriseSolutionPage,
});
