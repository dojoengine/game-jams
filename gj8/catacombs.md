---
id: "catacombs"
emoji: "🐱"
title: "Catacombs"
summary_short: >
  A **fully on-chain cat roguelike** inspired by Slay the Spire and Mewgenics. Create and mint
  cats with unique stats and bit-packed appearance, then send them into branching dungeon runs where
  **six-skill checks determine survival**. Features an embedded **3D Godot cat viewer** inside a
  React frontend, with Cartridge Controller and Embeddable Game Standard integration.
summary_long: >
  Each cat carries six skills — stealth, combat, charm, agility, arcane, survival — and traverses
  a **deterministic 8-column DAG map** generated from a seed, choosing paths through Combat, Event,
  Treasure, Rest, and Boss nodes. Encounters use a **two-step oracle resolution**: submit a scenario
  hash on-chain, then resolve with skill-check outcomes that apply HP/XP/loot and level-up. An
  **EGS adapter contract** bridges to the Embeddable Game Standard via cross-contract calls. The
  Godot 4.6 3D cat viewer (HTML5 export hosted on Cloudflare R2) communicates with the React
  frontend via postMessage, backed by **12 Dojo models**, 4 systems, and 14 events on Sepolia.
work_done_short: >
  **Built entirely during the jam**: full on-chain roguelike with 12 Cairo models, 4 systems,
  deterministic DAG map generation, two-step oracle encounter resolution, a SHINIES token economy,
  and a **3D Godot cat viewer** with hat and weapon customization.
work_done_long: >
  The team delivered the complete contract layer — cat creation and roster management, run and node
  tracking, encounter skill-check resolution, and the SHINIES buy/spend economy — plus a standalone
  **EGS adapter** for Embeddable Game Standard compatibility. The React frontend integrates the
  **Dojo SDK** for real-time world queries, Cartridge Controller for auth on Sepolia, and a Godot
  4.6 HTML5 cat viewer embedded via postMessage. All **43 commits** fall within the jam window,
  representing a ground-up build in 72 hours.
repo_url: "https://github.com/urtimus-prime/catacombs"
demo_url: "https://catacombs.noods.cc"
video_url: null
team:
  - "@polats"
  - "@urtimus-prime"
  - "@potnoodledev"
metrics:
  classification: "Whole Game"
  team_size: 3
  dojo_models: 12
  dojo_systems: 4
  dojo_events: 14
  client_sdk: "dojo.js"
  jam_commits_pct: 100
  gameplay: "Onchain"
---

# Catacombs

A cat-like rogue-like! Create cats on-chain and send them on rogue-like quests, make sure to consider their skills and plan out their route. Integrated with the embeddable game standard.

---

## Project Summary

**Catacombs** is a 3d (Godot) web-based on-chain game that takes inspiration from rogue-like games such as Slay the Spire and Mewgenics. Create and mint your group of cats and send them on quests into the catacombs. Their skills determine their success, and your risk-reward intuition will determine how far they go. Try to level them up as high as you can!

Features:
- 3D cats with character customization
- Mobile responsive
- Fully on-chain game state
- Cartidge Controller
- EGS integrated

## Source Code

https://github.com/urtimus-prime/catacombs

## Live Demo

* https://catacombs-staging.noods.cc/ (staging)
* https://catacombs.noods.cc (production - but still in testnet and updated later!)

## How to Play

1. Click "Start Playing"
2. Login on Cartridge and approve contracts
3. Go on CATS tab and BUY 10 SHINIES
4. Customize your cat and summon!
4. Go to CATACOMBS tab and send your cat on a run
5. Strategically choose events and make sure your cat comes back alive!

## Architecture

### Smart Contracts (Cairo)

Built with Dojo 1.8.0 (Cairo 2.13.1):

  **Models:**
  - `Cat` — persistent roster character with HP, stats (ATK/DEF/SPD/LCK), level, XP, and bit-packed appearance
  - `Run` — a single expedition through the catacombs, tracking current node, score, and status
  (Active/Completed/Failed)
  - `Node` — map tile in a run's DAG, with type (Combat/Event/Treasure/Rest/Boss), skill tags, difficulty, and
  bit-packed connections
  - `Encounter` — skill check record for a node, storing result (Success/Partial/Failure), HP delta, XP gained,
  and loot
  - `Item` — loot drop bound to a cat, with slot and power
  - `ShinyBalance` — in-game currency (SHINIES) per player

  **Systems:**
  - `cat_actions` — create cats (costs 10 SHINIES), verify identity via oracle, read cat state
  - `run_actions` — start runs (generates deterministic 8-column DAG map from seed), choose paths, abandon runs
  - `encounter_actions` — two-step oracle resolution: submit scenario hash, then resolve with skill check
  outcome (applies HP/XP/loot/level-up)
  - `shiny_actions` — buy SHINIES with STRK (1:1)

  **Helpers:**
  - `random` — deterministic and tx-seeded RNG for map generation and stat rolls
  - `skills` — six skill tags: stealth, combat, charm, agility, arcane, survival

  ### EGS Adapter (Cairo 2.16.0, standalone)

  Bridges Catacombs to the Embeddable Game Standard via cross-contract calls:
  - `mint_and_register(to, run_id)` — mint Denshokan ERC721 token and bind to a run
  - `score(token_id)` / `game_over(token_id)` — read run state for EGS compatibility

### Client

  - React 18 + TypeScript + Vite
  - Dojo SDK (`@dojoengine/sdk`) for world queries
  - starknet.js v8 + `@starknet-react/core` for chain interaction
  - Cartridge Controller (Sepolia/Mainnet) or MockConnector burner (local/Slot)
  - Godot 4.6 3D cat viewer (HTML5 export, hosted on Cloudflare R2, communicates via postMessage)


## Team Members

- @polats ([GitHub](https://github.com/polats)) - Human Game Designer / AI Orchestrator
- @urtimus-prime ([GitHub](https://github.com/urtimus-prime)) - Main Game AI (Claude Code)
- @potnoodledev ([GitHub](https://github.com/potnoodledev)) - Godot Cat Viewer AI (Claude Code)

## Twitter

@polats
