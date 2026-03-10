---
id: "athanor"
emoji: "⚗️"
title: "Athanor"
summary_short: >
  A **fully on-chain competitive grimoire race** where players recruit heroes,
  explore dangerous zones, gather ingredients, and **brew potions by trial-and-error**
  to discover 30 secret recipes hidden among 300 possible pairs.
summary_long: >
  Three hero roles (Mage, Rogue, Warrior) venture through **5 escalating zones**
  with outcomes computed on-chain using **Cartridge VRF** — no manipulation possible.
  Discovered potions permanently buff hero stats, enabling deeper exploration. A
  **hint system with escalating gold costs** helps stuck players, while a competitive
  leaderboard ranks by grimoire completion time. Built with **7 Dojo models and 8
  events**, featuring soulbound NFT sessions via the **Embeddable Game Standard**,
  full sound design with 3 music tracks, and an interactive journey map with
  animated hero tokens.
work_done_short: >
  **Built from scratch** during the jam by a two-person team. Full grimoire race
  with **VRF-powered expeditions**, potion brewing, hero progression, and a
  **polished React frontend** with animations and sound.
work_done_long: >
  Implemented 7 models and 2 contracts covering exploration, brewing, hero
  recruitment, hints, and leaderboard systems — all with **on-chain VRF randomness**.
  The React client features an **interactive journey map** with animated tokens and
  zone portals, a **12-step tutorial overlay**, keyboard shortcuts, and full sound
  design via Howler.js. Integrated **Denshokan EGS** for soulbound game sessions
  and Cartridge Controller with session keys for gasless play.
repo_url: "https://github.com/djizus/athanor"
demo_url: "https://athanor-psi.vercel.app"
video_url: "https://youtu.be/-UvEObfDzP8"
team:
  - "@djizus"
  - "@bal7hazar"
metrics:
  classification: "Whole Game"
  team_size: 2
  dojo_models: 7
  dojo_systems: 2
  dojo_events: 8
  client_sdk: "dojo.js"
  jam_commits_pct: 100
  gameplay: "Onchain"
---

# Athanor

## Project Summary

**Athanor** is a fully on-chain competitive grimoire race built on Starknet using the Dojo engine.

Players recruit heroes (Mage, Rogue, or Warrior), send them on expeditions through 5 increasingly dangerous zones, gather ingredients, and brew potions by combining pairs of ingredients. Most combinations fail — yielding soup and a gold coin — but 30 secret recipes are hidden among 300 possible pairs. Discover all 30 to complete the grimoire and claim the fastest time on the leaderboard.

**Core loop**: Explore zones > Gather ingredients & gold > Brew potions by trial-and-error > Buff heroes > Push deeper > Complete the grimoire.

Features:
- 5 exploration zones with escalating danger (Amber Hollows, Ember Cavern, Aether Spire, Sunken Abyss, Crystalveil Reach)
- 25 unique ingredients (5 per zone) and 300 possible pairings hiding 30 secret recipes
- 3 hero roles (Mage, Rogue, Warrior) with recruitable progression, persistent HP/power/regen stats, and potion-based permanent buffs
- 30 discoverable potion effects across 3 categories: health, power, and regen
- Expedition outcomes fully computed on-chain at send time using Cartridge VRF — no manipulation possible after commit
- Hint system with escalating gold cost (10 → 30 → 90 → ...) to reveal recipe clues
- Competitive leaderboard ranked by grimoire completion time
- Soulbound NFT game sessions via Provable Games embeddable game standard (Denshokan)
- Interactive journey map with animated hero tokens, zone portals, floating combat/loot text, and loot-claim burst effects
- 12-step interactive tutorial overlay for new players
- Full sound design: 3 music tracks, 15+ SFX via Howler.js
- Keyboard shortcuts for power users (Tab cycle heroes, 1-5 explore zones, D discover all, G grimoire)
- Cartridge Controller with session keys for gasless play
- Deployed on Sepolia with live Torii indexer

## Source Code

https://github.com/djizus/athanor

## Live Demo

https://athanor-psi.vercel.app

## Gameplay Video

https://youtu.be/-UvEObfDzP8

## How to Play

1. Connect with Cartridge Controller (Google, Discord, or passkey signup)
2. Click "New Game" to mint a game session — your first hero is assigned randomly
3. Send your hero to explore one of 5 zones using the journey map (click a portal or press 1-5)
4. Wait for the hero to return (expedition time depends on how deep they survive), then claim loot
5. Open the Brew tab — select two ingredients and brew. If the pair matches a secret recipe, you discover a potion! If not, you get soup (+1 gold)
6. Apply discovered potions to heroes to permanently buff their HP, power, or regen
7. Recruit up to 2 more heroes with gold (costs 80 and 200 gold)
8. Buy hints with gold if you're stuck — each hint reveals one ingredient of an undiscovered recipe
9. Discover all 30 recipes to complete the grimoire and set your time on the leaderboard!

## Twitter

@djizus_

## Team Members

- @djizus ([GitHub](https://github.com/djizus))
- @bal7hazar ([GitHub](https://github.com/bal7hazar))
