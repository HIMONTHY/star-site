import { NextResponse } from "next/server";

const store = (globalThis as any).__STAR_STORE__;

export async function POST(req: Request) {
  const { pin, results } = await req.json();

  if (!pin || !results) {
    return NextResponse.json({ error: "Missing data" }, { status: 400 });
  }

  const row = store.pins.find((p: any) => p.pin === pin);

  if (!row) {
    return NextResponse.json({ error: "Invalid PIN" }, { status: 404 });
  }

  row.hasResults = true;
  row.results = results;

  return NextResponse.json({ success: true });
}

