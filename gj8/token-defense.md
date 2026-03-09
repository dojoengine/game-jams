# Token Defense

## Project Summary

**Token Defense** is a fully on-chain tower defense game built on StarkNet using the Dojo engine. Defend your AI base from waves of prompt injection attacks by placing towers and factories on a 12×8 grid.

**Features:**
- **3 tower types** — GPT (input tokens), Vision (image tokens), Code (code tokens) — up to 14 placed simultaneously; sell to free slots
- **3 factory types** — each producing a matching token type to power towers
- **10 waves** of escalating enemies: TextJailbreak, ContextOverflow, HalluSwarm, and Boss enemies on waves 5 & 10
- **Per-enemy on-chain simulation** — wave resolution runs entirely in the contract using a sequential token-drain model; later enemies face weaker towers as tokens deplete
- **Token economy** — towers consume tokens per shot; tier (Powered / Good / Low / Critical / Offline) determines fire rate and damage multiplier
- **Tower HP degradation** — surviving enemies deal HP damage to towers in range; damaged towers deal reduced damage; repairable for 30g between waves
- **Strategic mechanics** — tower synergy bonuses, factory upgrades, overclock ability, wave modifiers, per-enemy traits, difficulty tiers
- **Session resume** — each session is a Denshokan EGS ERC721 token; resume from any device via token ID or shared URL
- **Quit game** — forfeit a session on-chain at any time between waves
- **Guided tour** — 8-step in-game tutorial for new players; replayable via TOUR button

---

## Source Code

https://github.com/krishnan74/Token-Defense

## Live Demo

https://token-defense.vercel.app

## Gameplay Video

https://youtu.be/AtHeGOiQgns

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
- Token balance is capped at 150 per type — build factories before you hit the cap (UI shows "CAPPED" warning)
- You can sell towers (free) and factories (50% refund) to reposition mid-game — tower slots are limited to 14
- Check the sidebar's **SOLD** tab to review sold towers/factories; **ACTIVE** tab shows live entities with upgrade and repair options
- After each wave, the wave result card shows which towers took damage — repair them before the next hard wave

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

- `game_system` — `new_game(token_id, difficulty)`, `quit_game(token_id)`, `activate_overclock(token_id)`, EGS `score()` / `game_over()` / batch variants
- `building_system` — `place_tower`, `sell_tower`, `place_factory`, `sell_factory`, `upgrade_factory`, `upgrade_tower`, `repair_tower`
- `wave_system` — `start_wave(token_id)` runs a full per-enemy sequential simulation on-chain; emits `WaveResolved` event with enemy outcome bitmask

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
