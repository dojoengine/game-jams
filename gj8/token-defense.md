---
id: "token-defense"
emoji: "🛡️"
title: "Token Defense"
summary_short: >
  A **fully on-chain tower defense game** where players defend an AI base from waves
  of prompt injection attacks. Features **per-enemy on-chain wave simulation**, a
  token economy with 3 tower and factory types, and **EGS session resume** via
  ERC-721 tokens.
summary_long: >
  Ten waves of escalating enemies (TextJailbreak, ContextOverflow, HalluSwarm, and
  Bosses) are simulated **entirely on-chain** using a sequential token-drain model —
  later enemies face weaker towers as tokens deplete. Three tower types consume
  matching tokens per shot, with **synergy bonuses for adjacent mixed towers** and
  HP degradation from surviving enemies. The **Embeddable Game Standard** turns each
  session into a portable ERC-721 token with full `IMinigameDetails` and
  `IMinigameObjectives` interfaces. Built with **3 Dojo models and 3 contracts**,
  the React client features **deterministic wave replay animations** at 60fps and
  optimistic UI with Torii sync. Includes **37 Cairo integration tests** and an
  endless mode after wave 10.
work_done_short: >
  **Built entirely during the jam** — full tower defense with **on-chain wave
  simulation**, 3 tower/factory types, EGS integration with 5 achievements, and a
  **React client** with 60fps wave replay.
work_done_long: >
  Implemented complete wave simulation in Cairo — **per-enemy sequential damage
  calculation** with tower tiers, synergy bonuses, and HP degradation. Built 3
  systems (game, building, wave) with **difficulty settings, overclock ability, and
  endless mode**. Full EGS integration including `IMinigameDetails`,
  `IMinigameSettings`, and `IMinigameObjectives` with **5 trackable achievements**.
  The React frontend decodes `WaveResolved` bitmask events for **deterministic
  replay animation**, with optimistic tower placement and session resume via token ID.
repo_url: "https://github.com/krishnan74/Token-Defense"
demo_url: "https://token-defense.vercel.app"
video_url: "https://youtu.be/CzbOLKw8nKc"
team:
  - "@krishnan74"
metrics:
  classification: "Whole Game"
  team_size: 1
  dojo_models: 3
  dojo_systems: 3
  dojo_events: 0
  client_sdk: "dojo.js"
  jam_commits_pct: 100
  gameplay: "Onchain"
---

# Token Defense

## Project Summary

**Token Defense** is a fully on-chain tower defense game built on StarkNet using the Dojo engine. Defend your AI base from waves of prompt injection attacks by placing towers and factories on a 12×8 grid.

**Features:**
- **3 tower types** — GPT (input, range 3), Vision (image, range 2), Code (code, range 3, 1.5× AoE vs HalluSwarm) — up to 14 placed simultaneously; sell to reposition
- **3 factory types** — each producing a matching token type; upgradeable to L3 (capped); sell refund includes upgrade gold
- **10 waves** of escalating enemies: TextJailbreak, ContextOverflow (from wave 3), HalluSwarm, and Boss enemies on waves 5 & 10; plus **endless mode** after wave 10
- **Per-enemy on-chain simulation** — wave resolution runs entirely in the contract using a sequential token-drain model; later enemies face weaker towers as tokens deplete
- **Token economy** — towers consume tokens per shot; tier (Powered / Good / Low / Critical / Offline) determines fire rate and damage multiplier; token cap 150; ResourceBar shows +X production forecast
- **Tower HP degradation** — surviving enemies damage towers in range; repairable for 30g (Repair-All button for bulk repair)
- **Strategic mechanics** — tower synergy bonuses, factory upgrades, overclock ability, wave modifiers, per-enemy traits (Armored/Fast), wave difficulty rating, gold forecast
- **Session resume** — each session is a Denshokan EGS ERC721 token; resume from any device via token ID or shared URL
- **Quit game** — forfeit a session on-chain at any time between waves
- **Guided tour** — 8-step in-game tutorial for new players; replayable via TOUR button

---

## Source Code

https://github.com/krishnan74/Token-Defense

## Live Demo

https://token-defense.vercel.app

## Gameplay Video

https://youtu.be/CzbOLKw8nKc

---

## How to Play

1. Connect your **Cartridge Controller** wallet
2. Select a difficulty — **Easy / Normal / Hard** — and click **START GAME**
3. Place towers on grass tiles; each tower type consumes its matching token per shot
4. Build factories to generate tokens each wave (factory type must match tower type)
5. Upgrade factories and towers to increase output and damage
6. Click **START WAVE** — the contract simulates the wave on-chain and emits a `WaveResolved` event; the client animates the result in real time
7. Optionally activate **⚡ OVERCLOCK (50g)** before a wave to double all tower fire rates
8. Survive all 10 waves to achieve victory


**Tips:**
- Place towers where the path crosses multiple times — more path coverage = more shots per enemy
- Vision towers have range 2 (not 3) — place them tight on path bends for maximum coverage
- Code towers deal 1.5× AoE damage vs HalluSwarm (waves 7+) — worth pairing with Image factories
- Factories next to their matching tower type draw conveyor connections automatically
- Adjacent towers of **different** types grant a **+20% synergy damage bonus** to each other
- Token balance is capped at 150 per type — the ResourceBar shows +X production forecast so you can plan
- Sell towers (free + upgrade refund) and factories (50% of total cost incl. upgrades) to reposition mid-game
- Use **Repair-All** in the sidebar to restore all damaged towers in one transaction
- After each wave the result card shows per-group kill counts (e.g. `6/7 TJ ELIM`) and damaged towers
- From wave 5 onward, some enemies have Armored/Fast traits — the WavePanel shows a trait hint before you start

