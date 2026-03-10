---
id: "bounce-tale"
emoji: "🔵"
title: "Bounce Tale"
summary_short: >
  A **nostalgic 2D platformer** where you guide a bouncing ball through 11
  handcrafted levels across 5 themed worlds. **Ball size mechanics** — Normal,
  Inflated, and Deflated states — unlock new paths and movement options, with
  every action **recorded on-chain via Dojo**.
summary_long: >
  Collect rings, dodge hazards, and hit checkpoints across Grasslands,
  Underground, Sky, Lava, and Crystal worlds. Three difficulty modes alter
  physics feel. A **custom 60 FPS Canvas 2D engine** handles collision,
  parallax camera, and procedurally generated SFX. On-chain, **8 Dojo models**
  track player progress, level unlocks, achievements, daily streaks, referrals,
  and settings. **14 achievements mint as NFT badges**, and global leaderboards
  cover Score, Stars, and Referrals. The React frontend integrates the **Dojo
  SDK** for real-time Torii sync, with Cartridge Controller for wallet
  abstraction and full PWA support for mobile and desktop.
work_done_short: >
  **Built entirely during the jam** by a solo developer. Complete game engine,
  11 levels across 5 worlds, all on-chain contracts, **NFT achievement system**,
  daily rewards, referral mechanics, and a deployed PWA frontend.
work_done_long: >
  The **custom physics engine** supports ball size state transitions
  (inflate/deflate pads), platformer collision, and a parallax camera — all
  inside a Canvas 2D renderer. Contracts implement **7 on-chain actions**
  across registration, level sessions, achievement minting, daily streaks, and
  referrals, backed by 8 Dojo models and 12 events. The **React 19 + Vite
  frontend** wires Zustand state management to on-chain data via the Dojo SDK,
  with service worker pre-caching enabling offline play.
repo_url: "https://github.com/zarah-s/bounce-tale"
demo_url: "https://bounce-tale.vercel.app"
video_url: "https://drive.google.com/file/d/1t1vz96QSdU7rpemo8G5BOm60VxWHmouu/view?usp=sharing"
team:
  - "@zarah-s"
metrics:
  classification: "Whole Game"
  team_size: 1
  dojo_models: 8
  dojo_systems: 1
  dojo_events: 12
  client_sdk: "dojo.js"
  jam_commits_pct: 100
  gameplay: "Offchain"
---

# Bounce Tale

---

## Project Summary

**Bounce** is a nostalgic 2D platformer built on Starknet using the Dojo engine. Navigate a bouncing ball through 11 handcrafted levels across 5 themed worlds — collecting rings, dodging hazards, and hitting checkpoints — with every action recorded on-chain.

Features:

- 5 themed worlds with 11 levels (Grasslands, Underground, Sky, Lava, Crystal)
- Ball size mechanics: Normal, Inflated (higher jumps), Deflated (squeeze through gaps)
- 3 difficulty modes with distinct physics (Easy, Normal, Hard)
- Star rating system (up to 3 stars per level)
- 14 on-chain achievements minted as NFT badges
- Daily reward streak system with multiplier bonuses
- Referral system with bronze/silver/gold medals
- Global leaderboards for Score, Stars, and Referrals
- Custom 60 FPS physics engine with Canvas 2D rendering
- Cartridge Controller for wallet
- PWA — installable on mobile and desktop

## Source Code

https://github.com/zarah-s/bounce-tale

## Live Demo

https://bounce-tale.vercel.app

## Gameplay Video

https://drive.google.com/file/d/1t1vz96QSdU7rpemo8G5BOm60VxWHmouu/view?usp=sharing

## How to Play

1. Connect with Cartridge Controller
2. Select a world and level from the level select screen
3. Tap/click to jump, use arrow keys or swipe to move
4. Collect rings for points, hit checkpoints to save progress
5. Use inflate/deflate pads to change ball size and access new paths
6. Reach the goal flag to complete the level and earn stars
7. Claim daily rewards and refer friends for bonus rewards

## Architecture

### Smart Contracts (Cairo)

Built with Dojo 1.8:

**Models:**

- `Player` — wallet address, username, total score, total stars, referral count
- `LevelProgress` — per-player-per-level score, stars, completion time, ring counts
- `LevelUnlock` — tracks which levels are unlocked per player
- `Achievement` — 14 achievement definitions with unlock status
- `ActiveSession` — current game session state
- `DailyStreak` — last claim time, streak count, total claims, total bonus
- `ReferralCode` — referral tracking with referrer/referred addresses
- `PlayerSettings` — difficulty preference, sound/music volume

**Systems:**

- `register_player(username)` — create player profile
- `start_level(world, level)` — begin a level session
- `complete_level(world, level, score, stars, time, rings)` — record level completion
- `unlock_achievement(achievement_id)` — mint achievement NFT badge
- `claim_daily_reward()` — claim daily login bonus
- `apply_referral(referrer_code)` — link referral
- `save_settings(difficulty, sound_vol, music_vol)` — persist preferences

### Client

- React 19 + TypeScript + Vite
- Canvas 2D game engine with custom physics, collision detection, parallax camera
- Zustand for state management
- Howler.js for procedurally generated SFX
- Dojo SDK for blockchain integration
- Cartridge Controller for wallet / account abstraction
- Tailwind CSS 4 for UI
- PWA with service worker pre-caching for offline play

## Team Members

- @zarah-s ([GitHub](https://github.com/zarah-s))

## Twitter

@zarah_0x
