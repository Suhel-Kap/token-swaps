import { SUPPORTED_CHAINS } from "../constants";

export const checkIfChainIdIsSupported = (chainId: number) => {
  for (const chain of SUPPORTED_CHAINS) {
    if (chainId === chain.id) {
      return true;
    }
  }
  return false;
};
