# Detective Game

### Submission Track
> Indicate which track your project is submitting to.
Full Game

### Project Summary
> Give a short summary of your game project.

**Detective Game** is a blockchain-first murder mystery where players interrogate AI-powered suspects to solve a crime. Each session allows a single accusation attempt, with the outcome recorded on Starknet using Dojo smart contracts.

The game uses a hybrid architecture: fully onchain logic for game state, and GPT-generated suspect dialogue handled off-chain. All major game actions — game start, accusations, and player stats — are recorded and indexed onchain, with UI and gameplay enhanced through a custom React + Tailwind frontend.

Built solo over the 72-hour jam window, the project demonstrates how expressive AI and provable Dojo game mechanics can work together to deliver engaging, replayable mystery gameplay.

### GitHub
> Provide the GitHub where your project is hosted. Please ensure your github repo is registered with [OnlyDust](https://app.onlydust.com/p/create) to receive awards.

[https://github.com/EthanPerello/detective-game](https://github.com/EthanPerello/detective-game)

(Repo registered with OnlyDust)

### Play
> Provide instructions on how to play your game. It could be a URL, a README, or a link to a binary to install.

**Local Setup:**
```bash
# Backend (AI-powered character responses)
cd backend
npm install
npm start

# Frontend (Game UI)
cd frontend
npm install
npm run dev
```

**Chain Info:**

* World Address: `0x0598cc6424eb59171928b1f7da3144c33a80ebe8f1f5c2e67ad9731b1e32e7f4`
* RPC: `https://api.cartridge.gg/x/detective-game-6/katana`

Frontend will connect to onchain state automatically if Cartridge wallet is connected.

### Twitter

> Provide the projects twitter handle. Please share your submission on socials too for more exposure!

[@EthanPerello](https://twitter.com/EthanPerello)

### Team members

> Provide a list of your team members.

* **Ethan Perello**

  * GitHub: [@EthanPerello](https://github.com/EthanPerello)
  * Discord: @EthanPerello
  * Twitter: [@EthanPerello](https://twitter.com/EthanPerello)
