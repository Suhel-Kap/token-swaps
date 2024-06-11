import { TOKEN } from "@/lib/types";
import { TableCell, TableRow } from "../ui/table";
import Image from "next/image";
import { getAllTickers } from "@/lib/price/ticker";
import { Button } from "../ui/button";
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default async function PriceTableRow({ token }: { token: TOKEN }) {
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
            <p className="text-base">{token.displayName}</p>
          </div>
        </Link>
      </TableCell>
      <TableCell>
        <Link href={`/coin/${token.tickerName}`}>{token.symbol}</Link>
      </TableCell>
      <TableCell
        className={cn(
          "font-semibold",
          `${priceIncreased ? "text-[#14c684]" : "text-[#eb3843]"}`,
        )}
      >
        <Link href={`/coin/${token.tickerName}`}>
          ${parseFloat(price?.[token.tickerName].price as string).toFixed(2)}
        </Link>
      </TableCell>
      <TableCell
        className={cn(
          "font-semibold",
          `${priceIncreased ? "text-[#14c684]" : "text-[#eb3843]"}`,
        )}
      >
        <Link
          className="flex place-items-center"
          href={`/coin/${token.tickerName}`}
        >
          {priceIncreased ? <AiFillCaretUp /> : <AiFillCaretDown />}
          {price?.[token.tickerName].percentage.toFixed(2)}%
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
