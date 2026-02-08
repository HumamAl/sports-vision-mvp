"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Save, Sliders } from "lucide-react";

const detectionSchema = z.object({
  sensitivity: z.number().min(1).max(10),
  minConfidence: z.number().min(0.1).max(0.99),
  maxObjects: z.number().min(1).max(50),
  autoSave: z.boolean(),
});

type DetectionFormValues = z.infer<typeof detectionSchema>;

const defaultValues: DetectionFormValues = {
  sensitivity: 7,
  minConfidence: 0.6,
  maxObjects: 20,
  autoSave: true,
};

export function DetectionSettings() {
  const [savedSettings, setSavedSettings, hydrated] = useLocalStorage<DetectionFormValues>(
    "detection_settings",
    defaultValues
  );

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors, isDirty },
  } = useForm<DetectionFormValues>({
    resolver: zodResolver(detectionSchema),
    defaultValues,
  });

  useEffect(() => {
    if (hydrated) {
      reset(savedSettings);
    }
  }, [hydrated, savedSettings, reset]);

  const sensitivity = watch("sensitivity");
  const minConfidence = watch("minConfidence");
  const autoSave = watch("autoSave");

  const onSubmit = (data: DetectionFormValues) => {
    setSavedSettings(data);
  };

  const sensitivityLabel = (val: number): string => {
    if (val <= 3) return "Low";
    if (val <= 6) return "Medium";
    if (val <= 8) return "High";
    return "Max";
  };

  if (!hydrated) {
    return (
      <Card>
        <CardHeader>
          <div className="h-5 w-40 rounded bg-surface-light animate-pulse" />
          <div className="h-4 w-64 rounded bg-surface-light animate-pulse mt-2" />
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 w-32 rounded bg-surface-light animate-pulse" />
                <div className="h-8 w-full rounded bg-surface-light animate-pulse" />
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
          <Sliders className="h-5 w-5 text-cyber" />
          <CardTitle>Detection Settings</CardTitle>
        </div>
        <CardDescription>Configure object detection parameters</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Sensitivity Slider */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground">
                Sensitivity
              </label>
              <span className="text-sm font-mono text-cyber">
                {sensitivity} — {sensitivityLabel(sensitivity)}
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={10}
              step={1}
              {...register("sensitivity", { valueAsNumber: true })}
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
              <span>Low</span>
              <span>Medium</span>
              <span>High</span>
              <span>Max</span>
            </div>
            {errors.sensitivity && (
              <p className="text-xs text-danger">{errors.sensitivity.message}</p>
            )}
          </div>

          {/* Minimum Confidence */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground">
                Minimum Confidence
              </label>
              <span className="text-sm font-mono text-accent">
                {(minConfidence * 100).toFixed(0)}%
              </span>
            </div>
            <input
              type="range"
              min={0.1}
              max={0.99}
              step={0.05}
              {...register("minConfidence", { valueAsNumber: true })}
              className="w-full h-2 rounded-full bg-surface-light appearance-none cursor-pointer
                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5
                [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:shadow-md
                [&::-webkit-slider-thumb]:shadow-accent/30 [&::-webkit-slider-thumb]:transition-transform
                [&::-webkit-slider-thumb]:hover:scale-110
                [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full
                [&::-moz-range-thumb]:bg-accent [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:shadow-md
                [&::-moz-range-thumb]:shadow-accent/30"
            />
            <div className="flex justify-between text-xs text-muted">
              <span>10%</span>
              <span>50%</span>
              <span>99%</span>
            </div>
            {errors.minConfidence && (
              <p className="text-xs text-danger">{errors.minConfidence.message}</p>
            )}
          </div>

          {/* Maximum Objects */}
          <div className="space-y-2">
            <label htmlFor="maxObjects" className="block text-sm font-medium text-foreground">
              Maximum Objects
            </label>
            <input
              id="maxObjects"
              type="number"
              min={1}
              max={50}
              {...register("maxObjects", { valueAsNumber: true })}
              className="w-full rounded-lg border border-border bg-surface-dark px-3 py-2 text-sm text-foreground
                placeholder:text-muted/60 transition-colors focus:outline-none focus:ring-2
                focus:ring-cyber/50 focus:border-cyber [appearance:textfield]
                [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <p className="text-xs text-muted">Max objects tracked per scan (1-50)</p>
            {errors.maxObjects && (
              <p className="text-xs text-danger">{errors.maxObjects.message}</p>
            )}
          </div>

          {/* Auto-save Toggle */}
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm font-medium text-foreground">Auto-save Scans</p>
              <p className="text-xs text-muted mt-0.5">
                Automatically save scan results to history
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={autoSave}
              onClick={() => setValue("autoSave", !autoSave, { shouldDirty: true })}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-cyber/50 ${
                autoSave ? "bg-accent" : "bg-surface-light"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-md transform transition-transform duration-200 ease-in-out mt-0.5 ${
                  autoSave ? "translate-x-[22px]" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>

          {/* Save Button */}
          <div className="pt-2">
            <Button type="submit" variant="primary" className="w-full" disabled={!isDirty}>
              <Save className="h-4 w-4" />
              Save Detection Settings
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
