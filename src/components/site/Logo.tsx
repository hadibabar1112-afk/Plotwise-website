import logoDark from "@/assets/plotwise-logo-dark.png";
import logoLight from "@/assets/plotwise-logo-light.png";

export function Logo({
  className = "",
  variant = "dark",
}: {
  className?: string;
  variant?: "dark" | "light";
  showWord?: boolean;
}) {
  const src = variant === "light" ? logoLight : logoDark;
  return (
    <img
      src={src}
      alt="PlotWise"
      className={`h-7 w-auto select-none ${className}`}
      draggable={false}
    />
  );
}