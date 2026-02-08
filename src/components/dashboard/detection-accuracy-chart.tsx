"use client";

import { DetectedObject } from "@/lib/types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface DetectionAccuracyChartProps {
  objects: DetectedObject[];
}

const CATEGORY_COLORS: Record<string, string> = {
  ball: "#10b981",
  player: "#3b82f6",
  goal: "#f59e0b",
  boundary: "#ef4444",
  equipment: "#8b5cf6",
  surface: "#06b6d4",
  obstacle: "#f97316",
};

function buildAccuracyData(objects: DetectedObject[]) {
  const categories: Record<string, { sum: number; count: number }> = {};
  const allCategories = ["ball", "player", "goal", "boundary", "equipment", "surface", "obstacle"];

  allCategories.forEach((cat) => {
    categories[cat] = { sum: 0, count: 0 };
  });

  objects.forEach((obj) => {
    if (categories[obj.category]) {
      categories[obj.category].sum += obj.confidence;
      categories[obj.category].count += 1;
    }
  });

  return allCategories
    .filter((cat) => categories[cat].count > 0)
    .map((cat) => ({
      category: cat.charAt(0).toUpperCase() + cat.slice(1),
      accuracy: Math.round((categories[cat].sum / categories[cat].count) * 100),
      count: categories[cat].count,
      color: CATEGORY_COLORS[cat],
    }))
    .sort((a, b) => b.accuracy - a.accuracy);
}

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ payload: { category: string; accuracy: number; count: number } }>;
}) {
  if (!active || !payload?.length) return null;
  const data = payload[0].payload;
  return (
    <div className="rounded-lg border border-border bg-surface-dark p-3 shadow-xl">
      <p className="mb-1 text-sm font-medium text-foreground">{data.category}</p>
      <p className="text-xs text-muted">
        Accuracy: <span className="font-semibold text-cyber">{data.accuracy}%</span>
      </p>
      <p className="text-xs text-muted">
        Detections: <span className="font-semibold text-foreground">{data.count}</span>
      </p>
    </div>
  );
}

export function DetectionAccuracyChart({ objects }: DetectionAccuracyChartProps) {
  const data = buildAccuracyData(objects);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Detection Accuracy by Category</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 5, right: 20, left: 10, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
              <XAxis
                type="number"
                domain={[0, 100]}
                tick={{ fill: "#94a3b8", fontSize: 11 }}
                tickLine={false}
                axisLine={{ stroke: "#334155" }}
                tickFormatter={(v: number) => `${v}%`}
              />
              <YAxis
                type="category"
                dataKey="category"
                tick={{ fill: "#94a3b8", fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                width={80}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(51, 65, 85, 0.3)" }} />
              <Bar dataKey="accuracy" radius={[0, 4, 4, 0]} barSize={20}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.85} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
