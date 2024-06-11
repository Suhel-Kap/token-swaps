import { ChartPlaceholder } from "@/components/ChartPlaceholder";
import { CoinDetails } from "@/components/CoinDetails";

export default function Coin({
  params,
}: {
  params: {
    tickerName: string;
  };
}) {
  return (
    <div className="max-w-screen-lg mx-auto">
      <CoinDetails tickerName={params.tickerName} />
      <ChartPlaceholder tickerName={params.tickerName} />
    </div>
  );
}
