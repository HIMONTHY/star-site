"use client";

import { useEffect, useState } from "react";

type PinRow = {
  id: string;
  pin: string;
  createdAt: string;
  hasResults: boolean;
};

export default function DashboardPage() {
  const [pins, setPins] = useState<PinRow[]>([]);
  const [loading, setLoading] = useState(false);

  async function loadPins() {
    const res = await fetch("/api/pins");
    const data = await res.json();
    setPins(data.pins || []);
  }

  async function generatePin() {
    setLoading(true);
    await fetch("/api/pins", { method: "POST" });
    setLoading(false);
    loadPins();
  }

  useEffect(() => {
    loadPins();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>

      <button
        onClick={generatePin}
        disabled={loading}
        className="rounded-xl bg-white text-black px-6 py-3 font-semibold disabled:opacity-50"
      >
        {loading ? "Generating..." : "Generate PIN"}
      </button>

      <div className="mt-10 grid gap-4">
        {pins.length === 0 && (
          <p className="text-white/60">No pins yet.</p>
        )}

        {pins.map((p) => (
          <div
            key={p.id}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 flex justify-between items-center"
          >
            <div>
              <div className="text-sm text-white/60">PIN</div>
              <div className="text-3xl font-bold tracking-widest">{p.pin}</div>
              <div className="text-xs text-white/40 mt-1">
                {new Date(p.createdAt).toLocaleString()}
              </div>
            </div>

            {p.hasResults ? (
              <span className="text-green-400">Results Ready</span>
            ) : (
              <span className="text-white/50">Waiting...</span>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
