# Hex'd

## Project Summary

**Hex'd** is a fully onchain asynchronous battle royale with fog of war, built with Cairo and Dojo on Starknet.

Players navigate a 21x21 hexagonal grid shrouded in darkness. Every step to an empty tile triggers a random encounter — a gift that strengthens you or a curse that may kill you. Walk into another player's tile and combat resolves automatically based on XP. You can ambush offline players, and every decision is a gamble between exploration and survival.

All game logic, state, and randomness live fully onchain. The frontend is a playable 3D experience built with React and Three.js.

**Jam scope — Embeddable Game Standard (EGS) integration:**

Hex'd existed before Game Jam VIII. The scope of this submission is the implementation of the [Embeddable Game Standard](https://github.com/FemiOje/hexed/tree/embeddable), which turns every game session into a portable, discoverable ERC-721 token on Starknet. This involved:

- **`game_token_systems` contract** — Mints an ERC-721 token per game session via the EGS `MinigameComponent`. Each token carries live game state (HP, XP, position, alive/dead) readable by any EGS-compatible platform.
- **Token ownership verification** — `spawn()` and `move()` now verify the caller owns the corresponding game token before executing, using EGS `assert_token_ownership()` and `pre_action()`/`post_action()` hooks.
- **Renderer contract** — Implements `IMinigameDetails` to surface game details (HP, XP, status) for display on external platforms like [Fun Factory](https://funfactory.gg).
- **Frontend token discovery** — The `MyGames` component uses the Denshokan SDK (`useTokens()`) to discover all EGS tokens owned by the player, enriched with live game state from the contract. Players can browse active runs, view fallen characters, spawn minted-but-unspawned tokens, and view their tokens on external portfolio pages.
- **Automatic score registration** — When a player dies, the contract auto-registers their score to the onchain leaderboard if it's a new record.

The full diff is on the [`embeddable` branch](https://github.com/FemiOje/hexed/tree/embeddable).

## Source Code

https://github.com/FemiOje/hexed

EGS implementation branch: https://github.com/FemiOje/hexed/tree/embeddable

## Live Demo

https://hexed-silk.vercel.app/

## Gameplay Video

https://youtu.be/cZOFKLjaeSw

## How to Play

1. **Connect** — Hit "Play" and connect with Cartridge Controller.
2. **Mint** — Mint a game token. Each session is an NFT.
3. **Spawn** — You land on a random hex tile with 100 HP and 0 XP. The fog reveals whether your six neighboring tiles are occupied.
4. **Move** — Pick a direction. Every move has consequences:
   - **Empty tile?** A random encounter fires — heal, empower, bless, poison, drain, or hex. 50/50 gift vs. curse, determined by onchain Poseidon hash.
   - **Occupied tile?** Combat. Higher XP wins. Ties favor the attacker. Loser takes damage and gets knocked back. HP hits zero = game over.
5. **Survive** — Climb the leaderboard by stacking XP through encounters and kills. Death is permanent, but you can always mint a new token and go again.
6. **View your tokens** — Check "My Games" to see all your sessions. Active, dead, or unspawned — they're all in your wallet and visible on any EGS-compatible platform.

## Twitter

[@0xjinius](https://x.com/0xjinius)

## Team Members

- **FemiOje** ([GitHub](https://github.com/FemiOje)) — Solo developer (contracts, frontend, game design)
