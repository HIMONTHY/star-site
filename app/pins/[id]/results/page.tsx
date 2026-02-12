"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ResultsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [results, setResults] = useState(null);
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

  if (!results) return <div className="flex items-center justify-center h-screen text-gray-500 bg-[#0a0d11]">Loading...</div>;

  return (
    <main className="min-h-screen text-white bg-[#0a0d11] relative">
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-12 grid gap-8 md:grid-cols-[240px_1fr]">
        <aside className="rounded-2xl border border-white/10 bg-[#0f141b]/75 p-4 h-fit backdrop-blur">
          <div className="space-y-1">
            <TabItem label="Roblox Accounts" isActive={activeTab === "accounts"} onClick={() => setActiveTab("accounts")} />
            <TabItem label="System Security" isActive={activeTab === "security"} onClick={() => setActiveTab("security")} />
            <TabItem label="System Analysis" isActive={activeTab === "analysis"} onClick={() => setActiveTab("analysis")} />
            <TabItem label="Additional Details" isActive={activeTab === "details"} onClick={() => setActiveTab("details")} />
          </div>
        </aside>

        <section>
          <h1 className="text-3xl font-bold mb-8">Scan results <span className="text-blue-400 text-sm uppercase font-mono ml-2">{id}</span></h1>
          
          <div className="space-y-6">
            {activeTab === "accounts" && (
              <ResultCard title="Roblox Accounts">
                <div className="space-y-4">
                  {results.robloxAccounts && results.robloxAccounts.length > 0 ? (
                    results.robloxAccounts.map((acc, idx) => (
                      <div key={idx} className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-black rounded-lg border border-white/10 shadow-lg" />
                        <div>
                          <p className="text-blue-400 font-bold text-sm">{acc.username}</p>
                          <a href={acc.profile} target="_blank" className="text-[10px] text-white/40 hover:text-blue-300 transition">{acc.profile}</a>
                        </div>
                      </div>
                    ))
                  ) : <p className="text-white/40">N/A</p>}
                </div>
              </ResultCard>
            )}

            {activeTab === "security" && (
              <>
                <ResultCard title="Roblox Logs (Flags)">
                  <pre className="text-[12px] text-blue-100/70 font-mono whitespace-pre-wrap">{results.robloxLogs || "Clean."}</pre>
                </ResultCard>
                <ResultCard title="System Integrity">
                  <pre className="text-[12px] text-white/50 font-mono">{results.factoryReset}</pre>
                </ResultCard>
              </>
            )}

            {activeTab === "analysis" && (
              <ResultCard title="Cheat Scan">
                <pre className="text-[12px] text-white/50 font-mono">{results.cheatScan}</pre>
              </ResultCard>
            )}

            {activeTab === "details" && (
              <ResultCard title="Unsigned Executables">
                <pre className="text-[12px] text-blue-100/70 font-mono whitespace-pre-wrap">{results.unsignedExecutables}</pre>
              </ResultCard>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

function TabItem({ label, isActive, onClick }) {
  return (
    <div onClick={onClick} className={`px-4 py-3 rounded-xl cursor-pointer border transition text-sm ${isActive ? "bg-blue-500/15 border-blue-500/30 text-blue-200" : "border-transparent text-white/60 hover:bg-white/5"}`}>
      {label}
    </div>
  );
}

function ResultCard({ title, children }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0f141b]/75 p-6 backdrop-blur">
      <h3 className="text-white font-semibold mb-4">{title}</h3>
      <div className="bg-black/30 border border-white/5 rounded-xl p-5">{children}</div>
    </div>
  );
}
