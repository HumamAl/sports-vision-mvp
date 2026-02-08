"use client";

import { use, useMemo } from "react";
import { ScanDetailHeader } from "@/components/results/scan-detail-header";
import { DetectedObjectsGrid } from "@/components/results/detected-objects-grid";
import { ObjectRankingTable } from "@/components/results/object-ranking-table";
import { SpatialMap } from "@/components/results/spatial-map";
import { ScanMetricsChart } from "@/components/results/scan-metrics-chart";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { mockScans } from "@/data/mock-scans";
import { mockDetectedObjects } from "@/data/mock-detected-objects";
import { mockSpatialMeasurements } from "@/data/mock-spatial-measurements";
import { ScanSession } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { ArrowLeft, AlertTriangle } from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ScanDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const [scans, , hydrated] = useLocalStorage<ScanSession[]>(
    "scans",
    mockScans
  );

  // Find scan from localStorage or fall back to mock data
  const scan = useMemo(() => {
    const allScans = scans.length > 0 ? scans : (mockScans);
    return allScans.find((s) => s.id === id) || null;
  }, [scans, id]);

  // Get objects for this scan - for live scans, show from scan_001 as a demo
  const scanObjects = useMemo(() => {
    const objects = mockDetectedObjects.filter((o) => o.scanId === id);
    if (objects.length > 0) return objects;
    // For live scans, show objects from scan_001 as representative data
    if (id.startsWith("scan_live_")) {
      return mockDetectedObjects.filter((o) => o.scanId === "scan_001");
    }
    return [];
  }, [id]);

  // Get measurements for this scan
  const scanMeasurements = useMemo(() => {
    const measurements = mockSpatialMeasurements.filter((m) => m.scanId === id);
    if (measurements.length > 0) return measurements;
    if (id.startsWith("scan_live_")) {
      return mockSpatialMeasurements.filter((m) => m.scanId === "scan_001");
    }
    return [];
  }, [id]);

  if (!hydrated) {
    return (
      <div className="p-6 space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-24 w-full" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
        <Skeleton className="h-80 w-full" />
      </div>
    );
  }

  if (!scan) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-warning/10">
          <AlertTriangle className="h-8 w-8 text-warning" />
        </div>
        <h2 className="text-xl font-semibold text-foreground">Scan Not Found</h2>
        <p className="text-sm text-muted">
          The scan with ID &quot;{id}&quot; could not be found.
        </p>
        <Link
          href="/results"
          className="inline-flex items-center gap-1.5 text-sm text-cyber hover:text-cyber-light transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Results
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <ScanDetailHeader scan={scan} />

      {/* Objects grid + Ranking table */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <DetectedObjectsGrid objects={scanObjects} />
        <ObjectRankingTable objects={scanObjects} />
      </div>

      {/* Spatial Map - full width */}
      {scanObjects.length > 0 && (
        <SpatialMap objects={scanObjects} measurements={scanMeasurements} />
      )}

      {/* Metrics Chart */}
      {scanObjects.length > 0 && (
        <ScanMetricsChart scan={scan} objects={scanObjects} />
      )}
    </div>
  );
}
