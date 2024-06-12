import { ApprovalData, TransactionData } from "../types";

export const getApprovalTransactionData = async ({
  allowanceTarget,
  approvalTokenAddress,
  owner,
  minimumApprovalAmount,
  chainId,
}: ApprovalData & {
  chainId: number;
}): Promise<TransactionData> => {
  try {
    const response = await fetch(
      `/api/getApprovalTransactionData?chainId=${chainId}&owner=${owner}&allowanceTarget=${allowanceTarget}&tokenAddress=${approvalTokenAddress}&amount=${minimumApprovalAmount}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: {
          revalidate: 10,
        },
      },
    );
    const data = await response.json();

    return data.result as TransactionData;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching approval transaction data");
  }
};
