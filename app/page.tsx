import Link from "next/link";

const DISCORD_INVITE = "https://discord.gg/rHy3W7Za";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-5xl px-6 py-10">
        {/* HEADER */}
        <header className="flex items-center justify-between">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            Star
          </Link>

          <nav className="flex items-center gap-5 text-sm text-white/80">
            <Link href="/features" className="hover:text-white">
              Features
            </Link>

            <a
              href={DISCORD_INVITE}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white"
            >
              Discord
            </a>

            <Link href="/terms" className="hover:text-white">
              Terms
            </Link>

            <Link href="/privacy" className="hover:text-white">
              Privacy
            </Link>

            <Link
              href="/dashboard"
              className="rounded-xl bg-white/10 px-4 py-2 hover:bg-white/15"
            >
              Dashboard
            </Link>
          </nav>
        </header>

        {/* HERO */}
        <section className="pt-16">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Roblox screenshare & results dashboard
          </h1>

          <p className="mt-5 max-w-2xl text-white/70 text-lg">
            Generate a PIN on the site, give it to the person being checked. They
            run the scan, and you view results by category.
          </p>

          {/* CTA BUTTONS */}
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={DISCORD_INVITE}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-white text-black px-5 py-3 font-semibold hover:opacity-90"
            >
              Join Discord
            </a>

            <Link
              href="/dashboard"
              className="rounded-xl bg-white/10 px-5 py-3 font-semibold hover:bg-white/15"
            >
              Sign in → Generate PIN
            </Link>
          </div>

          {/* STEPS */}
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <Card title="Step 1" text="Sign in with Discord → generate a PIN." />
            <Card
              title="Step 2"
              text="Give the PIN to the person being checked."
            />
            <Card
              title="Step 3"
              text="When the scan finishes, view results by category."
            />
          </div>

          {/* QUICK STRIP */}
          <div className="mt-14 rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-white/70">
              PIN-based flow • Clean dashboard • Result categories
            </p>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="mt-20 border-t border-white/10 pt-8 text-sm text-white/60">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span>© {new Date().getFullYear()} Star</span>

            <div className="flex gap-4">
              <a
                href={DISCORD_INVITE}
                target="_blank"
                rel="noreferrer"
                className="hover:text-white"
              >
                Discord
              </a>

              <Link href="/terms" className="hover:text-white">
                Terms
              </Link>

              <Link href="/privacy" className="hover:text-white">
                Privacy
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}

function Card({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="text-sm font-semibold">{title}</div>
      <p className="mt-2 text-white/70">{text}</p>
    </div>
  );
}
