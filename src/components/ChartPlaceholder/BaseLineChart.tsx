"use client";

import { LegacyRef, useEffect, useRef, useState } from "react";
import { createChart, ColorType, Time } from "lightweight-charts";
import { BaseLineSeries, LineChartItem } from "@/lib/types";
import { ASPECT_RATIO } from "@/lib/constants";

export const BaseLineChart = ({
  data,
  additionalData,
}: {
  data: Array<LineChartItem>;
  additionalData?: Array<LineChartItem>;
}) => {
  const chartContainerRef = useRef<HTMLElement>();
  const latestTime = useRef<Time>(data[data.length - 1].time);
  const seriesRef = useRef<BaseLineSeries>();

  useEffect(() => {
    const width = chartContainerRef?.current!.clientWidth;
    const handleResize = () => {
      chart.applyOptions({ width });
    };

    const chart = createChart(chartContainerRef?.current!, {
      layout: {
        textColor: "#7c8298",
        background: {
          type: ColorType.Solid,
          color: "#ffffff", //"#0d1520",
        },
      },
      grid: {
        vertLines: {
          color: "#efefef", // "#333444",
        },
        horzLines: {
          color: "#efefef", //"#333444",
        },
      },
      width,
      height: width / ASPECT_RATIO,
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
    seriesRef.current = newSeries;

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      chart.remove();
    };
  }, [data]);

  useEffect(() => {
    if (seriesRef.current && additionalData) {
      const newLineData = additionalData[additionalData.length - 1];
      if (newLineData.time > latestTime.current) {
        seriesRef.current.update(newLineData);
        latestTime.current = newLineData.time;
      }
    }
  }, [additionalData]);

  return <div ref={chartContainerRef as LegacyRef<HTMLDivElement>} />;
};
