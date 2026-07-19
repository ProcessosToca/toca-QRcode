import type { ReactNode } from "react";

interface TagProps {
  children: ReactNode;
  tone?: "neutral" | "accent";
}

export function Tag({ children, tone = "neutral" }: TagProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${
        tone === "accent"
          ? "bg-accent text-white"
          : "bg-surface text-muted border border-line"
      }`}
    >
      {children}
    </span>
  );
}
