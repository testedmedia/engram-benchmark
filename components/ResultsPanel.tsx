"use client";

import { useState } from "react";
import ScoreRing from "./ScoreRing";
import CategoryBar from "./CategoryBar";
import { BenchmarkScores } from "@/lib/scoring";
import { CATEGORIES } from "@/lib/questions";
import {
  Share2,
  Twitter,
  Linkedin,
  Copy,
  Check,
  Mail,
  TrendingUp,
  Zap,
  AlertCircle,
} from "lucide-react";

interface ResultsPanelProps {
  scores: BenchmarkScores;
  toolName: string;
  onEmailCapture?: (email: string) => Promise<void>;
}

export default function ResultsPanel({
  scores,
  toolName,
  onEmailCapture,
}: ResultsPanelProps) {
  const [copied, setCopied] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);

  const handleCopyLink = async () => {
    const url = window.location.href;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;

    setEmailLoading(true);
    try {
      if (onEmailCapture) {
        await onEmailCapture(emailInput);
      }
      setEmailSubmitted(true);
      setEmailInput("");
    } catch (error) {
      console.error("Email submission error:", error);
    } finally {
      setEmailLoading(false);
    }
  };

  const shareText = `I scored ${scores.totalScore}/100 on the Engram Memory Benchmark for ${toolName}! ${scores.comparison.engramDifference > 0 ? `I'm beating Engram's baseline (87) by ${scores.comparison.engramDifference} points!` : `I'm close to Engram's baseline (87).`} Check your own score:`;
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 backdrop-blur">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Your Memory Benchmark Results
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Evaluated: <span className="font-semibold">{toolName}</span>
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Score Ring Section */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 mb-8">
          <div className="flex justify-center">
            <ScoreRing score={scores.totalScore} size={200} animated={true} />
          </div>

          {/* Comparison */}
          <div className="mt-8 p-4 bg-slate-50 dark:bg-slate-700/30 rounded-lg border border-slate-200 dark:border-slate-600">
            <div className="flex items-start gap-3">
              {scores.comparison.engramDifference > 0 ? (
                <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
              )}
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                  {scores.comparison.engramDifference > 0 ? (
                    <>You're ahead of Engram</>
                  ) : (
                    <>Room to improve</>
                  )}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Your score: <span className="font-bold">{scores.totalScore}</span> |
                  Engram baseline: <span className="font-bold">87</span> |
                  Difference: <span className={`font-bold ${scores.comparison.engramDifference > 0 ? 'text-green-600 dark:text-green-400' : 'text-orange-600 dark:text-orange-400'}`}>
                    {scores.comparison.engramDifference > 0 ? '+' : ''}{scores.comparison.engramDifference}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Waste Estimate */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Token Efficiency Impact
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Tokens Wasted */}
            <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
              <div className="text-xs font-semibold text-red-700 dark:text-red-400 mb-1">
                Tokens Wasted
              </div>
              <div className="text-2xl font-bold text-red-900 dark:text-red-300">
                {scores.wasteEstimate.tokensWasted.toLocaleString()}
              </div>
              <div className="text-xs text-red-700 dark:text-red-400 mt-1">
                per month
              </div>
            </div>

            {/* Cost Impact */}
            <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
              <div className="text-xs font-semibold text-orange-700 dark:text-orange-400 mb-1">
                Cost Impact
              </div>
              <div className="text-2xl font-bold text-orange-900 dark:text-orange-300">
                {scores.wasteEstimate.costEstimate}
              </div>
              <div className="text-xs text-orange-700 dark:text-orange-400 mt-1">
                per month
              </div>
            </div>

            {/* Time Waste */}
            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <div className="text-xs font-semibold text-yellow-700 dark:text-yellow-400 mb-1">
                Developer Time
              </div>
              <div className="text-2xl font-bold text-yellow-900 dark:text-yellow-300">
                {scores.wasteEstimate.timeWasted}
              </div>
              <div className="text-xs text-yellow-700 dark:text-yellow-400 mt-1">
                wasted managing memory
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-400 mt-4">
            These estimates are based on typical memory usage patterns. Your actual impact may vary based on scale and implementation.
          </p>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
            Category Breakdown
          </h2>

          <div className="space-y-6">
            {Object.entries(CATEGORIES).map(([categoryId]) => (
              <CategoryBar
                key={categoryId}
                categoryId={categoryId}
                userScore={scores.categoryScores[categoryId] || 0}
                engramScore={87}
                animated={true}
              />
            ))}
          </div>
        </div>

        {/* Share & CTA Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Share Buttons */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Share2 className="w-5 h-5" />
              Share Your Results
            </h2>

            <div className="space-y-2">
              {/* Twitter Share */}
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-blue-50 dark:hover:bg-slate-700/50 transition-all"
              >
                <Twitter className="w-5 h-5 text-blue-400" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Share on Twitter
                </span>
              </a>

              {/* LinkedIn Share */}
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-blue-50 dark:hover:bg-slate-700/50 transition-all"
              >
                <Linkedin className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Share on LinkedIn
                </span>
              </a>

              {/* Copy Link */}
              <button
                onClick={handleCopyLink}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all"
              >
                {copied ? (
                  <>
                    <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">
                      Copied!
                    </span>
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Copy Link
                    </span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Email CTA */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl shadow-lg p-8 border border-blue-200 dark:border-purple-800">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <Mail className="w-5 h-5" />
              Get Recommendations
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              Get a personalized report with specific improvements for your system
            </p>

            {emailSubmitted ? (
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <p className="text-sm font-medium text-green-800 dark:text-green-300">
                  Thanks! Check your email for personalized recommendations.
                </p>
              </div>
            ) : (
              <form onSubmit={handleEmailSubmit} className="space-y-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <button
                  type="submit"
                  disabled={emailLoading || !emailInput.trim()}
                  className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {emailLoading ? "Sending..." : "Send Report"}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Pricing Section */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 text-center">
            Ready to improve your memory system?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Starter */}
            <div className="rounded-lg border border-slate-200 dark:border-slate-700 p-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                Starter
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                For individual developers
              </p>
              <div className="mb-4">
                <span className="text-3xl font-bold text-slate-900 dark:text-white">
                  $29
                </span>
                <span className="text-slate-600 dark:text-slate-400">/month</span>
              </div>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400 mb-6">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                  50K token budget
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                  Basic deduplication
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                  Keyword search
                </li>
              </ul>
              <button className="w-full px-4 py-2 rounded-lg border border-blue-500 text-blue-600 dark:text-blue-400 font-medium hover:bg-blue-50 dark:hover:bg-slate-700/50 transition-all">
                Get Started
              </button>
            </div>

            {/* Professional (Featured) */}
            <div className="rounded-lg border-2 border-blue-500 dark:border-blue-400 p-6 bg-blue-50/50 dark:bg-blue-900/20 relative">
              <div className="absolute -top-3 left-6 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                Most Popular
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 mt-2">
                Professional
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                For teams and projects
              </p>
              <div className="mb-4">
                <span className="text-3xl font-bold text-slate-900 dark:text-white">
                  $99
                </span>
                <span className="text-slate-600 dark:text-slate-400">/month</span>
              </div>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400 mb-6">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                  500K token budget
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                  Semantic search
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                  Multi-dimensional indexing
                </li>
              </ul>
              <button className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium transition-all">
                Subscribe Now
              </button>
            </div>

            {/* Enterprise */}
            <div className="rounded-lg border border-slate-200 dark:border-slate-700 p-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                Enterprise
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                Unlimited scale
              </p>
              <div className="mb-4">
                <span className="text-3xl font-bold text-slate-900 dark:text-white">
                  Custom
                </span>
              </div>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400 mb-6">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                  Unlimited tokens
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                  Advanced ML features
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                  Dedicated support
                </li>
              </ul>
              <button className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
