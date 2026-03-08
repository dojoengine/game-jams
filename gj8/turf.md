# Turf

---

## Project Summary

**Turf** is a full-featured Monopoly game on Starknet using the Dojo engine. Play locally against 3-tier AI opponents, go online in real-time multiplayer rooms, compete in tournaments — with every single game action (dice rolls, property purchases, rent payments, trades, builds, jail events) recorded permanently on-chain.

Features:

- Complete 40-space Monopoly board with all official rules
- 2-6 players with any mix of humans and AI
- 3 AI difficulty levels with multi-evaluator decision system (PropertyEvaluator, TradeEvaluator, ThreatEvaluator, BoardPositionEval)
- Real-time online multiplayer via Socket.IO with room codes
- Swiss-system tournament brackets with ELO-based seeding
- Property trading, auctions, house/hotel building, mortgaging
- 32 on-chain achievements
- ELO rating system (K=32) with 7 skill tiers (Bronze to Grandmaster)
- Daily reward streak system
- Referral system with unique codes
- On-chain profile, leaderboard, and achievement screens reading live contract data
- 33+ contract functions, 32 event types — every action fires an immediate transaction
- Cartridge Controller for wallet
- PWA — installable on mobile and desktop

## Source Code

https://github.com/Shyaar/turf.git

## Live Demo

https://turf-olive.vercel.app

## Gameplay Video

https://drive.google.com/file/d/160hO2rPzAhPgcKfGXNViXLV4ZEFb3O5A/view?usp=sharing

## How to Play

1. Connect with Cartridge Controller
2. Set up a game: choose 2-6 players, assign pieces, configure AI difficulty
3. Roll dice to move around the board — buy unowned properties or send them to auction
4. Collect rent when opponents land on your properties
5. Build houses and hotels on complete color groups to increase rent
6. Trade properties and money with other players
7. Avoid bankruptcy — last player standing wins
8. Check your profile for on-chain stats, claim daily rewards, and climb the leaderboard

## Architecture

### Smart Contracts (Cairo)

Built with Dojo 1.8:

**Models:**

- `Player` — wallet address, username, referral code, ELO rating, wins, losses, games played, lifetime rent stats, properties bought, trades completed, auctions won
- `Game` — game ID, player count, current turn, status, mode, difficulty, houses/hotels available, winner, timestamps
- `GamePlayer` — per-player-per-game state: piece, money, position, properties, jail status, bankruptcy, doubles count
- `PropertyState` — per-game property ownership, house count (0-4, 5=hotel), mortgage status
- `GameResult` — final per-player result: win/loss, final money, properties, buildings, turns survived
- `Achievement` — 32 achievement definitions with unlock status
- `DailyStreak` — last claim time, streak count, total claims, total bonus
- `PlayerSettings` — sound volume, music toggle, preferred piece

**Systems (33+ functions):**

- Player management: `register_player`, `apply_referral`, `save_settings`, `claim_daily_reward`
- Game lifecycle: `create_game`, `join_game`, `start_game`
- Turn flow: `roll_dice`, `buy_property`, `skip_property`, `pay_rent`, `draw_card`, `process_card`, `end_turn`, `pass_go`
- Property: `build_house`, `sell_house`, `build_hotel`, `sell_hotel`, `mortgage_property`, `unmortgage_property`
- Trading & auctions: `execute_trade`, `place_bid`, `win_auction`
- Jail: `go_to_jail`, `pay_jail_fine`, `use_jail_card`, `escape_jail_doubles`, `forced_jail_exit`
- End: `pay_tax`, `declare_bankrupt`, `end_game`

32 event types emitted for indexing (DiceRolled, PropertyPurchased, RentPaid, HouseBuilt, TradeCompleted, etc.)

### Client

- React 19 + TypeScript 5.9 + Vite 7
- Framer Motion 12 for animations
- 10 screens, 11 modals, 5 overlay components, 14 custom hooks
- Dojo SDK for blockchain integration
- Cartridge Controller for wallet / account abstraction
- Tailwind CSS 4 for UI
- Lucide React for icons
- PWA with service worker caching

### Server

- Node.js + Express + Socket.IO
- Full authoritative game engine mirrored from frontend (15 engine files)
- Server-side AI system mirrored from frontend (8 AI files, 3 difficulty strategies)
- Room management with turn timer (120s) and disconnect grace period (60s)
- Reconnection support

## Team Members

- @Shyaar ([GitHub](https://github.com/Shyaar))

## Twitter

@shyaar_xati