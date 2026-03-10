---
id: "crypto-card-war-game"
emoji: "🃏"
title: "Crypto Card War Game"
summary_short: >
  A **competitive card battler on Starknet** where card damage scales with **live
  Pragma oracle prices** — BTC pumping means your Bitcoin card hits harder. Players
  choose from 5 crypto-asset cards (BTC, ETH, STRK, SOL, DOGE), select 3 per match,
  and execute **Attack, Defend, or Charge** actions across rounds in five game modes.
summary_long: >
  Ranked matches require **STRK stakes locked in on-chain escrow**, with automatic
  settlement via smart contract after the winner is determined. The game uses **23
  Dojo models** to track players, cards, matches, decks, round snapshots, marketplace
  listings, WarZone events, and private rooms, backed by **8 contract systems** covering
  match progression, oracle price capture, staking, market, and room management. An
  authoritative WebSocket server orchestrates 60-second round timers and AI bot logic
  while reading **Pragma oracle snapshots on-chain** each round; match transcripts are
  **Poseidon-hashed before settlement**. Cartridge Controller enables passkey and
  session-key onboarding.
work_done_short: >
  Added **card merging** (combine duplicates to boost stats), a **20+ milestone
  achievement system** with WebSocket notifications, and two new bots: **E.V.E.**
  (market-aware AI that reads play patterns) and Lit Trader (conservative BTC-focused
  bot with speech bubbles).
work_done_long: >
  The **card merging system** computes level boosts that feed directly into combat
  stat calculations. The **achievement system** tracks milestones DB-side, backfills
  on profile load, and fires real-time WS notifications. **E.V.E.** adjusts strategy
  based on live price momentum and observed opponent patterns; the Lit Trader takes a
  conservative stance. Admin tools for market item **image upload** were added, along
  with market item expiry, leaderboard bot exclusions, mobile fullscreen modals, PWA
  support, and a suite of combat bug fixes.
repo_url: "https://github.com/PrimaFi-Labs/ccwg"
demo_url: "https://ccwg.primafi.xyz"
video_url: "https://youtu.be/GIhiK1_Tluc?si=6t8vGYjEO3k4VUMe"
team:
  - "O.D Doherty (@hiesdiego)"
metrics:
  classification: "Feature"
  team_size: 1
  dojo_models: 23
  dojo_systems: 8
  dojo_events: 26
  client_sdk: "None"
  jam_commits_pct: 68
  playability: "Live"
---

# Crypto Card War Game

### Project Summary

**Crypto Card War Game (CCWG)** is a competitive card game on Starknet where every card is tied to a real crypto asset. Each round, live price data from the Pragma oracle is captured on-chain — if your card's asset is surging, your attacks hit harder. If it's dumping, you deal less damage. Strategy meets real market volatility.

Players pick 3 cards (BTC, ETH, STRK, SOL, or DOGE), choose actions each round (Attack, Defend, or Charge), and fight to win the majority of rounds. Ranked matches require STRK stakes locked in an on-chain escrow — the winner takes the pot, settled automatically by the smart contract.

**Key features:**
- 5 game modes: VsAI (practice against bots), Ranked 1v1 (staked PvP), Friend Challenge, WarZone Events (tournaments), and Room Games (private lobbies)
- Live oracle-fed momentum: card damage scales with real-time crypto price movement via Pragma
- On-chain STRK staking with escrow lock, settlement, and refund logic
- 3 BOT opponents: difficulty-based bots, E.V.E. (market-aware AI that reads your play patterns), and Lit Trader (conservative BTC-focused bot)
- Card marketplace: buy packs on-chain via STRK with session-key-approved transactions
- Card merging: combine duplicate cards to boost stats
- Achievement system with 20+ unlockable milestones
- Cartridge Controller for seamless onboarding (passkeys, Google, Discord sign-in)

### Source Code

https://github.com/PrimaFi-Labs/ccwg

### Live Demo

https://ccwg.primafi.xyz

### Gameplay Video

https://youtu.be/GIhiK1_Tluc?si=6t8vGYjEO3k4VUMe

