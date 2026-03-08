# Game Jam Submission Screening

Instructions for the automated screening agent.
Runs when a submission PR is opened.

## Philosophy

**Default to YES.**
Game jams should be inclusive.
Trust participants unless there's clear evidence of a violation.
When in doubt, approve and let judges evaluate the game itself.

## Process

### Step 1: Find the Submission

Look in `gj*/*.md` for new or modified files in the PR.
Extract the GitHub repository URL from the submission file.
The URL may appear in various formats — look for any GitHub link in the file and extract the owner/repo.

### Step 2: Parse Jam Dates

Read the jam's `README.md` and find the **Jam Window** field (ISO dates: `YYYY-MM-DD / YYYY-MM-DD`).
Use AOE (Anywhere on Earth) timezone with a 12-hour buffer on each side.

### Step 3: Analyze

Clone the submitted repository and check the following:

#### Dojo Usage

The project must meaningfully use the Dojo engine.

**Pass:**
- Cairo files with `#[dojo::model]`, `#[dojo::contract]`, or `#[dojo::event]`
- Dojo dependencies in `Scarb.toml`
- Frontend that imports AND uses `@dojoengine/*` packages (not just generated/dead code)

**Fail:**
- No Dojo annotations in Cairo files
- Frontend has contracts but doesn't integrate with them
- Uses a different "Dojo" framework (e.g. the legacy Dojo Toolkit JS library)
- Only config files, no actual implementation

#### Client-Contract Integration

Having Dojo artifacts and having a frontend is not enough — they must be **connected**.
This is the most important check.
A common pattern in weak submissions is a working client-side game alongside contracts that exist but aren't wired up.

**Check that the contracts are the source of truth for the game:**

The key question is: **if you removed the contracts, would the game break?**
It is not enough that the client calls the contracts.
The contracts must be *the authority* for the game's core state and rules.

Red flags that the contracts are decorative:
- The client optimistically updates local state after a transaction without reading the result back from the chain.
  This means the client doesn't actually depend on what the contracts compute.
- The game has an off-chain server (WebSocket, REST, etc.) that manages the real game state, and the contracts are called as a side effect.
- The on-chain models and state transitions don't correspond to the game being played.
  For example: the contracts manage a grid-based treasure hunt, but the game is actually a real-time social deduction game on a different-sized map.
- The contract calls are fire-and-forget — errors or reverts don't affect the client's game state.

To verify, trace the game's core loop:
1. What is the primary game state (positions, scores, health, inventory, etc.)?
2. Where does that state live — on-chain models, or client/server memory?
3. When the state changes, does the change flow *through* the contracts, or does it happen independently?

If the core game loop works without the chain, the contracts are decorative regardless of whether the client calls them.

**Check the contracts implement game logic, not just data storage:**
- Do systems contain actual game rules (validation, state transitions, computed outcomes)?
- Or do they only write caller-provided values with no verification?
  A single function that stores a self-reported score is not meaningful game logic.
- Are the models used by any system? Dead models (defined but never read or written) don't count.

**Check that the client actually calls the contracts:**
- Trace from the app entry point (e.g. `main.ts`, `index.html`).
  Packages in `package.json` / `Scarb.toml` don't count — look for actual `import` statements in files that are reachable from the entry point.
- Watch for "bridge" files that set up Dojo connections but are never imported by the application.
  If a file defines `initGame()` or `setupDojo()` but nothing calls it, the integration is dead code.
- Check that `window.*` or global references used by the game are actually initialized somewhere in the import chain.

**Check for deployment evidence:**
- Are world addresses real hex values, or placeholders like `0xYOUR_DOJO_WORLD_ADDRESS`?
- Is there a `manifest.json` or deployment output consistent with a real deployment?
- Placeholder addresses mean the system was never actually connected.

**Pass** if the contracts are the source of truth for the game's core state, the client depends on contract outcomes, and the contracts contain meaningful game logic.

**Flag** if any of these are true:
- Dojo packages are listed as dependencies but never imported in source code
- Connection/initialization code exists in files that are never imported
- Contracts only store caller-provided values with no validation or game logic
- Contract state and logic don't correspond to the actual game being played
- Client updates game state optimistically without depending on contract results
- Core game state lives off-chain (WebSocket server, client memory) and contracts are called as a side effect
- Deployment config contains placeholder addresses

#### Cartridge Controller

