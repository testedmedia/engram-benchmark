# Hookify Rule: Block Environment Variable Commits

**Type:** BLOCK
**Trigger:** Any attempt to `git add` `.env`, `.env.local`, `.env.production`, or files matching `*.secret*`
**Action:** BLOCK — refuse to stage
**Message:** "BLOCKED: Never commit .env or secret files. Use .env.example for templates."

## Details

Never commit secrets, API keys, or sensitive credentials to version control. The `.gitignore` blocks these files automatically, but this rule enforces the policy:

- `.env` — git-ignored ✅
- `.env.local` — git-ignored ✅
- `.env.production` — git-ignored ✅
- `.env.example` — template for developers, safe to commit ✅
- `*.secret` — never commit ✅
- `credentials.json` — never commit ✅

Always use `.env.example` to document required env vars without exposing values.
