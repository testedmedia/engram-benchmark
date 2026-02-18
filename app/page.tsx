import Link from 'next/link';
import AnimatedBrain from '@/components/AnimatedBrain';
import AnimatedIcon from '@/components/AnimatedIcon';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Animated Background Grid */}
      <div className="fixed inset-0 -z-10 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(167, 139, 250, .05) 25%, rgba(167, 139, 250, .05) 26%, transparent 27%, transparent 74%, rgba(167, 139, 250, .05) 75%, rgba(167, 139, 250, .05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(167, 139, 250, .05) 25%, rgba(167, 139, 250, .05) 26%, transparent 27%, transparent 74%, rgba(167, 139, 250, .05) 75%, rgba(167, 139, 250, .05) 76%, transparent 77%, transparent)',
          backgroundSize: '50px 50px',
        }}></div>
      </div>

      {/* Header */}
      <header className="border-b border-slate-700/30 bg-slate-950/50 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AnimatedIcon name="brain" size={28} className="text-purple-400" />
            <div className="text-2xl font-bold text-purple-400">Engram</div>
          </div>
          <nav className="flex gap-6 text-slate-300 text-sm">
            <Link href="/benchmark" className="hover:text-white transition">Benchmark</Link>
            <Link href="/changelog" className="hover:text-white transition">Changelog</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        {/* Animated Brain */}
        <AnimatedBrain />

        {/* Main CTA */}
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight tracking-tight">
            Test Your AI's Memory
          </h1>
          <p className="text-lg text-slate-300 mb-2 max-w-3xl mx-auto leading-relaxed">
            Automatic diagnostic that actually tests your memory system
          </p>
          <p className="text-sm text-slate-400 mb-10 max-w-2xl mx-auto">
            Industry average: <span className="text-red-300 font-semibold">15/100</span> | Engram baseline: <span className="text-green-300 font-semibold">87/100</span> | Your score: <span className="text-purple-300 font-semibold">?</span>
          </p>

          {/* Primary CTA - Premium Button */}
          <div className="mb-16 flex flex-col items-center">
            <Link
              href="/benchmark"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 via-purple-600 to-purple-700 hover:from-purple-700 hover:via-purple-700 hover:to-purple-800 text-white font-bold py-4 px-10 rounded-lg text-lg transition transform hover:scale-105 shadow-2xl shadow-purple-900/50"
            >
              <AnimatedIcon name="check" size={20} className="text-green-300" />
              Run Benchmark Now
            </Link>
            <p className="text-xs text-slate-400 mt-4">Takes 30 seconds. Local. Free.</p>
          </div>

          {/* Quick Stats - Sleek Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16 max-w-2xl mx-auto">
            <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur border border-slate-700/30 rounded-xl p-5 hover:border-red-500/30 transition">
              <p className="text-4xl font-bold text-red-300">15</p>
              <p className="text-xs text-slate-400 mt-2 uppercase tracking-wide">Baseline</p>
            </div>
            <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur border border-slate-700/30 rounded-xl p-5 hover:border-green-500/30 transition">
              <p className="text-4xl font-bold text-green-300">87</p>
              <p className="text-xs text-slate-400 mt-2 uppercase tracking-wide">Engram</p>
            </div>
            <div className="bg-gradient-to-br from-purple-900/20 to-slate-900/40 backdrop-blur border border-purple-500/20 rounded-xl p-5 hover:border-purple-500/50 transition">
              <p className="text-4xl font-bold text-purple-300">?</p>
              <p className="text-xs text-slate-400 mt-2 uppercase tracking-wide">Yours</p>
            </div>
          </div>
        </div>

        {/* What We Test - Premium Design */}
        <div className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">What Gets Tested</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 border border-slate-700/30 rounded-xl p-7 hover:border-slate-600/50 hover:shadow-lg hover:shadow-purple-900/10 transition group">
              <div className="text-5xl mb-4 text-slate-400 group-hover:text-purple-400 transition">
                <AnimatedIcon name="network" size={40} className="text-purple-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Duplicate Prevention</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Does your system detect when the same fact is stored twice? Or does it bloat memory with redundancy?
              </p>
            </div>
            <div className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 border border-slate-700/30 rounded-xl p-7 hover:border-slate-600/50 hover:shadow-lg hover:shadow-purple-900/10 transition group">
              <div className="text-5xl mb-4 text-slate-400 group-hover:text-purple-400 transition">
                <AnimatedIcon name="check" size={40} className="text-purple-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Accurate Recall</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Can it find facts when asked different ways? Or does rephrasing cause memory loss?
              </p>
            </div>
            <div className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 border border-slate-700/30 rounded-xl p-7 hover:border-slate-600/50 hover:shadow-lg hover:shadow-purple-900/10 transition group">
              <div className="text-5xl mb-4 text-slate-400 group-hover:text-purple-400 transition">
                <AnimatedIcon name="lightning" size={40} className="text-purple-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Token Efficiency</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Is memory bloated, costing you money? Or compressed and lean?
              </p>
            </div>
            <div className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 border border-slate-700/30 rounded-xl p-7 hover:border-slate-600/50 hover:shadow-lg hover:shadow-purple-900/10 transition group">
              <div className="text-5xl mb-4 text-slate-400 group-hover:text-purple-400 transition">
                <AnimatedIcon name="zap" size={40} className="text-purple-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Retrieval Speed</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Does query happen instantly? Or does your AI have to dig through junk?
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
