# Witchcraft
**Submission Track**  
Full Game

## Project Summary

Witchcraft is a blockchain-first survival and resource management game where players explore mystical biomes, gather ingredients, brew potions, and defend against hostile NPCs. Built on Starknet using Dojo smart contracts, the game features a complete day/night cycle, dynamic combat system, and an economy driven by brewing and selling potions.

The game uses a fully onchain architecture with Dojo handling all game logic — player spawning, movement, foraging, brewing, combat, and trading. The frontend is built with React and provides an immersive 2D exploration experience with animated NPCs, dynamic backgrounds, and real-time combat mechanics.

During the day, players explore six distinct biomes (Forest, Graveyard, Swamp, Cursed Village, Ruins, and Mountain Pass) to collect ingredients needed for brewing. Each biome is guarded by hostile NPCs that will chase and attack players who venture too close. Combat is real-time — players can fight back by left-clicking NPCs within range, restoring health on each kill.

At night, players return to the shop to sell potions to customer orders, earning gold and reputation with different factions. The game features progressive recipe unlocking, where new ingredients and potions become available as the game day advances.

Built with Dojo's entity-component-system architecture, all game state is stored onchain, ensuring provable gameplay and allowing for future multiplayer features. The project demonstrates how complex game mechanics can be implemented fully onchain while maintaining smooth, responsive gameplay.

##DemoVideo
https://drive.google.com/file/d/1ZSpFxMKiPKTqp2P5k09DwYTuYMvSgbuv/view?usp=sharing

## GitHub
https://github.com/krishnan74/witchcraft
(Repo registered with OnlyDust)

## Play
👉 Live Demo (no setup required):  
http://witchcraft-eight.vercel.app/

## Chain Info
**World Address:** `0x03103d4eff4379fd9038e9a801f6a9f7c1a125b472dd88df6151003f6975fa78`  
**RPC (Local Dev):** `http://localhost:5050/`  
**RPC (Sepolia):** `https://api.cartridge.gg/x/starknet/sepolia`  
**Torii (Local Dev):** `http://localhost:8080/`

## Twitter
https://x.com/technicalc83071

## Team Members

DivyaKrishnan

- GitHub: @krishnan74
- Discord: @krish74
- Twitter: @divyakrishnan_r

Adaikal Susan Beschi

- GitHub: @technicalclipper
- Discord: @technicalclipper_
- Twitter: @technicalc83071



## Features

### Core Gameplay
- **Exploration**: Navigate through six unique biomes to gather rare ingredients
- **Combat System**: Real-time combat with NPCs that chase and attack players
- **Brewing System**: Craft potions using collected ingredients following daily recipes
- **Day/Night Cycle**: Dynamic time system that affects gameplay and shop availability
- **Economy**: Sell potions to customers during night hours to earn gold
- **Progressive Unlocking**: New recipes and ingredients unlock as game days advance

### Technical Features
- **Fully Onchain Logic**: All game mechanics stored and executed on Starknet via Dojo
- **Real-time Updates**: Synchronized game state between frontend and blockchain
- **Animated NPCs**: Sprite-based animations for enemies and player character
- **Dynamic Backgrounds**: Day and night background transitions
- **Health System**: Player health that decreases from NPC attacks, restores on kills

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Rust and Cargo (for Dojo contracts)
- asdf version manager (recommended for Dojo tooling)

### Installation

1. **Clone the repository:**
   ```bash
   git clone [your-repo-url]
   cd witchcraft
   ```

2. **Install asdf (if not already installed):**
   ```bash
   git clone https://github.com/asdf-vm/asdf.git ~/.asdf --branch v0.14.0
   echo '. $HOME/.asdf/asdf.sh' >> ~/.bashrc
   echo '. $HOME/.asdf/completions/asdf.bash' >> ~/.bashrc
   source ~/.bashrc
   ```

3. **Add Dojo plugins to asdf:**
   ```bash
   cd contracts
   asdf plugin add scarb https://github.com/software-mansion-labs/asdf-scarb.git
   asdf plugin add sozo https://github.com/dojoengine/asdf-sozo.git
   asdf plugin add katana https://github.com/dojoengine/asdf-katana.git
   asdf plugin add torii https://github.com/dojoengine/asdf-torii.git
   asdf install
   ```

4. **Install frontend dependencies:**
   ```bash
   cd client
   npm install
   ```

### Running the Game

#### Option 1: Using the Development Script (Recommended)

1. **Start the Dojo development environment:**
   ```bash
   cd contracts
   ./dev.sh
   ```
   This script will:
   - Install required tools via asdf
   - Start Katana (local Starknet node)
   - Build and migrate contracts
   - Start Torii (indexer)
   - Display world address and service URLs

2. **In a new terminal, start the frontend:**
   ```bash
   cd client
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:5173` (or the port shown in the terminal)

#### Option 2: Manual Setup

1. **Start Katana:**
   ```bash
   cd contracts
   katana --config katana.toml
   ```

2. **Build and migrate contracts:**
   ```bash
   sozo build
   sozo migrate --profile dev
   ```

3. **Start Torii:**
   ```bash
   torii --world [WORLD_ADDRESS] --rpc http://localhost:5050 --http.cors_origins "*"
   ```

4. **Start the frontend:**
   ```bash
   cd client
   npm run dev
   ```

### Game Controls

- **WASD / Arrow Keys**: Move player
- **Left Click**: Attack/kill NPCs (must be within range)
- **E**: Interact with buildings (Shop, Cauldron, Recipe Book)
- **I**: Open inventory

## Project Structure

```
witchcraft/
├── contracts/          # Dojo smart contracts
│   ├── src/           # System implementations
│   ├── Scarb.toml     # Cairo/Scarb configuration
│   ├── dojo_dev.toml  # Development environment config
│   └── dev.sh         # Development setup script
├── client/            # React frontend
│   ├── src/
│   │   ├── scenes/    # Game scenes (Exploration, Shop)
│   │   ├── engine/    # Game engine components
│   │   ├── hooks/     # React hooks (useDojo)
│   │   └── components/ # UI components
│   └── public/
│       └── sprites/   # Game assets
└── witchcraft.md      # This file
```

## Systems Implemented

### Dojo Systems
- `wc-spawn_system`: Player spawning
- `wc-movement_system`: Player movement
- `wc-forage_system`: Ingredient collection
- `wc-brewing_system`: Potion creation
- `wc-combat_system`: NPC combat
- `wc-sell_system`: Shop transactions
- `wc-faction_system`: Faction reputation
- `wc-progression_system`: Day advancement and unlocks
- `wc-economy_system`: Gold and trading
- `wc-zone_system`: Biome management
- `wc-resource_regeneration_system`: Resource respawning

## Development Notes

- The game uses Dojo's namespace system (`wc`) for contract organization
- Local development uses Katana (local Starknet node)
- Production deployments use Starknet Sepolia testnet
- World address and RPC URLs are configured in `client/src/dojoConfig.ts`
- Manifest file is automatically generated and loaded from `contracts/manifest_dev.json`

## Future Enhancements

- Multiplayer support
- More potion recipes and ingredients
- Expanded faction system
- Leaderboards and achievements
- NFT integration for rare ingredients/potions

