"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { FaArrowDownLong } from "react-icons/fa6";
import { TOKEN } from "@/lib/types";
import { Separator } from "../ui/separator";
import { useState } from "react";
import { TOKEN_PAIRS } from "@/lib/constants";

const getTokenFromSymbol = (symbol: string) =>
  TOKEN_PAIRS.find((token) => token.symbol === symbol);

export const SwapToken = ({ initialTokenIn }: { initialTokenIn: TOKEN }) => {
  const [tokenIn, setTokenIn] = useState(initialTokenIn);
  const [tokenOut, setTokenOut] = useState<TOKEN | null>();
  const [tokenInAmount, setTokenInAmount] = useState(0);
  const [tokenOutAmount, setTokenOutAmount] = useState(0);

  return (
    <>
      <Card className="max-w-lg w-[385px] mx-auto">
        <CardContent className="mt-4">
          <div>
            <Label>Sell</Label>
            <div className="flex items-center space-x-2">
              <Input
                placeholder="0.0"
                className="w-3/5"
                type="number"
                onChange={(e) => setTokenInAmount(parseFloat(e.target.value))}
                value={tokenInAmount}
              />
              <Select
                onValueChange={(e) => setTokenIn(getTokenFromSymbol(e)!)}
                defaultValue={tokenIn.symbol}
              >
                <SelectTrigger className="w-2/5">
                  {tokenIn.symbol}
                </SelectTrigger>
                <SelectContent>
                  {TOKEN_PAIRS.map((token, index) => {
                    const shouldDisable = tokenOut
                      ? token.symbol === tokenOut.symbol
                      : false;
                    return (
                      <SelectItem
                        disabled={shouldDisable}
                        key={index}
                        value={token.symbol}
                      >
                        {token.displayName}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-center relative mt-10">
            <Separator />
            <Button variant="outline" className="absolute top-[-18px]">
              <FaArrowDownLong />
            </Button>
          </div>
          <div className="mt-6">
            <Label>Buy</Label>
            <div className="flex items-center space-x-2">
              <Input
                placeholder="0.0"
                className="w-3/5"
                type="number"
                value={tokenOutAmount}
                onChange={(e) => setTokenOutAmount(parseFloat(e.target.value))}
              />
              <Select onValueChange={(e) => setTokenOut(getTokenFromSymbol(e))}>
                <SelectTrigger className="w-2/5">
                  {tokenOut ? tokenOut.symbol : "Select token"}
                </SelectTrigger>
                <SelectContent>
                  {TOKEN_PAIRS.map((token, index) => {
                    const shouldDisable = tokenIn.symbol === token.symbol;
                    return (
                      <SelectItem
                        disabled={shouldDisable}
                        key={index}
                        value={token.symbol}
                      >
                        {token.displayName}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter className="text-center">
          <Button className="w-full">Swap</Button>
        </CardFooter>
      </Card>
    </>
  );
};
