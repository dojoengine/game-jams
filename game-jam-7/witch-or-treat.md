---
id: "witch-or-treat"
emoji: "🎃"
title: "Witch or Treat"
summary_short: >
  On-chain Halloween mini-game built with Dojo where players ring a doorbell to collect
  treats, brew magical potions with different effects, and risk being cursed by the Witch.
summary_long: >
  Witch or Treat is a Halloween-themed on-chain mini-game on Starknet using Dojo and Cairo
  smart contracts. Players ring a doorbell to randomly collect treats, then brew three types
  of potions with different costs and strategic effects. Drinking potions activates buffs,
  but the Witch can curse players at any time. The game uses Dojo's on-chain architecture
  with Torii for real-time state synchronization. The repository is a fork of the game-jams
  repo with game code in a subdirectory.
work_done_short: >
  Built a Halloween-themed treat-collecting and potion-brewing mini-game using Dojo and
  Cairo contracts with a JavaScript frontend.
work_done_long: >
  Developed an on-chain mini-game within the game-jams repository fork, implementing
  doorbell interaction for random treat collection, a potion brewing system with three
  recipe types, potion activation effects, and a curse mechanic. Built Cairo smart contracts
  with Torii indexing for real-time state sync. Created a JavaScript/HTML/CSS frontend.
repo_url: "https://github.com/Akaninyang/game-jams/tree/aa6dca3d11953c23151fa8981b123385ed79ef26/games/witch-or-treat"
demo_url: null
video_url: null
team:
  - "@Akaninyang"
metrics:
  classification: "Feature"
  team_size: 1
  dojo_models: 0
  dojo_systems: 0
  dojo_events: 0
  frontend_sdk: false
  jam_commits_pct: 0
  playability: "None"
---
# 🎃 Witch or Treat

*Witch or Treat* is an on-chain Halloween mini-game built with *Dojo* where players ring a spooky doorbell to collect treats 🍬, brew magical potions 🧪, and risk being cursed by the Witch herself ☠. Every action is powered by *Cairo smart contracts* and synced in real-time via *Torii*.

# Repo

https://github.com/Akaninyang/game-jams/tree/aa6dca3d11953c23151fa8981b123385ed79ef26/games/witch-or-treat

---

## 🕹 How to Play

1. *Connect Wallet* — click the connect button at the top right corner.
2. *Ring the Doorbell* 🔔 to collect random treats.
3. *Collect Treats* 🎃🍭🍫 — watch them appear in your treat bar.
4. *Brew Potions* ⚗ from the potion modal using collected treats:
   - 🧵 *Bribe Potion* — costs 2 🎃
   - 🗡 *Slayer Potion* — costs 3 🍭
   - ✨ *Multiplier Potion* — costs 4 👻
5. *Drink Potions* 🧃 to activate their effects (some increase rewards, some protect you).
6. *Beware the Curse!* ☠ The Witch might curse you, wiping some treats and causing *game over*.
7. *Press Play* to continue after a curse — gameplay resumes with your remaining progress.

---

## ⚙ Run Locally

```bash
# 1️⃣ Start your local node
cd contracts && katana --config katana.toml

# 2️⃣ Build and migrate your Dojo contracts
cd contracts && sozo build && sozo migrate

# 3️⃣ Start the Torii indexer
cd contracts && torii --config torii.toml

# 4️⃣ Launch the client
cd client && pnpm install && pnpm run dev

#credits
dojo-intro template

#tech stack
dojo engine
javascript
html
css
**vibe coded frontend
