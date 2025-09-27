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
  },
  getGameBoard() {
    return this.gameboard;
  },
  populateBoard(player, index) {
    this.getGameBoard()[index.row][index.col] = player.choice;
    console.log(this.getGameBoard()[index.row][index.col]);
  },
};
const Players = {
  player1: { choice: "O", name: "Player1", score: 0 },
  player2: { choice: "X", name: "Player2", score: 0 },
};
const displayController = {
  initUIBoard() {
    let container = document.querySelector(".container");
    if (container.childElementCount)
      container.removeChild(container.firstElementChild);
    let boardNode = document.createElement("div");
    boardNode.classList.add("board");
    Gameboard.getGameBoard().forEach((row, i) => {
      let rowNode = document.createElement("div");
      rowNode.classList.add("row");
      row.forEach((cell, j) => {
        let cellNode = document.createElement("div");
        cellNode.classList.add("cell");
        cellNode.setAttribute("data-row", i);
        cellNode.setAttribute("data-col", j);
        cellNode.addEventListener("click", () =>
          displayController.clickHandler(i, j)
        );
        rowNode.appendChild(cellNode);
      });
      boardNode.appendChild(rowNode);
    });
    container.appendChild(boardNode);
  },
  populateUIBoard(player, index) {
    let cell = document.querySelector(
      `[data-row="${index.row}"][data-col="${index.col}"]`
    );
    cell.textContent = player.choice;
    console.log(cell);
  },
  clickHandler(row, col) {
    console.log(`Clicked cell [${row}, ${col}]`);
    if (!Controller.cellOccupied(row, col))
      this.populateUIBoard(Controller.playerTurn, { row, col });
    Controller.p1TurnOver = true;
  },
  resetUIBoard() {
    let rows = document.querySelectorAll(".row");
    rows.forEach((row) => {
      row.childNodes.forEach((cell) => {
        cell.textContent = "";
      });
    });
  },
};
const Controller = {
  playerTurn: Players.player1,
  p1TurnOver: false,
  roundCount: 0,
  startGame() {
    console.clear();
    Gameboard.resetGameboard();
    Gameboard.initGameboard();
    displayController.initUIBoard();
    this.playGame();
  },
  playGame() {
    while (this.roundCount < 3 || !this.winCondition()) {
      if (this.checkDraw()) break;
      this.turnToggler();
    }
    this.displayWinner();
  },
  checkDraw() {
    return this.roundCount === 5 && !this.winCondition();
  },
  turnToggler() {
    if (this.playerTurn === Players.player1) {
      this.getPlayer1Choice();
      if (this.roundCount >= 3 && this.winCondition()) {
        return;
      }
      this.playerTurn = Players.player2;
    } else {
      this.getPlayer2Choice();
      if (this.roundCount >= 3 && this.winCondition()) {
        return;
      }
      this.playerTurn = Players.player1;
    }
  },
  displayWinner() {
    if (this.checkDraw()) {
      console.log("DRAW");
    } else {
      this.playerTurn.score++;
      console.log(
        `Game-Over \nThe Winner is ${this.playerTurn.name} (${this.playerTurn.choice})`
      );
    }
    console.log(
      `Scoreboard\n ${Players.player1.name} = ${Players.player1.score} | ${Players.player2.name} = ${Players.player2.score}`
    );
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
  getPlayer1Choice() {
    // let row;
    // let col;
    // // do {
    // //   row = parseInt(prompt("Enter row index [0, 1 or 2]", 1));
    // //   col = parseInt(prompt("Enter col index [0, 1 or 2]", 1));
    // //   if (!row || !col) break;
    // // } while (this.isInValidIndex(row, col) || this.cellOccupied(row, col));
    // //Create random index s.t. they are not occupied already
    // do {
    //   row = Math.floor(Math.random() * 3);
    //   col = Math.floor(Math.random() * 3);
    // } while (this.cellOccupied(row, col));
    Gameboard.populateBoard(this.playerTurn, { row, col });
    displayController.populateUIBoard(this.playerTurn, { row, col });
    console.log("Player1");
    console.table(Gameboard.getGameBoard());
    this.roundCount++;
  },
  getPlayer2Choice() {
    let row;
    let col;
    //Create random index s.t. they are not occupied already
    do {
      row = Math.floor(Math.random() * 3);
      col = Math.floor(Math.random() * 3);
    } while (this.cellOccupied(row, col));
    Gameboard.populateBoard(this.playerTurn, { row, col });
    displayController.populateUIBoard(this.playerTurn, { row, col });
    console.log("Player2");
    console.table(Gameboard.getGameBoard());
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
