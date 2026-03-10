---
id: "neon-sentinel"
emoji: "🤖"
title: "Neon Sentinel"
summary_short: >
  A **retro 2D arcade shooter** set inside a collapsing digital megasystem called The Grid. Players
  control a security program fighting wave after wave of enemy corruption, collecting power-ups, and
  pushing through **increasingly dangerous system layers**. Features **on-chain leaderboards**, a
  pregame upgrade shop, and competitive prestige loops powered by Dojo.
summary_long: >
  Built on a **17-system Dojo backend** with 20 models tracking player state, leaderboard rankings,
  economy, and minime support units. Players earn coins in-game and can purchase upgrades, cosmetics,
  and minimes through an **on-chain marketplace** backed by STRK tokens. Special abilities —
  GodMode, Shockwave, and Minimes — create risk-reward decisions during runs. The frontend connects
  to a **deployed Dojo world on Sepolia** via Torii's GraphQL API and Cartridge Controller for wallet
  authentication. An **NFT rank system** tracks player progression and prestige across sessions.
work_done_short: >
  For the jam, the team integrated **Cartridge Controller** into an existing arcade shooter, enabling
  **wallet-connected gameplay** with on-chain purchases, policy approvals, and live leaderboard
  submissions — plus contract hardening and frontend polish.
work_done_long: >
  The Cartridge minimal integration involved wiring up **controller policies**, fixing marketplace
  purchase flows, and synchronizing real-time on-chain state updates. Contracts on the minimal branch
  were hardened for production robustness, including **NFT rank interface improvements** and Sepolia
  deployment fixes. New **user journey modals** guide players through wallet connection and policy
  acceptance. Loom walkthroughs were published to help judges and players understand the game's
  systems and controls.
repo_url: "https://github.com/Otaiki1/neon-sentinel"
demo_url: "https://neon-sentinel-testers.vercel.app/"
video_url: "https://www.loom.com/share/db7b22b6d848430e9e227e9776159746"
team:
  - "Otaiki @otaiki"
  - "JenniferIze @kicg"
metrics:
  classification: "Feature"
  team_size: 2
  dojo_models: 20
  dojo_systems: 18
  dojo_events: 17
  client_sdk: "None"
  jam_commits_pct: 16
  gameplay: "Offchain"
---



# Neon Sentinel

### Project Summary
Neon Sentinel is a retro 2D arcade shooter set inside a collapsing digital megasystem called The Grid.

Players control an autonomous security program fighting a spreading corruption known as The Swarm, destroying enemies, collecting power-ups, and pushing through increasingly dangerous system layers.

The game combines fast, addictive arcade combat, risk-reward mechanics , and endless prestige loops, encouraging players to survive longer, score higher, and climb competitive leaderboards.

### Source Code
[Frontend Repo](https://github.com/Otaiki1/neon-sentinel)
[Contracts Repo](https://github.com/Otaiki1/neon-sentinel-contract/tree/minimal)
[Deployed World](https://sepolia.voyager.online/contract/0x07bcbeb6104a77c6c90d7285ba06c2623454a38b501554c0d1645013fe610fc1#events)

### Live Demo
[Play Now](https://neon-sentinel-testers.vercel.app/)


### Gameplay Video
[GamePlay](https://www.loom.com/share/db7b22b6d848430e9e227e9776159746)
[Watch Game Origins Video](https://youtu.be/MnpROUA_DXM)
[Game Walkthrough](https://www.loom.com/share/12eec72e172343e6986252571b94e2e8)

### How to Play
- Begin Game by Connecting Wallet{recommended} or playing anonymous
- This is a simple step as you just need to login with cartridge
- Accept all policies and permissions
- Click StartGame
- Click Launch or buy pregame upgrades then launch
- Control your shooter with arrow keys and press spacebar to shoot
- Try to earn as much points as possible
- use keys `Q`, `B` and `M` to unlock GodMode, ShockWave and Minimes respectively
- GodMode and Shockwave are available after running for over 10k points
- Minimes can be bought in inventory and used in game as fighting support
- Coins can be bought in Market with STRK tokens

### Twitter
[X Account](https://x.com/theneonsentinel)
[Otaiki](https://x.com/otaikisadiq)

### Team Members
Otaiki @otaiki
JenniferIze @kicg
