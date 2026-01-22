# Game Jam Submission Screening Guidelines

This document outlines the process for screening Dojo Game Jam submissions to ensure they meet the minimum requirements for participation.

## Overview

The screening process is designed to be **pragmatic and inclusive** while maintaining the integrity of the game jam.
The goal is to verify that submissions:

1. Meaningfully use the Dojo game engine
2. Were built during (or primarily for) the game jam period

## Evaluation Criteria

### 1. Meaningful Dojo Usage (REQUIRED)

**PASS Criteria:**
- Project uses Dojo game engine (Cairo smart contracts with Dojo framework)
- Evidence of Dojo models, systems, and world interactions
- Game logic goes beyond default "spawn and move" template
- Proper Dojo dependencies in `Scarb.toml` or similar config

**FAIL Criteria:**
- No evidence of Dojo game engine usage
- Only configuration files present, no actual implementation
- Uses different "Dojo" framework (e.g., legacy Dojo Toolkit JavaScript library)
- Basic template with minimal modifications
- **Frontend does not integrate with Dojo contracts** (contracts exist but are unused/dead code)

**How to Check:**
```bash
# Look for Dojo-specific files and patterns
- Scarb.toml with dojo dependencies
- Cairo files with #[dojo::contract], #[dojo::model], #[dojo::event]
- World dispatcher usage (world.read_model(), world.write_model())
- Dojo configuration files (dojo_*.toml)

# CRITICAL: Verify frontend actually uses the contracts
- Check if frontend imports Dojo SDK packages (@dojoengine/core, etc.)
- Look for contract bindings being imported/used in frontend code
- Verify game hooks/functions are actually called, not just generated
- Check if deployed app actually interacts with Dojo world
- Search for usage of generated hooks: grep -r "useGameData\|useMovePlayer" client/src
```

### 2. Jam Timeline (FLEXIBLE)

**General Guidelines:**
- Game jam typically runs Friday - Sunday (3 days)
- Use AOE (Anywhere on Earth) timezone for start/end
- Allow **reasonable flexibility** for final commits (polish, deployment, fixes)

**PASS Criteria:**
- Bulk of commits within jam window (start date - end date + 1 day)
- Repository created during or shortly before jam
- Concentrated commits are **acceptable** (developers often work locally first)
- Post-deadline commits for bug fixes, deployment, polish are **acceptable**
- Late submissions within ~24 hours are **acceptable** (benefit of doubt)

**NEEDS REVIEW Criteria:**
- Repository created weeks/months before jam
- Significant commit activity before jam start date
- May be allowed if submission is "new features for existing game" (check jam rules)

**FAIL Criteria:**
- Repository created many months before jam (3+ months)
- No commits during jam window at all
- Submission clearly predates jam announcement

**How to Check:**
```bash
# Check repository creation date and commit timeline
git log --all --format="%ai %s" --reverse | head -20  # First commits
git log --all --format="%ai %s" | head -50            # Recent commits

# Check for activity during jam window
git log --since="YYYY-MM-DD" --until="YYYY-MM-DD" --oneline | wc -l
```

## Screening Process

### Step 1: Automated Pre-Screening (GitHub Workflow)

Create a GitHub workflow that runs when PRs are submitted:

```yaml
name: Submission Pre-Screen
on:
  pull_request:
    paths:
      - 'game-jam-*/*.md'

jobs:
  pre-screen:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Extract Repository URL
        id: extract
        run: |
          # Parse submission file for repository URL
          REPO_URL=$(grep -oP 'https://github.com/[^\s]+' $SUBMISSION_FILE)
          echo "repo_url=$REPO_URL" >> $GITHUB_OUTPUT

      - name: Clone and Check Repository
        run: |
          git clone ${{ steps.extract.outputs.repo_url }} temp_repo
          cd temp_repo

          # Check for Dojo files
          echo "=== Checking for Dojo Usage ==="
          find . -name "Scarb.toml" -o -name "dojo*.toml"
          grep -r "#\[dojo::" --include="*.cairo" || echo "WARNING: No Dojo annotations found"

          # Check commit timeline
          echo "=== Commit Timeline ==="
          echo "Repository created: $(git log --reverse --format="%ai" | head -1)"
          echo "Latest commit: $(git log --format="%ai" | head -1)"
          echo "Total commits: $(git log --oneline | wc -l)"
          echo "Commits during jam window: $(git log --since="$JAM_START" --until="$JAM_END" --oneline | wc -l)"

      - name: Comment on PR
        uses: actions/github-script@v6
        with:
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: '## Automated Pre-Screen Results\n\n' +
                    'Please review the workflow logs for preliminary checks.\n' +
                    'A human reviewer will complete the full evaluation.'
            })
```

### Step 2: Manual Review

Use AI assistance (Claude Code) to perform detailed review:

```bash
# Run review for all submissions
claude-code "Review submissions in game-jam-X/submissions.md.
For each repository:
1. Check meaningful Dojo usage (not just config files)
2. CRITICAL: Verify frontend actually integrates with/uses the Dojo contracts
3. Check commit timeline relative to jam dates (Oct 31 - Nov 2, YYYY)
4. Be pragmatic: concentrated commits are OK, late polish commits are OK
5. Focus on: was this built FOR the jam?

Create a formatted report with APPROVED/NEEDS_REVIEW/REJECTED for each."
```

