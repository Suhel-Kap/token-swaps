"use client";

import { LegacyRef, useEffect, useRef, useState } from "react";
import { createChart, ColorType, Time } from "lightweight-charts";
import { CandleStickChartItem, CandleStickSeries } from "@/lib/types";
import { ASPECT_RATIO } from "@/lib/constants";

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
      width,
      height: width / ASPECT_RATIO,
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

  return <div ref={chartContainerRef as LegacyRef<HTMLDivElement>} />;
};
