import { createFileRoute } from "@tanstack/react-router";
import { EnterpriseForm } from "@/components/site/EnterpriseForm";

export const Route = createFileRoute("/enterprise")({
  component: EnterprisePage,
});

function EnterprisePage() {
  return <EnterpriseForm />;
}
