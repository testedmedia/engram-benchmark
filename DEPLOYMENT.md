# Engram Memory Benchmark — Live Deployment

## Status: LIVE ✅

**Live URL:** https://engram-benchmark-lkb88587t-vics-projects-d6cf8c27.vercel.app

## Deployment Info

- **Provider:** Vercel
- **Repository:** https://github.com/testedmedia/engram-benchmark
- **Branch:** master
- **Deployment ID:** dpl_4JmMpsgHiuSh1KVrzRkZuBYksDpY
- **Status:** READY
- **Deployed:** 2026-02-18 @ 08:35 UTC

## Build Details

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript (strict mode)
- **Build Command:** `npm run build --legacy-peer-deps`
- **Build Time:** ~38 seconds
- **Pages Generated:** 10 (9 static + 1 dynamic)
- **First Load JS:** 109 KB
- **Styling:** Tailwind CSS (dark theme)

## Deployed Features

✅ Homepage with animated brain visualization  
✅ Benchmark introduction page  
✅ 15-question interactive test wizard  
✅ Results page with score breakdown  
✅ Shareable result cards (PNG download + social share)  
✅ Changelog page  
✅ API endpoints:
- `POST /api/benchmark/submit` — Save test results
- `POST /api/leads/capture` — Email capture
- `GET /api/health` — Health check

## Configuration

### Environment Variables (Required)
Add these to Vercel project settings:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### Vercel Settings
- **Deployment Protection:** Currently enabled (Vercel standard)
- **Auto-deployments:** Enabled on `master` branch push
- **Rollback:** Available via Vercel dashboard

## Accessing the App

The live app is currently behind Vercel's deployment protection. To access:

**Option 1 (Recommended): Set Environment Variables**
1. Go to Vercel project dashboard
2. Settings → Environment Variables
3. Add the Supabase credentials above
4. New deployments will be fully functional

**Option 2: Disable Deployment Protection**
1. Go to Vercel project dashboard
2. Settings → Deployment Protection
3. Disable "Protect deployments with a password"
4. App will be publicly accessible

## Next Steps

1. **Database Setup**
   - Create Supabase project
   - Create `benchmark_results` and `leads` tables
   - Add env vars to Vercel

2. **Custom Domain (Optional)**
   - Add domain alias: `benchmark.comiai.co` → this Vercel app
   - Or use: `getengram.dev/benchmark`

3. **Analytics (Optional)**
   - Connect Google Analytics
   - Set up Vercel Analytics

4. **Email Capture (Optional)**
   - Integrate with Sendgrid/Mailgun for lead emails
   - Set up Zapier workflow for notifications

## GitHub Actions / CI

Repository is ready for GitHub Actions. Can add:
- Automated tests on PR
- Type checking
- Linting
- Auto-deploy on merge to master

## Rollback

If needed, roll back to previous deployment:
1. Vercel Dashboard → Deployments
2. Click the deployment you want to restore
3. Click "Promote to Production"

## Support

- **Build logs:** Vercel Dashboard → Deployments → View logs
- **Runtime logs:** Vercel Dashboard → Functions
- **GitHub:** https://github.com/testedmedia/engram-benchmark

---

Deployed by Jarvis | 2026-02-18
