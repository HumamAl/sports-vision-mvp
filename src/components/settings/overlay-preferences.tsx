"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Save, Layers } from "lucide-react";

interface OverlaySettings {
  showBoundingBoxes: boolean;
  showLabels: boolean;
  showConfidence: boolean;
  showDistanceLines: boolean;
  overlayOpacity: number;
}

const defaultOverlay: OverlaySettings = {
  showBoundingBoxes: true,
  showLabels: true,
  showConfidence: true,
  showDistanceLines: true,
  overlayOpacity: 0.8,
};

interface ToggleRowProps {
  label: string;
  description: string;
  checked: boolean;
  onChange: (val: boolean) => void;
}

function ToggleRow({ label, description, checked, onChange }: ToggleRowProps) {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="pr-4">
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="text-xs text-muted mt-0.5">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-cyber/50 ${
          checked ? "bg-accent" : "bg-surface-light"
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-md transform transition-transform duration-200 ease-in-out mt-0.5 ${
            checked ? "translate-x-[22px]" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
}

export function OverlayPreferences() {
  const [savedOverlay, setSavedOverlay, hydrated] = useLocalStorage<OverlaySettings>(
    "overlay_preferences",
    defaultOverlay
  );

  const [settings, setSettings] = useState<OverlaySettings>(defaultOverlay);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (hydrated) {
      setSettings(savedOverlay);
    }
  }, [hydrated, savedOverlay]);

  const updateSetting = <K extends keyof OverlaySettings>(key: K, value: OverlaySettings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleSave = () => {
    setSavedOverlay(settings);
    setHasChanges(false);
  };

  if (!hydrated) {
    return (
      <Card>
        <CardHeader>
          <div className="h-5 w-40 rounded bg-surface-light animate-pulse" />
          <div className="h-4 w-56 rounded bg-surface-light animate-pulse mt-2" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between py-3">
                <div className="space-y-1.5">
                  <div className="h-4 w-32 rounded bg-surface-light animate-pulse" />
                  <div className="h-3 w-48 rounded bg-surface-light animate-pulse" />
                </div>
                <div className="h-6 w-11 rounded-full bg-surface-light animate-pulse" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Layers className="h-5 w-5 text-cyber" />
          <CardTitle>Overlay Preferences</CardTitle>
        </div>
        <CardDescription>Customize AR overlay display</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="divide-y divide-border">
          <ToggleRow
            label="Show Bounding Boxes"
            description="Display detection boxes around identified objects"
            checked={settings.showBoundingBoxes}
            onChange={(val) => updateSetting("showBoundingBoxes", val)}
          />
          <ToggleRow
            label="Show Labels"
            description="Display object category labels on detections"
            checked={settings.showLabels}
            onChange={(val) => updateSetting("showLabels", val)}
          />
          <ToggleRow
            label="Show Confidence"
            description="Display confidence percentage for each detection"
            checked={settings.showConfidence}
            onChange={(val) => updateSetting("showConfidence", val)}
          />
          <ToggleRow
            label="Show Distance Lines"
            description="Display distance measurement lines between objects"
            checked={settings.showDistanceLines}
            onChange={(val) => updateSetting("showDistanceLines", val)}
          />
        </div>

        {/* Overlay Opacity */}
        <div className="mt-6 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Overlay Opacity</p>
              <p className="text-xs text-muted mt-0.5">Control the transparency of AR overlays</p>
            </div>
            <span className="text-sm font-mono text-cyber">
              {(settings.overlayOpacity * 100).toFixed(0)}%
            </span>
          </div>
          <input
            type="range"
            min={0.1}
            max={1.0}
            step={0.1}
            value={settings.overlayOpacity}
            onChange={(e) => updateSetting("overlayOpacity", parseFloat(e.target.value))}
            className="w-full h-2 rounded-full bg-surface-light appearance-none cursor-pointer
              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5
              [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cyber [&::-webkit-slider-thumb]:shadow-md
              [&::-webkit-slider-thumb]:shadow-cyber/30 [&::-webkit-slider-thumb]:transition-transform
              [&::-webkit-slider-thumb]:hover:scale-110
              [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full
              [&::-moz-range-thumb]:bg-cyber [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:shadow-md
              [&::-moz-range-thumb]:shadow-cyber/30"
          />
          <div className="flex justify-between text-xs text-muted">
            <span>10%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-6">
          <Button
            type="button"
            variant="primary"
            className="w-full"
            disabled={!hasChanges}
            onClick={handleSave}
          >
            <Save className="h-4 w-4" />
            Save Overlay Preferences
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
