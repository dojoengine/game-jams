# ParQuiz

## Project Summary

**ParQuiz** is a multiplayer Parchis-style trivia game built with Dojo on Starknet. The competitive game loop is on-chain: reusable rule configs, public matchmaking, private room-code lobbies, VRF-backed dice, question verification, movement validation, captures, bridges, bonuses, winner settlement, and player progression/customization all flow through the contracts.

Technical highlights:
- Config-driven matches with on-chain `GameConfig` presets and runtime snapshots.
- Public matchmaking grouped by `config_id`, plus host-controlled private lobbies by room code.
- VRF-backed dice rolls, on-chain question set verification, and contract-enforced movement/capture rules.
- Fully on-chain profile + customization flow: coins, XP, levels, owned cosmetics, and equipped avatar/dice/token/board loadouts.
- Embeddable Game Standard support for token binding plus score/settings queries.

There is also an off-chain `Practice with AI` mode for solo play, but the main multiplayer experience is contract-authoritative.

## Source Code

https://github.com/Ritx10/Parquiz

## Live Demo

https://parquiz.vercel.app

## Gameplay Video

[Parquiz Gameplay](https://youtu.be/Z6rgHc-X_Tc)

## How to Play

1. Connect with Cartridge Controller.
2. Create/select an on-chain rules config, then join public matchmaking or create a private lobby.
3. Ready up, start the match, and roll for a VRF-backed trivia turn.
4. Answer correctly to unlock movement, race tokens home, capture opponents, and be the first to finish all 4 tokens.

## Architecture

- **Contracts:** Cairo + Dojo systems for configs, lobbies, turns, customization/profile progression, and EGS bindings.
- **Client:** React + TypeScript + Bun frontend using Dojo SDK, Torii subscriptions, and Cartridge Controller.
- **Deployment:** live web client at `parquiz.vercel.app`, with Slot/Sepolia-oriented Dojo deployment flow in the repo.

## Twitter

https://x.com/bitfalt

## Team Members

- @Ritx10 ([GitHub](https://github.com/Ritx10))
- @bitfalt ([GitHub](https://github.com/bitfalt))
