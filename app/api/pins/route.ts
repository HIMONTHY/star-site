import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

type PinRow = {
  id: string;
  pin: string;
  createdAt: string;
  hasResults: boolean;
};

type Store = {
  pins: PinRow[];
};

const store: Store =
  ((globalThis as any).__STAR_STORE__ as Store) || { pins: [] };

(globalThis as any).__STAR_STORE__ = store;

// GET all pins
export async function GET() {
  return NextResponse.json({ pins: store.pins });
}

// CREATE new pin
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

// VERIFY pin (Python calls this)
export async function PUT(req: Request) {
  const body = await req.json().catch(() => ({} as any));
  const pin = String(body?.pin || "").toUpperCase().trim();

  const found = store.pins.find((p: PinRow) => p.pin === pin);

  return NextResponse.json({ ok: !!found });
}
