import { IRON_OPTIONS } from "@/lib/config/session";
import { BUNGEE_PUBLIC_URL } from "@/lib/constants";
import { Route } from "@/lib/types";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { SiweMessage } from "siwe";
import { Address, isAddressEqual } from "viem";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as { route: Route };

    // body should contain an object {route: route}
    if (!body.route) {
      return Response.json({ error: "Invalid parameters", status: 400 });
    }

    const session = await getIronSession<{ siwe: SiweMessage }>(
      cookies(),
      IRON_OPTIONS,
    );

    if (
      isAddressEqual(
        session.siwe?.address as Address,
        body.route.sender as Address,
      )
    ) {
      return Response.json({ error: "Unauthorized", status: 401 });
    }

    const response = await fetch(`${BUNGEE_PUBLIC_URL}/build-tx`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "API-KEY": process.env.SWAP_PROVIDER_API_KEY!,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return Response.json(data, { status: response.status });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error", status: 500 });
  }
}
