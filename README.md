# Tic-Tac-Toe

**Live Preview:** [https://vk4041.github.io/Tic-Tac-Toe/](https://vk4041.github.io/Tic-Tac-Toe/)

<img width="1889" height="907" alt="image" src="https://github.com/user-attachments/assets/e22c9449-8ecc-4f09-8512-36f2a4a1b1aa" />


A two-player Tic-Tac-Toe game built with vanilla JavaScript using the module pattern. Includes score persistence across rounds and programmatic board generation.

## 🎮 How to Play

1. Player 1 (O) goes first
2. Click any empty cell to place your mark
3. Players alternate turns
4. Get 3 in a row (horizontal, vertical, or diagonal) to win
5. Click **Replay** to start a new round

## ✨ Features

- Two-player local gameplay
- Score tracking across multiple rounds
- Win detection (rows, columns, diagonals)
- Draw detection
- Dynamic board generation with JavaScript
- Replay functionality

## 🏗️ Project Structure

```
Tic-Tac-Toe/
├── index.html       # HTML structure
├── script.js        # Game logic
├── styles.css       # Styling
└── README.md
```

## 🛠️ Implementation

### Module Pattern
- `Gameboard`: Manages 3×3 game state
- `Players`: Player data (choice, name, score)
- `displayController`: UI rendering and event handling
- `Controller`: Game logic and win conditions

### Key Functions
- `initGameboard()`: Creates empty 3×3 array
- `winCondition()`: Checks rows, columns, and diagonals
- `turnToggler()`: Alternates between players
- `displayWinner()`: Shows results and updates scores

### Win Detection
Checks all possible winning combinations:
- 3 horizontal rows
- 3 vertical columns
- 2 diagonals

## 👨‍💻 Author

**Varun Kumar** - [@VK4041](https://github.com/VK4041)

---

**Built with**: Vanilla JavaScript • HTML5 • CSS3
