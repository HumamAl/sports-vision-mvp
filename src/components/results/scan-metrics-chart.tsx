"use client";

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ScanSession, DetectedObject, RadarMetricData } from "@/lib/types";

interface ScanMetricsChartProps {
  scan: ScanSession;
  objects: DetectedObject[];
}

function ScanMetricsChart({ scan, objects }: ScanMetricsChartProps) {
  // Derive metrics from scan data
  const accuracy = Math.round(scan.avgConfidence * 100);
  const coverage = Math.min(100, Math.round((objects.length / 20) * 100));
  const resolution = scan.qualityScore;
  const speed = Math.min(100, Math.round((1 - scan.duration / 200) * 100));
  const consistency = objects.length > 0
    ? Math.round(
        (1 -
          objects.reduce((sum, o) => sum + Math.abs(o.confidence - scan.avgConfidence), 0) /
            objects.length) *
          100
      )
    : 0;
  const reliability = Math.round(
    (accuracy * 0.4 + coverage * 0.2 + resolution * 0.2 + consistency * 0.2)
  );

  const data: RadarMetricData[] = [
    { metric: "Accuracy", value: accuracy, fullMark: 100 },
    { metric: "Coverage", value: coverage, fullMark: 100 },
    { metric: "Resolution", value: resolution, fullMark: 100 },
    { metric: "Speed", value: speed, fullMark: 100 },
    { metric: "Consistency", value: consistency, fullMark: 100 },
    { metric: "Reliability", value: reliability, fullMark: 100 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Scan Quality Metrics</CardTitle>
      </CardHeader>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
            <PolarGrid
              stroke="#334155"
              strokeOpacity={0.5}
            />
            <PolarAngleAxis
              dataKey="metric"
              tick={{ fill: "#94a3b8", fontSize: 12 }}
            />
            <PolarRadiusAxis
              angle={30}
              domain={[0, 100]}
              tick={{ fill: "#94a3b8", fontSize: 10 }}
              tickCount={5}
            />
            <Radar
              name="Metrics"
              dataKey="value"
              stroke="#06b6d4"
              fill="#06b6d4"
              fillOpacity={0.2}
              strokeWidth={2}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export { ScanMetricsChart };
