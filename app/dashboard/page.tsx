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

  const [isSimulating, setIsSimulating] = useState(false);

  useEffect(() => {
    const hasLogin = document.cookie.includes("star_user=true");
    if (!hasLogin) router.push("/access-denied");
    else setLoggedIn(true);
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
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  }

  useEffect(() => {
    loadPins();
    const t = setInterval(loadPins, 4000);
    return () => clearInterval(t);
  }, []);

  const stats = useMemo(() => {
    const total = pins.length;
    const finished = pins.filter(p => p.hasResults).length;
    return { total, finished, pending: total - finished };
  }, [pins]);

  return (
    <main className="min-h-screen text-white bg-[#0a0d11] relative overflow-hidden">

{/* ===== BLUE TRINITY RESULTS ===== */}
{isSimulating && (
<div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl p-8 flex flex-col">

<div className="flex justify-between mb-6">
<h2 className="text-2xl font-bold text-blue-200">Trinity Results</h2>
<button
onClick={() => setIsSimulating(false)}
className="rounded-lg bg-blue-500/20 border border-blue-500/30 px-4 py-2 hover:bg-blue-500/30 transition"
>
Close ✕
</button>
</div>

<div className="relative rounded-2xl border border-blue-500/30 bg-blue-500/10 backdrop-blur p-6 shadow-[0_0_120px_rgba(59,130,246,0.25)]">

<div className="absolute inset-0 rounded-2xl blur-[140px] bg-blue-500/20 -z-10" />

<div className="flex justify-between mb-4">
<input
placeholder="Search by pin..."
className="rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-200 px-4 py-2 outline-none w-64"
/>

<button
onClick={loadPins}
className="rounded-lg bg-blue-500/15 border border-blue-500/30 px-4 py-2 hover:bg-blue-500/25 transition"
>
🔄 Refresh
</button>
</div>

<div className="grid grid-cols-4 text-sm text-blue-200/60 pb-3 border-b border-blue-500/20">
<div>Pin</div>
<div>Status</div>
<div>Used</div>
<div className="text-right">Result</div>
</div>

<div className="divide-y divide-blue-500/20">

{pins.map(p => (
<div key={p.id}
className="grid grid-cols-4 py-4 items-center text-sm hover:bg-blue-500/10 transition rounded-lg px-1">

<div className="font-mono tracking-widest text-blue-300">
{p.pin}
</div>

<div>
{p.hasResults ? (
<Badge tone="good">Finished</Badge>
) : (
<Badge tone="neutral">Pending</Badge>
)}
</div>

<div className="text-blue-200/60">
{p.hasResults ? new Date(p.createdAt).toLocaleString() : "—"}
</div>

<div className="flex justify-end">
{p.hasResults ? (
<button className="text-blue-400 hover:underline flex items-center gap-1">
Results ↗
</button>
) : (
<span className="text-blue-200/40">—</span>
)}
</div>

</div>
))}

</div>
</div>
</div>
)}

{/* ===== TOP BAR ===== */}
<div className="sticky top-0 border-b border-white/10 bg-black/60 backdrop-blur z-10">
<div className="max-w-7xl mx-auto px-6 py-4 flex justify-between">

<div className="font-bold text-lg">
Star <span className="text-blue-400">Dashboard</span>
</div>

<div className="flex gap-2">
<a href="/" className="px-3 py-2 rounded-xl hover:bg-white/5">Home</a>
<a href="/dashboard" className="px-3 py-2 rounded-xl bg-white/5">Dashboard</a>

{loggedIn && (
<a href="/api/auth/logout" className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-white/10">
Sign out
</a>
)}
</div>

</div>
</div>

{/* ===== MAIN ===== */}
<div className="max-w-7xl mx-auto px-6 py-8 grid md:grid-cols-[240px_1fr] gap-6">

<aside className="rounded-2xl border border-white/10 bg-[#0f141b]/80 p-4">

<SidebarItem label="Dashboard" active />
<SidebarItem label="My Pins" onClick={loadPins} />
<SidebarItem label="Simulate Trinity" onClick={() => setIsSimulating(true)} />

</aside>

<section>

<div className="flex justify-between mb-6">
<div>
<h1 className="text-3xl font-bold">My Pins</h1>
<p className="text-white/60">Generate and track pins</p>
</div>

<button
onClick={generatePin}
disabled={loading}
className="bg-blue-500 text-black rounded-xl px-5 py-2 font-semibold hover:opacity-90"
>
{loading ? "Creating..." : "+ Create Pin"}
</button>
</div>

{latest && (
<div className="rounded-2xl border border-blue-500/30 bg-blue-500/10 p-5 mb-6">

<div className="text-sm mb-2">Latest PIN:</div>

<div className="flex gap-4 items-center">

<div className="font-mono text-2xl tracking-widest text-blue-300">
{latest.pin}
</div>

<button
onClick={() => copy(latest.pin)}
className="bg-black/40 px-4 py-2 rounded-lg border border-white/10"
>
{copied ? "Copied ✅" : "Copy"}
</button>

</div>
</div>
)}

<div className="grid sm:grid-cols-3 gap-4 mb-8">
<StatPremium label="Total Pins" value={stats.total} />
<StatPremium label="Pending" value={stats.pending} />
<StatPremium label="Finished" value={stats.finished} />
</div>

</section>
</div>

</main>
);
}

/* ===== HELPERS ===== */

function SidebarItem({ label, active, onClick }: any) {
return (
<button
onClick={onClick}
className={`w-full mb-2 px-4 py-3 rounded-xl border transition ${
active
? "bg-blue-500/15 border-blue-500/30 text-blue-200"
: "border-white/10 text-white/70 hover:bg-white/5"
}`}
>
{label}
</button>
);
}

function StatPremium({ label, value }: any) {
return (
<div className="rounded-2xl border border-white/10 bg-[#0f141b]/80 p-5">
<div className="text-white/60 text-sm">{label}</div>
<div className="text-2xl font-bold text-blue-200">{value}</div>
</div>
);
}

function Badge({ tone, children }: any) {
const cls = tone === "good"
? "border-blue-500/30 bg-blue-500/10 text-blue-200"
: "border-white/15 bg-white/5 text-white/75";

return (
<span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${cls}`}>
{children}
</span>
);
}
