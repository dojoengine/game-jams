# Prophecy Roguelite

### Project Summary

**Prophecy** is the first fully on-chain prediction market roguelite. Players start with $10,000 virtual balance and swipe through Tinder-style cards — each card is a real prediction market. Swipe right for YES, left for NO, up to SKIP. You have 30 seconds per card, 10 cards per round. Correct predictions earn payouts at market odds (1.4x–3.5x). If your balance hits $0, you're liquidated — game over.

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
- Cartridge Controller session keys for popup-free rapid-fire gameplay
- 6 Dojo models, 9 Cairo system actions, 9 integration tests (all passing)

Built solo in 48 hours for Dojo Game Jam VIII.

### Source Code

https://github.com/shariqazeem/Prophecy-Roguelite

### Live Demo

Deployed on Cartridge Slot:
- Katana RPC: `https://api.cartridge.gg/x/prophecy-roguelite/katana`
- Torii: `https://api.cartridge.gg/x/prophecy-roguelite/torii`

(Native desktop app — run from Godot editor or export binary)

### Gameplay Video



### How to Play

1. Launch the game in Godot 4.6 editor (or run the exported binary)
2. Connect via Cartridge Controller (one-time popup, then session keys handle the rest)
3. Click **START TRADING** to begin your run
4. **Swipe right** = YES, **Swipe left** = NO, **Swipe up** = SKIP
5. Choose your wager amount ($100 / $500 / $1K / ALL IN) before each swipe
6. Survive 10 cards per round — build streaks for momentum
7. Visit the **Dark Pool** shop between rounds to buy relics
8. If your balance hits $0, you're liquidated — your score hits the on-chain leaderboard
9. Hidden admin panel: **Ctrl+Shift+O** to resolve live markets in real-time (demo tool)

### Twitter

@shariqazeem

### Team Members

- @shariqazeem ([GitHub](https://github.com/shariqazeem)) — Solo developer (contracts + client)
