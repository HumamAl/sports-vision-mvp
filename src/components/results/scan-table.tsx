"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ScanSession } from "@/lib/types";
import {
  formatDate,
  formatDuration,
  formatConfidence,
  getStatusVariant,
  getConfidenceColor,
} from "@/lib/utils";
import { ArrowUp, ArrowDown } from "lucide-react";

interface ScanTableProps {
  scans: ScanSession[];
  sortField: string;
  sortDir: "asc" | "desc";
  onSort: (field: string) => void;
}

interface ColumnDef {
  key: string;
  label: string;
  sortable: boolean;
}

const columns: ColumnDef[] = [
  { key: "name", label: "Name", sortable: true },
  { key: "location", label: "Location", sortable: true },
  { key: "sport", label: "Sport", sortable: true },
  { key: "status", label: "Status", sortable: true },
  { key: "objectsDetected", label: "Objects", sortable: true },
  { key: "avgConfidence", label: "Confidence", sortable: true },
  { key: "qualityScore", label: "Quality", sortable: true },
  { key: "duration", label: "Duration", sortable: true },
  { key: "date", label: "Date", sortable: true },
];

function ScanTable({ scans, sortField, sortDir, onSort }: ScanTableProps) {
  const getSortIcon = (field: string) => {
    if (sortField !== field) return null;
    return sortDir === "asc" ? (
      <ArrowUp size={12} className="inline ml-1" />
    ) : (
      <ArrowDown size={12} className="inline ml-1" />
    );
  };

  const getScanDate = (scan: ScanSession): string => {
    return scan.date || "";
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((col) => (
            <TableHead
              key={col.key}
              className={cn(col.sortable && "cursor-pointer select-none hover:text-foreground")}
              onClick={() => col.sortable && onSort(col.key)}
            >
              {col.label}
              {getSortIcon(col.key)}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {scans.length === 0 ? (
          <TableRow>
            <TableCell colSpan={columns.length} className="text-center py-12 text-muted">
              No scans found matching your filters
            </TableCell>
          </TableRow>
        ) : (
          scans.map((scan) => (
            <TableRow key={scan.id}>
              <TableCell>
                <Link
                  href={`/results/${scan.id}`}
                  className="text-foreground hover:text-cyber transition-colors font-medium"
                >
                  {scan.name}
                </Link>
              </TableCell>
              <TableCell className="text-muted max-w-[180px] truncate">
                {scan.location}
              </TableCell>
              <TableCell>
                <span className="capitalize text-foreground">{scan.sport}</span>
              </TableCell>
              <TableCell>
                <Badge variant={getStatusVariant(scan.status)}>
                  {scan.status.replace("_", " ")}
                </Badge>
              </TableCell>
              <TableCell className="tabular-nums">{scan.objectsDetected}</TableCell>
              <TableCell>
                <span className={cn("font-mono tabular-nums", getConfidenceColor(scan.avgConfidence))}>
                  {formatConfidence(scan.avgConfidence)}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="w-12 h-1.5 bg-surface-light rounded-full overflow-hidden">
                    <div
                      className={cn(
                        "h-full rounded-full",
                        scan.qualityScore >= 85
                          ? "bg-accent"
                          : scan.qualityScore >= 60
                            ? "bg-warning"
                            : "bg-danger"
                      )}
                      style={{ width: `${scan.qualityScore}%` }}
                    />
                  </div>
                  <span className="text-xs tabular-nums text-muted">{scan.qualityScore}</span>
                </div>
              </TableCell>
              <TableCell className="font-mono tabular-nums text-muted">
                {formatDuration(scan.duration)}
              </TableCell>
              <TableCell className="text-muted">
                {formatDate(getScanDate(scan))}
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}

export { ScanTable };
