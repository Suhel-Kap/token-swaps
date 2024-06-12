import { extractSearchParams } from "@/lib/api-validation/extractSearchParams";
import { BUNGEE_PUBLIC_URL } from "@/lib/constants";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { chainId, owner, allowanceTarget, tokenAddress } = extractSearchParams(
    req.nextUrl.searchParams,
  );

  try {
    if (!chainId || !owner || !allowanceTarget || !tokenAddress) {
      return Response.json({ error: "Invalid parameters", status: 400 });
    }

    const response = await fetch(
      `${BUNGEE_PUBLIC_URL}/approval/check-allowance?chainID=${chainId}&owner=${owner}&allowanceTarget=${allowanceTarget}&tokenAddress=${tokenAddress}`,
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