The project must use [Cartridge Controller](https://docs.cartridge.gg/controller/overview) for player authentication and wallet management.

**Pass:**
- Frontend imports and uses `@cartridge/connector` or `@cartridge/controller`
- Controller configuration visible (e.g. session key policies, theme customization, paymaster setup)
- Game uses Controller for player onboarding (passkeys, social login, etc.)

**Fail:**
- No Cartridge Controller integration — uses a generic wallet connector instead
- Controller packages installed but never used in the application

#### Timeline

Classify submissions based on how much work happened during the jam window.

**Step A — Commit ratio:**
Count commits inside vs outside the jam window (using the buffered dates from Step 2).
Compute the **jam ratio**: `jam_commits / total_commits`.

**Step B — Diff weight:**
Run `git diff --stat` between boundary commits (last commit before jam start vs last commit before jam end).
Use the diff to interpret the ratio:

- **≥ 50% jam ratio** → **Full submission.** Most work happened during the jam.
- **< 50% jam ratio, large diff** → **Feature submission.** The project predates the jam, but the jam work is a substantial feature or extension.
- **< 50% jam ratio, small diff** → **Flag for review.** Low commit ratio and the jam-window changes are minimal — may not represent meaningful jam participation.
- **0% jam ratio** → **Flag for review** regardless of diff.

The `feature` classification is informational, not disqualifying.
Judges may weigh full and feature submissions differently.

#### Frontmatter

Check whether the submission `.md` file contains YAML frontmatter (a block delimited by `---` at the start of the file).
Frontmatter is generated by the enrichment agent after merge — submitters should not include it.
Submitter-provided frontmatter can contain fabricated metrics or misleading summaries.

**Flag** if frontmatter is present.
Explain that it will be stripped and regenerated by the enrichment agent after merge.

#### File Normalization

If the submission filename is not `kebab-case.md`, note this in the screening comment.
The enrichment agent will normalize it after merge.

### Step 4: Decide

- **APPROVE** if the project uses Dojo, the client and contracts are connected, integrates Cartridge Controller, has commits during the jam window, and contains no frontmatter
- **FLAG** if any check fails — a maintainer will review

### Step 5: Post Comment

Post a PR comment using `gh pr comment` with this format:

```
<!-- submission-screening-bot -->
## Submission Screening

> [✅ **Approved** or 🚨 **Flagged for Manual Review**]

**Project:** [name]
**Repository:** [url]

**Dojo Usage:** [1-2 sentences — what Dojo artifacts were found]
**Client-Contract Integration:** [1-2 sentences — are the contracts the source of truth for the game? Where does core game state live?]
**Cartridge Controller:** [1-2 sentences — how Controller is integrated]
**Timeline:** [jam ratio %, full or feature submission, 1-2 sentences]
**Frontmatter:** [None found, or: flagged — submitter included YAML frontmatter]

[If flagged: explain what triggered the flag]

---
*Automated screening — a maintainer will perform final review.*
```

## Edge Cases

**All commits in one day** — APPROVE.
Developers often work locally and push once.

**Large project with low jam ratio** — APPROVE as `feature`.
The project predates the jam; the jam contribution is a feature or extension.

**Very sophisticated project in 3 days** — APPROVE.
Game jams produce impressive results.

**Contracts exist but frontend doesn't call them** — FLAG.
Packages in `package.json` or bridge files that are never imported don't count.
Trace from the app entry point — if the import chain never reaches the Dojo setup code, the integration is dead.

**Contracts only store self-reported values** — FLAG.
A contract that writes whatever the caller sends (e.g. a `redeem(score)` that just stores the score) is not game logic.
Real Dojo usage means the contracts enforce rules, compute outcomes, or manage state transitions.

**Game works entirely client-side** — FLAG.
If the game is fully playable with no on-chain interaction (all state in memory / localStorage), the Dojo backend is decorative.

**Uses "Dojo" but wrong framework** — FLAG.
Must use the Dojo game engine, not the legacy Dojo Toolkit JS library.

**Contracts are called but don't drive the game** — FLAG.
The client may import Dojo, call contract functions, and even receive responses — but if the game's core state and logic live somewhere else (a WebSocket server, client-side memory, localStorage), the contracts are decorative.
The test is: would the game break if the contracts were removed or replaced with no-ops?

**Submission includes YAML frontmatter** — FLAG.
Frontmatter is generated by the enrichment agent, not submitters.
