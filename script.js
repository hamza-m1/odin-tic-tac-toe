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

    const addMarker = (row, column, playerMarker) => {
        let chosenCell = board[row][column].getValue()

        if (chosenCell === 1 || chosenCell === 2) {
            console.log('error, choose a free Cell')
            return 'error'
        } 
        if (chosenCell === 0) {
            board[row][column].markCell(playerMarker)
        }
    }

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => {
            return row.map((Cell) => Cell.getValue())
        })
        console.table(boardWithCellValues)
    }

    const getBoardWithMarks = () => {
        return board.map((row) => {
            return row.map((Cell) => Cell.getValue())
        })
    }

    const getBoardWithMarksColumn = () => {
        let column1 = []
        let column2 = []
        let column3 = []
        board.forEach((row) => {
            column1.push(row[0].getValue())
            column2.push(row[1].getValue())
            column3.push(row[2].getValue())
        })
        const columnBoard = [column1, column2, column3]
        return columnBoard
    }

    return {
        getBoard, 
        addMarker, 
        printBoard, 
        getBoardWithMarks, 
        getBoardWithMarksColumn
    }
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

    const checkForWinner = () => {
        let winCheck = false
        const boardArrayRows = board.getBoardWithMarks()
        const boardArrayColumns = board.getBoardWithMarksColumn()
        
        boardArrayRows.forEach((row) => {
            if (row[0] === row[1] && row[1] === row[2] && row[0] !== 0) {
                winCheck = true
                console.log('AAAAAAAAAAAAAaaaaaaaaaaaaaaaa')
                return
            }
        })

        boardArrayColumns.forEach((col) => {
            if (col[0] === col[1] && col[1] === col[2] && col[0] !== 0) {
                winCheck = true
                console.log('AAAAAAAAAAAAAaaaaaaaaaaaaaaaa colllll')
                return
            }
        })




    }

    const playRound = (row, column) => {
        console.log(`Adding ${getActivePlayer().name}'s mark to row:${row+1} column:${column+1} ...`)
        
        const errorCheck = board.addMarker(row, column, getActivePlayer().mark)
        if (errorCheck === 'error') return

        checkForWinner()

        switchActivePlayer()
        printNewRound()

    }

    return {getActivePlayer, switchActivePlayer, printNewRound, playRound}
}





// const game = GameBoard()
// console.log(game.getBoardWithMarksColumn())
// game.addMarker(1,2,1)
// game.printBoard()

const gc = GameController()
gc.playRound(0,0)
gc.playRound(1,1)
gc.playRound(2,2)
gc.playRound(2,1)
gc.playRound(0,2)
gc.playRound(0,1)








// game.addMarker(1,2,2)
// game.printBoard()





const testButton = document.querySelector('.test-button')

testButton.addEventListener('click', () => {
    console.log('hhhhh')
    GameBoard()
})
