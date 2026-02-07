"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ResultsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [results, setResults] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("accounts");

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/results?id=${id}`);
        const data = await res.json();
        setResults(data.results);
      } catch (err) {
        console.error("Failed to load results", err);
      }
    }
    load();
  }, [id]);

  if (!results) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500 bg-[#0a0d11]">
        Loading scan results...
      </div>
    );
  }

  return (
    <main className="min-h-screen text-white relative overflow-hidden bg-[#0a0d11]">
      {/* ===== BACKGROUND EFFECTS ===== */}
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
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-12 grid gap-8 md:grid-cols-[240px_1fr]">
        
        {/* ===== SIDEBAR ===== */}
        <aside className="rounded-2xl border border-white/10 bg-[#0f141b]/75 backdrop-blur p-4 h-fit shadow-[0_30px_120px_rgba(0,0,0,0.45)]">
          <div className="text-xs tracking-widest text-white/40 px-3 pb-3 uppercase">
            Menu
          </div>

          <div className="space-y-1">
            <TabItem label="Roblox Accounts" isActive={activeTab === "accounts"} onClick={() => setActiveTab("accounts")} />
            <TabItem label="System Security" isActive={activeTab === "security"} onClick={() => setActiveTab("security")} />
            <TabItem label="Cheat Analysis" isActive={activeTab === "analysis"} onClick={() => setActiveTab("analysis")} />
            <TabItem label="Unsigned Executables" isActive={activeTab === "unsigned"} onClick={() => setActiveTab("unsigned")} />
          </div>

          <div className="mt-4 pt-4 border-t border-white/10">
            <button
              onClick={() => router.push("/dashboard")}
              className="flex items-center gap-3 w-full rounded-xl px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 border border-white/10 transition"
            >
              ← Back to Home
            </button>
          </div>
        </aside>

        {/* ===== CONTENT ===== */}
        <section>
          <div className="mb-8">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-1 text-xs text-white/50 hover:text-blue-400 mb-4 transition"
            >
              ← My Pins
            </button>

            <h1 className="text-3xl font-bold">Scan Results</h1>
            <p className="mt-1 text-white/60">
              ID: <span className="font-mono text-blue-300 uppercase">{id}</span>
            </p>
          </div>

          <div className="space-y-6">
            {activeTab === "accounts" && (
              <ResultCard title="Roblox Accounts">
                <p className="text-sm text-blue-400 font-bold">
                  {results.robloxAccount?.username || "N/A"}
                </p>
                <p className="text-xs text-white/40 break-all mt-1">
                  {results.robloxAccount?.profile || "No profile data"}
                </p>
              </ResultCard>
            )}

            {activeTab === "security" && (
              <>
                <ResultCard title="System Integrity">
                  <pre className="text-[12px] text-white/50 font-mono whitespace-pre-wrap">
                    {results.factoryReset || "No integrity data"}
                  </pre>
                </ResultCard>
              </>
            )}

            {activeTab === "analysis" && (
              <ResultCard title="Cheat Scan">
                <pre className="text-[12px] text-white/50 font-mono whitespace-pre-wrap">
                  {results.cheatScan || "Clean scan — no cheat indicators found."}
                </pre>
              </ResultCard>
            )}

            {activeTab === "unsigned" && (
              <ResultCard title="Unsigned Executables">
                <pre className="text-[12px] text-red-200/80 font-mono whitespace-pre-wrap">
                  {results.unsignedExecutables || "No unsigned executables detected."}
                </pre>
              </ResultCard>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

function TabItem({ label, isActive, onClick }: any) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold cursor-pointer border transition ${
        isActive
          ? "bg-blue-500/15 border-blue-500/30 text-blue-200"
          : "text-white/60 hover:bg-white/5 hover:text-white"
      }`}
    >
      <span className="text-sm">{label}</span>
    </div>
  );
}

function ResultCard({ title, children }: any) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0f141b]/75 backdrop-blur p-6 shadow-[0_30px_120px_rgba(0,0,0,0.45)]">
      <h3 className="text-white font-semibold mb-4">{title}</h3>
      <div className="bg-black/30 border border-white/5 rounded-xl p-5">
        {children}
      </div>
    </div>
  );
}
