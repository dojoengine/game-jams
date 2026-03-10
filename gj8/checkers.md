---
id: "checkers"
emoji: "🏁"
title: "Checkers"
summary_short: >
  A **real-time multiplayer checkers game** on Starknet, powered by Dojo. Challenge opponents
  online with **Socket.IO matchmaking**, climb a **7-tier ELO ladder** from Novice to
  Grandmaster, and spectate live games — every move and rating update recorded permanently
  on-chain.
summary_long: >
  State is stored across **3 Dojo models** — Player, Game, and BoardState (two u128 values
  encoding 32 squares at 4 bits each for efficient packing) — with a single `actions` contract
  exposing all 8 entrypoints. Seven **on-chain events** track the full game lifecycle from
  registration through move execution to ELO finalization. The React 19 + TypeScript frontend
  integrates the **Dojo SDK** with real-time Socket.IO for multiplayer and spectating, while
  **Cartridge Controller** provides seamless wallet abstraction. ELO is computed on-chain at
  game completion, and a PWA service worker enables installation on mobile and desktop.
work_done_short: >
  **Built entirely from scratch** during the jam — full checkers engine in Cairo with
  **on-chain ELO calculation**, real-time Socket.IO multiplayer, live spectator mode, and a
  polished React frontend with 4 visual themes.
work_done_long: >
  The Cairo contracts implement **complete move validation** — multi-jumps, king promotions,
  forced captures, resignation, and the 40-move draw rule — with board state packed into two
  u128s for gas efficiency. A **Node.js/Express server** manages rooms and queue-based
  matchmaking via Socket.IO. The frontend uses **Dojo SDK + Cartridge Controller** with
  session policies for all 8 entrypoints, Zustand 5 for state management, Tailwind CSS 4,
  and full PWA support.
repo_url: "https://github.com/Smartdevs17/checkers"
demo_url: "https://checkers-six-mu.vercel.app/"
video_url: "https://drive.google.com/file/d/1aL7NQhXZMmmwmKWdg9aX3ZCo0otZpdhB/view?usp=sharing"
team:
  - "@Smartdevs17"
metrics:
  classification: "Whole Game"
  team_size: 1
  dojo_models: 3
  dojo_systems: 1
  dojo_events: 7
  client_sdk: "dojo.js"
  jam_commits_pct: 100
  gameplay: "Offchain"
---

# Checkers

---

## Project Summary

**Checkers** is a real-time multiplayer checkers game on Starknet using the Dojo engine. Challenge opponents online, climb the ELO ladder across 7 rating tiers, spectate live games, and have every move recorded permanently on-chain.

Features:

- Standard 8x8 board with full rules (multi-jumps, king promotions, forced captures)
- Real-time online multiplayer via Socket.IO (Quick Match + Private Rooms)
- Live spectator mode with move log and spectator count
- 7-tier ELO rating system (Novice to Grandmaster)
- 4 visual themes (Luxe Dark, Clean Modern, Neon Retro, Warm Wood)
- Draw offers, resignation, 40-move draw rule
- On-chain ELO calculation and game result recording
- Cartridge Controller for seamless wallet experience
- PWA — installable on mobile and desktop

## Source Code

https://github.com/Smartdevs17/checkers

## Live Demo

https://checkers-six-mu.vercel.app/

## Gameplay Video

https://drive.google.com/file/d/1aL7NQhXZMmmwmKWdg9aX3ZCo0otZpdhB/view?usp=sharing

## How to Play

1. Connect with Cartridge Controller
2. Choose Quick Match (auto-matchmaking) or create/join a Private Room with a 4-character code
3. Red moves first — click a piece to see valid moves, click a highlighted square to move
4. Capture opponents by jumping over them (multi-jumps are automatic)
5. Reach the opponent's back row to promote a piece to a king
6. Win by capturing all opponent pieces or leaving them with no legal moves
7. Offer a draw or resign at any time — ELO is updated on game completion

## Architecture

### Smart Contracts (Cairo)

Built with Dojo 1.8:

**Models:**

- `Player` — wallet address, username, ELO rating, wins, losses, draws, games played
- `Game` — game ID, player addresses, current turn, status, result, move count, captures
- `BoardState` — two u128 values encoding 32 squares at 4 bits each (empty, red, black, red king, black king)

**Systems:**

- `register_player(username)` — create player profile
- `create_game()` — initialize a new game
- `join_game(game_id, piece)` — join as second player
- `make_move(game_id, from, to)` — validate and apply a move
- `resign(game_id)` — forfeit the game
- `end_game(game_id, result)` — finalize and update ELO ratings
- `get_player(address)` — read player stats
- `get_board(game_id)` — read packed board state

### Client

- React 19 + TypeScript + Vite
- Zustand 5 for state management
- Socket.IO for real-time multiplayer and spectating
- Dojo SDK for blockchain integration
- Cartridge Controller for wallet / account abstraction
- Tailwind CSS 4 for UI with 4 switchable themes
- PWA with service worker for offline UI shell

### Server

- Node.js + Express + Socket.IO
- Authoritative game validation (server verifies every move)
- Room management with queue-based matchmaking
- ELO calculation on game completion

## Team Members

- @Smartdevs17 ([GitHub](https://github.com/Smartdevs17))

## Twitter

@smartdev_x
