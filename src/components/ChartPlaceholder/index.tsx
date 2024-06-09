import { Suspense } from "react";
import { getOhlcData } from "@/lib/price/ohlc";
import { Skeleton } from "../ui/skeleton";
import { TIME_INTERVALS } from "@/lib/constants";
import { ChartManager } from "./ChartManager";
import { OHLCApiResponse } from "@/lib/types";

export const ChartPlaceholder = async ({
  tickerName,
}: {
  tickerName: string;
}) => {
  // Fetch initial 1-minute interval data on the server side
  const initialData = await getOhlcData(tickerName);

  return (
    <Suspense fallback={<Skeleton className="w-full h-48" />}>
      <ChartManager
        initialData={initialData as OHLCApiResponse}
        tickerName={tickerName}
      />
    </Suspense>
  );
};
