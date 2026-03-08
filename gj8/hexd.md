# Hex'd

## Project Summary

**Hex'd** is a fully onchain asynchronous battle royale with fog of war, built with Cairo and Dojo on Starknet.

Players navigate a 21x21 hexagonal grid shrouded in darkness. Every step to an empty tile triggers a random encounter — a gift that strengthens you or a curse that may kill you. Walk into another player's tile and combat resolves automatically based on XP. You can ambush offline players, and every decision is a gamble between exploration and survival.

All game logic, state, and randomness live fully onchain. The frontend is a playable 3D experience built with React and Three.js.

**Jam scope — Embeddable Game Standard (EGS) integration:**

Hex'd existed before Game Jam VIII. The scope of this submission is the implementation of the [Embeddable Game Standard](https://github.com/FemiOje/hexed/tree/embeddable), which turns every game session into a portable, discoverable ERC-721 token on Starknet. This involved:

- `game_token_systems` contract — ERC-721 minting per session via EGS `MinigameComponent`
- Token ownership verification in `spawn()` and `move()` via EGS hooks
- Renderer contract implementing `IMinigameDetails` for external platform display
- Frontend token discovery via Denshokan SDK with live game state enrichment
- Automatic onchain score registration on player death

The full diff is on the [`embeddable` branch](https://github.com/FemiOje/hexed/tree/embeddable).

## Source Code

https://github.com/FemiOje/hexed

EGS implementation branch: https://github.com/FemiOje/hexed/tree/embeddable

## Live Demo

https://hexed-silk.vercel.app/

## Gameplay Video

https://youtu.be/cZOFKLjaeSw

## How to Play

1. Connect with Cartridge Controller
2. Mint a game token — each session is an NFT
3. Spawn onto a random hex tile with 100 HP and 0 XP
4. Move in any of 6 directions — empty tiles trigger random encounters, occupied tiles trigger combat
5. Survive and climb the leaderboard by stacking XP
6. Check "My Games" to browse all your tokens — active, dead, or unspawned

## Architecture

### Smart Contracts (Cairo)

Built with Dojo 1.8.0:

**Models:**
- `GameSession` — maps game token to player, tracks active state
- `PlayerState` — position, last direction, movement state
- `PlayerStats` — HP, max HP, XP
- `TileOccupant` — reverse lookup for who occupies a tile
- `GameCounter` — tracks concurrent active games (max 350)
- `HighestScore` — leaderboard: highest XP ever achieved

**Systems:**
- `mint_game(player_name)` — mint an ERC-721 game token via EGS
- `spawn(token_id)` — initialize game session on a random tile
- `move(token_id, direction)` — move, resolve combat or encounter
- `get_game_state(token_id)` — read-only view of full game state

**EGS Integration:**
- `game_token_systems` — `MinigameComponent` for token minting, `score()` and `game_over()` for external queries
- `renderer_systems` — `IMinigameDetails` for surfacing HP, XP, and status on platforms like Fun Factory

### Client

- React + TypeScript + Three.js (3D hex grid)
- Dojo SDK for blockchain integration
- Cartridge Controller for wallet
- Denshokan SDK for EGS token discovery

## Team Members

- @FemiOje ([GitHub](https://github.com/FemiOje)) — Solo developer (contracts, frontend, game design)

## Twitter

@0xjinius
