import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

const store =
  (globalThis as any).__STAR_STORE__ || { pins: [] };

(globalThis as any).__STAR_STORE__ = store;

export async function GET() {
  return NextResponse.json({ pins: store.pins });
}

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
