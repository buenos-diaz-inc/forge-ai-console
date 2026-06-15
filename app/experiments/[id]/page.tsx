"use client";

import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { PageHeader } from "@/components/layout/page-header";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { StatusBadge, statusTone, isLiveStatus } from "@/components/ui/status-badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/table";
import { ChartContainer } from "@/components/charts/chart-container";
import { LineChart } from "@/components/charts/line-chart";
import { getExperiment, lossCurveData, accuracyCurveData } from "@/lib/data/experiments";

export default function ExperimentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const experiment = getExperiment(id);

  if (!experiment) {
    return (
      <PageShell>
        <div className="text-fg-secondary">Experiment not found.</div>
      </PageShell>
    );
  }

  const progress = Math.round((experiment.epoch / experiment.totalEpochs) * 100);

  return (
    <PageShell>
      <div className="flex items-center gap-3">
        <Link
          href="/experiments"
          className={buttonVariants({ variant: "secondary", size: "icon" })}
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <PageHeader
          className="flex-1"
          title={experiment.runId}
          description={`${experiment.model} on ${experiment.dataset} · ${experiment.gpu}`}
          actions={
            <StatusBadge
              label={experiment.status}
              tone={statusTone(experiment.status)}
              pulse={isLiveStatus(experiment.status)}
            />
          }
        />
      </div>

      <Card variant="outlined" padding="md" radius="lg">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-body-sm text-fg-secondary">
            Epoch {experiment.epoch} / {experiment.totalEpochs}
          </span>
          <span className="text-body-sm font-medium text-fg-primary">{progress}%</span>
        </div>
        <Progress value={progress} size="lg" tone="accent" />
      </Card>

      <Tabs defaultValue="training">
        <TabsList>
          <TabsTrigger value="training">Training Progress</TabsTrigger>
          <TabsTrigger value="hyperparams">Hyperparameters</TabsTrigger>
          <TabsTrigger value="metrics">Metrics</TabsTrigger>
        </TabsList>

        <TabsContent value="training">
          <ChartContainer
            title="Loss Curve"
            description="Training and validation loss over epochs"
            height={300}
          >
            <LineChart
              data={lossCurveData}
              enableArea
              areaOpacity={0.06}
              axisBottom={{
                tickSize: 0,
                tickPadding: 12,
                tickValues: ["1", "20", "40", "60", "80", "100"],
                legend: "Epoch",
                legendOffset: 32,
                legendPosition: "middle",
              }}
              legends={[
                {
                  anchor: "top-right",
                  direction: "row",
                  translateY: -20,
                  itemWidth: 120,
                  itemHeight: 20,
                  symbolSize: 8,
                  symbolShape: "circle",
                },
              ]}
            />
          </ChartContainer>
        </TabsContent>

        <TabsContent value="hyperparams">
          <Card variant="outlined" padding="none" radius="lg" className="overflow-hidden p-2">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Parameter</TableHead>
                  <TableHead>Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(experiment.hyperparameters).map(([key, value]) => (
                  <TableRow key={key}>
                    <TableCell className="font-mono">{key}</TableCell>
                    <TableCell className="font-mono">{String(value)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="metrics">
          <ChartContainer
            title="Accuracy & F1 Score"
            description="Model performance metrics over epochs"
            height={300}
          >
            <LineChart
              data={accuracyCurveData}
              enableArea
              areaOpacity={0.06}
              yScale={{ type: "linear", min: 50, max: 100 }}
              axisBottom={{
                tickSize: 0,
                tickPadding: 12,
                tickValues: ["1", "20", "40", "60", "80", "100"],
                legend: "Epoch",
                legendOffset: 32,
                legendPosition: "middle",
              }}
              legends={[
                {
                  anchor: "top-right",
                  direction: "row",
                  translateY: -20,
                  itemWidth: 100,
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
