"use client";

import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { PageHeader } from "@/components/layout/page-header";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { StatusBadge, statusTone, isLiveStatus } from "@/components/ui/status-badge";
import { ChartContainer } from "@/components/charts/chart-container";
import { LineChart } from "@/components/charts/line-chart";
import { PieChart } from "@/components/charts/pie-chart";
import {
  getDeployment,
  trafficData,
  latencyData,
  statusCodeDistribution,
} from "@/lib/data/deployments";

export default function DeploymentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const deployment = getDeployment(id);

  if (!deployment) {
    return (
      <PageShell>
        <div className="flex items-center gap-3">
          <Link
            href="/deployments"
            className={buttonVariants({ variant: "secondary", size: "icon" })}
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>
        <p className="text-body text-fg-secondary">Deployment not found.</p>
      </PageShell>
    );
  }

  const stats = [
    { label: "Requests/sec", value: deployment.requestsPerSec || "-" },
    { label: "P99 Latency", value: deployment.p99Latency ? `${deployment.p99Latency}ms` : "-" },
    { label: "Uptime", value: deployment.uptime ? `${deployment.uptime}%` : "-" },
    { label: "Replicas", value: deployment.replicas },
    { label: "Auto-Scale", value: deployment.autoScale ? "Enabled" : "Disabled" },
  ];

  return (
    <PageShell>
      <div className="flex items-start gap-3">
        <Link
          href="/deployments"
          className={buttonVariants({ variant: "secondary", size: "icon" })}
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <PageHeader
          className="flex-1"
          title={deployment.name}
          description={`${deployment.model} v${deployment.version} · ${deployment.environment} · ${deployment.region}`}
          actions={
            <StatusBadge
              label={deployment.status}
              tone={statusTone(deployment.status)}
              pulse={isLiveStatus(deployment.status)}
            />
          }
        />
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        {stats.map((item) => (
          <Card key={item.label} variant="outlined" padding="sm" radius="md">
            <p className="text-label text-fg-tertiary">{item.label}</p>
            <p className="mt-1 text-body-lg font-semibold text-fg-primary">{item.value}</p>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="traffic">
        <TabsList>
          <TabsTrigger value="traffic">Traffic</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="traffic">
          <ChartContainer
            title="Request Volume"
            description="Requests per second over the last 24 hours"
            height={300}
          >
            <LineChart data={trafficData} enableArea areaOpacity={0.1} />
          </ChartContainer>
        </TabsContent>

        <TabsContent value="performance">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <ChartContainer
              title="Latency Distribution"
              description="P50, P95, and P99 latency over 24 hours"
              height={280}
            >
              <LineChart
                data={latencyData}
                legends={[
                  {
                    anchor: "top-right",
                    direction: "row",
                    translateY: -20,
                    itemWidth: 60,
                    itemHeight: 20,
                    symbolSize: 8,
                    symbolShape: "circle",
                  },
                ]}
              />
            </ChartContainer>
            <ChartContainer
              title="Status Code Distribution"
              description="Response status codes (%)"
              height={280}
            >
              <PieChart data={statusCodeDistribution} />
            </ChartContainer>
          </div>
        </TabsContent>
      </Tabs>
    </PageShell>
  );
}
