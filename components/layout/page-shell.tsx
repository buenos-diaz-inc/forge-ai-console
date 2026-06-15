import * as React from "react";
import { cn } from "@/lib/cn";

export interface PageShellProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Padded, vertically-stacked page container. Flexbox so Soffi can reorder sections. */
export function PageShell({ className, ...props }: PageShellProps) {
  return (
    <div
      className={cn("mx-auto flex w-full max-w-[1280px] flex-col gap-6 p-6 lg:p-8", className)}
      {...props}
    />
  );
}
