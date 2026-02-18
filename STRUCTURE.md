# Engram Memory Benchmark - Project Structure

## Pages Created

### 1. Landing Page (`app/page.tsx`)
- Hero section: "How good is your AI's memory?"
- Stats comparing industry average (15), Engram baseline (87), and user score
- 5 feature cards explaining test dimensions
- CTA button linking to `/benchmark`

### 2. Benchmark Intro (`app/benchmark/page.tsx`)
- Overview of the 5 test categories with weights and baselines
- How-it-works steps (1-4)
- Scoring information
- CTA button to start test at `/benchmark/test`

### 3. Benchmark Test (`app/benchmark/test/page.tsx`)
- Uses QuestionWizard component
- Tool name input form
- 15-question wizard with progress bar
- Answer submission and scoring

### 4. Results Page (`app/benchmark/results/[id]/page.tsx`)
- Server-side component fetching from Supabase
- Overall score display with grade
- Category breakdown with scores
- Email capture for detailed report
- Share results functionality
- Link to take another benchmark

### 5. Changelog (`app/changelog/page.tsx`)
- v1.0 MAJOR release (2026-02-18)
- Initial launch features listed

## API Routes Created

### 1. Health Check (`app/api/health/route.ts`)
- GET endpoint
- Returns: `{ status: "ok", version: "1.0.0", timestamp }`

### 2. Benchmark Submit (`app/api/benchmark/submit/route.ts`)
- POST endpoint
- Input: `{ tool: string, answers: Record<string, number> }`
- Uses nanoid for unique ID generation
- Calculates scores using scoring algorithm
- Saves to Supabase `benchmark_results` table
- Returns: `{ id, scores, grade }`

### 3. Leads Capture (`app/api/leads/capture/route.ts`)
- POST endpoint
- Input: `{ email: string, benchmarkId: string, score: number }`
- Email validation
- Saves to Supabase `leads` table
- Returns: success confirmation

## Components Created

### 1. QuestionWizard (`components/QuestionWizard.tsx`)
- Client component (uses 'use client')
- Tool name input form with validation
- 15-question wizard with progress bar
- Previous/Skip buttons
- Auto-submits on last question
- Uses calculateScores from lib/scoring.ts

### 2. ResultsPanel (`components/ResultsPanel.tsx`)
- Client component with interactivity
- Displays overall score with color coding
- Category breakdown with progress bars
- Email capture form
- Share functionality with copy-to-clipboard
- Link to take another benchmark

## Library Files

### 1. Supabase Client (`lib/supabase.ts`)
- Initializes Supabase client
- Types: BenchmarkResult, Lead

### 2. Scoring Engine (`lib/scoring.ts`)
- calculateScores(): Normalizes answers to 0-100 per category, weights them
- getGrade(): Returns letter grade based on overall score
- Handles normalization and weighting logic

### 3. Questions (`lib/questions.ts`)
- Already provided: 15 questions across 5 categories
- Types: Question, QuestionOption, Category
- QUESTIONS array and CATEGORIES metadata

## Database Schema (Supabase)

### benchmark_results table
- id (text, primary key)
- tool (text)
- answers (jsonb)
- scores (jsonb) - { dedup, recall, efficiency, speed, health }
- total_score (number)
- grade (text)
- created_at (timestamp)

### leads table
- id (uuid, primary key, auto)
- email (text)
- benchmark_id (text)
- score (number)
- created_at (timestamp)

## Environment Variables Required

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Features Implemented

✅ Landing page with hero and comparison stats
✅ Benchmark intro with category overview
✅ 15-question wizard with progress tracking
✅ Real-time scoring calculation
✅ Results display with category breakdown
✅ Email capture for leads
✅ Share results functionality
✅ Changelog page
✅ Health check endpoint
✅ Supabase integration for persistence
✅ TypeScript throughout
✅ Tailwind CSS styling
✅ Responsive design (mobile-first)

## Next Steps

1. Set up Supabase tables (benchmark_results, leads)
2. Configure environment variables
3. Test locally with `npm run dev`
4. Deploy to Vercel
5. Create CHANGELOG.md and CLAUDE.md
6. Set up deploy script
