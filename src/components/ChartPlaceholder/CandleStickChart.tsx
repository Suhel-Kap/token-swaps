"use client";

import { LegacyRef, useEffect, useRef } from "react";
import { createChart, ColorType } from "lightweight-charts";
import { CandleStickChartItem } from "@/lib/types";

export const CandleStickChart = ({
  data,
}: {
  data: Array<CandleStickChartItem>;
}) => {
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
      height: 300,
    });
    chart.timeScale().applyOptions({
      barSpacing: 20,
    });

    const newSeries = chart.addCandlestickSeries({
      upColor: "#14c684",
      downColor: "#eb3843",
      borderVisible: false,
      wickUpColor: "#14c684",
      wickDownColor: "#eb3843",
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