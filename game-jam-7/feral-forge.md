# Feral Forge

### Submission Track
`Full Game`

### Project Summary

**Feral Forge** is a fully on-chain game inspired by the [Loot Survivor](https://lootsurvivor.io/) lore.

#### Game Features

- 🔢 The **game mechanics** is a variant of [2048](https://en.wikipedia.org/wiki/2048_(video_game))
- 🧌 It starts in a 4x4 grid containing and 2 random **T5 Beasts**.
- 👆 Sliding the grid up, down, left or right will merge beasts of the same Tier into a higher tiers.
- ䷰ Two beasts of the same tier upgrade to a higher tier (T5+T5 > T4)
- 🌈 Two beasts of the same name upgrade to a **Shiny Beast** of the same name.
- 🎯 Shinies have the highest scores, are final and can'upgrade, you want Shinies!
- 🎲 After every move, a new random **T5 Beast** is spawned randomly.
- 🏁 The game is over when there are no more space left in the grid.
- 🖼️ Each game is a soul-bound **ERC-721** token, each with their own **Leaderboard** (top score only)
- 🏆 The game transfers the token ownership to whoever beats it's high score.
- 📱 Designed to be played in **mobile**
- 🎮 Only the [Cartridge Controller](https://docs.cartridge.gg/controller/overview) wallet is supported at this moment.
- 🗂️ No indexer is required for this client.
- 🚀 Deployed on Sepolia, contract  [`0x01394f7b766ac2eeaC7Aea6323964E701207925A7f76351d4A770B428f5a6C10`](https://sepolia.voyager.online/contract/0x01394f7b766ac2eeaC7Aea6323964E701207925A7f76351d4A770B428f5a6C10)


#### Technical Overview

* Making fast-paced mobile on-chain games is a big challenge. If every move is a transaction, the delay between moves will be too large to keep players engaged.
* Luckily, Cartridge is working on **client proofs**, where the client has a WASM version of the game, the game is ran in the client, and only the proofs and state changes are sent on-chain.
* Unluckily, this feature is not available yet...
* My solution is to expose **game read-nly logic methods** that can be called for every move to get the next game state, and when the game is over, submit all moves on-chain to be replayed and results stored, in a **single write function**.
* A better solution would be to create a WASM with those methods, and not call the RPC during gameplay, only at the end of a game. But there was not time implement this for this Jam.


#### Gameplay methods:

* `fn mint(ref self: TState, recipient: ContractAddress) -> u128;`
Mints a new game, with empty scores, to the player (recipient). Generates the game `seed`.

* `fn start_game(self: @TState, game_id: u128) -> GameState;`
Returns the inital state of a game to be played in the client.

* `fn move(self: @TState, game_state: GameState, direction: Direction) -> GameState;`
Sends a move to be processed, with the current `game_state` and a `direction` to move. Returns the new `game_state`, with a recycled seed. We keep calling this method until there are no more moves allowed (the grid is full).

* `fn submit_game(ref self: TState, game_id: u128, moves: Array<Direction>) -> GameState;`
When the game is over, we sugmit all the moves to be re-played and results stored. I have no idea how many moves the contract os capable of processing. At least 50 moves was tested with success.

* `fn get_game_info(self: @TState, game_id: u128) -> GameInfo;`
Returns the current data of a game, including the top score and score holder. This enables playing without an indexer.

#### Resources used

* [Dojo](https://book.dojoengine.org/) : Fully on-chain ECS game engine on Starknet
* [Dojo Starter](https://github.com/dojoengine/dojo-starter) : Initial template with `sozo init`
* [Loot Survivor](https://lootsurvivor.io) | [Savage Summit](https://github.com/Provable-Games/summit) : Beasts, lore, inspiration, gratitude
* [1337skulls](https://1337skulls.xyz/) : Original Beasts art
* [Pistols at Dawn](https://github.com/rsodre/feral-forge) : Dojo project template, rng, hash traits, migration scripts, js utils
* [Astraea](https://github.com/rsodre/ASTRAEA) : Client template
* [GPT](https://chatgpt.com/) : Background art, ideation


### Play

* Go to: [https://feral.beta.underware.gg/](https://feral.beta.underware.gg/)
* Connect a Controller account
* Go to `Play Now`
* Select an existing game to beat it's top score and claim ownership
* Or create a new game
* Gameplay is straight-forwatd 2048 style, as explained above.


### GitHub
Repository: [https://github.com/rsodre/feral-forge](https://github.com/rsodre/feral-forge)

> configured with [OnlyDust](https://app.onlydust.com) for awards distribution.


### Twitter
X: [@matalecode](https://x.com/matalecode)


### Team members

#### Roger Sodre or Mataleone
* Portfolio : [Studio Avante](https://studioavante.com/)
* Personal projects : [https://github.com/rsodre](https://github.com/rsodre)
* Underware projects : [https://github.com/underware-gg](https://github.com/underware-gg)
* Discord: `#mataleone`, ID `343964917034123265`
* X: [@matalecode](https://x.com/matalecode) / [@roger_s](https://x.com/roger_s) / [@underware_gg](https://x.com/underware_gg)
