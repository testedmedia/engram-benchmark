import { CATEGORIES, QUESTIONS } from './questions';

export interface BenchmarkScores {
  totalScore: number;
  categoryScores: Record<string, number>;
  comparison: {
    engramDifference: number;
    percentile: number;
  };
  wasteEstimate: {
    tokensWasted: number;
    costEstimate: string;
    timeWasted: string;
  };
}

export function calculateScores(answers: Record<string, number>): BenchmarkScores {
  // Initialize category scores
  const categoryScores: Record<string, number> = {};
  let totalPoints = 0;
  let weightedSum = 0;

  // Group questions by category
  const categoryMap: Record<string, any[]> = {};
  QUESTIONS.forEach((q) => {
    if (!categoryMap[q.category]) {
      categoryMap[q.category] = [];
    }
    categoryMap[q.category].push(q);
  });

  // Calculate scores per category
  Object.entries(categoryMap).forEach(([categoryId, questionsInCategory]) => {
    let categoryTotal = 0;
    questionsInCategory.forEach((q) => {
      const answer = answers[q.id];
      const answerIndex = typeof answer === 'string' ? parseInt(answer) : answer || 0;
      if (answerIndex >= 0 && answerIndex < q.options.length) {
        categoryTotal += q.options[answerIndex].score;
      }
    });

    const avgScore = categoryTotal / questionsInCategory.length;
    const scaledScore = Math.round((avgScore / 100) * 100);
    categoryScores[categoryId] = scaledScore;

    const categoryMeta = CATEGORIES[categoryId];
    const categoryMaxPoints = categoryMeta.maxPoints;
    const pointsEarned = (avgScore / 100) * categoryMaxPoints;

    weightedSum += pointsEarned;
    totalPoints += categoryMaxPoints;
  });

  // Calculate total score
  const totalScore = Math.round((weightedSum / totalPoints) * 100);

  // Compare to Engram baseline
  const engramDifference = totalScore - 87;
  const percentile = estimatePercentile(totalScore);

  // Estimate token waste based on score (lower score = higher waste)
  const wasteMultiplier = Math.max(1, 100 - totalScore);
  const tokensWasted = Math.round(500000 * (wasteMultiplier / 100)); // ~500k tokens wasted at score 0

  return {
    totalScore,
    categoryScores,
    comparison: {
      engramDifference,
      percentile,
    },
    wasteEstimate: {
      tokensWasted,
      costEstimate: `$${Math.round((tokensWasted / 1000) * 0.02)}`, // ~$0.02 per 1k tokens
      timeWasted: `${Math.max(1, Math.round(wasteMultiplier / 10))}h/month`,
    },
  };
}

function estimatePercentile(score: number): number {
  const mean = 50;
  const stdev = 15;
  const zScore = (score - mean) / stdev;
  const cdf = 0.5 * (1 + erf(zScore / Math.sqrt(2)));
  return Math.round(cdf * 100);
}

function erf(x: number): number {
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;

  const sign = x < 0 ? -1 : 1;
  x = Math.abs(x);

  const t = 1.0 / (1.0 + p * x);
  const y =
    1.0 -
    (((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-x * x));

  return sign * y;
}

export function getGrade(score: number): string {
  if (score >= 85) return 'A+';
  if (score >= 80) return 'A';
  if (score >= 75) return 'B+';
  if (score >= 70) return 'B';
  if (score >= 65) return 'C+';
  if (score >= 60) return 'C';
  return 'F';
}

export function getScoreColor(score: number): string {
  if (score >= 85) return 'url(#gradientPurple)';
  if (score >= 70) return 'url(#gradientBlue)';
  if (score >= 50) return 'url(#gradientYellow)';
  return 'url(#gradientRed)';
}
