---
id: "mastermind"
emoji: "🧠"
title: "ZK Word Mastermind"
summary_short: >
  Two-player code-breaking game combining classic Mastermind with zero-knowledge proofs.
  Players guess each other's secret 4-character codes while ZK proofs verify feedback
  honesty without revealing secrets.
summary_long: >
  ZK Word Mastermind brings the classic code-breaking game on-chain with cryptographic
  guarantees. Two players each commit a Poseidon hash of their secret 4-letter code, then
  take turns guessing across up to 10 rounds. Feedback (hits and blows) is verified using
  zero-knowledge proofs generated with Noir and verified via Garaga, ensuring honest
  responses without premature revelation. Built on Dojo's ECS framework with Cartridge
  Controller integration, real-time multiplayer matchmaking, and player statistics tracking.
work_done_short: >
  Built a complete two-player ZK Mastermind game from scratch, including Dojo contracts,
  ZK circuit design with Noir/Garaga, and a React frontend.
work_done_long: >
  Developed the full game implementing Dojo models and systems for on-chain game state,
  Poseidon hash commitments for secret codes, and ZK proof generation and verification
  using Noir circuits with Garaga. Built a React frontend with real-time game updates,
  multiplayer matchmaking, and Cartridge Controller wallet integration.
repo_url: "https://github.com/truthixify/mastermind-dojo"
demo_url: null
video_url: null
team:
  - "@truthixify"
  - "@birdmannn"
metrics:
  classification: "Whole Game"
  team_size: 2
  dojo_models: 1
  dojo_systems: 1
  dojo_events: 1
  client_sdk: "dojo.js"
  jam_commits_pct: 100
  playability: "None"
---
# ZK Word Mastermind

### Submission Track

Full Game

### Project Summary

ZK Word Mastermind is a two-player code-breaking game built on StarkNet using the Dojo framework that combines classic Mastermind gameplay with Zero-Knowledge Proofs for fair and private gameplay. Players try to guess each other's secret 4-character codes (A-Z uppercase letters), with feedback (hits/blows) verified on-chain using ZK proofs generated with Noir and Garaga. This ensures honest feedback without revealing secret codes prematurely.

The game features:
- Classic Mastermind mechanics with 4-character unique uppercase letter codes (A-Z)
- Cryptographic commitments using Poseidon hashes to prevent mid-game changes
- ZK-verified feedback system ensuring fair play without revealing secrets
- Complete on-chain game state management via Dojo ECS framework
- Cartridge Controller integration for seamless Web3 gaming experience
- Real-time game updates and multiplayer matchmaking
- Player statistics tracking (wins/losses/ties)
- Maximum 10 rounds per game (5 guesses per player)

### GitHub

https://github.com/truthixify/mastermind-dojo

### Play

**Setup Instructions:**

1. **Prerequisites:** Node.js >= 20
2. **Install dependencies:**
   ```bash
   cd packages/app
   yarn install
   ```
3. **Build and run dApp:**
   ```bash
   cd packages/app
   yarn dev
   ```

**How to Play:**
1. Connect using Cartridge Controller and register a player name
2. Create a new game or join an existing one waiting for opponents
3. Commit a Poseidon hash of your secret 4-character code (unique uppercase letters A-Z) with salt
4. Take turns guessing your opponent's code (maximum 5 guesses each)
5. When providing feedback, the UI generates ZK proofs to verify hit/blow counts without revealing your solution
6. Win by guessing the opponent's code correctly (4 hits, 0 blows) or tie after 10 total rounds
7. Reveal your solution after the game ends for full transparency verification

**Game Stages:**
- CreatorCommitSolutionHash → WaitingForOpponent → OpponentCommitSolutionHash → Playing → Reveal

### Twitter

[Twitter Link](https://x.com/truthixifi/status/1985245125564612900?s=46)

### Team members
> Provide a list of your team members.

- **truthixify** - ZK and FullStack Developer
  - GitHub: https://github.com/truthixify
  - Role: Full-stack development, ZK circuit design
- **Pascal** - Dojo and FullStack Developer
  - GitHub: https://github.com/birdmannn
  - Role: Full-stack development, Smart contract design
  