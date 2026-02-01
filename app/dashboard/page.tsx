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

  // --- Trinity Simulation State ---
  const [isSimulating, setIsSimulating] = useState(false);
  const [simStep, setSimStep] = useState(0);

  const simLines = [
    "> Initializing Trinity Protocol...",
    "> Bypassing neural buffers...",
    "> Injecting Star Mac sequence...",
    "> Synchronizing global state...",
    "> Simulation Complete. Trinity Active."
  ];

  // Logic for the simulation "typing" effect
  useEffect(() => {
    if (isSimulating && simStep < simLines.length) {
      const timer = setTimeout(() => setSimStep(s => s + 1), 800);
      return () => clearTimeout(timer);
    }
  }, [isSimulating, simStep]);

  const handleSimulateTrinity = () => {
    setIsSimulating(true);
    setSimStep(0);
  };
  // --------------------------------

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
      
      {/* ===== TRINITY SIMULATION MODAL ===== */}
      {isSimulating && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-6">
          <div className="w-full max-w-lg rounded-2xl border border-blue-500/50 bg-[#0f141b] p-8 shadow-[0_0_50px_rgba(59,130,246,0.3)]">
            <div className="flex items-center gap-2 mb-6 text-blue-400 font-mono">
              <ZapIcon />
              <span className="font-bold tracking-widest uppercase text-sm">Trinity Simulation Engine</span>
            </div>
            
            <div className="space-y-2 font-mono text-sm min-h-[120px]">
              {simLines.slice(0, simStep).map((line, i) => (
                <div key={i} className="text-blue-100/80 animate-in fade-in slide-in-from-left-2">
                  {line}
                </div>
              ))}
              {simStep < simLines.length && (
                <div className="h-4 w-2 bg-blue-400 animate-pulse inline-block align-middle ml-1" />
              )}
            </div>

            {simStep === simLines.length && (
              <button 
                onClick={() => setIsSimulating(false)}
                className="mt-8 w-full rounded-xl bg-blue-500 py-3 font-bold text-black hover:bg-blue-400 transition transform active:scale-95"
              >
                CLOSE TERMINAL
              </button>
            )}
          </div>
        </div>
      )}

      {/* ===== BACKGROUND & NAVIGATION ===== */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -bottom-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[160px]" />
        <div className="grid-move absolute inset-0 opacity-[0.13] [background-image:linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:70px_70px]" />
      </div>

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
        </div>
      </div>

      {/* ===== MAIN LAYOUT ===== */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-8 grid gap-6 md:grid-cols-[240px_1fr]">
        <aside className="rounded-2xl border border-white/10 bg-[#0f141b]/75 backdrop-blur p-4 h-fit shadow-2xl">
          <div className="text-xs tracking-widest text-white/40 px-3 pb-3 uppercase">Menu</div>
          <SidebarItem label="Dashboard" icon={<GridIcon />} active />
          
          {/* TRIGGER BUTTON */}
          <SidebarItem 
            label="Simulate Trinity" 
            icon={<ZapIcon />} 
            onClick={handleSimulateTrinity}
          />
          
          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="flex items-center gap-3 rounded-xl px-4 py-3 text-white/70 hover:bg-white/5 transition cursor-pointer">
              <SupportIcon /> Support
            </div>
          </div>
        </aside>

        <section>
          <h1 className="text-3xl font-bold">My Pins</h1>
          {/* Table and stats would go here as per your original layout */}
        </section>
      </div>
    </main>
  );
}

// ... rest of your SidebarItem, Badge, and Icon components
