"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

type PinRow = {
  id: string;
  pin: string;
  createdAt: string;
  hasResults: boolean;
  results?: any; // Added for the modal data
};

export default function DashboardPage() {
  const router = useRouter();
  const [pins, setPins] = useState<PinRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [latest, setLatest] = useState<PinRow | null>(null);
  const [copied, setCopied] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  // STEP 2 — Modal State
  const [activeResults, setActiveResults] = useState<PinRow | null>(null);

  // STEP 3 — Functions
  function openResults(pin: PinRow) {
    setActiveResults(pin);
  }

  function closeResults() {
    setActiveResults(null);
  }

  const loadPins = useCallback(async () => {
    try {
      const res = await fetch("/api/pins", { cache: "no-store" });
      const data = await res.json();
      const list = data.pins || [];
      setPins(list);
      setLatest(list[0] || null);
    } catch (err) {
      console.error("Failed to load pins", err);
    }
  }, []);

  useEffect(() => {
    const hasLogin = document.cookie.includes("star_user=true");
    if (!hasLogin) {
      router.push("/access-denied");
    } else {
      setLoggedIn(true);
    }
  }, [router]);

  useEffect(() => {
    loadPins();
    const t = setInterval(loadPins, 4000); // Updated to 4s to match UI text
    return () => clearInterval(t);
  }, [loadPins]);

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

  const stats = useMemo(() => {
    const total = pins.length;
    const finished = pins.filter((p) => p.hasResults).length;
    const pending = total - finished;
    return { total, pending, finished };
  }, [pins]);

  return (
    <main className="min-h-screen text-white relative overflow-hidden bg-[#0a0d11]">
      {/* BACKGROUND ELEMENTS */}
      <div className="pointer-events-none absolute inset-0">
        <div className="glow-blob" />
        <div className="absolute -bottom-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[160px]" />
        <div className="grid-move absolute inset-0 opacity-[0.13] [background-image:linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:70px_70px]" />
        <Particles />
      </div>

      {/* TOP NAV */}
      <div className="relative z-10 sticky top-0 border-b border-white/10 bg-black/55 backdrop-blur">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl border border-white/10 bg-white/5 grid place-items-center">
              <span className="text-blue-300 font-bold">S</span>
            </div>
            <div className="text-lg font-semibold tracking-wide">Star Dashboard</div>
          </div>
          <div className="flex gap-4 items-center">
            {loggedIn ? (
              <a href="/api/auth/logout" className="text-sm opacity-70 hover:opacity-100 transition">Sign out</a>
            ) : (
              <a href="/api/auth/login" className="text-sm bg-indigo-500 px-4 py-2 rounded-lg">Login</a>
            )}
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-8 grid gap-6 md:grid-cols-[240px_1fr]">
        {/* SIDEBAR */}
        <aside className="rounded-2xl border border-white/10 bg-[#0f141b]/75 backdrop-blur p-4 h-fit">
          <SidebarItem label="Dashboard" icon={<GridIcon />} active />
          <SidebarItem label="My Pins" icon={<PinIcon />} />
          <div className="mt-4 pt-4 border-t border-white/10">
            <a href="#" className="flex items-center gap-3 px-4 py-2 opacity-60"><SupportIcon /> Support</a>
          </div>
        </aside>

        {/* MAIN SECTION */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">My Pins</h1>
            <button
              onClick={generatePin}
              disabled={loading}
              className="rounded-xl bg-blue-500 px-5 py-2 font-semibold text-black hover:opacity-90 disabled:opacity-50"
            >
              {loading ? "Creating..." : "+ Create Pin"}
            </button>
          </div>

          {/* TABLE */}
          <div className="rounded-2xl border border-white/10 bg-[#0f141b]/75 backdrop-blur p-6 shadow-xl">
            <div className="grid grid-cols-4 text-sm text-white/50 pb-3 border-b border-white/10 mb-4">
              <div>Pin</div>
              <div>Status</div>
              <div>Created</div>
              <div className="text-right">Results</div>
            </div>

            <div className="divide-y divide-white/10">
              {pins.length === 0 ? (
                <div className="py-10 text-center text-white/60">No pins yet.</div>
              ) : (
                pins.map((p) => (
                  <div key={p.id} className="grid grid-cols-4 py-4 text-sm items-center hover:bg-white/5 transition px-2 rounded-lg">
                    <div className="font-mono text-blue-300">{p.pin}</div>
                    <div>
                      <Badge tone={p.hasResults ? "good" : "neutral"}>
                        {p.hasResults ? "Finished" : "Pending"}
                      </Badge>
                    </div>
                    <div className="text-white/50">{new Date(p.createdAt).toLocaleTimeString()}</div>
                    
                    {/* STEP 1 — Update your dashboard table */}
                    <div className="text-right">
                      {p.hasResults ? (
                        <button
                          className="results-btn"
                          onClick={() => openResults(p)}
                        >
                          Results
                        </button>
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

      {/* STEP 3 — Popup UI */}
      {activeResults && (
        <div className="results-overlay">
          <div className="results-modal">
            <h2 className="text-xl font-bold mb-4">Scan Results — {activeResults.pin}</h2>
            <pre className="bg-black/50 p-4 rounded-lg overflow-auto max-h-[50vh] text-xs font-mono mb-6 border border-white/5">
              {JSON.stringify(activeResults.results || { status: "No data available" }, null, 2)}
            </pre>
            <div className="flex justify-end">
              <button 
                className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition"
                onClick={closeResults}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

/* UI COMPONENTS (Badge, SidebarItem, Icons, etc remain as before) */
function Badge({ tone, children }: { tone: "good" | "neutral"; children: React.ReactNode }) {
  const cls = tone === "good" ? "border-blue-500/30 bg-blue-500/10 text-blue-200" : "border-white/15 bg-white/5 text-white/75";
  return <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${cls}`}>{children}</span>;
}

function SidebarItem({ label, icon, active }: { label: string; icon?: any; active?: boolean }) {
  return (
    <div className={`mb-2 rounded-xl px-4 py-3 font-semibold flex items-center gap-3 ${active ? "bg-blue-500/15 text-blue-200" : "opacity-60"}`}>
      {icon} {label}
    </div>
  );
}

function Particles() {
  return <div className="absolute inset-0 opacity-20"><div className="absolute top-10 left-10 w-2 h-2 bg-white rounded-full blur-sm animate-pulse" /></div>;
}

function GridIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>; }
function PinIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>; }
function SupportIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>; }
