# Deployment Checklist

## Before Deploying
- [ ] Supabase project created with 2 tables (`benchmark_results` and `leads`)
- [ ] Environment variables set in Vercel (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_KEY)
- [ ] All TypeScript compiles: `npm run build` passes
- [ ] Verified locally: `npm run dev` and tested full flow
- [ ] Git commits are clean: `git log --oneline | head -5`

## Deployment Steps
1. [ ] Run: `npx vercel --prod`
2. [ ] Wait for build to complete (usually 2-3 minutes)
3. [ ] Note the deployment URL (e.g., engram-benchmark.vercel.app)
4. [ ] Test live: Visit the URL, take the test, verify results page works

## Post-Deployment Verification
- [ ] Homepage loads with animated brain
- [ ] Click "Take the Free Test" button works
- [ ] Benchmark intro page loads
- [ ] Can answer all 15 questions without errors
- [ ] Results page shows score and shareable card
- [ ] Email capture form works
- [ ] Shareable card download button works (if client-side Canvas works)
- [ ] Share to X/Twitter link is pre-populated

## Integration Steps (To add to engram-nine.vercel.app)
1. [ ] Add this benchmark app URL to the main site's navigation
2. [ ] Create `/playground` route that loads this benchmark
3. [ ] Or use Vercel rewrites in main project's `vercel.json` to proxy `/playground` traffic

## If Deployment Fails
- Check Vercel build logs for errors
- Verify environment variables are set
- Ensure Supabase tables exist and have correct schema
- Try rebuilding locally: `rm -rf .next && npm run build`
- Check that all imports are correct

## Production URLs
- **App:** https://[your-vercel-project].vercel.app
- **Benchmark intro:** https://[your-vercel-project].vercel.app/benchmark
- **Results:** https://[your-vercel-project].vercel.app/benchmark/results/[id]
- **Health check:** https://[your-vercel-project].vercel.app/api/health

## Rollback
If something breaks after deploy:
- `npx vercel rollback` (goes to previous deployment)
- Or manually select a previous deployment in Vercel dashboard
