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

  // AUTH CHECK
  useEffect(() => {
    const hasLogin = document.cookie.includes("star_user=true");
    if (!hasLogin) {
      router.push("/access-denied");
    } else {
      setLoggedIn(true);
    }
  }, [router]);

  // DOWNLOAD LOGIC FOR TRINITY
  const downloadTrinity = () => {
    const GITHUB_RAW_URL = "https://raw.githubusercontent.com/HIMONTHY/HIMONTHYY/main/OW.PY";
    const link = document.createElement("a");
    link.href = GITHUB_RAW_URL;
    link.download = "OW.PY"; 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  async function loadPins() {
    try {
      const res = await fetch("/api/pins", { cache: "no-store" });
      const data = await res.json();
      const list = data.pins || [];
      setPins(list);
      setLatest(list[0] || null);
    } catch (err) {
      console.error("Failed to load pins", err);
    }
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
      {/* ===== PREMIUM MOVING BACKGROUND ===== */}
      <div className="pointer-events-none absolute inset-0">
        <div className="glow-blob" />
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

      {/* ===== STICKY TOP NAV ===== */}
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
            <a href="/" className="rounded-xl px-3 py-2 hover:bg-white/5 transition">Home</a>
            <a href="/dashboard" className="rounded-xl px-3 py-2 bg-white/5">Dashboard</a>

            {loggedIn ? (
              <a
                href="/api/auth/logout"
                className="ml-2 flex items-center gap-2 rounded-xl bg-zinc-800 px-4 py-2 font-semibold text-white hover:bg-zinc-700 transition border border-white/10"
              >
                ↩ Sign out
              </a>
            ) : (
              <a
                href="/api/auth/login"
                className="ml-2 flex items-center gap-2 rounded-xl bg-indigo-500 px-4 py-2 font-semibold text-white hover:opacity-90 transition shadow-[0_15px_60px_rgba(99,102,241,0.35)]"
              >
                → Discord login
              </a>
            )}
          </div>
        </div>
      </div>

      {/* ===== LAYOUT ===== */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-8 grid gap-6 md:grid-cols-[240px_1fr]">
        {/* SIDEBAR */}
        <aside className="rounded-2xl border border-white/10 bg-[#0f141b]/75 backdrop-blur p-4 h-fit shadow-[0_30px_120px_rgba(0,0,0,0.45)]">
          <div className="text-xs tracking-widest text-white/40 px-3 pb-3">MENU</div>
          <SidebarItem label="Dashboard" icon={<GridIcon />} active />
          <SidebarItem label="My Pins" icon={<PinIcon />} />
          
          {/* UPDATED: Download Trigger */}
          <SidebarItem 
            label="Simulate Trinity" 
            icon={<DownloadIcon />} 
            onClick={downloadTrinity} 
          />

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
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold">My Pins</h1>
              <p className="mt-1 text-white/60">Generate pins, track status, and view results.</p>
            </div>

            <button
              onClick={generatePin}
              disabled={loading}
              className="rounded-xl bg-blue-500 px-5 py-2 font-semibold text-black hover:opacity-90 disabled:opacity-50 transition shadow-[0_20px_70px_rgba(16,185,129,0.12)]"
            >
              {loading ? "Creating..." : "+ Create Pin"}
            </button>
          </div>

          {/* LATEST PIN */}
          {latest && (
            <div className="mt-6 rounded-2xl border border-blue-500/30 bg-blue-500/10 p-5 backdrop-blur shadow-[0_30px_120px_rgba(16,185,129,0.06)]">
              <div className="text-sm text-white/80 mb-2">
                Latest PIN — share this with the person being checked:
              </div>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="text-2xl font-mono tracking-widest text-blue-300">{latest.pin}</div>
                <button
                  onClick={() => copy(latest.pin)}
                  className="rounded-lg bg-black/40 px-4 py-2 text-sm hover:bg-black/60 border border-white/10 transition"
                >
                  {copied ? "Copied ✅" : "Copy"}
                </button>
                <span className="text-xs text-white/50">
                  Created {new Date(latest.createdAt).toLocaleString()}
                </span>
              </div>
              <div className="mt-2 text-xs text-white/60">
                They enter this in Star Mac, run the scan, then results show up here.
              </div>
            </div>
          )}

          {/* STATS */}
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <StatPremium label="Total Pins" value={stats.total} />
            <StatPremium label="Pending" value={stats.pending} />
            <StatPremium label="Finished" value={stats.finished} />
          </div>

          {/* TABLE */}
          <div className="mt-8 rounded-2xl border border-white/10 bg-[#0f141b]/75 backdrop-blur p-6 shadow-[0_30px_120px_rgba(0,0,0,0.45)]">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
              <div className="text-sm text-white/70">Recent pins (auto-refresh every 4s)</div>
              <button
                onClick={loadPins}
                className="rounded-lg bg-black/40 px-4 py-2 text-sm hover:bg-black/60 border border-white/10 transition"
              >
                Refresh
              </button>
            </div>

            <div className="grid grid-cols-4 text-sm text-white/50 pb-3 border-b border-white/10">
              <div>Pin</div>
              <div>Status</div>
              <div>Created</div>
              <div className="text-right">Action</div>
            </div>

            <div className="divide-y divide-white/10">
              {pins.length === 0 ? (
                <div className="py-10 text-center text-white/60">No pins yet.</div>
              ) : (
                pins.map((p) => (
                  <div
                    key={p.id}
                    className="grid grid-cols-4 py-4 text-sm items-center hover:bg-white/5 transition rounded-xl px-2 -mx-2"
                  >
                    <div className="font-mono tracking-widest text-blue-300">{p.pin}</div>
                    <div>
                      {p.hasResults ? (
                        <Badge tone="good">Finished</Badge>
                      ) : (
                        <Badge tone="neutral">Pending</Badge>
                      )}
                    </div>
                    <div className="text-white/55">
                      {new Date(p.createdAt).toLocaleTimeString()}
                    </div>
                    <div className="flex justify-end">
                      <button
                        onClick={() => copy(p.pin)}
                        className="rounded-lg bg-black/35 px-3 py-2 text-xs hover:bg-black/55 border border-white/10 transition"
                      >
                        Copy
                      </button>
                    </div>
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

/* ===== UI COMPONENTS ===== */

function SidebarItem({
  label,
  icon,
  active,
  onClick,
}: {
  label: string;
  icon?: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={[
        "mb-2 rounded-xl px-4 py-3 font-semibold cursor-pointer border transition flex items-center gap-3",
        active
          ? "bg-blue-500/15 border-blue-500/30 text-blue-200 shadow-[0_25px_80px_rgba(16,185,129,0.12)]"
          : "bg-transparent border-white/10 text-white/70 hover:bg-white/5 hover:text-white",
      ].join(" ")}
    >
      <span className="text-blue-300">{icon}</span>
      {label}
    </div>
  );
}

function StatPremium({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0f141b]/75 backdrop-blur p-5 hover:-translate-y-0.5 transition shadow-[0_30px_120px_rgba(0,0,0,0.45)]">
      <div className="text-sm text-white/60">{label}</div>
      <div className="mt-1 text-2xl font-bold text-blue-200">{value}</div>
      <div className="mt-3 h-1 rounded-full bg-white/10 overflow-hidden">
        <div className="h-full w-2/3 bg-blue-500/40" />
      </div>
    </div>
  );
}

function Badge({ tone, children }: { tone: "good" | "neutral"; children: React.ReactNode }) {
  const cls =
    tone === "good"
      ? "border-blue-500/30 bg-blue-500/10 text-blue-200"
      : "border-white/15 bg-white/5 text-white/75";

  return (
    <span className={["inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold", cls].join(" ")}>
      {children}
    </span>
  );
}

/* ===== BACKGROUND PARTICLES ===== */
function Particles() {
  const dots = Array.from({ length: 44 }, (_, i) => i);
  return (
    <div className="absolute inset-0">
      {dots.map((i) => (
        <span
          key={i}
          className="absolute rounded-full bg-blue-200/30 blur-[0.3px] animate-float"
          style={{
            width: `${2 + (i % 3)}px`,
            height: `${2 + (i % 3)}px`,
            left: `${(i * 97) % 100}%`,
            top: `${(i * 53) % 100}%`,
            animationDelay: `${(i % 10) * 0.35}s`,
            opacity: 0.2 + (i % 5) * 0.12,
          }}
        />
      ))}
    </div>
  );
}

/* ===== ICONS ===== */
function GridIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
    </svg>
  );
}
function PinIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22s7-5 7-12a7 7 0 10-14 0c0 7 7 12 7 12z" />
      <circle cx="12" cy="10" r="2" />
    </svg>
  );
}
function DownloadIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}
function SupportIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 12a8 8 0 0116 0v7a2 2 0 01-2 2h-2" />
      <path d="M4 12v5a2 2 0 002 2h2v-7H6a2 2 0 00-2 2z" />
      <path d="M20 12v5a2 2 0 01-2 2h-2v-7h2a2 2 0 012 2z" />
    </svg>
  );
}
