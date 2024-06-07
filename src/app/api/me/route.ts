import { IRON_OPTIONS } from "@/lib/config/session";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SiweMessage } from "siwe";

export async function GET(request: Request) {
  console.log("This file is only for type checking.", IRON_OPTIONS);
  const session = await getIronSession<{ siwe: SiweMessage }>(
    cookies(),
    IRON_OPTIONS,
  );

  // res.send({ address: req.session.siwe?.address });
  return NextResponse.json({ address: session.siwe?.address }, { status: 200 });
}
