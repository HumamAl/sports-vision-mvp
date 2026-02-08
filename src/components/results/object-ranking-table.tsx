"use client";

import { cn } from "@/lib/utils";
import { DetectedObject } from "@/lib/types";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatConfidence, formatDistance, getConfidenceColor } from "@/lib/utils";

interface ObjectRankingTableProps {
  objects: DetectedObject[];
}

function ObjectRankingTable({ objects }: ObjectRankingTableProps) {
  const sorted = [...objects].sort((a, b) => b.confidence - a.confidence);

  const getRankDisplay = (rank: number) => {
    switch (rank) {
      case 1:
        return (
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-yellow-500/20 text-yellow-400 text-xs font-bold">
            1
          </div>
        );
      case 2:
        return (
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-300/20 text-gray-300 text-xs font-bold">
            2
          </div>
        );
      case 3:
        return (
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-700/20 text-amber-600 text-xs font-bold">
            3
          </div>
        );
      default:
        return (
          <span className="text-xs text-muted font-mono w-6 text-center inline-block">{rank}</span>
        );
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold text-foreground mb-4">
        Confidence Ranking
      </h2>
      <div className="rounded-xl border border-border bg-surface overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">Rank</TableHead>
              <TableHead>Label</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Confidence</TableHead>
              <TableHead>Distance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sorted.map((obj, idx) => (
              <TableRow key={obj.id}>
                <TableCell>{getRankDisplay(idx + 1)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: obj.color }}
                    />
                    <span className="font-medium text-foreground">{obj.label}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="default">{obj.category}</Badge>
                </TableCell>
                <TableCell>
                  <span className={cn("font-mono tabular-nums", getConfidenceColor(obj.confidence))}>
                    {formatConfidence(obj.confidence)}
                  </span>
                </TableCell>
                <TableCell className="font-mono text-muted tabular-nums">
                  {formatDistance(obj.distance)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export { ObjectRankingTable };
