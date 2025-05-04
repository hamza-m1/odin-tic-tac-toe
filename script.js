function gameBoard() {
    const rows = 3
    const columns = 3
    const board = []

    for (let i = 0; i < rows; i++) {
        board[i] = []
        for (let j = 0; j < columns; j++) {
            board[i].push(`row:${i}, column:${j}`)
            //push(cell())
        }
    }

    const getBoard = () => board

    const addMarker = (row, column, player) => {
        const chosenCell = board[row][column]
        // console.log(chosenCell)

        if (chosenCell === 0) {
            console.log('error, choose a free cell')
        }

        if (chosenCell === 1 || chosenCell === 2) {
            //markCell(player)
        }
        return chosenCell
    }

    return {getBoard, addMarker}
}


gameBoard().addMarker(1,2,'harry')
// console.log(gameBoard().addMarker())







const testButton = document.querySelector('.test-button')

testButton.addEventListener('click', () => {
    console.log('hhhhh')
    gameBoard()
})
