# Simple Jumping Game

Simple Jumping Game inspired by Chrome Dino Game developed in collaboration during the Kreativstorm Hands-On Training Program.

## Table of Contents

- [Preview](#preview)
- [Behind the Scenes](#behind-the-scenes)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)

## Preview

You can find live preview [here](https://andrejcode.github.io/simple-jumping-game).

### Behind the Scenes

This game is built using HTML Canvas and JavaScript. The main elements include a simple player object represented as a rectangle that can jump, and obstacles that move from the right side of the canvas toward the player. The game’s difficulty increases as the score rises: obstacle speed gradually accelerates and new obstacles appear at random intervals.

If the player collides with an obstacle, the game pauses for 3 seconds before restarting. The ultimate goal is to reach a score of 99999, at which point the player wins the game, and further gameplay is disabled.

## Getting Started

### Prerequisites

To run this game, you will need to serve it from a local server. If you're using VS Code, you can install the Live Server extension to quickly set up a local server.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/andrejcode/simple-jumping-game
   ```

2. Navigate to the project directory:

   ```bash
   cd simple-jumping-game
   ```

3. Start a local server:

   - If using VS Code: Open the project in VS Code, right-click the index.html file, and select Open with Live Server (make sure the Live Server extension is installed).

4. Open the game in your browser:
   - If using VS Code Live Server, it will automatically open the game in your browser.
