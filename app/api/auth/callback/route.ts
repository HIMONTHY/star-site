import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "No code" }, { status: 400 });
  }

  const res = NextResponse.redirect(
    "https://star-site-psi.vercel.app/dashboard"
  );

  // TEMP session flag
  res.cookies.set("star_user", "true", {
    path: "/",
    httpOnly: false,
  });

  return res;
}
