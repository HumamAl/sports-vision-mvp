"use client";

import { ScanSession } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ScanLine, Target, Gauge, Award, TrendingUp, TrendingDown } from "lucide-react";

interface StatsGridProps {
  scans: ScanSession[];
}

export function StatsGrid({ scans }: StatsGridProps) {
  const totalScans = scans.length;
  const totalObjects = scans.reduce((sum, s) => sum + s.objectsDetected, 0);
  const avgConfidence =
    scans.length > 0
      ? scans.reduce((sum, s) => sum + s.avgConfidence, 0) / scans.length
      : 0;
  const avgQuality =
    scans.length > 0
      ? scans.reduce((sum, s) => sum + s.qualityScore, 0) / scans.length
      : 0;

  const stats = [
    {
      title: "Total Scans",
      value: totalScans.toString(),
      change: 12.5,
      icon: ScanLine,
      iconBg: "bg-cyber/15",
      iconColor: "text-cyber",
    },
    {
      title: "Objects Detected",
      value: totalObjects.toString(),
      change: 8.3,
      icon: Target,
      iconBg: "bg-accent/15",
      iconColor: "text-accent",
    },
    {
      title: "Avg Confidence",
      value: `${(avgConfidence * 100).toFixed(1)}%`,
      change: 2.1,
      icon: Gauge,
      iconBg: "bg-brand-light/15",
      iconColor: "text-brand-light",
    },
    {
      title: "Quality Score",
      value: avgQuality.toFixed(1),
      change: 5.7,
      icon: Award,
      iconBg: "bg-warning/15",
      iconColor: "text-warning",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        const isPositive = stat.change >= 0;

        return (
          <Card key={stat.title} hover className="relative overflow-hidden">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm text-muted">{stat.title}</p>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <div className="flex items-center gap-1">
                  {isPositive ? (
                    <TrendingUp className="h-3.5 w-3.5 text-accent" />
                  ) : (
                    <TrendingDown className="h-3.5 w-3.5 text-danger" />
                  )}
                  <span
                    className={cn(
                      "text-xs font-medium",
                      isPositive ? "text-accent" : "text-danger"
                    )}
                  >
                    {isPositive ? "+" : ""}
                    {stat.change}%
                  </span>
                  <span className="text-xs text-muted">vs last week</span>
                </div>
              </div>
              <div
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-xl",
                  stat.iconBg
                )}
              >
                <Icon className={cn("h-5 w-5", stat.iconColor)} />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
