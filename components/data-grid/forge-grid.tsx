"use client";

import { AgGridReact } from "ag-grid-react";
import type { ColDef, GridOptions } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

export interface ForgeGridProps<T> {
  rowData: T[];
  columnDefs: ColDef<T>[];
  height?: string | number;
  pagination?: boolean;
  pageSize?: number;
  onRowClicked?: (data: T) => void;
  quickFilterText?: string;
  gridOptions?: Partial<GridOptions<T>>;
}

export function ForgeGrid<T>({
  rowData,
  columnDefs,
  height = 500,
  pagination = true,
  pageSize = 15,
  onRowClicked,
  quickFilterText,
  gridOptions,
}: ForgeGridProps<T>) {
  return (
    <div
      className="ag-theme-quartz ag-theme-forge rounded-lg border border-border overflow-hidden bg-bg-surface"
      style={{ height }}
    >
      <AgGridReact<T>
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={{ sortable: true, resizable: true, filter: true, minWidth: 100 }}
        pagination={pagination}
        paginationPageSize={pageSize}
        paginationPageSizeSelector={[10, 15, 25, 50]}
        animateRows
        rowClass={onRowClicked ? "cursor-pointer" : undefined}
        onRowClicked={onRowClicked ? (e) => e.data && onRowClicked(e.data) : undefined}
        quickFilterText={quickFilterText}
        suppressCellFocus
        {...gridOptions}
      />
    </div>
  );
}
