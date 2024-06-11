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
        min={0}
        className="w-3/5 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        type="number"
        value={amount}
        disabled={disabled}
        onChange={(e) => {
          let inputAmount = parseFloat(e.target.value);
          // Fix user pasting negative number in input
          if (inputAmount < 0) {
            inputAmount = 0;
          }
          setAmount(inputAmount);
        }}
      />
      <Select
        onValueChange={(symbol) => setToken(getTokenFromSymbol(symbol) || null)}
        defaultValue={token ? token.symbol : ""}
      >
        <SelectTrigger className="w-2/5">
          {token ? token.symbol : "Select token"}
        </SelectTrigger>
        <SelectContent>
          {TOKEN_PAIRS.map((tkn, index) => (
            <SelectItem
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
