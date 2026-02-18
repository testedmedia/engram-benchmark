import { supabase } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, benchmarkId, score } = body;

    if (!email || !benchmarkId || score === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields: email, benchmarkId, score' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Save to Supabase leads table
    const { error } = await supabase.from('leads').insert({
      email,
      benchmark_id: benchmarkId,
      score,
      created_at: new Date().toISOString(),
    });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to capture email' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Email captured successfully',
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
