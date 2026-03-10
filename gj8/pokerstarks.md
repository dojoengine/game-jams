# Pokerstarks

## Project Summary

**Pokerstarks** is a fully on-chain Texas Hold'em poker game for 2-6 players on Starknet where privacy is built into every layer. Cards are encrypted using ElGamal on the Grumpkin curve — nobody can see your hand, not even the blockchain. Shuffles are provably fair via ZK proofs (Noir circuits verified on-chain through Garaga), so there's no trusted dealer. Chip balances can be hidden using Tongo confidential ERC20. The entire game state lives on-chain via Dojo ECS, and onboarding is seamless through Cartridge Controller with session keys, gasless transactions, and passkey authentication.

Features:
- ZK-proven shuffle — each player shuffles and proves fairness in ~11 seconds
- Private hole cards — decrypted client-side only, never stored in plaintext on-chain
- Full Texas Hold'em flow (pre-flop, flop, turn, river, showdown)
- On-chain hand evaluation and pot distribution
- Spectator mode — watch live games without seeing hole cards
- Chat and emotes at the table
- Bot support for solo play

## Source Code

https://github.com/KaranSinghBisht/Pokerstarks

## Live Demo

https://pokerstarks.vercel.app/

## Gameplay Video

https://youtu.be/T2_A44Vwy6M

## How to Play

1. **Connect wallet** — Click "Connect Wallet" on the landing page and authenticate via Cartridge Controller (passkeys, social login)
2. **Claim test chips** — If your balance is zero, click "Claim Chips" to get test tokens from the faucet
3. **Join or create a table** — Browse open tables in the lobby and click to join, or click "Create Table" to set blinds, buy-in range, and max players. Use "Play Solo" to instantly start with bots
4. **Ready up** — Once seated, click "Ready". The hand begins when all players are ready
5. **Shuffle phase** — Each player's browser automatically generates a ZK shuffle proof (~11 seconds). A progress bar shows who is shuffling. No action needed — just wait
6. **Play poker** — Your hole cards appear face-up (only to you). Use the action buttons: Fold, Check, Call, Bet, Raise, or All-In. A timer counts down on each turn
7. **Community cards** — Flop, turn, and river are dealt between betting rounds, visible to all
8. **Showdown** — Remaining players reveal hands. The contract evaluates hands and distributes the pot automatically
9. **Chat** — Use the sidebar to send messages or emotes during play

## Twitter

[@Karan_Bisht09](https://x.com/Karan_Bisht09)

## Team Members

- **Karan Singh Bisht** ([@Karan_Bisht09](https://x.com/Karan_Bisht09))
