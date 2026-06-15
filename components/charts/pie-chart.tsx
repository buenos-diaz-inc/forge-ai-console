"use client";

import { ResponsivePie, type PieSvgProps } from "@nivo/pie";
import { useNivoTheme, useChartColors, useNivoSupportColors } from "./use-nivo-theme";

type PieDatum = { id: string; label: string; value: number; color?: string };

type PieChartProps = Omit<
  PieSvgProps<PieDatum>,
  "theme" | "data" | "height" | "width"
> & {
  data: PieDatum[];
  colors?: string[];
};

export function PieChart({ colors, data, ...props }: PieChartProps) {
  const nivoTheme = useNivoTheme();
  const palette = useChartColors();
  const { axis } = useNivoSupportColors();

  return (
    <ResponsivePie
      theme={nivoTheme}
      colors={colors ?? palette}
      data={data}
      margin={{ top: 20, right: 80, bottom: 20, left: 80 }}
      innerRadius={0.6}
      padAngle={1}
      cornerRadius={4}
      activeOuterRadiusOffset={4}
      borderWidth={0}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor={axis}
      arcLinkLabelsColor={axis}
      arcLinkLabelsThickness={1}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{ from: "color", modifiers: [["brighter", 10]] }}
      animate
      motionConfig="gentle"
      {...props}
    />
  );
}
