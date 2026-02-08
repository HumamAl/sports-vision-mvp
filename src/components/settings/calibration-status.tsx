"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockDeviceStatus } from "@/data/mock-device-status";
import { formatDateTime } from "@/lib/utils";
import { Crosshair, RotateCw, CheckCircle2, MapPin, Loader2 } from "lucide-react";

export function CalibrationStatus() {
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [lastCalibration, setLastCalibration] = useState(mockDeviceStatus.lastCalibration);
  const [calibrated, setCalibrated] = useState(mockDeviceStatus.lidarCalibrated);

  const handleRecalibrate = () => {
    setIsCalibrating(true);
    setTimeout(() => {
      setIsCalibrating(false);
      setLastCalibration(new Date().toISOString());
      setCalibrated(true);
    }, 3000);
  };

  const lidarHealth = 95;
  const calibrationPoints = 2847;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Crosshair className="h-5 w-5 text-cyber" />
          <CardTitle>Calibration Status</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {/* Last Calibration */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted">
              <RotateCw className="h-4 w-4" />
              <span>Last Calibration</span>
            </div>
            <span className="text-sm font-medium text-foreground">
              {formatDateTime(lastCalibration)}
            </span>
          </div>

          {/* Calibration Status */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted">
              <CheckCircle2 className="h-4 w-4" />
              <span>Calibration Status</span>
            </div>
            <Badge variant={calibrated ? "success" : "warning"}>
              {calibrated ? "Calibrated" : "Needs Calibration"}
            </Badge>
          </div>

          {/* LiDAR Health */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted">LiDAR Health</span>
              <span className="text-sm font-mono text-accent">{lidarHealth}%</span>
            </div>
            <div className="h-2 rounded-full bg-surface-light overflow-hidden">
              <div
                className="h-full rounded-full bg-accent transition-all duration-500"
                style={{ width: `${lidarHealth}%` }}
              />
            </div>
          </div>

          {/* Calibration Points */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted">
              <MapPin className="h-4 w-4" />
              <span>Calibration Points</span>
            </div>
            <span className="text-sm font-medium text-foreground">
              {calibrationPoints.toLocaleString()} reference points mapped
            </span>
          </div>

          {/* Recalibrate Button */}
          <div className="pt-2">
            <Button
              type="button"
              variant="secondary"
              className="w-full"
              onClick={handleRecalibrate}
              disabled={isCalibrating}
            >
              {isCalibrating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Calibrating...
                </>
              ) : (
                <>
                  <Crosshair className="h-4 w-4" />
                  Recalibrate LiDAR Sensor
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
