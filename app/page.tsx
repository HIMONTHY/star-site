export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#070A0D] text-white overflow-hidden">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0">
        {/* radial glow */}
        <div className="absolute left-1/2 top-[-240px] h-[700px] w-[900px] -translate-x-1/2 rounded-full bg-emerald-500/15 blur-[120px]" />
        {/* vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.55)_55%,rgba(0,0,0,0.92)_100%)]" />
        {/* grid */}
        <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:70px_70px]" />
        {/* particles */}
        <Particles />
      </div>

      {/* NAV */}
      <header className="relative z-10">
        <div className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl border border-white/10 bg-white/5 grid place-items-center">
              <span className="text-emerald-300 font-bold">S</span>
            </div>
            <div className="font-semibold tracking-wide">
              <span className="text-white">Star</span>{" "}
              <span className="text-emerald-400">Site</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm text-white/70">
            <a className="hover:text-white" href="#home">Home</a>
            <a className="hover:text-white" href="#features">Features</a>
            <a className="hover:text-white" href="#terms">Terms</a>
            <a className="hover:text-white" href="#faq">FAQ</a>
            <a className="hover:text-white" href="https://discord.gg/rHy3W7Za" target="_blank" rel="noreferrer">Discord</a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="/dashboard"
              className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/85 hover:bg-white/10"
            >
              Dashboard
            </a>
            <a
              href="#get-access"
              className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-black hover:opacity-90"
            >
              Get Access
            </a>
          </div>
        </div>

        <div className="border-b border-white/10" />
      </header>

      {/* HERO */}
      <section id="home" className="relative z-10">
        <div className="mx-auto max-w-6xl px-6 pt-16 pb-16 text-center">
          {/* logo mark */}
          <div className="mx-auto mb-6 h-16 w-16 rounded-2xl border border-white/10 bg-white/5 grid place-items-center">
            <span className="text-3xl font-black text-emerald-300">★</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tight">
            <span className="text-white">STAR</span>{" "}
            <span className="text-emerald-400 drop-shadow-[0_0_25px_rgba(16,185,129,0.25)]">
              DASHBOARD
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-white/60 text-base md:text-lg">
            A clean, modern PIN-based flow — generate a PIN, run the scan, and view results by category.
          </p>

          {/* chips */}
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Chip>PIN System</Chip>
            <Chip>Instant Setup</Chip>
            <Chip>Results Dashboard</Chip>
          </div>

          {/* buttons */}
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
            <a
              href="#get-started"
              className="rounded-xl bg-emerald-500 px-7 py-3 font-semibold text-black hover:opacity-90"
            >
              Get Started
            </a>
            <a
              href="https://discord.gg/rHy3W7Za"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-emerald-400/40 bg-emerald-500/10 px-7 py-3 font-semibold text-emerald-200 hover:bg-emerald-500/15"
            >
              Join Discord
            </a>
          </div>

          {/* stats */}
          <div className="mt-14 grid gap-6 sm:grid-cols-3">
            <Stat value="500+" label="ACTIVE USERS" />
            <Stat value="Online" label="STATUS" />
            <Stat value="0" label="DETECTIONS" />
          </div>

          {/* scroll */}
          <div className="mt-12 text-xs tracking-widest text-white/40">
            SCROLL
            <div className="mt-2 mx-auto h-6 w-6 rounded-full border border-white/15 grid place-items-center">
              <span className="text-white/60">↓</span>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES (simple section so nav works) */}
      <section id="features" className="relative z-10">
        <div className="mx-auto max-w-6xl px-6 pb-20">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-10">
            <h2 className="text-2xl md:text-3xl font-bold">Features</h2>
            <p className="mt-2 text-white/60 max-w-2xl">
              Plug your existing API in and display results in a clean, organized way.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <FeatureCard title="Create PINs" desc="Generate a PIN in one click, share it instantly." />
              <FeatureCard title="Live Updates" desc="Auto-refresh so the dashboard updates as scans finish." />
              <FeatureCard title="Result Categories" desc="View results clearly by category and status." />
            </div>
          </div>
        </div>
      </section>

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

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-500/10 px-4 py-2 text-xs text-emerald-100">
      <span className="h-2 w-2 rounded-full bg-emerald-400/70" />
      {children}
    </span>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <div className="text-3xl font-black text-emerald-300">{value}</div>
      <div className="mt-1 text-xs tracking-widest text-white/45">{label}</div>
    </div>
  );
}

function FeatureCard({ title, desc }: { title: string; desc: st
