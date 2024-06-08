import PriceTableRow from "@/components/PriceTableRow";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TOKEN_PAIRS } from "@/lib/constants";
import { TOKEN } from "@/lib/types";
import Image from "next/image";

export default function Home() {
  return (
    <div className="max-w-screen-lg mx-auto mt-4 flex flex-col justify-center items-center">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Display Name</TableHead>
            <TableHead>Symbol</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Change</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {TOKEN_PAIRS.map((token: TOKEN, idx: number) => {
            return <PriceTableRow key={idx} token={token} />;
          })}
        </TableBody>
      </Table>
    </div>
  );
}
