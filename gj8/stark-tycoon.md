---
id: "stark-tycoon"
emoji: "🏗️"
title: "Stark Tycoon"
summary_short: >
  An **on-chain tycoon game** where players build a digital empire on a **16×16 grid**
  by purchasing buildings, managing 4 resource types, and maximizing production within
  a **15-minute game session** using the Embeddable Game Standard.
summary_long: >
  Twenty-five unique buildings represent Starknet ecosystem components, each generating
  one of **4 resource types** (Capital, Users, Research, Transactions). Players
  purchase from a **dynamic market with limited refreshes**, place buildings on the
  grid to generate resources, and upgrade them through a **2-tier system** using
  Research. Randomized tile bonuses via **Cartridge VRF** add replayability. Built
  with **3 Dojo models** and 1 contract, the React client uses **Material UI and
  Framer Motion** for polished animations, with Dojo SDK for blockchain state and
  Cartridge Controller for authentication.
work_done_short: >
  **Built from scratch** during the jam. Full tycoon game with **25 buildings**,
  resource management, market system, and a **polished React frontend** with
  Material UI and Framer Motion.
work_done_long: >
  Implemented all game systems — building purchase and placement, **2-tier upgrades**,
  resource production with multipliers, dynamic market with limited refreshes, and
  **score submission** — across 3 models and 1 contract. The React client features
  a **16×16 interactive grid** with drag-and-drop placement, animated resource
  counters via Framer Motion, and **Dojo SDK integration** for real-time state
  synchronization. Each session is an EGS NFT via Denshokan.
repo_url: "https://github.com/Await-0x/stark-tycoon"
demo_url: "https://stark-tycoon.vercel.app"
video_url: null
team:
  - "@Await-0x"
metrics:
  classification: "Whole Game"
  team_size: 1
  dojo_models: 3
  dojo_systems: 1
  dojo_events: 0
  client_sdk: "dojo.js"
  jam_commits_pct: 100
  playability: "Live"
---

# Stark Tycoon

## Project Summary

**Stark Tycoon** is an onchain tycoon game built on Starknet using the Dojo engine and embeddable game standard.
Players build and manage a digital empire on a 16x16 grid by purchasing buildings, managing resources, and maximizing production within a 15-minute game session.

Features:
- 25 unique buildings representing Starknet ecosystem components
- 4 resource types: Capital, Users, Research, Transactions
- Production and multiplier systems for strategic depth
- Randomized tile bonuses for replayability
- 2-tier building upgrade system
- Dynamic market with limited refreshes

## Source Code

https://github.com/Await-0x/stark-tycoon

## Live Demo

https://stark-tycoon.vercel.app

## Gameplay Video



## How to Play

1. Connect with Cartridge Controller
2. Click "Start Game" to start a 15-minute session
3. Purchase buildings from the market using Capital
4. Place buildings on the 16x16 grid to generate resources
5. Upgrade buildings using Research to boost production
6. Refresh the market to find new buildings
7. Maximize your Transaction score before time runs out

## Architecture

### Smart Contracts (Cairo)

Built with Dojo 1.8.0:

**Models:**
- `Game` - stores resources, production rates, multipliers, market state, and game time
- `Board` - manages the 16x16 grid and VRF seed for tile bonuses
- `Building` - tracks placed buildings, upgrade levels, and consumed bonuses

**Systems:**
- `start_game(player_name)` - mint a new game NFT and initialize state
- `buy_building(game_id, building_id, position_id)` - purchase and place a building from the market
- `upgrade_building(game_id, position_id, upgrade_id)` - upgrade a placed building (tier 1 or 2)
- `refresh_market(game_id)` - refresh available buildings in the market
- `destroy_building(game_id, position_id)` - remove a building and reverse its effects
- `submit_score(game_id)` - finalize and submit the game score

### Client

- React + TypeScript
- Dojo SDK for blockchain integration
- Cartridge Controller for wallet
- Material UI + Framer Motion for UI/animations

## Twitter

@await_0x

## Team Members

- @Await-0x ([GitHub](https://github.com/Await-0x))
