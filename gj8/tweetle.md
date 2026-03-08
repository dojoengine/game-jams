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
