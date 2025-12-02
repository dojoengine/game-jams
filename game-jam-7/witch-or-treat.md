# 🎃 Witch or Treat

*Witch or Treat* is an on-chain Halloween mini-game built with *Dojo* where players ring a spooky doorbell to collect treats 🍬, brew magical potions 🧪, and risk being cursed by the Witch herself ☠. Every action is powered by *Cairo smart contracts* and synced in real-time via *Torii*.

# Repo

https://github.com/Akaninyang/game-jams/tree/aa6dca3d11953c23151fa8981b123385ed79ef26/games/witch-or-treat

---

## 🕹 How to Play

1. *Connect Wallet* — click the connect button at the top right corner.
2. *Ring the Doorbell* 🔔 to collect random treats.
3. *Collect Treats* 🎃🍭🍫 — watch them appear in your treat bar.
4. *Brew Potions* ⚗ from the potion modal using collected treats:
   - 🧵 *Bribe Potion* — costs 2 🎃
   - 🗡 *Slayer Potion* — costs 3 🍭
   - ✨ *Multiplier Potion* — costs 4 👻
5. *Drink Potions* 🧃 to activate their effects (some increase rewards, some protect you).
6. *Beware the Curse!* ☠ The Witch might curse you, wiping some treats and causing *game over*.
7. *Press Play* to continue after a curse — gameplay resumes with your remaining progress.

---

## ⚙ Run Locally

```bash
# 1️⃣ Start your local node
cd contracts && katana --config katana.toml

# 2️⃣ Build and migrate your Dojo contracts
cd contracts && sozo build && sozo migrate

# 3️⃣ Start the Torii indexer
cd contracts && torii --config torii.toml

# 4️⃣ Launch the client
cd client && pnpm install && pnpm run dev

#credits
dojo-intro template

#tech stack
dojo engine
javascript
html
css
**vibe coded frontend
