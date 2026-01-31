import { NextResponse } from "next/server";

export async function GET() {
  const params = new URLSearchParams({
    client_id: "1467024882171908307",
    response_type: "code",
    redirect_uri: "https://star-site-psi.vercel.app/api/auth/callback",
    scope: "identify email",
  });

  return NextResponse.redirect(
    `https://discord.com/oauth2/authorize?${params.toString()}`
  );
}
