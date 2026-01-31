import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "No code provided" }, { status: 400 });
  }

  // Later you can exchange this for a token
  // For now just confirm login worked

  return NextResponse.redirect("https://star-site-psi.vercel.app/dashboard");
}
