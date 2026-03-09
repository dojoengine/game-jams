# guessNFT

### Project Summary
**guessNFT** is a fully onchain deduction game on Starknet where players answer hidden-character questions with zero-knowledge proofs instead of trust. 

It takes the familiar "Guess Who?" loop and rebuilds it as a Dojo game: the turn order, commitments, guesses, reveals, and timeout logic all live onchain, while the secret answer to each question stays private. The answering player generates a proof client-side in Noir and verifies it onchain in Cairo through a Garaga-generated verifier.

### Source Code
https://github.com/Gianfranco99/GuessNFT

### Live Demo


### Gameplay Video


### How to Play
1. Connect with Cartridge Controller
2. Create or join a Match on Starknet
3. Both players commit to a hidden character 
4. Take turns asking yes/no questions
5. The answering player generates a ZK proof in the browser that their answer matches their committed character
6. The Cairo contract verifies the proof and accepts the answer
7. The game proceeds until a final guess is made and both players reveal their characters

### Twitter


### Team Members
- Gianfranco (@Gianfranco99)
