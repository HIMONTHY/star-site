"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Mock data structure for the result
type ScanResult = {
  id: string;
  pin: string;
  status: string;
  scanTime: string;
  score: number;
  threats: { name: string; status: "clean" | "flagged"; info: string }[];
  systemLogs: string[];
};

export default function ResultsPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [data, setData] = useState<ScanResult | null>(null);

  useEffect(() => {
    // In a real app, you would fetch(api/results/${params.id})
    // For now, let's simulate a high-tech response
    setData({
      id: params.id,
      pin: "HUM7W9",
      status: "COMPLETED",
      scanTime: "2026-01-31 19:21",
      score: 98,
      threats: [
        { name: "Process Integrity", status: "clean", info: "All background tasks verified." },
        { name: "Memory Strings", status: "flagged", info: "Suspicious pattern in heap memory." },
        { name: "Driver Verification", status: "clean", info: "No unsigned drivers detected." },
      ],
      systemLogs: [
        "Initializing Star Mac Core...",
        "Scanning process tree...",
        "Analyzing memory offsets...",
        "Verification successful."
      ]
    });
  }, [params.id]);

  if (!data) return null;

  return (
    <main className="min-h-screen bg-[#0a0d11] text-white p-6 font-sans">
      <div className="mx-auto max-w-5xl">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={() => router.back()}
            className="text-sm text-blue-400 hover:text-blue-300 transition flex items-center gap-2"
          >
            ← Back to Dashboard
          </button>
          <div className="text-right">
            <div className="text-xs text-white/40 uppercase tracking-widest">Report ID</div>
            <div className="text-sm font-mono text-blue-300">{data.id}</div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* OVERVIEW CARD */}
          <div className="md:col-span-2 rounded-2xl border border-white/5 bg-[#0f141b]/80 p-8 backdrop-blur shadow-xl">
            <h1 className="text-2xl font-bold mb-1">Scan Analysis</h1>
            <p className="text-white/40 text-sm mb-6">Detailed integrity report for Pin: <span className="text-blue-400 font-mono">{data.pin}</span></p>
            
            <div className="space-y-4">
              {data.threats.map((threat, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <div>
                    <div className="font-semibold text-sm">{threat.name}</div>
                    <div className="text-xs text-white/40">{threat.info}</div>
                  </div>
                  <div className={`text-[10px] font-bold uppercase px-3 py-1 rounded-full border ${
                    threat.status === 'clean' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'
                  }`}>
                    {threat.status}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SCORE CARD */}
          <div className="rounded-2xl border border-white/5 bg-[#0f141b]/80 p-8 backdrop-blur shadow-xl flex flex-col items-center justify-center text-center">
            <div className="text-xs text-white/40 uppercase tracking-widest mb-4">Security Score</div>
            <div className="relative flex items-center justify-center">
               {/* Simple Radial Progress */}
               <svg className="w-32 h-32 transform -rotate-90">
                <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5" />
                <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={364.4} strokeDashoffset={364.4 - (364.4 * data.score) / 100} className="text-blue-500" />
              </svg>
              <span className="absolute text-3xl font-bold">{data.score}%</span>
            </div>
            <div className="mt-6 text-xs text-blue-400 font-medium">STATUS: {data.status}</div>
          </div>

          {/* SYSTEM LOGS */}
          <div className="md:col-span-3 rounded-2xl border border-white/5 bg-[#0f141b]/80 p-6 backdrop-blur shadow-xl">
            <div className="text-xs text-white/40 uppercase tracking-widest mb-4">Execution Logs</div>
            <div className="bg-black/40 rounded-xl p-4 font-mono text-xs text-blue-200/60 leading-relaxed">
              {data.systemLogs.map((log, i) => (
                <div key={i} className="mb-1">{`[${data.scanTime}] ${log}`}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
