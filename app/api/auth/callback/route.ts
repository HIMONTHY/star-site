import { NextResponse } from "next/server";

const CLIENT_ID = "1467024882171908307";
const CLIENT_SECRET = "T4eTyKR_MN-6VaH8Q2RiGuilp1EmBfVU"; // move to env later
const REDIRECT_URI = "https://star-site-psi.vercel.app/api/auth/callback";

/* 🔐 ONLY THESE USERS CAN ACCESS */
const ALLOWED_USERS = [
  "1165819222870466583", // fake for testing
  // add real ones later
];

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "No code" }, { status: 400 });
  }

  // 🔁 Exchange code for token
  const tokenRes = await fetch("https://discord.com/api/oauth2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: "authorization_code",
      code,
      redirect_uri: REDIRECT_URI,
    }),
  });

  const tokenData = await tokenRes.json();

  // 👤 Fetch Discord user
  const userRes = await fetch("https://discord.com/api/users/@me", {
    headers: {
      Authorization: `Bearer ${tokenData.access_token}`,
    },
  });

  const user = await userRes.json();

  // 🔒 HARD WHITELIST (ONLY HERE DO WE SET COOKIES)
  if (ALLOWED_USERS.includes(user.id)) {

    /* 🔐 HWID LAYER (ADDED - NOTHING ELSE CHANGED) */

    const hwid =
      req.headers.get("x-hwid") || searchParams.get("hwid");

    if (!hwid) {
      return NextResponse.redirect(
        "https://star-site-psi.vercel.app/dashboard"
      );
    }

    // simple in-memory HWID store (upgrade to DB later)
    const globalAny = globalThis as any;
    globalAny.hwidStore = globalAny.hwidStore || {};
    const hwidStore = globalAny.hwidStore as Record<string, string>;

    // First-time bind
    if (!hwidStore[user.id]) {
      hwidStore[user.id] = hwid;
    }

    // Block if HWID does not match
    if (hwidStore[user.id] !== hwid) {
      return NextResponse.redirect(
        "https://star-site-psi.vercel.app/access-denied"
      );
    }

    /* ✅ YOUR ORIGINAL CODE CONTINUES */

    const res = NextResponse.redirect(
      "https://star-site-psi.vercel.app/dashboard"
    );

    res.cookies.set("star_user", "true", { path: "/" });
    res.cookies.set("discord_verified", "true", { path: "/" });

    return res;

  } else {

    const res = NextResponse.redirect(
      "https://star-site-psi.vercel.app/access-denied"
    );

    // ❌ DO NOT LOG THEM IN
    res.cookies.set("star_user", "false", { path: "/" });
    res.cookies.set("discord_verified", "false", { path: "/" });

    return res;
  }
}
