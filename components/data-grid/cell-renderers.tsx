"use client";

import type { ICellRendererParams } from "ag-grid-community";
import { Avatar } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { StatusBadge, statusTone, isLiveStatus } from "@/components/ui/status-badge";

export function StatusCellRenderer(params: ICellRendererParams) {
  const value = params.value as string;
  if (!value) return null;
  return (
    <StatusBadge
      size="sm"
      label={value}
      tone={statusTone(value)}
      pulse={isLiveStatus(value)}
    />
  );
}

export function AvatarCellRenderer(params: ICellRendererParams) {
  const data = params.data;
  if (!data) return null;
  const name: string = data.author?.name || data.name || params.value || "";
  if (!name) return null;
  return (
    <div className="flex items-center gap-2.5">
      <Avatar name={name} size="xs" />
      <span className="text-body-sm text-fg-primary">{name}</span>
    </div>
  );
}

export function ProgressCellRenderer(params: ICellRendererParams) {
  const value = params.value as number;
  if (value === undefined || value === null) return null;
  const percent = Math.min(100, Math.max(0, value));
  return (
    <div className="flex w-full items-center gap-2.5">
      <Progress value={percent} size="sm" tone="accent" className="flex-1" />
      <span className="w-9 text-right text-label text-fg-tertiary tabular-nums">{percent}%</span>
    </div>
  );
}

export function DeployedCellRenderer(params: ICellRendererParams) {
  return params.value ? (
    <span className="text-body-sm font-medium text-success-fg">Yes</span>
  ) : (
    <span className="text-body-sm text-fg-tertiary">No</span>
  );
}
