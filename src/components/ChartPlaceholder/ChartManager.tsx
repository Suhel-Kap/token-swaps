"use client";

import { ChartType, OHLCApiResponse } from "@/lib/types";
import { BaseLineChart } from "./BaseLineChart";
import { prepareLineChartData } from "@/lib/chartUtils/prepareLineChartData";
import { useState, useEffect, Suspense } from "react";
import { Skeleton } from "../ui/skeleton";
import { getOhlcData } from "@/lib/price/ohlc";
import { TIME_INTERVALS } from "@/lib/constants";
import { TimeToggle } from "./TimeToggle";
import { prepareCandlestickChartData } from "@/lib/chartUtils/prepareCandleStickChartData";
import { CandleStickChart } from "./CandleStickChart";
import { ChartToggle } from "./ChartToggle";
import { prepareChartData } from "@/lib/chartUtils/preapareChartData";

export const ChartManager = ({
  initialData,
  tickerName,
}: {
  initialData: OHLCApiResponse;
  tickerName: string;
}) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState("15m");
  const [chartType, setChartType] = useState<ChartType>("baseline");
  const [ohlcData, setOhlcData] = useState<Array<OHLCApiResponse>>([
    initialData,
  ]);

  useEffect(() => {
    const fetchAdditionalData = async () => {
      const remainingIntervals = [
        TIME_INTERVALS.ONE_HOUR,
        TIME_INTERVALS.FOUR_HOURS,
        TIME_INTERVALS.ONE_DAY,
        TIME_INTERVALS.ONE_WEEK,
      ];

      try {
        const remainingData = (await Promise.all(
          remainingIntervals.map((interval) =>
            getOhlcData(tickerName, interval),
          ),
        )) as Array<OHLCApiResponse>;
        setOhlcData([initialData, ...remainingData]);
      } catch (error) {
        console.error("Error fetching additional OHLC data:", error);
      }
    };

    fetchAdditionalData();
  }, [initialData, tickerName]);

  const baseLineData = prepareChartData(ohlcData, prepareLineChartData);
  const candleStickData = prepareChartData(
    ohlcData,
    prepareCandlestickChartData,
  );

  return (
    <div>
      <div className="flex justify-between mb-2 p-2">
        <ChartToggle
          selectedChart={chartType}
          setSelectedChart={setChartType}
        />
        <TimeToggle
          selectedTimeframe={selectedTimeframe}
          setSelectedTimeframe={setSelectedTimeframe}
        />
      </div>
      <Suspense fallback={<Skeleton className="w-full h-48" />}>
        {chartType === "baseline" ? (
          <BaseLineChart data={baseLineData.get(selectedTimeframe)!} />
        ) : (
          <CandleStickChart data={candleStickData.get(selectedTimeframe)!} />
        )}
      </Suspense>
    </div>
  );
};
