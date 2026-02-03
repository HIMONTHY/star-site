export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#070A0D] text-white px-6 py-20">
      <div className="mx-auto max-w-4xl">

        <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-sm text-white/50 mb-8">
          Last updated: 2/3/2026
        </p>

        <div className="space-y-6 text-white/70 leading-relaxed text-sm">

          <p>
            Star Bypass keeps data collection intentionally minimal. We only
            store what is needed to manage access and display submitted results.
          </p>

          <p>
            When signing in with Discord, we receive your Discord user ID and
            basic profile information for authentication and role management.
          </p>

          <p>
            Scan results sent with a PIN are stored only so they can be viewed
            in the dashboard securely.
          </p>

          <p>
            We do not sell data, run ads, or use third-party tracking.
          </p>

          <p>
            Session cookies are used only to keep users logged in.
          </p>

          <p>
            Data may be periodically cleaned up when no longer needed.
          </p>

          <p>
            Contact support via the Star Bypass Discord server for data requests.
          </p>

        </div>

        <div className="mt-12 flex gap-4 text-sm text-blue-400">
          <a href="/" className="hover:text-white">← Back to home</a>
          <a href="/terms" className="hover:text-white">Terms & Services</a>
        </div>

      </div>
    </main>
  );
}
