"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type PinRow = {
  id: string;
  pin: string;
  createdAt: string;
  hasResults: boolean;
};

export default function DashboardPage() {
  const router = useRouter();
  const [pins, setPins] = useState<PinRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [latest, setLatest] = useState<PinRow | null>(null);
  const [copied, setCopied] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const hasLogin = document.cookie.includes("star_user=true");

    if (!hasLogin) {
      router.push("/access-denied");
    } else {
      setLoggedIn(true);
    }
  }, [router]);

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

      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -bottom-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[160px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.6)_55%,rgba(0,0,0,0.95)_100%)]" />

        <div
          className="grid-move absolute inset-0 opacity-[0.13]
          [background-image:linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),
          linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)]
          [background-size:70px_70px]"
        />

        <Particles />
      </div>

      {/* NAV */}
      <div className="relative z-10 sticky top-0 border-b border-white/10 bg-black/55 backdrop-blur">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">

          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl border border-white/10 bg-white/5 grid place-items-center">
              <span className="text-blue-300 font-bold">S</span>
            </div>

            <div className="text-lg font-semibold tracking-wide">
              Star <span className="text-blue-400">Dashboard</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm">

            <a href="/" className="rounded-xl px-3 py-2 hover:bg-white/5">Home</a>
            <a href="/dashboard" className="rounded-xl px-3 py-2 hover:bg-white/5">Dashboard</a>

            {loggedIn ? (
              <a
                href="/api/auth/logout"
                className="ml-2 rounded-xl bg-zinc-800 px-4 py-2 font-semibold hover:bg-zinc-700 border border-white/10"
              >
                ↩ Sign out
              </a>
            ) : (
              <a
                href="/api/auth/login"
                className="ml-2 rounded-xl bg-blue-500 px-4 py-2 font-semibold hover:opacity-90 shadow-[0_15px_60px_rgba(59,130,246,0.35)]"
              >
                → Discord login
              </a>
            )}
          </div>
        </div>
      </div>

      {/* LAYOUT */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-8 grid gap-6 md:grid-cols-[240px_1fr]">

        <aside className="rounded-2xl border border-white/10 bg-[#0f141b]/75 backdrop-blur p-4 shadow-[0_30px_120px_rgba(0,0,0,0.45)]">

          <div className="text-xs tracking-widest text-white/40 px-3 pb-3">MENU</div>

          <SidebarItem label="Dashboard" icon={<GridIcon />} active />
          <SidebarItem label="My Pins" icon={<PinIcon />} />

        </aside>

        <section>

          <div className="flex justify-between items-center">

            <div>
              <h1 className="text-3xl font-bold">My Pins</h1>
              <p className="text-white/60">Generate pins and track results.</p>
            </div>

            <button
              onClick={generatePin}
              disabled={loading}
              className="rounded-xl bg-blue-500 px-5 py-2 font-semibold hover:opacity-90 shadow-[0_20px_70px_rgba(59,130,246,0.25)]"
            >
              {loading ? "Creating..." : "+ Create Pin"}
            </button>

          </div>

          {latest && (
            <div className="mt-6 rounded-2xl border border-blue-500/30 bg-blue-500/10 p-5">

              <div className="text-blue-300 text-2xl font-mono">
                {latest.pin}
              </div>

            </div>
          )}

          <div className="mt-6 grid sm:grid-cols-3 gap-4">
            <StatPremium label="Total Pins" value={stats.total} />
            <StatPremium label="Pending" value={stats.pending} />
            <StatPremium label="Finished" value={stats.finished} />
          </div>

        </section>
      </div>
    </main>
  );
}

/* COMPONENTS */

function SidebarItem({ label, icon, active }: any) {
  return (
    <div
      className={`mb-2 rounded-xl px-4 py-3 flex items-center gap-3 border ${
        active
          ? "bg-blue-500/15 border-blue-500/30 text-blue-200 shadow-[0_25px_80px_rgba(59,130,246,0.25)]"
          : "border-white/10 text-white/70 hover:bg-white/5"
      }`}
    >
      <span className="text-blue-300">{icon}</span>
      {label}
    </div>
  );
}

function StatPremium({ label, value }: any) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0f141b]/75 p-5">
      <div className="text-white/60">{label}</div>
      <div className="text-2xl font-bold text-blue-200">{value}</div>
      <div className="mt-3 h-1 bg-white/10 rounded-full">
        <div className="h-full w-2/3 bg-blue-500/40" />
      </div>
    </div>
  );
}

function Particles() {
  return (
    <div className="absolute inset-0">
      {Array.from({ length: 40 }).map((_, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-blue-200/30 animate-float"
          style={{
            width: 3,
            height: 3,
            left: `${(i * 83) % 100}%`,
            top: `${(i * 41) % 100}%`,
          }}
        />
      ))}
    </div>
  );
}

/* ICONS */

function GridIcon() {
  return <div>▦</div>;
}

function PinIcon() {
  return <div>📍</div>;
}
