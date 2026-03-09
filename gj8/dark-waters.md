---
id: "dark-waters"
emoji: "🌊"
title: "Dark Waters"
summary_short: >
  A **fully on-chain naval strategy duel** where players hide fleets behind
  **Merkle commitments** and fire via **commit-reveal proofs** on Starknet.
  Every hit, miss, and win condition is verified by Cairo contracts, with
  **Cartridge Controller** session gameplay and optional token-linked missions
  through Denshokan.
summary_long: >
  Game state is managed across **8 Dojo models** covering boards, attacks,
  reveal receipts, and timeout resolution. A single **Actions contract**
  orchestrates the full lifecycle — spawning, engagement, board commitment,
  attack commit-reveal, **Merkle proof verification**, win/timeout logic, and
  optional stake settlement. The **React/Next.js frontend** integrates the Dojo
  SDK with RPC event fallback for resilient state reads. The game is live on
  Sepolia, indexed by Torii, and listed on **Fun Factory** with Denshokan game
  id 19. A **bot opponent** enables instant matchmaking for demos and testing.
work_done_short: >
  Added **Denshokan/Fun Factory listing** with token-linked `_egs` gameplay
  wrappers, an **open-lobby and bot duel system**, in-game chat, player invite
  by Cartridge name, and **live Sepolia deployment** validated for production.
work_done_long: >
  The team shipped **official EGS adapter contracts and callbacks** enabling
  token-linked missions through Denshokan, alongside updated session policies
  for the new flows. A **bot duel system** and open-lobby engagement model were
  added for quick matchmaking. **In-game real-time chat**, player-invite by
  Cartridge username, exit-to-lobby navigation, and **frontend polish** rounded
  out the client — all deployed and indexed live on Sepolia.
repo_url: "https://github.com/0takuc0mrade/Dark-Waters"
demo_url: "https://dark-waters-m2fn.vercel.app/"
video_url: "https://youtu.be/9JeAITuk2zA?si=X2nEE88AmPLymY08"
team:
  - "June (0takuc0mrade)"
metrics:
  classification: "Feature"
  team_size: 1
  dojo_models: 8
  dojo_systems: 1
  dojo_events: 8
  client_sdk: "dojo.js"
  jam_commits_pct: 30
  playability: "Live"
---

# Dark Waters

### Project Summary
**Dark Waters** is a fully onchain naval strategy duel built on Starknet with Dojo. Players hide fleets behind Merkle commitments, fire using commit-reveal attacks, and resolve every hit or miss with verifiable proofs.

The current jam build includes:
- canonical Dojo gameplay contracts for board commitment, attack commitment, reveal, timeout resolution, and optional stake settlement
- a React frontend wired to the Dojo world through the Dojo SDK and RPC event fallback
- Cartridge Controller session-based gameplay
- official Denshokan / EGS integration for token-linked gameplay
- live Sepolia deployment indexed by Denshokan and listed on Fun Factory
- bot matchmaking for quick demo and testing flows

Live Sepolia deployment:
- World: `0x0035a61193deacca08e9438fc102a8fd6c9a8f6d1de392fd61277022793b9a3f`
- Actions: `0x0ef4aa6462fc34fcba0a18b49973bc83004757cc59c9940412efddae68b9637`
- Denshokan game id: `19`

### Source Code
https://github.com/0takuc0mrade/Dark-Waters

### Live Demo
https://dark-waters-m2fn.vercel.app/

### Gameplay Video
https://youtu.be/9JeAITuk2zA?si=X2nEE88AmPLymY08

### How to Play
1. Connect with Cartridge Controller.
2. Start a match from `Operations`:
   `Open Match`, `Invite Player`, or `Play vs Bot`.
3. In placement, arrange your fleet and commit the board.
4. In combat, attack through the onchain flow:
   `commit_attack` -> `reveal_attack` -> defender `reveal`.
5. For Denshokan-enabled games, mint/select a mission token and play through the `_egs` flow.
6. Win by destroying all 10 ship cells or by valid timeout resolution.

Useful public links:
- Fun Factory listing: https://funfactory.gg/games?network=sepolia
- Denshokan game entry uses contract `0xef4aa6462fc34fcba0a18b49973bc83004757cc59c9940412efddae68b9637`

### Twitter
@junep059

### Team Members
- June (`0takuc0mrade`)

## Architecture

### Smart Contracts
- Cairo + Dojo models and systems in `src/models.cairo` and `src/systems/actions.cairo`
- gameplay rules enforced onchain:
  - open game spawning / engagement
  - board commitment
  - attack commit-reveal
  - Merkle proof verification
  - win / timeout logic
  - optional stake locking and settlement
- Denshokan production integration wired directly through `Actions`

### Client
- Next.js + React frontend in `dark-waters-layout/`
- Dojo SDK integration plus RPC event fallback for resilient game state reads
- Cartridge Controller wallet connection and session policies
- live Sepolia config + Slot Torii indexing

### Jam Scope
This submission reflects major work shipped during the jam window on top of the existing Dark Waters base, including:
- official Denshokan / Fun Factory listing path
- token-linked `_egs` gameplay wrappers
- open-lobby and engagement flow
- bot duel support
- frontend polish and deployment validation on Sepolia
