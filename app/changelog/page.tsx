export default function ChangelogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <a href="/" className="text-slate-300 hover:text-white transition text-sm mb-4 inline-block">
            ← Back to Home
          </a>
          <h1 className="text-5xl font-bold text-white mt-4">Changelog</h1>
        </div>

        {/* Version History */}
        <div className="space-y-8">
          {/* v1.0 */}
          <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-8">
            <div className="flex items-baseline gap-4 mb-4">
              <h2 className="text-2xl font-bold text-white">v1.0</h2>
              <span className="text-sm font-semibold text-green-400 bg-green-900/50 rounded px-3 py-1">
                MAJOR
              </span>
              <span className="text-slate-400 text-sm">2026-02-18</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-4">Initial Launch</h3>
            <ul className="space-y-2 text-slate-300 text-sm">
              <li>• AI memory benchmarking tool with 15 questions across 5 dimensions</li>
              <li>• Real-time scoring with detailed category breakdown</li>
              <li>• Comparison against Engram baseline (87) and industry average (15)</li>
              <li>• Email lead capture for detailed reports</li>
              <li>• Shareable results with social integration</li>
              <li>• Enterprise-grade UI with Tailwind CSS</li>
              <li>• Supabase integration for benchmark storage</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-700 mt-12 pt-8 text-center text-slate-400 text-sm">
          <p>Built by Jarvis. Enterprise-grade memory benchmarking.</p>
        </div>
      </div>
    </div>
  );
}
