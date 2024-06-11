import { Address, TransactionReceipt } from "viem";
import { getPublicClient } from "./getPublicClient";
import { getViemChain } from "./getViemChain";

export const handleTransactionReceipt = async (
  transactionHash: string,
  title: string,
  chainId: number | undefined,
) => {
  const publicClient = getPublicClient(chainId!);
  let transactionReceipt: TransactionReceipt | null = null;

  while (transactionReceipt === null) {
    transactionReceipt = await publicClient.waitForTransactionReceipt({
      hash: transactionHash as Address,
    });

    if (transactionReceipt.status === "success") {
      return {
        status: "success",
        transactionReceipt,
        toastData: {
          title: `${title} Confirmed`,
          description: "Transaction was successful",
          url: `${getViemChain(chainId!)?.blockExplorers?.default?.url}/tx/${transactionReceipt?.transactionHash!}`,
        },
      };
    } else if (transactionReceipt.status === "reverted") {
      return {
        status: "reverted",
        transactionReceipt,
        toastData: {
          title: `${title} Reverted`,
          description: "Transaction was reverted",
        },
      };
    }
  }
};
