---
id: "blokaz"
emoji: "🟦"
title: "Blokaz"
summary_short: >
  A **Block Blast-style puzzle game fully on Starknet**, built with the Embeddable Game
  Standard (EGS). Players mint an **NFT game token**, place pieces on a 9x9 grid to clear
  rows and columns, chain combos, and compete for the **highest score** — every move
  submitted as a Starknet transaction.
summary_long: >
  Built on the **Provable Games EGS framework**, each session is tied to a **Denshokan NFT
  token** that carries the entire game state on-chain: the board grid, score, combo streak,
  and the next available pieces. The Blokaz contract stores a **compressed 128-bit bitmask**
  for the 9x9 grid and handles all placement logic and row/column clearing in Cairo. The React
  frontend uses the **denshokan-sdk and Cartridge Controller** for wallet integration, with
  every block placement waiting for on-chain confirmation before updating the UI. A **live
  leaderboard** aggregates scores from all tokens.
work_done_short: >
  **Built from scratch** during the jam. Full Cairo puzzle engine with **piece placement
  validation**, row/column clearing, combo chaining, and EGS-compatible game state stored
  on-chain as **compressed 128-bit bitmasks**.
work_done_long: >
  The contract implements **all game rules on-chain**: piece placement validated against the
  128-bit grid bitmask, **row and column clearing** with automatic combo multipliers, and
  random piece generation seeded from the block timestamp. The React + PixiJS frontend uses
  the denshokan-sdk for **NFT token management**, with the Cartridge Controller enabling
  session-based transactions. A **leaderboard** aggregates scores from all Denshokan tokens
  across players, making scores permanently provable achievements on-chain.
repo_url: "https://github.com/Samuel1-ona/Blokaz"
demo_url: "https://blokaz.vercel.app"
video_url: "https://www.loom.com/share/be3d28de50dc4d529a6db873712a2142"
team:
  - "Samuel(Eagle) — @sanuel_ETH"
  - "Mano.links — @manoahluka"
  - "Onasachi"
metrics:
  classification: "Whole Game"
  team_size: 3
  dojo_models: 0
  dojo_systems: 0
  dojo_events: 0
  client_sdk: "None"
  jam_commits_pct: 100
  gameplay: "Onchain"
---

# Blokaz

### Project Summary

**Blokaz** A fully onchain block puzzle game on Starknet, built with the **Embeddable Game Standard (EGS)**.
Blokaz is a Block Blast-style puzzle game where players place pieces on a 9x9 grid, clear rows and columns, chain combos, and compete for the highest score — all executed as Starknet transactions.

Players mint a game token (NFT) to start playing. The token holds their entire game state onchain: the board, score, combo streak, and available pieces. When the game ends, the score lives permanently on the token — a provable, composable achievement.


### Source Code

[blokaz Source Code](https://github.com/Samuel1-ona/Blokaz)

### Live Demo
[blokaz.vercel.app](https://blokaz.vercel.app)

### Gameplay Video
[blokaz Gameplay Video](https://www.loom.com/share/be3d28de50dc4d529a6db873712a2142)

### How to Play
1. Connect your wallet (Cartridge Controller)
2. Mint a game token (ERC-721 via Denshokan)
3. Play — drag and drop blocks onto the 9x9 grid
4. Clear full rows or columns to score points and build combos
5. Compete on the live leaderboard


### Twitter
[@sanuel_ETH](https://x.com/sanuel_ETH)

### Team Members
 - **Samuel(Eagle)** - Game Loop design, smart contract design ; [@sanuel_ETH](https://x.com/sanuel_ETH)
 - **Mano.links** -  Smart contract integration, EGS implementation ; [@manoahluka](https://x.com/manoahluka)
 - **Onasachi** - UI/UX design, Game UI implementation ;
