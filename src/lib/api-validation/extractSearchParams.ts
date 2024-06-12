import { Address, isAddress } from "viem";
import { SearchParams } from "../types";

const getAddressOrUndefined = (address: string | null): Address | undefined => {
  if (address) {
    return isAddress(address) ? address : undefined;
  }
  return undefined;
};

const getNumberOrUndefined = (number: string | null): number | undefined => {
  if (number) {
    return isNaN(Number(number)) ? undefined : Number(number);
  }
  return undefined;
};

const getAmountStringOrUndefined = (
  amount: string | null,
): string | undefined => {
  try {
    if (amount) {
      BigInt(amount);
      return amount;
    }
  } catch (error) {
    return undefined;
  }
  return undefined;
};

export const extractSearchParams = (params: URLSearchParams): SearchParams => {
  const chainId = getNumberOrUndefined(params.get("chainId"));
  const owner = getAddressOrUndefined(params.get("owner"));
  const allowanceTarget = getAddressOrUndefined(params.get("allowanceTarget"));
  const tokenAddress = getAddressOrUndefined(params.get("tokenAddress"));
  const amount = getAmountStringOrUndefined(params.get("amount"));
  const fromChainId = getNumberOrUndefined(params.get("fromChainId"));
  const toChainId = getNumberOrUndefined(params.get("toChainId"));
  const fromTokenAddress = getAddressOrUndefined(
    params.get("fromTokenAddress"),
  );
  const toTokenAddress = getAddressOrUndefined(params.get("toTokenAddress"));
  const userAddress = getAddressOrUndefined(params.get("userAddress"));
  const fromAmount = getAmountStringOrUndefined(params.get("fromAmount"));

  return {
    chainId,
    owner,
    allowanceTarget,
    tokenAddress,
    amount,
    fromChainId,
    toChainId,
    fromTokenAddress,
    toTokenAddress,
    userAddress,
    fromAmount,
  };
};
