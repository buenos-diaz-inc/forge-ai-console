import * as React from "react";
import { Card } from "@/components/ui/card";

export interface ChartContainerProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  height?: number;
  children: React.ReactNode;
}

export function ChartContainer({
  title,
  description,
  actions,
  height = 300,
  children,
}: ChartContainerProps) {
  return (
    <Card variant="default" radius="lg" padding="md" className="flex flex-col gap-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-0.5">
          <h3 className="text-body-sm font-medium text-fg-primary">{title}</h3>
          {description ? <p className="text-label text-fg-tertiary">{description}</p> : null}
        </div>
        {actions}
      </div>
      <div style={{ height, width: "100%", position: "relative" }}>{children}</div>
    </Card>
  );
}
