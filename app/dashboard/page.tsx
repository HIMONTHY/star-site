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

  // ✅ NEW TAB STATE
  const [activeTab, setActiveTab] = useState<"dashboard" | "simulate">(
    "dashboard"
  );

  useEffect(() => {
    const hasLogin = document.cookie.includes("star_user=true");

    if (!hasLogin) {
      router.push("/access-denied");
    } else {
      setLoggedIn(true);
    }
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
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    } catch {}
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

      {/* ===== BACKGROUND ===== */}
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
        <Particles />
      </div>

      {/* ===== TOP NAV ===== */}
      <div className="relative z-10 sticky top-0 border-b border-white/10 bg-black/55 backdrop-blur">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">

          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl border border-white/10 bg-white/5 grid place-items-center">
              <span className="text-blue-300 font-bold">S</span>
            </div>
            <div className="text-lg font-semibold">
              Star <span className="text-blue-400">Dashboard</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm">

            <a href="/" className="rounded-xl px-3 py-2 hover:bg-white/5">
              Home
            </a>

            <a href="/dashboard" className="rounded-xl px-3 py-2 hover:bg-white/5">
              Dashboard
            </a>

            {loggedIn ? (
              <a
                href="/api/auth/logout"
                className="ml-2 rounded-xl bg-zinc-800 px-4 py-2 font-semibold border border-white/10 hover:bg-zinc-700"
              >
                ↩ Sign out
              </a>
            ) : (
              <a
                href="/api/auth/login"
                className="ml-2 rounded-xl bg-indigo-500 px-4 py-2 font-semibold text-white"
              >
                → Discord login
              </a>
            )}

          </div>
        </div>
      </div>

      {/* ===== LAYOUT ===== */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-8 grid gap-6 md:grid-cols-[240px_1fr]">

        {/* ===== SIDEBAR ===== */}
        <aside className="rounded-2xl border border-white/10 bg-[#0f141b]/75 p-4">

          <div className="text-xs text-white/40 px-3 pb-3">
            MENU
          </div>

          <SidebarItem
            label="Dashboard"
            icon={<GridIcon />}
            active={activeTab === "dashboard"}
            onClick={() => setActiveTab("dashboard")}
          />

          <SidebarItem
            label="Simulate Trinity"
            icon={<PinIcon />}
            active={activeTab === "simulate"}
            onClick={() => setActiveTab("simulate")}
          />

          <div className="mt-4 pt-4 border-t border-white/10">
            <a
              href="https://discord.gg/rHy3W7Za"
              target="_blank"
              className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-white/5 border border-white/10"
            >
              <SupportIcon />
              Discord Support
            </a>
          </div>

        </aside>

        {/* ===== MAIN ===== */}
        <section>

{/* ================= DASHBOARD TAB ================= */}

{activeTab === "dashboard" && (
<>

          <div className="flex justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold">My Pins</h1>
              <p className="text-white/60">
                Generate pins and track scans.
              </p>
            </div>

            <button
              onClick={generatePin}
              disabled={loading}
              className="rounded-xl bg-blue-500 px-5 py-2 font-semibold text-black"
            >
              {loading ? "Creating..." : "+ Create Pin"}
            </button>
          </div>

          {latest && (
            <div className="rounded-2xl border border-blue-500/30 bg-blue-500/10 p-5 mb-6">

              <div className="text-sm mb-2">
                Latest PIN:
              </div>

              <div className="flex gap-4 items-center">

                <div className="text-2xl font-mono text-blue-300">
                  {latest.pin}
                </div>

                <button
                  onClick={() => copy(latest.pin)}
                  className="rounded-lg bg-black/40 px-4 py-2 text-sm"
                >
                  {copied ? "Copied ✅" : "Copy"}
                </button>

              </div>
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-3 mb-8">
            <StatPremium label="Total Pins" value={stats.total} />
            <StatPremium label="Pending" value={stats.pending} />
            <StatPremium label="Finished" value={stats.finished} />
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0f141b]/75 p-6">

            <div className="grid grid-cols-4 pb-3 border-b border-white/10 text-white/50">
              <div>Pin</div>
              <div>Status</div>
              <div>Created</div>
              <div>Action</div>
            </div>

            <div className="divide-y divide-white/10">

              {pins.map((p) => (
                <div
                  key={p.id}
                  className="grid grid-cols-4 py-4 items-center"
                >

                  <div className="font-mono text-blue-300">
                    {p.pin}
                  </div>

                  <div>
                    {p.hasResults ? (
                      <Badge tone="good">Finished</Badge>
                    ) : (
                      <Badge tone="neutral">Pending</Badge>
                    )}
                  </div>

                  <div className="text-white/55">
                    {new Date(p.createdAt).toLocaleTimeString()}
                  </div>

                  <button
                    onClick={() => copy(p.pin)}
                    className="rounded-lg bg-black/35 px-3 py-2 text-xs"
                  >
                    Copy
                  </button>

                </div>
              ))}

            </div>
          </div>

</>
)}

{/* ================= SIMULATE TAB ================= */}

{activeTab === "simulate" && (
  <div>

    <h1 className="text-3xl font-bold mb-2">
      Simulate Trinity
    </h1>

    <p className="text-white/60 mb-6">
      Test Trinity scan without real users.
    </p>

    <div className="rounded-2xl border border-blue-500/30 bg-blue-500/10 p-6 max-w-xl">

      <div className="text-sm mb-2">
        Simulation Status
      </div>

      <div
        id="sim-status"
        className="text-2xl font-semibold text-blue-300 mb-6"
      >
        Idle
      </div>

      <button
        onClick={() => {
          const el = document.getElementById("sim-status");
          if (!el) return;

          el.innerText = "Running...";
          setTimeout(() => {
            el.innerText = "Finished ✅ (Simulated)";
          }, 2200);
        }}
        className="rounded-xl bg-blue-500 px-6 py-3 font-semibold text-black"
      >
        ▶ Start Simulation
      </button>

    </div>
  </div>
)}

        </section>
      </div>
    </main>
  );
}

/* ===== COMPONENTS ===== */

function SidebarItem({
  label,
  icon,
  active,
  onClick,
}: any) {
  return (
    <div
      onClick={onClick}
      className={[
        "mb-2 rounded-xl px-4 py-3 cursor-pointer flex gap-3 border transition",
        active
          ? "bg-blue-500/15 border-blue-500/30 text-blue-200"
          : "border-white/10 text-white/70 hover:bg-white/5",
      ].join(" ")}
    >
      <span className="text-blue-300">{icon}</span>
      {label}
    </div>
  );
}

function StatPremium({ label, value }: any) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0f141b]/75 p-5">
      <div className="text-sm text-white/60">{label}</div>
      <div className="text-2xl font-bold text-blue-200">{value}</div>
    </div>
  );
}

function Badge({ tone, children }: any) {
  return (
    <span
      className={[
        "rounded-full border px-3 py-1 text-xs",
        tone === "good"
          ? "border-blue-500/30 bg-blue-500/10 text-blue-200"
          : "border-white/15 bg-white/5",
      ].join(" ")}
    >
      {children}
    </span>
  );
}

function Particles() {
  return null;
}

/* ===== ICONS ===== */

function GridIcon() {
  return <span>⬛</span>;
}

function PinIcon() {
  return <span>📌</span>;
}

function SupportIcon() {
  return <span>💬</span>;
}
