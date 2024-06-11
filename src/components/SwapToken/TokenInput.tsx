import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { TOKEN, TokenInputProps } from "@/lib/types";
import { TOKEN_PAIRS } from "@/lib/constants";

const getTokenFromSymbol = (symbol: string): TOKEN | undefined =>
  TOKEN_PAIRS.find((token) => token.symbol === symbol);

export const TokenInput = ({
  label,
  token,
  setToken,
  amount,
  setAmount,
  excludeToken,
  disabled = false,
}: TokenInputProps) => (
  <div>
    <Label>{label}</Label>
    <div className="flex items-center space-x-2">
      <Input
        placeholder="0.0"
        className="w-3/5"
        type="number"
        value={amount}
        disabled={disabled}
        onChange={(e) => setAmount(parseFloat(e.target.value))}
      />
      <Select
        onValueChange={(symbol) => setToken(getTokenFromSymbol(symbol) || null)}
        defaultValue={token ? token.symbol : ""}
      >
        <SelectTrigger className="w-2/5">
          {token ? token.symbol : "Select token"}
        </SelectTrigger>
        <SelectContent className="z-[1500]" position="popper">
          {TOKEN_PAIRS.map((tkn, index) => (
            <SelectItem
              className="z-[1500]"
              disabled={
                excludeToken ? tkn.symbol === excludeToken.symbol : false
              }
              key={index}
              value={tkn.symbol}
            >
              {tkn.displayName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  </div>
);
