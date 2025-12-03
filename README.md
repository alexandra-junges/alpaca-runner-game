# 🦙 Alpaca Runner Game

Click here to play the deployed game - not ready yet

## 📖 Description

The Alpaca Runner Game is a simple, browser-based game built using vanilla JavaScript, HTML, and CSS, inspired by the Google Dino Runner. The goal is to guide the alpaca character as it runs, avoiding various obstacles and collecting power-ups to gain extra lives.

## ✨ Minimum Viable Product (MVP) - Implemented Features

The game is now defined by these features:

- Three Main Screens: The Start Screen, the main Game Screen, and a Game Over Screen.

- Player Control: Spacebar is used for the Alpaca to jump over obstacles.

- Movement Simulation: The continuous sense of running is achieved using a parallax scrolling background.

- Game Logic & Entities:

    - Score Tracking: Points are awarded for successfully jump over an obstacle without collision.

    - High Score Board: Implemented the storage, retrieval, and display of the top 3 high scores and the player names using local storage.

    - Multiple Obstacles: An array manages different obstacle types (rocks, cactus) on the track.

    - Lives System: A system tracks and displays player lives.

    - Power-up: Donuts act as a power-up, granting the player extra lives upon acquisition.

- Object-Oriented Structure: The code is organized into six functional JavaScript Classes.

## 🚧 Backlog - Future Improvements

*List of features to implement after the current MVP is stable.*

- Implement the double-jump mechanic for added player agility.

- Introduce more complex obstacles like fast-moving fences and tricky river jumps.

## ⚙️ Data Structure

The application is structured using six primary JavaScript classes:

- Script Class: Manages initialization and global event listeners (like the spacebar listener).

- Game Class: Manages the overall game state, the primary game loop (requestAnimationFrame), and screen transitions.

- Player Class: Represents the Alpaca character, handling jump mechanics, position, and collision properties.

- Lives Class: Dedicated class for managing and displaying the player's remaining health/lives count.

- Obstacles Class: Handles the generation, movement, and collision logic for all obstacles (rocks, cactus).

- Powerup Class: Handles the generation, movement, and collection logic for bonuses (donuts).

## 🖥️ States and Transitions (Views)

The game has three main states (screens) managed by DOM manipulation:

1. START: The initial state. Displays the logo/title, input for adding the players name and a "Start Game" button. Transitions to **GAME**.

2. GAME: The active play state. Displays the player, obstacles, score, and lives. Transitions to **GAME_OVER**.

3. GAME_OVER: The end state. Displays the final score, a form for the player's name (if they achieved a high score), the list of the top 3 high scores, and a "Play Again" button. Transitions back to **START**.

## 📝 Task Prioritization

Tasks are prioritized using the Kanban method.

Refer to the Kanban board for the complete, prioritized task list.

## 🔗 Links

([Kanban Development Board](https://trello.com/b/1rb1ZCET/alpaca-game))

([GitHub Repository](https://github.com/alexandra-junges/alpaca-runner-game/tree/main))

([Deployment](Link))