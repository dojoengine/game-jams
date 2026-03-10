---
id: "contagion"
emoji: "🦠"
title: "Contagion"
summary_short: >
  A **social deduction .io game** on Starknet where one hidden Patient Zero spreads
  infection by proximity. Players move on an **isometric map**, collect cure fragments,
  and use **ZK proofs** to prove their health status without revealing identity.
summary_long: >
  Players join rooms where one is secretly Patient Zero, identified only by a
  **Poseidon-hashed commitment** revealed at game end. Infection spreads when
  players move within range of infected others, with proximity validated by the
  **contagion_actions Dojo system**. Two models — ContagionPlayer and GameRoom —
  record position, health, cure fragments, and room config on-chain, with
  **six events** feeding Torii. ZK proofs via **Noir/bb.js** let players prove
  health without exposing identity. The **Embeddable Game Standard (EGS)**
  enables verifiable score reporting via denshokan-sdk, while a Bun WebSocket
  server handles real-time room coordination and proximity logic.
work_done_short: >
  Transformed a Treasure Hunt starter into a full social deduction game during
  the jam: **new Contagion Cairo contracts** (2 models, 1 system, 6 events),
  a complete isometric React client, **Bun WebSocket backend**, ZK health proofs,
  and EGS score integration.
work_done_long: >
  The Cairo contracts were fully rewritten: **ContagionPlayer and GameRoom
  models**, and a contagion_actions system with move_player, infect, accuse,
  collect_cure, and take_damage entry points. A React/Vite client was built
  with **isometric map rendering**, HUD, radar, and Cartridge Controller
  authentication. The **Bun WebSocket server** manages real-time room logic
  and proximity-based infection. **ZK proofs via Noir/bb.js** prove health
  status, and EGS enables verifiable, embeddable score reporting on Sepolia.
repo_url: "https://github.com/Ashar20/contagion-dojo"
demo_url: "https://contagion-dojo.vercel.app"
video_url: null
team:
  - "@fabianferno"
  - "@Ashar20"
  - "@Philotheephilix"
metrics:
  classification: "Feature"
  team_size: 3
  dojo_models: 2
  dojo_systems: 1
  dojo_events: 6
  client_sdk: "dojo.js"
  jam_commits_pct: 75
  gameplay: "Offchain"
---

# Contagion — Dojo Hackathon Submission

## Project Summary

Contagion is a social deduction .io game built on Starknet. One player is secretly Patient Zero. Infection spreads by proximity. Players prove their health with ZK proofs. Real-time gameplay runs on WebSocket; on-chain state uses Dojo contracts and the Embeddable Game Standard (EGS) for provable scores.

**Features:**

- Social deduction: one hidden Patient Zero, infection spreads by proximity
- ZK proofs to prove health status without revealing identity
- Real-time multiplayer via WebSocket
- Isometric map with movement, cure fragments, buried gems, wave defense
- Accusation and voting system
- Cartridge Controller authentication
- EGS integration for provable, embeddable sessions and on-chain score reporting

## Source Code

https://github.com/Ashar20/contagion-dojo

## Live Demo

https://contagion-dojo.vercel.app

## How to Play

1. Connect with Cartridge Controller
2. Create or join a room
3. Move on the isometric map — one player is secretly Patient Zero
4. Infection spreads when you get close to infected players
5. Collect cure fragments to win, or survive until the timer ends
6. Use test camps to prove your health with flashing zk proofs
7. Accuse suspected Patient Zero and vote

## Architecture

### Smart Contracts (Cairo)

**Dojo (contracts/)** — Dojo 1.8.x:

- **Models:** Player (position, health, gold, level, dug bitmap)
- **Systems:** spawn, move, dig — grid-based treasure hunt with gold/bomb tiles
- Two-layer randomness: Poseidon hash for tile content, block timestamp for dig outcome

**EGS (egs/)** — Starknet 2.15.1 + game-components:

- Implements `IMinigameTokenData` (score, game_over)
- `report_result(token_id, score)` — called when a game ends
- Deployed on Sepolia: `0x00afdc03274b847d6a006272632464b66fe6ac217879e3c3fdec53578e5145a0`

### Client

- React + Vite + TypeScript
- Embeddable Game Standard via `@provable-games/denshokan-sdk`
- Dojo SDK for blockchain integration
- Cartridge Controller for wallet
- Noir/bb.js for ZK proofs
- WebSocket for real-time game state

### Backend

- Bun WebSocket server (port 3001)
- Game logic, room management, proximity-based infection

## Team Members
@fabianferno (Github)
@Ashar20 (GitHub)
@Philotheephilix (Github)
