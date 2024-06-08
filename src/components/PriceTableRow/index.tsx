import { TOKEN } from "@/lib/types";
import { TableCell, TableRow } from "../ui/table";
import Image from "next/image";
import { getAllTickers } from "@/lib/price/ticker";
import { Button } from "../ui/button";
import Link from "next/link";

export default async function PriceTableRow({ token }: { token: TOKEN }) {
  const price = await getAllTickers();
  const priceIncreased = (price?.[token.tickerName].percentage as number) > 0;

  return (
    <TableRow>
      <TableCell>
        <Link href={`/coin/${token.tickerName}`} passHref>
          <div className="flex place-items-center gap-1">
            <Image
              alt={token.displayName}
              src={`/tokens/${token.symbol}.svg`}
              width={30}
              height={30}
            />
            {token.displayName}
          </div>
        </Link>
      </TableCell>
      <TableCell>
        <Link href={`/coin/${token.tickerName}`} passHref>
          {token.symbol}
        </Link>
      </TableCell>
      <TableCell
        className={`${priceIncreased ? "text-green-500" : "text-red-500"}`}
      >
        <Link href={`/coin/${token.tickerName}`} passHref>
          ${parseFloat(price?.[token.tickerName].price as string).toFixed(2)}
        </Link>
      </TableCell>
      <TableCell
        className={`${priceIncreased ? "text-green-500" : "text-red-500"}`}
      >
        <Link href={`/coin/${token.tickerName}`} passHref>
          {price?.[token.tickerName].percentage.toFixed(2)}%
        </Link>
      </TableCell>
      <TableCell>
        <Button>Trade</Button>
      </TableCell>
    </TableRow>
  );
}
