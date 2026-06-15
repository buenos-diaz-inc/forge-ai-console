"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { StatusBadge, statusTone, isLiveStatus } from "@/components/ui/status-badge";
import { ChartContainer } from "@/components/charts/chart-container";
import { LineChart } from "@/components/charts/line-chart";
import { formatDate } from "@/lib/utils";
import { getModel, modelVersions, modelMetricsOverVersions } from "@/lib/data/models";

export default function ModelDetailPage() {
  const { id } = useParams<{ id: string }>();
  const model = getModel(id);

  if (!model) {
    return (
      <PageShell>
        <p className="text-body text-fg-tertiary">Model not found.</p>
      </PageShell>
    );
  }

  const overviewTiles = [
    { label: "Parameters", value: model.parameters },
    { label: "Model Size", value: model.size },
    { label: "Accuracy", value: `${model.accuracy}%` },
    { label: "Latency", value: `${model.latency}ms` },
    { label: "Framework", value: model.framework },
    { label: "Type", value: model.type },
    { label: "Created", value: formatDate(model.createdAt) },
    { label: "Last Updated", value: formatDate(model.updatedAt) },
  ];

  return (
    <PageShell>
      <div className="flex items-start gap-3">
        <Link
          href="/models"
          className={buttonVariants({ variant: "secondary", size: "icon" })}
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div className="flex-1">
          <PageHeader
            title={model.name}
            description={`${model.framework} · ${model.type} · v${model.version}`}
            actions={
              <Button variant="secondary" size="md">
                Edit Model
              </Button>
            }
          />
          <div className="mt-3 flex items-center gap-3">
            <StatusBadge
              label={model.status}
              tone={statusTone(model.status)}
              pulse={isLiveStatus(model.status)}
            />
            {model.deployed && (
              <StatusBadge label="Deployed" tone="success" pulse />
            )}
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="versions">Versions</TabsTrigger>
          <TabsTrigger value="metrics">Metrics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {overviewTiles.map((tile) => (
              <Card key={tile.label} variant="outlined" padding="sm" radius="md">
                <p className="text-label text-fg-tertiary">{tile.label}</p>
                <p className="mt-1 text-body-lg font-semibold text-fg-primary">{tile.value}</p>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="versions">
          <div className="flex flex-col gap-3">
            {modelVersions.map((v) => (
              <Card
                key={v.version}
                variant="outlined"
                padding="sm"
                radius="md"
                className="flex-row items-center gap-4"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-accent-subtle font-mono text-body-sm font-medium text-accent-strong">
                  {v.version.split(".")[0]}
                </div>
                <div className="flex-1">
                  <p className="text-body-sm font-medium text-fg-primary">v{v.version}</p>
                  <p className="text-label text-fg-tertiary">
                    {formatDate(v.date)} by {v.author.name}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-body-sm font-medium text-fg-primary">{v.accuracy}%</p>
                  <p className="text-label text-success-fg">{v.delta}</p>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="metrics">
          <ChartContainer
            title="Performance Over Versions"
            description="Accuracy and F1 score trends across model versions"
            height={300}
          >
            <LineChart
              data={modelMetricsOverVersions}
              yScale={{ type: "linear", min: 85, max: 100 }}
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
        </TabsContent>
      </Tabs>
    </PageShell>
  );
}
