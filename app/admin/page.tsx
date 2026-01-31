"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Row = {
  discordId: string;
  hwid: string | null;
};

export default function AdminPage() {
  const router = useRouter();
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(false);

  // Only allow admins (simple cookie check for now)
  useEffect(() => {
    const ok = document.cookie.includes("star_user=true");
    if (!ok) router.push("/access-denied");
  }, [router]);

  async function loadData() {
    const res = await fetch("/api/admin-hwids");
    const data = await res.json();
    setRows(data.rows || []);
  }

  async function resetHWID(discordId: string) {
    setLoading(true);

    await fetch("/api/hwid-reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        adminId: "1165819222870466583", // YOUR ID
        targetDiscordId: discordId,
      }),
    });

    setLoading(false);
    loadData();
  }

  useEffect(() => {
    loadData();
    const t = setInterval(loadData, 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Admin HWID Panel</h1>

      <div className="rounded-xl border border-white/10 p-6 bg-zinc-900">
        <div className="grid grid-cols-3 text-white/60 pb-3 border-b border-white/10">
          <div>Discord ID</div>
          <div>HWID</div>
          <div>Action</div>
        </div>

        {rows.length === 0 && (
          <div className="py-8 text-white/50 text-center">
            No HWIDs bound yet
          </div>
        )}

        {rows.map((r) => (
          <div
            key={r.discordId}
            className="grid grid-cols-3 py-4 border-b border-white/5 items-center"
          >
            <div className="font-mono text-sm">{r.discordId}</div>

            <div className="text-sm text-blue-300 truncate">
              {r.hwid || "None"}
            </div>

            <button
              disabled={loading}
              onClick={() => resetHWID(r.discordId)}
              className="rounded-lg bg-red-500 px-3 py-2 text-black font-semibold hover:opacity-90 disabled:opacity-50"
            >
              Reset HWID
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
