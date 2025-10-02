const Gameboard = {
  gameboard: [],
  initGameboard() {
    for (let i = 0; i < 3; i++) {
      this.gameboard.push([]);
      for (let j = 0; j < 3; j++) {
        this.gameboard[i].push("");
      }
    }
  },
  resetGameboard() {
    this.gameboard = [];
    Controller.playerTurn = Players.player1;
    Controller.roundCount = 0;
    displayController.resetResults();
  },
  getGameBoard() {
    return this.gameboard;
  },
  populateBoard(player, index) {
    this.getGameBoard()[index.row][index.col] = player.choice;
  },
};
const Players = {
  player1: { choice: "O", name: "Player1", score: 0 },
  player2: { choice: "X", name: "Player2", score: 0 },
};
const displayController = {
  initUIBoard() {
    let gameContainer = document.querySelector(".game-container");
    let boardNode = document.createElement("div");
    if (gameContainer.childElementCount)
      gameContainer.removeChild(gameContainer.firstChild);

    boardNode.classList.add("board");
    Gameboard.getGameBoard().forEach((row, i) => {
      let rowNode = document.createElement("div");
      rowNode.classList.add("row");
      row.forEach((_, j) => {
        let cellNode = document.createElement("div");
        cellNode.classList.add("cell");
        cellNode.setAttribute("data-row", i);
        cellNode.setAttribute("data-col", j);
        cellNode.addEventListener("click", this.clickHandler);
        rowNode.appendChild(cellNode);
      });
      boardNode.appendChild(rowNode);
    });
    gameContainer.appendChild(boardNode);
  },
  populateUIBoard(player, cell) {
    if (player === Players.player2) {
      cell.classList.add("redText");
    }
    cell.textContent = player.choice;
  },
  clickHandler(event) {
    let cell = event.target;
    let row = cell.getAttribute("data-row");
    let col = cell.getAttribute("data-col");
    if (!Controller.cellOccupied(row, col)) {
      Gameboard.populateBoard(Controller.playerTurn, { row, col });
      displayController.populateUIBoard(Controller.playerTurn, cell);
    }
    Controller.turnToggler();
  },
  resetUIBoard() {
    let rows = document.querySelectorAll(".row");
    rows.forEach((row) => {
      row.childNodes.forEach((cell) => {
        cell.textContent = "";
      });
    });
  },
  removeEventListeners() {
    let cells = document.querySelectorAll(".cell");
    cells.forEach((cell) =>
      cell.removeEventListener("click", this.clickHandler)
    );
  },
  showResults(results, scores) {
    let resultsDiv = document.querySelector(".results");
    let p1_scoreDiv = document.querySelector(".player1>.player-score");
    let p2_scoreDiv = document.querySelector(".player2>.player-score");
    resultsDiv.innerText = results;
    p1_scoreDiv.textContent = p1_scoreDiv.textContent
      .slice(0, -1)
      .concat(scores.player1_score);
    p2_scoreDiv.textContent = p2_scoreDiv.textContent
      .slice(0, -1)
      .concat(scores.player2_score);
  },
  resetResults() {
    let results = document.querySelector(".results");
    results.textContent = "";
  },
};
const Controller = {
  playerTurn: Players.player1,
  roundCount: 0,
  startGame() {
    console.clear();
    Gameboard.resetGameboard();
    Gameboard.initGameboard();
    displayController.initUIBoard();
  },
  checkDraw() {
    return this.roundCount === 5;
  },
  turnToggler() {
    if (this.playerTurn === Players.player1) {
      this.roundCount++;
      if (this.winCondition() || this.checkDraw()) {
        this.displayWinner();
      }
      this.playerTurn = Players.player2;
    } else {
      if (this.winCondition() || this.checkDraw()) {
        this.displayWinner();
      }
      this.playerTurn = Players.player1;
    }
  },
  displayWinner() {
    let results = "Game-Over ";
    let scores;
    if (this.checkDraw()) {
      results += "Draw";
    } else {
      this.playerTurn.score++;
      this.roundCount = 0;
      results += `The Winner is ${this.playerTurn.name} (${this.playerTurn.choice})`;
    }
    displayController.removeEventListeners();
    scores = {
      player1_score: Players.player1.score,
      player2_score: Players.player2.score,
    };
    displayController.showResults(results, scores);
  },
  isInValidIndex(row, col) {
    return (
      Number.isNaN(row) ||
      Number.isNaN(col) ||
      row < 0 ||
      row > 2 ||
      col < 0 ||
      col > 2
    );
  },
  winCondition() {
    //each row check
    let win = false;
    let mark = this.playerTurn.choice;
    let horWin = Gameboard.getGameBoard().map((row) =>
      row.every((cell) => cell === mark)
    );
    win = horWin.some((result) => result);
    //return early if already won
    if (win) return win;

    //each column check
    let columns = [[], [], []];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        columns[i].push(Gameboard.getGameBoard()[j][i]);
      }
    }
    let vertWin = columns.map((col) => col.every((cell) => cell === mark));
    win = vertWin.some((result) => result);
    //return early if already won
    if (win) return win;

    //each diagonal check
    let diagonals = [[], []];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (i === j) {
          diagonals[0].push(Gameboard.getGameBoard()[i][j]);
        }
        if (i + j === 2) {
          diagonals[1].push(Gameboard.getGameBoard()[i][j]);
        }
      }
    }
    let diagWin = diagonals.map((diag) => diag.every((cell) => cell === mark));
    win = diagWin.some((result) => result);

    //return regardless of win
    return win;
  },
  cellOccupied(row, col) {
    return !!Gameboard.getGameBoard()[row][col];
  },
};
//Pre-start the game
Controller.startGame();
let startBtn = document.querySelector(".startBtn");
//replay game on click
startBtn.addEventListener("click", Controller.startGame);
