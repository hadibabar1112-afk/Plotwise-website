import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/solutions")({
  beforeLoad: ({ location }) => {
    // /solutions with no sub-path → redirect to the overview anchor on homepage
    if (location.pathname === "/solutions" || location.pathname === "/solutions/") {
      throw redirect({ to: "/#solutions" });
    }
  },
  component: () => <Outlet />,
});
