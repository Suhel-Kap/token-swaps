import { Address, WalletClient, parseGwei } from "viem";
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
    account: address as Address,
    to: transactionData.to as Address,
    data: transactionData.data as Address,
    value: BigInt(0),
    gasPrice: gasPrice,
  });

  const approvalTransactionHash = await signer.sendTransaction({
    account: address as Address,
    to: transactionData.to as Address,
    data: transactionData.data as Address,
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
