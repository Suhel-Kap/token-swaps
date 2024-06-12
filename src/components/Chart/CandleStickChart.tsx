"use client";

import { LegacyRef, useEffect, useRef, useState } from "react";
import { createChart, ColorType, Time } from "lightweight-charts";
import { CandleStickChartItem, CandleStickSeries } from "@/lib/types";
import { ASPECT_RATIO, getChartColors } from "@/lib/constants";
import { useTheme } from "next-themes";

export const CandleStickChart = ({
  data,
  additionalData,
}: {
  data: Array<CandleStickChartItem>;
  additionalData?: Array<CandleStickChartItem>;
}) => {
  const chartContainerRef = useRef<HTMLElement>();
  const latestTime = useRef<Time>(data[data.length - 1].time);
  const seriesRef = useRef<CandleStickSeries>();
  const chartRef = useRef<ReturnType<typeof createChart>>();
  const { theme } = useTheme();

  useEffect(() => {
    const width = chartContainerRef?.current!.clientWidth;
    const handleResize = () => {
      chart.applyOptions({ width });
    };

    const colors = getChartColors(theme ?? "light");
    const chart = createChart(chartContainerRef?.current!, {
      ...colors,
      width,
      height: width / ASPECT_RATIO,
    });
    chart.timeScale().applyOptions({
      barSpacing: 20,
    });

    chartRef.current = chart;

    const newSeries = chart.addCandlestickSeries({
      upColor: "#14c684",
      downColor: "#eb3843",
      borderVisible: false,
      wickUpColor: "#14c684",
      wickDownColor: "#eb3843",
    });

    newSeries.setData(data);
    seriesRef.current = newSeries;

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      chart.remove();
    };
  }, [data]);

  useEffect(() => {
    if (seriesRef.current && additionalData) {
      const newCandle = additionalData[additionalData.length - 1];
      if (newCandle.time > latestTime.current) {
        seriesRef.current.update(newCandle);
        latestTime.current = newCandle.time;
      }
    }
  }, [additionalData]);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.applyOptions(getChartColors(theme ?? "light"));
    }
  }, [theme]);

  return <div ref={chartContainerRef as LegacyRef<HTMLDivElement>} />;
};
