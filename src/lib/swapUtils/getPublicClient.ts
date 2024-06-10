import { createPublicClient, http } from "viem";
import { polygon } from "viem/chains";
import { POLYGON_RPC_URL } from "../constants";

const polygonClient = createPublicClient({
  chain: polygon,
  transport: http(POLYGON_RPC_URL),
});

export const getPublicClient = (chainId: number) => {
  switch (chainId) {
    case 137:
      return polygonClient;
    default:
      throw new Error("Unsupported chain");
  }
};
