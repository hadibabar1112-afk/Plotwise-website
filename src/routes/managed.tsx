import { createFileRoute } from "@tanstack/react-router";
import { ManagedForm } from "@/components/site/ManagedForm";

export const Route = createFileRoute("/managed")({
  component: ManagedPage,
});

function ManagedPage() {
  return <ManagedForm />;
}
