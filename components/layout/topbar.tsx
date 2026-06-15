"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";
import { ROUTE_TITLES } from "@/lib/constants";
import { Avatar } from "@/components/ui/avatar";
import { ThemeToggle } from "./theme-toggle";

const topbarVariants = cva(
  "sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-border bg-bg-canvas/80 px-6 backdrop-blur-glass",
  {
    variants: {
      density: {
        compact: "h-14",
        comfortable: "h-16",
      },
    },
    defaultVariants: {
      density: "comfortable",
    },
  }
);

function useBreadcrumbs(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return [{ label: "Dashboard", href: "/" }];
  const crumbs = [{ label: "Home", href: "/" }];
  let current = "";
  for (const seg of segments) {
    current += `/${seg}`;
    crumbs.push({ label: ROUTE_TITLES[current] ?? seg, href: current });
  }
  return crumbs;
}

export interface TopbarProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof topbarVariants> {}

export function Topbar({ className, density, ...props }: TopbarProps) {
  const pathname = usePathname();
  const crumbs = useBreadcrumbs(pathname);

  return (
    <header className={cn(topbarVariants({ density }), className)} {...props}>
      <nav className="flex items-center gap-1.5 text-body-sm">
        {crumbs.map((crumb, i) => (
          <span key={crumb.href} className="flex items-center gap-1.5">
            {i > 0 ? <span className="text-fg-tertiary">/</span> : null}
            <Link
              href={crumb.href}
              className={cn(
                i === crumbs.length - 1
                  ? "font-medium text-fg-primary"
                  : "text-fg-secondary hover:text-fg-primary transition-colors"
              )}
            >
              {crumb.label}
            </Link>
          </span>
        ))}
      </nav>

      <div className="flex items-center gap-3">
        <div className="relative hidden sm:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-fg-tertiary" />
          <input
            type="search"
            placeholder="Search…"
            className="h-9 w-64 rounded-md border border-border bg-bg-surface pl-9 pr-3 text-body-sm text-fg-primary placeholder:text-fg-tertiary transition-colors focus-visible:border-accent focus-visible:shadow-focus focus-visible:outline-none"
          />
        </div>
        <ThemeToggle />
        <Avatar name="Brayden Love" size="sm" interactive />
      </div>
    </header>
  );
}

export { topbarVariants };
