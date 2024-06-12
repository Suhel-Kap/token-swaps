import { IRON_OPTIONS } from "@/lib/config/session";
import { IronSession } from "@/lib/types";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getIronSession<IronSession>(cookies(), IRON_OPTIONS);

  session.destroy();

  return NextResponse.json({ status: 200 });
}
