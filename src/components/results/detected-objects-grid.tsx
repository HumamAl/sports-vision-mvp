"use client";

import { cn } from "@/lib/utils";
import { DetectedObject } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatConfidence, formatDistance, getConfidenceLevel } from "@/lib/utils";

interface DetectedObjectsGridProps {
  objects: DetectedObject[];
}

const categoryVariant: Record<string, "default" | "success" | "warning" | "danger" | "cyber"> = {
  ball: "success",
  player: "cyber",
  goal: "warning",
  boundary: "danger",
  equipment: "default",
  surface: "default",
  obstacle: "warning",
};

function DetectedObjectsGrid({ objects }: DetectedObjectsGridProps) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-foreground mb-4">
        Detected Objects
        <span className="ml-2 text-sm font-normal text-muted">({objects.length})</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {objects.map((obj) => {
          const level = getConfidenceLevel(obj.confidence);
          const barColor =
            level === "high"
              ? "bg-accent"
              : level === "medium"
                ? "bg-warning"
                : "bg-danger";

          return (
            <Card
              key={obj.id}
              hover
              className={cn("p-4 border-l-4")}
              style={{ borderLeftColor: obj.color }}
            >
              <div className="flex items-start justify-between mb-2">
                <p className="text-sm font-medium text-foreground leading-tight">
                  {obj.label}
                </p>
                <Badge variant={categoryVariant[obj.category] || "default"}>
                  {obj.category}
                </Badge>
              </div>

              {/* Confidence bar */}
              <div className="mb-2">
                <div className="flex items-center justify-between text-xs text-muted mb-1">
                  <span>Confidence</span>
                  <span className={cn(
                    "font-mono",
                    level === "high" ? "text-accent" : level === "medium" ? "text-warning" : "text-danger"
                  )}>
                    {formatConfidence(obj.confidence)}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-surface-light rounded-full overflow-hidden">
                  <div
                    className={cn("h-full rounded-full transition-all", barColor)}
                    style={{ width: `${obj.confidence * 100}%` }}
                  />
                </div>
              </div>

              <div className="text-xs text-muted">
                Distance: <span className="text-foreground font-mono">{formatDistance(obj.distance)}</span>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export { DetectedObjectsGrid };
