function GameBoard() {
    const rows = 3
    const columns = 3
    const board = []

    for (let i = 0; i < rows; i++) {
        board[i] = []
        for (let j = 0; j < columns; j++) {
            board[i].push(Cell())
        }
    }

    const getBoard = () => board

    const addMarker = (row, column, player) => {
        let chosenCell = board[row][column].getValue()

        if (chosenCell === 1 || chosenCell === 2) {
            console.log('error, choose a free Cell')
            return
        } 
        if (chosenCell === 0) {
            board[row][column].markCell(player)
        }
    }

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => {
            return row.map((Cell) => Cell.getValue())
        })
        console.log(boardWithCellValues)
    }

    return {getBoard, addMarker, printBoard}
}

function Cell() {
    let value = 0

    const markCell = (player) => value = player
    const getValue = () => value

    return {markCell, getValue}
}

function GameController(playerOne = 'Player One', playerTwo = 'Player Two') {
    const players = [{
        name: playerOne,
        mark: 1
    }, {
        name: playerTwo,
        mark: 2
    }]
    const board = GameBoard()

    let activePlayer = players[0]

    const switchActivePlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0]
    }

    const getActivePlayer = () => activePlayer

    const printNewRound = () => {
        board.printBoard()
        console.log(`${getActivePlayer().name}'s turn. `)
    }

    return {getActivePlayer, switchActivePlayer, printNewRound}
}





const game = GameBoard()
// game.addMarker(1,2,1)
// game.printBoard()

const gc = GameController()
gc.printNewRound()

// game.addMarker(1,2,2)
// game.printBoard()





const testButton = document.querySelector('.test-button')

testButton.addEventListener('click', () => {
    console.log('hhhhh')
    GameBoard()
})
