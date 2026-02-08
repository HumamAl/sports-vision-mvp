"use client";

import { ScanSession } from "@/lib/types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ScanActivityChartProps {
  scans: ScanSession[];
}

function buildActivityData(scans: ScanSession[]) {
  const now = new Date();
  const days: { date: string; label: string; scans: number; objects: number }[] = [];

  for (let i = 13; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const dateKey = d.toISOString().split("T")[0];
    const label = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    days.push({ date: dateKey, label, scans: 0, objects: 0 });
  }

  scans.forEach((scan) => {
    const scanDate = scan.date;
    if (!scanDate) return;
    const dateKey = new Date(scanDate).toISOString().split("T")[0];
    const day = days.find((d) => d.date === dateKey);
    if (day) {
      day.scans += 1;
      day.objects += scan.objectsDetected;
    }
  });

  return days;
}

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number; dataKey: string }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border bg-surface-dark p-3 shadow-xl">
      <p className="mb-1 text-xs font-medium text-muted">{label}</p>
      {payload.map((entry) => (
        <p key={entry.dataKey} className="text-sm font-semibold text-cyber">
          {entry.dataKey === "scans" ? "Scans" : "Objects"}: {entry.value}
        </p>
      ))}
    </div>
  );
}

export function ScanActivityChart({ scans }: ScanActivityChartProps) {
  const data = buildActivityData(scans);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Scan Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="cyberGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="accentGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis
                dataKey="label"
                tick={{ fill: "#94a3b8", fontSize: 11 }}
                tickLine={false}
                axisLine={{ stroke: "#334155" }}
                interval="preserveStartEnd"
              />
              <YAxis
                tick={{ fill: "#94a3b8", fontSize: 11 }}
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="objects"
                stroke="#10b981"
                strokeWidth={1.5}
                fill="url(#accentGradient)"
                dot={false}
              />
              <Area
                type="monotone"
                dataKey="scans"
                stroke="#06b6d4"
                strokeWidth={2}
                fill="url(#cyberGradient)"
                dot={{ r: 3, fill: "#06b6d4", strokeWidth: 0 }}
                activeDot={{ r: 5, fill: "#06b6d4", stroke: "#0f172a", strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
