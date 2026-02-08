"use client";

import { ScanSession } from "@/lib/types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDuration, getStatusVariant } from "@/lib/utils";
import { Clock, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";

interface RecentScansListProps {
  scans: ScanSession[];
}

function timeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return `${Math.floor(diffDays / 7)}w ago`;
}

export function RecentScansList({ scans }: RecentScansListProps) {
  const sortedScans = [...scans]
    .sort((a, b) => {
      const timeA = new Date(a.date).getTime();
      const timeB = new Date(b.date).getTime();
      return timeB - timeA;
    })
    .slice(0, 5);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Scans</CardTitle>
        <Link
          href="/results"
          className="flex items-center gap-1 text-sm text-cyber hover:text-cyber-light transition-colors"
        >
          View All
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          {sortedScans.map((scan) => {
            const dateStr = scan.date;

            return (
              <div
                key={scan.id}
                className="flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-surface-light/50"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-foreground truncate">{scan.name}</p>
                    <Badge variant="cyber">{scan.sport}</Badge>
                    <Badge variant={getStatusVariant(scan.status)}>{scan.status}</Badge>
                  </div>
                  <div className="mt-1 flex items-center gap-3 text-sm text-muted">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {scan.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {formatDuration(scan.duration)}
                    </span>
                  </div>
                </div>
                <div className="ml-4 flex-shrink-0 text-right">
                  <p className="text-xs text-muted">{timeAgo(dateStr)}</p>
                  <p className="mt-0.5 text-xs text-muted">
                    {scan.objectsDetected} objects
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
