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
    return <div className="flex items-center justify-center h-screen text-gray-500">Loading scan results...</div>;
  }

  return (
    <div className="flex flex-col md:flex-row gap-8 max-w-[1200px] mx-auto py-12 px-6">
      
      {/* 1. LEFT NAVIGATION SIDEBAR */}
      <aside className="w-full md:w-60 flex flex-col gap-2">
        <div className="bg-[#111418] border border-[#1f242c] rounded-xl p-4">
          <div className="flex items-center gap-3 p-3 bg-[#2f81f71a] text-white rounded-lg cursor-pointer border border-[#2f81f733]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2f81f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            <span className="text-sm font-medium">Dashboard</span>
          </div>
          <div className="flex items-center gap-3 p-3 text-gray-400 hover:text-white transition cursor-pointer mt-1">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3-3.5 3.5z"></path></svg>
            <span className="text-sm font-medium">My Pins</span>
          </div>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1">
        
        <div className="mb-8">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-1 text-xs text-gray-500 hover:text-blue-400 mb-4 transition"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            My Pins
          </button>
          <h1 className="text-3xl font-bold text-white mb-1">Scan results</h1>
          <p className="text-xs text-gray-500 font-mono">ID: {id}</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Sub-Navigation */}
          <div className="w-full lg:w-56 flex flex-col gap-1">
            <TabItem 
              label="Roblox Accounts" 
              isActive={activeTab === "accounts"} 
              onClick={() => setActiveTab("accounts")} 
            />
            <TabItem 
              label="System Security" 
              isActive={activeTab === "security"} 
              onClick={() => setActiveTab("security")} 
            />
            <TabItem 
              label="System Analysis" 
              isActive={activeTab === "analysis"} 
              onClick={() => setActiveTab("analysis")} 
            />
            <TabItem 
              label="Additional Details" 
              isActive={activeTab === "details"} 
              onClick={() => setActiveTab("details")} 
            />
          </div>

          {/* Result Cards */}
          <div className="flex-1 space-y-6">
            {activeTab === "accounts" && (
              <ResultCard title="Roblox Accounts">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-800 rounded-lg flex-shrink-0 bg-gradient-to-br from-gray-700 to-black border border-gray-700" />
                  <div>
                    <p className="text-[#2f81f7] font-bold text-sm leading-tight">
                      {results.robloxAccount?.username || "Unknown"}
                    </p>
                    <p className="text-[10px] text-gray-500 break-all mt-1">
                      {results.robloxAccount?.profile}
                    </p>
                  </div>
                </div>
              </ResultCard>
            )}

            {activeTab === "security" && (
              <>
                <ResultCard title="Roblox Logs (Flags)">
                  <pre className="text-[12px] leading-relaxed text-blue-100/80 font-mono whitespace-pre-wrap">
                    {results.robloxLogs || "No flags found."}
                  </pre>
                </ResultCard>
                <ResultCard title="System Information">
                  <pre className="text-[12px] text-gray-400 font-mono">{results.factoryReset}</pre>
                </ResultCard>
              </>
            )}

            {activeTab === "analysis" && (
              <ResultCard title="Cheat Scan">
                <pre className="text-[12px] text-gray-400 font-mono">{results.cheatScan}</pre>
              </ResultCard>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function TabItem({ label, isActive, onClick }: any) {
  return (
    <div 
      onClick={onClick}
      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all border ${
        isActive 
        ? "bg-[#2f81f71a] text-[#2f81f7] border-[#2f81f733]" 
        : "text-gray-400 border-transparent hover:text-white hover:bg-[#161b22]"
      }`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}

function ResultCard({ title, children }: any) {
  return (
    <div className="bg-[#111418] border border-[#1f242c] rounded-xl p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="bg-[#2f81f71a] text-[#2f81f7] p-2 rounded-lg border border-[#2f81f733]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
        </div>
        <h3 className="text-white font-semibold text-base">{title}</h3>
      </div>
      <div className="bg-[#0b0d10] border border-[#1f242c] rounded-lg p-4">
        {children}
      </div>
    </div>
  );
}
