'use client';

import Link from 'next/link';
import { CATEGORIES } from '@/lib/questions';

export default function BenchmarkPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/" className="text-slate-300 hover:text-white transition text-sm">
            ← Back to Home
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">Memory Benchmark</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Test your AI's memory system across 5 critical dimensions. 15 questions, ~5 minutes.
          </p>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {Object.values(CATEGORIES).map((category) => (
            <div key={category.id} className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-bold text-white">{category.name}</h3>
                <span className="text-sm font-semibold text-blue-300 bg-blue-900/50 rounded px-3 py-1">
                  {category.weight}%
                </span>
              </div>
              <p className="text-slate-400 text-sm mb-4">{category.description}</p>
              <p className="text-slate-500 text-xs">
                Max Points: <span className="font-bold">{category.maxPoints}</span> | 
                Engram Score: <span className="font-bold text-blue-300">{category.engramBaseline}</span>
              </p>
            </div>
          ))}
        </div>

        {/* How it Works */}
        <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">How It Works</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-600">
                  <span className="text-white font-bold">1</span>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Enter Your Tool Name</h3>
                <p className="text-slate-400 text-sm">
                  Tell us which AI system or memory tool you're testing (e.g., GPT-4 with custom RAG, Claude with Supermemory).
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-600">
                  <span className="text-white font-bold">2</span>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Answer 15 Questions</h3>
                <p className="text-slate-400 text-sm">
                  Each question has 4 options. Pick the one that best describes your system's capabilities.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-600">
                  <span className="text-white font-bold">3</span>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Get Your Score</h3>
                <p className="text-slate-400 text-sm">
                  See how your system scores across all 5 dimensions, with a detailed breakdown and comparison to Engram.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-600">
                  <span className="text-white font-bold">4</span>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Detailed Report</h3>
                <p className="text-slate-400 text-sm">
                  Receive a full analysis with recommendations for how to improve your memory system.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Scoring Info */}
        <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">About the Scoring</h2>
          <p className="text-slate-300 mb-4">
            Each question awards 0-100 points based on your answer. Scores are normalized by category and then weighted to produce an overall memory score (0-100).
          </p>
          <ul className="space-y-2 text-slate-400 text-sm">
            <li>• <strong>Industry Average:</strong> 15 points (most AI systems have basic memory)</li>
            <li>• <strong>Engram Baseline:</strong> 87 points (enterprise-grade reference implementation)</li>
            <li>• <strong>Your Score:</strong> How your system compares</li>
          </ul>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Link
            href="/benchmark/test"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition transform hover:scale-105"
          >
            Start Benchmark →
          </Link>
        </div>
      </div>
    </div>
  );
}
