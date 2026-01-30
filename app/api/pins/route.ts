import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

type PinRow = {
  id: string;
  pin: string;
  createdAt: string;
  expiresAt: string;   // ✅ new
  hasResults: boolean;
};

type Store = { pins: PinRow[] };

const store: Store =
  ((globalThis as any).__STAR_STORE__ as Store) || { pins: [] };
(globalThis as any).__STAR_STORE__ = store;

const TTL_MS = 2 * 60 * 1000; // ✅ 2 minutes

function purgeExpired() {
  const now = Date.now();
  store.pins = store.pins.filter((p) => Date.parse(p.expiresAt) > now);
}

// GET all pins (Dashboard uses this)
export async function GET() {
  purgeExpired();
  return NextResponse.json({ pins: store.pins });
}

// CREATE new pin (Dashboard uses this)
export async function POST() {
  purgeExpired();

  const pin = nanoid(6).toUpperCase();
  const now = Date.now();

  const row: PinRow = {
    id: nanoid(10),
    pin,
    createdAt: new Date(now).toISOString(),
    expiresAt: new Date(now + TTL_MS).toISOString(), // ✅ expires in 2 mins
    hasResults: false,
  };

  store.pins.unshift(row);
  return NextResponse.json({ pin, expiresAt: row.expiresAt });
}

// VERIFY pin (Python uses this)
export async function PUT(req: Request) {
  purgeExpired();

  const body = await req.json().catch(() => ({} as any));
  const pin = String(body?.pin || "").toUpperCase().trim();

  const found = store.pins.find((p) => p.pin === pin);
  return NextResponse.json({ ok: !!found });
}
