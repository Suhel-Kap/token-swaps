import { SwapToken } from "@/components/SwapToken";
import { TOKEN_PAIRS } from "@/lib/constants";

export default function Trade({
  params,
}: {
  params: {
    tickerName: string;
  };
}) {
  const token = TOKEN_PAIRS.find(
    (pair) => pair.tickerName === params.tickerName,
  );

  return (
    <div className="my-16 flex items-center justify-center">
      <SwapToken initialTokenIn={token!} />
    </div>
  );
}
