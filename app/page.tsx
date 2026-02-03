import React from "react";

/** * STAR DASHBOARD FULL CODE
 * Fixed Background & TypeScript Types
 */

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#070A0D] text-white overflow-hidden relative">
      {/* CSS ANIMATIONS - FIXED */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes glow-pulse {
          0%, 100% { opacity: 0.1; transform: translate(-50%, -240px) scale(1); }
          50% { opacity: 0.3; transform: translate(-50%, -200px) scale(1.1); }
        }
        @keyframes move-grid {
          0% { transform: translateY(0); }
          100% { transform: translateY(70px); }
        }
        @keyframes float-dots {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-glow { animation: glow-pulse 10s ease-in-out infinite; }
        .animate-grid { animation: move-grid 15s linear infinite; }
        .animate-float { animation: float-dots 6s ease-in-out infinite; }
      `}} />

      {/* BACKGROUND LAYER (Fixed Z-Index) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* The Blue Glow Blob */}
        <div className="absolute left-1/2 top-[-240px] h-[800px] w-[1000px] -translate-x-1/2 rounded-full bg-blue-600/20 blur-[120px] animate-glow" />
        
        {/* The Grid */}
        <div className="absolute inset-0 animate-grid opacity-[0.2]" 
             style={{ 
               backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)`,
               backgroundSize: '70px 70px'
             }} 
        />
        
        {/* Dark Radial Overlay to make center pop */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#070A0D_85%)]" />
        
        <Particles />
      </div>

      {/* CONTENT LAYER */}
      <div className="relative z-10">
        {/* NAV */}
        <header>
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
        <section id="home">
          <div className="mx-auto max-w-6xl px-6 pt-16 pb-16 text-center">
            <div className="mx-auto mb-6 h-16 w-16 rounded-2xl border border-white/10 bg-white/5 grid place-items-center">
              <span className="text-3xl font-black text-blue-300">★</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight">
              <span className="text-white">STAR</span>{" "}
              <span className="text-blue-400 drop-shadow-[0_0_25px_rgba(59,130,246,0.3)]">DASHBOARD</span>
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
        <section id="why" className="px-6 pb-20">
          <div className="mx-auto max-w-6xl text-center">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">
              Why Choose <span className="text-blue-400">Star</span>?
            </h2>
            <div className="mt-10 grid gap-5 md:grid-cols-3 text-left">
              <WhyCard icon="shield" title="Secure Pins" desc="Generate unique PINs for every check so each session stays organized." />
              <WhyCard icon="eye" title="Clear Results" desc="See scan status and results by category without confusion." />
              <WhyCard icon="bolt" title="Easy Setup" desc="Get started fast with a simple flow that just works." />
            </div>
          </div>
        </section>

        {/* TERMS & PRIVACY SECTIONS */}
        <section id="terms" className="px-6 pb-10">
          <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-white/5 p-8 md:p-10">
            <h2 className="text-3xl font-bold">Terms & Services</h2>
            <div className="mt-6 space-y-4 text-white/70 text-sm">
              <p>By using this software, you agree that the creator is NOT responsible for how information is used.</p>
              <ul className="list-disc list-inside space-y-1">
                <li>DM Discord: <span className="text-blue-300 font-semibold">kevin656f0975_69370</span></li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      <footer className="relative z-10 border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-10 text-sm text-white/50 flex justify-between">
          <span>© {new Date().getFullYear()} Star</span>
        </div>
      </footer>
    </main>
  );
}

// --- TYPED SUB-COMPONENTS ---

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
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <div className="text-3xl font-black text-blue-300">{value}</div>
      <div className="mt-1 text-xs tracking-widest text-white/45">{label}</div>
    </div>
  );
}

function WhyCard({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/40 p-6 hover:border-blue-400/30 transition-all">
      <div className="h-10 w-10 mb-4 rounded-lg bg-blue-500/20 grid place-items-center text-blue-400">
        {icon === "shield" && "🛡️"}
        {icon === "eye" && "👁️"}
        {icon === "bolt" && "⚡"}
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-white/50">{desc}</p>
    </div>
  );
}

function Particles() {
  const dots = Array.from({ length: 30 }, (_, i) => i);
  return (
    <div className="absolute inset-0 overflow-hidden">
      {dots.map((i) => (
        <span
          key={i}
          className="absolute rounded-full bg-blue-400/40 animate-float"
          style={{
            width: `${2 + (i % 3)}px`,
            height: `${2 + (i % 3)}px`,
            left: `${(i * 37) % 100}%`,
            top: `${(i * 19) % 100}%`,
            animationDelay: `${(i % 5)}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
