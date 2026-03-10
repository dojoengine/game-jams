---
id: "crossword-clash"
emoji: "🔤"
title: "Crossword Clash"
summary_short: >
  A **competitive tile-placement word game** on Starknet where two players race to fill a shared 15×15
  board by placing letter tiles and completing words. Supports **VS Computer** with three difficulty
  levels and **online multiplayer** via 4-character room codes.
summary_long: >
  Players draw from a 6-tile rack each turn, earning points for correct placements (+10 pts) and losing
  for wrong ones (-5 pts), with bonuses for completing whole words (50 pts, or 75 pts for 7+ letter words).
  A **60-second turn timer** keeps each round tense. Online multiplayer is handled by a **Socket.IO backend**
  that manages board state, tile distribution, and turn enforcement authoritatively. Game outcomes, lifetime
  stats, and **12 on-chain achievements** are recorded via Dojo contracts on Sepolia. The React 19 frontend
  uses the **Dojo SDK and Cartridge Controller** for wallet abstraction and ships as a **PWA** installable
  on mobile and desktop.
work_done_short: >
  **Built during the jam**: full crossword game with Cairo contracts for player profiles, game records,
  achievements, and **daily streak rewards**; a React frontend with online multiplayer; and a
  **Node.js + Socket.IO backend** for real-time room management.
work_done_long: >
  The Cairo `actions` contract handles **player registration**, game lifecycle, tile placement recording,
  word completion bonuses, and a **12-achievement system** with daily login streaks and a referral system.
  The Socket.IO backend serves as the real-time authority — managing board generation, tile pools, score
  deltas, and turn timers. The React frontend integrates the **Dojo SDK** for on-chain writes,
  **Cartridge Controller** for account abstraction, and a service worker for **offline PWA support**.
repo_url: "https://github.com/Itodo-S/crossword-clash"
demo_url: "https://crossword-clash-omega.vercel.app/"
video_url: "https://drive.google.com/file/d/1EsZITDiW7UK3EtLzsq88eIV9psMyQhtr/view?usp=sharing"
team:
  - "@Itodo-S"
metrics:
  classification: "Whole Game"
  team_size: 1
  dojo_models: 0
  dojo_systems: 0
  dojo_events: 0
  client_sdk: "dojo.js"
  jam_commits_pct: 100
  gameplay: "Offchain"
---

# Crossword Clash

---

## Project Summary

**Crossword Clash** is a competitive tile-placement word game on Starknet using the Dojo engine. Two players take turns placing letter tiles on a shared 15x15 crossword board, completing words to outscore their opponent — all recorded on-chain.

Features:

- 15x15 shared crossword board with hidden solution letters
- Correct/wrong tile placement with instant point feedback
- Word completion bonuses (50 pts base, 75 pts for 7+ letter words)
- 60-second turn timer with 6-tile rack per turn
- VS Computer with 3 difficulty levels (Easy 70%, Normal 90%, Hard 100% accuracy)
- Online multiplayer with 4-character room codes via Socket.IO
- 12 on-chain achievements
- Daily login streak system with bonus rewards
- Referral system
- Cartridge Controller for wallet
- PWA — installable on mobile and desktop

## Source Code

https://github.com/Itodo-S/crossword-clash

## Live Demo

https://crossword-clash-omega.vercel.app/

## Gameplay Video

https://drive.google.com/file/d/1EsZITDiW7UK3EtLzsq88eIV9psMyQhtr/view?usp=sharing

## How to Play

1. Connect with Cartridge Controller
2. Choose VS Computer (pick difficulty) or Online (create/join room with code)
3. Place tiles from your 6-tile rack onto the board each turn
4. Green flash = correct placement (+10 pts), red flash = wrong (-5 pts)
5. Complete an entire word across or down for a big bonus
6. Each turn lasts 60 seconds — unused tiles can be swapped or skipped
7. Game ends when all squares are filled — highest score wins

## Architecture

### Smart Contracts (Cairo)

Built with Dojo 1.8:

**Models:**

- `Player` — wallet address, username, rating, wins, losses, games played
- `Game` — game ID, both player addresses, scores, status, turn count
- `PlayerGame` — per-player-per-game state (score, tiles placed, words completed)
- `GameResult` — final outcome written at game end
- `Achievement` — 12 achievement definitions with unlock status
- `DailyStreak` — last claim time, streak count, total claims, total bonus
- `ReferralCode` — referral tracking

**Systems:**

- `register_player(username)` — create player profile
- `start_game(mode, difficulty)` — create a new game
- `join_game(game_id)` — join as second player
- `place_tile(game_id, x, y, letter)` — place a tile on the board
- `complete_word(game_id, word_id)` — claim word completion bonus
- `score_tile(game_id, correct)` — record tile placement result
- `end_turn(game_id)` — finish current turn
- `skip_turn(game_id)` — skip without placing
- `swap_tiles(game_id)` — exchange rack tiles
- `forfeit(game_id)` — resign the game
- `claim_daily_reward()` — claim daily login bonus
- `apply_referral(referrer_code)` — link referral
- `end_game(game_id, winner)` — finalize and record result

### Client

- React 19 + TypeScript + Vite
- Zustand for state management
- Socket.IO for online multiplayer
- Howler.js for sound effects
- Dojo SDK for blockchain integration
- Cartridge Controller for wallet / account abstraction
- Tailwind CSS for UI
- PWA with service worker for offline asset caching

### Server

- Node.js + Express + Socket.IO
- Room management with 4-character codes
- Real-time game state synchronization
- Turn timer enforcement

## Team Members

- @Itodo-S ([GitHub](https://github.com/Itodo-S))

## Twitter

@legendarydev_
