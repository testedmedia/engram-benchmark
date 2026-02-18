"use client";

import { useEffect, useState } from "react";
import { getGrade, getScoreColor } from "@/lib/scoring";

interface ScoreRingProps {
  score: number;
  size?: number;
  animated?: boolean;
}

export default function ScoreRing({
  score,
  size = 160,
  animated = true,
}: ScoreRingProps) {
  const [displayScore, setDisplayScore] = useState(animated ? 0 : score);

  useEffect(() => {
    if (!animated) {
      setDisplayScore(score);
      return;
    }

    // Animate from 0 to score over 1.5 seconds
    let current = 0;
    const increment = score / 30; // 30 frames
    const interval = setInterval(() => {
      current += increment;
      if (current >= score) {
        setDisplayScore(score);
        clearInterval(interval);
      } else {
        setDisplayScore(Math.round(current));
      }
    }, 50);

    return () => clearInterval(interval);
  }, [score, animated]);

  const grade = getGrade(displayScore);
  const circumference = 2 * Math.PI * (size / 2 - 8);
  const strokeDashoffset = circumference - (displayScore / 100) * circumference;
  const radius = size / 2 - 8;

  const getGradeColor = (g: string) => {
    if (g === 'A+' || g === 'A') return 'text-green-600 dark:text-green-400';
    if (g === 'B+' || g === 'B') return 'text-blue-600 dark:text-blue-400';
    if (g === 'C+') return 'text-yellow-600 dark:text-yellow-400';
    if (g === 'C') return 'text-orange-600 dark:text-orange-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getGradeLabel = (g: string) => {
    if (g === 'A+') return 'Excellent';
    if (g === 'A') return 'Very Good';
    if (g === 'B+') return 'Good';
    if (g === 'B') return 'Above Average';
    if (g === 'C+') return 'Average';
    if (g === 'C') return 'Below Average';
    return 'Poor';
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <svg width={size} height={size} className="transform -rotate-90">
        <defs>
          <linearGradient id="gradientRed" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#dc2626" />
          </linearGradient>
          <linearGradient id="gradientBlue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>
          <linearGradient id="gradientPurple" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
          <linearGradient id="gradientYellow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#ca8a04" />
          </linearGradient>
        </defs>

        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          className="text-slate-200 dark:text-slate-700"
        />

        {/* Score circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={getScoreColor(displayScore)}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-200"
        />
      </svg>

      <div className="text-center">
        <div className="text-5xl font-bold text-slate-900 dark:text-white">
          {displayScore}
        </div>
        <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          out of 100
        </div>
      </div>

      <div className="text-center">
        <div className={`text-3xl font-bold ${getGradeColor(grade)}`}>
          {grade}
        </div>
        <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          {getGradeLabel(grade)}
        </div>
      </div>
    </div>
  );
}
