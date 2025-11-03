# Memorabilia Dojo

### Submission Track
> Indicate which track your project is submitting to.
Full Game

### Project Summary
> Give a short summary of your game project.
Memorabilia Dojo is a fully on-chain memory card matching game built on Starknet using the Dojo framework and a custom Dojo Telegram SDK. The game runs as a Telegram Mini App and leverages Account Abstraction and Session Keys to provide gasless, seamless gameplay inside Telegram. Players match pairs of cards to score points based on moves and time, compete on a global leaderboard, and participate in daily challenges — all with no external wallet popups.

### GitHub
> Provide the GitHub where your project is hosted. Please ensure your github repo is registered with [OnlyDust](https://app.onlydust.com/p/create) to receive awards.
TBD

### Play
> Provide instructions on how to play your game. It could be a URL, a README, or a link to a binary to install.
Play directly inside Telegram via the Memorabilia Dojo Mini App. Players tap to flip cards, try to find matching pairs, and finish levels with the fewest moves and fastest time to earn higher scores. Game state and matching logic are persisted on-chain (Starknet), while the Dojo Telegram SDK handles account abstraction and gasless session key signing.

### Twitter
> Provide the projects twitter handle. Please share your submission on socials too for more exposure!
TBD

### Team members
> Provide a list of your team members.
Discord: @mwihoti

---

## Background

Current on-chain gaming adoption is blocked by the high-friction user experience associated with separate Web3 wallets. Users face complicated sign-in flows and interruptive transaction prompts for every in-game action, which breaks the fast, fluid experience expected in platforms like Telegram. Memorabilia Dojo demonstrates that Account Abstraction, Session Keys, and a tight Dojo Telegram SDK integration can deliver truly mainstream-friendly on-chain games.

## Core Gameplay

- Match pairs of cards to clear the board.
- Score is based on number of moves and elapsed time.
- Global leaderboard tracks high scores.
- Daily challenges present curated boards with special scoring.

## Features

- Fully on-chain game state for provable fairness and persistence (Starknet).
- Gasless user experience via Account Abstraction and Session Keys.
- Dojo Telegram SDK for in-app authentication, signing, and real-time state updates.
- Leaderboards and challenges implemented on-chain for transparency.
- Simple, accessible UI built as a Telegram Mini App for instant discovery and play.

## Tech Stack / Architecture

- Smart contracts: Starknet (Cairo / StarkNet dev stack) — game state, leaderboards, challenges.
- Backend: optional minimal server for matchmaking and off-chain telemetry (only where needed); core game logic and state live on-chain.
- Frontend: Telegram Mini App (webview) using Dojo UI components and the custom Dojo Telegram SDK.
- Wallet / Auth: Account Abstraction with Session Keys to authorize gasless session transactions; Dojo Telegram SDK integrates with Telegram account to sign session-authorizations.

## Implementation Notes

- Session Keys: short-lived session keys issued after a one-time user approval (onboarding) allow the app to submit gasless transactions mediated by a paymaster or sponsored transactions model.
- Game flow: user launches Mini App -> Dojo Telegram SDK requests a session key -> user approves (one tap) -> session key used for subsequent moves (no per-move popups) -> final score committed on-chain when level completes or timeouts.
- Cost model: use a paymaster/sponsor to cover L1 fees for gameplay transactions or batched settlement to minimize sponsor costs.
- UX Considerations: optimistic UI and websockets (or Telegram Mini App events) for near-instant updates while on-chain finality is confirmed asynchronously.

## Roadmap / Milestones

1. Prototype Telegram Mini App UI + mock Dojo SDK integration (week 1–2).
2. Starknet contract for board state, matching validation, and leaderboard (week 2–4).
3. Session Key flow + paymaster integration for gasless moves (week 3–5).
4. Internal testing, fairness audits, and polish (week 5–6).

## Looking for

- Smart contract developer (Cairo) familiar with Starknet.
- Frontend developer experienced with Telegram Mini Apps and Dojo.
- DevOps / infra help for paymaster and minimal backend components.

## Contact

Discord: @mwihoti

---

Tags: Starknet, Dojo, Telegram, Account-Abstraction, Session-Keys, On-chain, Memory-Game, Gasless, Leaderboard
