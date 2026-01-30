"use client";

import { useEffect, useMemo, useState } from "react";

type PinRow = {
  id: string;
  pin: string;
  createdAt: string;
  hasResults: boolean;
};

export default function DashboardPage() {
  const [pins, setPins] = useState<PinRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  async function loadPins() {
    const res = await fetch("/api/pins", { cache: "no-store" });
    const data = await res.json();
    setPins(data.pins || []);
  }

  async function generatePin() {
    setLoading(true);
    await fetch("/api/pins", { method: "POST" });
    setLoading(false);
    loadPins();
  }

  async function copy(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setToast("Copied PIN ✅");
      setTimeout(() => setToast(null), 1200);
    } catch {
      setToast("Copy failed ❌");
      setTimeout(() => setToast(null), 1200);
    }
  }

  // Initial load + auto refresh
  useEffect(() => {
    loadPins();
    const t = setInterval(loadPins, 4000);
    return () => clearInterval(t);
  }, []);

  const stats = useMemo(() => {
    const total = pins.length;
    const ready = pins.filter((p) => p.hasResults).length;
    const waiting = total - ready;
    return { total, ready, waiting };
  }, [pins]);

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Top glow */}
      <div className="pointer-events-none fixed inset-x-0 top-[-120px] mx-auto h-[300px] max-w-5xl rounded-full bg-white/10 blur-3xl" />

      <div className="mx-auto max-w-5xl px-6 py-10">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Dashboard
            </h1>
            <p className="mt-3 text-white/60 max-w-xl">
              Generate a PIN, give it to the person being checked. Results appear
              when the scan finishes.
            </p>
          </div>

          <button
            onClick={generatePin}
            disabled={loading}
            className="rounded-2xl bg-white text-black px-6 py-3 font-semibold hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Generating..." : "Generate PIN"}
          </button>
        </div>

        {/* Stats */}
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <StatCard label="Total Pins" value={stats.total} />
          <StatCard label="Waiting" value={stats.waiting} />
          <StatCard label="Results Ready" value={stats.ready} />
        </div>

        {/* Pins list */}
        <div className="mt-10">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Recent Pins</h2>
            <span className="text-sm text-white/50">
              Auto-refresh: every 4s
            </span>
          </div>

          <div className="mt-4 grid gap-4">
            {pins.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white/60">
                No pins yet. Click <span className="text-white">Generate PIN</span>.
              </div>
            ) : (
              pins.map((p) => (
                <div
                  key={p.id}
                  className="group rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-6 transition hover:border-white/20 hover:from-white/15"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <div className="text-xs tracking-widest text-white/50">
                        PIN
                      </div>

                      <div className="mt-1 flex items-center gap-3">
                        <div className="text-3xl md:text-4xl font-bold tracking-[0.18em]">
                          {p.pin}
                        </div>

                        <StatusPill ready={p.hasResults} />
                      </div>

                      <div className="mt-2 text-xs text-white/45">
                        {new Date(p.createdAt).toLocaleString()}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => copy(p.pin)}
                        className="rounded-xl bg-white/10 px-4 py-2 hover:bg-white/15"
                      >
                        Copy
                      </button>

                      {p.hasResults ? (
                        <a
                          href={`/dashboard/results?pin=${encodeURIComponent(
                            p.pin
                          )}`}
                          className="rounded-xl bg-white px-4 py-2 text-black font-semibold hover:opacity-90"
                        >
                          View Results →
                        </a>
                      ) : (
                        <span className="text-white/50">Waiting…</span>
                      )}
                    </div>
                  </div>

                  {/* subtle divider row */}
                  <div className="mt-5 h-px w-full bg-white/10 opacity-0 transition group-hover:opacity-100" />
                  <div className="mt-4 text-sm text-white/60">
                    Share this PIN with the user being checked.
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Toast */}
        {toast && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 rounded-2xl border border-white/10 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur">
            {toast}
          </div>
        )}
      </div>
    </main>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="text-sm text-white/60">{label}</div>
      <div className="mt-2 text-3xl font-bold">{value}</div>
    </div>
  );
}

function StatusPill({ ready }: { ready: boolean }) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold border",
        ready
          ? "bg-green-500/10 text-green-300 border-green-500/20"
          : "bg-white/5 text-white/60 border-white/10",
      ].join(" ")}
    >
      {ready ? "Results Ready" : "Pending"}
    </span>
  );
}
