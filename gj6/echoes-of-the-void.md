# Echoes of the Void

### Submission Track
> Indicate which track your project is submitting to.

Full Game

### Project Summary
> Give a short summary of your game project.

"Echoes of the Void" is a minimalist, puzzle-platformer where players navigate pitch-black, procedurally generated chambers using only sound. Each move and action—whether stepping, or emitting a revealing sound pulse is a provable on-chain transaction on Starknet, powered by Dojo. The map is hidden by default. Players reveal their surroundings by sending out pulses that momentarily illuminate the grid, uncovering walls, paths, and the elusive exit. Every chamber is uniquely generated from an on-chain seed, ensuring fairness and replayability. Progression, movement, and map discovery are all validated and stored on-chain, while the client handles real-time rendering and input for a responsive, immersive experience. "Echoes of the Void" explores the potential of on-chain gameplay, blending cryptographic transparency with atmospheric, strategic puzzle-solving.

### GitHub
> Provide the GitHub where your project is hosted. Please ensure your github repo is registered with [OnlyDust](https://app.onlydust.com/p/create) to receive awards.

https://github.com/bitfalt/echoes-of-the-void/tree/main

### Play
> Provide instructions on how to play your game. It could be a URL, a README, or a link to a binary to install.

Instructions on how to run the game, copied from the README of Dojo Game Starter
> The next three steps assume you are in the `contract/` directory.

### 1️⃣ Start Katana (Local Blockchain)
```bash
katana --config katana.toml
```

### 2️⃣ Local Deployment
```bash
sozo build
sozo migrate
```

Usually the world address is always: "0x00a692c55875b9d0ee7186bf4e3bea34f798e44c4ef72e36ed9fd4d14c21e279", however it is better to check after doing sozo migrate.

### 3️⃣ Start Local Torii
```bash
torii --world "0x00a692c55875b9d0ee7186bf4e3bea34f798e44c4ef72e36ed9fd4d14c21e279" --http.cors_origins "*"
```

### 4️⃣ Configure the Client for local development

In the `client/` directory, create an `.env.development.local` file with the following contents:

```bash
VITE_PUBLIC_DEPLOY_TYPE=localhost
VITE_PUBLIC_NODE_URL=http://localhost:5050
VITE_PUBLIC_TORII=http://localhost:8080
```

Now run `npm run dev:https` and you should be ready to go!

### Twitter
> Provide the projects twitter handle. Please share your submission on socials too for more exposure!

@bitfalt
@3rickDev

### Team members
> Provide a list of your team members.

Daniel Garbanzo:
- GitHub: https://github.com/bitfalt
- Discord: @bitfalt
- Twitter/X: @bitfalt

Erick Vasquez:
- GitHub: https://github.com/evgongora
- Discord: @snowwl_
- Twitter/X: @3rickDev
