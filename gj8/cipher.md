---
id: "cipher"
emoji: "🗡️"
title: "Cipher"
summary_short: >
  A **hidden-ranks war game** on Starknet where two players deploy ten pieces
  with **Poseidon-hashed rank commitments**, move blind, and resolve combat
  **onchain** — stronger rank survives, capture the **enemy Flag** to win.
summary_long: >
  Two players each place ten pieces with ranks hidden behind **Poseidon hash
  commitments**. Movement is blind until pieces collide, triggering a
  **two-phase combat resolution**: the attacker's move creates a PendingCombat
  record, then the defender reveals their rank onchain. Six models — Game,
  Piece, Square, PendingCombat, PlayerGame, and GameCounter — track the full
  board state. A single **actions system** handles creation, placement, movement,
  combat, and forfeit across **seven entry points**. The React client syncs
  state via **Torii indexer** and authenticates through Cartridge Controller,
  with all game rules executed deterministically onchain.
work_done_short: >
  Built the entire game during the jam: **six Cairo models**, a single actions
  system with **seven entry points**, and a full **React + Vite client** with
  Cartridge Controller and Torii integration.
work_done_long: >
  All code was written during the jam window. The Cairo layer includes **six
  Dojo models** (Game, Piece, Square, PendingCombat, PlayerGame, GameCounter)
  and one actions system with **seven entry points** (create_game, join_game,
  place_piece, ready, move_piece, resolve_combat, forfeit). The **React/Vite
  client** implements board rendering, combat reveal UI, and real-time sync
  via Torii. **Cartridge Controller** handles wallet authentication. Deployed
  to Starknet Sepolia via Slot.
repo_url: "https://github.com/0xZyrick/cipher"
demo_url: "https://playcipher.vercel.app"
video_url: "https://youtu.be/zV9K-KGHW00"
team:
  - "@0xZyrick"
  - "melvin"
metrics:
  classification: "Whole Game"
  team_size: 2
  dojo_models: 6
  dojo_systems: 1
  dojo_events: 0
  client_sdk: "dojo.js"
  jam_commits_pct: 100
  gameplay: "Onchain"
---

# Cipher

## Project Summary

Cipher is a hidden-ranks war game on Starknet.
Two players place ten pieces each with ranks hidden behind Poseidon hash commitments.
Movement is blind — when pieces collide, ranks are revealed onchain and the stronger piece survives.
Capture the enemy Flag to win.

**Features:**

- Cryptographic fog of war via Poseidon hash commit-reveal
- Full rank hierarchy with special rules — Spy, Miner, Bomb, Scout
- Two-phase combat — move suspends turn until defender reveals
- Onchain combat resolution — deterministic, no server, no trust
- Two player realtime multiplayer via Torii
- Victory and defeat states with flag capture detection
- Mutual destruction on ties
- Surrender system

## Source Code

https://github.com/0xZyrick/cipher

## Live Demo

https://playcipher.vercel.app

## Gameplay Video

https://youtu.be/zV9K-KGHW00

## How to Play

1. Open two browsers
2. Connect a wallet on each using Cartridge Controller
3. Player one clicks Create Game and shares the Game ID
4. Player two clicks Join Campaign and enters the ID
5. Both players deploy their 10 pieces in their zone
6. Take turns moving and attacking
7. When pieces clash a combat screen opens — hit Reveal to resolve
8. Higher rank wins. Capture the enemy Flag to win.

## Architecture

### Smart Contracts (Cairo)

Built on Dojo Engine 1.8.0, deployed to Starknet Sepolia via Slot.

**Models (6):**

- **Game** — tracks players, status, turn, piece counts
- **Piece** — stores rank commitment, position, alive state
- **Square** — maps board positions to pieces
- **PendingCombat** — holds attacker and defender during combat phase
- **PlayerGame** — links wallet address to active game
- **GameCounter** — increments game IDs

**Systems (1 file, 7 entry points):**

- create_game — spins up a new game session
- join_game — second player joins
- place_piece — commits rank as poseidon_hash(rank, salt)
- ready — transitions game to active when both players deploy
- move_piece — validates move, triggers PendingCombat on attack
- resolve_combat — forces rank reveal, determines winner onchain
- forfeit — surrender with penalty

### Client

- React + TypeScript + Vite
- Realtime sync via Torii indexer
- Wallet: Cartridge Controller
- Chain: Starknet Sepolia

## Team Members

- @0xZyrick
- melvin
