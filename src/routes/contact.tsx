import { createFileRoute } from "@tanstack/react-router";
import { ContactForm } from "@/components/site/ContactForm";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact Us — PlotWise" },
      { name: "description", content: "Tell us about your brand and we'll be in touch within 48 hours." },
    ],
  }),
});

function ContactPage() {
  return <ContactForm />;
}
