'use client';

import { useState } from 'react';
import { QUESTIONS } from '@/lib/questions';
import { useRouter } from 'next/navigation';

export default function QuestionWizard() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [toolName, setToolName] = useState('');
  const [showToolInput, setShowToolInput] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const question = QUESTIONS[currentQuestion];
  const totalQuestions = QUESTIONS.length;
  const progress = Math.round(((currentQuestion + 1) / totalQuestions) * 100);

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!toolName.trim()) {
      setError('Please enter your AI tool name');
      return;
    }
    setError('');
    setShowToolInput(false);
  };

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = {
      ...answers,
      [question.id]: optionIndex,
    };
    setAnswers(newAnswers);

    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Submit the benchmark
      submitBenchmark(newAnswers);
    }
  };

  const submitBenchmark = async (finalAnswers: Record<string, number>) => {
    setLoading(true);
    try {
      const response = await fetch('/api/benchmark/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tool: toolName,
          answers: finalAnswers,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit benchmark');
      }

      const data = await response.json();
      router.push(`/benchmark/results/${data.id}`);
    } catch (err) {
      setError('Failed to submit benchmark. Please try again.');
      setLoading(false);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSkip = () => {
    const newAnswers = {
      ...answers,
      [question.id]: 1, // Default to middle option
    };
    setAnswers(newAnswers);

    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      submitBenchmark(newAnswers);
    }
  };

  if (showToolInput) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Engram</h1>
          <p className="text-slate-600 mb-6">Memory Benchmark</p>
          
          <form onSubmit={handleStart}>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              What AI tool or memory system are you testing?
            </label>
            <input
              type="text"
              value={toolName}
              onChange={(e) => setToolName(e.target.value)}
              placeholder="e.g., GPT-4 with Retrieval, Claude with Supermemory"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
              autoFocus
            />
            {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
            >
              Start Benchmark
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-2xl w-full">
        {/* Header */}
        <div className="mb-6">
          <p className="text-sm text-slate-500 mb-2">
            Question {currentQuestion + 1} of {totalQuestions}
          </p>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <h2 className="text-2xl font-bold text-slate-900 mb-6">{question.text}</h2>

        {/* Category badge */}
        <div className="mb-6">
          <span className="inline-block bg-slate-100 text-slate-700 text-xs font-semibold px-3 py-1 rounded-full capitalize">
            {question.category}
          </span>
        </div>

        {/* Options */}
        <div className="space-y-3 mb-8">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={loading}
              className="w-full text-left p-4 border-2 border-slate-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <div className="flex items-center justify-center h-5 w-5 rounded-full border-2 border-slate-300 group-hover:border-blue-500">
                    <div className="h-3 w-3 rounded-full bg-slate-300" />
                  </div>
                </div>
                <div className="flex-grow">
                  <p className="text-slate-900 font-medium">{option.text}</p>
                  <p className="text-slate-500 text-sm mt-1">Score: {option.score}/100</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex gap-4">
          {currentQuestion > 0 && (
            <button
              onClick={handlePrevious}
              disabled={loading}
              className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
          )}
          <button
            onClick={handleSkip}
            disabled={loading}
            className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Skip
          </button>
          {error && <p className="text-red-600 text-sm">{error}</p>}
        </div>

        {/* Loading indicator */}
        {loading && (
          <div className="mt-4 text-center">
            <p className="text-slate-600">Submitting your benchmark...</p>
          </div>
        )}
      </div>
    </div>
  );
}
