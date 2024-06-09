export default function Trade({
  params,
}: {
  params: {
    tickerName: string;
  };
}) {
  return (
    <div className="max-w-screen-lg mx-auto">
      <h1>Trade</h1>
      <p>{params.tickerName}</p>
    </div>
  );
}
