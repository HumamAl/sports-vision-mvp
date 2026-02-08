"use client";

import { cn } from "@/lib/utils";
import { formatConfidence, formatDuration } from "@/lib/utils";

interface DetectionHudProps {
  scanning: boolean;
  objectCount: number;
  maxObjects: number;
  elapsedSeconds: number;
  avgConfidence: number;
}

function DetectionHud({
  scanning,
  objectCount,
  maxObjects,
  elapsedSeconds,
  avgConfidence,
}: DetectionHudProps) {
  const confidenceColor =
    avgConfidence >= 0.85
      ? "text-accent"
      : avgConfidence >= 0.6
        ? "text-warning"
        : "text-danger";

  return (
    <>
      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-4 py-2 bg-black/60 backdrop-blur-sm font-mono text-xs">
        <div className="flex items-center gap-2">
          <div
            className={cn(
              "h-2 w-2 rounded-full",
              scanning ? "bg-accent animate-pulse" : "bg-muted"
            )}
          />
          <span className={cn(scanning ? "text-accent" : "text-muted")}>
            {scanning ? "SCANNING" : "IDLE"}
          </span>
        </div>
        <div className="text-cyber tabular-nums">
          {formatDuration(elapsedSeconds)}
        </div>
        <div className="text-muted">
          Objects: <span className="text-foreground">{objectCount}</span>
          <span className="text-muted/60">/{maxObjects}</span>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="absolute bottom-0 left-0 right-0 z-30 flex items-center justify-between px-4 py-2 bg-black/60 backdrop-blur-sm font-mono text-xs">
        <div className="flex items-center gap-2">
          <div
            className={cn(
              "h-2 w-2 rounded-full",
              scanning ? "bg-accent" : "bg-warning animate-pulse"
            )}
          />
          <span className={cn(scanning ? "text-accent" : "text-warning")}>
            {scanning ? "LiDAR: Active" : "Calibrating..."}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-muted">AVG:</span>
          <span className={cn("font-semibold", confidenceColor)}>
            {objectCount > 0 ? formatConfidence(avgConfidence) : "--"}
          </span>
        </div>
        <span className="text-muted">
          4K <span className="text-muted/60">@30fps</span>
        </span>
      </div>
    </>
  );
}

export { DetectionHud };
