import { Address, WalletClient, parseGwei } from "viem";
import { TransactionData } from "../types";
import { getPublicClient } from "./getPublicClient";
import { getViemChain } from "./getViemChain";

export const estimateGasAndExecuteTxn = async (
  transactionData: TransactionData,
  signer: WalletClient,
  chainId: number,
) => {
  const publicClient = getPublicClient(chainId);
  const gasPrice = (await publicClient.getGasPrice()) + parseGwei("5");
  const address = signer.account?.address;

  const gasEstimate = await publicClient.estimateGas({
    account: address as Address,
    to: transactionData.to as Address,
    data: transactionData.data as Address,
    value: BigInt(0),
    gasPrice: gasPrice,
  });

  const txnHash = await signer.sendTransaction({
    account: address as Address,
    to: transactionData.to as Address,
    data: transactionData.data as Address,
    value: BigInt(0),
    gasPrice: gasPrice,
    gasLimit: gasEstimate,
    chain: getViemChain(chainId!),
  });

  return txnHash;
};
