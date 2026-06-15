import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const statusBadgeVariants = cva(
  "inline-flex items-center gap-2 font-medium whitespace-nowrap tracking-wide rounded-pill",
  {
    variants: {
      tone: {
        success: "bg-success-subtle text-success-fg",
        info: "bg-info-subtle text-info-fg",
        warning: "bg-warning-subtle text-warning-fg",
        danger: "bg-danger-subtle text-danger-fg",
        neutral: "bg-bg-surface-hover text-fg-secondary",
      },
      size: {
        sm: "h-5 pl-1.5 pr-2.5 text-overline",
        md: "h-6 pl-2 pr-3 text-label",
        lg: "h-7 pl-2.5 pr-3.5 text-body-sm",
      },
      pulse: {
        true: "",
        false: "",
      },
    },
    defaultVariants: {
      tone: "neutral",
      size: "md",
      pulse: false,
    },
  }
);

const dotTone: Record<NonNullable<VariantProps<typeof statusBadgeVariants>["tone"]>, string> = {
  success: "bg-success",
  info: "bg-info",
  warning: "bg-warning",
  danger: "bg-danger",
  neutral: "bg-fg-tertiary",
};

/** Map any domain status string to a semantic tone. */
export function statusTone(
  status: string
): NonNullable<VariantProps<typeof statusBadgeVariants>["tone"]> {
  switch (status.toLowerCase()) {
    case "active":
    case "healthy":
    case "completed":
    case "ready":
      return "success";
    case "running":
    case "deploying":
    case "processing":
      return "info";
    case "queued":
    case "degraded":
    case "warning":
    case "invited":
      return "warning";
    case "failed":
    case "error":
    case "down":
    case "revoked":
    case "deactivated":
      return "danger";
    default:
      return "neutral";
  }
}

/** Statuses that should animate their dot (in-flight work). */
export function isLiveStatus(status: string): boolean {
  return ["running", "deploying", "processing"].includes(status.toLowerCase());
}

export interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof statusBadgeVariants> {
  label: string;
}

export const StatusBadge = React.forwardRef<HTMLSpanElement, StatusBadgeProps>(
  ({ className, tone, size, pulse, label, ...props }, ref) => (
    <span
      ref={ref}
      data-tone={tone ?? "neutral"}
      className={cn(statusBadgeVariants({ tone, size, pulse }), className)}
      {...props}
    >
      <span className="relative inline-flex h-2 w-2 shrink-0">
        {pulse ? (
          <span
            className={cn(
              "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
              dotTone[tone ?? "neutral"]
            )}
          />
        ) : null}
        <span className={cn("relative inline-flex h-2 w-2 rounded-full", dotTone[tone ?? "neutral"])} />
      </span>
      {label}
    </span>
  )
);
StatusBadge.displayName = "StatusBadge";

export { statusBadgeVariants };
