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
      
      {/* ===== TRINITY CORE SIMULATION MODAL (MATCHES IMAGE 2) ===== */}
      {isSimulating && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl rounded-xl border border-white/10 bg-[#0f141b] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-6 py-4">
              <div className="flex items-center gap-3 text-blue-400">
                <ZapIcon />
                <span className="text-xs font-bold uppercase tracking-widest">Trinity Core Simulation</span>
              </div>
              <button 
                onClick={() => setIsSimulating(false)} 
                className="text-white/40 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-8 min-h-[200px]">
              <div className="space-y-4 font-mono text-sm">
                {simLines.slice(0, simStep).map((line, i) => (
                  <div key={i} className="text-blue-100/80 flex items-start gap-2">
                    <span className="text-blue-400 select-none">{">"}</span>
                    <span className="animate-in fade-in slide-in-from-left-1 duration-300">{line.replace("> ", "")}</span>
                  </div>
                ))}
                {simStep < simLines.length && (
                  <div className="h-5 w-2.5 bg-blue-500 animate-pulse inline-block ml-5" />
                )}
              </div>
              
              {simStep === simLines.length && (
                <button 
                  onClick={() => setIsSimulating(false)}
                  className="mt-8 w-full rounded-lg bg-blue-500/10 border border-blue-500/50 py-3 text-xs font-bold text-blue-400 hover:bg-blue-500/20 transition-all uppercase tracking-widest"
                >
                  Close Session
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ===== BACKGROUND EFFECTS ===== */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -bottom-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[160px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.6)_55%,rgba(0,0,0,0.95)_100%)]" />
        <div className="grid-move absolute inset-0 opacity-[0.1] [background-image:linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:60px_60px]" />
        <Particles />
      </div>

      {/* ===== STICKY TOP NAV ===== */}
      <div className="relative z-10 sticky top-0 border-b border-white/10 bg-black/60 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl border border-blue-500/30 bg-blue-500/10 grid place-items-center">
              <span className="text-blue-400 font-bold">S</span>
            </div>
            <div className="text-lg font-semibold tracking-wide">
              Star <span className="text-blue-400 font-bold">Dashboard</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <a href="/" className="rounded-xl px-4 py-2 hover:bg-white/5 transition">Home</a>
            <a href="/dashboard" className="rounded-xl px-4 py-2 bg-blue-500/10 text-blue-400 border border-blue-500/20">Dashboard</a>
            {loggedIn && (
              <a href="/api/auth/logout" className="ml-2 flex items-center gap-2 rounded-xl bg-zinc-800 px-4 py-2 font-semibold text-white hover:bg-zinc-700 transition border border-white/10">Sign out</a>
            )}
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-8 grid gap-8 md:grid-cols-[240px_1fr]">
        {/* SIDEBAR */}
        <aside className="space-y-1">
          <div className="text-[10px] font-bold tracking-[0.2em] text-white/30 px-4 pb-4 uppercase">Navigation</div>
          <SidebarItem label="Dashboard" icon={<GridIcon />} active onClick={() => router.push("/dashboard")} />
          <SidebarItem label="My Pins" icon={<PinIcon />} onClick={() => loadPins()} />
          <SidebarItem label="Simulate Trinity" icon={<ZapIcon />} onClick={handleSimulateTrinity} />
          <div className="pt-4 mt-4 border-t border-white/5">
            <a href="https://discord.gg/rHy3W7Za" target="_blank" className="flex items-center gap-3 rounded-xl px-4 py-3 text-white/50 hover:text-white hover:bg-white/5 transition">
              <SupportIcon /> <span className="text-sm font-medium">Discord Support</span>
            </a>
          </div>
        </aside>

        {/* MAIN SECTION */}
        <section>
          <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white">My Pins</h1>
              <p className="mt-1 text-white/40 text-sm">Manage authentication pins and view simulation results.</p>
            </div>
            <button onClick={generatePin} disabled={loading} className="rounded-xl bg-blue-500 px-6 py-2.5 font-bold text-black hover:bg-blue-400 transition-all shadow-lg shadow-blue-500/20 active:scale-95">
              {loading ? "Generating..." : "+ Create Pin"}
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 mb-8">
            <StatCard label="Total Pins" value={stats.total} />
            <StatCard label="Pending" value={stats.pending} />
            <StatCard label="Finished" value={stats.finished} color="text-blue-400" />
          </div>

          {/* ===== TABLE UI (MATCHES IMAGE 1 & 3) ===== */}
          <div className="rounded-2xl border border-white/10 bg-[#0f141b]/80 backdrop-blur-xl shadow-2xl overflow-hidden">
            {/* Table Header Controls */}
            <div className="p-5 flex items-center justify-between gap-4 border-b border-white/5 bg-white/[0.02]">
              <div className="relative flex-1 max-w-sm">
                <input 
                  type="text" 
                  placeholder="Search by pin..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#161b22] border border-white/10 rounded-xl py-2.5 px-5 text-sm focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all text-blue-100 placeholder:text-white/20"
                />
              </div>
              <button 
                onClick={loadPins} 
                className="flex items-center gap-2.5 bg-[#161b22] hover:bg-[#1c2128] border border-white/10 rounded-xl py-2.5 px-6 text-sm font-semibold transition-all hover:border-white/20 active:scale-95"
              >
                <RefreshIcon /> Refresh
              </button>
            </div>

            {/* Table Area */}
            <div className="w-full overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-[11px] font-bold text-white/30 uppercase tracking-[0.15em] border-b border-white/5">
                    <th className="px-8 py-5">Pin</th>
                    <th className="px-8 py-5">Status</th>
                    <th className="px-8 py-5">Used</th>
                    <th className="px-8 py-5">Result</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredPins.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-8 py-16 text-center text-white/20 text-sm font-medium italic">No authentication pins found...</td>
                    </tr>
                  ) : (
                    filteredPins.map((p) => (
                      <tr key={p.id} className="group hover:bg-white/[0.03] transition-colors">
                        <td className="px-8 py-5">
                          <span className="font-mono font-bold text-blue-400 text-base tracking-widest">{p.pin}</span>
                        </td>
                        <td className="px-8 py-5">
                          <Badge tone={p.hasResults ? "good" : "neutral"}>
                            {p.hasResults ? "Finished" : "Pending"}
                          </Badge>
                        </td>
                        <td className="px-8 py-5 text-sm font-medium text-white/50">
                          {p.hasResults ? "1/31/26, 7:21 PM" : "—"}
                        </td>
                        <td className="px-8 py-5">
                          {p.hasResults ? (
                            <a 
                              href={`/results/${p.id}`} 
                              className="inline-flex items-center gap-2.5 text-blue-400 hover:text-blue-300 hover:underline text-sm font-bold transition-all"
                            >
                              <ExternalIcon /> Results
                            </a>
                          ) : (
                            <span className="text-white/10 font-mono">—</span>
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
    <button onClick={onClick} className={["mb-1 w-full rounded-xl px-4 py-3 font-bold transition-all flex items-center gap-4 text-left outline-none group", active ? "bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-lg shadow-blue-500/5" : "bg-transparent text-white/40 hover:bg-white/5 hover:text-white"].join(" ")}>
      <span className={active ? "text-blue-400" : "text-white/20 group-hover:text-white/50 transition-colors"}>{icon}</span>
      <span className="text-sm tracking-tight">{label}</span>
    </button>
  );
}

function StatCard({ label, value, color = "text-white" }: { label: string; value: number; color?: string; }) {
  return (
    <div className="rounded-2xl border border-white/5 bg-[#0f141b]/80 p-6 transition-all hover:bg-[#161b22] hover:border-white/10 shadow-xl">
      <div className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-1">{label}</div>
      <div className={["text-3xl font-black tracking-tight", color].join(" ")}>{value}</div>
    </div>
  );
}

function Badge({ tone, children }: { tone: "good" | "neutral"; children: React.ReactNode; }) {
  const cls = tone === "good" ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" : "bg-[#1c2128] text-white/30 border border-white/5";
  return (
    <span className={["inline-flex items-center rounded-full px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.1em] border", cls].join(" ")}>
      {children}
    </span>
  );
}

function Particles() {
  const dots = Array.from({ length: 30 }, (_, i) => i);
  return (
    <div className="absolute inset-0">
      {dots.map((i) => (
        <span key={i} className="absolute rounded-full bg-blue-400/20 blur-[1px] animate-pulse" style={{ width: `2px`, height: `2px`, left: `${(i * 13) % 100}%`, top: `${(i * 17) % 100}%`, animationDelay: `${i * 0.1}s` }} />
      ))}
    </div>
  );
}

/* ===== ICONS ===== */
function RefreshIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" /></svg>;
}

function ExternalIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" /></svg>;
}

function GridIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>; }
function PinIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>; }
function ZapIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>; }
function SupportIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>; }
