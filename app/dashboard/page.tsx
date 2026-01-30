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

  useEffect(() => {
    loadPins();
    const t = setInterval(loadPins, 4000);
    return () => clearInterval(t);
  }, []);

  const stats = useMemo(() => {
    const total = pins.length;
    const finished = pins.filter(p => p.hasResults).length;
    const pending = total - finished;
    return { total, pending, finished };
  }, [pins]);

  return (
    <main className="min-h-screen bg-black text-white">

      {/* TOP BAR */}
      <div className="border-b border-white/10 bg-black/60 backdrop-blur">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div className="text-lg font-semibold">Star</div>

          <div className="flex items-center gap-3">
            <button className="rounded-xl bg-white/10 px-4 py-2 border border-white/15">
              Dashboard
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8 grid gap-6 md:grid-cols-[220px_1fr]">

        {/* SIDEBAR */}
        <aside className="rounded-2xl border border-white/10 bg-white/5 p-4 h-fit">
          <SidebarItem label="Dashboard" active />
          <SidebarItem label="My Pins" />
        </aside>

        {/* MAIN */}
        <section>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">My Pins</h1>
              <p className="mt-1 text-white/60">
                View and manage your scan pins and results.
              </p>
            </div>

            <button
              onClick={generatePin}
              disabled={loading}
              className="rounded-xl bg-emerald-500 px-5 py-2 font-semibold text-black hover:opacity-90 disabled:opacity-50"
            >
              + Create Pin
            </button>
          </div>

          {/* STATS */}
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <Stat label="Total Pins" value={stats.total} />
            <Stat label="Pending" value={stats.pending} />
            <Stat label="Finished" value={stats.finished} />
          </div>

          {/* TABLE */}
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">

            <div className="flex items-center justify-between mb-4">
              <input
                placeholder="Search by pin..."
                className="rounded-xl bg-black/40 border border-white/10 px-4 py-2 text-sm outline-none"
              />

              <button
                onClick={loadPins}
                className="text-sm text-white/60 hover:text-white"
              >
                Refresh
              </button>
            </div>

            {pins.length === 0 ? (
              <div className="py-12 text-center text-white/60">
                No pins yet.
              </div>
            ) : (
              <div className="space-y-3">
                {pins.map(p => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between rounded-xl border border-white/10 bg-black/40 px-4 py-3"
                  >
                    <div className="font-mono tracking-widest text-lg">
                      {p.pin}
                    </div>

                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-white/50">
                        {new Date(p.createdAt).toLocaleTimeString()}
                      </span>

                      {p.hasResults ? (
                        <span className="text-emerald-400">Finished</span>
                      ) : (
                        <span className="text-white/60">Pending</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

function SidebarItem({ label, active }: { label: string; active?: boolean }) {
  return (
    <div
      className={[
        "mb-2 rounded-xl px-4 py-3 font-semibold cursor-pointer border transition",
        active
          ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-300"
          : "bg-transparent border-white/10 text-white/70 hover:bg-white/5"
      ].join(" ")}
    >
      {label}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="text-sm text-white/60">{label}</div>
      <div className="mt-1 text-2xl font-bold">{value}</div>
    </div>
  );
}
