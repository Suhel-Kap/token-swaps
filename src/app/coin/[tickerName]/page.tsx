import { ChartPlaceholder } from "@/components/ChartPlaceholder";
import { CoinDetails } from "@/components/CoinDetails";
import { Button } from "@/components/ui/button";
import { PageProps } from "@/lib/types";
import Link from "next/link";

export default function Coin({ params }: PageProps) {
  return (
    <div className="max-w-screen-lg mx-auto">
      <div className="grid grid-cols-4 px-3 md:px-0">
        <CoinDetails tickerName={params.tickerName} />
        <div className="col-span-1 flex items-center justify-end">
          <Link href={`/trade/${params.tickerName}`}>
            <Button className="w-20">Trade</Button>
          </Link>
        </div>
      </div>
      <ChartPlaceholder tickerName={params.tickerName} />
    </div>
  );
}

export function generateMetadata({ params }: PageProps) {
  return {
    title: `${params.tickerName} | Coin Detail`,
    description: `Details of ${params.tickerName} coin`,
  };
}
