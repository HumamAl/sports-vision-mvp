"use client";

import { DetectedObject, SpatialMeasurement } from "@/lib/types";

interface SpatialMeasurementOverlayProps {
  measurements: SpatialMeasurement[];
  objects: DetectedObject[];
  visible: boolean;
}

function SpatialMeasurementOverlay({
  measurements,
  objects,
  visible,
}: SpatialMeasurementOverlayProps) {
  if (!visible || objects.length < 2) return null;

  const objectMap = new Map(objects.map((o) => [o.id, o]));

  const visibleMeasurements = measurements.filter((m) => {
    return objectMap.has(m.fromObjectId) && objectMap.has(m.toObjectId);
  });

  if (visibleMeasurements.length === 0) return null;

  return (
    <svg
      className="absolute inset-0 z-15 pointer-events-none"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
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
          <g key={m.id} className="animate-distance-dash">
            <line
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#06b6d4"
              strokeWidth="0.3"
              strokeDasharray="1 1"
              strokeOpacity="0.5"
            />
            <rect
              x={midX - 4}
              y={midY - 1.5}
              width="8"
              height="3"
              rx="0.5"
              fill="rgba(0,0,0,0.7)"
            />
            <text
              x={midX}
              y={midY + 0.7}
              textAnchor="middle"
              fill="#06b6d4"
              fontSize="1.8"
              fontFamily="monospace"
            >
              {distLabel}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export { SpatialMeasurementOverlay };
