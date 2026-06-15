"use client";

import Link from "next/link";
import { Boxes, Zap, Rocket, Cpu, Plus } from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardOverline, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/ui/stat-card";
import { Avatar } from "@/components/ui/avatar";
import { ChartContainer } from "@/components/charts/chart-container";
import { LineChart } from "@/components/charts/line-chart";
import { BarChart } from "@/components/charts/bar-chart";
import { RadarChart } from "@/components/charts/radar-chart";
import { useChartColors } from "@/components/charts/use-nivo-theme";
import { formatRelativeTime } from "@/lib/utils";
import {
  dashboardStats,
  trainingTrendsData,
  resourceUtilizationData,
  modelComparisonData,
  activityFeed,
} from "@/lib/data/dashboard";

const statMeta = [
  { key: "totalModels", label: "Total Models", unit: "models", icon: Boxes },
  { key: "activeExperiments", label: "Active Experiments", unit: "running", icon: Zap },
  { key: "deployments", label: "Deployments", unit: "live", icon: Rocket },
  { key: "gpuHours", label: "GPU Hours", unit: "this month", icon: Cpu },
] as const;

const activityTone: Record<string, "success" | "info" | "accent" | "warning" | "neutral"> = {
  deployment: "success",
  training: "info",
  dataset: "accent",
  model: "warning",
  team: "neutral",
};

export default function DashboardPage() {
  const palette = useChartColors();

  return (
    <PageShell>
      <PageHeader
        overline="Thursday · Feb 19, 2026"
        title="Dashboard"
        description="Overview of your AI development platform — models, experiments, and live endpoints."
        actions={
          <>
            <Button variant="secondary" size="md">
              Daily report
            </Button>
            <Button variant="primary" size="md">
              <Plus className="h-4 w-4" />
              New Model
            </Button>
          </>
        }
      />

      {/* KPI row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statMeta.map(({ key, label, unit, icon: Icon }) => {
          const stat = dashboardStats[key];
          const trend = stat.change >= 0 ? "up" : "down";
          return (
            <StatCard
              key={key}
              label={label}
              value={stat.value}
              unit={unit}
              delta={`${stat.change >= 0 ? "+" : ""}${stat.change}%`}
              trend={trend}
              tone={trend === "up" ? "success" : "danger"}
              hint={stat.changeLabel}
              icon={<Icon className="h-4 w-4" />}
            />
          );
        })}
      </div>

      {/* Trends + utilization */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ChartContainer
          title="Training Trends"
          description="Training runs per week over the last 12 weeks"
          height={280}
        >
          <LineChart
            data={trainingTrendsData}
            colors={[palette[0], palette[2], palette[1]]}
            enableArea
            areaOpacity={0.08}
            legends={[
              {
                anchor: "top-right",
                direction: "row",
                translateY: -20,
                itemWidth: 80,
                itemHeight: 20,
                symbolSize: 8,
                symbolShape: "circle",
              },
            ]}
          />
        </ChartContainer>

        <ChartContainer
          title="Resource Utilization"
          description="GPU, CPU, and Memory usage across clusters (%)"
          height={280}
        >
          <BarChart
            data={resourceUtilizationData}
            keys={["GPU", "CPU", "Memory"]}
            indexBy="cluster"
            groupMode="grouped"
            colors={[palette[0], palette[3], palette[2]]}
            legends={[
              {
                dataFrom: "keys",
                anchor: "top-right",
                direction: "row",
                translateY: -20,
                itemWidth: 70,
                itemHeight: 20,
                symbolSize: 8,
                symbolShape: "circle",
              },
            ]}
          />
        </ChartContainer>
      </div>

      {/* Comparison + activity */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ChartContainer
          title="Model Comparison"
          description="Top 5 models across key performance metrics"
          height={320}
        >
          <RadarChart
            data={modelComparisonData}
            keys={["GPT-Forge", "BERT-Custom", "ResNet-V3", "LLaMA-Fine", "XGBoost-Pro"]}
            indexBy="metric"
            maxValue={100}
            colors={palette.slice(0, 5)}
            legends={[
              {
                anchor: "top-left",
                direction: "column",
                translateX: -50,
                translateY: -30,
                itemWidth: 100,
                itemHeight: 18,
                symbolSize: 8,
                symbolShape: "circle",
              },
            ]}
          />
        </ChartContainer>

        <Card variant="default" radius="lg" padding="md" className="flex flex-col gap-4">
          <CardTitle className="text-body-sm font-medium">Recent Activity</CardTitle>
          <div className="flex flex-col gap-1">
            {activityFeed.map((event) => (
              <div
                key={event.id}
                className="flex items-start gap-3 rounded-md p-2.5 transition-colors hover:bg-bg-surface-hover"
              >
                <Avatar name={event.author.name} size="sm" />
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <p className="text-body-sm leading-relaxed text-fg-primary">{event.message}</p>
                  <div className="flex items-center gap-2">
                    <Badge variant={activityTone[event.type] ?? "neutral"} size="sm" shape="pill">
                      {event.type}
                    </Badge>
                    <span className="text-label text-fg-tertiary">
                      {formatRelativeTime(event.timestamp)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </PageShell>
  );
}
