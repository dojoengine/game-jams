---
id: "rekkaimon-forge"
emoji: "🐉"
title: "Rekkaimon Forge"
summary_short: >
  A **fully on-chain creature collection and expedition game** built with Dojo on Starknet.
  Hatch Rekkaimon with **procedurally generated sprites** via Google Gemini, send teams on
  time-gated expeditions, breed hybrid species, and upgrade buildings — all
  **contract-authoritative** with real-time state synced through Torii.
summary_long: >
  All game state lives in 9 Dojo models: `PlayerState`, `CreatureModel`, `EggModel`,
  `ExpeditionModel`, `BuildingState`, `ResourceInventory`, and three counter models.
  Two systems — `game_actions` and `expedition_actions` — handle hatching, breeding,
  training, and expedition resolution. The **building buff system** features six
  upgradeable structures (Incubator, Training Ground, Expedition HQ, Fusion Lab,
  Herbalist, Mine) that apply stat multipliers. A Canvas-based **BFS flood-fill
  pipeline** strips backgrounds from Gemini-generated sprites. Cartridge Controller
  provides **wallet-less session key authentication**, while the React 19 + Zustand
  frontend polls Torii GraphQL for live on-chain state.
work_done_short: >
  **Built from scratch** during the 72-hour jam. Complete ECS architecture with 9 models
  and 2 systems, a **procedural sprite generation pipeline**, upgradeable building economy,
  expedition routing, and creature breeding/fusion system.
work_done_long: >
  The contracts implement the full creature lifecycle — hatching from eggs, stat
  progression, and hybrid breeding with inherited traits. The **expedition system**
  handles multi-creature team selection, route-based difficulty scaling, and
  time-gated loot rewards. Six upgradeable buildings apply buff multipliers across
  all game actions. The React frontend integrates **Cartridge Controller session keys**
  for seamless authentication and uses **Torii GraphQL polling** for real-time
  on-chain state synchronization.
repo_url: "https://github.com/TalesOfRekkai/Juego-autobattle"
demo_url: "https://rekkaimon-forge.vercel.app/"
video_url: "https://drive.google.com/drive/folders/1To3STQPBIRPUs69-Zmv4i7_-EGWj4Eeb?usp=sharing"
team:
  - "@MigueReyRo"
  - "@808ale"
metrics:
  classification: "Whole Game"
  team_size: 2
  dojo_models: 9
  dojo_systems: 2
  dojo_events: 0
  client_sdk: "dojo.js"
  jam_commits_pct: 100
  gameplay: "Onchain"
---

# Rekkaimon Forge

## Project Summary

**Rekkaimon Forge** is a fully on-chain creature collection, breeding, and expedition game built with Dojo Engine on Starknet. All game state lives in smart contracts: creature hatching, stat progression, team-based expeditions with route selection, creature breeding/fusion, building upgrades with buff systems, and resource management are all contract-authoritative.

Technical highlights:
- ECS architecture with Cairo models (`PlayerState`, `CreatureModel`, `EggModel`, `ExpeditionModel`, `BuildingState`, `ResourceInventory`) and systems (`game_actions`, `expedition_actions`).
- Procedural creature generation via Google Gemini API with an automated background removal pipeline using BFS flood-fill and interior blob detection.
- Building buff system with upgradeable buildings (Incubator, Training Ground, Expedition HQ, Fusion Lab, Herbalist, Mine) that apply stat multipliers to game actions.
- Expedition system with multi-creature team selection, route-based difficulty, time-gated resolution, and loot rewards.
- Breeding/Fusion system that combines two creatures to produce hybrid offspring with inherited traits.
- Cartridge Controller integration for wallet-less authentication with session keys.

## Source Code

https://github.com/TalesOfRekkai/Juego-autobattle/tree/main/chimera-forge-react

## Live Demo

https://rekkaimon-forge.vercel.app/


## Gameplay Video

https://drive.google.com/drive/folders/1To3STQPBIRPUs69-Zmv4i7_-EGWj4Eeb?usp=sharing

## How to Play

1. Start a new game — you receive your first egg.
2. Hatch the egg to reveal your starter Rekkaimon with unique element, stats, and a procedurally generated sprite.
3. Send creatures on expeditions across different routes to earn resources such as essence, herbs, crystals, and egg fragments.
4. Use resources to heal, boost, and train your creatures.
5. Upgrade buildings in your hub to unlock buffs and improve efficiency.
6. Breed two creatures to discover new hybrid species.
7. Collect egg fragments to obtain new eggs and expand your collection.

## Architecture

- **Contracts:** Cairo + Dojo v1.8 ECS systems for game logic, creature management, expeditions, breeding, buildings, and resource economy.
- **Client:** React 19 + TypeScript + Zustand frontend with Torii GraphQL polling for on-chain state synchronization.
- **Asset Pipeline:** Google Gemini API for procedural sprite generation with a Canvas-based background removal pipeline.
- **Deployment:** Cartridge Slot (Katana sequencer + Torii indexer) with Dojo SDK integration.

## Twitter

@Talesofrekkai

## Team Members

- @MigueReyRo
- @808ale
