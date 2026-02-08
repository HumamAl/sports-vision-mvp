"use client";

import { cn } from "@/lib/utils";
import { RotateCcw } from "lucide-react";

interface DeviceOrientationWarningProps {
  show: boolean;
}

function DeviceOrientationWarning({ show }: DeviceOrientationWarningProps) {
  return (
    <div
      className={cn(
        "absolute top-12 left-0 right-0 z-40 flex items-center justify-center gap-2 py-2 px-4 bg-warning/90 text-black text-xs font-medium transition-all duration-300",
        show
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0 pointer-events-none"
      )}
    >
      <RotateCcw size={14} className="animate-spin" style={{ animationDuration: "3s" }} />
      <span>Rotate device to landscape for optimal scanning</span>
    </div>
  );
}

export { DeviceOrientationWarning };
