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