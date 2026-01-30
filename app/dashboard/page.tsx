"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

type PinRow = {
  id: string;
  pin: string;
  createdAt: string;
  hasResults: boolean;
};

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [pins, setPins] = useState<PinRow[]>([]);
  const [loading, setLoading] = useState(false);

  const username = useMemo(() => {
    const u: any = session?.user;
    return u?.name || "Signed in";
  }, [session]);

  async function loadPins() {
    const res = await fetch("/api/pins", { cache: "no-store" });
    const data = await res.json();
    setPins(data.pins || []);
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
    } catch {}
  }

  useEffect(() => {
    if (status === "authenticated") loadPins();
  }, [status]);

  if (status === "loading") {
    return <div className="min-h-screen bg-black text-white p-10">Loading...</div>;
  }

  if (!session) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <h1 className="text-4xl font-bold">Star Dashboard</h1>
          <p className="mt-3 text-white/70">Sign in with Discord to generate PINs and view results.</p>

          <button
            onClick={() => signIn("discord")}
            className="mt-6 rounded-xl bg-white text-black px-6 py-3 font-semibold hover:opacity-90"
          >
            Sign in with Discord
          </button>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">Dashboard</h1>
          <p className="mt-2 text-white/60">Welcome, {username}</p>
        </div>

        <button onClick={() => signOut()} className="text-white/60 hover:text-white">
          Sign out
        </button>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="mt-8">
        <button
          onClick={generatePin}
          disabled={loading}
          className="rounded-xl bg-white text-black px-6 py-3 font-semibold disabled:opacity-50 hover:opacity-90"
        >
          {loading ? "Generating..." : "Generate PIN"}
        </button>
      </motion.div>

      <div className="mt-10 grid gap-4">
        {pins.length === 0 && <p className="text-white/60">No pins yet. Generate one above.</p>}

        {pins.map((p, idx) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 + idx * 0.05 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 flex flex-wrap gap-4 items-center justify-between"
          >
            <div>
              <div className="text-sm text-white/60">PIN</div>
              <div className="text-3xl font-bold tracking-widest">{p.pin}</div>
              <div className="text-xs text-white/40 mt-1">{new Date(p.createdAt).toLocaleString()}</div>
            </div>

            <div className="flex items-center gap-3">
              <button onClick={() => copy(p.pin)} className="rounded-xl bg-white/10 px-4 py-2 hover:bg-white/15">
                Copy PIN
              </button>

              {p.hasResults ? (
                <a
                  href={`/dashboard/results?pin=${encodeURIComponent(p.pin)}`}
                  className="rounded-xl bg-white px-4 py-2 text-black font-semibold hover:opacity-90"
                >
                  View Results →
                </a>
              ) : (
                <span className="text-white/50">Waiting…</span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
