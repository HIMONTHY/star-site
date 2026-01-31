import { NextResponse } from "next/server";

const CLIENT_ID = "1467024882171908307";
const CLIENT_SECRET = "T4eTyKR_MN-6VaH8Q2RiGuilp1EmBfVU"; // from Discord Dev Portal
const REDIRECT_URI = "https://star-site-psi.vercel.app/api/auth/callback";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "No code provided" }, { status: 400 });
  }

  // 🔁 Exchange code for access token
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

  const accessToken = tokenData.access_token;

  // 👤 Fetch Discord user info
  const userRes = await fetch("https://discord.com/api/users/@me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const user = await userRes.json();

  /*
    user.verified === true means email verified
    user.id is Discord ID
  */

  const res = NextResponse.redirect(
    "https://star-site-psi.vercel.app/dashboard"
  );

  // Logged in
  res.cookies.set("star_user", "true", { path: "/" });

  // REAL verification check
  if (user.verified === true) {
    res.cookies.set("discord_verified", "true", { path: "/" });
  } else {
    res.cookies.set("discord_verified", "false", { path: "/" });
  }

  return res;
}
