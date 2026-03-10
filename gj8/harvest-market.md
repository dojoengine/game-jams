---
id: "harvest-market"
emoji: "🌾"
title: "Harvest Market"
summary_short: >
  A **fully on-chain incremental farming game** built with Dojo on Starknet, rendered inside a
  **Unity 6 WebGL client** embedded in React. Players grow crops, process them into higher-value
  goods using machines, and sell for coins — all with **game state persisted entirely on-chain**.
summary_long: >
  Players manage blockchain-owned plots, harvesting crops with **timed growth cycles** and
  quality tiers (Normal → Perfect) determined by on-chain randomness seeded from the transaction
  hash. Raw produce feeds into processing machines (Mill, Cannery) to create higher-value goods,
  while a **tractor upgrade system** scales yield multipliers. The architecture bridges a **Unity 6
  WebGL game client** to a React/TypeScript shell via a bidirectional JS interop layer, with all
  contract calls routed through the Dojo SDK and full player state hydrated via **Torii GraphQL**
  on connect. Cartridge Controller handles wallet authentication.
work_done_short: >
  **Built entirely during the jam** — 4 Cairo models and 1 system contract covering the full
  farming loop, a React/TypeScript frontend shell with **Unity 6 WebGL integration**, and a
  bidirectional JS bridge connecting the game client to the blockchain layer.
work_done_long: >
  Contracts implement 7 on-chain actions (initialize, harvest, sell, process, buy_upgrade,
  buy_machine, buy_plot) with **on-chain quality rolling** via poseidon-hashed transaction data
  and tractor multipliers. The React shell uses a **bidirectional message bus** (`bridge.ts`)
  between React and Unity, with Torii GraphQL for state hydration. The Unity client features
  **3D plot and machine spawning** from on-chain state, a ghost-placement flow for purchasing
  assets, a FIFO transaction queue, and a UI Toolkit HUD with inventory panel.
repo_url: "https://github.com/cristianFleita/harvest-market"
demo_url: "https://harvest-market.onrender.com"
video_url: "https://www.youtube.com/watch?v=mRFVq75BazI"
team:
  - "@cristianFleita"
  - "@brendaamareco"
metrics:
  classification: "Whole Game"
  team_size: 2
  dojo_models: 4
  dojo_systems: 1
  dojo_events: 0
  client_sdk: "dojo.js"
  jam_commits_pct: 100
  playability: "Live"
---

# Harvest Market

## Project Summary

**Harvest Market** is a fully on-chain incremental farming game built on Starknet using the Dojo engine, rendered inside a Unity 6 WebGL client embedded in a React + TypeScript frontend.

Players grow crops on blockchain-owned plots, harvest them, process raw produce into higher-value goods using machines, and sell everything for coins — all with game state stored entirely on-chain.

Features:

- 3 crop types with quality tiers (Normal → Perfect) and timed growth cycles
- 2 processing machines: Mill, Cannery
- Tractor upgrade system with on-chain persistence
- Fully on-chain game state via Dojo / Torii
- Unity 6 WebGL game client bridged to React via a JS interop layer
- Cartridge Controller authentication

## Source Code

- Frontend + Contracts: https://github.com/cristianFleita/harvest-market
- Unity Client: https://github.com/brendaamareco/harvest-maker-unity

## Live Demo

https://harvest-market.onrender.com

## Gameplay Video

https://www.youtube.com/watch?v=mRFVq75BazI

## How to Play

1. Connect your wallet with Cartridge Controller
2. Click **Initialize Farm** to create your on-chain player
3. Walk up to a crop plot and interact to harvest when ready
4. Drag crops into a machine's recipe trigger to process them into goods
5. Got to the sell ship to sell items for coins
6. Use coins to buy new plots, upgrade your tractor, and unlock machines

## Architecture

### Smart Contracts (Cairo)

Built with Dojo 1.7.x:

See the full contract reference: [CONTRACT.md](https://github.com/cristianFleita/harvest-market/blob/main/contracts/CONTRACTS.md)

**Models:**

- `Player` — stores coins, tractor level, plot level, plot count, machines owned
- `Plot` — tracks crop type, last harvest timestamp, and active status per plot
- `InventorySlot` — quantity of each (item_type, quality) pair per player

**Systems (IFarm interface):**

- `initialize()` — create a new player farm on-chain
- `harvest(plot_id)` — claim a ready crop cycle, emits `Harvested`
- `sell(item_type, quality, quantity)` — convert inventory to coins, emits `Sold`
- `process(machine_type, recipe_id, quantity)` — run a machine recipe, emits `Processed`
- `buy_upgrade(upgrade_type)` — upgrade tractor (0) or plot level (1), emits `Upgraded`
- `buy_machine(machine_type)` — unlock a machine, emits `MachinePurchased`
- `buy_plot(crop_type)` — purchase a new plot, emits `PlotPurchased`

### Client

**React + TypeScript (frontend shell)**

- Loads and embeds the Unity 6 WebGL build via `UnityEmbed.tsx`
- `bridge.ts` — bidirectional message bus between React and Unity (`window.dispatchUnityEvent` / `SendMessage`)
- `useFarm.ts` — all contract calls with receipt event parsing and tx result emission
- `graphql.ts` — Torii GraphQL queries to load full player state on connect
- Cartridge Controller via `@cartridge/connector` for wallet authentication
- Burner wallet support for local development (`AppBurner.tsx`)

**Unity 6 WebGL (game client)**

- `JsBridge.cs` + `FarmBridge.jslib` — Unity ↔ browser JS interop layer
- `PlayerState.cs` — static singleton reflecting on-chain state; updated by `ApplyFullState` and `ApplyTxResult`
- `TxQueue.cs` — global FIFO transaction queue; ensures only one tx is in-flight at a time
- `PlotSpawner.cs` / `MachineSpawner.cs` — spawn 3D prefabs from on-chain state at scene load and on state changes
- `Parcela.cs` / `Harvester.cs` — crop growth visuals and harvest interaction
- `Machine.cs` / `RecipeTrigger.cs` — machine processing with recipe-based input/output
- `PlacementSystem.cs` / `PlacementSystemBridge.cs` — ghost-placement flow for buying new plots and machines
- `TractorUpgrader.cs` — tractor upgrade trigger zone
- `GameGUIController.cs` — UI Toolkit HUD (coins, tractor level, plot level)
- `InventoryPanelController.cs` — toggleable inventory panel with item icons, quality color coding, and coin values

## Team Members

- @cristianFleita ([GitHub](https://github.com/cristianFleita))
- @brendaamareco ([GitHub](https://github.com/brendaamareco))
