import { MATIC_ADDRESS_FOR_POLYGON } from "@/lib/constants";
import { getPublicClient } from "@/lib/swapUtils/getPublicClient";
import { NextRequest } from "next/server";
import { erc20Abi } from "viem";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const chainId = searchParams.get("chainId");
  const owner = searchParams.get("owner");
  const tokenAddress = searchParams.get("tokenAddress");
  try {
    if (!chainId || !owner || !tokenAddress) {
      return Response.json({ error: "Invalid parameters", status: 400 });
    }

    const client = getPublicClient(parseInt(chainId));
    let balance = BigInt(0);
    const blockNumber = await client.getBlockNumber();

    if (tokenAddress === MATIC_ADDRESS_FOR_POLYGON) {
      balance = await client.getBalance({
        address: owner as `0x${string}`,
        blockNumber,
      });
    } else {
      balance = await client.readContract({
        abi: erc20Abi,
        address: tokenAddress as `0x${string}`,
        functionName: "balanceOf",
        args: [owner as `0x${string}`],
        blockNumber,
      });
    }

    console.log(balance);

    return Response.json(
      {
        balance: balance.toString(),
        owner,
        tokenAddress,
        chainId,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error", status: 500 });
  }
}
