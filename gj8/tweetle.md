---
id: "tweetle"
emoji: "🟩"
title: "Tweetle"
summary_short: >
  A **fully on-chain Wordle clone** built with Dojo, featuring Classic, Daily, and
  **ZK-verified Tournament modes**. Every tournament guess is proven correct via a
  **Noir circuit and Garaga on-chain verifier** — the hidden word is never revealed
  to the server or client.
summary_long: >
  Tweetle runs three game modes on Starknet: Classic (free play), Daily (one shared
  word per day with streak tracking), and **Tournament** (competitive, entry-fee
  gating, prize pool distribution). The standout feature is the **ZK proof pipeline**:
  a Noir circuit proves each clue is accurate against a Poseidon2-committed solution,
  Barretenberg generates the Ultra Keccak ZK Honk proof, and **Garaga converts it to
  ~2900 felt252 calldata values** for an on-chain Cairo verifier. The prover server is
  stateless — secret words are derived deterministically via HMAC, with no database.
  **Cartridge Controller with session keys** eliminates wallet popups per guess.
  18 Dojo models and 5 systems manage player stats, game state, and tournament
  lifecycle across 4 deployed contracts on Starknet Sepolia.
work_done_short: >
  During the jam, the team **replaced the SQLite-backed prover server with a
  stateless HMAC-based derivation scheme**, added a HowToPlay modal, fixed mobile
  layout issues, and **wrote the full project README** for submission.
work_done_long: >
  The stateless refactor eliminated the database dependency entirely — tournament
  secrets are now **derived deterministically from a seed via HMAC**, making the
  prover server deployable as a pure function. The team also switched to a
  **Debian Trixie Docker base image** to satisfy the glibc 2.38+ requirement for
  Barretenberg. Frontend polish included a **comprehensive HowToPlay modal** and
  responsive keyboard layout fixes for mobile. The underlying ZK pipeline,
  smart contracts, and client integration were all built in the weeks preceding
  the jam.
repo_url: "https://github.com/crackedstudio/Tweetle_dojo"
demo_url: "https://tweetle-dojo.vercel.app"
video_url: "https://www.loom.com/share/fbf111a0b37b4fc6ae9e37b35c936e21"
team:
  - "@manoahLinks"
  - "@Otaiki1"
metrics:
  classification: "Feature"
  team_size: 2
  dojo_models: 18
  dojo_systems: 5
  dojo_events: 17
  client_sdk: "dojo.js"
  jam_commits_pct: 8
  gameplay: "Onchain"
---

# Tweetle

## Project Summary

Tweetle is a fully on-chain competitive word puzzle game built on Starknet using the Dojo engine. Players guess a hidden 5-letter word within six attempts. Tournament mode uses zero-knowledge proofs to verify every guess — the server proves each clue is correct without ever revealing the solution to players. Winners split the prize pool based on performance.

**Features:**

- Classic, Daily, and Tournament game modes
- ZK-verified guess scoring (Noir circuits + Garaga on-chain verifier)
- Stateless prover server — no database, secret words derived deterministically via HMAC
- On-chain leaderboards and streak tracking
- Cartridge Controller authentication with session keys (no wallet popups per guess)
- Prize pool distribution (50/25/15/10%) for tournament winners

## Source Code

https://github.com/crackedstudio/Tweetle_dojo

## Live Demo

https://tweetle-dojo.vercel.app


## Demo video
https://www.loom.com/share/fbf111a0b37b4fc6ae9e37b35c936e21

## How to Play

1. Connect with Cartridge Controller
2. Choose a mode: Classic (free play), Daily (one word per day), or Tournament (competitive with entry fee)
3. Type a 5-letter word and submit your guess
4. Green = correct letter and position, Yellow = correct letter wrong position, Gray = letter not in word
5. Solve the word in 6 attempts or fewer
6. In tournaments, a ZK proof is generated and verified on-chain for each guess

## Architecture

### Smart Contracts (Cairo)

Built with Dojo 1.1.1:

**Models:**
- `Player` — player stats, streaks, XP, level
- `Game` / `DailyGame` — game state, attempts, clue history
- `Tournament` — tournament lifecycle, entry fees, prize pool
- `TournamentEntry` — per-player tournament state
- `TournamentAttempt` — per-guess record (guess + clue packed on-chain)
- `TournamentConfig` — singleton config (verifier address, fee settings)

**Systems:**
- `actions` — classic game logic: `create_game()`, `submit_guess()`, clue computation
- `daily_game` — daily word challenge with streak tracking
- `tournament_manager` — `create_tournament()`, `join_tournament()`, `submit_guess()` (ZK verified), `end_tournament()`, `distribute_prizes()`
- `player_system` — player registration, stats updates

### ZK Proof Pipeline

- **Noir Circuit** (`tweetle_wordle`) — proves clue correctness against a Poseidon2-committed solution
- **Barretenberg** (`bb`) — generates Ultra Keccak ZK Honk proof
- **Garaga** — converts proof to Starknet calldata (~2900 felt252 values)
- **On-chain Verifier** — Garaga-generated Cairo contract verifies proof and extracts public inputs

### Client

- React + Vite + TailwindCSS
- Dojo SDK + Torii indexer (GraphQL) for on-chain state
- Cartridge Controller for wallet and session management

### Deployed Contracts (Starknet Sepolia)

| Contract | Address |
|----------|---------|
| World | `0x45b2841cbd334ae7cb39c89fdea585341b4b7688e215076aede41fc354c3f8d` |
| Actions | `0x97b632e93243e3c8fa31ea94580ae1e54f8338015c811b6413455cdeb319b8` |
| Tournament Manager | `0x5efad73bc9c5401383fd9c0fb76b2db60356f1c4fcc9fed60f29fa8cd7dc236` |
| Garaga ZK Verifier | `0x00dd86587a5fac0f1cfddf76e768d6110deeca70357f8827d7b0635aa94eb582` |

## Team Members

- [@manoahLinks](https://github.com/manoahLinks)
- [@Otaiki1](https://github.com/Otaiki1)

## Twitter

[@CrackedStudioHQ](https://twitter.com/CrackedStudioHQ)
