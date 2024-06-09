"use client";

import { LineChartItem, OHLCApiResponse } from "@/lib/types";
import { LineChart } from "./LineChart";
import { prepareLineChartData } from "@/lib/chartUtils/prepareLineChartData";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { useState, useEffect, Suspense } from "react";
import { Skeleton } from "../ui/skeleton";
import { getOhlcData } from "@/lib/price/ohlc";
import { TIME_INTERVALS } from "@/lib/constants";

export const ChartManager = ({
  initialData,
  tickerName,
}: {
  initialData: OHLCApiResponse;
  tickerName: string;
}) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState("1m");
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
        const remainingData = await Promise.all(
          remainingIntervals.map((interval) =>
            getOhlcData(tickerName, interval),
          ),
        );
        setOhlcData([initialData, ...remainingData]);
      } catch (error) {
        console.error("Error fetching additional OHLC data:", error);
      }
    };

    fetchAdditionalData();
  }, [initialData, tickerName]);

  const seriesData = new Map<string, Array<LineChartItem>>();
  try {
    const preparedData = ohlcData.map((d) => prepareLineChartData(d!));
    seriesData.set("1m", preparedData[0]);
    if (preparedData[1]) seriesData.set("1h", preparedData[1]);
    if (preparedData[2]) seriesData.set("4h", preparedData[2]);
    if (preparedData[3]) seriesData.set("1d", preparedData[3]);
    if (preparedData[4]) seriesData.set("1w", preparedData[4]);
  } catch (e) {
    console.error(e);
  }

  console.log(seriesData.get("1m"));
  console.log(seriesData.get("4h"));

  return (
    <div>
      <ToggleGroup
        variant="outline"
        type="single"
        value={selectedTimeframe}
        onValueChange={(value) => {
          if (value === "") return;
          setSelectedTimeframe(value);
        }}
      >
        <ToggleGroupItem value="1m" aria-label="1 minute interval">
          1m
        </ToggleGroupItem>
        <ToggleGroupItem value="1h" aria-label="1 hour interval">
          1h
        </ToggleGroupItem>
        <ToggleGroupItem value="4h" aria-label="4 hours interval">
          4h
        </ToggleGroupItem>
        <ToggleGroupItem value="1d" aria-label="1 day interval">
          1d
        </ToggleGroupItem>
        <ToggleGroupItem value="1w" aria-label="1 week interval">
          1w
        </ToggleGroupItem>
      </ToggleGroup>
      <Suspense fallback={<Skeleton className="w-full h-48" />}>
        <LineChart data={seriesData.get(selectedTimeframe) || []} />
      </Suspense>
    </div>
  );
};
