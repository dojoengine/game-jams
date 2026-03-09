# Starkbound

## Summary

Starkbound is a turn-based artillery game in the spirit of Gunbound, built on Starknet with the Dojo framework. 2–4 players take turns aiming and firing at each other across a destructible Metamine terrain map, with wind adding unpredictability every round.

What makes Starkbound different: **all game logic lives on-chain**. Physics trajectories, damage calculation with proximity falloff, terrain destruction, wind generation, turn management, and victory conditions are all computed in Cairo and recorded as Dojo models. The client is a rendering layer — not a game logic layer.

---

## On-Chain Architecture

Starkbound keeps the full game state and all gameplay logic on-chain via Dojo models and Cairo systems:

| Component | Implementation |
|---|---|
| Game & lobby state | `GameState`, `Lobby`, `Player` Dojo models |
| Per-tank state | `TankState` model (hp, shield, position, alive) |
| Physics simulation | Trajectory calculation in Cairo (`helpers/physics.cairo`) |
| Damage calculation | Proximity falloff computed on-chain |
| Terrain destruction | `TerrainRow` bitmap model — craters written per shot |
| Wind system | Poseidon RNG seeded per turn, stored in `GameState` |
| Turn management | `current_slot` and `phase` tracked on-chain |
| Victory condition | `alive` flags checked after every shot |
| Shot validation | All shots validated by the contract before state update |

The client mirrors the on-chain physics locally only for instant visual feedback — the authoritative result always comes from the chain.

---

## Source Code

https://github.com/dubzn/starkbound

---

## Live Demo

[Starkbound](https://starkbound.up.railway.app/)

---

## Gameplay Video

[Starkbound Gameplay](https://youtu.be/naOFyJ5kLfE)

---

## How to Play

### Game Flow

1. Create a burner wallet or login with Controller from the main menu
2. Create or join a lobby (2–4 players)
3. Select your tank type:
   - **Armor** — high HP, balanced stats
   - **Ice** — slows terrain on impact
   - **Lightning** — chain damage
4. Once all players are ready, the host starts the game
5. On your turn: move, pan the camera (click and drag), set angle, read the wind compass, charge and fire
6. Last tank standing wins

### Local Development

Requirements: Dojo 1.7.2, Scarb 2.13.1, Node.js

```bash
# Terminal 1 — local chain
make katana

# Terminal 2 — indexer
make torii

# Terminal 3 — deploy contracts
make setup

# Terminal 4 — client
cd client && npm install && npm run dev
```

Open `http://localhost:3000`.

---

## Recent Updates

### Tutorial Mode

A fully self-contained tutorial is accessible from the main menu without connecting a wallet or joining a lobby. It runs entirely off-chain and guides new players through the core mechanics in sequential steps:

1. Moving your tank into position
2. Panning the camera (click and drag)
3. Adjusting shot angle
4. Charging and firing
5. Accounting for wind
6. Completing a match vs. the Ice bot

The tutorial uses the same physics mirror and rendering pipeline as the live game. It ships with dedicated BGM (`tutorial.mp3`) and the full SFX suite (shoot, blast, move, wind alert, turn alert).

### Main menu

- **Profile** (`profile.png`) — burner wallet creation and pilot name
- **Create Room** (`create_room.png`) — host or join a multiplayer lobby
- **Tutorial** (`tutorial.png`) — launch the tutorial

---

## Team

Developer — @dub_zn

