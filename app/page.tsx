import React from "react";
import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#070A0D] text-white relative overflow-hidden">
      {/* Shared Background Effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-10%] h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[120px]" />
        <div 
          className="absolute inset-0 opacity-[0.1] [background-image:linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:70px_70px]" 
        />
      </div>

      <header className="relative z-10 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg border border-white/10 bg-white/5 grid place-items-center">
              <span className="text-blue-300 font-bold text-sm">S</span>
            </div>
            <span className="font-semibold tracking-wide">Star Site</span>
          </Link>
          <Link href="/" className="text-sm text-white/60 hover:text-white transition">
            Back to Home
          </Link>
        </div>
      </header>

      <section className="relative z-10 mx-auto max-w-4xl px-6 py-20">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            Terms of <span className="text-blue-400">Service</span>
          </h1>
          <p className="text-white/50">Last updated: February 2026</p>
        </div>

        <div className="space-y-12 text-white/70 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing Star Dashboard, you agree to be bound by these terms. 
              Our service provides a PIN-based interface for data visualization and 
              scanning results.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">2. User Responsibilities</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>You are responsible for maintaining the confidentiality of your PINs.</li>
              <li>You may not use the service for any illegal or unauthorized purpose.</li>
              <li>Automation or "scraping" of the dashboard is prohibited without API access.</li>
            </ul>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/5 p-8">
            <h2 className="text-xl font-bold text-white mb-4">3. Limitation of Liability</h2>
            <p className="text-sm italic">
              Star Site is provided "as is" without any warranties. We are not responsible 
              for any data loss or service interruptions during the scanning process.
            </p>
          </section>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/10 mt-20">
        <div className="mx-auto max-w-7xl px-6 py-10 flex justify-center">
          <Link href="/" className="text-sm text-white/40 hover:text-blue-400">
            © {new Date().getFullYear()} Star — Return to Home
          </Link>
        </div>
      </footer>
    </main>
  );
}
