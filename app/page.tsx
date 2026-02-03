import React from "react";
import Link from "next/link"; // Next.js Link for optimized routing

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#070A0D] text-white overflow-hidden relative">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0">
        {/* Moving glow blob */}
        <div className="absolute left-1/2 top-[-240px] h-[700px] w-[900px] -translate-x-1/2 rounded-full bg-blue-500/15 blur-[120px] animate-glow" />

        {/* Dark vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.55)_55%,rgba(0,0,0,0.92)_100%)]" />

        {/* Animated grid */}
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
            <Link className="hover:text-white" href="/">
              Home
            </Link>
            <a className="hover:text-white" href="#why">
              Why Choose
            </a>
            <a className="hover:text-white" href="#features">
              Features
            </a>
            <Link className="hover:text-white" href="/terms">
              Terms
            </Link>
            <Link className="hover:text-white" href="/faq">
              FAQ
            </Link>
            <a
              className="hover:text-white"
              href="https://discord.gg/rHy3W7Za"
              target="_blank"
              rel="noreferrer"
            >
              Discord
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/85 hover:bg-white/10"
            >
              Dashboard
            </Link>
            <Link
              href="/get-access"
              className="rounded-xl bg-blue-500 px-4 py-2 text-sm font-semibold text-black hover:opacity-90"
            >
              Get Access
            </Link>
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
            {/* Shadow updated to Blue (59, 130, 246) instead of Green */}
            <span className="text-blue-400 drop-shadow-[0_0_25px_rgba(59,130,246,0.4)]">
              DASHBOARD
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-white/60 text-base md:text-lg">
            A clean, modern PIN-based flow — generate a PIN, run the scan, and
            view results by category.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Chip>PIN System</Chip>
            <Chip>Instant Setup</Chip>
            <Chip>Results Dashboard</Chip>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
            <Link
              href="/dashboard"
              className="rounded-xl bg-blue-500 px-7 py-3 font-semibold text-black hover:opacity-90"
            >
              Get Started
            </Link>
            <a
              href="https://discord.gg/rHy3W7Za"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-blue-400/40 bg-blue-500/10 px-7 py-3 font-semibold text-blue-200 hover:bg-blue-500/15"
            >
              Join Discord
            </a>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-3">
            <Stat value="500+" label="ACTIVE USERS" />
            <Stat value="Online" label="STATUS" />
            <Stat value="0" label="DETECTIONS" />
          </div>

          <div className="mt-12 text-xs tracking-widest text-white/40">
            SCROLL
            <div className="mt-2 mx-auto h-6 w-6 rounded-full border border-white/15 grid place-items-center">
              <span className="text-white/60">↓</span>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section id="why" className="relative z-10">
        <div className="mx-auto max-w-6xl px-6 pb-20">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">
              Why Choose <span className="text-blue-400">Star</span>?
            </h2>
            <p className="mt-3 text-white/55">
              Industry-leading features that set us apart from the competition.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <WhyCard
              icon="shield"
              title="Secure Pins"
              desc="Generate unique PINs for every check so each session stays organized and clean."
            />
            <WhyCard
              icon="eye"
              title="Clear Results"
              desc="See scan status and results by category without confusion or clutter."
            />
            <WhyCard
              icon="bolt"
              title="Easy Setup"
              desc="Get started fast with a simple flow that just works."
            />
            <WhyCard
              icon="refresh"
              title="Auto Updates"
              desc="Refresh-friendly layout so you’re always seeing the latest progress."
            />
            <WhyCard
              icon="clock"
              title="Reliable"
              desc="Built to stay responsive and stable when you need it."
            />
            <WhyCard
              icon="headset"
              title="Support Ready"
              desc="Need help? Your Discord support channel stays open and ready."
            />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="relative z-10">
        <div className="mx-auto max-w-6xl px-6 pb-20">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-10">
            <h2 className="text-2xl md:text-3xl font-bold">Features</h2>
            <p className="mt-2 text-white/60 max-w-2xl">
              Plug your existing API in and display results in a clean,
              organized way.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <FeatureCard
                title="Create PINs"
                desc="Generate a PIN in one click, share it instantly."
              />
              <FeatureCard
                title="Live Updates"
                desc="Auto-refresh so the dashboard updates as scans finish."
              />
              <FeatureCard
                title="Result Categories"
                desc="View results clearly by category and status."
              />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-10 text-sm text-white/50 flex flex-wrap gap-3 justify-between">
          <span>© {new Date().getFullYear()} Star</span>
          <div className="flex gap-5">
            <Link className="hover:text-white" href="/terms">
              Terms
            </Link>
            <Link className="hover:text-white" href="/privacy">
              Privacy
            </Link>
            <a
              className="hover:text-white"
              href="https://discord.gg/rHy3W7Za"
              target="_blank"
              rel="noreferrer"
            >
              Discord
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}

/* HELPER COMPONENTS */

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

function FeatureCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
      <div className="text-lg font-semibold">{title}</div>
      <div className="mt-2 text-sm text-white/60">{desc}</div>
    </div>
  );
}

function WhyCard({
  icon,
  title,
  desc,
}: {
  icon: "shield" | "eye" | "bolt" | "refresh" | "clock" | "headset";
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-6 shadow-[0_30px_120px_rgba(59,130,246,0.06)] hover:border-blue-400/25 transition">
      <div className="h-12 w-12 rounded-xl border border-blue-400/20 bg-blue-500/10 grid place-items-center text-blue-300">
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

/* ICONS */

function ShieldIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2l8 4v6c0 5-3.4 9.4-8 10-4.6-.6-8-5-8-10V6l8-4z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function EyeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
function BoltIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M13 2L3 14h7l-1 8 12-14h-7l-1-6z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function RefreshIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M21 12a9 9 0 10-2.6 6.4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M21 3v6h-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path
        d="M12 7v6l4 2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
function HeadsetIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 12a8 8 0 0116 0v7a2 2 0 01-2 2h-2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M4 12v5a2 2 0 002 2h2v-7H6a2 2 0 00-2 2z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M20 12v5a2 2 0 01-2 2h-2v-7h2a2 2 0 012 2z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Particles() {
  const dots = Array.from({ length: 40 }, (_, i) => i);

  return (
    <div className="absolute inset-0">
      {dots.map((i) => (
        <span
          key={i}
          className="absolute rounded-full bg-blue-200/30 blur-[0.3px] animate-float"
          style={{
            width: `${2 + (i % 3)}px`,
            height: `${2 + (i % 3)}px`,
            left: `${(i * 97) % 100}%`,
            top: `${(i * 53) % 100}%`,
            animationDelay: `${(i % 10) * 0.35}s`,
            opacity: 0.25 + (i % 5) * 0.12,
          }}
        />
      ))}
    </div>
  );
}
