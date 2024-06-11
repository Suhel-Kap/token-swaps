import { TOKEN } from "@/lib/types";
import { TableCell, TableRow } from "../ui/table";
import Image from "next/image";
import { getAllTickers } from "@/lib/price/ticker";
import { Button } from "../ui/button";
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default async function PriceTableRow({ token }: { token: TOKEN }) {
  // callling getAllTickers because we can fetch all token balances in one single API call to Kraken
  // and cache the responses for different tokens
  const price = await getAllTickers();
  const priceIncreased = (price?.[token.tickerName].percentage as number) > 0;

  return (
    <TableRow>
      <TableCell>
        <Link href={`/coin/${token.tickerName}`}>
          <div className="flex place-items-center gap-1">
            <Image
              alt={token.displayName}
              src={`/tokens/${token.symbol}.svg`}
              width={30}
              height={30}
            />
            <p className="text-md md:text-base">{token.displayName}</p>
          </div>
        </Link>
      </TableCell>
      <TableCell>
        <Link href={`/coin/${token.tickerName}`}>
          <p className="w-full">{token.symbol}</p>
        </Link>
      </TableCell>
      <TableCell
        className={cn(
          "font-semibold",
          `${priceIncreased ? "text-[#14c684]" : "text-[#eb3843]"}`,
        )}
      >
        <Link href={`/coin/${token.tickerName}`}>
          <p className="w-full">
            {" "}
            ${parseFloat(price?.[token.tickerName].price as string).toFixed(2)}
          </p>
        </Link>
      </TableCell>
      <TableCell
        className={cn(
          "font-semibold",
          `${priceIncreased ? "text-[#14c684]" : "text-[#eb3843]"}`,
        )}
      >
        <Link href={`/coin/${token.tickerName}`}>
          <div className="flex place-items-center w-full">
            <p>{priceIncreased ? <AiFillCaretUp /> : <AiFillCaretDown />}</p>
            <p>{price?.[token.tickerName].percentage.toFixed(2)}%</p>
          </div>
        </Link>
      </TableCell>
      <TableCell>
        <Link href={`/trade/${token.tickerName}`}>
          <Button>Trade</Button>
        </Link>
      </TableCell>
    </TableRow>
  );
}
