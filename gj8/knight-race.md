# Knight Racing

## Project Summary
Knight Racing is a fully on-chain, medieval-themed wagering and racing simulator built on Starknet using the Dojo engine. Players initialize race lobbies, place wagers on their  knights using testnet $STRK, and claim payouts if they correctly predict the winner.

**Features:**
* Fully on-chain race resolution logic powered by Cairo
* Real-time indexing via Torii
* ERC-20 wager and reward payout system
* Frictionless UX using Cartridge Controller multicalls for approvals and contract interactions
* Desktop-first Game Dashboard built with React

## Source Code
https://github.com/Nexonik2/knight-racing

## Live Demo
https://knight-racing.vercel.app/
## How to Play
1. **Connect:** Use the Cartridge Controller in the top-right to sign in.
2. **Setup:** Ensure you have testnet $STRK (use faucet link provided in-app if needed). 
3. **Spawn:** Click the "Spawn new race" button to initialize a new race lobby on Sepolia. 
4. **Wager:** Select one of the four knights and place a 0.1 STRK wager. [cite: 2026-03-09]
5. **Race:** Once wagers are locked, resolve the race to trigger on-chain winner calculation.
6. **Claim:** If your knight wins, click "Claim Rewards" to receive your payout.
7. **Check Other Games:** Expand the Race Log on the side to check live and finished races. Players can place wagers in other lobbies as long as they are open for wagers (only lobby creator controls its state advancement)

## Rules
* Games can be set up with any token by their creator (frontend default: testnet $STRK).
* Wagers can only be placed in the token the game's creator specified during its creation (frontend default amount: 0.1).
* Only one wager can be placed per account in the same race.
* Wagers can be placed in any amounts of the specified token (as long as the wallet holds sufficient funds).
* Races can result in a tie (in which case all players who bet on any of the winners receive a pro-rata payout)


## Architecture

### Smart Contracts (Cairo)
Built with Dojo 1.8.6:
* **Models:**
    * `GameTracker` - A global singleton tracking the current `race_id` counter.
    * `Race` - Stores the lobby state (Wagering/Racing/Finished), the required `fee_token`, and the total/winning prize pools.
    * `Knight` - Tracks individual knight positions, race rank, and total funds wagered on them.
    * `Wager` - Maps a player's address to their chosen knight, wager amount, and calculated reward.
* **Systems (`IActions`):**
    * `spawn_race(fee_token)` - Initializes a new race entity and assigns the ERC-20 fee token.
    * `place_wager(race_id, knight_id, amount)` - Handles ERC-20 `transfer_from` logic and records player bets.
    * `lock_betting(race_id)` - Transitions the race state to prevent late wagers.
    * `resolve_race(race_id)` - Executes on-chain logic to calculate knight positions and final ranks.
    * `claim_reward(race_id)` - Calculates and transfers the winning pool share back to the player via ERC-20

Sepolia Actions Contract Address: 0x4e90fe93ae9c4372a1550d81535b29b033865bd17516aa2a779e28fa0a5959b

### Client
* React + Vite (JavaScript)
* Dojo SDK for real-time blockchain synchronization.
* Cartridge Controller for wallet management and transaction bundling.

## Team Members
* @Nexonik2 (GitHub)
* @Nexonik (X)