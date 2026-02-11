# Dojo Game Jams

![Game Jam VIII Header](.github/assets/GJ8Header.png)

​Dojo **Game Jam VIII** is here and **starts on 3/6**!

​Teams will come together for **3 days** to build games on the open-source, provable Dojo Engine, competing for a slice of a **$15,000 prize pool**.

## Getting Started

👉 [**Register your game idea here**](https://github.com/dojoengine/game-jams/issues/new?assignees=&labels=&projects=&template=register_project.yaml&title=%5BProject+Registration%5D:+Your+Project+Name)

If you're looking for teammates or game ideas, head over to the **#game-jam** channel in the [Dojo Discord](https://discord.gg/tHezCAA4).
The Dojo team will do our best to help match you with great people.

Dojo also maintains a [**spreadsheet of interesting game concepts**](https://docs.google.com/spreadsheets/d/16onyBjTdgYFO1W7bGfSXldpdjLvv9SPk5p3k88eJWBs) — feel free to grab an idea off the list!

## Resources

- [**Dojo Book**](https://book.dojoengine.org/) — start here if you're new to Dojo development.
- [**Sensei MCP Server**](https://github.com/dojoengine/sensei-mcp/blob/main/README.md) — AI-assisted Dojo development. See a [sample vibe-coded game](https://github.com/dojoengine/vibe-sample).
- **Claude Code Skills** — if you use [Claude Code](https://claude.ai/code), install Dojo and Cartridge skills:
  ```bash
  npx skills add dojoengine/book
  npx skills add cartridge-gg/docs
  ```

## Rules

- Built with the [Dojo Engine](https://dojoengine.org/), deployed to Slot / Sepolia, using the [Cartridge Controller](https://docs.cartridge.gg/controller/getting-started).
- Built during the 72-hour jam window. New features for existing games are allowed but must be clearly scoped.
- All external sources must be cited (worlds, code, libraries, assets).
- 5 contributors max per team.
- Vibe-coding is encouraged but not required!

## Submitting

Coding begins **Friday, March 6 at 00:00 AOE** and submissions are due **Sunday, March 8 at 23:59 AOE**.
([AOE](https://en.wikipedia.org/wiki/Anywhere_on_Earth) = anywhere on earth, so everyone can participate.)

> Commits made after the deadline will be ignored.

To submit, open a Pull Request adding a file to the [`game-jam-8` directory](./game-jam-8):

1. Copy the [Submission Template](./templates/SUBMISSION_TEMPLATE.md) and fill it out.
2. Name the file after your project in `kebab-case`.
3. See [EXAMPLE_SUBMISSION.md](./templates/EXAMPLE_SUBMISSION.md) for reference.

Your submission must include Dojo contracts (models + systems), a frontend using the Dojo SDK, Cartridge Controller integration, deployment to Slot/Sepolia, and play instructions.
See [SCREENING.md](./SCREENING.md) for details on the automated screening process.

## Judging

Judging takes place the week after the jam and is based on:

1. Novel use of the Dojo Engine.
2. Originality of concept and mechanics.
3. Visual and game design.
4. Fun!
