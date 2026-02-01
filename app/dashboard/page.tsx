"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

// --- Types ---
type PinRow = {
  id: string;
  pin: string;
  createdAt: string;
  hasResults: boolean;
  usedAt?: string;
};

export default function DashboardPage() {
  const router = useRouter();
  const [pins, setPins] = useState<PinRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  // Auth Check
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
      setPins(data.pins || []);
    } catch (err) {
      console.error("Failed to load pins", err);
    }
  }

  useEffect(() => {
    loadPins();
    const t = setInterval(loadPins, 5000);
    return () => clearInterval(t);
  }, []);

  const stats = useMemo(() => {
    const total = pins.length;
    const finished = pins.filter((p) => p.hasResults).length;
    const pending = total - finished;
    return { total, pending, finished };
  }, [pins]);

  return (
    <div className="min-h-screen bg-[#0b0e11] text-[#e1e1e1] flex font-sans">
      
      {/* ===== SIDEBAR ===== */}
      <aside className="w-[260px] bg-[#0f1216] border-r border-white/5 p-6 flex flex-col gap-2">
        <div className="flex items-center gap-2 mb-10 px-2">
          <div className="w-8 h-8 bg-[#1ed760]/20 rounded-lg flex items-center justify-center">
            <div className="grid grid-cols-2 gap-1">
              <div className="w-2 h-2 bg-[#1ed760] rounded-sm" />
              <div className="w-2 h-2 bg-[#1ed760] rounded-sm opacity-50" />
              <div className="w-2 h-2 bg-[#1ed760] rounded-sm opacity-50" />
              <div className="w-2 h-2 bg-[#1ed760] rounded-sm" />
            </div>
          </div>
          <span className="font-bold text-white tracking-tight text-lg">Star System</span>
        </div>

        <NavItem icon={<GridIcon />} label="Dashboard" />
        <NavItem icon={<PinIcon />} label="My Pins" active />
        <NavItem icon={<ShieldIcon />} label="Admin" />
        
        <div className="mt-auto pt-6 border-t border-white/5">
          <button 
            onClick={() => setIsSimulating(true)}
            className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-[#1ed760] bg-[#1ed760]/5 border border-[#1ed760]/20 hover:bg-[#1ed760]/10 transition text-sm font-bold"
          >
            <ZapIcon /> Simulate Trinity
          </button>
        </div>
      </aside>

      {/* ===== MAIN CONTENT ===== */}
      <main className="flex-1 p-10 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-extrabold text-white tracking-tight">My Pins</h1>
            <p className="text-white/40 text-sm mt-1">View and manage your scan pins and results.</p>
          </div>
          <button 
            onClick={async () => {
              setLoading(true);
              await fetch("/api/pins", { method: "POST" });
              setLoading(false);
              loadPins();
            }}
            className="bg-[#1ed760] hover:bg-[#1bc658] text-[#0b0e11] font-black py-3 px-8 rounded-xl flex items-center gap-2 transition transform active:scale-95 shadow-lg shadow-[#1ed760]/10"
          >
            <span className="text-xl">+</span> Create Pin
          </button>
        </div>

        {/* ===== STAT CARDS ===== */}
        <div className="grid grid-cols-3 gap-6 mb-10">
          <StatCard count={stats.total} label="Total Pins" sub="Generated pins" />
          <StatCard count={stats.pending} label="Pending" sub="awaiting scan" />
          <StatCard count={stats.finished} label="Finished" sub="with results" />
        </div>

        {/* ===== TABLE CONTAINER ===== */}
        <div className="bg-[#12161c] rounded-3xl border border-white/5 shadow-2xl overflow-hidden">
          <div className="p-6 flex justify-between items-center border-b border-white/5 bg-white/[0.01]">
            <div className="relative group">
              <input 
                type="text" 
                placeholder="Search by pin..." 
                className="bg-[#191e24] border border-white/5 rounded-xl py-3 px-5 text-sm w-80 focus:outline-none focus:border-[#1ed760]/40 transition group-hover:border-white/10"
              />
            </div>
            <button onClick={loadPins} className="flex items-center gap-2 text-xs font-black text-white/40 hover:text-white transition uppercase tracking-[0.2em]">
              <RefreshIcon /> Refresh
            </button>
          </div>

          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[11px] uppercase tracking-[0.15em] text-white/20 border-b border-white/5">
                <th className="px-10 py-5 font-bold">Pin</th>
                <th className="px-10 py-5 font-bold">Status</th>
                <th className="px-10 py-5 font-bold">Used</th>
                <th className="px-10 py-5 font-bold text-right">Result</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {pins.length === 0 ? (
                <tr><td colSpan={4} className="py-20 text-center text-white/20 font-medium">No active pins found.</td></tr>
              ) : (
                pins.map((p) => (
                  <tr key={p.id} className="group border-b border-white/5 hover:bg-white/[0.02] transition">
                    <td className="px-10 py-6 font-mono text-[#1ed760] font-black text-base group-hover:translate-x-1 transition-transform tracking-widest">{p.pin}</td>
                    <td className="px-10 py-6">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${p.hasResults ? 'bg-[#1ed760]/10 text-[#1ed760]' : 'bg-white/5 text-white/30'}`}>
                        {p.hasResults ? "Finished" : "Pending"}
                      </span>
                    </td>
                    <td className="px-10 py-6 text-white/30 font-medium">
                      {p.usedAt ? new Date(p.usedAt).toLocaleString() : "—"}
                    </td>
                    <td className="px-10 py-6 text-right">
                      {p.hasResults ? (
                        <button 
                          onClick={() => setIsSimulating(true)}
                          className="text-[#1ed760] hover:text-white flex items-center gap-2 ml-auto text-xs font-black uppercase tracking-wider bg-[#1ed760]/5 px-4 py-2 rounded-lg border border-[#1ed760]/10 transition"
                        >
                          <ResultsIcon /> Results
                        </button>
                      ) : <span className="text-white/10">—</span>}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* ===== TRINITY SIMULATION MODAL (Video Matched) ===== */}
      {isSimulating && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 animate-in fade-in duration-300">
          <div className="w-full max-w-2xl rounded-[2.5rem] bg-[#0f1216] border border-red-500/20 shadow-[0_0_100px_rgba(239,68,68,0.1)] overflow-hidden">
            <div className="bg-red-500/10 p-6 border-b border-red-500/10 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-red-500 font-black text-xs uppercase tracking-[0.3em]">Detection Audit Active</span>
              </div>
              <button onClick={() => setIsSimulating(false)} className="text-white/20 hover:text-white transition-colors text-xl">✕</button>
            </div>
            
            <div className="p-10">
              <div className="flex justify-between items-end mb-10">
                <div>
                  <h2 className="text-3xl font-black text-white mb-2">Scan Report</h2>
                  <p className="text-white/40 text-xs font-bold uppercase tracking-widest">Integrity Check: <span className="text-red-500">Compromised</span></p>
                </div>
                <div className="text-right">
                  <div className="text-5xl font-black text-red-600 tracking-tighter italic">FLAGGED</div>
                </div>
              </div>

              <div className="space-y-3">
                <DetectionRow label="SysMain Service" value="DISABLED" detail="Manual shutdown detected. Prefetch logging stopped." />
                <DetectionRow label="Registry Strings" value="MATCH FOUND" detail="Detected 'Zeno.exe' and 'Trinity' hooks in shellbags." />
                <DetectionRow label="Log Integrity" value="FAIL" detail="Manual deletion of Roblox Event logs detected." />
                <DetectionRow label="Unsigned Binaries" value="4 DETECTED" detail="Found Trinity.exe renamed as 'bootstrapper.exe'." />
              </div>

              <button 
                onClick={() => setIsSimulating(false)} 
                className="w-full mt-10 bg-red-600 hover:bg-red-500 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-lg shadow-red-600/20 transition transform active:scale-[0.98]"
              >
                Terminate Session
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- Internal Components ---

function NavItem({ icon, label, active }: any) {
  return (
    <div className={`flex items-center gap-4 px-5 py-4 rounded-2xl cursor-pointer transition-all duration-300 text-sm font-bold ${active ? 'bg-[#1ed760]/10 text-[#1ed760] shadow-inner shadow-[#1ed760]/5' : 'text-white/20 hover:text-white hover:bg-white/5'}`}>
      <span className={active ? "scale-110 transition-transform" : ""}>{icon}</span>
      {label}
    </div>
  );
}

function StatCard({ count, label, sub }: any) {
  return (
    <div className="bg-[#12161c] border border-white/5 p-8 rounded-[2rem] flex flex-col gap-1 hover:border-[#1ed760]/20 transition-colors group">
      <div className="text-5xl font-black text-white group-hover:text-[#1ed760] transition-colors">{count}</div>
      <div className="text-sm font-black text-white/80 uppercase tracking-wider mt-2">{label}</div>
      <div className="text-xs text-white/20 font-bold uppercase tracking-widest">{sub}</div>
    </div>
  );
}

function DetectionRow({ label, value, detail }: any) {
  return (
    <div className="flex justify-between items-center bg-white/[0.02] p-5 rounded-2xl border border-white/5 hover:bg-red-500/5 hover:border-red-500/20 transition-all">
      <div>
        <div className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-1">{label}</div>
        <div className="text-xs text-white/60 font-bold">{detail}</div>
      </div>
      <div className="text-red-500 font-mono font-black text-sm tracking-tighter bg-red-500/10 px-3 py-1 rounded-md">{value}</div>
    </div>
  );
}

// --- Icons ---
function GridIcon() { return <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="6" height="6" rx="1.5" /><rect x="15" y="3" width="6" height="6" rx="1.5" /><rect x="3" y="15" width="6" height="6" rx="1.5" /><rect x="15" y="15" width="6" height="6" rx="1.5" /></svg>; }
function PinIcon() { return <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2v8m0 0l4 4m-4-4l-4 4" strokeLinecap="round" strokeLinejoin="round"/></svg>; }
function ShieldIcon() { return <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>; }
function ZapIcon() { return <svg width="16" height="16" fill="currentColor"><path d="M11 1l-9 11h8l-2 9 11-11h-8l2-9z" /></svg>; }
function RefreshIcon() { return <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3"><path d="M1 4v3h3M13 10v-3h-3M2.5 10a5 5 0 008.5 2M11.5 4a5 5 0 00-8.5-2" strokeLinecap="round" strokeLinejoin="round" /></svg>; }
function ResultsIcon() { return <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3"><path d="M4 10l3 3 7-7M1 1v12h12" strokeLinecap="round" strokeLinejoin="round" /></svg>; }
