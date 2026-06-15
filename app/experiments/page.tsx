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
  ProgressCellRenderer,
} from "@/components/data-grid/cell-renderers";
import { formatDate } from "@/lib/utils";
import { experiments } from "@/lib/data/experiments";
import type { Experiment } from "@/lib/types";

const columnDefs: ColDef<Experiment>[] = [
  { field: "runId", headerName: "Run ID", width: 120, pinned: "left" },
  { field: "model", headerName: "Model", flex: 1, minWidth: 140 },
  { field: "dataset", headerName: "Dataset", flex: 1, minWidth: 160 },
  { field: "status", headerName: "Status", width: 140, cellRenderer: StatusCellRenderer },
  {
    headerName: "Progress",
    width: 140,
    cellRenderer: ProgressCellRenderer,
    valueGetter: (p) => {
      if (!p.data) return 0;
      return Math.round((p.data.epoch / p.data.totalEpochs) * 100);
    },
  },
  {
    field: "loss",
    headerName: "Loss",
    width: 100,
    valueFormatter: (p) => ((p.value as number) > 0 ? (p.value as number).toFixed(4) : "-"),
  },
  {
    field: "accuracy",
    headerName: "Accuracy",
    width: 110,
    valueFormatter: (p) => ((p.value as number) > 0 ? `${p.value}%` : "-"),
  },
  { field: "duration", headerName: "Duration", width: 100 },
  { field: "gpu", headerName: "GPU", width: 110 },
  {
    field: "author",
    headerName: "Author",
    width: 160,
    cellRenderer: AvatarCellRenderer,
    valueGetter: (p) => p.data?.author?.name,
  },
  {
    field: "startedAt",
    headerName: "Started",
    width: 130,
    valueFormatter: (p) => formatDate(p.value as string),
  },
];

export default function ExperimentsPage() {
  const router = useRouter();
  const [search, setSearch] = React.useState("");

  return (
    <PageShell>
      <PageHeader
        title="Experiments"
        description="Track and compare training runs."
        actions={
          <Button variant="primary" size="md">
            <Plus className="h-4 w-4" />
            New Experiment
          </Button>
        }
      />

      <div className="flex items-center gap-3">
        <div className="max-w-sm flex-1">
          <input
            type="search"
            placeholder="Search experiments..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 w-full rounded-md border border-border bg-bg-surface px-3 text-body-sm text-fg-primary placeholder:text-fg-tertiary transition-colors focus-visible:outline-none focus-visible:shadow-focus"
          />
        </div>
      </div>

      <ForgeGrid<Experiment>
        rowData={experiments}
        columnDefs={columnDefs}
        height={650}
        quickFilterText={search}
        onRowClicked={(row) => router.push(`/experiments/${row.id}`)}
      />
    </PageShell>
  );
}
