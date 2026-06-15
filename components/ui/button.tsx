import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all focus-visible:outline-none focus-visible:shadow-focus disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary: "bg-accent text-accent-fg hover:bg-accent-hover shadow-xs",
        secondary:
          "bg-bg-surface text-fg-primary border border-border hover:bg-bg-surface-hover shadow-xs",
        ghost: "bg-transparent text-fg-secondary hover:bg-bg-surface-hover hover:text-fg-primary",
        outline:
          "bg-transparent text-fg-primary border border-border-strong hover:bg-bg-surface-hover",
        solid: "bg-fg-primary text-fg-inverse hover:bg-fg-primary/85 shadow-xs",
        danger: "bg-danger text-fg-inverse hover:bg-danger/90 shadow-xs",
        link: "bg-transparent text-accent-strong underline-offset-4 hover:underline px-0",
      },
      size: {
        sm: "h-8 px-3 text-body-sm rounded-md",
        md: "h-9 px-4 text-body-sm rounded-md",
        lg: "h-11 px-5 text-body rounded-lg",
        icon: "h-9 w-9 rounded-md",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, loading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, fullWidth }), className)}
        disabled={disabled || loading}
        data-loading={loading || undefined}
        {...props}
      >
        {loading ? (
          <span className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-r-transparent" />
        ) : null}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { buttonVariants };
