"use client";

import { useEffect, useState } from "react";
import { FaArrowDownLong } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SwapTokenProps, TOKEN } from "@/lib/types";
import { TokenInput } from "./TokenInput";
import { useAccount, useWalletClient } from "wagmi";
import { getBalance } from "@/lib/swapUtils/getBalance";
import { formatUnits } from "viem";
import { useConnectModal } from "@rainbow-me/rainbowkit";

export const SwapToken = ({ initialTokenIn }: SwapTokenProps) => {
  const [tokenIn, setTokenIn] = useState<TOKEN | null>(initialTokenIn);
  const [tokenOut, setTokenOut] = useState<TOKEN | null>(null);
  const [tokenInAmount, setTokenInAmount] = useState<number>(0);
  const [tokenOutAmount, setTokenOutAmount] = useState<number>(0);
  const [balance, setBalance] = useState<string | null>();

  const { openConnectModal } = useConnectModal();
  const { isConnected, address, chainId } = useAccount();
  const { data: signer } = useWalletClient();

  useEffect(() => {
    if (tokenIn && isConnected) {
      getBalance(chainId!, address as string, tokenIn).then((balance) => {
        setBalance(balance);
      });
    }
  }, [tokenIn]);

  return (
    <Card className="max-w-lg w-[385px] mx-auto">
      <CardContent className="mt-4">
        <TokenInput
          label="Sell"
          token={tokenIn}
          setToken={setTokenIn}
          amount={tokenInAmount}
          setAmount={setTokenInAmount}
          excludeToken={tokenOut}
        />
        {isConnected && balance && (
          <div className="flex justify-end place-items-center mt-1">
            <p className="text-xs text-gray-500">
              Balance:{" "}
              {parseFloat(
                formatUnits(BigInt(balance), tokenIn?.decimals ?? 18),
              ).toFixed(3)}
            </p>
            <Button
              onClick={() => {
                setTokenInAmount(
                  Number(formatUnits(BigInt(balance), tokenIn?.decimals ?? 18)),
                );
              }}
              className="h-5 p-2"
              variant="ghost"
            >
              Max
            </Button>
          </div>
        )}
        <div className="flex justify-center relative mt-10 mb-6">
          <Separator />
          <Button
            onClick={() => {
              setTokenIn(tokenOut);
              setTokenOut(tokenIn);
              setTokenInAmount(tokenOutAmount);
              setTokenOutAmount(tokenInAmount);
            }}
            variant="outline"
            className="absolute top-[-18px]"
          >
            <FaArrowDownLong />
          </Button>
        </div>
        <TokenInput
          label="Buy"
          token={tokenOut}
          setToken={setTokenOut}
          amount={tokenOutAmount}
          setAmount={setTokenOutAmount}
          excludeToken={tokenIn}
          disabled={true}
        />
      </CardContent>
      <CardFooter className="text-center">
        <Button
          variant={isConnected ? "default" : "secondary"}
          className="w-full"
          onClick={() => {
            if (isConnected) {
              console.log("Swap");
            } else if (openConnectModal) {
              openConnectModal();
            }
          }}
        >
          {isConnected ? "Swap" : "Connect Wallet"}
        </Button>
      </CardFooter>
    </Card>
  );
};
