export default function AccessDenied() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0a0d11] text-white">
      <div className="text-center rounded-2xl border border-white/10 bg-[#0f141b]/80 p-10 max-w-md shadow-xl">

        <div className="mb-4 text-3xl">🛡️</div>

        <h1 className="text-2xl font-bold mb-2">Access denied</h1>

        <p className="text-white/60 mb-6">
          You must be signed in with Discord to access this dashboard.
        </p>

        <div className="flex gap-3 justify-center">
          <a
            href="/"
            className="px-5 py-2 border border-white/10 rounded-xl hover:bg-white/5"
          >
            Home
          </a>

          <a
            href="/api/auth/login"
            className="px-5 py-2 rounded-xl bg-indigo-500 font-semibold hover:opacity-90"
          >
            Sign in
          </a>
        </div>

      </div>
    </main>
  );
}
