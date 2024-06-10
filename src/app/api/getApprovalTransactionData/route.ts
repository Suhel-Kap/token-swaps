import { BUNGEE_PUBLIC_URL } from "@/lib/constants";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const chainId = searchParams.get("chainId");
  const owner = searchParams.get("owner");
  const allowanceTarget = searchParams.get("allowanceTarget");
  const tokenAddress = searchParams.get("tokenAddress");
  const amount = searchParams.get("amount");
  try {
    if (!chainId || !owner || !allowanceTarget || !tokenAddress || !amount) {
      return Response.json({ error: "Invalid parameters", status: 400 });
    }

    const response = await fetch(
      `${BUNGEE_PUBLIC_URL}/approval/build-tx?chainID=${chainId}&owner=${owner}&allowanceTarget=${allowanceTarget}&tokenAddress=${tokenAddress}&amount=${amount}`,
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
