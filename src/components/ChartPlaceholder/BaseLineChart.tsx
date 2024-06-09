"use client";

import { LegacyRef, useEffect, useRef } from "react";
import { createChart, ColorType } from "lightweight-charts";
import { LineChartItem } from "@/lib/types";

export const BaseLineChart = ({ data }: { data: Array<LineChartItem> }) => {
  const chartContainerRef = useRef<HTMLElement>();

  const colors = {
    backgroundColor: "black",
    textColor: "white",
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

    const newSeries = chart.addBaselineSeries({
      baseValue: { type: "price", price: 25 },
      topLineColor: "rgba( 38, 166, 154, 1)",
      topFillColor1: "rgba( 38, 166, 154, 0.28)",
      topFillColor2: "rgba( 38, 166, 154, 0.05)",
      bottomLineColor: "rgba( 239, 83, 80, 1)",
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
