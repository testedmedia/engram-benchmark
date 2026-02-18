import { nanoid } from 'nanoid';
import { supabase } from '@/lib/supabase';
import { calculateScores, getGrade } from '@/lib/scoring';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tool, answers } = body;

    if (!tool || !answers) {
      return NextResponse.json(
        { error: 'Missing required fields: tool, answers' },
        { status: 400 }
      );
    }

    // Calculate scores
    const scores = calculateScores(answers);
    const grade = getGrade(scores.totalScore);

    // Generate unique ID
    const id = nanoid();

    // Save to Supabase
    const { error } = await supabase.from('benchmark_results').insert({
      id,
      tool,
      answers,
      scores: scores.categoryScores,
      total_score: scores.totalScore,
      grade,
      created_at: new Date().toISOString(),
    });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to save benchmark result' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      id,
      scores: scores.categoryScores,
      totalScore: scores.totalScore,
      grade,
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
