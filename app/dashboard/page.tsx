"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

// --- TYPES ---
type PinRow = {
  id: string;
  pin: string;
  createdAt: string;
  hasResults: boolean;
  results?: any; 
};

export default function DashboardPage() {
  const router = useRouter();
  const [pins, setPins] = useState<PinRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [latest, setLatest] = useState<PinRow | null>(null);
  const [copied, setCopied] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [activeResults, setActiveResults] = useState<PinRow | null>(null);

  // 1. Auth Check
  useEffect(() => {
    const hasLogin = document.cookie.includes("star_user=true");
    if (!hasLogin) {
      router.push("/access-denied");
    } else {
      setLoggedIn(true);
    }
  }, [router]);

  // 2. Data Fetching
  async function loadPins() {
    try {
      const res = await fetch("/api/pins", { cache: "no-store" });
      const data = await res.json();
      const list = data.pins || [];
      setPins(list);
      if (list.length > 0) setLatest(list[0]);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  }

  // 3. Polling Logic
  useEffect(() => {
    loadPins();
    const interval = setInterval(loadPins, 4000);
    return () => clearInterval(interval);
  }, []);

  // 4. Actions
  async function generatePin() {
    setLoading(true);
    await fetch("/api/pins", { method: "POST" });
    await loadPins();
    setLoading(false);
  }

  async function copy(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }

  // 5. Computed Stats
  const stats = useMemo(() => {
    const total = pins.length;
    const finished = pins.filter((p) => p.hasResults).length;
    return { total, pending: total - finished, finished };
  }, [pins]);

  return (
    <main className="min-h-screen text-white relative overflow-hidden bg-[#0a0d11]">
      {/* BACKGROUND EFFECTS */}
      <div className="pointer-events-none absolute inset-0">
        <div className="glow-blob absolute -top-20 -left-20 h-80 w-80 bg-blue-600/10 blur-[120px]" />
        <div className="grid-move absolute inset-0 opacity-[0.1] [background-image:linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:60px_60px]" />
        <Particles />
      </div>

      {/* TOP NAV */}
      <nav className="relative z-20 sticky top-0 border-b border-white/10 bg-black/60 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl border border-white/10 bg-white/5 grid place-items-center">
              <span className="text-blue-400 font-bold">S</span>
            </div>
            <div className="text-lg font-bold tracking-tight">Star <span className="text-blue-400">Dashboard</span></div>
          </div>
          <div className="flex items-center gap-4">
             {loggedIn && <a href="/api/auth/logout" className="text-sm font-medium opacity-70 hover:opacity-100 transition">Logout</a>}
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-8 grid gap-6 md:grid-cols-[240px_1fr]">
        <aside className="space-y-2">
          <SidebarItem label="Dashboard" icon={<GridIcon />} active />
          <SidebarItem label="My Pins" icon={<PinIcon />} />
        </aside>

        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Overview</h1>
            <button 
              onClick={generatePin} 
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-400 text-black px-6 py-2 rounded-xl font-bold transition disabled:opacity-50 shadow-lg shadow-blue-500/10"
            >
              {loading ? "Generating..." : "Generate Pin"}
            </button>
          </div>

          {/* LATEST PIN DISPLAY */}
          {latest && (
            <div className="p-6 rounded-2xl border border-blue-500/20 bg-blue-500/5 backdrop-blur-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase text-blue-400 tracking-widest mb-1">Active Pin</p>
                <div className="text-3xl font-mono tracking-tighter">{latest.pin}</div>
              </div>
              <button onClick={() => copy(latest.pin)} className="bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg border border-white/10 transition">
                {copied ? "Copied!" : "Copy PIN"}
              </button>
            </div>
          )}

          {/* STATS */}
          <div className="grid grid-cols-3 gap-4">
            <StatPremium label="Total" value={stats.total} />
            <StatPremium label="Pending" value={stats.pending} />
            <StatPremium label="Finished" value={stats.finished} />
          </div>

          {/* TABLE */}
          <div className="rounded-2xl border border-white/10 bg-[#0f141b]/80 backdrop-blur-sm overflow-hidden">
             <table className="w-full text-left">
               <thead className="bg-white/5 text-xs text-white/40 uppercase font-bold">
                 <tr>
                   <th className="px-6 py-4">Pin</th>
                   <th className="px-6 py-4">Status</th>
                   <th className="px-6 py-4">Action</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                 {pins.map((p) => (
                   <tr key={p.id} className="hover:bg-white/[0.02]">
                     <td className="px-6 py-4 font-mono text-blue-300">{p.pin}</td>
                     <td className="px-6 py-4">
                        <Badge tone={p.hasResults ? "good" : "neutral"}>
                          {p.hasResults ? "Finished" : "Pending"}
                        </Badge>
                     </td>
                     <td className="px-6 py-4">
                        {p.hasResults ? (
                          <button 
                            onClick={() => setActiveResults(p)}
                            className="text-blue-400 font-bold hover:underline"
                          >
                            View Results
                          </button>
                        ) : "—"}
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
          </div>
        </section>
      </div>

      {/* MODAL */}
      {activeResults && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#0f141b] border border-white/10 w-full max-w-2xl rounded-2xl p-6 shadow-2xl">
            <h2 className="text-xl font-bold mb-4">Results for {activeResults.pin}</h2>
            <pre className="bg-black/50 p-4 rounded-xl overflow-auto max-h-96 text-xs font-mono text-blue-100/70 border border-white/5">
              {JSON.stringify(activeResults.results || { status: "Scan complete." }, null, 2)}
            </pre>
            <button 
              onClick={() => setActiveResults(null)}
              className="mt-6 w-full py-3 bg-zinc-800 hover:bg-zinc-700 rounded-xl font-bold transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

// --- SUBCOMPONENTS ---

function SidebarItem({ label, icon, active }: { label: string; icon: any; active?: boolean }) {
  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium cursor-pointer transition ${active ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'text-white/50 hover:bg-white/5'}`}>
      {icon} {label}
    </div>
  );
}

function StatPremium({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-[#0f141b]/80 border border-white/10 p-5 rounded-2xl">
      <div className="text-xs font-bold text-white/40 uppercase mb-1">{label}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );
}

function Badge({ tone, children }: { tone: "good" | "neutral"; children: any }) {
  const color = tone === "good" ? "bg-blue-500/10 text-blue-400 border-blue-500/20" : "bg-white/5 text-white/40 border-white/10";
  return <span className={`px-2 py-1 rounded-md text-[10px] font-bold border uppercase ${color}`}>{children}</span>;
}

function Particles() {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-20">
      {[...Array(20)].map((_, i) => (
        <div 
          key={i} 
          className="absolute bg-blue-400 rounded-full blur-sm animate-pulse" 
          style={{
            width: Math.random() * 4 + 'px',
            height: Math.random() * 4 + 'px',
            top: Math.random() * 100 + '%',
            left: Math.random() * 100 + '%',
          }} 
        />
      ))}
    </div>
  );
}

function GridIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>; }
function PinIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>; }
