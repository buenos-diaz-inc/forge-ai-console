"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";
import { NAV_ITEMS } from "@/lib/constants";
import { Avatar } from "@/components/ui/avatar";

const sidebarVariants = cva(
  "fixed left-0 top-0 bottom-0 z-30 flex flex-col border-r border-border bg-bg-surface/80 backdrop-blur-glass",
  {
    variants: {
      width: {
        snug: "w-60",
        wide: "w-72",
      },
    },
    defaultVariants: {
      width: "snug",
    },
  }
);

export interface SidebarProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sidebarVariants> {}

export function Sidebar({ className, width, ...props }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className={cn(sidebarVariants({ width }), className)} {...props}>
      {/* Logo */}
      <div className="flex h-16 shrink-0 items-center gap-2.5 px-5">
        <Image src="/logo-mark.svg" alt="Forge" width={28} height={28} className="shrink-0" />
        <span className="font-display text-title font-bold tracking-tight text-fg-primary">
          Forge
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-3 py-4">
        {NAV_ITEMS.map((item) => {
          const active =
            item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              data-active={active}
              className={cn(
                "flex items-center rounded-md px-3 py-2 text-body-sm transition-colors",
                "text-fg-secondary hover:bg-bg-surface-hover hover:text-fg-primary",
                "data-[active=true]:bg-accent-subtle data-[active=true]:text-accent-strong data-[active=true]:font-medium"
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="border-t border-border-subtle p-3">
        <div className="flex items-center gap-3 rounded-md px-2 py-2">
          <Avatar name="Brayden Love" size="sm" />
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-body-sm font-medium text-fg-primary">Brayden Love</span>
            <span className="truncate text-label text-fg-tertiary">Admin</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

export { sidebarVariants };
