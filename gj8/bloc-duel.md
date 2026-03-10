---
id: "bloc-duel"
emoji: "⚔️"
title: "Bloc Duel"
summary_short: >
  A **two-player strategy card game** on Starknet where players draft from a shared
  pyramid, build resource engines, and invoke historical heroes. Win by reaching
  **AGI Breakthrough, Escalation Dominance, Systems Dominance**, or the best points
  total — creating rich multi-path competition from a single shared draft pool.
summary_long: >
  All game state and match logic live **fully on-chain in Dojo contracts**, with the
  client reading and writing through Torii and the Dojo SDK. **Cartridge Controller**
  handles player authentication on Starknet Sepolia, where the game is currently
  deployed. Beyond the browser, the project ships a **headless TypeScript SDK and
  agent skill** supporting programmatic play, self-play, and scripted match
  participation — making it ready for router-based agent integrations. Five Dojo
  models track the pyramid state, game flow, hero pool, pending choices, and per-player
  resources. The frontend is **responsive on mobile and compact screens**, broadening
  accessibility beyond desktop.
work_done_short: >
  **Built entirely during the jam**: a full on-chain card game engine with 5 Dojo
  models and a central actions system covering pyramid drafting, **hero invocation**,
  age progression, and four distinct win conditions.
work_done_long: >
  The team implemented a complete match lifecycle across **5 Dojo models** (Pyramid,
  Game, PendingChoice, HeroPool, PlayerState) and a single **actions contract**
  handling all gameplay transitions. They also shipped a **headless TypeScript SDK**
  enabling programmatic play, agent self-play, and match validation outside the
  browser. The **live Sepolia deployment** uses Cartridge Controller for wallet auth,
  and a mobile-first responsive layout ensures playability across screen sizes.
repo_url: "https://github.com/Eikix/bloc-duel"
demo_url: "https://bloc-duel.vercel.app"
video_url: null
team:
  - "Elias Tazartes (@Eikix)"
  - "Pierre Semanne (@0xMugen)"
  - "Thomas Belloc (@Cheelax)"
metrics:
  classification: "Whole Game"
  team_size: 3
  dojo_models: 5
  dojo_systems: 1
  dojo_events: 0
  client_sdk: "dojo.js"
  jam_commits_pct: 100
  playability: "Live"
---

# Bloc Duel

Last synced: 2026-03-08

### Project Summary
Bloc Duel is a two-player strategy card game on Starknet. Players draft from a shared pyramid, build resource engines, invoke historical heroes, and race across multiple win conditions: AGI, escalation, systems, or points.

What gives the game replayability is the combination of visible shared draft tension and variance: every match reshapes itself through pyramid randomness, hero availability, and competing win lines.

The game logic lives onchain in Dojo contracts and the client reads and writes match state through Torii and the Dojo SDK. The frontend uses Cartridge Controller for player authentication on public networks, and the project also ships a headless SDK plus agent skill so matches can be played programmatically as well as in the browser.

The current public deployment is live on Starknet Sepolia. The game is also intended to stay playable on mobile and compact screens, not only desktop.

A strong future direction for the project is agent-native play: the current SDK already supports self-play, validation, and scripted match participation, which makes integrations with router-based agent systems a plausible next step.

### Source Code
https://github.com/Eikix/bloc-duel

### Live Demo
https://bloc-duel.vercel.app

### Gameplay Video

### How to Play
Connect your wallet, create or join a match, and draft from the shared pyramid.

On each turn, choose one action:
- Play a card
- Discard a card for capital
- Invoke a hero

Advance through the three ages and win by reaching AGI Breakthrough, Escalation Dominance, Systems Dominance, or the best points total at the end.

### Twitter

### Team Members
- Elias Tazartes (@Eikix)
- Pierre Semanne (@0xMugen)
- Thomas Belloc (@Cheelax)
