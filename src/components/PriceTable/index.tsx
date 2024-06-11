import { TOKEN } from "@/lib/types";
import {
  TableBody,
  Table,
  TableHeader,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import PriceTableRow from "./PriceTableRow";
import { TOKEN_PAIRS } from "@/lib/constants";

export default async function PriceTable() {
  return (
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
  );
}
