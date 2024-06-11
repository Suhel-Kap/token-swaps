import { IRON_OPTIONS } from "@/lib/config/session";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SiweMessage } from "siwe";

export async function GET(request: Request) {
  const session = await getIronSession<{ siwe: SiweMessage }>(
    cookies(),
    IRON_OPTIONS,
  );

  return NextResponse.json({ address: session.siwe?.address }, { status: 200 });
}
