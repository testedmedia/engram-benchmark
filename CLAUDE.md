# Engram Memory Benchmark

## Current Status
**Version:** v1.1
**Last Updated:** 2026-02-18
**Status:** Ready for deployment to Vercel

## What This Is
A free web-based tool that tests AI memory systems across 5 key dimensions. Users answer 15 multiple-choice questions and get an instant score (0-100) comparing their AI's memory quality to Engram's enterprise baseline (87/100).

## User Flow
1. **Home page** (`/`) - Hero with animated brain, explain what the test is
2. **Benchmark intro** (`/benchmark`) - Explain the 5 categories and how scoring works
3. **Test** (`/benchmark/test`) - 15-question wizard, tool selector (Claude Code, Cursor, GPT, etc.)
4. **Results** (`/benchmark/results/[id]`) - Score reveal, category breakdown, shareable card, email capture
5. **Changelog** (`/changelog`) - Version history

## Stack
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS
- **Database:** Supabase (for storing results + leads)
- **Hosting:** Vercel
- **Icons:** lucide-react
- **Build Command:** `npm run build`
- **Install Command:** `npm install --legacy-peer-deps`

## Key Components
| File | Purpose |
|------|---------|
| `lib/questions.ts` | 15 questions across 5 categories with scoring options |
| `lib/scoring.ts` | Score calculation engine, grade mapping, waste estimation |
| `components/AnimatedBrain.tsx` | Animated neuron/synapse visualization on homepage |
| `components/QuestionWizard.tsx` | 15-question form with progress bar |
| `components/ScoreRing.tsx` | Animated SVG circular progress ring for score |
| `components/ShareableResultCard.tsx` | Generates downloadable PNG card + social sharing |
| `app/api/benchmark/submit/route.ts` | POST endpoint to save results to Supabase |
| `app/api/leads/capture/route.ts` | POST endpoint to capture emails |

## Data Flow
```
Questions (user answers)
→ /api/benchmark/submit
→ calculateScores()
→ Save to Supabase
→ Return ID
→ Redirect to /results/[id]
→ Display score + shareable card
```

## Scoring System
- **5 Categories** with different weights:
  - Duplicate Prevention (25%)
  - Recall Accuracy (30%)
  - Token Efficiency (20%)
  - Retrieval Speed (15%)
  - System Health (10%)
- **3 questions per category** with 4 options each (0-100 points)
- **Total Score** = Weighted average of all category scores (0-100)
- **Grade** = A+/A/B+/B/C+/C/F based on score bands
- **Baseline** = Engram scores 87/100 (shown for comparison)

## Database (Supabase)
```sql
benchmark_results (
  id TEXT PRIMARY KEY,
  tool TEXT,
  answers JSONB,
  scores JSONB,
  total_score INTEGER,
  grade TEXT,
  created_at TIMESTAMP
)

leads (
  id SERIAL PRIMARY KEY,
  email TEXT,
  benchmark_id TEXT,
  tool TEXT,
  score INTEGER,
  created_at TIMESTAMP
)
```

## Environment Variables
| Variable | Purpose | Required |
|----------|---------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_KEY` | Supabase public key (anon) | Yes |

Create `.env.local` with these values. See `.env.example` for template.

## Test Commands
```bash
npm run test:types      # TypeScript type check
npm run test:unit       # Unit tests (if added)
npm test               # Run all tests
```

## Deploy Commands
```bash
npm run build           # Build for production
npx vercel --prod      # Deploy to Vercel production
bash scripts/deploy.sh  # (if deploy script is created)
```

## Known Issues / TODO
- **Integration with engram-nine.vercel.app:** This is deployed as a standalone app. To add it to the main Engram site at `/playground`:
  - Option A: Import this as a subroute in the main engram-nine.vercel.app project
  - Option B: Use Vercel rewrites to route `/playground` traffic to this app
  - Option C: Rebuild this as a standalone Next.js app and make it the primary endpoint

- **Missing CLI version:** The plan included a CLI tool (`engram-benchmark.sh`) for testing real memory systems. Not implemented yet.
- **No Vercel deployment yet:** This is ready to deploy but requires Vercel authentication. Run `npx vercel --prod` after linking the project.

## Deployment Instructions (For User)

### Step 1: Create Supabase Project
1. Go to supabase.com, create a new project
2. Copy the Project URL and Anon Key
3. Create the two tables above using SQL queries

### Step 2: Set Environment Variables
1. In Vercel project dashboard, go to Settings → Environment Variables
2. Add:
   - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_KEY` = your Supabase anon key

### Step 3: Deploy
```bash
# Option A: Using Vercel CLI
npx vercel --prod

# Option B: Using git push (if connected)
git push origin master

# Option C: Using Vercel UI
# Go to vercel.com → New → Import Git Repository → Select this project
```

### Step 4: Verify Live
- Visit https://[your-project].vercel.app
- Click "Take the Free Test"
- Answer all 15 questions
- Verify results page shows score, breakdown, and shareable card

## Next Steps (Not Done Yet)
1. ✅ Build core benchmark app
2. ✅ Add animated visuals (brain animation)
3. ✅ Create shareable result cards
4. ✅ Improve UX copy (idiot-proof)
5. ⏳ Deploy to Vercel
6. ❌ Integrate at `/playground` on engram-nine.vercel.app
7. ❌ Update main Engram website with product info
8. ❌ Create CLI version for real memory testing
9. ❌ Add more animations/3D elements

## CRO Optimizations Done
- ✅ Large, clear primary CTA button
- ✅ Simple language (no jargon)
- ✅ Animated brain hero section (visual interest)
- ✅ Emoji icons for quick understanding
- ✅ Three-stat comparison (Industry avg vs Engram vs Your score)
- ✅ "No credit card required" trust signal
- ✅ Time estimate (5 minutes)
- ✅ Shareable cards for viral potential
- ✅ Post-score email capture CTA

## File Structure
```
engram/
├── app/
│   ├── page.tsx                    # Landing (hero + CTA)
│   ├── benchmark/
│   │   ├── page.tsx               # Benchmark intro
│   │   ├── test/page.tsx          # 15-question wizard
│   │   └── results/[id]/page.tsx  # Results + share
│   ├── changelog/page.tsx         # Changelog
│   ├── api/
│   │   ├── benchmark/submit/route.ts
│   │   ├── leads/capture/route.ts
│   │   └── health/route.ts
│   └── layout.tsx                 # Root layout
├── components/
│   ├── AnimatedBrain.tsx
│   ├── QuestionWizard.tsx
│   ├── ScoreRing.tsx
│   ├── CategoryBar.tsx
│   ├── ResultsPanel.tsx
│   └── ShareableResultCard.tsx
├── lib/
│   ├── questions.ts               # Question definitions
│   ├── scoring.ts                 # Score engine
│   ├── supabase.ts               # Supabase client
│   └── globals.css               # Tailwind + dark theme
├── package.json
├── tsconfig.json
├── next.config.js
├── vercel.json
├── .env.example
└── .env.local (SECRET - not in git)
```

## Notes
- All UI is dark-theme by default (modern, premium feel)
- TypeScript strict mode enabled
- No external color libraries - using Tailwind classes
- Animations are hardware-accelerated (SVG + CSS transitions)
- Component props are fully typed
