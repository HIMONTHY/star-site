export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#070A0D] text-white px-6 py-20">
      <div className="mx-auto max-w-4xl">

        <h1 className="text-4xl font-bold mb-2">Terms & Services</h1>
        <p className="text-sm text-white/50 mb-8">
          Last updated: 2/3/2026
        </p>

        <div className="space-y-6 text-white/70 leading-relaxed text-sm">

          <p>
            By using this software, you acknowledge and agree that the creator of
            this software is NOT responsible for how the information obtained is
            used by third party leagues and members.
          </p>

          <p>
            This tool is provided to aid in the screensharing process and no
            information will be distributed by the owner of the software.
          </p>

          <p>
            If the league or individual using the software on you is NOT listed
            or has received proper authorization, please report it immediately
            by DMing Discord user:
          </p>

          <p className="text-blue-300 font-semibold">
            kevin656f0975_69370
          </p>

          <p>
            Or by joining the Star Bypass Discord server and creating a ticket.
          </p>

          <p className="font-semibold text-white">
            Unauthorized usage will be revoked.
          </p>

        </div>

        <div className="mt-12 flex gap-4 text-sm text-blue-400">
          <a href="/" className="hover:text-white">← Back to home</a>
          <a href="/privacy" className="hover:text-white">Privacy Policy</a>
        </div>

      </div>
    </main>
  );
}
