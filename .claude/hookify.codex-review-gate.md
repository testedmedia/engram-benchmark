# Hookify Rule: Codex Review Gate

**Type:** WARN
**Trigger:** Before any deploy
**Action:** WARN — remind to run codex-review
**Message:** "Codex review (GPT-4.1) must pass before deploying. This is handled by deploy.sh automatically."

## Details

The Codex review step is mandatory and baked into every `deploy.sh` execution. It sends the diff to GPT-4.1 for automated review of:
- Bugs and logic errors
- Security vulnerabilities
- Performance issues
- Code quality concerns

Deploy will be blocked if Codex review fails.
