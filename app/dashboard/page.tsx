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
    const finished = pins.filter((p) => p.hasResults).length;
    const pending = total - finished;
    return { total, pending, finished };
  }, [pins]);

  return (
    <main className="min-h-screen text-white relative overflow-hidden bg-[#0a0d11]">

      {/* ===== STICKY TOP NAV ===== */}
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

          {/* 🔥 TOP RIGHT WITH DISCORD LOGIN */}
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

            <a
              href="/login"
              className="ml-2 flex items-center gap-2 rounded-xl bg-indigo-500 px-4 py-2 font-semibold text-white hover:opacity-90 transition shadow-[0_15px_60px_rgba(99,102,241,0.35)]"
            >
              Login with Discord
            </a>

          </div>
        </div>
      </div>

      {/* ===== REST OF YOUR DASHBOARD (UNCHANGED) ===== */}

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-8 grid gap-6 md:grid-cols-[240px_1fr]">

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

        <section>
          <h1 className="text-3xl font-bold">My Pins</h1>

          <button
            onClick={generatePin}
            disabled={loading}
            className="mt-4 rounded-xl bg-emerald-500 px-5 py-2 font-semibold text-black hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Creating..." : "+ Create Pin"}
          </button>
        </section>

      </div>
    </main>
  );
}

/* ===== COMPONENTS ===== */

function SidebarItem({
  label,
  icon,
  active,
}: {
  label: string;
  icon?: React.ReactNode;
  active?: boolean;
}) {
  return (
    <div
      className={[
        "mb-2 rounded-xl px-4 py-3 font-semibold cursor-pointer border transition flex items-center gap-3",
        active
          ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-200"
          : "bg-transparent border-white/10 text-white/70 hover:bg-white/5 hover:text-white",
      ].join(" ")}
    >
      <span className="text-emerald-300">{icon}</span>
      {label}
    </div>
  );
}

function GridIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M4 4h7v7H4V4zm9 0h7v7h-7V4zM4 13h7v7H4v-7zm9 0h7v7h-7v-7z" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M12 22s7-5 7-12a7 7 0 10-14 0c0 7 7 12 7 12z" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="10" r="2" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function SupportIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M4 12a8 8 0 0116 0v7a2 2 0 01-2 2h-2" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
