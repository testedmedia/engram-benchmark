import Link from 'next/link';
import AnimatedBrain from '@/components/AnimatedBrain';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-purple-400">Engram</div>
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
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
            Test Your AI's Memory
          </h1>
          <p className="text-lg text-slate-300 mb-2 max-w-2xl mx-auto">
            Find out how good (or bad) your AI memory system really is
          </p>
          <p className="text-sm text-slate-400 mb-8 max-w-2xl mx-auto">
            Most AI systems score <span className="text-red-400 font-bold">15/100</span>. Engram scores <span className="text-green-400 font-bold">87/100</span>. Where do you rank?
          </p>

          {/* Primary CTA - BIG and Clear */}
          <div className="mb-12">
            <Link
              href="/benchmark"
              className="inline-block bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold py-4 px-10 rounded-lg text-xl transition transform hover:scale-105 shadow-lg shadow-purple-500/50"
            >
              Take the Free Test (5 minutes) →
            </Link>
            <p className="text-xs text-slate-400 mt-3">No credit card required</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 max-w-2xl mx-auto">
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-4">
              <p className="text-3xl font-bold text-red-400">15</p>
              <p className="text-xs text-slate-400 mt-1">Average Score</p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-4">
              <p className="text-3xl font-bold text-green-400">87</p>
              <p className="text-xs text-slate-400 mt-1">Engram's Score</p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-4">
              <p className="text-3xl font-bold text-purple-400">?</p>
              <p className="text-xs text-slate-400 mt-1">Your Score</p>
            </div>
          </div>
        </div>

        {/* What We Test - Simple Language */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">What We Measure</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-6 hover:border-purple-500/50 transition">
              <div className="text-3xl mb-3">🔄</div>
              <h3 className="text-lg font-bold text-white mb-2">No Duplicates</h3>
              <p className="text-slate-300 text-sm">
                Does your AI remember the same thing twice? Or is it smart enough to recognize when info repeats?
              </p>
            </div>
            <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-6 hover:border-purple-500/50 transition">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="text-lg font-bold text-white mb-2">Accurate Recall</h3>
              <p className="text-slate-300 text-sm">
                When you ask for a fact in a different way, can it find it? Or does it forget?
              </p>
            </div>
            <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-6 hover:border-purple-500/50 transition">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="text-lg font-bold text-white mb-2">Token Efficiency</h3>
              <p className="text-slate-300 text-sm">
                Is your memory bloated and costing you money? Or is it lean and smart?
              </p>
            </div>
            <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-6 hover:border-purple-500/50 transition">
              <div className="text-3xl mb-3">🏃</div>
              <h3 className="text-lg font-bold text-white mb-2">Fast Retrieval</h3>
              <p className="text-slate-300 text-sm">
                Does it feel instant or does your AI have to dig through junk to find what it needs?
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
