"use client";

import { Select } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

interface ScanFiltersProps {
  filters: {
    status: string;
    sport: string;
    minConfidence: string;
  };
  onFiltersChange: (filters: { status: string; sport: string; minConfidence: string }) => void;
}

const statusOptions = [
  { value: "", label: "All Statuses" },
  { value: "completed", label: "Completed" },
  { value: "reviewing", label: "Reviewing" },
  { value: "in_progress", label: "In Progress" },
  { value: "failed", label: "Failed" },
];

function ScanFilters({ filters, onFiltersChange }: ScanFiltersProps) {
  const handleChange = (field: string, value: string) => {
    onFiltersChange({ ...filters, [field]: value });
  };

  const handleReset = () => {
    onFiltersChange({ status: "", sport: "", minConfidence: "" });
  };

  const hasActiveFilters = filters.status || filters.sport || filters.minConfidence;

  return (
    <div className="flex flex-wrap items-end gap-3">
      <div className="w-44">
        <Select
          label="Status"
          options={statusOptions}
          value={filters.status}
          onChange={(e) => handleChange("status", e.target.value)}
        />
      </div>
      <div className="w-44">
        <Input
          label="Sport"
          placeholder="Filter by sport..."
          value={filters.sport}
          onChange={(e) => handleChange("sport", e.target.value)}
        />
      </div>
      <div className="w-36">
        <Input
          label="Min Confidence"
          type="number"
          placeholder="e.g. 80"
          min="0"
          max="100"
          value={filters.minConfidence}
          onChange={(e) => handleChange("minConfidence", e.target.value)}
        />
      </div>
      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleReset}
          className="gap-1.5 mb-0.5"
        >
          <RotateCcw size={14} />
          Reset
        </Button>
      )}
    </div>
  );
}

export { ScanFilters };
