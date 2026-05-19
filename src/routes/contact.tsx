import { createFileRoute } from "@tanstack/react-router";
import { ContactForm } from "@/components/site/ContactForm";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
});

function ContactPage() {
  return <ContactForm />;
}
