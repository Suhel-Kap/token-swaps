import { WalletClient, parseGwei } from "viem";
import { TransactionData } from "../types";
import { getViemChain } from "./getViemChain";
import { getPublicClient } from "./getPublicClient";

export const handleApprovalTransaction = async (
  transactionData: TransactionData,
  signer: WalletClient,
  chainId: number,
) => {
  const publicClient = getPublicClient(chainId);
  const gasPrice = (await publicClient.getGasPrice()) + parseGwei("10");
  const address = signer.account?.address;

  const gasEstimate = await publicClient.estimateGas({
    account: address as `0x${string}`,
    to: transactionData.to as `0x${string}`,
    data: transactionData.data as `0x${string}`,
    value: BigInt(0),
    gasPrice: gasPrice,
  });

  const approvalTransactionHash = await signer.sendTransaction({
    account: address as `0x${string}`,
    to: transactionData.to as `0x${string}`,
    data: transactionData.data as `0x${string}`,
    value: BigInt(0),
    gasPrice: gasPrice,
    gasLimit: gasEstimate,
    chain: getViemChain(chainId!),
  });

  return {
    status: "pending",
    transactionHash: approvalTransactionHash,
    toastData: {
      title: "Approval Pending",
      description: "Transaction is pending",
    },
  };
};
