import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "danger" | "cyber";
}

function Badge({ className, variant = "default", children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        {
          "bg-surface-light text-muted": variant === "default",
          "bg-accent/15 text-accent": variant === "success",
          "bg-warning/15 text-warning": variant === "warning",
          "bg-danger/15 text-danger": variant === "danger",
          "bg-cyber/15 text-cyber": variant === "cyber",
        },
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export { Badge };
export type { BadgeProps };
