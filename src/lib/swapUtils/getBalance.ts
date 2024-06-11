import { Address, erc20Abi } from "viem";
import { MATIC_ADDRESS_FOR_POLYGON } from "../constants";
import { TOKEN } from "../types";
import { getPublicClient } from "./getPublicClient";

export const getBalance = async (
  chainId: number,
  address: string,
  token: TOKEN,
): Promise<string> => {
  try {
    const client = getPublicClient(chainId);
    let balance = BigInt(0);
    const blockNumber = await client.getBlockNumber();

    if (token.tokenAddress === MATIC_ADDRESS_FOR_POLYGON) {
      balance = await client.getBalance({
        address: address as Address,
        blockNumber,
      });
    } else {
      balance = await client.readContract({
        abi: erc20Abi,
        address: token.tokenAddress as Address,
        functionName: "balanceOf",
        args: [address as Address],
        blockNumber,
      });
    }

    console.log(balance);
    return balance.toString();
  } catch (error) {
    console.error(error);
    return "0";
  }
};
