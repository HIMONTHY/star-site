import { NextResponse } from "next/server";

/* 🔐 ADMIN DISCORD IDS (ONLY YOU) */
const ADMIN_IDS = [
  "1165819222870466583", // your Discord ID
];

export async function POST(req: Request) {

  const { adminId, targetDiscordId } = await req.json();

  if (!ADMIN_IDS.includes(adminId)) {
    return NextResponse.json(
      { error: "Not authorized" },
      { status: 403 }
    );
  }

  const globalAny = globalThis as any;
  globalAny.hwidStore = globalAny.hwidStore || {};
  const hwidStore = globalAny.hwidStore as Record<string, string>;

  if (!hwidStore[targetDiscordId]) {
    return NextResponse.json({
      status: "none",
      message: "No HWID bound to user",
    });
  }

  delete hwidStore[targetDiscordId];

  return NextResponse.json({
    status: "reset",
    message: "HWID successfully reset",
  });
}
