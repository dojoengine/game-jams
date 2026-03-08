# Tycoon

## Project Summary

**Tycoon** is a Monopoly-style strategy game on StarkNet, built with the Dojo engine and Cairo. Play on-chain with friends in multiplayer rooms, challenge AI opponents, or play as a guest. Own properties, build houses, and win the pot on a 3D board rendered with React Three Fiber.

**Features:**
- **On-chain gameplay** — Registration, game creation, joining, moves, perks via Dojo on Starknet (Sepolia)
- **3D board** — Interactive Monopoly-style board with property tooltips and owner badges
- **Multiplayer & AI** — Play with friends in rooms (public/private) or challenge AI opponents (1–7 bots)
- **Guest mode** — Play without a wallet; progress stored on backend
- **Perk shop** — Purchase perks and collectibles (USDC, TYC, or NGN via Flutterwave); vouchers redeemable on-chain
- **EGS compatible** — implements `IMinigameTokenData` (score, game_over + batch variants); game results keyed by `game_id` for Denshokan leaderboard integration
- **Cartridge Controller** authentication with optional session keys for gasless UX
- **Room codes** — Private games use `CodeToGame` lookup; join via code or link
- **Stake & payouts** — House 5%; rank payouts 50/30/20%; vouchers and collectibles on win/exit

---

## Source Code

https://github.com/aji70/Tyc

## Live Demo

https://tyc-five.vercel.app/

## Gameplay Video
https://www.youtube.com/watch?v=T6Jp43Bw_os


---

## Contract Addresses (Starknet Sepolia)

| Contract      | Address |
|---------------|---------|
| **Dojo World** | `0x41167a2e9f249d46e52079a9eee47f75389801dd7e06fe933e275fde8fe742b` |
| **tycoon-game** | `0x5a31a881755ac573ede94e35d6c16e72d3892745d2600f352b5e956fde817f` |
| **tycoon-player** | `0x29dff7a557a1179b8c2ae9e79d82b4eeadb2d007011310e0b7b03327b074bbf` |
| **tycoon-reward** | `0x1de57e19e93759eb4f183dfa732d85a6974dd70fede81ff6cfe7aa5f46cb85f` |
| **tycoon-token** | `0x4097e6b0de5527a59f8d27c6fc5175186f895f4470807799db3635b369a8a4d` |
| **EGS Adapter** | Deployed separately; set via `set_egs_adapter` and `NEXT_PUBLIC_EGS_ADAPTER_ADDRESS` (see `tycoon_contract/EGS_DEPLOY.md`) |

---

## How to Play

1. Connect your **Cartridge Controller** wallet (or use **guest mode**)
2. Register with a username (required for on-chain play)
3. **Create** or **join** a game:
   - Choose **Public** or **Private**; set number of players (2–8), starting balance, optional stake
   - For private games, share the room code or invite link
4. When the lobby is full, the game **starts automatically** — no separate start step
5. Take turns: roll dice, move, buy/auction properties, build houses, pay rent
6. **Exit** voluntarily (rank-based payout) or **survive** until opponents exit — last player standing wins
7. **AI mode** — Create an AI game, play solo vs bots; call `end_ai_game` when done (win/loss determines voucher/collectible)

**Tips:**
- Place properties strategically to maximize rent; upgrade with houses
- Auction when you can't or don't want to buy — others bid
- Perk shop: buy vouchers (redeem for TYC), collectibles (burn for perks like ExtraTurn, JailFree)
- EGS **Tracked** (blue) during game → **Verified** (green) with score when game ends on-chain

---

## Architecture

### Smart Contracts — Cairo / Dojo 1.8.0

**Models** (keyed by game or config):

| Model | Key(s) | Description |
|-------|--------|-------------|
| `Game` | `id` | Status, creator, winner, players, stake, timestamps |
| `GameSettings` | `game_id` | Max players, starting cash, auction, rent_in_prison, mortgage, even_build, room code |
| `CodeToGame` | `code` | Room code → game_id lookup |
| `GamePlayer` | `game_id`, `player_address` | Balance, position, order, symbol, username |
| `GameOrderToPlayer` | `game_id`, `order` | Order → player address |
| `User` | `username` | Player stats, address |
| `GameConfig` | singleton | Min stake, stake token, reward contract, EGS adapter |

**Systems:**

- `game_system` — `create_game`, `join_game`, `leave_pending_game`, `exit_game`, `create_ai_game`, `end_ai_game`; `init_game_config`, `set_egs_adapter`; EGS `record_result` on game end
- `player_system` — `register_player`, username/address mapping
- `reward_system` — Vouchers, collectibles, shop (mint, redeem, buy, burn for perks)
- `token_system` — TYC token (ERC20-like)

**EGS flow:** On `exit_game` (last player) or `end_ai_game`, the game system calls `record_result(game_id, score)` on the EGS adapter. Multiplayer: score = 1 for winner. AI: score = 1 (win) or 0 (loss).

**EGS (Embeddable Game Standard):**

| Function | Returns | Notes |
|----------|---------|-------|
| `score(token_id)` | `u64` | 1 = win, 0 = loss (AI); 1 for winner (multiplayer) |
| `game_over(token_id)` | `bool` | true when game ended and result recorded |
| `score_batch(token_ids)` | `Array<u64>` | batch variant for leaderboards |
| `game_over_batch(token_ids)` | `Array<bool>` | batch variant |

Adapter: `tycoon_TycoonEGS` — standalone contract; game contract is `authorized_caller`. See `tycoon_contract/EGS_DEPLOY.md`.

### Client — Next.js 15 + React + React Three Fiber

- **Auth:** `@starknet-react/core` + Cartridge `ControllerConnector` (session keys optional)
- **Dojo SDK:** `@dojoengine/sdk` + Torii client for live game state
- **3D board:** React Three Fiber + drei; property tooltips, owner badges
- **Backend:** Node/Express (guest games, shop, Socket.IO)
- **EGS badges:** EGS Tracked (blue) while in progress; EGS Verified (green) with score when finalized

### Toolchain

| Tool | Version |
|------|---------|
| Dojo | 1.8.0 |
| Cairo / Scarb | 2.13.x / edition 2024_07 |
| Starknet | 2.13.1 |
| Next.js | 15 |
| React | 18 |
| TypeScript | 5 |

### Tests

Cairo unit tests in `tycoon_contract/src/` covering game type parsing, player symbols, integration flows.

---

## Team Members

(https://github.com/aji70)

## Twitter

(https://x.com/ajidokwu)
