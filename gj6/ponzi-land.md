---
id: "ponzi-land"
emoji: "🏗️"
title: "Ponzi Land Mod"
summary_short: >
  Game mod for Ponzi Land adding a mini-map widget, sound effects for land interactions,
  and fixing the buy land transaction functionality.
summary_long: >
  Ponzi Land Mod adds features to the existing **Ponzi Land** game including a **mini-map
  widget** showing a grid overview with color-coded owned and empty lands, **sound effects**
  for land interactions (auction and empty land clicks), and a critical fix for the **buy land
  functionality** that was preventing transactions. Built with 3 models, 3 systems, and 9
  events with **frontend SDK integration**. All 3 commits during the jam. Submitted as a
  **Game Mod** track entry.
work_done_short: >
  Added mini-map widget, sound effects, and buy land fix to Ponzi Land with
  3 models, 3 systems, and 9 events during the jam.
work_done_long: >
  Extended Ponzi Land with a Svelte mini-map component showing color-coded land grid,
  audio feedback for land interactions, and a critical buy land transaction fix.
  Dojo contracts with 3 models, 3 systems, and 9 events. Integrated the Dojo frontend SDK.
  All 3 commits during the jam. Submitted as Game Mod track.
repo_url: "https://github.com/ussyalfaks/PonziLand_Mod"
demo_url: null
video_url: null
team:
  - "@usman_alfaki"
metrics:
  classification: "Feature"
  team_size: 1
  dojo_models: 3
  dojo_systems: 3
  dojo_events: 9
  client_sdk: "dojo.js"
  jam_commits_pct: 100
  playability: "None"
---
#  Project Name

Ponzi Land Mod

### Submission Track
> Indicate which track your project is submitting to.

Game Mod

### Project Summary
> Give a short summary of your game project.

Ponzi Land is a high-stakes, strategically chaotic game where deception, risk, and clever maneuvers dictate your survival. In this world, players must outsmart, outlast, and out-Ponzi each other to claim ultimate dominance. Whether you're a seasoned schemer or a fresh recruit, these docs will guide you through the intricate web of mechanics that define Ponzi Land.

### 1. Added Features

### 1.1 Mini-Map Widget

A new mini-map widget has been added to provide an overview of the game world.

**Implementation:**
- Location: `client/src/lib/components/+game-ui/widgets/mini-map/widget-mini-map.svelte`

**Features:**
- Shows a grid representation of all lands
- Color-coded tiles:
  - **Blue**: Owned lands
  - **Gray**: Empty lands
- Clickable tiles that move the camera to the selected location
- Accessible through the widget launcher

### 1.2 Sound Effects for Land Interactions

Enhanced audio feedback has been implemented for various land interactions.

**Implementation:**
- Sound effects added in: `client/src/lib/stores/sfx.svelte.ts`
- Sound triggers implemented in: `client/src/lib/components/+game-map/game-tile.svelte`

**Sound Effects:**
- **'OnAuction' sound**: Plays when clicking on auction lands
- **'EmptyLand' sound**: Plays when clicking on empty lands

### 1.3 Enhanced Buy Land Functionality

Fixed critical functionality that was preventing users from purchasing land and making transactions.

**Issue Resolved:**
- Users were previously unable to buy land or complete any transactions
- Enhanced the buy land system to enable proper transaction processing

### How to Verify the Changes

### Verification Steps

1. **Clone the PonziLand repository** provided for the MODDABLE track to compare with the modifications
2. **Reference documentation**: https://github.com/dojoengine/game-jams/blob/main/MODDABLE.md

### Testing the Modifications

To verify the implementations work correctly:

- **Mini-Map Widget**: Check that the widget appears in the launcher and displays the correct land grid with proper color coding
- **Sound Effects**: Confirm audio plays when interacting with different land types.
- **Buy Land Functionality**: Test that land purchases can be completed successfully.

### GitHub
> Provide the GitHub where your project is hosted. Please ensure your github repo is registered with [OnlyDust](https://app.onlydust.com/p/create) to receive awards.

Github: https://github.com/ussyalfaks/PonziLand_Mod
OnlyDust: https://www.onlydust.com/repositories/ussyalfaks/PonziLand_Mod

### Play
> Provide instructions on how to play your game. It could be a URL, a README, or a link to a binary to install.

Connect Your Wallet – You'll need a Starknet-compatible wallet.
Acquire Land – You can either:
Buy land in a Dutch auction (new land sales).
Buy land from another player who has listed it for sale.
List Your Land for Sale – Every land you buy must be listed for sale.
You set the sale price and choose any ERC-20 token for the listing.
The chosen token must be paired with a liquid token (LORDS, STRK, ETH).
Understand the Tax System – Your tax rate is based on the sale price you set:
A percentage (2%) of your sale price is taxed per day.
The tax is paid in the same token you list the land for.
The 8 neighboring tiles receive the tax.
Stay Liquid or Lose Your Land – If your land runs out of staked tokens, it gets reclaimed and re-auctioned.


### Twitter
> Provide the projects twitter handle. Please share your submission on socials too for more exposure!
usman_alfaki

### Team members
> Provide a list of your team members.
Usman
GitHub: ussyalfaks
Discord: u.alfaki
