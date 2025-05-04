function gameBoard() {
    const rows = 3
    const columns = 3
    const board = []

    for (let i = 0; i < rows; i++) {
        board[i] = []
        for (let j = 0; j < columns; j++) {
            board[i].push(cell())
        }
    }

    const getBoard = () => board

    const addMarker = (row, column, player) => {
        const chosenCell = board[row][column].getValue()
        // const chosenCellValue = chosenCell.getValue()
        // console.log(chosenCell)

        if (chosenCell === 1 || chosenCell === 2) {
            console.log('error, choose a free cell')            
        } 
        if (chosenCell === 0) {
            board[row][column].markCell(player)
        }
        // return chosenCell
    }

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => {
            return row.map((cell) => cell.getValue())
        })
        console.log(boardWithCellValues)
    }

    return {getBoard, addMarker, printBoard}
}

function cell() {
    let value = 0

    const markCell = (player) => value = player
    const getValue = () => value

    return {markCell, getValue}
}

const game = gameBoard()
game.addMarker(1,2,'harry')
game.printBoard()








const testButton = document.querySelector('.test-button')

testButton.addEventListener('click', () => {
    console.log('hhhhh')
    gameBoard()
})
