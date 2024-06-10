"use client";

import { useEffect, useState } from "react";
import { FaArrowDownLong, FaGasPump } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Route, SwapTokenProps, TOKEN } from "@/lib/types";
import { TokenInput } from "./TokenInput";
import { useAccount, useWalletClient } from "wagmi";
import { getBalance } from "@/lib/swapUtils/getBalance";
import {
  WalletClient,
  formatUnits,
  parseEther,
  parseGwei,
  parseUnits,
} from "viem";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { getQuotes } from "@/lib/swapUtils/getQuotes";
import { useToast } from "@/components/ui/use-toast";
import { getRouteTransactionData } from "@/lib/swapUtils/getRouteTransactionData";
import { checkAllowance } from "@/lib/swapUtils/checkAllowance";
import { getApprovalTransactionData } from "@/lib/swapUtils/getApprovalTransactionData";
import { getPublicClient } from "@/lib/swapUtils/getPublicClient";
import { ToastAction } from "@/components/ui/toast";
import { getViemChain } from "@/lib/swapUtils/getViemChain";
import { handleApprovalTransaction } from "@/lib/swapUtils/handleApprovalTransaction";
import { handleTransactionReceipt } from "@/lib/swapUtils/handleTransactionReceipt";
import { MyToast } from "./MyToast";

