# Tactical Beasts

### Project Summary
Tactical Beasts is a PvP 1v1 turn-based tactical game on Starknet. Each player builds a team of 3 beast NFTs from Loot Survivor and battles on a hex grid with obstacles.

Game logic lives onchain in Dojo contracts — damage formulas, the combat triangle, and team validation all resolve in Cairo. The client reads and writes match state through Torii and the Dojo SDK. Players authenticate with Cartridge Controller on public networks.

Part of the Provable Games ecosystem: beasts come from Loot Survivor NFTs, combat uses Death Mountain's damage formula and type triangle, and matches are EGS-compatible for Budokan tournament integration.

The game is designed to be playable on mobile and compact screens, not only desktop.

### Source Code
https://github.com/dpinones/tactical-beasts

### Live Demo
https://tactical-beasts.vercel.app

### Gameplay Video

### How to Play
1. Connect your **Cartridge Controller** wallet
2. **Find Match** to queue into matchmaking, or **Invite a Friend** to create a private game with custom rules
3. **Select your team** — pick 3 beasts from your NFT collection (tier limits and subclass balance validated onchain)
4. **Battle** — alternating turns on a hex board. Each turn: move, attack, or use a consumable. The contract resolves damage, passives, crits, and counterattacks
5. **Win** by KO'ing all opposing beasts — stats and score are recorded onchain

**Tips:**
- Use the combat triangle: Magical beats Brute, Brute beats Hunter, Hunter beats Magical (+50% / -50% damage)
- Stalkers have 3 movement — use them to flank Rangers who take +30% damage from adjacent enemies
- Juggernauts reward holding ground with Fortify (-10% damage if they didn't move last turn)
- Berserkers get stronger below 50% HP — finish them off or leave them alone

### Twitter

### Team Members
- [@dpinones](https://github.com/dpinones)
- [@pilitoo](https://github.com/pilitoo)
