# Scar'd

### Submission Track
> Indicate which track your project is submitting to.

Full Game

### Project Summary
> Give a short summary of your game project.

**Scar'd** (pronounced "scared") is a fully on-chain roguelike dungeon crawler built on Starknet using the Dojo engine. Navigate through a haunted 5x5 grid from (0,0) to (4,4), battling vampires and werewolves while collecting mysterious gifts that enhance your abilities. Every move, every encounter, and every decision is provably fair and verifiable on-chain.

What makes Scar'd unique is its implementation of the **Embeddable Game Standard** - your game exists as a transferable ERC-721 token that carries all game state with it. Built on the game-components minigame standard, each game token includes token-based game state (the token ID is the game ID), transferable gameplay (send your in-progress game to another player or trade it), a dynamic SVG renderer that generates real-time visual representations of game state as metadata, and ownership validation for every action using `pre_action` and `post_action` hooks.

**Encounter Types (Weighted Probabilities):**
- **Free Roam (40%)**: Safe movement
- **Gift Encounters (35%)**: +20 health, +20 attack, -20 damage, free attack ability, or free flee ability
- **Beast Encounters (25%)**:
  - Werewolf (12%): 20-30 attack, 10-20 damage
  - Vampire (13%): 25-35 attack, 15-25 damage

When encountering beasts, choose to **Fight** (one-hit kill but take damage) or **Flee** (take damage but survive if health > 0). Use special abilities to avoid damage.

### Encounter Generation & Events

Encounters are deterministically generated using **Poseidon hash** of game state, ensuring fairness and verifiability. The hash (mod 100) maps to weighted encounter distributions. Beast stats are randomized within ranges using hash derivatives.

The game emits comprehensive events for all actions:
- **GameCreated**, **Moved**, **EncounterGenerated**: Lifecycle tracking
- **CombatEvent**, **FledEvent**: Combat outcomes with full damage/health data
- **GameWon**: Victory condition

These events enable real-time UI updates, complete game history, analytics, and replay systems.

### GitHub
> Provide the GitHub where your project is hosted. Please ensure your github repo is registered with [OnlyDust](https://app.onlydust.com/p/create) to receive awards.

GitHub: [https://github.com/FemiOje/scard]

OnlyDust: [Project URL]

### Play
> Provide instructions on how to play your game. It could be a URL, a README, or a link to a binary to install.

Live Game: https://scard-roan.vercel.app/

**How to Play:**
1. Connect your Starknet wallet (Cartridge Controller)
2. Mint a new game (creates an ERC-721 token representing your game)
3. Use directional controls to navigate the 5×5 grid
4. Handle encounters: Free Roam (continue), Gifts (auto-applied), Beasts (Fight or Flee)
5. Reach (4,4) to win!

**Local Development:**
```bash
# Contracts
cd contracts
katana --config katana.toml
sozo build && sozo migrate
torii --world [world-address] --http.cors_origins "*"

# Client
cd client
pnpm install && pnpm run dev
```

### Twitter
> Provide the projects twitter handle. Please share your submission on socials too for more exposure!

https://x.com/0xjinius

### Team members
> Provide a list of your team members.

- GitHub: https://github.com/FemiOje
- Discord: 0xjinius
- Twitter: https://x.com/0xjinius

