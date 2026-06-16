import * as React from "react";
import { cn } from "@/lib/cn";
import type { Milestone } from "@/lib/data/about";

export interface MilestoneTimelineProps {
  items: Milestone[];
}

/** Vertical company timeline with a connecting rail and year nodes. */
export function MilestoneTimeline({ items }: MilestoneTimelineProps) {
  return (
    <ol className="relative flex flex-col">
      {items.map((item, i) => {
        const last = i === items.length - 1;
        return (
          <li key={item.year} className="relative flex gap-5 pb-8 last:pb-0">
            {/* Rail + node */}
            <div className="relative flex flex-col items-center">
              <span className="z-10 flex h-3 w-3 shrink-0 rounded-full bg-accent ring-4 ring-accent-subtle" />
              {!last ? (
                <span className="absolute top-3 h-full w-px bg-border" aria-hidden="true" />
              ) : null}
            </div>

            {/* Content */}
            <div className={cn("flex flex-col gap-1", last ? "pb-0" : "-mt-1")}>
              <span className="font-mono text-label font-semibold uppercase tracking-widest text-accent-strong">
                {item.year}
              </span>
              <h3 className="text-body font-semibold text-fg-primary">{item.title}</h3>
              <p className="max-w-prose text-body-sm leading-relaxed text-fg-secondary">
                {item.description}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
