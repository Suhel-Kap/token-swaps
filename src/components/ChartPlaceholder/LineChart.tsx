"use client";

import { LegacyRef, useEffect, useRef } from "react";
import { createChart, ColorType } from "lightweight-charts";

export const LineChart = ({
  data,
}: {
  data: Array<{
    time: string;
    value: number;
  }>;
}) => {
  const chartContainerRef = useRef<HTMLElement>();

  const colors = {
    backgroundColor: "white",
    lineColor: "#2962FF",
    textColor: "black",
    areaTopColor: "#2962FF",
    areaBottomColor: "rgba(41, 98, 255, 0.28)",
  };

  useEffect(() => {
    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef?.current!.clientWidth });
    };

    const chart = createChart(chartContainerRef?.current!, {
      layout: {
        background: { type: ColorType.Solid, color: colors.backgroundColor },
        textColor: colors.textColor,
      },
      width: chartContainerRef?.current!.clientWidth,
      height: 300,
    });
    chart.timeScale().fitContent();

    const newSeries = chart.addAreaSeries({
      lineColor: colors.lineColor,
      topColor: colors.areaTopColor,
      bottomColor: colors.areaBottomColor,
    });
    newSeries.setData(data);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      chart.remove();
    };
  }, [data]);

  return <div ref={chartContainerRef as LegacyRef<HTMLDivElement>} />;
};
