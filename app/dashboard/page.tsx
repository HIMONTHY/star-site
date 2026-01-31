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
  const [copied, setCopied] = useState(false);

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
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
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
    <main className="min-h-screen text-white relative overflow-hidden bg-[#0a0d11]">

      {/* ===== MOVING BACKGROUND ===== */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -bottom-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[160px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.6)_55%,rgba(0,0,0,0.95)_100%)]" />
        <div
          className="absolute inset-0 opacity-[0.13]
          [background-image:linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),
          linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)]
          [background-size:70px_70px]"
        />
        <Particles />
      </div>

      {/* ===== TOP NAV ===== */}
      <div className="relative z-10 sticky top-0 border-b border-white/10 bg-black/55 backdrop-blur">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">

          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl border border-white/10 bg-white/5 grid place-items-center">
              <span className="text-emerald-300 font-bold">S</span>
            </div>
            <div className="text-lg font-semibold tracking-wide">
              Star <span className="text-emerald-400">Dashboard</span>
            </div>
          </div>

          {/* 👉 NAV + DISCORD LOGIN */}
          <div className="flex items-center gap-2 text-sm">

            <a
              href="/"
              className="rounded-xl px-3 py-2 text-white/70 hover:text-white hover:bg-white/5 transition"
            >
              Home
            </a>

            <a
              href="/dashboard"
              className="rounded-xl px-3 py-2 bg-white/10 border border-white/10 text-white hover:bg-white/15 transition"
            >
              Dashboard
            </a>

            {/* DISCORD LOGIN BUTTON */}
            <a
              href="/login"
              className="ml-2 flex items-center gap-2 rounded-xl bg-indigo-500 px-4 py-2 font-semibold text-white hover:opacity-90 transition shadow-[0_15px_60px_rgba(99,102,241,0.35)]"
            >
              → Discord login
            </a>

          </div>
        </div>
      </div>

      {/* ===== CONTENT ===== */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-8 grid gap-6 md:grid-cols-[240px_1fr]">

        {/* SIDEBAR */}
        <aside className="rounded-2xl border border-white/10 bg-[#0f141b]/75 backdrop-blur p-4 h-fit">
          <SidebarItem label="Dashboard" active />
          <SidebarItem label="My Pins" />

          <div className="mt-4 pt-4 border-t border-white/10">
            <a
              href="https://discord.gg/rHy3W7Za"
              target="_blank"
              rel="noreferrer"
              className="block rounded-xl px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 border border-white/10"
            >
              Discord Support
            </a>
          </div>
        </aside>

        {/* MAIN */}
        <section>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold">My Pins</h1>
              <p className="mt-1 text-white/60">
                Generate pins, track status, and view results.
              </p>
            </div>

            <button
              onClick={generatePin}
              disabled={loading}
              className="rounded-xl bg-emerald-500 px-5 py-2 font-semibold text-black hover:opacity-90 disabled:opacity-50"
            >
              {loading ? "Creating..." : "+ Create Pin"}
            </button>
          </div>

          {/* LATEST PIN */}
          {latest && (
            <div className="mt-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5">
              <div className="text-sm text-white/80 mb-2">
                Latest PIN:
              </div>

              <div className="flex items-center gap-4">
                <div className="text-2xl font-mono tracking-widest text-emerald-300">
                  {latest.pin}
                </div>

                <button
                  onClick={() => copy(latest.pin)}
                  className="rounded-lg bg-black/40 px-4 py-2 text-sm"
                >
                  {copied ? "Copied ✅" : "Copy"}
                </button>
              </div>
            </div>
          )}

          {/* STATS */}
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <Stat label="Total Pins" value={stats.total} />
            <Stat label="Pending" value={stats.pending} />
            <Stat label="Finished" value={stats.finished} />
          </div>

        </section>
      </div>
    </main>
  );
}

/* ===== SMALL UI ===== */

function SidebarItem({ label, active }: { label: string; active?: boolean }) {
  return (
    <div
      className={[
        "mb-2 rounded-xl px-4 py-3 border cursor-pointer",
        active
          ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-200"
          : "border-white/10 text-white/70 hover:bg-white/5",
      ].join(" ")}
    >
      {label}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0f141b]/75 p-5">
      <div className="text-sm text-white/60">{label}</div>
      <div className="mt-1 text-2xl font-bold text-emerald-200">{value}</div>
    </div>
  );
}

function Particles() {
  const dots = Array.from({ length: 36 }, (_, i) => i);
  return (
    <div className="absolute inset-0">
      {dots.map(i => (
        <span
          key={i}
          className="absolute rounded-full bg-emerald-200/30 animate-pulse"
          style={{
            width: "3px",
            height: "3px",
            left: `${(i * 97) % 100}%`,
            top: `${(i * 53) % 100}%`,
          }}
        />
      ))}
    </div>
  );
}