### Step 3: Generate Results

Output format in `submissions-reviewed.md`:

```markdown
## ✅ APPROVED (X)
- List of approved submissions with brief rationale

## ⚠️ NEEDS REVIEW (X)
- List of submissions needing clarification
- Specific questions to ask submitters

## ❌ REJECTED (X)
- List of rejected submissions with clear reasons
```

## Decision Guidelines

### When to APPROVE:
- ✅ Meaningful Dojo usage confirmed
- ✅ Commits primarily during jam window
- ✅ Any reasonable doubt → approve (inclusive approach)

### When to flag for REVIEW:
- ⚠️  Repository created before jam but with jam activity (could be "new features")
- ⚠️  Concentrated commits that seem too complete (could be pre-existing)
- ⚠️  Commits slightly outside window but otherwise legitimate

### When to REJECT:
- ❌ Not using Dojo game engine
- ❌ Cannot verify Dojo usage at all
- ❌ Repository clearly predates jam by months
- ❌ Zero activity during jam window

## Common Edge Cases

### 1. "All commits in one day"
**Decision**: APPROVE
**Reason**: Developers often work locally and push once. This is normal.

### 2. "Commits continue 1-2 days after deadline"
**Decision**: APPROVE
**Reason**: Likely deployment, bug fixes, polish. Core game was built during jam.

### 3. "Repository created before jam"
**Decision**: NEEDS REVIEW
**Reason**: Could be "new features for existing game" (allowed per rules). Ask submitter to clarify scope.

### 4. "Very sophisticated project in 3 days"
**Decision**: APPROVE (unless other red flags)
**Reason**: Game jams produce impressive results. Don't penalize quality.

### 5. "Repository created after deadline"
**Decision**: NEEDS REVIEW
**Reason**: Could be migration from private repo. Contact submitter to verify.

### 6. "Uses 'Dojo' but wrong framework"
**Decision**: REJECT
**Reason**: Must use Dojo game engine, not other frameworks with similar names.

### 7. "Contracts exist but frontend doesn't use them"
**Decision**: REJECT
**Reason**: Having Dojo contracts in the repo doesn't make it a Dojo game if the frontend doesn't integrate with them. Check for actual usage of generated hooks/bindings in the application code, not just their existence. Dead code doesn't count.

## Pragmatic Philosophy

> **"Default to YES"** - If you're unsure, approve it. Game jams should be inclusive.

- Trust participants unless there's clear evidence of violation
- Concentrated commits are normal developer behavior
- A few extra hours for deployment is fine
- Quality of work is not suspicious - game jams produce amazing results
- When in doubt, approve and let judges evaluate the game itself

## Template for Future Jams

```markdown
# Game Jam X Screening

**Jam Dates**: [Start Date] - [End Date] (AOE timezone)
**Evaluation Window**: [Start Date] 00:00 AOE to [End Date + 1] 23:59 AOE
**Screening Date**: [Date]

## Criteria
1. Meaningful Dojo game engine usage
2. Built during/for the jam (pragmatic timeline enforcement)

## Results
- ✅ APPROVED: X submissions
- ⚠️ NEEDS REVIEW: X submissions
- ❌ REJECTED: X submissions

[Detailed breakdown follows...]
```

## GitHub Workflow Implementation

The automated screening workflow is implemented in `.github/workflows/submission-screen.yml`.
It uses the `anthropics/claude-code-action` to have Claude directly analyze submissions and post results as PR comments.

### Setup Instructions

1. **Add the Anthropic API key** to your repository secrets:
   - Go to Settings → Secrets and variables → Actions
   - Add a new secret named `ANTHROPIC_API_KEY` with your API key

2. **Update jam dates** in `README.md`:
   - Claude parses jam dates from the README
   - Format: "Coding begins Friday, October 31 at 00:00 **AOE**, and submissions are due on Sunday, November 2 at 23:59 **AOE**"

3. **Workflow triggers automatically** when:
   - A PR is opened targeting `game-jam-*/*.md` files
   - A PR is updated (synchronize event)
   - A PR is reopened

### What Claude Checks

1. **Timeline Analysis**:
   - Percentage of commits during jam window (flags if <80%)
   - Percentage of code changes during jam window (flags if <80%)
   - Detects if repository was created months before jam

2. **Dojo Usage Verification**:
   - Checks for Dojo contracts (Cairo files with `#[dojo::model]`, `#[dojo::contract]`, `#[dojo::event]`)
   - Checks for Dojo SDK usage in frontend (`@dojoengine/*` packages)
   - **Critical check**: Verifies frontend actually uses the Dojo SDK (not just imports)

### PR Comment Format

Claude posts a comment with:
- 🚨 **FLAGGED FOR MANUAL REVIEW** banner if issues found, or ✅ **Preliminary Check Passed**
- Summary with project name, repository URL, and verdict
- Timeline analysis with commit/line percentages
- Dojo usage breakdown (contracts + frontend SDK)

## Key Takeaway

**Be pragmatic and inclusive.** The screening process should filter out clear violations (wrong framework, no Dojo usage, obviously pre-existing projects) while giving benefit of doubt to legitimate submissions with minor timing quirks or concentrated commit patterns. When uncertain, approve and let the judges evaluate the actual game.
