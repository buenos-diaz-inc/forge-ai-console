"use client";

import { ResponsiveBar, type BarDatum, type BarSvgProps } from "@nivo/bar";
import { useNivoTheme, useChartColors } from "./use-nivo-theme";

type BarChartProps = Omit<BarSvgProps<BarDatum>, "theme" | "data" | "height" | "width"> & {
  data: BarDatum[];
  colors?: string[];
};

export function BarChart({ colors, data, ...props }: BarChartProps) {
  const nivoTheme = useNivoTheme();
  const palette = useChartColors();

  return (
    <ResponsiveBar
      theme={nivoTheme}
      colors={colors ?? palette}
      data={data}
      margin={{ top: 20, right: 20, bottom: 40, left: 50 }}
      padding={0.3}
      borderRadius={4}
      axisBottom={{ tickSize: 0, tickPadding: 12 }}
      axisLeft={{ tickSize: 0, tickPadding: 12 }}
      enableGridX={false}
      labelSkipWidth={16}
      labelSkipHeight={16}
      labelTextColor={{ from: "color", modifiers: [["brighter", 10]] }}
      animate
      motionConfig="gentle"
      {...props}
    />
  );
}
