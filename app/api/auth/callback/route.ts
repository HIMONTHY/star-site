import { NextResponse } from "next/server";

/* 👑 PUT VERIFIED DISCORD USER IDS HERE */
const VERIFIED_USERS = [
  "123456789012345678", // YOUR Discord ID
  // "987654321098765432", // add more later
];

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "No code provided" }, { status: 400 });
  }

  // ⚠️ TEMP MANUAL USER ID (REPLACE LATER WITH REAL API)
  const discordUserId = "123456789012345678"; // put your ID for now

  const res = NextResponse.redirect(
    "https://star-site-psi.vercel.app/dashboard"
  );

  // Mark logged in
  res.cookies.set("star_user", "true", { path: "/" });

  // Manual verification check
  if (VERIFIED_USERS.includes(discordUserId)) {
    res.cookies.set("discord_verified", "true", { path: "/" });
  } else {
    res.cookies.set("discord_verified", "false", { path: "/" });
  }

  return res;
}
