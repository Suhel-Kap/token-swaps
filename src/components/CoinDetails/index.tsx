import { TOKEN_PAIRS } from "@/lib/constants";
import { getTicker } from "@/lib/price/ticker";
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";
import Image from "next/image";

export const CoinDetails = async ({ tickerName }: { tickerName: string }) => {
  const tokenPriceDetails = await getTicker(tickerName);
  const token = TOKEN_PAIRS.find((token) => token.tickerName === tickerName);
  const price = tokenPriceDetails?.result[tickerName].c[0];
  const openingPrice = tokenPriceDetails?.result[tickerName].o;
  const percentage =
    ((parseFloat(price!) - parseFloat(openingPrice!)) /
      parseFloat(openingPrice!)) *
    100;

  return (
    <div className="my-4 col-span-3">
      <div className="flex space-x-2 place-items-center my-3">
        <Image
          alt="token-image"
          src={`/tokens/${token?.symbol}.svg`}
          width={30}
          height={30}
        />
        <h1 className="text-2xl font-semibold">{token?.displayName}</h1>
        <h3 className="text-md">{token?.symbol}</h3>
      </div>
      <div className="flex space-x-2 place-items-center">
        <h2 className="text-4xl font-bold">
          ${parseFloat(price ?? "0").toFixed(2)}
        </h2>
        <h3 className="text-md font-semibold text-gray-500">
          {percentage > 0 ? (
            <span className="text-green-500 flex place-items-center">
              <AiFillCaretUp className="text-green-500" />{" "}
              {percentage.toFixed(2)}% (24h)
            </span>
          ) : (
            <span className="text-red-500 flex place-items-center">
              <AiFillCaretDown className="text-red-500" />{" "}
              {Math.abs(percentage).toFixed(2)}% (24h)
            </span>
          )}
        </h3>
      </div>
    </div>
  );
};
