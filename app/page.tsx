import React from "react";
import Link from "next/link"; // Added the Link import

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#070A0D] text-white overflow-hidden relative">
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
            {/* Using Link for internal navigation */}
            <Link className="hover:text-white" href="/">Home</Link>
            <a className="hover:text-white" href="#why">Why Choose</a>
            <a className="hover:text-white" href="#features">Features</a>
            <Link className="hover:text-white" href="/terms">Terms</Link>
            <Link className="hover:text-white" href="/faq">FAQ</Link>
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

      {/* HERO SECTION */}
      <section id="home" className="relative z-10">
        <div className="mx-auto max-w-6xl px-6 pt-16 pb-16 text-center">
          <div className="mx-auto mb-6 h-16 w-16 rounded-2xl border border-white/10 bg-white/5 grid place-items-center">
            <span className="text-3xl font-black text-blue-300">★</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tight">
            <span className="text-white">STAR</span>{" "}
            <span className="text-blue-400 drop-shadow-[0_0_25px_rgba(59,130,246,0.25)]">
              DASHBOARD
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-white/60 text-base md:text-lg">
            A clean, modern PIN-based flow — generate a PIN, run the scan, and
            view results by category.
          </p>

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
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-10 text-sm text-white/50 flex flex-wrap gap-3 justify-between">
          <span>© {new Date().getFullYear()} Star</span>
          <div className="flex gap-5">
            <Link className="hover:text-white" href="/terms">Terms</Link>
            <Link className="hover:text-white" href="/privacy">Privacy</Link>
            <a className="hover:text-white" href="https://discord.gg/rHy3W7Za">Discord</a>
          </div>
        </div>
      </footer>
    </main>
  );
}

// Keep your Particles, Stat, and Card functions below...
