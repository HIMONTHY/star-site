import { NextResponse } from "next/server";

const CLIENT_ID = "1467024882171908307";
const CLIENT_SECRET = "YOUR_CLIENT_SECRET";
const REDIRECT_URI = "https://star-site-psi.vercel.app/api/auth/callback";

/* ✅ ONLY THESE DISCORD IDS CAN ACCESS */
const ALLOWED_USERS = [
  "123456789012345678", // YOUR Discord ID
  // "111111111111111111", // add more later
];

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "No code" }, { status: 400 });
  }

  // 🔁 Get access token
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

  // 👤 Get Discord user
  const userRes = await fetch("https://discord.com/api/users/@me", {
    headers: {
      Authorization: `Bearer ${tokenData.access_token}`,
    },
  });

  const user = await userRes.json();

  const res = NextResponse.redirect(
    "https://star-site-psi.vercel.app/dashboard"
  );

  // logged in cookie
  res.cookies.set("star_user", "true", { path: "/" });

  // 🔒 HARD CHECK BY DISCORD ID
  if (ALLOWED_USERS.includes(user.id)) {
    res.cookies.set("discord_verified", "true", { path: "/" });
  } else {
    res.cookies.set("discord_verified", "false", { path: "/" });
  }

  return res;
}
