"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Plus, Rocket, CheckCircle2, AlertTriangle, XCircle, Search } from "lucide-react";
import type { ColDef } from "ag-grid-community";
import { PageShell } from "@/components/layout/page-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/ui/stat-card";
import { ForgeGrid } from "@/components/data-grid/forge-grid";
import { StatusCellRenderer } from "@/components/data-grid/cell-renderers";
import { formatPercent } from "@/lib/utils";
import { deployments } from "@/lib/data/deployments";
import type { Deployment } from "@/lib/types";

const columnDefs: ColDef<Deployment>[] = [
  { field: "name", headerName: "Name", flex: 1.5, minWidth: 180 },
  { field: "model", headerName: "Model", width: 140 },
  { field: "version", headerName: "Version", width: 120 },
  { field: "environment", headerName: "Env", width: 120 },
  { field: "region", headerName: "Region", width: 120 },
  { field: "status", headerName: "Status", width: 140, cellRenderer: StatusCellRenderer },
  {
    field: "requestsPerSec",
    headerName: "Req/s",
    width: 100,
    valueFormatter: (p) => ((p.value as number) > 0 ? `${p.value}` : "-"),
  },
  {
    field: "p99Latency",
    headerName: "P99 (ms)",
    width: 110,
    valueFormatter: (p) => ((p.value as number) > 0 ? `${p.value}ms` : "-"),
    cellStyle: (p) => {
      const val = p.value as number;
      if (val > 200) return { color: "hsl(var(--danger))" };
      if (val > 100) return { color: "hsl(var(--warning))" };
      return null;
    },
  },
  {
    field: "uptime",
    headerName: "Uptime",
    width: 100,
    valueFormatter: (p) => ((p.value as number) > 0 ? formatPercent(p.value as number) : "-"),
    cellStyle: (p) => {
      const val = p.value as number;
      if (val < 99) return { color: "hsl(var(--danger))" };
      if (val < 99.9) return { color: "hsl(var(--warning))" };
      return { color: "hsl(var(--success))" };
    },
  },
];

export default function DeploymentsPage() {
  const router = useRouter();
  const [search, setSearch] = React.useState("");

  const healthy = deployments.filter((d) => d.status === "Healthy").length;
  const degraded = deployments.filter((d) => d.status === "Degraded").length;
  const down = deployments.filter((d) => d.status === "Down").length;

  return (
    <PageShell>
      <PageHeader
        title="Deployments"
        description="Monitor and manage deployed endpoints."
        actions={
          <Button variant="primary" size="md">
            <Plus className="h-4 w-4" />
            New Deployment
          </Button>
        }
      />

      {/* KPI row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total Endpoints"
          value={deployments.length}
          unit="endpoints"
          icon={<Rocket className="h-4 w-4" />}
        />
        <StatCard
          label="Healthy"
          value={healthy}
          unit="online"
          tone="success"
          icon={<CheckCircle2 className="h-4 w-4" />}
        />
        <StatCard
          label="Degraded"
          value={degraded}
          unit="at risk"
          tone="warning"
          icon={<AlertTriangle className="h-4 w-4" />}
        />
        <StatCard
          label="Down"
          value={down}
          unit="offline"
          tone="danger"
          icon={<XCircle className="h-4 w-4" />}
        />
      </div>

      <div className="flex items-center gap-3">
        <div className="relative max-w-sm flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-fg-tertiary" />
          <input
            type="search"
            placeholder="Search deployments…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 w-full rounded-md border border-border bg-bg-surface pl-9 pr-3 text-body-sm text-fg-primary placeholder:text-fg-tertiary transition-colors focus-visible:border-accent focus-visible:shadow-focus focus-visible:outline-none"
          />
        </div>
      </div>

      <ForgeGrid<Deployment>
        rowData={deployments}
        columnDefs={columnDefs}
        height={500}
        quickFilterText={search}
        onRowClicked={(row) => router.push(`/deployments/${row.id}`)}
      />
    </PageShell>
  );
}
