import { Suspense } from "react";
import { getOhlcData } from "@/lib/price/ohlc";
import { Skeleton } from "../ui/skeleton";
import { ChartManager } from "./ChartManager";
import { OHLCApiResponse } from "@/lib/types";

export const ChartPlaceholder = async ({
  tickerName,
}: {
  tickerName: string;
}) => {
  // Fetch initial 15-minute interval data on the server side
  const initialData = await getOhlcData(tickerName);

  return (
    <Suspense fallback={<Skeleton className="w-full h-[500px]" />}>
      <ChartManager
        initialData={initialData as OHLCApiResponse}
        tickerName={tickerName}
      />
    </Suspense>
  );
};
