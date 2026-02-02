"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

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

  // Results Modal State
  const [activeResults, setActiveResults] = useState<PinRow | null>(null);

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

  function openResults(pin: PinRow) {
    setActiveResults(pin);
  }

  function closeResults() {
    setActiveResults(null);
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
      {/* Background markup stays same... */}
      <div className="pointer-events-none absolute inset-0">
        <div className="glow-blob" />
        <div className="absolute -bottom-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[160px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.6)_55%,rgba(0,0,0,0.95)_100%)]" />
        <div className="grid-move absolute inset-0 opacity-[0.13] [background-image:linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:70px_70px]" />
        <Particles />
      </div>

      <div className="relative z-10 sticky top-0 border-b border-white/10 bg-black/55 backdrop-blur">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl border border-white/10 bg-white/5 grid place-items-center">
              <span className="text-blue-300 font-bold">S</span>
            </div>
            <div className="text-lg font-semibold tracking-wide">Star <span className="text-blue-400">Dashboard</span></div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <a href="/" className="rounded-xl px-3 py-2">Home</a>
            <a href="/dashboard" className="rounded-xl px-3 py-2">Dashboard</a>
            {loggedIn ? (
              <a href="/api/auth/logout" className="ml-2 flex items-center gap-2 rounded-xl bg-zinc-800 px-4 py-2 font-semibold text-white border border-white/10">↩ Sign out</a>
            ) : (
              <a href="/api/auth/login" className="ml-2 flex items-center gap-2 rounded-xl bg-indigo-500 px-4 py-2 font-semibold text-white">→ Discord login</a>
            )}
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-8 grid gap-6 md:grid-cols-[240px_1fr]">
        <aside className="rounded-2xl border border-white/10 bg-[#0f141b]/75 backdrop-blur p-4 h-fit shadow-[0_30px_120px_rgba(0,0,0,0.45)]">
          <div className="text-xs tracking-widest text-white/40 px-3 pb-3">MENU</div>
          <SidebarItem label="Dashboard" icon={<GridIcon />} active />
          <SidebarItem label="My Pins" icon={<PinIcon />} />
          <SidebarItem label="Simulate Trinity" icon={<PinIcon />} />
        </aside>

        <section>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold">My Pins</h1>
              <p className="mt-1 text-white/60">Generate pins, track status, and view results.</p>
            </div>
            <button onClick={generatePin} disabled={loading} className="rounded-xl bg-blue-500 px-5 py-2 font-semibold text-black">
              {loading ? "Creating..." : "+ Create Pin"}
            </button>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <StatPremium label="Total Pins" value={stats.total} />
            <StatPremium label="Pending" value={stats.pending} />
            <StatPremium label="Finished" value={stats.finished} />
          </div>

          <div className="mt-8 rounded-2xl border border-white/10 bg-[#0f141b]/75 backdrop-blur p-6 shadow-[0_30px_120px_rgba(0,0,0,0.45)]">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-white/70">Recent pins (auto-refresh every 4s)</div>
              <button onClick={loadPins} className="rounded-lg bg-black/40 px-4 py-2 text-sm border border-white/10">Refresh</button>
            </div>

            {/* HEADER - Kept 4 columns */}
            <div className="grid grid-cols-4 text-sm text-white/50 pb-3 border-b border-white/10">
              <div>Pin</div>
              <div>Status</div>
              <div>Created</div>
              <div>Results</div>
            </div>

            <div className="divide-y divide-white/10">
              {pins.length === 0 ? (
                <div className="py-10 text-center text-white/60">No pins yet.</div>
              ) : (
                pins.map((p) => (
                  <div key={p.id} className="grid grid-cols-4 py-4 text-sm items-center hover:bg-white/5 transition rounded-xl">
                    <div className="font-mono tracking-widest text-blue-300">{p.pin}</div>
                    <div>{p.hasResults ? <Badge tone="good">Finished</Badge> : <Badge tone="neutral">Pending</Badge>}</div>
                    <div className="text-white/55">{new Date(p.createdAt).toLocaleTimeString()}</div>
                    {/* BUTTON ALIGNED WITHIN THE COLUMN */}
                    <div>
                      {p.hasResults ? (
                        <button className="results-btn" onClick={() => openResults(p)}>Results</button>
                      ) : (
                        "—"
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      </div>

      {/* TRINITY MODAL */}
      {activeResults && (
        <div className="results-overlay">
          <div className="results-modal">
            <h2 className="text-xl font-bold mb-4 text-blue-300">Scan Results — {activeResults.pin}</h2>
            <pre className="bg-black/50 p-4 rounded-lg overflow-auto max-h-[50vh] text-xs font-mono mb-4 border border-white/5 text-white/80">
              {JSON.stringify(activeResults.results || { status: "Scan complete." }, null, 2)}
            </pre>
            <div className="flex justify-end">
              <button onClick={closeResults} className="px-6 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg font-semibold transition border border-white/10">Close</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

// Sub-components...
function SidebarItem({ label, icon, active }: { label: string; icon?: React.ReactNode; active?: boolean }) {
  return (
    <div className={`mb-2 rounded-xl px-4 py-3 font-semibold cursor-pointer border transition flex items-center gap-3 ${active ? "bg-blue-500/15 border-blue-500/30 text-blue-200" : "bg-transparent border-white/10 text-white/70"}`}>
      <span className="text-blue-300">{icon}</span> {label}
    </div>
  );
}
function StatPremium({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0f141b]/75 p-5 shadow-[0_30px_120px_rgba(0,0,0,0.45)]">
      <div className="text-sm text-white/60">{label}</div>
      <div className="mt-1 text-2xl font-bold text-blue-200">{value}</div>
    </div>
  );
}
function Badge({ tone, children }: { tone: "good" | "neutral"; children: React.ReactNode }) {
  const cls = tone === "good" ? "border-blue-500/30 bg-blue-500/10 text-blue-200" : "border-white/15 bg-white/5 text-white/75";
  return <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${cls}`}>{children}</span>;
}
function Particles() {
  return <div className="absolute inset-0 opacity-20"><div className="absolute top-10 left-10 w-2 h-2 bg-white rounded-full blur-sm animate-pulse" /></div>;
}
function GridIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>; }
function PinIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>; }
function SupportIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>; }
