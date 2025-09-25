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
  getGameBoard() {
    return this.gameboard;
  },
  populateBoard(player, index) {
    this.getGameBoard()[index.row][index.col] = player.choice;
    console.log(this.getGameBoard()[index.row][index.col]);
  },
};
const Players = {
  player1: { choice: "O", name: "Player1" },
  player2: { choice: "X", name: "Player2" },
};
const Controller = {
  playerTurn: Players.player1,
  displayController() {
    console.clear();
    Gameboard.initGameboard();
    this.playGame();
  },
  playGame() {
    while (!this.winCondition()) {
      this.turnToggler();
    }
    this.displayWinner();
  },
  displayWinner() {
    console.log(
      `Winner is ${this.playerTurn.name} (${this.playerTurn.choice})\nGame-Over`
    );
  },
  turnToggler() {
    if (this.playerTurn === Players.player1) {
      this.getPlayer1Choice();
      this.playerTurn = Players.player2;
    } else {
      this.getPlayer2Choice();
      this.playerTurn = Players.player1;
    }
  },
  getPlayer1Choice() {
    let row;
    let col;
    do {
      row = parseInt(prompt("Enter row index [0, 1 or 2]", 1));
      col = parseInt(prompt("Enter col index [0, 1 or 2]", 1));
      if (!row || !col) break;
    } while (this.isInValidIndex(row, col) || this.cellOccupied(row, col));

    Gameboard.populateBoard(this.playerTurn, { row, col });
    console.log("Player1");
    console.table(Gameboard.getGameBoard());
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
  getPlayer2Choice() {
    let row;
    let col;
    //Create random index s.t. they are not occupied already
    do {
      row = Math.floor(Math.random() * 3);
      col = Math.floor(Math.random() * 3);
    } while (this.cellOccupied(row, col));
    let player2Choice = { row, col };
    this.winCondition(this.playerTurn);
    Gameboard.populateBoard(this.playerTurn, player2Choice);
    console.log("Player2");
    console.table(Gameboard.getGameBoard());
  },
  winCondition() {
    //each row check
    let mark = this.playerTurn.choice;
    let rowCheck = Gameboard.getGameBoard().map((row) =>
      row.every((cell) => cell === mark)
    );
    return rowCheck.some((result) => result);
  },
  cellOccupied(row, col) {
    return !!Gameboard.getGameBoard()[row][col];
  },
};
Controller.displayController();
