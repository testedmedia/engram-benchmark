import { createClient } from "@supabase/supabase-js";

const url =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const key =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder";

export const supabase = createClient(url, key);

export interface BenchmarkResult {
  id: string;
  tool: string;
  answers: Record<string, number>;
  scores: {
    dedup: number;
    recall: number;
    efficiency: number;
    speed: number;
    health: number;
  };
  total_score: number;
  grade: string;
  created_at: string;
}

export interface Lead {
  id?: string;
  email: string;
  benchmark_id: string;
  score: number;
  created_at?: string;
}
