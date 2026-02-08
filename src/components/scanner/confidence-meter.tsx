"use client";

import { cn } from "@/lib/utils";

interface ConfidenceMeterProps {
  confidence: number;
}

function ConfidenceMeter({ confidence }: ConfidenceMeterProps) {
  const percentage = Math.round(confidence * 100);
  const color =
    confidence >= 0.85
      ? "bg-accent"
      : confidence >= 0.6
        ? "bg-warning"
        : "bg-danger";

  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-[9px] font-mono uppercase tracking-widest text-muted">
        AVG Confidence
      </span>
      <div className="relative w-24 h-2 bg-white/10 rounded-full overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all duration-500 animate-confidence-fill", color)}
          style={{
            width: `${percentage}%`,
            ["--confidence-width" as string]: `${percentage}%`,
          }}
        />
      </div>
      <span className="text-[10px] font-mono text-foreground tabular-nums">
        {percentage}%
      </span>
    </div>
  );
}

export { ConfidenceMeter };
