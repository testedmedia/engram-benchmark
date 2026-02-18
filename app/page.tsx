import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700">
        <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
          <div className="text-2xl font-bold text-white">Engram</div>
          <nav className="flex gap-6 text-slate-300">
            <a href="#" className="hover:text-white transition">Benchmark</a>
            <a href="/changelog" className="hover:text-white transition">Changelog</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 py-20 text-center">
        <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
          How good is your AI's memory?
        </h1>
        <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
          Test your memory system across 5 dimensions: duplicate prevention, recall accuracy,
          token efficiency, retrieval speed, and system health.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6">
            <p className="text-slate-400 text-sm uppercase font-semibold mb-2">Industry Average</p>
            <p className="text-4xl font-bold text-slate-300">15</p>
            <p className="text-slate-500 text-sm mt-2">Most AI systems score</p>
          </div>
          <div className="bg-blue-900/30 backdrop-blur border border-blue-700/50 rounded-lg p-6">
            <p className="text-blue-300 text-sm uppercase font-semibold mb-2">Engram Baseline</p>
            <p className="text-4xl font-bold text-blue-300">87</p>
            <p className="text-blue-400 text-sm mt-2">Enterprise-grade reference</p>
          </div>
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6">
            <p className="text-slate-400 text-sm uppercase font-semibold mb-2">Your Score</p>
            <p className="text-4xl font-bold text-slate-300">?</p>
            <p className="text-slate-500 text-sm mt-2">Find out in 5 minutes</p>
          </div>
        </div>

        {/* CTA Button */}
        <Link
          href="/benchmark"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition transform hover:scale-105 mb-8"
        >
          Start Benchmark →
        </Link>

        {/* Features */}
        <div className="mt-20 text-left">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">What You'll Test</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-6">
              <h3 className="text-lg font-bold text-white mb-2">Duplicate Prevention</h3>
              <p className="text-slate-400 text-sm">
                How effectively does your system prevent storing duplicate information and enforce memory budgets?
              </p>
            </div>
            <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-6">
              <h3 className="text-lg font-bold text-white mb-2">Recall Accuracy</h3>
              <p className="text-slate-400 text-sm">
                Can you find facts even when rephrased? How do you handle contradictions?
              </p>
            </div>
            <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-6">
              <h3 className="text-lg font-bold text-white mb-2">Token Efficiency</h3>
              <p className="text-slate-400 text-sm">
                Do you monitor token usage? Can you compress and summarize memories effectively?
              </p>
            </div>
            <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-6">
              <h3 className="text-lg font-bold text-white mb-2">Retrieval Speed</h3>
              <p className="text-slate-400 text-sm">
                How fast can you retrieve at scale? Sub-20ms? Using hybrid indexing?
              </p>
            </div>
            <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-6">
              <h3 className="text-lg font-bold text-white mb-2">System Health</h3>
              <p className="text-slate-400 text-sm">
                Do you have automated health checks? Can you learn and improve from errors?
              </p>
            </div>
            <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-6">
              <h3 className="text-lg font-bold text-white mb-2">Benchmark Includes</h3>
              <p className="text-slate-400 text-sm">
                15 questions across 5 categories, detailed scoring, and a personalized report.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700 mt-20">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center text-slate-400 text-sm">
          <p>Built by Jarvis. Enterprise-grade memory benchmarking.</p>
        </div>
      </footer>
    </div>
  );
}
