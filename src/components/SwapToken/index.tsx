"use client";

import { useEffect, useState } from "react";
import { FaArrowDownLong, FaGasPump } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Route, SwapTokenProps, TOKEN, TransactionData } from "@/lib/types";
import { TokenInput } from "./TokenInput";
import { useAccount, useWalletClient } from "wagmi";
import { getBalance } from "@/lib/swapUtils/getBalance";
import {
  WalletClient,
  formatUnits,
  parseEther,
  parseUnits,
  zeroAddress,
} from "viem";
import { useChainModal, useConnectModal } from "@rainbow-me/rainbowkit";
import { getQuotes } from "@/lib/swapUtils/getQuotes";
import { useToast } from "@/components/ui/use-toast";
import { getRouteTransactionData } from "@/lib/swapUtils/getRouteTransactionData";
import { checkAllowance } from "@/lib/swapUtils/checkAllowance";
import { getApprovalTransactionData } from "@/lib/swapUtils/getApprovalTransactionData";
import { handleApprovalTransaction } from "@/lib/swapUtils/handleApprovalTransaction";
import { handleTransactionReceipt } from "@/lib/swapUtils/handleTransactionReceipt";
import { ToastActionWrapper } from "./ToastActionWrapper";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { estimateGasAndExecuteTxn } from "@/lib/swapUtils/estimateGasAndExecuteTxn";
import { checkIfChainIdIsSupported } from "@/lib/swapUtils/checkIfChainIdIsSupported";

export const SwapToken = ({
  initialTokenIn,
  className,
  isModal,
}: SwapTokenProps) => {
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
  const [isChainSupported, setIsChainSupported] = useState<boolean>(true);

  const { openConnectModal } = useConnectModal();
  const { openChainModal } = useChainModal();
  const { isConnected, address, chainId } = useAccount();
  const { data: signer } = useWalletClient();
  const { toast } = useToast();
  const router = useRouter();

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
            chainId ?? 137,
            (address as string) ?? zeroAddress,
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

  useEffect(() => {
    setIsChainSupported(checkIfChainIdIsSupported(chainId!));
  }, [chainId]);

  const handleSetMax = () => {
    setTokenInAmount(
      Number(formatUnits(BigInt(balance!), tokenIn?.decimals ?? 18)),
    );
  };

  const swapTokenInWithTokenOut = () => {
    setTokenIn(tokenOut);
    setTokenOut(tokenIn);
    setTokenInAmount(tokenOutAmount);
    setTokenOutAmount(tokenInAmount);
  };

  const handleConnectWallet = () => {
    if (openConnectModal) {
      if (isModal) {
        router.back();
      }
      openConnectModal();
    }
  };

  const handleChainModal = () => {
    if (openChainModal) {
      if (isModal) {
        router.back();
      }
      openChainModal();
    }
  };

  const handleSwap = async (route: Route, signer: WalletClient) => {
    setProcessingTransaction(true);
    try {
      const transactionData = await getRouteTransactionData(route);

      if (transactionData?.approvalData !== null) {
        const {
          allowanceTarget,
          approvalTokenAddress,
          minimumApprovalAmount,
          owner,
        } = transactionData?.approvalData!;
        const allowanceCheckResult = await checkAllowance({
          allowanceTarget,
          approvalTokenAddress,
          minimumApprovalAmount,
          owner,
          chainId: chainId!,
        });

        const allowanceValue = allowanceCheckResult.value;

        if (
          transactionData.approvalData.minimumApprovalAmount > allowanceValue
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
            approvalTransactionData,
            signer,
            chainId!,
          );
          toast({
            title: approvalTxnRes.toastData.title,
            description: approvalTxnRes.toastData.description,
          });
          let txnReceiptResult = await handleTransactionReceipt(
            approvalTxnRes.transactionHash,
            "Approval",
            chainId!,
          );
          toast({
            title: txnReceiptResult?.toastData.title!,
            description: txnReceiptResult?.toastData.description!,
            action: (
              <ToastActionWrapper url={txnReceiptResult?.toastData.url!} />
            ),
          });
          if (txnReceiptResult?.status === "reverted") {
            throw new Error("Approval transaction reverted");
          }
        }
      }

      toast({
        title: "Signature Required",
        description: "Please sign the transaction to continue",
      });

      const value = tokenIn?.isNative
        ? parseEther(tokenInAmount.toString())
        : BigInt(0);

      const transactionHash = await estimateGasAndExecuteTxn(
        {
          to: transactionData?.txTarget!,
          data: transactionData?.txData!,
          value: value.toString(),
        } as TransactionData,
        signer,
        chainId!,
      );

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
        action: <ToastActionWrapper url={swapTxnRes?.toastData.url!} />,
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

  const handlePressSwap = () => {
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
  };

  return (
    <Card className={cn("max-w-lg w-[385px] mx-auto", className ?? "")}>
      <CardContent className="mt-4">
        <TokenInput
          label="Sell"
          token={tokenIn}
          setToken={setTokenIn}
          amount={tokenInAmount}
          setAmount={setTokenInAmount}
          excludeToken={tokenOut}
        />
        <div className="flex place-items-center justify-between mt-1">
          <div>
            {route && (
              <p className="text-xs text-gray-500 pl-2">
                ${route?.inputValueInUsd}
              </p>
            )}
          </div>
          {balance && (
            <div className="flex place-items-center">
              <p className="text-xs text-gray-500">
                Balance:{" "}
                {parseFloat(
                  formatUnits(BigInt(balance), tokenIn?.decimals ?? 18),
                ).toPrecision(2)}
              </p>
              <Button
                onClick={handleSetMax}
                className="h-5 p-2"
                variant="ghost"
              >
                Max
              </Button>
            </div>
          )}
        </div>
        <div className="flex justify-center relative mt-10 mb-6">
          <Separator />
          <Button
            onClick={swapTokenInWithTokenOut}
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
              onClick={handleConnectWallet}
            >
              Connect Wallet
            </Button>
          )}
          {!isChainSupported && isConnected && (
            <Button
              variant="destructive"
              className="w-full"
              onClick={handleChainModal}
            >
              Wrong Network
            </Button>
          )}
          {isConnected && isChainSupported && (
            <Button
              variant={fetching ? "secondary" : "default"}
              className="w-full"
              onClick={handlePressSwap}
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
