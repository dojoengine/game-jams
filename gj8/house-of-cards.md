---
id: "house-of-cards"
emoji: "🎰"
title: "House of Cards"
summary_short: >
  A retro **pixel-art casino town** built on Dojo where players progress from manual gambling
  to operating **autonomous AI betting agents**. Explore a top-down overworld, play on-chain
  **Coin Toss and Price Prediction** games, then unlock Clanker AI agents that grind the casino
  on your behalf.
summary_long: >
  The game world is a persistent, explorable overworld rendered with Tiled maps and pixel
  sprites, with proximity-triggered scene transitions into casino interiors. Smart contracts
  power **on-chain game logic with VRF-based randomness** for provably fair outcomes. As
  players accumulate coins, they gain access to the Clanker House — an AI workshop NPC backed
  by an LLM — where they can **deploy autonomous agents** to bet automatically. Built with
  **2 Dojo models, 4 contracts, and 6 events**, the game integrates Cartridge Controller with
  session keys for seamless Starknet transactions, with STRK bets deployed on Starknet Sepolia.
work_done_short: >
  **Built from scratch** during the jam: a top-down pixel RPG overworld with Tiled maps, an
  on-chain Coin Toss contract with **Cartridge VRF randomness**, and an AI-powered Clanker
  agent system — deployed to Starknet Sepolia.
work_done_long: >
  The casino contracts include a **CoinTossGame Dojo model** with Cartridge VRF-backed
  randomness and a separate casino system managing token ownership. The overworld uses Tiled
  maps with proximity prompts and direct door-entry transitions. A **Clanker AI agent** —
  built on a roasting LLM persona with a Terminator theme — can directly place bets on the
  player's behalf. Session keys via Cartridge Controller enable **seamless, low-friction
  transactions** throughout, with a final migration to STRK bets on Sepolia.
repo_url: "https://github.com/Kepler22bee/House-of-Stark"
demo_url: "https://house-of-stark.vercel.app/"
video_url: null
team:
  - "@0xrguha"
  - "@0xSuhass"
metrics:
  classification: "Whole Game"
  team_size: 2
  dojo_models: 2
  dojo_systems: 4
  dojo_events: 6
  client_sdk: "dojo.js"
  jam_commits_pct: 96
  gameplay: "Onchain"
---

# House of Cards

### Project Summary
 A retro pixel-style casino town where players start by manually playing simple betting games and gradually transition into managing autonomous AI agents that play for them.

Players explore a top-down world and enter different shops that host games such as Coin Toss and Price Prediction. Early gameplay focuses on learning and earning coins through manual play. As players progress, they unlock the ability to purchase AI agents that automatically participate in these games.

These agents can continue generating rewards while the player is online or offline. Players can further upgrade agents with abilities and strategies to improve performance and increase yield.

The core progression transforms the player's role from individual gambler to operator of a network of autonomous casino agents, emphasizing strategy, automation, and optimization.
### Source Code
> https://github.com/Kepler22bee/House-of-Stark

### Live Demo
> [house-of-cards.vercel.app](https://house-of-stark.vercel.app/)

### Gameplay Video
>

### How to Play
> Brief instructions for playing the game.
> Example: Connect wallet, click New Game, drag pieces to score points.


### Team Members
> @0xrguha\
 @0xSuhass
