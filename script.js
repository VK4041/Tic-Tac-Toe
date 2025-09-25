const Gameboard = {
    gameboard: [],
    createGameBoard() {
        for (let i = 0; i < 3; i++) {
            this.gameboard.push([])
            for (let j = 0; j < 3; j++) {
                this.gameboard[i].push('')
            }
        }
    },
    getGameBoard() {
        return this.gameboard
    }
}
const Players = {
    player1: { choice: 'O', name: 'Player1' },
    playerCpu: { choice: 'X', name: 'CPU' }
}
const Controller = {
    displayController: function () {
        Gameboard.createGameBoard()
        Gameboard.getGameBoard()
        console.log(this.playerTurn)
        let row = prompt('Enter row index')
        let col = prompt('Enter col index')
        //let playerTurn be player1 for now
        
        this.populateBoard(this.playerTurn, row, col)
        console.log(Gameboard.getGameBoard())
    },
    playerTurn: Players.player1,
    populateBoard(player, row = 1, col = 1) {
        Gameboard.getGameBoard()[row][col] = player.choice
        console.log(Gameboard.getGameBoard()[row][col])

        // if (Gameboard.getGameBoard()[row][col])
    }
}
Controller.displayController()