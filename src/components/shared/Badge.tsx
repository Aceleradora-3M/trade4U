import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "teal" | "navy" | "green" | "default";
  className?: string;
}

const variants = {
  teal: "bg-accent/10 text-accent border-accent/20",
  navy: "bg-primary/30 text-blue-300 border-blue-500/20",
  green: "bg-green-500/10 text-green-400 border-green-500/20",
  default: "bg-white/5 text-slate-300 border-white/10",
};

export default function Badge({
  children,
  variant = "teal",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full border ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
