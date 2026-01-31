"use client";

import { useEffect, useMemo, useState } from "react";

/* ================= TYPES ================= */

type PinRow = {
  id: string;
  pin: string;
  createdAt: string;
  hasResults: boolean;
};

/* ================= PAGE ================= */

export default function DashboardPage() {
  const [loggedIn, setLoggedIn] = useState(false); // 👈 fake login for now

  // ===== LOGIN SCREEN =====
  if (!loggedIn) {
    return (
      <main className="min-h-screen bg-[#0a0d11] text-white relative overflow-hidden grid place-items-center">

        {/* moving background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="glow-blob" />
          <div
            className="grid-move absolute inset-0 opacity-[0.12]
            [background-image:linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),
            linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)]
            [background-size:70px_70px]"
          />
          <Particles />
        </div>

        {/* LOGIN CARD */}
        <div className="relative z-10 rounded-3xl border border-white/10 bg-[#12161d]/80 backdrop-blur p-8 w-[360px] text-center shadow-[0_40px_140px_rgba(0,0,0,0.6)]">

          <h1 className="text-2xl font-bold">Sign in with Discord</h1>

          <p className="mt-2 text-sm text-white/60">
            Use your Discord account to access the dashboard, view scan results,
            and pins.
          </p>

          <button
            onClick={() => setLoggedIn(true)}
            className="mt-6 w-full rounded-xl bg-indigo-500 py-3 font-semibold hover:opacity-90 transition shadow-[0_20px_70px_rgba(99,102,241,0.35)]"
          >
            → Continue with Discord
          </button>

          <p className="mt-4 text-xs text-white/50">
            By signing in you agree to our{" "}
            <span className="text-emerald-300">Terms</span> &{" "}
            <span className="text-emerald-300">Privacy Policy</span>
          </p>
        </div>
      </main>
    );
  }

  // ================= DASHBOARD =================

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
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 900);
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
        <div className="glow-blob" />
        <div
          className="grid-move absolute inset-0 opacity-[0.13]
          [background-image:linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),
          linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)]
          [background-size:70px_70px]"
        />
        <Particles />
      </div>

      {/* ===== NAV ===== */}
      <div className="relative z-10 border-b border-white/10 bg-black/60 backdrop-blur">
        <div className="mx-auto max-w-7xl px-6 py-4 flex justify-between items-center">
          <div className="font-semibold text-lg">
            Star <span className="text-emerald-400">Dashboard</span>
          </div>

          <button
            onClick={() => setLoggedIn(false)}
            className="rounded-xl bg-white/10 border border-white/10 px-4 py-2 text-sm hover:bg-white/15 transition"
          >
            Sign out
          </button>
        </div>
      </div>

      {/* ===== CONTENT ===== */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-8">

        <div className="flex justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold">My Pins</h1>
            <p className="text-white/60">Generate and manage scan pins.</p>
          </div>

          <button
            onClick={generatePin}
            disabled={loading}
            className="rounded-xl bg-emerald-500 px-5 py-2 font-semibold text-black hover:opacity-90 disabled:opacity-50"
          >
            + Create Pin
          </button>
        </div>

        {latest && (
          <div className="mt-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5">

            <div className="text-sm mb-2 text-white/80">
              Latest PIN
            </div>

            <div className="flex items-center gap-4">
              <div className="font-mono text-2xl tracking-widest text-emerald-300">
                {latest.pin}
              </div>

              <button
                onClick={() => copy(latest.pin)}
                className="rounded-lg bg-black/40 px-4 py-2 text-sm"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
        )}

        <div className="mt-6 grid sm:grid-cols-3 gap-4">
          <Stat label="Total Pins" value={stats.total} />
          <Stat label="Pending" value={stats.pending} />
          <Stat label="Finished" value={stats.finished} />
        </div>
      </div>
    </main>
  );
}

/* ================= UI ================= */

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0f141b]/80 p-5">
      <div className="text-white/60 text-sm">{label}</div>
      <div className="text-2xl font-bold text-emerald-200 mt-1">{value}</div>
    </div>
  );
}

/* ================= PARTICLES ================= */

function Particles() {
  const dots = Array.from({ length: 36 }, (_, i) => i);

  return (
    <div className="absolute inset-0">
      {dots.map((i) => (
        <span
          key={i}
          className="absolute rounded-full bg-emerald-200/30 animate-float"
          style={{
            width: `${2 + (i % 3)}px`,
            height: `${2 + (i % 3)}px`,
            left: `${(i * 83) % 100}%`,
            top: `${(i * 57) % 100}%`,
            animationDelay: `${(i % 10) * 0.4}s`,
            opacity: 0.25 + (i % 5) * 0.1,
          }}
        />
      ))}
    </div>
  );
}
