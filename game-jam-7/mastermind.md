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

1. **Prerequisites:** Node.js >= 20, Python 3.10
2. **Install dependencies:**
   ```bash
   make install-bun
   make install-noir
   make install-barretenberg
   make install-starknet
   make install-devnet
   make install-garaga
   ```
3. **Build and deploy:**
   ```bash
   make build-circuit
   make gen-vk
   make gen-verifier
   yarn chain  # Start local devnet
   yarn deploy # Deploy contracts
   yarn start  # Start UI
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
  