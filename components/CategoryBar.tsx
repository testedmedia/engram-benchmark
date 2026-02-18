"use client";

import { useEffect, useState } from "react";
import { CATEGORIES } from "@/lib/questions";

interface CategoryBarProps {
  categoryId: string;
  userScore: number;
  engramScore?: number;
  animated?: boolean;
}

export default function CategoryBar({
  categoryId,
  userScore,
  engramScore = 87,
  animated = true,
}: CategoryBarProps) {
  const [displayUserScore, setDisplayUserScore] = useState(animated ? 0 : userScore);
  const [displayEngramScore, setDisplayEngramScore] = useState(animated ? 0 : engramScore);

  const category = CATEGORIES[categoryId];

  useEffect(() => {
    if (!animated) {
      setDisplayUserScore(userScore);
      setDisplayEngramScore(engramScore);
      return;
    }

    let userCurrent = 0;
    let engramCurrent = 0;
    const userIncrement = userScore / 20;
    const engramIncrement = engramScore / 20;

    const interval = setInterval(() => {
      userCurrent += userIncrement;
      engramCurrent += engramIncrement;

      if (userCurrent >= userScore) {
        setDisplayUserScore(userScore);
      } else {
        setDisplayUserScore(Math.round(userCurrent));
      }

      if (engramCurrent >= engramScore) {
        setDisplayEngramScore(engramScore);
      } else {
        setDisplayEngramScore(Math.round(engramCurrent));
      }

      if (userCurrent >= userScore && engramCurrent >= engramScore) {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [userScore, engramScore, animated]);

  const getBarColor = (score: number) => {
    if (score >= 85) return "bg-emerald-500";
    if (score >= 70) return "bg-blue-500";
    if (score >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getDifference = userScore - engramScore;
  const differenceText = getDifference > 0 ? `+${getDifference}` : `${getDifference}`;
  const differenceColor = getDifference > 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400";

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-slate-900 dark:text-white">
            {category.name}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {category.weight}% of total score
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-slate-900 dark:text-white">
            {displayUserScore}
          </div>
          <div className={`text-xs font-semibold ${differenceColor}`}>
            {differenceText} vs Engram
          </div>
        </div>
      </div>

      {/* Dual progress bars */}
      <div className="space-y-2">
        {/* User score bar */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
              Your score
            </span>
            <span className="text-xs text-slate-600 dark:text-slate-400">
              {displayUserScore}/100
            </span>
          </div>
          <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className={`h-full ${getBarColor(displayUserScore)} transition-all duration-300 rounded-full`}
              style={{ width: `${displayUserScore}%` }}
            />
          </div>
        </div>

        {/* Engram baseline bar */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
              Engram baseline
            </span>
            <span className="text-xs text-slate-600 dark:text-slate-400">
              {displayEngramScore}/100
            </span>
          </div>
          <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className={`h-full ${getBarColor(displayEngramScore)} transition-all duration-300 rounded-full opacity-60`}
              style={{ width: `${displayEngramScore}%` }}
            />
          </div>
        </div>
      </div>

      {/* Insight */}
      <div className="text-xs text-slate-600 dark:text-slate-400 pt-1">
        {getDifference > 10 ? (
          <span className="text-green-600 dark:text-green-400 font-medium">
            You're ahead of Engram's baseline in this category
          </span>
        ) : getDifference > -10 ? (
          <span className="text-slate-600 dark:text-slate-400">
            You're near Engram's performance in this category
          </span>
        ) : (
          <span className="text-orange-600 dark:text-orange-400 font-medium">
            Opportunity to improve relative to Engram
          </span>
        )}
      </div>
    </div>
  );
}
