# Game Jam Submission Screening

This document defines the screening process for Dojo Game Jam submissions.
It is used both as human-readable documentation and as instructions for the automated screening agent.

## Philosophy

**Default to YES.**
Game jams should be inclusive.
Trust participants unless there's clear evidence of a violation.
When in doubt, approve and let judges evaluate the game itself.

## Screening Process

When a submission PR is opened, the screening agent performs the following steps.

### Step 1: Find the Submission

Look in `game-jam-*/*.md` for new or modified files in the PR.
Extract the GitHub repository URL from the submission file.

### Step 2: Parse Jam Dates

Read `README.md` and find the line containing "Coding begins... submissions are due."
Extract the start and end dates.
Use AOE (Anywhere on Earth) timezone.

### Step 3: Clone and Analyze

Clone the submitted repository and perform two analyses:

#### Submission Classification

Calculate what percentage of the repository's total codebase was changed during the jam window.
Compare lines changed (additions + deletions) in jam-window commits vs total lines in the repo.
Exclude lockfiles, generated bindings, and vendored assets from this calculation — they skew the ratio and don't reflect authored work.

- **90% or more** = **Whole Game** submission (the game was built for the jam)
- **Less than 90%** = **Feature** submission (new features added to an existing game)

#### Jam-Window Commit Summary

Identify all commits that fall within the jam window (with reasonable buffer: a day before, a day after).
Produce a concise summary of what those commits contain.
For Feature submissions, describe the changes in the context of the overall game.

### Step 4: Evaluate

#### Dojo Usage (required for both types)

The project must meaningfully use the Dojo engine.

**Pass:**
- Cairo files with `#[dojo::model]`, `#[dojo::contract]`, or `#[dojo::event]`
- Dojo dependencies in `Scarb.toml`
- Frontend imports AND uses `@dojoengine/*` packages (not just generated/dead code)
- World dispatcher usage (`world.read_model()`, `world.write_model()`)

**Fail:**
- No Dojo annotations in Cairo files
- Frontend has contracts but doesn't integrate with them
- Uses a different "Dojo" framework (e.g. the legacy Dojo Toolkit JS library)
- Only config files, no actual implementation

#### Timeline

**For Whole Game submissions:**
- At least 80% of commits should fall within the jam window
- At least 80% of code changes should fall within the jam window
- Flag if the repository was created 3+ months before the jam

**For Feature submissions:**
- The repository will pre-date the jam; this is expected and not suspicious
- Focus on whether the described features were built during the jam window
- At least 80% of the feature-related commits should fall within the jam window
- A few commits before (setup) or after (polish, deployment) are fine

### Step 5: Post Results

Post a PR comment using `gh pr comment` with the following format:

```
<!-- submission-screening-bot -->
## Automated Submission Screening

> [VERDICT BANNER: see below]

### Summary
**Project:** [name]
**Repository:** [url]
**Classification:** [Whole Game / Feature]
**Verdict:** [APPROVED / FLAGGED FOR MANUAL REVIEW]

### Jam-Window Changes
[Summary of what was built/changed during the jam window]
[For Feature submissions: describe how these changes fit into the existing game]

### Timeline Analysis
- First commit: [date]
- Jam-window commits: X of Y total (Z%)
- Lines changed during jam: Z% of total repo
[Assessment]

### Dojo Usage
**Contracts:** [X models, Y systems, Z events]
**Frontend SDK:** [Found/Not found, actual usage detected?]
[Assessment]

---
*Automated screening — a maintainer will perform final review.*
```

**Verdict banner:**
- Use `✅ **Preliminary Check Passed**` when all checks pass
- Use `🚨 **FLAGGED FOR MANUAL REVIEW** 🚨` when any check fails

## Edge Cases

**All commits in one day** — APPROVE.
Developers often work locally and push once.

**Commits 1-2 days after deadline** — APPROVE.
Likely deployment, bug fixes, or polish.

**Very sophisticated project in 3 days** — APPROVE.
Game jams produce impressive results. Don't penalize quality.

**Repository created before jam (Whole Game)** — FLAG.
Ask submitter to clarify. Could be a Feature submission that should be reclassified.

**Contracts exist but frontend doesn't use them** — FLAG.
Dead code doesn't count as Dojo usage.

**Uses "Dojo" but wrong framework** — REJECT.
Must use the Dojo game engine.
