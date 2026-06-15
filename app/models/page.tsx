"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import type { ColDef } from "ag-grid-community";
import { PageShell } from "@/components/layout/page-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { ForgeGrid } from "@/components/data-grid/forge-grid";
import {
  StatusCellRenderer,
  AvatarCellRenderer,
  DeployedCellRenderer,
} from "@/components/data-grid/cell-renderers";
import { formatDate } from "@/lib/utils";
import { models } from "@/lib/data/models";
import type { Model } from "@/lib/types";

const columnDefs: ColDef<Model>[] = [
  { field: "name", headerName: "Name", flex: 1.5, minWidth: 160 },
  { field: "framework", headerName: "Framework", width: 130 },
  { field: "type", headerName: "Type", width: 130 },
  { field: "version", headerName: "Version", width: 100 },
  { field: "status", headerName: "Status", width: 140, cellRenderer: StatusCellRenderer },
  {
    field: "accuracy",
    headerName: "Accuracy",
    width: 110,
    valueFormatter: (p) => `${p.value}%`,
  },
  {
    field: "latency",
    headerName: "Latency",
    width: 110,
    valueFormatter: (p) => `${p.value}ms`,
  },
  {
    field: "author",
    headerName: "Author",
    width: 170,
    cellRenderer: AvatarCellRenderer,
    valueGetter: (p) => p.data?.author?.name,
  },
  {
    field: "updatedAt",
    headerName: "Updated",
    width: 130,
    valueFormatter: (p) => formatDate(p.value as string),
  },
  {
    field: "deployed",
    headerName: "Deployed",
    width: 100,
    cellRenderer: DeployedCellRenderer,
  },
];

export default function ModelsPage() {
  const router = useRouter();
  const [search, setSearch] = React.useState("");

  return (
    <PageShell>
      <PageHeader
        title="Models"
        description="Manage your model registry."
        actions={
          <Button variant="primary" size="md">
            <Plus className="h-4 w-4" />
            New Model
          </Button>
        }
      />

      <div className="flex items-center gap-3">
        <div className="relative w-full max-w-sm">
          <input
            type="search"
            placeholder="Search models…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 w-full rounded-md border border-border bg-bg-surface px-3 text-body-sm text-fg-primary placeholder:text-fg-tertiary transition-colors focus-visible:border-accent focus-visible:shadow-focus focus-visible:outline-none"
          />
        </div>
      </div>

      <ForgeGrid<Model>
        rowData={models}
        columnDefs={columnDefs}
        height={600}
        quickFilterText={search}
        onRowClicked={(row) => router.push(`/models/${row.id}`)}
      />
    </PageShell>
  );
}
