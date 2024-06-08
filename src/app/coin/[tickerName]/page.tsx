export default function CoinDetails({
  params,
}: {
  params: {
    tickerName: string;
  };
}) {
  return (
    <div>
      <h1>{params.tickerName}</h1>
    </div>
  );
}
