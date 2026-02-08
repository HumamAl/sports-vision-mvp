"use client";

import Link from "next/link";
import { ScanSession } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate, formatDuration, getStatusVariant } from "@/lib/utils";
import { ArrowLeft, Download, Trash2, MapPin, Trophy, Clock, Calendar } from "lucide-react";

interface ScanDetailHeaderProps {
  scan: ScanSession;
}

function ScanDetailHeader({ scan }: ScanDetailHeaderProps) {
  const scanDate = scan.date || "";

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex flex-col gap-3">
        <Link
          href="/results"
          className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors w-fit"
        >
          <ArrowLeft size={16} />
          Back to Results
        </Link>

        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-foreground">{scan.name}</h1>
          <Badge variant={getStatusVariant(scan.status)}>
            {scan.status.replace("_", " ")}
          </Badge>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
          <span className="flex items-center gap-1.5">
            <MapPin size={14} className="text-cyber" />
            {scan.location}
          </span>
          <span className="flex items-center gap-1.5">
            <Trophy size={14} className="text-accent" />
            <span className="capitalize">{scan.sport}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={14} />
            {formatDuration(scan.duration)}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar size={14} />
            {scanDate ? formatDate(scanDate) : "N/A"}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="secondary" size="sm" className="gap-1.5">
          <Download size={14} />
          Export
        </Button>
        <Button variant="ghost" size="sm" className="gap-1.5 text-danger hover:text-danger">
          <Trash2 size={14} />
          Delete
        </Button>
      </div>
    </div>
  );
}

export { ScanDetailHeader };
