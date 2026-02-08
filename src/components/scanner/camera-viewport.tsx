"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

interface CameraViewportProps {
  scanning: boolean;
  children: React.ReactNode;
}

function CameraViewport({ scanning, children }: CameraViewportProps) {
  return (
    <div
      className={cn(
        "relative w-full h-full overflow-hidden rounded-lg",
        "bg-[#0a0f1a]"
      )}
    >
      {/* Real camera feed background */}
      <Image
        src="https://images.unsplash.com/photo-1551958219-acbc608c6377?w=1920&q=80"
        alt="Sports field camera feed"
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      {/* Dark overlay to simulate camera processing / night vision feel */}
      <div className="absolute inset-0 bg-[#0a0f1a]/40 mix-blend-multiply" />
      {/* Subtle scan grid overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(6,182,212,0.03) 2px, rgba(6,182,212,0.03) 4px), repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(6,182,212,0.03) 2px, rgba(6,182,212,0.03) 4px)",
        }}
      />
      {/* Corner markers */}
      {/* Top-left */}
      <div className="absolute top-3 left-3 w-8 h-8 z-10">
        <div className={cn("absolute top-0 left-0 w-full h-0.5 bg-cyber", scanning && "animate-pulse-border")} />
        <div className={cn("absolute top-0 left-0 w-0.5 h-full bg-cyber", scanning && "animate-pulse-border")} />
      </div>
      {/* Top-right */}
      <div className="absolute top-3 right-3 w-8 h-8 z-10">
        <div className={cn("absolute top-0 right-0 w-full h-0.5 bg-cyber", scanning && "animate-pulse-border")} />
        <div className={cn("absolute top-0 right-0 w-0.5 h-full bg-cyber", scanning && "animate-pulse-border")} />
      </div>
      {/* Bottom-left */}
      <div className="absolute bottom-3 left-3 w-8 h-8 z-10">
        <div className={cn("absolute bottom-0 left-0 w-full h-0.5 bg-cyber", scanning && "animate-pulse-border")} />
        <div className={cn("absolute bottom-0 left-0 w-0.5 h-full bg-cyber", scanning && "animate-pulse-border")} />
      </div>
      {/* Bottom-right */}
      <div className="absolute bottom-3 right-3 w-8 h-8 z-10">
        <div className={cn("absolute bottom-0 right-0 w-full h-0.5 bg-cyber", scanning && "animate-pulse-border")} />
        <div className={cn("absolute bottom-0 right-0 w-0.5 h-full bg-cyber", scanning && "animate-pulse-border")} />
      </div>

      {/* Center crosshair */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
        <div className={cn(
          "relative w-10 h-10",
          scanning && "animate-pulse-border"
        )}>
          {/* Horizontal line */}
          <div className="absolute top-1/2 left-0 w-full h-px bg-cyber/60 -translate-y-1/2" />
          {/* Vertical line */}
          <div className="absolute left-1/2 top-0 h-full w-px bg-cyber/60 -translate-x-1/2" />
          {/* Center dot */}
          <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full bg-cyber -translate-x-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Scanline animation */}
      {scanning && (
        <div className="absolute inset-x-0 top-0 z-10 pointer-events-none animate-scanline">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-cyber/60 to-transparent" />
          <div className="h-8 w-full bg-gradient-to-b from-cyber/10 to-transparent" />
        </div>
      )}

      {/* Children (AR overlays, HUD, etc.) */}
      {children}
    </div>
  );
}

export { CameraViewport };
