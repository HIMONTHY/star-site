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
  const [searchQuery, setSearchQuery] = useState("");

  // Simulation State
  const [isSimulating, setIsSimulating] = useState(false);
  const [simStep, setSimStep] = useState(0);

  const simLines = [
    "> Initializing Trinity Protocol...",
    "> Bypassing neural buffers...",
    "> Injecting Star Mac sequence...",
    "> Synchronizing global state...",
    "> Simulation Complete. Trinity Active."
  ];

  // Authentication Check
  useEffect(() => {
    const hasLogin = document.cookie.includes("star_user=true");
    if (!hasLogin) {
      router.push("/access-denied");
    } else {
      setLoggedIn(true);
    }
  }, [router]);

  // Data Fetching
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

  const handleSimulateTrinity = () => {
    setIsSimulating(true);
    setSimStep(0);
  };

  useEffect(() => {
    if (isSimulating && simStep < simLines.length) {
      const timer = setTimeout(() => setSimStep(s => s + 1), 800);
      return () => clearTimeout(timer);
    }
  }, [isSimulating, simStep]);

  useEffect(() => {
    loadPins();
    const t = setInterval(loadPins, 4000);
    return () => clearInterval(t);
  }, []);

  // Filter pins based on search
  const filteredPins = useMemo(() => {
    return pins.filter((p) => 
      p.pin.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [pins, searchQuery]);

  const stats = useMemo(() => {
    const total = pins.length;
    const finished = pins.filter((p) => p.hasResults).length;
    const pending = total - finished;
    return { total, pending, finished };
  }, [pins]);

  return (
    <main className="min-h-screen text-white relative overflow-hidden bg-[#0a0d11]">
      {/* ===== SIMULATION MODAL ===== */}
      {isSimulating && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-6">
          <div className="w-full max-w-lg rounded-2xl border border-blue-500/50 bg-[#0f141b] p-8 shadow-[0_0_50px_rgba(59,130,246,0.3)]">
            <div className="flex items-center gap-2 mb-6 text-blue-400 font-mono">
              <ZapIcon />
              <span className="font-bold tracking-widest uppercase text-sm">Trinity Simulation Engine</span>
            </div>
            <div className="space-y-2 font-mono text-sm">
              {simLines.slice(0, simStep).map((line, i) => (
                <div key={i} className="text-blue-100/80 animate-in fade-in slide-in-from-left-2">
                  {line}
                </div>
              ))}
              {simStep < simLines.length && (
                <div className="h-4 w-2 bg-blue-400 animate-pulse inline-block" />
              )}
            </div>
            {simStep === simLines.length && (
              <button 
                onClick={() => setIsSimulating(false)}
                className="mt-8 w-full rounded-xl bg-blue-500 py-3 font-bold text-black hover:bg-blue-400 transition"
              >
                CLOSE TERMINAL
              </button>
            )}
          </div>
        </div>
      )}

      {/* ===== BACKGROUND ===== */}
      <div className="pointer-events-none absolute inset-0">
        <div className="glow-blob" />
        <div className="absolute -bottom-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[160px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.6)_55%,rgba(0,0,0,0.95)_100%)]" />
        <div className="grid-move absolute inset-0 opacity-[0.13] [background-image:linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:70px_70px]" />
        <Particles />
      </div>

      {/* ===== TOP NAV ===== */}
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
            <a href="/dashboard" className="rounded-xl px-3 py-2 bg-white/5">Dashboard</a>
            {loggedIn ? (
              <a href="/api/auth/logout" className="ml-2 flex items-center gap-2 rounded-xl bg-zinc-800 px-4 py-2 font-semibold text-white hover:bg-zinc-700 transition border border-white/10">↩ Sign out</a>
            ) : (
              <a href="/api/auth/login" className="ml-2 flex items-center gap-2 rounded-xl bg-indigo-500 px-4 py-2 font-semibold text-white hover:opacity-90 transition shadow-[0_15px_60px_rgba(99,102,241,0.35)]">→ Discord login</a>
            )}
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-8 grid gap-6 md:grid-cols-[240px_1fr]">
        <aside className="rounded-2xl border border-white/10 bg-[#0f141b]/75 backdrop-blur p-4 h-fit">
          <div className="text-xs tracking-widest text-white/40 px-3 pb-3">MENU</div>
          <SidebarItem label="Dashboard" icon={<GridIcon />} active onClick={() => router.push("/dashboard")} />
          <SidebarItem label="My Pins" icon={<PinIcon />} onClick={() => loadPins()} />
          <SidebarItem label="Simulate Trinity" icon={<ZapIcon />} onClick={handleSimulateTrinity} />
          <div className="mt-4 pt-4 border-t border-white/10">
            <a href="https://discord.gg/rHy3W7Za" target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-xl px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 transition">
              <SupportIcon /> Discord Support
            </a>
          </div>
        </aside>

        <section>
          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold">My Pins</h1>
              <p className="mt-1 text-white/60">Generate pins, track status, and view results.</p>
            </div>
            <button onClick={generatePin} disabled={loading} className="rounded-xl bg-blue-500 px-5 py-2 font-semibold text-black hover:opacity-90 disabled:opacity-50 transition">+ Create Pin</button>
          </div>

          {/* STATS */}
          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            <StatPremium label="Total Pins" value={stats.total} />
            <StatPremium label="Pending" value={stats.pending} />
            <StatPremium label="Finished" value={stats.finished} />
          </div>

          {/* ===== TABLE UI (STRICT BLUE THEME) ===== */}
          <div className="rounded-2xl border border-white/5 bg-[#0f141b]/80 backdrop-blur shadow-2xl overflow-hidden">
            <div className="p-5 flex items-center justify-between gap-4 border-b border-white/5">
              <div className="relative flex-1 max-w-xs">
                <input 
                  type="text" 
                  placeholder="Search by pin..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#161b22] border border-white/10 rounded-lg py-2 px-4 text-sm focus:outline-none focus:border-blue-500/50 transition text-blue-100"
                />
              </div>
              <button 
                onClick={loadPins} 
                className="flex items-center gap-2 bg-[#161b22] hover:bg-[#1c2128] border border-white/10 rounded-lg py-2 px-4 text-sm transition text-blue-300"
              >
                <RefreshIcon /> Refresh
              </button>
            </div>

            <div className="w-full overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-xs font-semibold text-white/40 uppercase tracking-wider border-b border-white/5">
                    <th className="px-6 py-4">Pin</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Used</th>
                    <th className="px-6 py-4">Result</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredPins.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-10 text-center text-white/40 text-sm">No pins found.</td>
                    </tr>
                  ) : (
                    filteredPins.map((p) => (
                      <tr key={p.id} className="group hover:bg-white/[0.02] transition">
                        <td className="px-6 py-4">
                          <span className="font-mono font-bold text-blue-400 tracking-wider">{p.pin}</span>
                        </td>
                        <td className="px-6 py-4">
                          <Badge tone={p.hasResults ? "good" : "neutral"}>
                            {p.hasResults ? "Finished" : "Pending"}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-sm text-white/40">
                          {p.hasResults ? new Date(p.createdAt).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }) : "—"}
                        </td>
                        <td className="px-6 py-4">
                          {p.hasResults ? (
                            <a 
                              href={`/results/${p.id}`} 
                              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 hover:underline text-sm font-medium transition"
                            >
                              <ExternalIcon /> Results
                            </a>
                          ) : (
                            <span className="text-white/20">—</span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

/* ===== UI COMPONENTS ===== */

function SidebarItem({ label, icon, active, onClick }: { label: string; icon?: React.ReactNode; active?: boolean; onClick?: () => void; }) {
  return (
    <button onClick={onClick} className={["mb-2 w-full rounded-xl px-4 py-3 font-semibold transition flex items-center gap-3 text-left outline-none", active ? "bg-blue-500/15 border border-blue-500/30 text-blue-200" : "bg-transparent text-white/70 hover:bg-white/5 hover:text-white"].join(" ")}>
      <span className="text-blue-300">{icon}</span> {label}
    </button>
  );
}

function StatPremium({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-white/5 bg-[#0f141b]/75 p-5 transition hover:bg-[#161b22]">
      <div className="text-xs font-medium text-white/40 uppercase tracking-wider">{label}</div>
      <div className="mt-1 text-2xl font-bold text-blue-200">{value}</div>
    </div>
  );
}

function Badge({ tone, children }: { tone: "good" | "neutral"; children: React.ReactNode; }) {
  const cls = tone === "good" ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" : "bg-[#1c2128] text-white/40";
  return (
    <span className={["inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider", cls].join(" ")}>
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
        <span key={i} className="absolute rounded-full bg-blue-200/30 blur-[0.3px] animate-float" style={{ width: `${2 + (i % 3)}px`, height: `${2 + (i % 3)}px`, left: `${(i * 97) % 100}%`, top: `${(i * 53) % 100}%`, animationDelay: `${(i % 10) * 0.35}s`, opacity: 0.2 + (i % 5) * 0.12 }} />
      ))}
    </div>
  );
}

/* ===== ICONS ===== */
function RefreshIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
    </svg>
  );
}

function GridIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>; }
function PinIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>; }
function ZapIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>; }
function SupportIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>; }
