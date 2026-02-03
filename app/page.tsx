import React from "react";

/** * STAR DASHBOARD FULL CODE (TypeScript Version)
 * Updated: Feb 3, 2026
 */

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#070A0D] text-white overflow-hidden relative">
      {/* INJECTED ANIMATIONS */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes glow {
          0%, 100% { opacity: 0.15; transform: translate(-50%, -240px) scale(1); }
          50% { opacity: 0.25; transform: translate(-50%, -220px) scale(1.05); }
        }
        @keyframes grid-move {
          0% { transform: translateY(0); }
          100% { transform: translateY(70px); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        .animate-glow { animation: glow 8s ease-in-out infinite; }
        .animate-grid { animation: grid-move 20s linear infinite; }
        .animate-float { animation: float 6s ease-in-out infinite; }
      `}} />

      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-240px] h-[700px] w-[900px] -translate-x-1/2 rounded-full bg-blue-500/15 blur-[120px] animate-glow" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.55)_55%,rgba(0,0,0,0.92)_100%)]" />
        <div
          className="absolute inset-0 opacity-[0.18] animate-grid
          [background-image:linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)]
          [background-size:70px_70px]"
        />
        <Particles />
      </div>

      {/* NAV */}
      <header className="relative z-10">
        <div className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl border border-white/10 bg-white/5 grid place-items-center">
              <span className="text-blue-300 font-bold">S</span>
            </div>
            <div className="font-semibold tracking-wide">
              <span className="text-white">Star</span>{" "}
              <span className="text-blue-400">Site</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm text-white/70">
            <a className="hover:text-white" href="#home">Home</a>
            <a className="hover:text-white" href="#why">Why Choose</a>
            <a className="hover:text-white" href="#features">Features</a>
            <a className="hover:text-white" href="#terms">Terms</a>
            <a className="hover:text-white" href="#faq">FAQ</a>
            <a className="hover:text-white" href="https://discord.gg/rHy3W7Za" target="_blank" rel="noreferrer">Discord</a>
          </nav>

          <div className="flex items-center gap-3">
            <a href="/dashboard" className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/85 hover:bg-white/10">
              Dashboard
            </a>
            <a href="#get-access" className="rounded-xl bg-blue-500 px-4 py-2 text-sm font-semibold text-black hover:opacity-90">
              Get Access
            </a>
          </div>
        </div>
        <div className="border-b border-white/10" />
      </header>

      {/* HERO */}
      <section id="home" className="relative z-10">
        <div className="mx-auto max-w-6xl px-6 pt-16 pb-16 text-center">
          <div className="mx-auto mb-6 h-16 w-16 rounded-2xl border border-white/10 bg-white/5 grid place-items-center">
            <span className="text-3xl font-black text-blue-300">★</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight">
            <span className="text-white">STAR</span>{" "}
            <span className="text-blue-400 drop-shadow-[0_0_25px_rgba(59,130,246,0.25)]">DASHBOARD</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-white/60 text-base md:text-lg">
            A clean, modern PIN-based flow — generate a PIN, run the scan, and view results by category.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Chip>PIN System</Chip>
            <Chip>Instant Setup</Chip>
            <Chip>Results Dashboard</Chip>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
            <a href="/dashboard" className="rounded-xl bg-blue-500 px-7 py-3 font-semibold text-black hover:opacity-90">Get Started</a>
            <a href="https://discord.gg/rHy3W7Za" target="_blank" rel="noreferrer" className="rounded-xl border border-blue-400/40 bg-blue-500/10 px-7 py-3 font-semibold text-blue-200 hover:bg-blue-500/15">Join Discord</a>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-3">
            <Stat value="500+" label="ACTIVE USERS" />
            <Stat value="Online" label="STATUS" />
            <Stat value="0" label="DETECTIONS" />
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section id="why" className="relative z-10 px-6 pb-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">
              Why Choose <span className="text-blue-400">Star</span>?
            </h2>
            <p className="mt-3 text-white/55">Industry-leading features that set us apart.</p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <WhyCard icon="shield" title="Secure Pins" desc="Generate unique PINs for every check so each session stays organized." />
            <WhyCard icon="eye" title="Clear Results" desc="See scan status and results by category without confusion." />
            <WhyCard icon="bolt" title="Easy Setup" desc="Get started fast with a simple flow that just works." />
            <WhyCard icon="refresh" title="Auto Updates" desc="Refresh-friendly layout so you’re always seeing progress." />
            <WhyCard icon="clock" title="Reliable" desc="Built to stay responsive and stable when you need it." />
            <WhyCard icon="headset" title="Support Ready" desc="Your Discord support channel stays open and ready." />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="relative z-10 px-6 pb-20">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-10">
            <h2 className="text-2xl md:text-3xl font-bold">Features</h2>
            <p className="mt-2 text-white/60 max-w-2xl">Plug your existing API in and display results clearly.</p>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <FeatureCard title="Create PINs" desc="Generate a PIN in one click, share it instantly." />
              <FeatureCard title="Live Updates" desc="Auto-refresh so the dashboard updates as scans finish." />
              <FeatureCard title="Result Categories" desc="View results clearly by category and status." />
            </div>
          </div>
        </div>
      </section>

      {/* TERMS */}
      <section id="terms" className="relative z-10 px-6 pb-10">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-10">
            <h2 className="text-3xl font-bold">Terms & Services</h2>
            <p className="mt-1 text-sm text-white/50 italic">Last updated: 2/3/2026</p>
            <div className="mt-6 space-y-4 text-white/70 text-sm leading-relaxed">
              <p>By using this software, you acknowledge and agree that the creator is NOT responsible for how information is used by third party leagues.</p>
              <p>This tool is provided to aid in the screensharing process; no information is distributed by the owner.</p>
              <ul className="list-disc list-inside ml-2 space-y-1">
                <li>DM Discord: <span className="text-blue-300 font-semibold">kevin656f0975_69370</span></li>
                <li>Or create a ticket in the Star Bypass server</li>
              </ul>
              <p className="font-semibold text-white">Unauthorized usage will be revoked.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PRIVACY */}
      <section id="privacy" className="relative z-10 px-6 pb-20">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-10">
            <h2 className="text-3xl font-bold">Privacy Policy</h2>
            <p className="mt-1 text-sm text-white/50 italic">Last updated: 2/3/2026</p>
            <div className="mt-6 space-y-4 text-white/70 text-sm leading-relaxed">
              <p>Star Bypass keeps data collection minimal. We only store what is necessary to manage access.</p>
              <p>Discord login grants us your Discord ID and basic profile for role management.</p>
              <p>We do not sell data, run ads, or track users beyond authentication.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-10 text-sm text-white/50 flex flex-wrap gap-3 justify-between">
          <span>© {new Date().getFullYear()} Star</span>
          <div className="flex gap-5">
            <a className="hover:text-white" href="#terms">Terms</a>
            <a className="hover:text-white" href="#privacy">Privacy</a>
            <a className="hover:text-white" href="https://discord.gg/rHy3W7Za" target="_blank" rel="noreferrer">Discord</a>
          </div>
        </div>
      </footer>
    </main>
  );
}

// --- SUB-COMPONENTS WITH TYPES ---

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-blue-400/25 bg-blue-500/10 px-4 py-2 text-xs text-blue-100">
      <span className="h-2 w-2 rounded-full bg-blue-400/70" />
      {children}
    </span>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-white/20">
      <div className="text-3xl font-black text-blue-300">{value}</div>
      <div className="mt-1 text-xs tracking-widest text-white/45">{label}</div>
    </div>
  );
}

function FeatureCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-5 transition hover:border-blue-400/20">
      <div className="text-lg font-semibold">{title}</div>
      <div className="mt-2 text-sm text-white/60">{desc}</div>
    </div>
  );
}

type IconType = "shield" | "eye" | "bolt" | "refresh" | "clock" | "headset";

function WhyCard({ icon, title, desc }: { icon: IconType; title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-6 shadow-[0_30px_120px_rgba(59,130,246,0.06)] hover:border-blue-400/25 transition group">
      <div className="h-12 w-12 rounded-xl border border-blue-400/20 bg-blue-500/10 grid place-items-center text-blue-300 group-hover:scale-110 transition">
        {icon === "shield" && <ShieldIcon />}
        {icon === "eye" && <EyeIcon />}
        {icon === "bolt" && <BoltIcon />}
        {icon === "refresh" && <RefreshIcon />}
        {icon === "clock" && <ClockIcon />}
        {icon === "headset" && <HeadsetIcon />}
      </div>
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-white/60 leading-relaxed">{desc}</p>
    </div>
  );
}

function Particles() {
  const dots = Array.from({ length: 40 }, (_, i) => i);
  return (
    <div className="absolute inset-0 overflow-hidden">
      {dots.map((i) => (
        <span
          key={i}
          className="absolute rounded-full bg-blue-200/30 blur-[0.3px] animate-float"
          style={{
            width: `${2 + (i % 3)}px`,
            height: `${2 + (i % 3)}px`,
            left: `${(i * 97) % 100}%`,
            top: `${(i * 53) % 100}%`,
            animationDelay: `${(i % 10) * 0.5}s`,
            opacity: 0.1 + (i % 5) * 0.05,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

// Icons
const ShieldIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l8 4v6c0 5-3.4 9.4-8 10-4.6-.6-8-5-8-10V6l8-4z" /></svg>;
const EyeIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></svg>;
const BoltIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h7l-1 8 12-14h-7l-1-6z" /></svg>;
const RefreshIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 10-2.6 6.4M21 3v6h-6" /></svg>;
const ClockIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 7v6l4 2" /></svg>;
const HeadsetIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12a8 8 0 0116 0v7a2 2 0 01-2 2h-2M4 12v5a2 2 0 002 2h2v-7H6a2 2 0 00-2 2zM20 12v5a2 2 0 01-2 2h-2v-7h2a2 2 0 012 2z" /></svg>;
