---
id: "pokerstarks"
emoji: "🃏"
title: "Pokerstarks"
summary_short: >
  A **fully on-chain Texas Hold'em** poker game for 2–6 players where privacy is
  enforced at every layer. Hole cards are encrypted with **ElGamal on the Grumpkin
  curve** — never stored in plaintext on-chain — and shuffles are provably fair via
  **ZK proofs** (Noir circuits verified through Garaga).
summary_long: >
  The complete Texas Hold'em flow — pre-flop through showdown — runs on **Dojo ECS
  with 24 models and 11 systems** managing game state, chat, hands, and pot
  distribution. Each player generates a ZK shuffle proof (~11 seconds) before
  dealing; cards are **decrypted client-side only**. Chip balances can be hidden
  with **Tongo confidential ERC20**. The **dojo.js SDK** drives real-time state
  sync via Torii, and Cartridge Controller provides seamless onboarding via
  passkeys, social login, session keys, and gasless transactions. Spectator mode
  lets observers watch live without ever seeing hole cards.
work_done_short: >
  During the jam, the team shipped an **LLM-powered poker bot** with a personality
  system for solo play, an **agent arena with Elo matchmaking**, EGS compliance for
  rich token metadata, and a **full frontend redesign** with animated emotes.
work_done_long: >
  The **LLM bot** uses a structured strategy engine with adjustable personality,
  enabling challenging solo play. An **arena system** was built with Elo-based
  matchmaking for bot competitions. **EGS compliance** was added via IMinigameDetails
  and token metadata interfaces for platform interoperability. Side pot display and
  **animated emote rendering** improved table UX. StarkZap SDK integration brought
  **email and social wallet login**. Security fixes addressed P0–P3 audit findings
  across contracts and frontend.
repo_url: "https://github.com/KaranSinghBisht/Pokerstarks"
demo_url: "https://pokerstarks.vercel.app/"
video_url: "https://youtu.be/T2_A44Vwy6M"
team:
  - "Karan Singh Bisht (@Karan_Bisht09)"
metrics:
  classification: "Feature"
  team_size: 1
  dojo_models: 24
  dojo_systems: 11
  dojo_events: 0
  client_sdk: "dojo.js"
  jam_commits_pct: 28
  playability: "Live"
---

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
