"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Plus, Search } from "lucide-react";
import type { ColDef } from "ag-grid-community";
import { PageShell } from "@/components/layout/page-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { ForgeGrid } from "@/components/data-grid/forge-grid";
import { StatusCellRenderer, AvatarCellRenderer } from "@/components/data-grid/cell-renderers";
import { formatDate, formatNumber } from "@/lib/utils";
import { datasets } from "@/lib/data/datasets";
import type { Dataset } from "@/lib/types";

const columnDefs: ColDef<Dataset>[] = [
  { field: "name", headerName: "Name", flex: 1.5, minWidth: 180 },
  { field: "type", headerName: "Type", width: 110, enableRowGroup: true },
  {
    field: "records",
    headerName: "Records",
    width: 120,
    valueFormatter: (p) => formatNumber(p.value as number),
  },
  { field: "size", headerName: "Size", width: 100 },
  { field: "version", headerName: "Version", width: 100 },
  { field: "status", headerName: "Status", width: 130, cellRenderer: StatusCellRenderer },
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
];

export default function DatasetsPage() {
  const router = useRouter();
  const [search, setSearch] = React.useState("");

  return (
    <PageShell>
      <PageHeader
        title="Datasets"
        description="Browse and manage training datasets."
        actions={
          <Button variant="primary" size="md">
            <Plus className="h-4 w-4" />
            Upload Dataset
          </Button>
        }
      />

      <div className="flex items-center gap-3">
        <div className="relative w-full max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-fg-tertiary" />
          <input
            type="search"
            placeholder="Search datasets…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 w-full rounded-md border border-border bg-bg-surface pl-9 pr-3 text-body-sm text-fg-primary placeholder:text-fg-tertiary transition-colors focus-visible:border-accent focus-visible:shadow-focus focus-visible:outline-none"
          />
        </div>
      </div>

      <ForgeGrid<Dataset>
        rowData={datasets}
        columnDefs={columnDefs}
        height={600}
        quickFilterText={search}
        onRowClicked={(row) => router.push(`/datasets/${row.id}`)}
      />
    </PageShell>
  );
}
