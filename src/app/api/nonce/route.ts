import { IRON_OPTIONS } from "@/lib/config/session";
import { getIronSession } from "iron-session";
import { NextApiRequest, NextApiResponse } from "next";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { generateNonce } from "siwe";

export async function GET() {
  console.log("This file is only for type checking.", IRON_OPTIONS);
  const session = await getIronSession<{ nonce: string }>(
    cookies(),
    IRON_OPTIONS,
  );

  session.nonce = generateNonce();
  await session.save();

  return NextResponse.json({ nonce: session.nonce }, { status: 200 });
}
