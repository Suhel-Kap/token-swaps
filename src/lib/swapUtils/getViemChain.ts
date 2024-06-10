import { polygon } from "viem/chains";

export const getViemChain = (chainId: number) => {
  switch (chainId) {
    case 137:
      return polygon;
    default:
      throw new Error("Unsupported chain");
  }
};
