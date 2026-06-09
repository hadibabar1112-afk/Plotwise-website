import { createFileRoute } from "@tanstack/react-router";
import { BrandChoice } from "@/components/site/BrandChoice";

export const Route = createFileRoute("/brand")({
  component: BrandPage,
});

function BrandPage() {
  return <BrandChoice />;
}
