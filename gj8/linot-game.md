# Linot

## Project Summary

**Linot** is a fully on-chain multiplayer Whot card game built on Starknet using the Dojo engine.
Players connect their Cartridge Controller wallet, register a profile, create or join a game room, and take turns playing cards until the first player empties their hand and win.
That's the basic summary but there is a lot more gameplay along with special cards you can use to leverage your win against your opponent or opponents.


Features:
- Fully on-chain game state (deck, hands, turn order, scores)
- Special card mechanics: Hold On, Pick Two, Pick Three, General Market, Wild Card (Whot)
- Cartridge Controller session-key authentication
- Real-time game updates via Torii subscriptions
- Last-card calling and challenge system for special card effects

## Source Code

https://github.com/Zodxr/linot-dojo

## Live Demo

https://linot-dojo.vercel.app

## How to Play

1. Connect with Cartridge Controller
2. Register a nickname and choose an avatar
3. From the lobby, create a game room or join an existing one with a Game ID
4. Host clicks **Start Match** once all players have joined
5. Take turns playing a card that matches the suit or value of the top discard card
6. Three minute timer for each player
7. If you have no valid card, draw from the deck - though be careful as the more cards you have, the lower your winning chance
8. Call "Last Card" when you have one card left
9. First player to empty their hand wins 

## Architecture

### Smart Contracts (Cairo)

Built with Dojo 1.8.0 on Starknet Sepolia:

**Models:**
- `GameCounter` — global auto-incrementing game ID tracker
- `GameState` — primary game state per match (status, turn, discard pile, players)
- `DeckCard` — individual cards in the shuffled deck
- `PlayerHandCard` — cards in each player's hand
- `PlayerInGame` — player position, nickname, hand size, and active status
- `PlayerLookup` — maps player address to their game slot
- `PlayerProfile` — persistent player profile (nickname, avatar)

**Systems:**
- `game_actions`: `create_game`, `join_game`, `leave_game`, `start_game`, `register_profile`
- `play_actions`: `play_card`, `draw_card`, `call_last_card`, `challenge_last_card`, `force_skip_turn`

**World Address (Sepolia):**
`0x037e23801ba89f9962b19ed4b6bd5bf135c1cec9ce6c15a4ff06c783f0d07bc9`

### Client

- Next.js + TypeScript
- Dojo SDK for blockchain integration and Torii subscriptions
- Cartridge Controller for wallet and session key management
- Deployed on Vercel

## Team Members

- @dinahmaccodes [GitHub](https://github.com/dinahmaccodes) — Full Stack Developer
- @Divine-designs — [GitHub](https://github.com/Divine-designs) ||  -Product Designer & Brand Manager

## Twitter

<!-- Add your team/project X handles here -->
- @Divine on X on [X - Divine Macaulay](https://x.com/divine_macaulay)
- Linot Dojo on X [Linot](https://x.com/LDojo82362)
- Linot Dojo on X [Linot link 2](https://x.com/linotdojogame)
