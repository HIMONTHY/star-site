"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// --- TYPES FOR BUILD SUCCESS ---
interface RobloxAccount {
  username: string;
  profile: string;
}

interface ScanResults {
  factoryReset: string;
  cheatScan: string;
  unsignedExecutables: string;
  robloxAccounts: RobloxAccount[];
  robloxLogs: string;
}

export default function ResultsPage() {
  const { id } = useParams();
  const router = useRouter();
  
  // Define state with the ScanResults type to fix the 'never' error
  const [results, setResults] = useState<ScanResults | null>(null);
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
    return <div className="flex items-center justify-center h-screen text-gray-500 bg-[#0a0d11]">Loading scan results...</div>;
  }

  return (
    <main className="min-h-screen text-white relative overflow-hidden bg-[#0a0d11]">
      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -bottom-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[160px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.6)_55%,rgba(0,0,0,0.95)_100%)]" />
        <div className="grid-move absolute inset-0 opacity-[0.13] [background-image:linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:70px_70px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-12 grid gap-8 md:grid-cols-[240px_1fr]">
        {/* Sidebar */}
        <aside className="rounded-2xl border border-white/10 bg-[#0f141b]/75 backdrop-blur p-4 h-fit shadow-[0_30px_120px_rgba(0,0,0,0.45)]">
          <div className="text-xs tracking-widest text-white/40 px-3 pb-3 uppercase">Menu</div>
          <div className="space-y-1">
            <TabItem label="Roblox Accounts" isActive={activeTab === "accounts"} onClick={() => setActiveTab("accounts")} />
            <TabItem label="System Security" isActive={activeTab === "security"} onClick={() => setActiveTab("security")} />
            <TabItem label="System Analysis" isActive={activeTab === "analysis"} onClick={() => setActiveTab("analysis")} />
            <TabItem label="Additional Details" isActive={activeTab === "details"} onClick={() => setActiveTab("details")} />
          </div>
          <div className="mt-4 pt-4 border-t border-white/10">
             <button onClick={() => router.push('/dashboard')} className="flex items-center gap-3 w-full rounded-xl px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 border border-white/10 transition">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              Back to Home
            </button>
          </div>
        </aside>

        {/* Content Area */}
        <section>
          <div className="mb-8">
            <button onClick={() => router.back()} className="flex items-center gap-1 text-xs text-white/50 hover:text-blue-400 mb-4 transition">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
              My Pins
            </button>
            <h1 className="text-3xl font-bold">Scan results</h1>
            <p className="mt-1 text-white/60">ID: <span className="font-mono text-blue-300 uppercase">{id}</span></p>
          </div>

          <div className="space-y-6">
            {activeTab === "accounts" && (
              <ResultCard title="Roblox Accounts">
                <div className="space-y-4">
                  {results.robloxAccounts && results.robloxAccounts.length > 0 ? (
                    results.robloxAccounts.map((acc, idx) => (
                      <div key={idx} className="flex items-center gap-4 p-2 rounded-lg border border-white/5 bg-white/5">
                        <div className="w-12 h-12 bg-gray-800 rounded-lg flex-shrink-0 bg-gradient-to-br from-gray-700 to-black border border-white/10 shadow-lg" />
                        <div>
                          <p className="text-blue-400 font-bold text-sm leading-tight">{acc.username}</p>
                          <a href={acc.profile} target="_blank" rel="noreferrer" className="text-[10px] text-white/40 break-all mt-1 hover:text-blue-300 transition">
                            {acc.profile}
                          </a>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-white/40 text-sm">No accounts detected in logs.</p>
                  )}
                </div>
              </ResultCard>
            )}

            {activeTab === "security" && (
              <>
                <ResultCard title="Roblox Logs (Flags)">
                  <pre className="text-[12px] leading-relaxed text-blue-100/70 font-mono whitespace-pre-wrap">{results.robloxLogs || "Clean scan — No flags."}</pre>
                </ResultCard>
                <ResultCard title="System Integrity">
                  <pre className="text-[12px] text-white/50 font-mono whitespace-pre-wrap">{results.factoryReset}</pre>
                </ResultCard>
              </>
            )}

            {activeTab === "analysis" && (
              <ResultCard title="Cheat Scan">
                <pre className="text-[12px] text-white/50 font-mono whitespace-pre-wrap">{results.cheatScan}</pre>
              </ResultCard>
            )}

            {activeTab === "details" && (
              <ResultCard title="Additional Details (Unsigned Executables)">
                <pre className="text-[12px] leading-relaxed text-blue-100/70 font-mono whitespace-pre-wrap">
                  {results.unsignedExecutables || "No additional logs found."}
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
    <div onClick={onClick} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold cursor-pointer border transition ${isActive ? "bg-blue-500/15 border-blue-500/30 text-blue-200 shadow-[0_25px_80px_rgba(59,130,246,0.12)]" : "bg-transparent border-transparent text-white/60 hover:bg-white/5 hover:text-white"}`}>
      <span className="text-sm">{label}</span>
    </div>
  );
}

function ResultCard({ title, children }: any) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0f141b]/75 backdrop-blur p-6 shadow-[0_30px_120px_rgba(0,0,0,0.45)]">
      <div className="flex items-center gap-3 mb-5">
        <div className="bg-blue-500/10 text-blue-400 p-2 rounded-lg border border-blue-500/20">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
        </div>
        <h3 className="text-white font-semibold text-base">{title}</h3>
      </div>
      <div className="bg-black/30 border border-white/5 rounded-xl p-5">{children}</div>
    </div>
  );
}
