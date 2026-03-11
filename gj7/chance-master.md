---
id: "chance-master"
emoji: "🎲"
title: "Chance Master"
summary_short: >
  **Chess variant** where **dice rolls** determine which piece type you can move each turn.
  Three dice are rolled before every move, injecting suspense into classical chess
  strategy and forcing **creative improvisation** under constraints.
summary_long: >
  Chance Master combines classical chess with **dice-driven piece selection**, where players
  roll three dice each turn to determine which piece types they can move. The game uses
  **ZK proofs** for anti-cheat: Circom circuits produce Groth16 proofs of move legality,
  verified on-chain via Garaga on Starknet. Dojo ECS models store game state including
  board, clock, and claims. Real-time multiplayer is powered by **Torii WebSocket
  subscriptions**, and a permissive account policy flow enables sign-less gameplay.
work_done_short: >
  Built a **complete ZK-verified chess variant** with dice mechanics, **Circom proof generation**,
  on-chain Garaga verification, and **real-time multiplayer** via Torii.
work_done_long: >
  Developed a full chess game with dice-based piece selection. Implemented Circom circuits
  and snarkjs for **Groth16 proof generation** of move legality, with **Cairo-based on-chain
  verification** using Garaga. Built Dojo contracts with 1 model, 1 system, and 1 event for
  game state management. Created a multiplayer frontend with WebSocket sync via Torii and
  **sign-less UX** through permissive account policies.
repo_url: "https://github.com/armaanansari121/Chance-Master"
demo_url: null
video_url: "https://youtu.be/li_P68mlM-Y"
team:
  - "Mohammed Armaan Ansari"
metrics:
  classification: "Whole Game"
  team_size: 1
  dojo_models: 1
  dojo_systems: 1
  dojo_events: 1
  client_sdk: "dojo.js"
  jam_commits_pct: 100
  playability: "Video"
  gameplay: "Onchain"
---
# Chance Master ♟️🎲

### Submission Track
> Full Game

### Project Summary
Chance-Master is classic chess with a twist of chance: before each move you roll 3 die to decide which piece type you’re allowed to move (1 pawn, 2 knight, 3 bishop, 4 rook, 5 queen, 6 king). These die rolls turn careful plans into creative improvisation, adding poker-style suspense to every turn. You’ll set traps for multiple numbers, scramble to escape checks, and cheer when the perfect roll appears. It’s quick, chaotic in the best way, and surprisingly strategic.

Why zk? 
- Chess is a very computational heavy game, You have to do a lot of calculation like, Geometry of the pieces, Is my line of attack clear, Can I castle in this position (King cannot move through a check during castling), Can I make an en passant move? And is this position a checkmate, a stalemate?
- Computing these constraints is essential to the game of chess, and computing it onchain is extremely expensive.
- Not computing these rules makes the application vulnerable to cheating.
- The solution, compute it onchain and only verify it onchain.
- What the proof proves? This move was valid in this position.
- The result? A complete anti-cheat mechanism without compromising the chess rules.


* **ZK-enforced legality**: Circom circuits + snarkjs produce Groth16 proofs; Cairo verifier checks them on Starknet using Garaga before writing state.
* **Real-time multi-play**: WebSocket subscriptions (Torii) keep both players instantly in sync.
* **Sign-less UX**: Gameplay uses a permissive account/policy flow so you don’t manually sign each action during a match.
* **Dojo ECS**: Game data lives in Dojo models (Game, GameBoard, GameClock, GameClaim, etc.) for clean, queryable state.
* **Verifiable dice**: Contract emits a roll; UI encodes dice as the circuit expects and includes them in the proof.

### GitHub
> https://github.com/armaanansari121/Chance-Master

### Youtube Demo Link
> https://youtu.be/li_P68mlM-Y

### Play
> Clone the repo https://github.com/armaanansari121/Chance-Master
```
docker compose up
```
The game will be playable at http://localhost:3000
### Twitter
> Will be sharing on my Twitter https://x.com/armaanansari121

### Team members

Single member team

Name: Mohammed Armaan Ansari

Github: https://github.com/armaanansari121

Discord: armaanansari

Twitter: https://x.com/armaanansari121

