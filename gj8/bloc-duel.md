# Bloc Duel

Last synced: 2026-03-08

### Project Summary
Bloc Duel is a two-player strategy card game on Starknet. Players draft from a shared pyramid, build resource engines, invoke historical heroes, and race across multiple win conditions: AGI, escalation, systems, or points.

What gives the game replayability is the combination of visible shared draft tension and variance: every match reshapes itself through pyramid randomness, hero availability, and competing win lines.

The game logic lives onchain in Dojo contracts and the client reads and writes match state through Torii and the Dojo SDK. The frontend uses Cartridge Controller for player authentication on public networks, and the project also ships a headless SDK plus agent skill so matches can be played programmatically as well as in the browser.

The current public deployment is live on Starknet Sepolia. The game is also intended to stay playable on mobile and compact screens, not only desktop.

A strong future direction for the project is agent-native play: the current SDK already supports self-play, validation, and scripted match participation, which makes integrations with router-based agent systems a plausible next step.

### Source Code
https://github.com/Eikix/bloc-duel

### Live Demo
https://bloc-duel.vercel.app

### Gameplay Video

### How to Play
Connect your wallet, create or join a match, and draft from the shared pyramid.

On each turn, choose one action:
- Play a card
- Discard a card for capital
- Invoke a hero

Advance through the three ages and win by reaching AGI Breakthrough, Escalation Dominance, Systems Dominance, or the best points total at the end.

### Twitter

### Team Members
- Elias Tazartes (@Eikix)
- Pierre Semanne (@0xMugen)
- Thomas Belloc (@Cheelax)
