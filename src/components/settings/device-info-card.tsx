"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockDeviceStatus } from "@/data/mock-device-status";
import { Smartphone, Cpu, Battery, HardDrive, ScanLine } from "lucide-react";

function getBatteryColor(level: number): string {
  if (level > 50) return "bg-accent";
  if (level >= 20) return "bg-warning";
  return "bg-danger";
}

function getBatteryTextColor(level: number): string {
  if (level > 50) return "text-accent";
  if (level >= 20) return "text-warning";
  return "text-danger";
}

export function DeviceInfoCard() {
  const device = mockDeviceStatus;
  const storagePercent = (device.storageUsed / device.storageTotal) * 100;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Smartphone className="h-5 w-5 text-cyber" />
          <CardTitle>Device Information</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {/* Model */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted">
              <Smartphone className="h-4 w-4" />
              <span>Model</span>
            </div>
            <span className="text-sm font-medium text-foreground">{device.model}</span>
          </div>

          {/* OS Version */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted">
              <Cpu className="h-4 w-4" />
              <span>OS Version</span>
            </div>
            <span className="text-sm font-medium text-foreground">{device.osVersion}</span>
          </div>

          {/* LiDAR Sensor */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted">
              <ScanLine className="h-4 w-4" />
              <span>LiDAR Sensor</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Badge variant={device.lidarAvailable ? "success" : "danger"}>
                {device.lidarAvailable ? "Available" : "Unavailable"}
              </Badge>
              {device.lidarAvailable && (
                <Badge variant={device.lidarCalibrated ? "cyber" : "warning"}>
                  {device.lidarCalibrated ? "Calibrated" : "Uncalibrated"}
                </Badge>
              )}
            </div>
          </div>

          {/* Battery Level */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted">
                <Battery className="h-4 w-4" />
                <span>Battery Level</span>
              </div>
              <span className={`text-sm font-mono ${getBatteryTextColor(device.batteryLevel)}`}>
                {device.batteryLevel}%
              </span>
            </div>
            <div className="h-2 rounded-full bg-surface-light overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${getBatteryColor(device.batteryLevel)}`}
                style={{ width: `${device.batteryLevel}%` }}
              />
            </div>
          </div>

          {/* Storage */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted">
                <HardDrive className="h-4 w-4" />
                <span>Storage</span>
              </div>
              <span className="text-sm font-mono text-foreground">
                {device.storageUsed}GB / {device.storageTotal}GB
              </span>
            </div>
            <div className="h-2 rounded-full bg-surface-light overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  storagePercent > 85 ? "bg-danger" : storagePercent > 60 ? "bg-warning" : "bg-brand-light"
                }`}
                style={{ width: `${storagePercent}%` }}
              />
            </div>
            <p className="text-xs text-muted">
              {(device.storageTotal - device.storageUsed).toFixed(1)}GB available
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
