"use client";

import * as React from "react";
import type { Theme } from "@nivo/core";
import { useTheme } from "@/components/layout/theme-provider";
import { FORGE_COLORS } from "@/lib/constants";

/** Read a CSS custom property (e.g. "154 43% 29%") and wrap as an hsl() string. */
function readHsl(name: string, fallback: string): string {
  if (typeof window === "undefined") return fallback;
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return raw ? `hsl(${raw})` : fallback;
}

/**
 * Categorical chart colors, read live from the `--chart-*` tokens so editing a
 * token in the Soffi UI recolors every chart, and the dark theme is honored.
 * Recomputes whenever the theme flips.
 */
export function useChartColors(): string[] {
  const { theme } = useTheme();
  return React.useMemo(() => {
    if (typeof window === "undefined") return [...FORGE_COLORS];
    return [1, 2, 3, 4, 5, 6, 7, 8].map((n, i) => readHsl(`--chart-${n}`, FORGE_COLORS[i]));
    // theme is the dependency that triggers a re-read on toggle.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);
}

export interface NivoSupportColors {
  axis: string;
  grid: string;
  tooltipBg: string;
  tooltipFg: string;
  tooltipBorder: string;
}

export function useNivoSupportColors(): NivoSupportColors {
  const { theme } = useTheme();
  return React.useMemo(
    () => ({
      axis: readHsl("--chart-axis", "#4b5563"),
      grid: readHsl("--chart-grid", "rgba(0,0,0,0.08)"),
      tooltipBg: readHsl("--chart-tooltip-bg", "#ffffff"),
      tooltipFg: readHsl("--chart-tooltip-fg", "#111827"),
      tooltipBorder: readHsl("--chart-tooltip-border", "#e5e7eb"),
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [theme]
  );
}

export function useNivoTheme(): Theme {
  const { axis, grid, tooltipBg, tooltipFg, tooltipBorder } = useNivoSupportColors();

  return React.useMemo<Theme>(
    () => ({
      background: "transparent",
      text: {
        fontSize: 12,
        fontFamily: "var(--font-sans)",
        fill: axis,
      },
      axis: {
        ticks: {
          text: { fill: axis, fontSize: 11 },
          line: { stroke: grid },
        },
        legend: {
          text: { fill: axis, fontSize: 12, fontWeight: 500 },
        },
      },
      grid: {
        line: { stroke: grid, strokeWidth: 1 },
      },
      legends: {
        text: { fill: axis, fontSize: 11 },
      },
      tooltip: {
        container: {
          background: tooltipBg,
          color: tooltipFg,
          fontSize: 12,
          borderRadius: "8px",
          boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
          border: `1px solid ${tooltipBorder}`,
          padding: "8px 12px",
        },
      },
      crosshair: {
        line: {
          stroke: axis,
          strokeWidth: 1,
          strokeOpacity: 0.5,
          strokeDasharray: "4 4",
        },
      },
      labels: {
        text: { fill: axis, fontSize: 12, fontWeight: 500 },
      },
    }),
    [axis, grid, tooltipBg, tooltipFg, tooltipBorder]
  );
}
