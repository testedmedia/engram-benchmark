'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import ShareableResultCard from '@/components/ShareableResultCard';

interface ResultsPageProps {
  params: Promise<{ id: string }>;
}

export default function ResultsPage({ params }: ResultsPageProps) {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const resolvedParams = await params;
        setId(resolvedParams.id);

        const { data, error: fetchError } = await supabase
          .from('benchmark_results')
          .select('*')
          .eq('id', resolvedParams.id)
          .single();

        if (fetchError || !data) {
          setError('Result not found');
          return;
        }

        setResult(data);
      } catch (err) {
        setError('Failed to load result');
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [params]);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setEmailLoading(true);
    try {
      const response = await fetch('/api/leads/capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          benchmarkId: id,
          score: result.total_score,
        }),
      });

      if (!response.ok) throw new Error('Failed to capture email');
      setEmailSubmitted(true);
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setEmailLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <p className="text-white">Loading results...</p>
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Result Not Found</h1>
          <p className="text-slate-600 mb-6">
            We couldn't find your benchmark result. It may have expired or the link might be invalid.
          </p>
          <Link href="/benchmark" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition">
            Take Another Benchmark
          </Link>
        </div>
      </div>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-blue-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 85) return 'bg-green-50';
    if (score >= 70) return 'bg-blue-50';
    if (score >= 50) return 'bg-yellow-50';
    return 'bg-red-50';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Your Memory Score</h1>
          <p className="text-slate-300 text-lg">Tool: <span className="text-purple-400 font-bold">{result.tool}</span></p>
        </div>

        {/* Shareable Result Card */}
        <div className="mb-8">
          <ShareableResultCard
            toolName={result.tool}
            score={result.total_score}
            grade={result.grade}
          />
        </div>

        {/* Overall Score Card */}
        <div className={`${getScoreBg(result.total_score)} rounded-lg shadow-2xl p-8 mb-8`}>
          <div className="text-center">
            <p className="text-slate-600 text-sm font-semibold mb-2 uppercase">Overall Score</p>
            <p className={`text-6xl font-bold mb-2 ${getScoreColor(result.total_score)}`}>
              {result.total_score}
            </p>
            <p className="text-slate-700 text-lg font-semibold">Grade: {result.grade}</p>
            <p className="text-slate-600 text-sm mt-4">
              Most AI systems score around 15. Engram scores 87.
            </p>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white rounded-lg shadow-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Category Breakdown</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(result.scores || {}).map(([category, score]: [string, any]) => (
              <div key={category} className="bg-slate-50 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-slate-900 capitalize">{category}</h3>
                  <span className={`text-3xl font-bold ${getScoreColor(score)}`}>{score}</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all duration-300 ${
                      score >= 85
                        ? 'bg-green-600'
                        : score >= 70
                        ? 'bg-blue-600'
                        : score >= 50
                        ? 'bg-yellow-600'
                        : 'bg-red-600'
                    }`}
                    style={{ width: `${score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Email Capture */}
        <div className="bg-white rounded-lg shadow-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Get a Detailed Report</h2>
          <p className="text-slate-600 mb-6">
            Enter your email to receive a detailed analysis and recommendations for improvement.
          </p>

          {emailSubmitted ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-800 font-semibold">
                Thanks! Check your email for your detailed report.
              </p>
            </div>
          ) : (
            <form onSubmit={handleEmailSubmit} className="flex gap-4 flex-col sm:flex-row">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                disabled={emailLoading}
                className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-slate-50 disabled:cursor-not-allowed"
              />
              <button
                type="submit"
                disabled={emailLoading || !email}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {emailLoading ? 'Sending...' : 'Send Report'}
              </button>
            </form>
          )}
        </div>

        {/* Share Results */}
        <div className="bg-white rounded-lg shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Share Your Results</h2>
          <p className="text-slate-600 mb-6">
            Let others know how your AI's memory compares. Share this link:
          </p>
          <div className="flex gap-4 flex-col sm:flex-row">
            <input
              type="text"
              value={typeof window !== 'undefined' ? window.location.href : ''}
              readOnly
              className="flex-1 px-4 py-3 border border-slate-300 rounded-lg bg-slate-50 text-slate-700"
            />
            <button
              onClick={() => {
                navigator.clipboard.writeText(
                  typeof window !== 'undefined' ? window.location.href : ''
                );
                alert('Link copied!');
              }}
              className="bg-slate-600 hover:bg-slate-700 text-white font-semibold py-3 px-6 rounded-lg transition whitespace-nowrap"
            >
              Copy Link
            </button>
          </div>
        </div>

        {/* Back to Benchmark */}
        <div className="text-center mt-8">
          <Link
            href="/benchmark"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition"
          >
            Take Another Benchmark
          </Link>
        </div>
      </div>
    </div>
  );
}
