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
