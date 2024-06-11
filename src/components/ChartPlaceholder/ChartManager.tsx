"use client";

import {
  CandleStickChartItem,
  ChartType,
  LineChartItem,
  OHLCApiResponse,
} from "@/lib/types";
import { BaseLineChart } from "./BaseLineChart";
import { prepareLineChartData } from "@/lib/chartUtils/prepareLineChartData";
import { useState, useEffect, Suspense } from "react";
import { Skeleton } from "../ui/skeleton";
import { getOhlcData } from "@/lib/price/ohlc";
import {
  ASPECT_RATIO,
  KRAKEN_PUBLIC_WS_URL,
  TIME_INTERVALS,
  TOKEN_PAIRS,
} from "@/lib/constants";
import { TimeToggle } from "./TimeToggle";
import { prepareCandlestickChartData } from "@/lib/chartUtils/prepareCandleStickChartData";
import { CandleStickChart } from "./CandleStickChart";
import { ChartToggle } from "./ChartToggle";
import {
  prepareChartData,
  timeFrameToInterval,
} from "@/lib/chartUtils/preapareChartData";
import { createWebSocket, handleWebSocketMessage } from "@/lib/wesocket";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { AspectRatio } from "../ui/aspect-ratio";

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
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [liveData, setLiveData] = useState<{
    lineChartData: Array<LineChartItem>;
    candleStickChartData: Array<CandleStickChartItem>;
  } | null>(null);

  const openWs = () => {
    const token = TOKEN_PAIRS.find((pair) => pair.tickerName === tickerName);
    const ws = createWebSocket(
      KRAKEN_PUBLIC_WS_URL,
      [token?.wsName!],
      timeFrameToInterval(selectedTimeframe),
    );

    ws.onmessage = (event) => {
      const wsResponse = handleWebSocketMessage(event);
      if (wsResponse) {
        const lineChartData = prepareLineChartData(wsResponse);
        const candleStickChartData = prepareCandlestickChartData(wsResponse);
        setLiveData({ lineChartData, candleStickChartData });
      }
    };

    setSocket(ws);
  };

  const closeWs = () => {
    if (socket) {
      socket.close();
    }
  };

  const handleWs = (wantOpen: boolean) => {
    if (wantOpen) {
      openWs();
    } else {
      closeWs();
    }
  };

  useEffect(() => {
    const fetchAdditionalData = async () => {
      const remainingIntervals = [
        TIME_INTERVALS.ONE_MINUTE,
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
      <div className="flex place-items-center justify-end space-x-2 mb-2">
        <Switch onCheckedChange={(e) => handleWs(e)} id="live-enable" />
        <Label htmlFor="live-enable" className="text-md">
          Live Mode
        </Label>
      </div>
      <Suspense
        fallback={
          <AspectRatio ratio={ASPECT_RATIO}>
            <Skeleton className="w-full" />
          </AspectRatio>
        }
      >
        {chartType === "baseline" ? (
          <BaseLineChart
            data={baseLineData.get(selectedTimeframe)! as Array<LineChartItem>}
            additionalData={liveData?.lineChartData}
          />
        ) : (
          <CandleStickChart
            data={
              candleStickData.get(
                selectedTimeframe,
              )! as Array<CandleStickChartItem>
            }
            additionalData={liveData?.candleStickChartData}
          />
        )}
      </Suspense>
    </div>
  );
};
