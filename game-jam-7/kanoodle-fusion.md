---
id: "kanoodle-fusion"
emoji: "🎨"
title: "Kanoodle Fusion"
summary_short: >
  Blockchain-based color-mixing puzzle game where players place translucent polyomino
  pieces on a 4x4 grid. Colors stack and blend additively to match target patterns
  across 50 progressively challenging levels.
summary_long: >
  Kanoodle Fusion is a spatial puzzle game built on Starknet using Dojo. Players place 13
  different polyomino pieces onto a 4x4 grid where primary colors (red, yellow, blue)
  combine to create secondary colors (orange, green, purple). The game features 50 levels
  of increasing difficulty, piece rotation and flipping, drag-and-drop controls, undo and
  clear functionality, multi-language support, colorblind mode, and a Commodore 64 retro
  aesthetic with CRT effects. All game state and logic stored on-chain.
work_done_short: >
  Built a complete color-mixing puzzle game with 50 levels, 13 piece types, additive
  color blending, and a retro Commodore 64 aesthetic.
work_done_long: >
  Developed a full puzzle game with Dojo contracts defining 1 model and 1 system for
  on-chain game state. Implemented additive RGB color blending, 13 polyomino pieces with
  rotation and flip transforms, 50 hand-designed levels, drag-and-drop controls, colorblind
  accessibility mode, and multi-language support. Built a React frontend with Commodore 64
  styling and CRT effects. Deployed live on Vercel.
repo_url: "https://github.com/dpinones/kanoodle-fusion"
demo_url: "https://kanoodle-fusion.vercel.app/"
video_url: "https://www.youtube.com/watch?v=eW0aSUBjs6c"
team:
  - "@dpinoness"
  - "@pilito_06"
metrics:
  classification: "Whole Game"
  team_size: 2
  dojo_models: 1
  dojo_systems: 1
  dojo_events: 0
  frontend_sdk: false
  jam_commits_pct: 100
  playability: "Live"
---
# Kanoodle Fusion

### Project Summary
Kanoodle Fusion is a blockchain-based puzzle game built on Starknet using the Dojo framework. Players solve color-mixing puzzles by placing translucent polyomino pieces on a 4x4 grid, where colors stack and blend additively to match target patterns. The game features 50 progressively challenging levels, with all game state and logic stored on-chain.

The game implements a unique color-mixing mechanic where primary colors (red, yellow, blue) combine to create secondary colors (orange, green, purple), creating an engaging puzzle experience that requires both spatial reasoning and color theory understanding.

### GitHub
https://github.com/dpinones/kanoodle-fusion

### Play
https://kanoodle-fusion.vercel.app/

### Video
https://www.youtube.com/watch?v=eW0aSUBjs6c

### Team Members
- Damian Piñones - [@dpinoness](https://x.com/dpinoness)
- Ivan Piñones - [@pilito_06](https://x.com/pilito_06)

---

## Game Features

- **50 Unique Levels**: Progressively challenging puzzles from beginner to expert
- **Color Mixing Mechanics**: Additive RGB color blending system
- **13 Different Pieces**: Various polyomino shapes with different colors
- **Piece Transformations**: Rotate (0°, 90°, 180°, 270°) and flip pieces
- **Drag & Drop Interface**: Intuitive piece placement with visual preview
- **Undo & Clear**: Experiment freely with non-destructive gameplay
- **Multi-language Support**: English, Spanish, and Japanese
- **Colorblind Mode**: Accessibility features with symbols for colors
- **Commodore 64 Aesthetic**: Retro pixel-perfect design with CRT effects

## How to Play

1. **Connect Your Wallet**: Use Cartridge Controller to authenticate
2. **Select a Level**: Start with Level 1 or continue your progress
3. **Place Pieces**:
   - Click to select a piece
   - Use ROTATE and FLIP buttons to transform it
   - Drag the piece to the board
4. **Mix Colors**: Stack pieces to blend colors additively
5. **Match the Pattern**: Make your board match the target pattern
6. **Progress**: Complete all 50 levels to win!

## Color Mixing Rules

- **Primary Colors**: Red + Yellow = Orange
- **Primary Colors**: Red + Blue = Purple
- **Primary Colors**: Yellow + Blue = Green
- **Muddy Mix**: Mixing all three primaries or incompatible colors = Empty
- **Neutral Pieces**: Don't mix with other colors
