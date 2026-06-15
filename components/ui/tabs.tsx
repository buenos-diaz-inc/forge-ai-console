"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

type TabsContextValue = {
  value: string;
  setValue: (v: string) => void;
  variant: NonNullable<VariantProps<typeof tabsListVariants>["variant"]>;
};

const TabsContext = React.createContext<TabsContextValue | null>(null);

function useTabs() {
  const ctx = React.useContext(TabsContext);
  if (!ctx) throw new Error("Tabs.* must be used inside <Tabs>");
  return ctx;
}

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue: string;
  value?: string;
  onValueChange?: (value: string) => void;
  variant?: NonNullable<VariantProps<typeof tabsListVariants>["variant"]>;
}

export function Tabs({
  defaultValue,
  value,
  onValueChange,
  variant = "underline",
  className,
  children,
  ...props
}: TabsProps) {
  const [internal, setInternal] = React.useState(defaultValue);
  const v = value ?? internal;
  const setValue = (next: string) => {
    if (value === undefined) setInternal(next);
    onValueChange?.(next);
  };
  return (
    <TabsContext.Provider value={{ value: v, setValue, variant }}>
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

const tabsListVariants = cva("inline-flex items-center gap-1", {
  variants: {
    variant: {
      underline: "border-b border-border w-full",
      pill: "p-1 bg-bg-surface-hover rounded-md self-start",
      segmented: "p-1 bg-bg-surface-hover rounded-md border border-border self-start",
    },
  },
  defaultVariants: {
    variant: "underline",
  },
});

export interface TabsListProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tabsListVariants> {}

export function TabsList({ className, variant, ...props }: TabsListProps) {
  const ctx = useTabs();
  const v = variant ?? ctx.variant;
  return (
    <div
      role="tablist"
      data-variant={v}
      className={cn(tabsListVariants({ variant: v }), className)}
      {...props}
    />
  );
}

const tabsTriggerVariants = cva(
  "inline-flex items-center justify-center h-9 px-4 text-body-sm font-medium transition-all focus-visible:outline-none focus-visible:shadow-focus disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        underline:
          "text-fg-secondary border-b-2 border-transparent -mb-px hover:text-fg-primary data-[active=true]:text-accent-strong data-[active=true]:border-accent rounded-none",
        pill: "text-fg-secondary rounded-md hover:text-fg-primary data-[active=true]:bg-accent data-[active=true]:text-accent-fg",
        segmented:
          "text-fg-secondary rounded-md hover:text-fg-primary data-[active=true]:bg-bg-surface data-[active=true]:text-fg-primary data-[active=true]:shadow-card",
      },
    },
    defaultVariants: {
      variant: "underline",
    },
  }
);

export interface TabsTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof tabsTriggerVariants> {
  value: string;
}

export function TabsTrigger({ className, variant, value, ...props }: TabsTriggerProps) {
  const { value: active, setValue, variant: ctxVariant } = useTabs();
  const v = variant ?? ctxVariant;
  const isActive = active === value;
  return (
    <button
      role="tab"
      type="button"
      data-active={isActive}
      aria-selected={isActive}
      onClick={() => setValue(value)}
      className={cn(tabsTriggerVariants({ variant: v }), className)}
      {...props}
    />
  );
}

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export function TabsContent({ className, value, ...props }: TabsContentProps) {
  const { value: active } = useTabs();
  if (active !== value) return null;
  return <div role="tabpanel" className={cn("flex flex-col gap-6", className)} {...props} />;
}

export { tabsListVariants, tabsTriggerVariants };
