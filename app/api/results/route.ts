import { NextResponse } from "next/server";

const store = (globalThis as any).__STAR_STORE__;

// ✅ SAVE RESULTS (already working)
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

// ✅ FETCH RESULTS (THIS IS WHAT WAS MISSING)
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const id = searchParams.get("id");
  const pin = searchParams.get("pin");

  let row = null;

  if (id) {
    row = store.pins.find((p: any) => p.id === id);
  }

  if (!row && pin) {
    row = store.pins.find((p: any) => p.pin === pin);
  }

  if (!row || !row.results) {
    return NextResponse.json({ results: null });
  }

  return NextResponse.json({
    results: row.results,
    pin: row.pin,
    id: row.id
  });
}
