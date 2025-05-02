function gameBoard() {
    const rows = 3
    const columns = 3
    const board = []

    for (let i = 0; i < rows; i++) {
        board[i] = []
        for (let j = 0; j < columns; j++) {
            board[i].push('test')
        }
    }

    return board
}

gameBoard()









const testButton = document.querySelector('.test-button')

testButton.addEventListener('click', () => {
    console.log('hhhhh')
    gameBoard()
})
