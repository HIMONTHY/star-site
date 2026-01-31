import { NextResponse } from "next/server";

export async function GET() {
  const globalAny = globalThis as any;
  globalAny.hwidStore = globalAny.hwidStore || {};
  const hwidStore = globalAny.hwidStore as Record<string, string>;

  const rows = Object.entries(hwidStore).map(([discordId, hwid]) => ({
    discordId,
    hwid,
  }));

  return NextResponse.json({ rows });
}
