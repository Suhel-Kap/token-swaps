import { ChartPlaceholder } from "@/components/ChartPlaceholder";

export default function CoinDetails({
  params,
}: {
  params: {
    tickerName: string;
  };
}) {
  return (
    <div className="max-w-screen-lg mx-auto">
      <h1>{params.tickerName}</h1>
      <ChartPlaceholder tickerName={params.tickerName} />
    </div>
  );
}
