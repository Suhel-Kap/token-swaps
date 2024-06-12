"use client";
import { LegacyRef, useEffect, useRef } from "react";
import { createChart, Time } from "lightweight-charts";
import { ASPECT_RATIO, getChartColors } from "@/lib/constants";
import { useTheme } from "next-themes";
import { ChartContainerProps, ChartData } from "@/lib/types";

export const ChartContainer = <T extends ChartData>({
  data,
  additionalData,
  chartOptions,
}: ChartContainerProps<T>) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const latestTime = useRef<Time>(data[data.length - 1].time);
  const seriesRef = useRef<any>();
  const chartRef = useRef<ReturnType<typeof createChart>>();
  const { theme } = useTheme();

  useEffect(() => {
    const handleResize = () => {
      if (chartContainerRef.current) {
        chartRef.current?.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      }
    };

    if (chartContainerRef.current) {
      const colors = getChartColors(theme ?? "light");
      const chart = createChart(chartContainerRef.current, {
        ...colors,
        width: chartContainerRef.current.clientWidth,
        height: chartContainerRef.current.clientWidth / ASPECT_RATIO,
      });

      if (chartOptions.barSpacing) {
        chart.timeScale().applyOptions({
          barSpacing: chartOptions.barSpacing,
        });
      }

      chartRef.current = chart;
      const newSeries = chartOptions.addSeries(chart);
      newSeries.setData(data);
      seriesRef.current = newSeries;
      window.addEventListener("resize", handleResize);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      chartRef.current?.remove();
    };
  }, [data, theme, chartOptions.addSeries, chartOptions.barSpacing]);

  useEffect(() => {
    if (seriesRef.current && additionalData && additionalData.length > 0) {
      const newData = additionalData[additionalData.length - 1];
      if (newData.time >= latestTime.current) {
        chartOptions.updateSeries(seriesRef.current, newData);
        latestTime.current = newData.time;
      }
    }
  }, [additionalData, chartOptions.updateSeries]);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.applyOptions(getChartColors(theme ?? "light"));
    }
  }, [theme]);

  return <div ref={chartContainerRef as LegacyRef<HTMLDivElement>} />;
};
