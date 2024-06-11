import PriceTableRow from "@/components/PriceTableRow";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TOKEN_PAIRS } from "@/lib/constants";
import { TOKEN } from "@/lib/types";

export default function Home() {
  return (
    <div className="max-w-screen-lg max-h-full overflow-auto mx-auto">
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
