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
  const [latest, setLatest] = useState<PinRow | null>(null);

  async function loadPins() {
    const res = await fetch("/api/pins", { cache: "no-store" });
    const data = await res.json();
    const list = data.pins || [];
    setPins(list);
    setLatest(list[0] || null);
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
    } catch {}
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
    <main className="min-h-screen bg-[#0a0d11] text-white">

      {/* TOP NAV */}
      <div className="border-b border-white/10 bg-black/60 backdrop-blur">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div className="text-lg font-semibold">Star</div>

          <div className="flex items-center gap-6 text-sm text-white/70">
            <a href="/">Home</a>
            <a href="#">Features</a>
            <a href="#">Terms</a>
            <a href="#">Privacy</a>

            <button className="rounded-xl bg-white/10 px-4 py-2 border border-white/15">
              Dashboard
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8 grid gap-6 md:grid-cols-[230px_1fr]">

        {/* SIDEBAR */}
        <aside className="rounded-2xl border border-white/10 bg-[#0f141b] p-4 h-fit">
          <SidebarItem label="Dashboard" active />
          <SidebarItem label="My Pins" />
        </aside>

        {/* MAIN */}
        <section>

          <div className="flex items-center justify-between flex-wrap gap-4">
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

          {/* LATEST PIN BOX */}
          {latest && (
            <div className="mt-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5">
              <div className="text-sm text-white/80 mb-2">
                New pin — give this to the person being checked:
              </div>

              <div className="flex items-center gap-4">
                <div className="text-2xl font-mono tracking-widest text-emerald-400">
                  {latest.pin}
                </div>

                <button
                  onClick={() => copy(latest.pin)}
                  className="rounded-lg bg-black/40 px-4 py-2 text-sm hover:bg-black/60"
                >
                  Copy
                </button>
              </div>

              <div className="mt-2 text-xs text-white/60">
                They enter this in Star Mac, run the scan, and you’ll see results here.
              </div>
            </div>
          )}

          {/* STATS */}
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <Stat label="Total Pins" value={stats.total} />
            <Stat label="Pending" value={stats.pending} />
            <Stat label="Finished" value={stats.finished} />
          </div>

          {/* TABLE */}
          <div className="mt-8 rounded-2xl border border-white/10 bg-[#0f141b] p-6">

            <div className="flex items-center justify-between mb-4">
              <input
                placeholder="Search by pin..."
                className="rounded-xl bg-black/40 border border-white/10 px-4 py-2 text-sm outline-none"
              />

              <button
                onClick={loadPins}
                className="rounded-lg bg-black/40 px-4 py-2 text-sm hover:bg-black/60"
              >
                Refresh
              </button>
            </div>

            <div className="grid grid-cols-4 text-sm text-white/50 pb-3 border-b border-white/10">
              <div>Pin</div>
              <div>Status</div>
              <div>Used</div>
              <div>Result</div>
            </div>

            <div className="divide-y divide-white/10">
              {pins.length === 0 ? (
                <div className="py-10 text-center text-white/60">
                  No pins yet.
                </div>
              ) : (
                pins.map(p => (
                  <div
                    key={p.id}
                    className="grid grid-cols-4 py-4 text-sm items-center"
                  >
                    <div className="font-mono tracking-widest text-emerald-400">
                      {p.pin}
                    </div>

                    <div>
                      {p.hasResults ? (
                        <span className="text-emerald-400">Finished</span>
                      ) : (
                        <span className="text-white/70">Pending</span>
                      )}
                    </div>

                    <div className="text-white/50">—</div>

                    <div className="text-white/50">—</div>
                  </div>
                ))
              )}
            </div>
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
    <div className="rounded-2xl border border-white/10 bg-[#0f141b] p-5">
      <div className="text-sm text-white/60">{label}</div>
      <div className="mt-1 text-2xl font-bold">{value}</div>
    </div>
  );
}
