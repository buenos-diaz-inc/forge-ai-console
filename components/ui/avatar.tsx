import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const avatarVariants = cva(
  "relative inline-flex items-center justify-center font-medium overflow-visible select-none shrink-0",
  {
    variants: {
      size: {
        xs: "h-6 w-6 text-overline",
        sm: "h-8 w-8 text-label",
        md: "h-10 w-10 text-body-sm",
        lg: "h-12 w-12 text-body",
        xl: "h-16 w-16 text-body-lg",
        "2xl": "h-20 w-20 text-title",
      },
      shape: {
        circle: "rounded-full",
        square: "rounded-md",
      },
      tone: {
        neutral: "bg-bg-surface-hover text-fg-secondary",
        accent: "bg-accent-subtle text-accent-strong",
        success: "bg-success-subtle text-success-fg",
        warning: "bg-warning-subtle text-warning-fg",
        danger: "bg-danger-subtle text-danger-fg",
        info: "bg-info-subtle text-info-fg",
        inverse: "bg-fg-primary text-fg-inverse",
      },
      ring: {
        none: "",
        soft: "ring-2 ring-bg-surface",
        accent: "ring-2 ring-accent ring-offset-2 ring-offset-bg-canvas",
      },
      interactive: {
        true: "cursor-pointer transition-shadow hover:shadow-card focus-visible:outline-none focus-visible:shadow-focus",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      shape: "circle",
      tone: "neutral",
      ring: "none",
      interactive: false,
    },
  }
);

type StatusKind = "online" | "away" | "busy" | "offline";

const statusDotColor: Record<StatusKind, string> = {
  online: "bg-success",
  away: "bg-warning",
  busy: "bg-danger",
  offline: "bg-fg-tertiary",
};

const statusDotSize: Record<NonNullable<VariantProps<typeof avatarVariants>["size"]>, string> = {
  xs: "h-1.5 w-1.5",
  sm: "h-2 w-2",
  md: "h-2.5 w-2.5",
  lg: "h-3 w-3",
  xl: "h-3.5 w-3.5",
  "2xl": "h-4 w-4",
};

const toneCycle = ["accent", "success", "warning", "danger", "info", "neutral"] as const;

function initialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function toneFromName(name: string): (typeof toneCycle)[number] {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) | 0;
  return toneCycle[Math.abs(hash) % toneCycle.length];
}

export interface AvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  /** Convenience: derive initials + a deterministic tone from a person's name. */
  name?: string;
  initials?: string;
  src?: string;
  alt?: string;
  status?: StatusKind;
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    { className, size, shape, tone, ring, interactive, name, initials, src, alt, status, children, ...props },
    ref
  ) => {
    const resolvedInitials = initials ?? (name ? initialsFromName(name) : undefined);
    const resolvedTone = tone ?? (name ? toneFromName(name) : undefined);
    return (
      <div
        ref={ref}
        data-interactive={interactive || undefined}
        data-status={status || undefined}
        tabIndex={interactive ? 0 : undefined}
        className={cn(avatarVariants({ size, shape, tone: resolvedTone, ring, interactive }), className)}
        {...props}
      >
        <span
          className={cn(
            "flex h-full w-full items-center justify-center overflow-hidden",
            shape === "square" ? "rounded-md" : "rounded-full"
          )}
        >
          {src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={src} alt={alt ?? name ?? ""} className="h-full w-full object-cover" />
          ) : (
            children ?? resolvedInitials
          )}
        </span>
        {status ? (
          <span
            aria-label={`status: ${status}`}
            className={cn(
              "absolute bottom-0 right-0 inline-block rounded-full ring-2 ring-bg-canvas",
              statusDotSize[size ?? "md"],
              statusDotColor[status]
            )}
          />
        ) : null}
      </div>
    );
  }
);
Avatar.displayName = "Avatar";

export { avatarVariants };
