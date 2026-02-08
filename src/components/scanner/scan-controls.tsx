"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Crosshair, Play, Square, RotateCcw } from "lucide-react";

interface ScanControlsProps {
  scanning: boolean;
  onCalibrate: () => void;
  onStartStop: () => void;
  onReset: () => void;
  calibrating: boolean;
}

function ScanControls({
  scanning,
  onCalibrate,
  onStartStop,
  onReset,
  calibrating,
}: ScanControlsProps) {
  return (
    <div className="flex items-center justify-center gap-4 py-3 px-4 bg-surface-dark/90 backdrop-blur-sm border-t border-border">
      <Button
        variant="secondary"
        size="sm"
        onClick={onCalibrate}
        disabled={scanning || calibrating}
        className="gap-2"
      >
        <Crosshair size={16} className={cn(calibrating && "animate-spin")} />
        <span className="hidden sm:inline">{calibrating ? "Calibrating..." : "Calibrate"}</span>
      </Button>

      <Button
        variant={scanning ? "danger" : "accent"}
        size="lg"
        onClick={onStartStop}
        disabled={calibrating}
        className={cn(
          "gap-2 min-w-[140px]",
          !scanning && "animate-glow-pulse"
        )}
      >
        {scanning ? (
          <>
            <Square size={18} />
            Stop Scan
          </>
        ) : (
          <>
            <Play size={18} />
            Start Scan
          </>
        )}
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={onReset}
        disabled={scanning}
        className="gap-2"
      >
        <RotateCcw size={16} />
        <span className="hidden sm:inline">Reset</span>
      </Button>
    </div>
  );
}

export { ScanControls };
