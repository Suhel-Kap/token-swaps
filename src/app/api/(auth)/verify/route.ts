import { IRON_OPTIONS } from "@/lib/config/session";
import { IronSession } from "@/lib/types";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SiweMessage } from "siwe";

export async function POST(request: Request) {
  const session = await getIronSession<IronSession>(cookies(), IRON_OPTIONS);

  const { message, signature } = await request.json();

  const siweMessage = new SiweMessage(message);
  const { data: fields } = await siweMessage.verify({ signature });

  if (fields.nonce !== session.nonce) {
    return NextResponse.json({ message: "Invalid nonce" }, { status: 403 });
  }

  session.siwe = siweMessage;
  await session.save();

  return NextResponse.json({ message: "Session updated" }, { status: 200 });
}
