# Example: Block Quest

This is an example of a high-quality submission.
Your submission doesn't need to be this detailed, but it shows what a complete submission looks like.
Delete this preamble when creating your actual submission.

---

## Project Summary

**Block Quest** is a fully on-chain puzzle game built on Starknet using the Dojo engine.
Players arrange falling blocks to clear lines and compete on a global leaderboard.

Features:
- 12 unique block types with rotations
- Combo and streak scoring system
- Fully on-chain game state
- Global leaderboard
- Cartridge Controller authentication

## GitHub

Repository: https://github.com/example/block-quest

## Play

### Live Demo

https://block-quest.vercel.app

### How to Play

1. Connect with Cartridge Controller
2. Click "New Game"
3. Drag blocks onto the grid
4. Clear lines to score points
5. Build combos for bonus points

### Local Setup (optional)

```bash
git clone https://github.com/example/block-quest
cd block-quest
pnpm install
pnpm dev
```

## Architecture

### Smart Contracts (Cairo)

Built with Dojo 1.7.x:

**Models:**
- `Player` - stores player ID and stats
- `Game` - manages grid state, score, current pieces

**Systems:**
- `spawn()` - create new player
- `create()` - start new game
- `place(game_id, piece_index, position)` - place a piece

### Client

- React + TypeScript
- Dojo SDK for blockchain integration
- Cartridge Controller for wallet

## Team Members

- @alice ([GitHub](https://github.com/alice)) - Contracts
- @bob ([GitHub](https://github.com/bob)) - Frontend

## Twitter

@BlockQuestGame
