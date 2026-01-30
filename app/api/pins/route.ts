import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

type PinRow = {
  id: string;
  pin: string;
  createdAt: string;
  hasResults: boolean;
};

const store = (globalThis as any).__STAR_STORE__ || { pins: [] as PinRow[] };
(globalThis as any).__STAR_STORE__ = store;

// LIST PINS (Dashboard uses this)
export async function GET() {
  return NextResponse.json({ pins: store.pins });
}

// CREATE PIN (Dashboard uses this)
export async function POST() {
  const pin = nanoid(6).toUpperCase();

  const row: PinRow = {
    id: nanoid(10),
    pin,
    createdAt: new Date().toISOString(),
    hasResults: false,
  };

  store.pins.unshift(row);

  return NextResponse.json({ pin });
}

// VERIFY PIN (Python uses this)
export async function PUT(req: Request) {
  const body = await req.json().catch(() => ({}));
  const pin = String(body?.pin || "").toUpperCase().trim();

  const found = store.pins.find((p) => p.pin === pin);

  return NextResponse.json({ ok: !!found });
}
