# Hookify Rule: Require Tests

**Type:** WARN
**Trigger:** Editing files in `lib/`, `app/api/`, or `components/` without corresponding test changes
**Action:** WARN — remind to add/update tests
**Message:** "You modified [file] but no test file was updated. Add or update tests before deploying."

## Details

Every exported function, API route, and component should have corresponding tests. Before deploying, ensure:
- New functions in `lib/` have unit tests
- New API routes have integration tests
- Complex components have unit tests
- Tests pass: `npm run test:unit`
