---
id: "planets"
emoji: "🪐"
title: "Planets"
summary_short: >
  A **fully on-chain planetary colony builder** where each planet is an NFT with a
  **custom SVG renderer** generating its visuals on-chain. Build structures, manage
  colonists, gather resources, and survive alien invasions to complete your spaceport.
summary_long: >
  Planets implements the **embeddable game standard** from game-components, making
  each planet a composable on-chain minigame. Players found colonies, construct
  buildings (water wells, iron mines, uranium mines, barracks, workshops, cannons),
  assign colonists as workers, and collect resources every 30-second epoch. A combat
  system pits colonists against periodic **invader waves**, with barracks-trained
  colonists gaining strength over time. The on-chain **SVG renderer contract**
  generates dynamic planet visuals from live Dojo model state, with terrain
  influencing building output. 18 Dojo models back the full game state across
  **4 Cairo contract systems**.
work_done_short: >
  **Built entirely during the jam.** Full colony-builder loop implemented: buildings,
  colonists, resource collection, invader combat, upgrades, and a spaceport win
  condition across 4 systems and **18 Dojo models**.
work_done_long: >
  All contracts were written from scratch: a **game system** handling found-colony,
  construct-building, assign-workers, collect, upgrade, and fight-invader actions;
  a **planet query system** for efficient state reads; a **game token system** for
  NFT minting; and an **on-chain SVG renderer** that generates procedural planet
  art from live model state. The Svelte + Three.js frontend connects via Cartridge
  Controller, reading chain state directly with starknet.js.
repo_url: "https://github.com/ZackAmes/planets"
demo_url: "https://planets-tau-ochre.vercel.app/"
video_url: null
team:
  - "Presorts"
metrics:
  classification: "Whole Game"
  team_size: 1
  dojo_models: 18
  dojo_systems: 4
  dojo_events: 0
  client_sdk: "None"
  jam_commits_pct: 100
  gameplay: "Onchain"
---

# Planets

### Project Summary
Fully onchain planetary colony builder. Implements the embeddable game standard with custom svg renderer

### Source Code
https://github.com/ZackAmes/planets

### Live Demo
https://planets-tau-ochre.vercel.app/

### How to Play
Build your colony, survive invasions, and try to complete the spaceport

### Twitter
@Zackames

### Team Members
Presorts