---

## Architecture

### Smart Contracts — Cairo / Dojo 1.8.0

**Models** (`models.cairo`) — keyed by EGS `token_id: felt252`:

| Model | Key(s) | Description |
|-------|--------|-------------|
| `GameState` | `token_id` | Wave number, gold, token balances, base HP, difficulty, overclock flag, `endless_mode` flag |
| `Tower` | `token_id`, `tower_id` | Type, position, health, level (1–3) |
| `Factory` | `token_id`, `factory_id` | Type, position, level (1–3, capped), active flag |

**Systems:**

- `game_system` — `new_game`, `quit_game`, `activate_overclock`, `activate_endless`, EGS `score()` / `game_over()` / batch variants
- `building_system` — `place_tower`, `sell_tower` (refunds 50% upgrade gold), `place_factory`, `sell_factory` (refunds 50% of base + upgrade cost), `upgrade_factory` (max L3), `upgrade_tower`, `repair_tower`
- `wave_system` — `start_wave(token_id)` runs a full per-enemy sequential simulation on-chain; bypasses wave cap when `endless_mode = true`; emits `WaveResolved` event with enemy outcome bitmask

**Wave simulation model:**

```
For each enemy in spawn order (TJ → CO → HS → Boss):
  Pass 1 — compute damage:
    For each alive tower in range:
      tier       = cur_tokens / max_tokens  →  dmg_mult + cooldown_mult
      shots      = path_cells_covered × enemy_speed / cooldown
      hp_mult    = tower_health_mult(tower.health, tower.max_health)  -- 100/90/75/55%
      damage    += shots × base_dmg × tier_mult × level_mult × hp_mult × (1 + synergy_bonus)
      tokens    -= shots × TOKEN_COST_PER_SHOT
  if total_damage >= enemy_hp → killed; else →
    base takes damage
    Pass 2 — degrade towers: each in-range tower loses HP (TJ/CO=1, HS=0, Boss=3), floor=1
```

Later enemies face weaker towers as tokens deplete and towers degrade — making factories and timely repairs strategically critical.

**EGS (Embeddable Game Standard):**

Each game session is an ERC721 token minted from Denshokan. The `token_id` is the **session key** used for all contract calls and Torii queries. Players can resume any active session by entering their token ID ( shown in the top-right of the resource bar with a copy button ) on the Resume Game panel or via the `/?id=<tokenId>` URL shortcut.

Only the wallet that owns the EGS token can interact with the session. Sessions persist on-chain indefinitely until quit or victory.

Token Defense implements the full optional EGS interface suite:

**`IMinigameTokenData`** — core required interface:

| Function | Returns | Formula |
|----------|---------|---------|
| `score(token_id)` | `u64` | `wave_number × 1000 + base_health` |
| `game_over(token_id)` | `bool` | `game_over \|\| victory` |
| `score_batch(token_ids)` | `Array<u64>` | batch variant for leaderboards |
| `game_over_batch(token_ids)` | `Array<bool>` | batch variant |

**`IMinigameDetails`** — rich per-token game state for display:

| Function | Returns |
|----------|---------|
| `token_name(token_id)` | `"Token Defense"` |
| `token_description(token_id)` | Dynamic string — difficulty, wave progress, victory/defeat status, score |
| `game_details(token_id)` | 7 live fields: Wave, Base HP, Gold, Towers, Factories, Difficulty, Status |
| `*_batch` variants | All three functions support batch calls |

**`IMinigameSettings`** — named difficulty configurations (settings IDs 1–3):

| ID | Name | Gold | Base HP | Tokens |
|----|------|------|---------|--------|
| 1 | Easy | 300 | 30 | High |
| 2 | Normal | 200 | 20 | Standard |
| 3 | Hard | 120 | 10 | Scarce |

**`IMinigameObjectives`** — 5 trackable on-chain achievements:

| ID | Name | Condition |
|----|------|-----------|
| 1 | First Line Cleared | Survive wave 1 |
| 2 | Midpoint Defender | Survive wave 5 |
| 3 | Cyber Defender | Complete all 10 waves (victory) |
| 4 | Untouched | Victory with full base HP remaining |
| 5 | Iron Sentinel | Victory on Hard difficulty |

### Client — React + Vite + TypeScript

- **Auth:** `@starknet-react/core` + Cartridge `ControllerConnector` with session policies
- **Dojo SDK:** `@dojoengine/sdk` initialised once in `main.tsx`; Torii subscription + polling fallback keyed by `token_id`
- **Wave replay:** After `start_wave()` confirms on-chain, the client fetches the tx receipt, decodes the `WaveResolved` bitmask, then runs a deterministic `WaveReplay.js` animation at 60fps
- **Optimistic UI:** Tower/factory placements, sells, upgrades, and repairs appear instantly; Torii confirmation syncs the final state
- **Session resume:** `useGameState` re-subscribes on `tokenId` change; `handleResume` normalises the input, shows a loading screen, polls Torii every 2s, and validates player address before entering the game

### Toolchain

| Tool | Version |
|------|---------|
| Scarb | 2.16.0 |
| Sozo | 1.8.6 |
| Torii | 1.8.7 |
| Katana | 1.7.1 |
| Vite | 7 |
| TypeScript | 5 |

### Tests

37 Cairo integration tests covering all systems, guard conditions, wave simulation math, and EGS interface correctness.

---

## Team Members

- [@krishnan74](https://github.com/krishnan74)

## Twitter

[@divyakrishnan_r](https://x.com/divyakrishnan_r)
