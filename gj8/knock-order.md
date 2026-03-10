---
id: "knock-order"
emoji: "🥊"
title: "Knock Order"
summary_short: >
  A **fully on-chain 1v1 tactical card game** built with Dojo on Starknet. Players
  secretly sequence 5 cards from an 18-card deck each round, then watch them resolve
  **slot-by-slot** in a deterministic, **priority-based combat system** with no hidden
  server state.
summary_long: >
  Every move is committed to the Dojo world via Cartridge before either player sees
  the other's hand — pure blind prediction. Combat resolves through three card types:
  **Strikes** deal Knock damage, **Defenses** absorb and reflect, and **Control**
  cards evade, disrupt, or bait. Five unique fighters alter base stats, adding
  character-driven variety to the shared deck. The entire ruleset — priority ladders,
  interaction rules, life drain, round and match state — lives in **8 Dojo systems**
  across 6 models, with 9 on-chain events providing a full audit trail. Matches are
  **EGS-compliant** (Embeddable Game Standard), allowing anyone to verify outcomes
  on-chain.
work_done_short: >
  **Built entirely during the jam** — first commit to final deploy all happened on
  March 8–9. Full combat engine in Cairo with **priority resolution**, card-type
  interactions, multi-round match state, and Cartridge wallet-less onboarding.
work_done_long: >
  The team implemented the complete card game from scratch: **8 Dojo systems**
  covering match creation, move commitment, slot-by-slot resolution, life drain,
  round and match ending, and card initialization. The **React frontend** integrates
  `@dojoengine/core` with Cartridge Controller for invisible signing. On-chain
  **multiplayer direct challenge** and solo-vs-AI modes were both shipped. An
  **EGS adapter** was layered on top to make match scores queryable by the Provable
  Games standard.
repo_url: "https://github.com/Calebux/knockorder"
demo_url: "https://knockorder.vercel.app/"
video_url: "https://www.youtube.com/watch?v=KYUo0d2vR7s"
team:
  - "Calebux"
metrics:
  classification: "Whole Game"
  team_size: 1
  dojo_models: 6
  dojo_systems: 8
  dojo_events: 9
  client_sdk: "dojo.js"
  jam_commits_pct: 100
  gameplay: "Onchain"
---

# 🥊 Knock Order
Youtube link: https://youtu.be/KYUo0d2vR7s
Link: https://knockorder.vercel.app/


**Knock Order** is a 1v1 tactical, simultaneous-turn card game built entirely on-chain using Starknet (Sepolia) and Dojo. It tests players' reading and prediction skills in a high-stakes, purely deterministic combat system.

---

## 📖 The Core Loop

- **Blind Sequencing:** Every round, both players are given the same 18-card deck and a fixed energy budget. They secretly select and sequence 5 cards into slots.
- **On-Chain Commitment:** Moves are locked into the Dojo world via Cartridge. Once both players commit, the sequence is immutable.
- **Slot-by-Slot Resolution:** The cards are revealed and resolve one slot at a time based on **Priority** (from 5 being the fastest, to 1 being the slowest and heaviest).
- **Interactions:** Cards fall into three types: **Strikes** (deal damage), **Defenses** (absorb and reflect), and **Control** (evade, disrupt, or bait). For example, a fast *Evasion* slips past a slow *Power Punch*, but a *Disrupt* doubles its damage if it catches a Strike.
- **The Knockout:** Players start with 100 Life. Raw damage ("Knock") drains Life. The first player to reach 0 Life loses the round. Matches are Best-of-3 (Casual) or Best-of-5 (Tournament).

---

## 🥷 The Fighters

Players choose from 5 unique characters (Kaira, Kenji, Riven, Zane, Elara). While everyone shares the same deck, characters alter base Knock output, Priority speed, and Drain efficiency, heavily influencing playstyles—from slow, heavy hitters to fast, evasive glass cannons.

---

## 🎮 How to Play

Learning Knock Order takes one round, but mastering the reads takes a lifetime. Here is how a match unfolds:

1. **Choose Your Fighter & Enter the Match:** Pick a character based on your preferred playstyle (e.g., speed, raw damage, or life drain). Create a match with an opponent's Cartridge username, or jump into a solo game.
2. **Build Your Sequence (The Loadout):** At the start of the round, you are given a fixed energy budget. Review the 18-card shared deck and select exactly 5 cards to arrange in Slots 1 through 5. *Strategy tip: Spread your budget wisely. A hand full of expensive, heavy-hitting cards leaves you predictable and full of cheap filler, while a balanced hand lets you mix offense, defense, and control.*
3. **Lock It In:** Once you are happy with your 5-card sequence, lock it. Your choices are permanently committed to the Starknet blockchain. You cannot see your opponent's sequence, and they cannot see yours.
4. **Watch the Resolution:** Once both players have locked in, the cards are revealed and resolve slot by slot.
   - Lower Priority numbers execute later but hit harder. Higher Priority numbers execute first but are lighter.
   - Interactions fire automatically based on card types (e.g., a Defense blocking a Strike).
5. **Win the Round:** Slot interactions determine how much Knock damage is dealt. If your opponent's Life reaches 0, you win the round. Win 2 rounds in a Best-of-3 (or 3 in a Best-of-5), and the match is yours!

---

## ⚙️ Technical Foundation

- **Fully On-Chain:** This is not a web2 game with web3 receipts. The entire ruleset, combat resolution, priority ladder, and state management run natively within a **Dojo World** on Starknet.
- **Provable & Permanent:** Matches are EGS-compliant (Embeddable Game Standard). Anyone can query the chain to see the match state, the winner, and the sequence that led to the victory. There are no servers to go down and no admins to dispute the results.
- **Seamless UX:** Integrated with **Cartridge Controller** for invisible signing and session keys, giving players a web2-like fast experience while remaining fully decentralised.

---

## 📜 Contract Addresses (Starknet Sepolia)

* **Dojo World:** `0x02e3549fc2e07fbf842c3f1b02fbfedcafb7a89dd222030575a2c8c54ea25811`
*(The central registry and state manager for the entire game)*

**Core Action Contracts (Systems):**
* **Match Setup (`MatchSetup`):** `0x0741382d4071948b668ae111d5b8332eaf8ffa23bc6b3a0e8939b9eb5a1bd227`
*(Handles match creation and matchmaking queries)*
* **Lock Moves (`LockMoves`):**
