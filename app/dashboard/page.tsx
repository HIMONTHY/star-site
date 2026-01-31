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
    try {
      const res = await fetch("/api/pins", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed");

      const data = await res.json();
      const list = data.pins || [];

      setPins(list);
      setLatest(list[0] || null);
    } catch (err) {
      console.error(err);
    }
  }

  async function generatePin() {
    if (loading) return;

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
    const finished = pins.filter((p) => p.hasResults).length;
    const pending = total - finished;
    return { total, pending, finished };
  }, [pins]);

  return (
    <main className="min-h-screen text-white relative overflow-hidden bg-[#0a0d11]">

      {/* ===== BACKGROUND ===== */}
      <div className="pointer-events-none absolute inset-0">
        <div className="glow-blob" />
        <div className="absolute -bottom-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[160px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.6)_55%,rgba(0,0,0,0.95)_100%)]" />
        <div
          className="grid-move absolute inset-0 opacity-[0.13]
          [background-image:linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),
          linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)]
          [background-size:70px_70px]"
        />
        <Particles />
      </div>

      {/* ===== STICKY TOP NAV ===== */}
      <div className="relative z-10 sticky top-0 border-b border-white/10 bg-black/55 backdrop-blur">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">

          {/* LOGO */}
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl border border-white/10 bg-white/5 grid place-items-center">
              <span className="text-emerald-300 font-bold">S</span>
            </div>
            <div className="text-lg font-semibold tracking-wide">
              Star <span className="text-emerald-400">Dashboard</span>
            </div>
          </div>

          {/* NAV LINKS + DISCORD LOGIN */}
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

      {/* ===== LAYOUT ===== */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-8 grid gap-6 md:grid-cols-[240px_1fr]">

        {/* SIDEBAR */}
        <aside className="rounded-2xl border border-white/10 bg-[#0f141b]/75 backdrop-blur p-4 h-fit shadow-[0_30px_120px_rgba(0,0,0,0.45)]">

          <div className="text-xs tracking-widest text-white/40 px-3 pb-3">
            MENU
          </div>

          <SidebarItem label="Dashboard" icon={<GridIcon />} active />
          <SidebarItem label="My Pins" icon={<PinIcon />} />

          <div className="mt-4 pt-4 border-t border-white/10">
            <a
              href="https://discord.gg/rHy3W7Za"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 border border-white/10 transition"
            >
              <SupportIcon />
              Discord Support
            </a>
          </div>

        </aside>

        {/* MAIN */}
        <section>

          {/* HEADER */}
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
              className="rounded-xl bg-emerald-500 px-5 py-2 font-semibold text-black hover:opacity-90 disabled:opacity-50 transition shadow-[0_20px_70px_rgba(16,185,129,0.12)]"
            >
              {loading ? "Creating..." : "+ Create Pin"}
            </button>
          </div>

          {/* LATEST PIN */}
          {latest && (
            <div className="mt-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5 backdrop-blur">

              <div className="text-sm text-white/80 mb-2">
                Latest PIN:
              </div>

              <div className="flex items-center gap-4 flex-wrap">

                <div className="text-2xl font-mono tracking-widest text-emerald-300">
                  {latest.pin}
                </div>

                <button
                  onClick={() => copy(latest.pin)}
                  className="rounded-lg bg-black/40 px-4 py-2 text-sm hover:bg-black/60 border border-white/10 transition"
                >
                  {copied ? "Copied ✅" : "Copy"}
                </button>

              </div>

            </div>
          )}

          {/* STATS */}
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <StatPremium label="Total Pins" value={stats.total} />
            <StatPremium label="Pending" value={stats.pending} />
            <StatPremium label="Finished" value={stats.finished} />
          </div>

        </section>
      </div>
    </main>
  );
}

/* ===== COMPONENTS ===== */

function SidebarItem({ label, icon, active }: any) {
  return (
    <div
      className={`mb-2 rounded-xl px-4 py-3 font-semibold cursor-pointer border flex items-center gap-3 transition ${
        active
          ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-200"
          : "border-white/10 text-white/70 hover:bg-white/5"
      }`}
    >
      {icon}
      {label}
    </div>
  );
}

function StatPremium({ label, value }: any) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0f141b]/75 p-5">
      <div className="text-sm text-white/60">{label}</div>
      <div className="mt-1 text-2xl font-bold text-emerald-200">{value}</div>
    </div>
  );
}

/* ===== PARTICLES ===== */
function Particles() {
  return (
    <div className="absolute inset-0">
      {[...Array(40)].map((_, i) => (
        <span
          key={i}
          className="absolute w-[3px] h-[3px] rounded-full bg-emerald-300/30 animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
}

/* ===== ICONS ===== */
function GridIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 22s7-5 7-12a7 7 0 10-14 0c0 7 7 12 7 12z"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

function SupportIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 12a8 8 0 0116 0v7a2 2 0 01-2 2h-2"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}