### How to Play

1. Visit [ccwg.primafi.xyz](https://ccwg.primafi.xyz) and click **Connect** to sign in with Cartridge Controller
2. Head to the **Marketplace** and buy a card pack (costs STRK) — you need at least 3 cards to play
3. Go to the **Lobby** and pick a game mode (start with Vs Bot to learn)
4. Select 3 cards for your match deck and enter the arena
5. Each round you choose an action: **Attack** (deal damage), **Defend** (reduce incoming damage), or **Charge** (activate ability)
6. Your card's damage is calculated from its card stats + the live price momentum of its linked crypto asset (e.g. BTC pumping = Bitcoin card hits harder)
7. Win the majority of rounds to win the match — ranked matches settle STRK stakes on-chain automatically

### Architecture

#### Smart Contracts (Cairo + Dojo 1.8)

Deployed on Starknet Sepolia. World address: `0x07f3647c6cb682cdf2cc02f6348d24a8929f5f4c5d9c56159a80425c42fe9004`

**Models:** `Player`, `Card`, `Match`, `Deck`, `RoundSnapshot`, `Escrow`, `GameEvent`, `EventParticipant`, `Room`, `RoomMember`, `MarketItem`, `MarketPurchase`, `IdCounter`, `AuthorizedServer`, `TreasuryConfig` (see `contracts/src/models.cairo`)

**Systems (with deployed addresses):**

| System | Address | Purpose |
|--------|---------|---------|
| `match_system` | `0x01e4593029bff8ed22cae9c1aede5daef4f74b0acfc8b01c85796359ed7600ea` | Create ranked/AI matches, cancel matches |
| `escrow_system` | `0x038b42fdfb42a25de102d628e271b57e24594e48eb4e9ddfa3c0d25aeb3f7b9a` | STRK stake deposit, lock, settlement, refund |
| `oracle_system` | `0x048e4128aeafe0a088d2525e2e2ff8e4123ab82dc2b8962c7b296fde30a07990` | Capture Pragma price snapshots per round |
| `match_progression` | `0x01948d6d9b21c5cce7918d0132ee61e422f586ba7918445e560e401d0fd8243` | Round advancement, match finalization |
| `market_system` | `0x057d099649750b0a5e2883518a672653f52af4da8a6bc4d95a3109a641d90e38` | Card pack listings, on-chain purchases |
| `event_system` | `0x05b238e4ca47e7e61cd5738a1011da8ea45854d176d08c9ba185fc0be38373f5` | WarZone tournament lifecycle, prize distribution |
| `room_system` | `0x0783dd01c2d76d3275545952709686d41d6e265bac68d8a2f0125719b0a58f3d` | Private room creation, join/leave, settlement |
| `admin_system` | `0x02a0ebf5447da0920400517e19d8c2a8d9ef2cbe94c7a17e6a4d917cf8ed9cea` | Server authorization, treasury config |

#### Client (Next.js 16)

- React 19 + TypeScript + Tailwind CSS 4
- `starknet` v9.2.1 for low-level contract calls
- `@starknet-react/core` v5 for wallet hooks (`useAccount`, `useConnect`)
- `@cartridge/connector` + `@cartridge/controller` v0.13 for Cartridge Controller (passkeys, session keys with per-system policies)
- WebSocket connection to the authoritative game server for real-time match orchestration
- On-chain calls for staking, settlement, and marketplace routed through session key policies

#### Game Server (Node.js / TypeScript)

- Authoritative WebSocket server (`ccwg-server/src/match-orchestrator.ts`)
- Manages 60-second round timers, action resolution, and AI bot logic
- Reads Pragma oracle prices each round via `oracle_system` contract for live momentum calculation
- Calls `escrow_system` on-chain for match settlement with Poseidon-hashed transcripts
- Anti-cheat: all game outcomes are server-authoritative — the client cannot manipulate results

### Twitter

@cryptocardwarx

### Team Members

- O.D Doherty ([GitHub](https://github.com/hiesdiego))
