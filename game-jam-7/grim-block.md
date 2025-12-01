# Grim Block

## Project Summary

**Grim Block** is a fully on-chain Block Blast-style puzzle game built on Starknet using the Dojo engine. Players place tetris-like pieces on an 8x8 grid to clear lines and score points. Every game action, piece generation, and state change is recorded on the blockchain, ensuring complete transparency and verifiability.

The game features:

- 🎮 **19 unique piece types** with 4 orientations each
- 🎯 **Strategic gameplay** with combo and streak systems
- ⛓️ **Fully on-chain** - all game logic runs on Starknet
- 🏆 **Global leaderboard** tracking all player scores
- 🎨 **Modern UI** with smooth animations and drag-and-drop controls
- 🎰 **Synchronized blockchain state** with countdown and loading animations

## GitHub

Repository: [https://github.com/bal7hazar/grimblock](https://github.com/bal7hazar/grimblock)

This repository is registered with [OnlyDust](https://app.onlydust.com) for awards distribution.

## Play

### Live Demo

- **Production**: `https://grimblock-client.vercel.app/`
- **Development**: `http://localhost:1337` (after setup)

### How to Play

1. **Connect your wallet** using Cartridge Controller
2. **Spawn a player** by clicking "Spawn Player" button
3. **Create a game** by clicking "New Game"
4. **Wait for countdown** (5 seconds) while the blockchain synchronizes
5. **Drag and drop pieces** from the bottom onto the 8x8 grid
6. **Clear lines** by filling complete rows or columns
7. **Build combos** by clearing multiple lines in succession
8. **Score points** and compete on the global leaderboard!

### Game Rules

- You receive **3 random pieces** at the start of each game
- Place pieces on the grid to fill rows or columns
- **Clearing lines** removes them and awards points
- **Combos** multiply your score when clearing multiple lines consecutively
- **Game over** when no more pieces can be placed
- All game state is stored on-chain and verifiable

## Architecture

### Smart Contracts (Cairo)

Built with **Dojo 1.7.2** and **Cairo 2.13.1**, the contracts handle all game logic:

#### Core Models

**`Player`** (`contracts/src/models/player.cairo`)

- Stores player ID and name
- Links wallet address to player profile

**`Game`** (`contracts/src/models/game.cairo`)

- Manages game state: grid, pieces, score, combo, streak
- Uses efficient bit-packing for grid storage (64-bit)
- Packs up to 3 pieces in a single u32

#### Game Types

**`Piece`** (`contracts/src/types/piece.cairo`)

- 19 piece types: Domino, Hero, Smashboy, Tallboy, Corner, Cross, Elbows, Guns, Hats, Hooks, Longboy, Pyramid, Tees
- Each piece has a unique bitmap, size, and score value
- Defined in `contracts/src/elements/pieces/*.cairo`

**`Orientation`** (`contracts/src/types/orientation.cairo`)

- North, East, South, West (0°, 90°, 180°, 270° rotations)

**`Grid`** (`contracts/src/types/grid.cairo`)

- 8x8 grid represented as a 64-bit integer
- Efficient bit manipulation for cell operations
- Line clearing logic for rows and columns

#### Systems

**`Play`** (`contracts/src/systems/play.cairo`)

- `spawn(player_name)`: Create a new player
- `rename(player_name)`: Update player name
- `create()`: Start a new game with 3 random pieces
- `place(game_id, piece_index, grid_index)`: Place a piece on the grid

#### Components

**`PlayableComponent`** (`contracts/src/components/playable.cairo`)

- Core game logic implementation
- Random piece generation using on-chain RNG
- Grid validation and line clearing
- Score calculation with combo/streak multipliers

### Client (React + TypeScript)

Modern web application built with:

- **React 19** with TypeScript
- **Vite** for fast development
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Dojo SDK 1.8.2** for blockchain integration
- **Cartridge Controller** for wallet connection

#### Key Features

**`GameBoard`** (`client/src/game/components/GameBoard.tsx`)

- Main game interface
- Drag-and-drop piece placement
- Optimistic UI updates with blockchain sync
- Real-time score tracking

**`Grid`** (`client/src/game/components/Grid.tsx`)

- 8x8 interactive grid
- Visual feedback for valid/invalid placements
- Smooth color transitions for line clears

**`CountdownOverlay`** (`client/src/game/components/CountdownOverlay.tsx`)

- 5-second countdown when starting new games
- Prevents race conditions during blockchain sync
- Dynamic messages for each second

**`ComboPopup`** (`client/src/game/components/ComboPopup.tsx`)

- Animated score popups for combos
- 3-second floating animation
- Shows multiplier and bonus points

**`LeaderboardModal`** (`client/src/components/LeaderboardModal.tsx`)

- Paginated leaderboard (8 games per page)
- Global rankings with player names and scores
- Gold/Silver/Bronze medals for top 3

#### State Management

**`useEntities`** (`client/src/contexts/entities.tsx`)

- Subscribes to Torii indexer for real-time updates
- Manages games and players state
- Provides helper functions (getPlayerById, etc.)

**Custom Hooks**

- `useSpawn`: Player creation
- `useCreate`: Game initialization
- `usePlace`: Piece placement
- `useExecuteCall`: Generic transaction handler

## Development Setup

### Prerequisites

- **Node.js** 18+ and **pnpm** 9.15.0+
- **Rust** and **Cargo** (for Dojo)
- **Dojo CLI** 1.7.2
- **Scarb** 2.13.1

### Installation

```bash
# Clone the repository
git clone https://github.com/bal7hazar/grimblock.git
cd grimblock

# Install dependencies
pnpm install

# Install Dojo (if not already installed)
curl -L https://install.dojoengine.org | bash
dojoup -v 1.7.2

# Install Scarb
asdf install scarb 2.13.1
```

### Running Locally

#### 1. Start Katana (Local Starknet Node)

```bash
cd contracts
katana --dev --dev.no-fee
```

#### 2. Build and Deploy Contracts

```bash
# In a new terminal
cd contracts
sozo build
sozo migrate apply
```

#### 3. Start Torii (Indexer)

```bash
torii --world <WORLD_ADDRESS> --contracts <PLAY_CONTRACT_ADDRESS>
```

#### 4. Start Client

```bash
# In a new terminal, from project root
pnpm dev
```

The client will be available at `http://localhost:1337`

### Project Structure

```
grimblock/
├── contracts/               # Cairo smart contracts
│   ├── src/
│   │   ├── components/     # Dojo components
│   │   ├── elements/       # Piece definitions
│   │   ├── models/         # Game and Player models
│   │   ├── systems/        # Game systems (Play)
│   │   └── types/          # Custom types (Piece, Grid, Orientation)
│   └── Scarb.toml
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── contexts/       # React contexts
│   │   ├── game/           # Game-specific components
│   │   ├── hooks/          # Custom hooks
│   │   ├── models/         # TypeScript models
│   │   ├── pages/          # Route pages
│   │   └── types/          # TypeScript types
│   └── package.json
├── docs/                   # Documentation
├── turbo.json             # Turbo configuration
└── pnpm-workspace.yaml    # pnpm workspace config
```

### Scripts

From project root (using Turbo):

```bash
pnpm dev      # Start development server
pnpm build    # Build for production
pnpm lint     # Run linter
pnpm format   # Format code
pnpm test     # Run tests
```

From `client/` directory:

```bash
pnpm dev      # Start on port 1337
pnpm prod     # Production mode on port 13337
pnpm build    # Build TypeScript + Vite
```

## Technical Highlights

### On-Chain Randomness

Pieces are generated using Starknet's block hash as a seed:

```cairo
let seed: felt252 = starknet::get_tx_info().unbox().transaction_hash.into();
```

### Efficient Storage

- **Grid**: 8x8 = 64 cells stored in a single `u64`
- **Pieces**: Up to 3 pieces (type + orientation) packed in one `u32`
- **Bit manipulation** for fast cell operations

### Optimistic UI

1. User places piece → immediate visual feedback
2. Piece appears in color on grid
3. After 200ms → transitions to gray
4. Blockchain confirms → syncs final state
5. Lines cleared optimistically → combo popup appears

### Synchronization Guards

- **5-second countdown** on new game creation
- **Piece blocking** during blockchain sync
- **Loading overlays** during transaction confirmation
- **Score = 0 detection** to skip countdown on page reload

## Team Members

- **bal7hazar** ([GitHub](https://github.com/bal7hazar)) - Lead Developer

## Submission Tracks

- 🎮 **Game Development**
- ⛓️ **On-Chain Gaming**
- 🏗️ **Dojo Engine**
- 🎨 **UI/UX Excellence**

## License

This project is open source and available under the MIT License.

## Links

- **Repository**: https://github.com/bal7hazar/grimblock
- **Dojo Engine**: https://dojoengine.org
- **Starknet**: https://starknet.io
- **OnlyDust**: https://app.onlydust.com

---

Built with ❤️ using Dojo and Starknet
