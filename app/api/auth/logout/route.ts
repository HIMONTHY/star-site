import { NextResponse } from "next/server";

export async function GET() {
  const res = NextResponse.redirect(
    "https://star-site-psi.vercel.app/"
  );

  res.cookies.set("star_user", "", {
    path: "/",
    expires: new Date(0),
  });

  return res;
}
