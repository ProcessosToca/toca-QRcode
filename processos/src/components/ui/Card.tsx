import type { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  highlighted?: boolean;
}

export function Card({
  children,
  highlighted = false,
  className = "",
  ...props
}: CardProps) {
  return (
    <div
      className={`rounded-2xl border p-6 transition-colors ${
        highlighted
          ? "border-accent bg-accent-soft"
          : "border-line bg-surface"
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
