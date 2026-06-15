import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const emptyStateVariants = cva("flex flex-col items-center justify-center text-center", {
  variants: {
    size: {
      sm: "py-8 gap-2",
      md: "py-14 gap-3",
      lg: "py-20 gap-4",
    },
    tone: {
      neutral: "[&_[data-icon]]:bg-bg-subtle [&_[data-icon]]:text-fg-tertiary",
      accent: "[&_[data-icon]]:bg-accent-subtle [&_[data-icon]]:text-accent-strong",
    },
  },
  defaultVariants: {
    size: "md",
    tone: "neutral",
  },
});

export interface EmptyStateProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof emptyStateVariants> {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ className, size, tone, icon, title, description, action, ...props }, ref) => (
    <div ref={ref} className={cn(emptyStateVariants({ size, tone }), className)} {...props}>
      {icon ? (
        <div data-icon className="flex h-12 w-12 items-center justify-center rounded-xl">
          {icon}
        </div>
      ) : null}
      <h3 className="text-body-lg font-medium text-fg-primary">{title}</h3>
      {description ? (
        <p className="max-w-sm text-body-sm text-fg-secondary">{description}</p>
      ) : null}
      {action ? <div className="mt-2">{action}</div> : null}
    </div>
  )
);
EmptyState.displayName = "EmptyState";

export { emptyStateVariants };