export const SwapToken = ({ initialTokenIn }: SwapTokenProps) => {
  const [tokenIn, setTokenIn] = useState<TOKEN | null>(initialTokenIn);
  const [tokenOut, setTokenOut] = useState<TOKEN | null>(null);
  const [tokenInAmount, setTokenInAmount] = useState<number>(0);
  const [tokenOutAmount, setTokenOutAmount] = useState<number>(0);
  const [balance, setBalance] = useState<string | null>();
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [route, setRoute] = useState<Route | null>(null);
  const [fetching, setFetching] = useState<boolean>(false);
  const [processingTransaction, setProcessingTransaction] =
    useState<boolean>(false);

  const { openConnectModal } = useConnectModal();
  const { isConnected, address, chainId } = useAccount();
  const { data: signer } = useWalletClient();
  const { toast } = useToast();

  useEffect(() => {
    if (tokenIn && isConnected) {
      getBalance(chainId!, address as string, tokenIn).then((balance) => {
        setBalance(balance);
      });
    }
  }, [tokenIn, address, chainId, isConnected]);

  useEffect(() => {
    if (timer) {
      clearTimeout(timer);
    }

    if (tokenIn && tokenOut && tokenInAmount) {
      setTimer(
        setTimeout(() => {
          setFetching(true);
          getQuotes(
            chainId!,
            address as string,
            tokenIn,
            tokenOut,
            parseUnits(
              tokenInAmount.toString() as string,
              tokenIn.decimals,
            ).toString(),
          )
            .then((res) => {
              setRoute(res);
              setTokenOutAmount(
                parseFloat(
                  formatUnits(
                    BigInt(res?.toAmount ?? 0),
                    tokenOut?.decimals ?? 18,
                  ),
                ),
              );
            })
            .catch((err) => console.log(err))
            .finally(() => setFetching(false));
        }, 700),
      );
    }
  }, [tokenInAmount, tokenIn, tokenOut]);

  const handleSwap = async (route: Route, signer: WalletClient) => {
    setProcessingTransaction(true);
    try {
      const transactionData = await getRouteTransactionData(route);
      const chain = getViemChain(chainId!);

      const {
        allowanceTarget,
        approvalTokenAddress,
        minimumApprovalAmount,
        owner,
      } = transactionData?.approvalData!;

      if (transactionData?.approvalData !== null) {
        const allowanceCheckResult = await checkAllowance({
          allowanceTarget,
          approvalTokenAddress,
          minimumApprovalAmount,
          owner,
          chainId: chainId!,
        });

        const allowanceValue = allowanceCheckResult?.value!;

        if (
          transactionData?.approvalData.minimumApprovalAmount! > allowanceValue
        ) {
          toast({
            title: "Approval Required",
            description: "Please sign the approval transaction to continue",
          });

          const approvalTransactionData = await getApprovalTransactionData({
            approvalTokenAddress,
            allowanceTarget,
            minimumApprovalAmount,
            owner,
            chainId: chainId!,
          });

          let approvalTxnRes = await handleApprovalTransaction(
            approvalTransactionData!,
            signer,
            chainId!,
          );
          toast({
            title: approvalTxnRes.toastData.title!,
            description: approvalTxnRes.toastData.description!,
          });
          let txnReceiptResult = await handleTransactionReceipt(
            approvalTxnRes.transactionHash,
            "Approval",
            chainId!,
          );
          toast({
            title: txnReceiptResult?.toastData.title!,
            description: txnReceiptResult?.toastData.description!,
            action: <MyToast url={txnReceiptResult?.toastData.url!} />,
          });
        }
      }

      const publicClient = getPublicClient(chainId!);
      const gasPrice = (await publicClient.getGasPrice()) + parseGwei("10");
      const value = tokenIn?.isNative
        ? parseEther(tokenInAmount.toString())
        : BigInt(0);

      const gasEstimate = await publicClient.estimateGas({
        account: address as `0x${string}`,
        to: transactionData?.txTarget! as `0x${string}`,
        data: transactionData?.txData! as `0x${string}`,
        value,
        gasPrice: gasPrice,
      });

      toast({
        title: "Signature Required",
        description: "Please sign the transaction to continue",
      });

      const transactionHash = await signer.sendTransaction({
        account: address as `0x${string}`,
        to: transactionData?.txTarget! as `0x${string}`,
        data: transactionData?.txData! as `0x${string}`,
        value,
        gasPrice: gasPrice,
        gasLimit: gasEstimate,
        chain,
      });

      toast({
        title: "Transaction Sent",
        description: "Please wait for the transaction to be confirmed",
      });

      const swapTxnRes = await handleTransactionReceipt(
        transactionHash,
        "Swap",
        chainId!,
      );
      toast({
        title: swapTxnRes?.toastData.title!,
        description: swapTxnRes?.toastData.description!,
        action: <MyToast url={swapTxnRes?.toastData.url!} />,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Transaction Failed",
        description: "Please try again",
      });
    }
    setProcessingTransaction(false);
  };

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
          <div className="flex place-items-center justify-between mt-1">
            <div>
              {route && (
                <p className="text-xs text-gray-500 pl-2">
                  ${route?.inputValueInUsd}
                </p>
              )}
            </div>
            <div className="flex place-items-center">
              <p className="text-xs text-gray-500">
                Balance:{" "}
                {parseFloat(
                  formatUnits(BigInt(balance), tokenIn?.decimals ?? 18),
                ).toPrecision(2)}
              </p>
              <Button
                onClick={() => {
                  setTokenInAmount(
                    Number(
                      formatUnits(BigInt(balance), tokenIn?.decimals ?? 18),
                    ),
                  );
                }}
                className="h-5 p-2"
                variant="ghost"
              >
                Max
              </Button>
            </div>
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
        <div>
          {route && (
            <p className="text-xs text-gray-500 pl-2 mt-1">
              ${route?.outputValueInUsd}
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter className="text-center">
        <div className="w-full">
          {!isConnected && (
            <Button
              variant="secondary"
              className="w-full"
              onClick={() => {
                if (openConnectModal) {
                  openConnectModal();
                }
              }}
            >
              Connect Wallet
            </Button>
          )}
          {isConnected && (
            <Button
              variant={fetching ? "secondary" : "default"}
              className="w-full"
              onClick={() => {
                if (signer && route !== null) {
                  // check if the user has enough balance
                  const amount = parseUnits(
                    tokenInAmount.toString() as string,
                    tokenIn?.decimals ?? 18,
                  );
                  if (BigInt(balance!) < amount) {
                    toast({
                      duration: 5000,
                      variant: "destructive",
                      title: "Insufficient balance",
                    });
                    return;
                  }
                  handleSwap(route, signer);
                } else if (signer && route === null) {
                  toast({
                    duration: 5000,
                    variant: "destructive",
                    title: "Please enter an amount and choose tokens",
                  });
                }
              }}
              disabled={fetching || processingTransaction}
            >
              {fetching
                ? "Fetching..."
                : processingTransaction
                  ? "Processing Your Transaction..."
                  : "Swap"}
            </Button>
          )}
          {route?.totalGasFeesInUsd && (
            <div className="flex place-items-center space-x-1 mt-2 pl-2">
              <FaGasPump className="text-gray-500 text-xs" />
              <span className="text-gray-500 text-xs">
                Gas Fee: ${route?.totalGasFeesInUsd.toFixed(3)}
              </span>
            </div>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};
