import * as React from "react";
import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

export interface ValueCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

/** A single company value: icon chip, title, and supporting copy. */
export function ValueCard({ icon: Icon, title, description }: ValueCardProps) {
  return (
    <Card variant="default" radius="lg" padding="md" className="gap-3">
      <span className="flex h-10 w-10 items-center justify-center rounded-md bg-accent-subtle text-accent-strong">
        <Icon className="h-5 w-5" />
      </span>
      <h3 className="font-display text-title font-semibold tracking-tight text-fg-primary">
        {title}
      </h3>
      <p className="text-body-sm leading-relaxed text-fg-secondary">{description}</p>
    </Card>
  );
}
