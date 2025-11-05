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
> https://youtu.be/riC3G5mFHcI

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

