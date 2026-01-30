import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

const store =
  (globalThis as any).__STAR_STORE__ || { pins: [] };

(globalThis as any).__STAR_STORE__ = store;


// GET all pins
export async function GET() {
  return NextResponse.json({ pins: store.pins });
}


// CREATE new pin
export async function POST() {
  const pin = nanoid(6).toUpperCase();

  const row = {
    id: nanoid(10),
    pin,
    createdAt: new Date().toISOString(),
    hasResults: false,
  };

  store.pins.unshift(row);

  return NextResponse.json({ pin });
}


// VERIFY pin
export async function PUT(req: Request) {
  const body = await req.json();
  const pin = String(body?.pin || "");

  const found = store.pins.find(
    (p: any) => p.pin === pin
  );

  return NextResponse.json({
    ok: !!found
  });
}
