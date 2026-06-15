import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const pageHeaderVariants = cva("flex flex-col gap-1.5", {
  variants: {
    size: {
      sm: "gap-1",
      md: "gap-1.5",
      lg: "gap-2",
    },
    align: {
      start: "items-start text-left",
      center: "items-center text-center max-w-2xl mx-auto",
    },
  },
  defaultVariants: {
    size: "md",
    align: "start",
  },
});

export interface PageHeaderProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof pageHeaderVariants> {
  overline?: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

export function PageHeader({
  className,
  size,
  align,
  overline,
  title,
  description,
  actions,
  ...props
}: PageHeaderProps) {
  return (
    <header className={cn("flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between", className)} {...props}>
      <div className={cn(pageHeaderVariants({ size, align }))}>
        {overline ? (
          <span className="text-overline uppercase tracking-widest text-accent-strong font-semibold">
            {overline}
          </span>
        ) : null}
        <h1 className="font-display text-title-lg font-semibold tracking-tight text-fg-primary">
          {title}
        </h1>
        {description ? (
          <p className="text-body text-fg-secondary max-w-2xl">{description}</p>
        ) : null}
      </div>
      {actions ? <div className="flex items-center gap-2 shrink-0">{actions}</div> : null}
    </header>
  );
}

export { pageHeaderVariants };
