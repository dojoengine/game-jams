---
id: "parquiz"
emoji: "🎲"
title: "ParQuiz"
summary_short: >
  A **multiplayer Parchís-style trivia board game** built on Dojo. Roll
  **VRF-backed dice**, answer on-chain-verified trivia questions to unlock
  movement, capture opponents, and race all four tokens home first.
summary_long: >
  ParQuiz layers an on-chain trivia mechanic onto the classic Parchís race
  format. **Config-driven matches** use reusable GameConfig presets with
  runtime snapshots, public matchmaking grouped by config, and host-controlled
  private lobbies by room code. VRF-backed dice and **on-chain question
  verification** enforce fair play, while Cairo contracts validate every
  capture, bridge, and bonus. A fully on-chain **profile and cosmetic system**
  tracks XP, levels, coins, and equipped avatar/dice/token/board loadouts.
  Embeddable Game Standard bindings expose token linking and score queries. The
  React/TypeScript frontend connects via the **Dojo SDK** with Torii
  subscriptions and Cartridge Controller.
work_done_short: >
  **Built the entire game from scratch** during the jam: 34 Dojo models,
  7 systems, and 27 events covering **configs, lobbies, turns, customization,
  profile progression, and EGS bindings**.
work_done_long: >
  Implemented **config-driven match creation** with GameConfig presets and
  runtime snapshots, plus public and private lobby systems. Built turn logic
  with **VRF-backed dice**, on-chain trivia verification, movement validation,
  captures, bridges, and bonuses. Added a full **profile and cosmetic system**
  tracking XP, coins, levels, and equipped loadouts. Integrated Embeddable
  Game Standard for token binding and settings queries. React/TypeScript
  frontend uses the **Dojo SDK, Torii subscriptions, and Cartridge Controller**
  for the full on-chain experience.
repo_url: "https://github.com/Ritx10/Parquiz"
demo_url: "https://parquiz.vercel.app"
video_url: "https://youtu.be/Z6rgHc-X_Tc"
team:
  - "@Ritx10"
  - "@bitfalt"
metrics:
  classification: "Whole Game"
  team_size: 2
  dojo_models: 34
  dojo_systems: 7
  dojo_events: 27
  client_sdk: "dojo.js"
  jam_commits_pct: 100
  playability: "Live"
---

# ParQuiz

## Project Summary

**ParQuiz** is a multiplayer Parchis-style trivia game built with Dojo on Starknet. The competitive game loop is on-chain: reusable rule configs, public matchmaking, private room-code lobbies, VRF-backed dice, question verification, movement validation, captures, bridges, bonuses, winner settlement, and player progression/customization all flow through the contracts.

Technical highlights:
- Config-driven matches with on-chain `GameConfig` presets and runtime snapshots.
- Public matchmaking grouped by `config_id`, plus host-controlled private lobbies by room code.
- VRF-backed dice rolls, on-chain question set verification, and contract-enforced movement/capture rules.
- Fully on-chain profile + customization flow: coins, XP, levels, owned cosmetics, and equipped avatar/dice/token/board loadouts.
- Embeddable Game Standard support for token binding plus score/settings queries.

There is also an off-chain `Practice with AI` mode for solo play, but the main multiplayer experience is contract-authoritative.

## Source Code

https://github.com/Ritx10/Parquiz

## Live Demo

https://parquiz.vercel.app

## Gameplay Video

[Parquiz Gameplay](https://youtu.be/Z6rgHc-X_Tc)

## How to Play

1. Connect with Cartridge Controller.
2. Create/select an on-chain rules config, then join public matchmaking or create a private lobby.
3. Ready up, start the match, and roll for a VRF-backed trivia turn.
4. Answer correctly to unlock movement, race tokens home, capture opponents, and be the first to finish all 4 tokens.

## Architecture

- **Contracts:** Cairo + Dojo systems for configs, lobbies, turns, customization/profile progression, and EGS bindings.
- **Client:** React + TypeScript + Bun frontend using Dojo SDK, Torii subscriptions, and Cartridge Controller.
- **Deployment:** live web client at `parquiz.vercel.app`, with Slot/Sepolia-oriented Dojo deployment flow in the repo.

## Twitter

https://x.com/bitfalt

## Team Members

- @Ritx10 ([GitHub](https://github.com/Ritx10))
- @bitfalt ([GitHub](https://github.com/bitfalt))
