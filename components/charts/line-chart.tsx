"use client";

import { ResponsiveLine, type LineSvgProps } from "@nivo/line";
import { useNivoTheme, useChartColors, useNivoSupportColors } from "./use-nivo-theme";

type LineChartProps = Omit<LineSvgProps, "theme"> & {
  colors?: string[];
};

export function LineChart({ colors, ...props }: LineChartProps) {
  const nivoTheme = useNivoTheme();
  const palette = useChartColors();
  const { axis, tooltipBg, tooltipFg, tooltipBorder } = useNivoSupportColors();

  return (
    <ResponsiveLine
      theme={nivoTheme}
      colors={colors ?? palette}
      margin={{ top: 20, right: 20, bottom: 40, left: 50 }}
      xScale={{ type: "point" }}
      yScale={{ type: "linear", min: "auto", max: "auto", stacked: false }}
      axisBottom={{ tickSize: 0, tickPadding: 12 }}
      axisLeft={{ tickSize: 0, tickPadding: 12 }}
      pointSize={6}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      enableGridX={false}
      useMesh
      enableSlices="x"
      crosshairType="cross"
      curve="monotoneX"
      animate
      motionConfig="gentle"
      sliceTooltip={({ slice }) => (
        <div
          style={{
            background: tooltipBg,
            color: tooltipFg,
            borderRadius: "8px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
            border: `1px solid ${tooltipBorder}`,
            padding: "8px 12px",
            fontSize: 12,
          }}
        >
          {slice.points.map((point) => (
            <div
              key={point.id}
              style={{ display: "flex", alignItems: "center", gap: 8, padding: "2px 0" }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  backgroundColor: point.serieColor,
                }}
              />
              <span style={{ color: axis, fontWeight: 500 }}>{point.serieId}</span>
              <span style={{ fontWeight: 600 }}>{point.data.yFormatted}</span>
            </div>
          ))}
        </div>
      )}
      {...props}
    />
  );
}
