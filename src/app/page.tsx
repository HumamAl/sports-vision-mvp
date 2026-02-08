"use client";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import { mockScans } from "@/data/mock-scans";
import { mockDetectedObjects } from "@/data/mock-detected-objects";
import { ScanSession, DetectedObject } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import { StatsGrid } from "@/components/dashboard/stats-grid";
import { ScanActivityChart } from "@/components/dashboard/scan-activity-chart";
import { DetectionAccuracyChart } from "@/components/dashboard/detection-accuracy-chart";
import { RecentScansList } from "@/components/dashboard/recent-scans-list";
import { QuickStartCard } from "@/components/dashboard/quick-start-card";

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Stats skeleton */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-[120px] rounded-xl" />
        ))}
      </div>
      {/* Charts skeleton */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Skeleton className="h-[360px] rounded-xl" />
        <Skeleton className="h-[360px] rounded-xl" />
      </div>
      {/* Bottom section skeleton */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Skeleton className="h-[340px] rounded-xl lg:col-span-2" />
        <Skeleton className="h-[340px] rounded-xl" />
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [scans, , scansHydrated] = useLocalStorage<ScanSession[]>("scans", mockScans);
  const [detectedObjects, , objectsHydrated] = useLocalStorage<DetectedObject[]>(
    "detected_objects",
    mockDetectedObjects
  );

  const hydrated = scansHydrated && objectsHydrated;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="mt-1 text-sm text-muted">
          Overview of your scanning activity
        </p>
      </div>

      {!hydrated ? (
        <DashboardSkeleton />
      ) : (
        <>
          {/* Stats Grid */}
          <StatsGrid scans={scans} />

          {/* Charts Row */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <ScanActivityChart scans={scans} />
            <DetectionAccuracyChart objects={detectedObjects} />
          </div>

          {/* Recent Scans + Quick Start */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <RecentScansList scans={scans} />
            </div>
            <QuickStartCard />
          </div>
        </>
      )}
    </div>
  );
}
