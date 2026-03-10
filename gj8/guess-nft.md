---
id: "guess-nft"
emoji: "🔮"
title: "GuessNFT"
summary_short: >
  A **fully onchain deduction game** inspired by "Guess Who?" where every yes/no
  answer is backed by a **zero-knowledge proof**. Players commit to a hidden
  character from 999 3D NFTs, then ask questions whose truthful answers are
  **proved client-side with Noir** and verified onchain via a Garaga-generated
  Cairo verifier — no trust required.
summary_long: >
  The ZK circuit runs entirely in-browser using `bb.js`, generating a Noir proof
  that the answering player's response matches their committed character without
  revealing it. A **1024-leaf Poseidon2 Merkle tree** encodes all 999 characters,
  making the commitment scheme collision-resistant and gas-efficient. Game state —
  match phases, turn order, commitments, guesses, reveals, and **timeout logic** —
  lives in **3 Dojo models** and 1 system contract with 11 events. The React +
  Three.js frontend uses `@dojoengine/torii-client` for real-time sync and
  **Cartridge Controller** for session management, delivering a live-playable game
  on Starknet Sepolia.
work_done_short: >
  **Built entirely during the jam**: the full ZK-backed game loop including Noir
  circuits, **Garaga verifier integration**, Dojo smart contracts, and a React +
  Three.js frontend with real-time Torii sync and Cartridge Controller
  authentication — deployed and live.
work_done_long: >
  The Noir ZK circuit and its Garaga-generated Cairo verifier were purpose-built
  for this game alongside **3 Dojo models** (Game, Commitment, Turn) and a single
  system contract implementing **7 game actions** — create, join, commit, ask,
  answer with proof, guess, and reveal/timeout. Eleven events cover the full game
  lifecycle. The **Three.js scene renders all 999 3D characters**, and `bb.js`
  handles in-browser proof generation, making the ZK flow seamless for players —
  a substantial engineering lift delivered in 72 hours.
repo_url: "https://github.com/Gianfranco99/GuessNFT"
demo_url: "https://guesschizodio.fun/"
video_url: "https://youtu.be/otT1Kir0_rQ"
team:
  - "Carlos (@carldlfr)"
  - "Gianfranco (@Gianfranco99)"
  - "Juan (@Nacto1122)"
metrics:
  classification: "Whole Game"
  team_size: 3
  dojo_models: 3
  dojo_systems: 1
  dojo_events: 11
  client_sdk: "dojo.js"
  jam_commits_pct: 100
  gameplay: "Onchain"
---

# GuessNFT

### Project Summary
**guessNFT** is a fully onchain deduction game on Starknet where players answer hidden-character questions with zero-knowledge proofs instead of trust.

It takes the familiar "Guess Who?" loop and rebuilds it as a Dojo game: the turn order, commitments, guesses, reveals, and timeout logic all live onchain, while the secret answer to each question stays private. The answering player generates a proof client-side in Noir and verifies it onchain in Cairo through a Garaga-generated verifier.

Features:
- Trustless deduction game logic verified combining Dojo + Privacy tooling
- Client-side Zero-Knowledge proof generation (Noir + bb.js)
- On-chain proof verification via Garaga
- Fully onchain game state, match phases, and turn limits (Dojo)
- 999 3D characters encoded into a 1024-leaf Poseidon2 Merkle tree
- Real-time client sync with Torii indexer
- Cartridge Controller authentication
- It's fun, we'll make it even more

### Source Code

https://github.com/Gianfranco99/GuessNFT

### Live Demo

https://guesschizodio.fun/

### Gameplay Video

https://youtu.be/otT1Kir0_rQ

### How to Play

1. Connect with Cartridge Controller
2. Create or join a Match on Starknet
3. Both players commit to a hidden character
4. Take turns asking yes/no questions
5. The answering player generates a ZK proof in the browser that their answer matches their committed character
6. The Cairo contract verifies the proof and accepts the answer
7. The game proceeds until a final guess is made and both players reveal their characters

## Architecture

### Smart Contracts (Cairo)
Built with Dojo 1.8.0:
**Models:**
- `Game` - stores session metadata, phase, current turn, last question, and winner
- `Commitment` - stores each player's reveal commitment and ZK commitment
- `Turn` - records each asked question or guess, plus verified answer status
**Systems:**
- `create_game()` - initialize a new Match session
- `join_game()` - enter an existing Match
- `commit_character()` - lock in Pedersen and ZK commitments
- `ask_question()` - active player asks a question
- `answer_question_with_proof()` - answering player submits their Noir ZK proof; calls Garaga verifier
- `make_guess()` - active player submits final guess
- `reveal_character()` - players reveal secret characters to determine the winner
- `claim_timeout()` - claim victory if opponent stalls
### Client
- React + Three.js + TypeScript
- Noir + `bb.js` for in-browser Zero-Knowledge proof generation
- Dojo SDK & Torii for real-time blockchain state synchronization
- Garaga JS for Starknet calldata formatting
- Cartridge Controller for wallet/session management

### Twitter
- https://x.com/GuessmyNft

### Team Members
- Carlos (@carldlfr)
- Gianfranco (@Gianfranco99)
- Juan (@Nacto1122)

### Implementation Note: Tech vs. Product Focus
You will notice a differentiation between our Source Code repository and the Live Demo URL. We intentionally split our focus to tackle both the heavy technical architecture and the consumer-facing product experience:

- **The Source Code (Tech Focus):** The repository contains our fully trustless, onchain game loop. This integrates Dojo, Cairo, Noir, and Garaga to ensure answers are verified onchain via Zero-Knowledge proofs without revealing the hidden NFT character.
- **The Live Demo (Product Focus):** The deployed web domain prioritizes UX, game feel, and product polish. For this frontend, we integrated a smoother Web2-style backend (Supabase) alongside a simpler Mainnet NFT recognition check to ensure a taste of what "Skin in the game" will mean once production is ready.

Our long-term vision is to fully merge this premium product UI with the hardcore zero-knowledge backend, alongside a compounded flywheel of community tokenomics and trait engine concept to leverage the IP capabilities on this game.
