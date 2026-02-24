---
id: "destiny"
emoji: "⚔️"
title: "Destiny"
summary_short: >
  Turn-based RPG battle game where players command heroes against monsters across 3
  difficulty levels. Features 9 skill types including offensive, support, and debuff
  abilities with on-chain progression.
summary_long: >
  Destiny is a fully on-chain turn-based RPG built on Starknet using Dojo. Players select
  heroes and assign skills each turn to battle waves of monsters. The combat system features
  9 skill types spanning offensive attacks, healing, buffs, and debuffs, with critical hits,
  evasion, and defense calculations. Dojo manages game state through 2 models and 1 system
  with 1 event. The frontend features pixel-art animated characters, sound effects, and
  background music. Deployed live on Vercel with Cartridge Controller integration.
work_done_short: >
  Built a complete turn-based RPG with heroes, 9 skill types, 3 difficulty levels,
  pixel-art animations, and live deployment.
work_done_long: >
  Developed a full turn-based RPG with Dojo contracts defining 2 models, 1 system, and 1
  event for on-chain game state. Built a React frontend with pixel-art character animations,
  sound effects, and background music. Implemented combat mechanics including critical hits,
  evasion, and defense calculations across 3 progressive difficulty levels.
repo_url: "https://github.com/SimplementeCao/dojo-game-jam-destiny"
demo_url: "https://dojo-destiny.vercel.app/"
video_url: "https://youtu.be/d0ZMfTjpQ28"
team:
  - "@simplementecao"
metrics:
  classification: "Whole Game"
  team_size: 1
  dojo_models: 2
  dojo_systems: 1
  dojo_events: 1
  frontend_sdk: true
  jam_commits_pct: 100
  playability: "Live"
---
# DESTINY

### Submission Track

**Full Game**

### Project Summary

**DESTINY** is a fully on-chain turn-based RPG battle game built on **Starknet** using the **Dojo**.

**Key Features:**
- **Turn-Based Battle System**: Strategic combat with 7 unique heroes and multiple monster types
- **9 Skill Types**: Offensive attacks (Basic, Power, Flame), support skills (Heal, Buff Defense/Attack/Critical), and debuff abilities
- **3 Difficulty Levels**: Easy, Medium, Hard - unlocked sequentially as you progress
- **On-Chain Progression**: All game state and progress saved on-chain via Dojo models
- **Rich Audio System**: Background music and 11 unique sound effects for immersive gameplay
- **Pixel-Art Visuals**: Beautiful animated characters with idle, hit, and damage animations
- **Advanced Combat Mechanics**: Critical hits, evasion, defense calculations, and status effects

The game features a complete progression system, balanced combat mechanics, and polished UI/UX with visual and audio feedback for every action.

### Play Demo

https://dojo-destiny.vercel.app/

### Github repository

https://github.com/SimplementeCao/dojo-game-jam-destiny

### Gameplay 
https://youtu.be/d0ZMfTjpQ28

#### Getting Started
1. **Connect Your Wallet**: 
   - Connect with Controller

2. **Select a Level**:
   - Level 1 is unlocked from the start
   - Levels 2 and 3 unlock after completing the previous level
   - Click on a level card to start the battle

#### Battle Mechanics
1. **Select Your Hero**: Click on any hero from the bottom row to select them
   - Selected heroes are highlighted
   - Hover over characters to see detailed stats and skills

2. **Choose a Skill**: 
   - Select from the hero's available skills in the skills container
   - Skills are categorized by type:
     - **Offensive** (target enemies): Basic Attack, Power Attack, Flame Attack
     - **Support** (target allies): Heal, Buff Defense, Buff Attack, Buff Critical Chance
     - **Debuffs** (target enemies): Debuff Defense, Debuff Attack

3. **Select a Target**:
   - **Offensive/Debuff skills**: Click on an enemy (top row)
   - **Support skills**: Click on an ally (bottom row)

4. **Execute Turn**:
   - Assign actions to all heroes
   - The turn executes automatically once all heroes have actions
   - Watch the battle unfold with visual effects and sound feedback

5. **Combat Details**:
   - **Critical Hits**: Random chance based on character stats (doubles damage)
   - **Evasion**: Attacks can miss based on target's evasion stat
   - **Defense**: Reduces incoming damage
   - **Status Effects**: Buffs and debuffs modify character stats

6. **Victory Conditions**:
   - Defeat all monsters to win the battle

### Team members
- twitter [@simplementecao](https://x.com/simplementecao/)
- discord @simplemenetcao
