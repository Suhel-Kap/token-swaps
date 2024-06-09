import { MATIC_ADDRESS_FOR_POLYGON } from "@/lib/constants";
import { NextRequest } from "next/server";
import { createPublicClient, erc20Abi, http } from "viem";
import { polygon } from "viem/chains";

const polygonClient = createPublicClient({
  chain: polygon,
  transport: http(),
});

const getClient = (chainId: number) => {
  switch (chainId) {
    case 137:
      return polygonClient;
    default:
      throw new Error("Unsupported chain");
  }
};

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const chainId = searchParams.get("chainId");
    const owner = searchParams.get("owner");
    const tokenAddress = searchParams.get("tokenAddress");

    if (!chainId || !owner || !tokenAddress) {
      return Response.json({ error: "Invalid parameters", status: 400 });
    }

    const client = getClient(parseInt(chainId));
    let balance = BigInt(0);
    if (tokenAddress === MATIC_ADDRESS_FOR_POLYGON) {
      balance = await client.getBalance({
        address: owner as `0x${string}`,
      });
    } else {
      balance = await client.readContract({
        abi: erc20Abi,
        address: tokenAddress as `0x${string}`,
        functionName: "balanceOf",
        args: [owner as `0x${string}`],
      });
    }

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
