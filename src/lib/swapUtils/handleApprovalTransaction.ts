import { WalletClient } from "viem";
import { TransactionData } from "../types";
import { estimateGasAndExecuteTxn } from "./estimateGasAndExecuteTxn";

export const handleApprovalTransaction = async (
  transactionData: TransactionData,
  signer: WalletClient,
  chainId: number,
) => {
  const approvalTransactionHash = await estimateGasAndExecuteTxn(
    transactionData,
    signer,
    chainId,
  );

  return {
    status: "pending",
    transactionHash: approvalTransactionHash,
    toastData: {
      title: "Approval Pending",
      description: "Transaction is pending",
    },
  };
};
