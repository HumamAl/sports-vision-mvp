"use client";

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "accent";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyber/50 disabled:opacity-50 disabled:cursor-not-allowed",
          {
            "bg-brand text-white hover:bg-brand-light active:bg-brand-dark": variant === "primary",
            "bg-surface text-foreground border border-border hover:bg-surface-light active:bg-surface-dark": variant === "secondary",
            "text-muted hover:text-foreground hover:bg-surface-light": variant === "ghost",
            "bg-danger text-white hover:bg-red-500 active:bg-red-700": variant === "danger",
            "bg-accent text-white hover:bg-accent-light active:bg-accent-dark": variant === "accent",
          },
          {
            "px-3 py-1.5 text-sm": size === "sm",
            "px-4 py-2 text-sm": size === "md",
            "px-6 py-3 text-base": size === "lg",
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button };
export type { ButtonProps };
