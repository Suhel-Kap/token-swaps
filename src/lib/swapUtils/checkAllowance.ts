import { ApprovalData, CheckAllowanceResult } from "../types";

export const checkAllowance = async ({
  allowanceTarget,
  approvalTokenAddress,
  owner,
  chainId,
}: ApprovalData & {
  chainId: number;
}): Promise<CheckAllowanceResult> => {
  try {
    const response = await fetch(
      `/api/checkAllowance?chainId=${chainId}&owner=${owner}&allowanceTarget=${allowanceTarget}&tokenAddress=${approvalTokenAddress}`,
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

    return data.result as CheckAllowanceResult;
  } catch (error) {
    console.error(error);
    throw new Error("Check allowance failed");
  }
};
