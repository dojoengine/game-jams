# Token Defense

## Project Summary

**Token Defense** is a fully on-chain tower defense game built on StarkNet using the Dojo engine. Defend your AI base from waves of prompt injection attacks by placing towers and factories on a 12×8 grid.

**Features:**
- **3 tower types** — GPT (input tokens), Vision (image tokens), Code (code tokens)
- **3 factory types** — each producing a matching token type to power towers
- **10 waves** of escalating enemies: TextJailbreak, ContextOverflow, HalluSwarm, and Boss enemies on waves 5 & 10
- **Per-enemy on-chain simulation** — wave resolution runs entirely in the contract using a sequential token-drain model; later enemies face weaker towers as tokens deplete
- **Token economy** — towers consume tokens per shot; tier (Powered / Good / Low / Critical / Offline) determines fire rate and damage multiplier
- **Strategic mechanics** — tower synergy bonuses, factory upgrades, overclock ability, wave modifiers, per-enemy traits, difficulty tiers
- **EGS compatible** — implements `IMinigameTokenData` (score, game_over + batch variants); models keyed by `token_id` for Denshokan leaderboard integration
- **Cartridge Controller** authentication with session key policies
- **Conveyor system** — animated pixel-art conveyors connect factories to towers on the client

---

## Source Code

https://github.com/krishnan74/Token-Defense

## Live Demo

https://token-defense.vercel.app

## Gameplay Video

_(coming soon)_

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
- Factories next to their matching tower type draw conveyor connections automatically
- Adjacent towers of **different** types grant a **+20% synergy damage bonus** to each other
- Token balance is capped at 150 per type — build factories before you hit the cap

---

## Architecture

### Smart Contracts — Cairo / Dojo 1.8.0

**Models** (`models.cairo`) — keyed by EGS `token_id: felt252`:

| Model | Key(s) | Description |
|-------|--------|-------------|
| `GameState` | `token_id` | Wave number, gold, token balances, base HP, difficulty, overclock flag |
| `Tower` | `token_id`, `tower_id` | Type, position, health, level (1–3) |
| `Factory` | `token_id`, `factory_id` | Type, position, level (1–3), active flag |

**Systems:**

- `game_system` — `new_game(token_id, difficulty)`, `activate_overclock(token_id)`, EGS `score()` / `game_over()` / batch variants
- `building_system` — `place_tower`, `place_factory`, `upgrade_factory`, `upgrade_tower`
- `wave_system` — `start_wave(token_id)` runs a full per-enemy sequential simulation on-chain; emits `WaveResolved` event with enemy outcome bitmask

**Wave simulation model:**

```
For each enemy in spawn order (TJ → CO → HS → Boss):
  For each alive tower:
    tier       = cur_tokens / max_tokens  →  dmg_mult + cooldown_mult
    shots      = path_cells_covered × enemy_speed / cooldown
    damage    += shots × base_dmg × tier_mult × level_mult × (1 + synergy_bonus)
    tokens    -= shots × TOKEN_COST_PER_SHOT
  if total_damage >= enemy_hp → killed; else → base takes damage
```

Later enemies face weaker towers as tokens deplete — making factories strategically critical.

**EGS (Embeddable Game Standard):**

| Function | Returns | Formula |
|----------|---------|---------|
| `score(token_id)` | `u64` | `wave_number × 1000 + base_health` |
| `game_over(token_id)` | `bool` | `game_over \|\| victory` |
| `score_batch(token_ids)` | `Array<u64>` | batch variant for leaderboards |
| `game_over_batch(token_ids)` | `Array<bool>` | batch variant |

### Client — React + Vite + TypeScript

- **Auth:** `@starknet-react/core` + Cartridge `ControllerConnector` with session policies
- **Dojo SDK:** `@dojoengine/sdk` initialised once in `main.tsx`; Torii subscription keyed by `token_id`
- **Wave replay:** After `start_wave()` confirms on-chain, the client fetches the tx receipt, decodes the `WaveResolved` bitmask, then runs a deterministic `WaveReplay.js` animation at 60fps
- **Optimistic UI:** Tower/factory placements appear instantly; Torii confirmation clears the optimistic state
- **Conveyor system:** L-shaped pixel-art conveyors animate token flow from each factory to its nearest matching tower

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
