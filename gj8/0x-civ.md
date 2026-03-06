# 0xCIV

## Project Summary

**0xCIV** is a fully on-chain prompt strategy game where players command AI civilizations using natural language. Write a strategy prompt, and your AI agent (Claude) reads on-chain state via Torii and autonomously executes actions — gather, attack, defend, or trade.

Same game state + different prompt = different outcome. **The game IS prompt engineering.**

Features:
- 4 AI civilizations competing on a 5×5 grid
- Natural language strategy prompts (Aggro/Turtle/Econ/Chaos presets)
- All game logic verified on-chain (Cairo/Dojo)
- Multi-agent mode (4 simultaneous AI players)
- Cyberpunk UI with real-time event log
- 12 passing Cairo tests

**Theme fit**: Instead of fighting bots, players *design around them*. The AI agents ARE the game — you write prompts that shape their behavior. Bots aren't opponents; they're the medium through which you play.

## Source Code

https://github.com/r0ze998/0xciv

## Live Demo

https://api.cartridge.gg/x/0xciv/katana (Katana RPC)
https://api.cartridge.gg/x/0xciv/torii/graphql (Torii GraphQL)

## Gameplay Video

> Screenshot available in repo: [assets/demo-screenshot.png](https://github.com/r0ze998/0xciv/blob/main/assets/demo-screenshot.png)

## How to Play

1. Connect wallet via Cartridge Controller
2. Write a strategy prompt: *"Gather food aggressively. Attack the weakest. Keep food above 50."*
3. Press "Next Turn" — your AI reads on-chain state and executes one action
4. Opponent prompts are hidden — it's information warfare
5. Survive! Last civilization standing wins (HP=0, Food=0, or no territories = eliminated)

**Keyboard shortcuts**: N = next turn, 1-4 = select civilization

## Architecture

### Smart Contracts (Cairo)

Built with Dojo Engine:

**Models:**
- `Civilization` — HP, resources (food/metal/knowledge), territories, alive status
- `Territory` — grid position, owner, resource type
- `GameState` — turn counter, game phase, player count
- `Trade` — pending trade proposals between civilizations

**Systems:**
- `create_game()` — initialize a new game world
- `spawn_civilization()` — join a game (auto-starts at 2+ players)
- `gather(game_id, civ_id)` — collect resources from territories
- `attack(game_id, attacker, target)` — damage target + steal territory
- `defend(game_id, civ_id)` — restore HP
- `propose_trade(game_id, from, to, ...)` — offer resource exchange
- `accept_trade(game_id, trade_id)` — execute trade
- `advance_turn(game_id)` — progress the game clock

### Frontend (React)

- `@dojoengine/sdk` for Torii GraphQL integration
- `@cartridge/controller` + `@cartridge/connector` for wallet
- Tailwind CSS with cyberpunk theme (neon borders, scanline effects)
- Web Audio API synthesized sound effects

### AI Agent (Node.js)

- Reads game state from Torii GraphQL
- Sends state + player prompt to Claude API
- Claude decides optimal action based on prompt strategy
- Executes action on-chain via starknet.js
- Multi-turn auto-execution with retry and graceful shutdown

## Twitter

[@r0ze_____](https://x.com/r0ze_____)

## Team Members

- **r0ze** — Game Design, Direction, Architecture
- **neo** (AI agent, OpenClaw) — Full-stack Engineering
