"use client";

import { DetectedObject, SpatialMeasurement } from "@/lib/types";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

interface SpatialMapProps {
  objects: DetectedObject[];
  measurements: SpatialMeasurement[];
}

const categoryColors: Record<string, string> = {
  ball: "#10b981",
  player: "#3b82f6",
  goal: "#f59e0b",
  boundary: "#ef4444",
  equipment: "#8b5cf6",
  surface: "#06b6d4",
  obstacle: "#f97316",
};

const categoryLabels = Object.keys(categoryColors);

function SpatialMap({ objects, measurements }: SpatialMapProps) {
  // Build object map for measurements
  const objectMap = new Map(objects.map((o) => [o.id, o]));

  // Only show measurements where both objects exist
  const visibleMeasurements = measurements.filter(
    (m) => objectMap.has(m.fromObjectId) && objectMap.has(m.toObjectId)
  );

  // Filter out surface objects for cleaner visualization
  const displayObjects = objects.filter((o) => o.category !== "surface");

  // Get unique categories in this scan
  const activeCategories = [...new Set(displayObjects.map((o) => o.category))];

  return (
    <Card className="p-0 overflow-hidden">
      <CardHeader className="px-6 pt-6 pb-4">
        <CardTitle>Spatial Map</CardTitle>
      </CardHeader>
      <div className="px-6 pb-6">
        <div className="relative bg-[#0a0f1a] rounded-lg border border-border overflow-hidden">
          <svg
            viewBox="0 0 100 80"
            className="w-full h-auto"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Grid pattern */}
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(148,163,184,0.08)" strokeWidth="0.2" />
              </pattern>
            </defs>
            <rect width="100" height="80" fill="url(#grid)" />

            {/* Measurement lines */}
            {visibleMeasurements.map((m) => {
              const fromObj = objectMap.get(m.fromObjectId);
              const toObj = objectMap.get(m.toObjectId);
              if (!fromObj || !toObj) return null;

              const x1 = fromObj.boundingBox.x + fromObj.boundingBox.width / 2;
              const y1 = fromObj.boundingBox.y + fromObj.boundingBox.height / 2;
              const x2 = toObj.boundingBox.x + toObj.boundingBox.width / 2;
              const y2 = toObj.boundingBox.y + toObj.boundingBox.height / 2;
              const midX = (x1 + x2) / 2;
              const midY = (y1 + y2) / 2;

              const distLabel =
                m.unit === "cm"
                  ? `${m.distance}cm`
                  : `${m.distance.toFixed(1)}m`;

              return (
                <g key={m.id}>
                  <line
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="#06b6d4"
                    strokeWidth="0.3"
                    strokeDasharray="1 0.5"
                    strokeOpacity="0.4"
                  />
                  <rect
                    x={midX - 5}
                    y={midY - 2}
                    width="10"
                    height="4"
                    rx="0.8"
                    fill="rgba(0,0,0,0.8)"
                    stroke="#06b6d4"
                    strokeWidth="0.15"
                    strokeOpacity="0.4"
                  />
                  <text
                    x={midX}
                    y={midY + 0.8}
                    textAnchor="middle"
                    fill="#06b6d4"
                    fontSize="2.2"
                    fontFamily="monospace"
                  >
                    {distLabel}
                  </text>
                </g>
              );
            })}

            {/* Object circles */}
            {displayObjects.map((obj) => {
              const cx = obj.boundingBox.x + obj.boundingBox.width / 2;
              const cy = obj.boundingBox.y + obj.boundingBox.height / 2;
              const r = Math.max(2, Math.min(4, (obj.boundingBox.width + obj.boundingBox.height) / 6));

              return (
                <g key={obj.id}>
                  {/* Glow effect */}
                  <circle
                    cx={cx}
                    cy={cy}
                    r={r + 1}
                    fill={obj.color}
                    opacity="0.15"
                  />
                  {/* Main circle */}
                  <circle
                    cx={cx}
                    cy={cy}
                    r={r}
                    fill={obj.color}
                    opacity="0.8"
                    stroke={obj.color}
                    strokeWidth="0.3"
                  />
                  {/* Label */}
                  <text
                    x={cx}
                    y={cy - r - 1.5}
                    textAnchor="middle"
                    fill="#f1f5f9"
                    fontSize="2"
                    fontFamily="sans-serif"
                  >
                    {obj.label.length > 18 ? obj.label.slice(0, 16) + "..." : obj.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mt-4">
          {activeCategories.map((cat) => (
            <div key={cat} className="flex items-center gap-1.5">
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: categoryColors[cat] || "#94a3b8" }}
              />
              <span className="text-xs text-muted capitalize">{cat}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

export { SpatialMap };
