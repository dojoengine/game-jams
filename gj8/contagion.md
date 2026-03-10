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
