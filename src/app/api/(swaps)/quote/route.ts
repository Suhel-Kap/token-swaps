import { extractSearchParams } from "@/lib/api-validation/extractSearchParams";
import {
  BUNGEE_PUBLIC_URL,
  MATIC_ADDRESS_FOR_BUNGEE,
  MATIC_ADDRESS_FOR_POLYGON,
} from "@/lib/constants";
import { NextRequest } from "next/server";

export const revalidate = 10;

export async function GET(req: NextRequest) {
  let {
    fromAmount,
    fromChainId,
    fromTokenAddress,
    toChainId,
    toTokenAddress,
    userAddress,
  } = extractSearchParams(req.nextUrl.searchParams);
  try {
    if (
      !fromChainId ||
      !fromTokenAddress ||
      !toChainId ||
      !toTokenAddress ||
      !userAddress ||
      !fromAmount
    ) {
      return Response.json({ error: "Invalid parameters", status: 400 });
    }

    if (fromTokenAddress === MATIC_ADDRESS_FOR_POLYGON) {
      fromTokenAddress = MATIC_ADDRESS_FOR_BUNGEE;
    }

    if (toTokenAddress === MATIC_ADDRESS_FOR_POLYGON) {
      toTokenAddress = MATIC_ADDRESS_FOR_BUNGEE;
    }

    const response = await fetch(
      `${BUNGEE_PUBLIC_URL}/quote?fromChainId=${fromChainId}&fromTokenAddress=${fromTokenAddress}&toChainId=${toChainId}&toTokenAddress=${toTokenAddress}&userAddress=${userAddress}&fromAmount=${fromAmount}&singleTxOnly=true&sort=output&uniqueRoutesPerBridge=true`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "API-KEY": process.env.SWAP_PROVIDER_API_KEY!,
        },
      },
    );

    const data = await response.json();
    return Response.json(data, { status: response.status });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error", status: 500 });
  }
}
