import { NextResponse } from "next/server";

// Ensure this matches your initialization in your main file
const store = (globalThis as any).__STAR_STORE__ || { pins: [] };

export async function POST(req: Request) {
  try {
    const { pin, results } = await req.json();

    if (!pin || !results) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    const row = store.pins.find((p: any) => p.pin === pin);

    if (!row) {
      return NextResponse.json({ error: "Invalid PIN" }, { status: 404 });
    }

    // Force update the record
    row.hasResults = true;
    row.results = results; // Next.js UI will now see results.cheatScan, etc.

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const pin = searchParams.get("pin");

  let row = store.pins.find((p: any) => p.id === id || p.pin === pin);

  if (!row || !row.results) {
    return NextResponse.json({ results: null });
  }

  return NextResponse.json({
    results: row.results,
    pin: row.pin,
    id: row.id
  });
}
