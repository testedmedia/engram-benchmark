# Hookify Rule: Block Direct Git Push

**Type:** BLOCK
**Trigger:** Any attempt to run `git push`, `vercel deploy`, `eas build`, or direct deploy commands
**Action:** BLOCK — refuse to execute
**Message:** "BLOCKED: Use scripts/deploy.sh instead. Direct deploy commands are never allowed."

## Details

All deployments must go through the structured deploy script which enforces the Debug Quad (4 layers of automated review):
1. Pre-deploy tests (types, unit, API, secrets scan)
2. Codex review (GPT-4.1 automated code review)
3. Jules async review
4. Greptile GitHub integration

Direct deploy commands bypass these critical safety layers and are forbidden.
