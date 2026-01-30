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
      {/* soft glow */}
      <div className="pointer-events-none fixed inset-x-0 top-[-140px] mx-auto h-[320px] max-w-6xl rounded-full bg-white/10 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 md:px-6 py-8">
        <div className="grid gap-6 md:grid-cols-[260px_1fr]">
          {/* SIDEBAR */}
          <aside className="rounded-2xl border border-white/10 bg-white/5 p-5 md:sticky md:top-6 h-fit">
            <div className="flex items-center justify-between">
              <div className="text-lg font-semibold tracking-tight">Star</div>
              <span className="text-xs text-white/40">v1</span>
            </div>

            <div className="mt-5 space-y-2">
              <NavItem href="/dashboard" label="Dashboard" active />
              <NavItem href="/dashboard/results" label="Results" />
              <NavItem href="/features" label="Features" />
              <NavItem href={process.env.NEXT_PUBLIC_DISCORD_INVITE || "https://discord.gg/rHy3W7Za"} label="Discord" external />
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs text-white/60">Auto-refresh</div>
              <div className="mt-1 text-sm font-semibold">Every 4 seconds</div>
              <p className="mt-2 text-xs text-white/45">
                Pins update automatically when results are uploaded.
              </p>
            </div>

            <div className="mt-6 text-xs text-white/40">
              © {new Date().getFullYear()} Star
            </div>
          </aside>

          {/* MAIN */}
          <section className="min-w-0">
            {/* Header */}
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                  Dashboard
                </h1>
                <p className="mt-3 text-white/60 max-w-2xl">
                  Generate a PIN, give it to the person being checked. When the scan
                  finishes, results will switch from <span className="text-white">Pending</span> to{" "}
                  <span className="text-white">Results Ready</span>.
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
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <StatCard label="Total Pins" value={stats.total} />
              <StatCard label="Waiting" value={stats.waiting} />
              <StatCard label="Results Ready" value={stats.ready} />
            </div>

            {/* Pins */}
            <div className="mt-10">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-xl font-semibold">Recent Pins</h2>
                <span className="text-sm text-white/50">
                  Tip: Click <span className="text-white">Copy</span> to share fast
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
                        <div className="min-w-[240px]">
                          <div className="text-xs tracking-widest text-white/50">
                            PIN
                          </div>

                          <div className="mt-1 flex flex-wrap items-center gap-3">
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

                      <div className="mt-5 h-px w-full bg-white/10 opacity-0 transition group-hover:opacity-100" />
                      <div className="mt-4 text-sm text-white/60">
                        Share this PIN with the user being checked.
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 rounded-2xl border border-white/10 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur">
          {toast}
        </div>
      )}
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

function NavItem({
  href,
  label,
  active,
  external,
}: {
  href: string;
  label: string;
  active?: boolean;
  external?: boolean;
}) {
  const base =
    "flex items-center justify-between rounded-xl px-4 py-3 border transition";
  const activeStyle =
    "bg-white/10 border-white/15 text-white";
  const normalStyle =
    "bg-transparent border-white/10 text-white/70 hover:text-white hover:bg-white/5 hover:border-white/15";

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={`${base} ${active ? activeStyle : normalStyle}`}
      >
        <span className="font-semibold">{label}</span>
        <span className="text-white/40 text-xs">↗</span>
      </a>
    );
  }

  return (
    <a href={href} className={`${base} ${active ? activeStyle : normalStyle}`}>
      <span className="font-semibold">{label}</span>
      <span className="text-white/40 text-xs">→</span>
    </a>
  );
}
