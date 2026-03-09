# Prophecy Roguelite

### Project Summary

**Prophecy** is the first fully on-chain prediction market roguelite — and the first game in Dojo game jam history built with Godot Engine + Dojo.

Players start with $10,000 virtual balance and swipe through Tinder-style cards — each card is a real prediction market. Swipe right for YES, left for NO, up to SKIP. You have 30 seconds per card, 10 cards per round. Correct predictions earn payouts at market odds (1.4x–3.5x). If your balance hits $0, you're liquidated — game over.

Features:
- 75 prediction markets (trivia + live predictions) loaded from hot-swappable JSON
- Streak system with 3 tiers (Hot Hand → On Fire → Oracle) and Flow State at 3+ combo
- Elite cards (card 5) and Boss cards (card 10) with forced high-stakes wagers
- Dark Pool relic shop with 3 power-ups: Leverage (3x payout), Stop Loss (refund on loss), Insider Info (reveal answer)
- Global World Boss — a shared prediction market all players bet on
- Dynamic early cash-out (50-150% of wager based on market sentiment)
- Procedural audio engine — all 12 sound types synthesized at runtime, zero external audio files
- Volumetric nebula shader with film grain and biome-based palettes
- Cinematic terminal intro with typing effect and bass drop
- Cartridge Controller integration with session key policies
- 6 Dojo models, 9 Cairo system actions, 9 integration tests (all passing)

Built solo in 48 hours for Dojo Game Jam VIII.

### Source Code

https://github.com/shariqazeem/Prophecy-Roguelite

### Live Demo

Deployed on Cartridge Slot:
- Katana RPC: `https://api.cartridge.gg/x/prophecy-roguelite/katana`
- Torii: `https://api.cartridge.gg/x/prophecy-roguelite/torii`

(Native desktop app — run from Godot 4.6 editor or exported binary)

### Gameplay Video

https://youtu.be/R2hYI4Eg_bY

### Trailer

https://x.com/shariqshkt/status/2030780305104384343

### How to Play

1. Clone the repo: `git clone https://github.com/shariqazeem/Prophecy-Roguelite.git`
2. Open the `game/` folder in **Godot 4.6.1**
3. Hit **Play** (F5) — connects automatically to Slot deployment
4. Click **START TRADING** to begin your run
5. **Swipe right** = YES, **Swipe left** = NO, **Swipe up** = SKIP
6. Choose your wager amount ($100 / $500 / $1K / ALL IN) before each swipe
7. Survive 10 cards per round — build streaks for momentum
8. Visit the **Dark Pool** shop between rounds to buy relics
9. If your balance hits $0, you're liquidated — your score hits the on-chain leaderboard

### Architecture

#### Smart Contracts (Cairo)

Built with Dojo 1.8 / Cairo 2.13:

**Models (6):**
- `Market` — market_id, yes/no odds, resolution state, outcome, totals
- `Position` — player + market_id keyed, direction, amount, settlement, payout
- `Trader` — balance (starts $10,000), total wagered/won/lost, markets played, streak
- `LeaderboardEntry` — high score (best balance), best streak, total runs
- `GameSession` — current round, cards seen, active relics
- `WorldBoss` — shared prediction market state for all players

**Systems (9 actions):**
- `create_trader` — initialize player with $10K balance
- `create_market` — admin seeds a prediction market with odds
- `place_prediction` — wager on YES/NO, auto-settles if pre-resolved
- `resolve_market` — admin resolves open markets
- `claim` — settle position and collect payout after resolution
- `cash_out` — early exit at dynamic rate (50-150% of wager)
- `buy_relic` — purchase power-up from Dark Pool shop
- `use_relic` — activate relic effect on next prediction
- `update_leaderboard` — record high score on liquidation

**Tests:** 9 integration tests, all passing (`sozo test`)

#### Client (Godot 4.6)

- Godot 4.6.1 with Dojo GDExtension (godot-dojo plugin)
- Real-time entity subscriptions via Torii gRPC
- Cartridge Controller for session key authentication
- Procedural SFX engine (12 sound types, zero audio files)
- Custom volumetric nebula shader + CRT post-processing
- 8-panel UI flow: Start → Dashboard → Swipe → RoundSummary → loop

### Twitter

@shariqshkt

### Team Members

- @shariqshkt ([GitHub](https://github.com/shariqazeem)) — Solo developer (contracts + client)
