"use client";

import { cn } from "@/lib/utils";
import { DetectedObject } from "@/lib/types";
import { formatConfidence, formatDistance } from "@/lib/utils";

interface ArOverlayProps {
  objects: DetectedObject[];
  showLabels: boolean;
  showConfidence: boolean;
  showDistance: boolean;
}

function ArOverlay({ objects, showLabels, showConfidence, showDistance }: ArOverlayProps) {
  return (
    <div className="absolute inset-0 z-20 pointer-events-none">
      {objects.map((obj) => (
        <div
          key={obj.id}
          className="absolute animate-bbox-appear"
          style={{
            left: `${obj.boundingBox.x}%`,
            top: `${obj.boundingBox.y}%`,
            width: `${obj.boundingBox.width}%`,
            height: `${obj.boundingBox.height}%`,
          }}
        >
          {/* Main bounding box */}
          <div
            className="absolute inset-0 border-2"
            style={{ borderColor: obj.color }}
          />

          {/* Corner accents - top left */}
          <div className="absolute -top-px -left-px w-3 h-3">
            <div className="absolute top-0 left-0 w-full h-0.5" style={{ backgroundColor: obj.color }} />
            <div className="absolute top-0 left-0 w-0.5 h-full" style={{ backgroundColor: obj.color }} />
          </div>
          {/* Corner accents - top right */}
          <div className="absolute -top-px -right-px w-3 h-3">
            <div className="absolute top-0 right-0 w-full h-0.5" style={{ backgroundColor: obj.color }} />
            <div className="absolute top-0 right-0 w-0.5 h-full" style={{ backgroundColor: obj.color }} />
          </div>
          {/* Corner accents - bottom left */}
          <div className="absolute -bottom-px -left-px w-3 h-3">
            <div className="absolute bottom-0 left-0 w-full h-0.5" style={{ backgroundColor: obj.color }} />
            <div className="absolute bottom-0 left-0 w-0.5 h-full" style={{ backgroundColor: obj.color }} />
          </div>
          {/* Corner accents - bottom right */}
          <div className="absolute -bottom-px -right-px w-3 h-3">
            <div className="absolute bottom-0 right-0 w-full h-0.5" style={{ backgroundColor: obj.color }} />
            <div className="absolute bottom-0 right-0 w-0.5 h-full" style={{ backgroundColor: obj.color }} />
          </div>

          {/* Label above the box */}
          {showLabels && (
            <div className="absolute -top-7 left-0 flex flex-col items-start gap-0.5">
              <div
                className="px-1.5 py-0.5 text-[10px] font-mono font-medium text-white rounded-sm whitespace-nowrap"
                style={{ backgroundColor: `${obj.color}cc` }}
              >
                {obj.label} {showConfidence && <span className="opacity-80">{formatConfidence(obj.confidence)}</span>}
              </div>
              {/* Confidence bar */}
              {showConfidence && (
                <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full animate-confidence-fill"
                    style={{
                      backgroundColor: obj.color,
                      width: `${obj.confidence * 100}%`,
                      ["--confidence-width" as string]: `${obj.confidence * 100}%`,
                    }}
                  />
                </div>
              )}
            </div>
          )}

          {/* Distance label in bottom-right */}
          {showDistance && (
            <div
              className="absolute -bottom-5 right-0 px-1 py-0.5 text-[9px] font-mono text-white/80 rounded-sm"
              style={{ backgroundColor: `${obj.color}99` }}
            >
              {formatDistance(obj.distance)}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export { ArOverlay };
