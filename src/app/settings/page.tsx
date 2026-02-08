"use client";

import { useState, useEffect } from "react";
import { DetectionSettings } from "@/components/settings/detection-settings";
import { OverlayPreferences } from "@/components/settings/overlay-preferences";
import { CalibrationStatus } from "@/components/settings/calibration-status";
import { DeviceInfoCard } from "@/components/settings/device-info-card";
import { Settings } from "lucide-react";

export default function SettingsPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="space-y-6">
        {/* Header skeleton */}
        <div>
          <div className="h-8 w-32 rounded bg-surface-light animate-pulse" />
          <div className="h-4 w-80 rounded bg-surface-light animate-pulse mt-2" />
        </div>
        {/* Grid skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="h-96 rounded-xl bg-surface animate-pulse" />
            <div className="h-80 rounded-xl bg-surface animate-pulse" />
          </div>
          <div className="space-y-6">
            <div className="h-72 rounded-xl bg-surface animate-pulse" />
            <div className="h-72 rounded-xl bg-surface animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-3">
          <Settings className="h-7 w-7 text-cyber" />
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        </div>
        <p className="text-muted mt-1 ml-10">
          Configure detection parameters and device preferences
        </p>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <DetectionSettings />
          <OverlayPreferences />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <CalibrationStatus />
          <DeviceInfoCard />
        </div>
      </div>
    </div>
  );
}
