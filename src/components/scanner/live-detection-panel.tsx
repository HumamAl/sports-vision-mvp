"use client";

import { cn } from "@/lib/utils";
import { DetectedObject } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { formatConfidence, formatDistance, getConfidenceLevel } from "@/lib/utils";

interface LiveDetectionPanelProps {
  objects: DetectedObject[];
}

function LiveDetectionPanel({ objects }: LiveDetectionPanelProps) {
  return (
    <div className="w-full lg:w-[280px] flex-shrink-0 bg-surface border-l border-border flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <h3 className="text-sm font-semibold text-foreground">Live Detections</h3>
        <Badge variant="cyber">{objects.length}</Badge>
      </div>

      {/* Scrollable list */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {objects.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-12 px-4">
            <div className="w-10 h-10 rounded-full bg-surface-light/50 flex items-center justify-center mb-3">
              <div className="w-3 h-3 rounded-full border-2 border-muted/40" />
            </div>
            <p className="text-xs text-muted">No objects detected yet</p>
            <p className="text-[10px] text-muted/60 mt-1">Start a scan to begin detection</p>
          </div>
        ) : (
          [...objects].reverse().map((obj, idx) => {
            const level = getConfidenceLevel(obj.confidence);
            const confidenceClass =
              level === "high"
                ? "text-accent"
                : level === "medium"
                  ? "text-warning"
                  : "text-danger";

            return (
              <div
                key={obj.id}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg bg-surface-dark/50 border border-transparent hover:border-border/50 transition-all",
                  idx === 0 && "animate-bbox-appear"
                )}
              >
                {/* Color dot */}
                <div
                  className="h-3 w-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: obj.color }}
                />

                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-foreground truncate">
                    {obj.label}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className={cn("text-[10px] font-mono", confidenceClass)}>
                      {formatConfidence(obj.confidence)}
                    </span>
                    <span className="text-[10px] text-muted">
                      {formatDistance(obj.distance)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export { LiveDetectionPanel };
