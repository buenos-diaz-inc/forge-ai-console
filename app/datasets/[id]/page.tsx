"use client";

import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { PageHeader } from "@/components/layout/page-header";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusBadge, statusTone, isLiveStatus } from "@/components/ui/status-badge";
import { Card } from "@/components/ui/card";
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
import { PieChart } from "@/components/charts/pie-chart";
import { formatDate, formatNumber } from "@/lib/utils";
import { getDataset, datasetTypeDistribution, datasetSampleData } from "@/lib/data/datasets";

export default function DatasetDetailPage() {
  const { id } = useParams<{ id: string }>();
  const dataset = getDataset(id);

  if (!dataset) {
    return (
      <PageShell>
        <div className="flex items-center gap-3">
          <Link
            href="/datasets"
            className={buttonVariants({ variant: "secondary", size: "icon" })}
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <p className="text-body text-fg-tertiary">Dataset not found.</p>
        </div>
      </PageShell>
    );
  }

  const statisticsTiles = [
    { label: "Total Records", value: formatNumber(dataset.records) },
    { label: "Size", value: dataset.size },
    { label: "Columns", value: dataset.columns ?? "N/A" },
    { label: "Version", value: `v${dataset.version}` },
  ];

  const infoTiles = [
    { label: "Author", value: dataset.author.name },
    { label: "Created", value: formatDate(dataset.createdAt) },
    { label: "Last Updated", value: formatDate(dataset.updatedAt) },
    { label: "Type", value: dataset.type },
  ];

  return (
    <PageShell>
      <div className="flex items-center gap-3">
        <Link
          href="/datasets"
          className={buttonVariants({ variant: "secondary", size: "icon" })}
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <PageHeader
          className="flex-1"
          title={dataset.name}
          description={`${dataset.type} · v${dataset.version} · ${formatNumber(dataset.records)} records`}
          actions={
            <StatusBadge
              label={dataset.status}
              tone={statusTone(dataset.status)}
              pulse={isLiveStatus(dataset.status)}
            />
          }
        />
      </div>

      <Tabs defaultValue="preview">
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="statistics">Statistics</TabsTrigger>
          <TabsTrigger value="info">Info</TabsTrigger>
        </TabsList>

        <TabsContent value="preview">
          <Card variant="outlined" padding="none" radius="lg" className="overflow-hidden p-2">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Text</TableHead>
                  <TableHead>Sentiment</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {datasetSampleData.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell className="max-w-xs truncate">{row.text}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          row.sentiment === "positive"
                            ? "success"
                            : row.sentiment === "negative"
                              ? "danger"
                              : "neutral"
                        }
                        size="sm"
                        shape="pill"
                      >
                        {row.sentiment}
                      </Badge>
                    </TableCell>
                    <TableCell>{row.score}</TableCell>
                    <TableCell>{row.category}</TableCell>
                    <TableCell>{row.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="statistics">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <ChartContainer title="Type Distribution" height={280}>
              <PieChart data={datasetTypeDistribution} />
            </ChartContainer>
            <div className="grid grid-cols-2 gap-4">
              {statisticsTiles.map((tile) => (
                <Card key={tile.label} variant="outlined" padding="sm" radius="md">
                  <p className="text-label text-fg-tertiary">{tile.label}</p>
                  <p className="mt-1 text-body-lg font-semibold text-fg-primary">{tile.value}</p>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="info">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {infoTiles.map((tile) => (
              <Card key={tile.label} variant="outlined" padding="sm" radius="md">
                <p className="text-label text-fg-tertiary">{tile.label}</p>
                <p className="mt-1 text-body-lg font-semibold text-fg-primary">{tile.value}</p>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </PageShell>
  );
}
