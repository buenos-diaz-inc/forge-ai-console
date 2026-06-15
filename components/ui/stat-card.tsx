import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import { cn } from "@/lib/cn";
import { Card } from "./card";

const statCardVariants = cva("flex flex-col", {
  variants: {
    layout: {
      stacked: "gap-3",
      inline: "gap-2",
      hero: "gap-3 md:gap-4",
    },
    align: {
      start: "items-start text-left",
      center: "items-center text-center",
    },
  },
  defaultVariants: {
    layout: "stacked",
    align: "start",
  },
});

type Trend = "up" | "down" | "flat";
type Tone = "neutral" | "success" | "warning" | "danger" | "accent";
type Surface = "card" | "ghost" | "glass" | "bare";

export interface StatCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statCardVariants> {
  label: string;
  value: string | number;
  unit?: string;
  delta?: string;
  trend?: Trend;
  tone?: Tone;
  hint?: string;
  surface?: Surface;
  loading?: boolean;
  icon?: React.ReactNode;
}

const trendStyles: Record<Trend, string> = {
  up: "text-success-fg",
  down: "text-danger-fg",
  flat: "text-fg-tertiary",
};

const TrendIcon: Record<Trend, React.ElementType> = {
  up: ArrowUpRight,
  down: ArrowDownRight,
  flat: Minus,
};

function StatBody({
  layout,
  align,
  label,
  value,
  unit,
  delta,
  trend,
  tone,
  hint,
  icon,
}: Pick<
  StatCardProps,
  "layout" | "align" | "label" | "value" | "unit" | "delta" | "trend" | "tone" | "hint" | "icon"
>) {
  const t: Trend = trend ?? "flat";
  const Icon = TrendIcon[t];
  return (
    <div className={cn(statCardVariants({ layout, align }))}>
      <div className="flex w-full items-center justify-between gap-3">
        <span className="text-overline uppercase tracking-widest text-fg-tertiary font-semibold">
          {label}
        </span>
        {icon ? (
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-accent-subtle text-accent-strong">
            {icon}
          </span>
        ) : null}
      </div>
      <div className="flex items-baseline gap-2">
        <span
          className={cn(
            "font-mono font-semibold leading-none",
            layout === "hero" ? "text-metric" : "text-metric-sm",
            tone === "success" && "text-success-fg",
            tone === "warning" && "text-warning-fg",
            tone === "danger" && "text-danger-fg",
            tone === "accent" && "text-accent-strong",
            (tone === "neutral" || !tone) && "text-fg-primary"
          )}
        >
          {value}
        </span>
        {unit ? <span className="text-body-sm text-fg-tertiary">{unit}</span> : null}
      </div>
      {(delta || hint) && (
        <div className="flex items-center gap-2 text-body-sm">
          {delta ? (
            <span className={cn("inline-flex items-center gap-1 font-medium", trendStyles[t])}>
              <Icon className="h-3.5 w-3.5" />
              {delta}
            </span>
          ) : null}
          {hint ? <span className="text-fg-tertiary">{hint}</span> : null}
        </div>
      )}
    </div>
  );
}

function StatSkeleton({ layout }: Pick<StatCardProps, "layout">) {
  const tall = layout === "hero";
  const block =
    "rounded-md bg-bg-subtle/80 animate-[shimmer_1.4s_ease-in-out_infinite] bg-gradient-to-r from-bg-subtle via-bg-surface-hover to-bg-subtle bg-[length:200%_100%]";
  return (
    <div className="flex flex-col gap-3 w-full" aria-busy="true" aria-live="polite">
      <div className={cn(block, "h-3 w-24")} />
      <div className={cn(block, tall ? "h-10 w-32" : "h-8 w-28")} />
      <div className={cn(block, "h-3 w-20")} />
    </div>
  );
}

export const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  (
    {
      className,
      layout,
      align,
      label,
      value,
      unit,
      delta,
      trend = "flat",
      tone = "neutral",
      hint,
      surface = "card",
      loading = false,
      icon,
      ...props
    },
    ref
  ) => {
    const body = loading ? (
      <StatSkeleton layout={layout} />
    ) : (
      <StatBody
        layout={layout}
        align={align}
        label={label}
        value={value}
        unit={unit}
        delta={delta}
        trend={trend}
        tone={tone}
        hint={hint}
        icon={icon}
      />
    );

    if (surface === "bare") {
      return (
        <div ref={ref} data-loading={loading || undefined} className={cn(className)} {...props}>
          {body}
        </div>
      );
    }

    const surfaceVariant = surface === "glass" ? "glass" : surface === "ghost" ? "flat" : "default";
    return (
      <Card
        ref={ref}
        variant={surfaceVariant}
        padding="md"
        radius="lg"
        data-loading={loading || undefined}
        className={cn("h-full", className)}
        {...props}
      >
        {body}
      </Card>
    );
  }
);
StatCard.displayName = "StatCard";

export { statCardVariants };
