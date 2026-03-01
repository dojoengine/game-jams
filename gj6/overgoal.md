---
id: "overgoal"
emoji: "⚽"
title: "Overgoal"
summary_short: >
  **Mobile-first football career game** where matches play out in **arcade sequences** while
  off-field choices reshape stats and storyline, all **stored onchain**.
summary_long: >
  Overgoal drops players into the life of a **rising football legend**. Matches play out in
  snappy, arcade-style sequences while off-field choices (endorsements, nightlife, training)
  **reshape stats and storyline**. Every decision is stored onchain so the player's history
  is provably theirs. Built with 8 models, 1 system, and 1 event with **Dojo SDK integration**.
  56% of 126 commits during the jam. **Mobile-first design** with local setup required.
  Match logic currently runs **client-side** with backend service in progress.
work_done_short: >
  Built a **mobile-first football career game** with **8 Dojo models, 1 system, 1 event**,
  and **arcade match sequences** during the jam.
work_done_long: >
  Developed Dojo contracts with **8 models, 1 system, and 1 event** for player stats,
  career progression, match state, and off-field events. Integrated the **Dojo frontend SDK**.
  **Mobile-first React client** with arcade-style match rendering. 70 of 126 commits (56%)
  during the jam. Local setup with **team seeding scripts**.
repo_url: "https://github.com/mgrunwaldt/overgoal-game-repo"
demo_url: null
video_url: null
team:
  - "@berto_bau"
  - "@ger_gahn"
  - "@matigru93"
metrics:
  classification: "Whole Game"
  team_size: 3
  dojo_models: 8
  dojo_systems: 1
  dojo_events: 1
  client_sdk: "None"
  jam_commits_pct: 56
  playability: "None"
  repo_unavailable: true
---
# Overgoal: More Than a Match

### Submission Track

> Full Game

### Project Summary

> Overgoal drops you into the boots—and life—of a rising football legend. Matches play out in snappy, arcade-style sequences, while off-field choices (endorsements, nightlife, training) reshape your stats and storyline. Every decision is stored on-chain, so your player's history is provably yours and can carry into future titles in the Over universe.

### GitHub

> [https://github.com/mgrunwaldt/overgoal-game-repo](https://github.com/mgrunwaldt/overgoal_game_repo)

### Play

> Local test-run

> sozo build

> katana --config katana.toml

> sozo migrate

> torii --world "<world-address>"

> (inside contracts/) ./scripts/seed_teams.sh

> (inside contracts/) ./scripts/seed_non_match_events.sh

> (inside client/) npm run dev:https

### IMPORTANT

Go to [https://localhost:3002/login](https://localhost:3002/login) to start the game

Open the HTTPS URL shown in the console on your mobile browser.
Game is mobile-first; desktop works but layout isn't polished yet.
 Heads-up: Right now match logic runs client-side. A backend service for authoritative simulation and state proofs is in progress.

### Twitter

@berto_bau · @ger_gahn · @matigru93

### Team Members

> Bautista Berto

> Ger Gahn

> Matías Grunwaldt

### Next Steps

> Complete Match Logic.
