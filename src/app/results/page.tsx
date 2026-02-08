"use client";

import { useState, useMemo } from "react";
import { ScanFilters } from "@/components/results/scan-filters";
import { ScanTable } from "@/components/results/scan-table";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { mockScans } from "@/data/mock-scans";
import { ScanSession } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import { ClipboardList } from "lucide-react";

export default function ResultsPage() {
  const [scans, , hydrated] = useLocalStorage<ScanSession[]>("scans", mockScans);
  const [filters, setFilters] = useState({
    status: "",
    sport: "",
    minConfidence: "",
  });
  const [sortField, setSortField] = useState("date");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDir((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("desc");
    }
  };

  const getScanDate = (scan: ScanSession): string => {
    return scan.date || "";
  };

  const filteredAndSorted = useMemo(() => {
    // Use mock data if no scans saved yet
    const allScans = scans.length > 0 ? scans : (mockScans);

    const filtered = allScans.filter((scan) => {
      if (filters.status && scan.status !== filters.status) return false;
      if (
        filters.sport &&
        !scan.sport.toLowerCase().includes(filters.sport.toLowerCase())
      )
        return false;
      if (filters.minConfidence) {
        const min = parseFloat(filters.minConfidence) / 100;
        if (scan.avgConfidence < min) return false;
      }
      return true;
    });

    // Sort
    return [...filtered].sort((a, b) => {
      let aVal: string | number;
      let bVal: string | number;

      switch (sortField) {
        case "name":
          aVal = a.name.toLowerCase();
          bVal = b.name.toLowerCase();
          break;
        case "location":
          aVal = a.location.toLowerCase();
          bVal = b.location.toLowerCase();
          break;
        case "sport":
          aVal = a.sport.toLowerCase();
          bVal = b.sport.toLowerCase();
          break;
        case "status":
          aVal = a.status;
          bVal = b.status;
          break;
        case "objectsDetected":
          aVal = a.objectsDetected;
          bVal = b.objectsDetected;
          break;
        case "avgConfidence":
          aVal = a.avgConfidence;
          bVal = b.avgConfidence;
          break;
        case "qualityScore":
          aVal = a.qualityScore;
          bVal = b.qualityScore;
          break;
        case "duration":
          aVal = a.duration;
          bVal = b.duration;
          break;
        case "date":
          aVal = new Date(getScanDate(a)).getTime();
          bVal = new Date(getScanDate(b)).getTime();
          break;
        default:
          return 0;
      }

      if (aVal < bVal) return sortDir === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
  }, [scans, filters, sortField, sortDir]);

  if (!hydrated) {
    return (
      <div className="p-6 space-y-6">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-12 w-full" />
        <div className="space-y-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Page header */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyber/10">
          <ClipboardList className="h-5 w-5 text-cyber" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Scan Results</h1>
          <p className="text-sm text-muted">
            {filteredAndSorted.length} scan{filteredAndSorted.length !== 1 ? "s" : ""} found
          </p>
        </div>
      </div>

      {/* Filters */}
      <ScanFilters filters={filters} onFiltersChange={setFilters} />

      {/* Table */}
      <div className="rounded-xl border border-border bg-surface overflow-hidden">
        <ScanTable
          scans={filteredAndSorted}
          sortField={sortField}
          sortDir={sortDir}
          onSort={handleSort}
        />
      </div>
    </div>
  );
}
