---
id: "tactical-beasts"
emoji: "🐉"
title: "Tactical Beasts"
summary_short: >
  A **PvP 1v1 turn-based tactical game** on Starknet where players build teams of
  3 beasts from **Loot Survivor NFTs** and battle on a hex grid. Combat uses the
  **Death Mountain damage formula and type triangle**, with all game logic resolved
  on-chain via Dojo contracts.
summary_long: >
  Players authenticate with **Cartridge Controller** and select 3 beasts from their
  Loot Survivor NFT collection — team composition is validated on-chain against tier
  limits and subclass balance rules. Battles play out on a hex board with obstacles;
  each turn a player can move, attack, or use a consumable, with the contract
  resolving **damage, passives, crits, and counterattacks**. The game integrates with
  the broader Provable Games ecosystem: it is **EGS-compatible for Budokan tournament
  play** and sources beasts directly from Loot Survivor. State is tracked across
  **12 Dojo models** covering game sessions, beast state, player profiles, and
  matchmaking, with a React frontend reading and writing through **Torii and the Dojo SDK**.
work_done_short: >
  **Built from scratch** during the jam. Full hex-grid tactical combat engine in
  Cairo with **matchmaking, team selection, and EGS tournament integration**, all
  deployed to Sepolia in 72 hours.
work_done_long: >
  The team implemented **12 Dojo models** spanning game lifecycle, beast state,
  map layout, player profiles, and score tracking, plus a **game system contract**
  handling the full combat loop — move validation, damage resolution, passives,
  crits, and counterattacks. A **Supabase-backed private invite system** enables
  friendly matches with custom rules. The React frontend was built mobile-first
  with real-time board updates via **Torii**, Cartridge Controller auth, and full
  EGS integration for Budokan-compatible tournaments.
repo_url: "https://github.com/dpinones/tactical-beasts"
demo_url: "https://tactical-beasts-sepolia.vercel.app"
video_url: "https://youtu.be/xJ5iF3fTE1Y"
team:
  - "@dpinones"
  - "@pilitoo"
metrics:
  classification: "Whole Game"
  team_size: 2
  dojo_models: 12
  dojo_systems: 1
  dojo_events: 3
  client_sdk: "dojo.js"
  jam_commits_pct: 100
  gameplay: "Onchain"
---

# Tactical Beasts

### Project Summary
Tactical Beasts is a PvP 1v1 turn-based tactical game on Starknet. Each player builds a team of 3 beast NFTs from Loot Survivor and battles on a hex grid with obstacles.

Game logic lives onchain in Dojo contracts — damage formulas, the combat triangle, and team validation all resolve in Cairo. The client reads and writes match state through Torii and the Dojo SDK. Players authenticate with Cartridge Controller on public networks.

Part of the Provable Games ecosystem: beasts come from Loot Survivor NFTs, combat uses Death Mountain's damage formula and type triangle, and matches are EGS-compatible for Budokan tournament integration.

The game is designed to be playable on mobile and compact screens, not only desktop.

### Source Code
https://github.com/dpinones/tactical-beasts

### Live Demo
https://tactical-beasts-sepolia.vercel.app

### Gameplay Video
https://youtu.be/xJ5iF3fTE1Y

### How to Play
1. Connect your **Cartridge Controller** wallet
2. **Find Match** to queue into matchmaking, or **Invite a Friend** to create a private game with custom rules
3. **Select your team** — pick 3 beasts from your NFT collection (tier limits and subclass balance validated onchain)
4. **Battle** — alternating turns on a hex board. Each turn: move, attack, or use a consumable. The contract resolves damage, passives, crits, and counterattacks
5. **Win** by KO'ing all opposing beasts — stats and score are recorded onchain

### Twitter
- Damian Piñones - [@dpinoness](https://x.com/dpinoness)
- Ivan Piñones - [@pilito_06](https://x.com/pilito_06)

### Team Members
- [@dpinones](https://github.com/dpinones)
- [@pilitoo](https://github.com/pilitoo)
