export default function Home() {
  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">

      {/* HERO */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-40 pb-36">
        <h1 className="text-5xl md:text-7xl font-black tracking-tight">
          STAR <span className="text-emerald-400">DASHBOARD</span>
        </h1>

        <p className="mt-4 max-w-xl text-white/60">
          A clean Roblox screenshare & results system built for speed, clarity, and control.
        </p>

        <div className="mt-8 flex gap-4">
          <button className="rounded-xl bg-emerald-500 px-6 py-3 font-semibold hover:bg-emerald-400 transition">
            Get Started
          </button>
          <button className="rounded-xl border border-white/15 px-6 py-3 text-white/80 hover:border-emerald-400 transition">
            Join Discord
          </button>
        </div>

        <div className="mt-12 flex gap-10 text-emerald-400">
          <Stat value="500+" label="Active Users" />
          <Stat value="Online" label="Status" />
          <Stat value="0" label="Issues" />
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="relative z-10">
        <div className="mx-auto max-w-6xl px-6 pb-24">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">
              Why Choose <span className="text-emerald-400">Star</span>?
            </h2>
            <p className="mt-3 text-white/55">
              Industry-leading features that set us apart.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <WhyCard title="Secure Pins" desc="Generate safe unique PINs for every scan session." />
            <WhyCard title="Live Results" desc="View scan progress and results instantly." />
            <WhyCard title="Fast Setup" desc="Get running in minutes with no hassle." />
            <WhyCard title="Auto Updates" desc="Results refresh automatically in real-time." />
            <WhyCard title="Reliable" desc="Built for stability and speed." />
            <WhyCard title="Support Ready" desc="Help whenever you need it." />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="relative z-10 pb-32">
        <div className="mx-auto max-w-6xl px-6">

          <div className="text-center mb-12">
            <h2 className="text-4xl font-black">
              Core <span className="text-emerald-400">Features</span>
            </h2>
            <p className="mt-3 text-white/60">
              Everything you need in one clean dashboard.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <FeatureCard
              title="PIN System"
              desc="Generate and manage scan PINs easily."
            />
            <FeatureCard
              title="Results Dashboard"
              desc="Clear organized scan outcomes."
            />
            <FeatureCard
              title="Status Tracking"
              desc="Pending, finished, and used indicators."
            />
          </div>
        </div>
      </section>

      {/* BACKGROUND GLOW */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 h-[500px] w-[900px] rounded-full bg-emerald-500/10 blur-[200px]" />
      </div>

    </main>
  );
}

/* SMALL COMPONENTS */

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-sm text-white/50">{label}</div>
    </div>
  );
}

function WhyCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-6 shadow-[0_30px_120px_rgba(16,185,129,0.06)] hover:border-emerald-400/25 transition">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-white/55 leading-relaxed">{desc}</p>
    </div>
  );
}

function FeatureCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-emerald-400/20 transition">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-white/55">{desc}</p>
    </div>
  );
}
