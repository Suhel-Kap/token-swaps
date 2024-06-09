"use client";

import { LegacyRef, useEffect, useRef } from "react";
import { createChart, ColorType } from "lightweight-charts";
import { LineChartItem } from "@/lib/types";

export const BaseLineChart = ({ data }: { data: Array<LineChartItem> }) => {
  const chartContainerRef = useRef<HTMLElement>();

  useEffect(() => {
    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef?.current!.clientWidth });
    };

    const chart = createChart(chartContainerRef?.current!, {
      layout: {
        textColor: "#7c8298",
        background: {
          type: ColorType.Solid,
          color: "#0d1520",
        },
      },
      grid: {
        vertLines: {
          color: "#333444",
        },
        horzLines: {
          color: "#333444",
        },
      },
      width: chartContainerRef?.current!.clientWidth,
      height: 500,
    });
    chart.timeScale().applyOptions({
      barSpacing: 10,
    });

    const newSeries = chart.addBaselineSeries({
      topLineColor: "#14c684",
      topFillColor1: "rgba( 38, 166, 154, 0.28)",
      topFillColor2: "rgba( 38, 166, 154, 0.05)",
      bottomLineColor: "#eb3843",
      bottomFillColor1: "rgba( 239, 83, 80, 0.05)",
      bottomFillColor2: "rgba( 239, 83, 80, 0.28)",
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
