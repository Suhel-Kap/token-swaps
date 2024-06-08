import { Suspense } from "react";
import { getOhlcData } from "@/lib/price/ohlc";
import { LineChart } from "./LineChart";
import { Skeleton } from "../ui/skeleton";
import { prepareLineChartData } from "@/lib/chartUtils/prepareLineChartData";

export const ChartPlaceholder = async ({
  tickerName,
}: {
  tickerName: string;
}) => {
  const data = await getOhlcData(tickerName);
  const preparedData = prepareLineChartData(data!);

  return (
    <Suspense fallback={<Skeleton className="w-full h-48" />}>
      <LineChart data={preparedData} />
    </Suspense>
  );
};
