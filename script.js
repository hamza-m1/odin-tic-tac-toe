function GameBoard() {
  const rows = 3;
  const columns = 3;
  const board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(Cell());
    }
  }

  const resetBoard = () => {
    board.forEach((row) => {
      row.forEach((cell) => {
        cell.markCell(0);
      });
    });
  };

  let gameMessages = {
    mes: "",
  };
  const getGameMessages = () => gameMessages;
  const clearMessage = () => (gameMessages.mes = "");

  const getBoard = () => board;

  const addMarker = (row, column, playerMarker) => {
    let chosenCell = board[row][column].getValue();

    if (chosenCell === "o" || chosenCell === "x") {
      gameMessages.mes = "error, choose a free Cell";
      return "error";
    } else if (chosenCell === 0) {
      board[row][column].markCell(playerMarker);
    }
  };

  const printBoard = () => {
    const boardWithCellValues = board.map((row) => {
      return row.map((Cell) => Cell.getValue());
    });
  };

  const getBoardWithMarks = () => {
    return board.map((row) => {
      return row.map((Cell) => Cell.getValue());
    });
  };

  const getBoardWithMarksColumn = () => {
    let column1 = [];
    let column2 = [];
    let column3 = [];
    board.forEach((row) => {
      column1.push(row[0].getValue());
      column2.push(row[1].getValue());
      column3.push(row[2].getValue());
    });
    const columnBoard = [column1, column2, column3];
    return columnBoard;
  };

  return {
    getBoard,
    addMarker,
    printBoard,
    getBoardWithMarks,
    getBoardWithMarksColumn,
    getGameMessages,
    clearMessage,
    resetBoard,
  };
}

function Cell() {
  let value = 0;

  const markCell = (player) => (value = player);
  const getValue = () => value;

  return { markCell, getValue };
}

function GameController(playerOne = "Player One", playerTwo = "Player Two") {
  const players = [
    {
      name: playerOne,
      mark: "o",
      wentFirst: true,
      score: 0,
    },
    {
      name: playerTwo,
      mark: "x",
      score: 0,
    },
  ];

  const board = GameBoard();
  const gameMessages = board.getGameMessages();
  let activePlayer = players[0];
  let gameOver = false;
  let round = 0;

  const switchActivePlayer = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const getActivePlayer = () => activePlayer;

  const getPlayers = () => players;

  const getPlayerOneScore = () => players[0].score;

  const getPlayerTwoScore = () => players[1].score;

  const isGameOver = () => gameOver;

  const resetIsGameOver = () => (gameOver = false);

  const roundCount = () => round;

  const resetRoundCount = () => (round = 0);

  const printNewRound = () => {
    board.printBoard();
  };

  const checkForWinner = () => {
    let winCheck = false;
    const boardArrayRows = board.getBoardWithMarks();
    const boardArrayColumns = board.getBoardWithMarksColumn();

    boardArrayRows.forEach((row) => {
      if (row[0] === row[1] && row[1] === row[2] && row[0] !== 0) {
        winCheck = true;
        return;
      }
    });

    boardArrayColumns.forEach((col) => {
      if (col[0] === col[1] && col[1] === col[2] && col[0] !== 0) {
        winCheck = true;
        return;
      }
    });

    const diagonal1 = [
      boardArrayRows[0][0],
      boardArrayRows[1][1],
      boardArrayRows[2][2],
    ];

    const diagonal2 = [
      boardArrayRows[0][2],
      boardArrayRows[1][1],
      boardArrayRows[2][0],
    ];

    const allEqual = (arr) => arr.every((v) => v === arr[0]);
    if (allEqual(diagonal1) && diagonal1[0] !== 0) winCheck = true;
    if (allEqual(diagonal2) && diagonal2[0] !== 0) winCheck = true;

    return winCheck;
  };

  const playRound = (row, column) => {
    if (gameOver) return;

    const errorCheck = board.addMarker(row, column, getActivePlayer().mark);
    if (errorCheck === "error") return;

    round++;

    if (checkForWinner()) {
      board.printBoard();
      gameMessages.mes = `${getActivePlayer().name} WINS`;
      activePlayer.score += 1;
      gameOver = true;
    } else if (round > 8) {
      board.printBoard();
      gameMessages.mes = `It's a draw...`;
      gameOver = true;
    } else {
      switchActivePlayer();
      printNewRound();
    }
  };

  return {
    getActivePlayer,
    switchActivePlayer,
    getPlayers,
    playRound,
    isGameOver,
    roundCount,
    getBoard: board.getBoard,
    getGameMessages: board.getGameMessages,
    clearMessage: board.clearMessage,
    resetBoard: board.resetBoard,
    resetRoundCount,
    resetIsGameOver,
    getPlayerOneScore,
    getPlayerTwoScore,
  };
}

function ScreenController() {
  const game = GameController();
  const playerTurnDiv = document.querySelector(".turn");
  const boardDiv = document.querySelector(".board");
  const gameMessagesDiv = document.querySelector(".gameMessages");
  const buttonsDiv = document.querySelector(".buttons");
  const playerOneContainer = document.querySelector(".playerOneContainer");
  const playerTwoContainer = document.querySelector(".playerTwoContainer");

  const updateScores = () => {
    playerOneContainer.textContent = "";
    playerTwoContainer.textContent = "";

    const playerOneName = document.createElement("p");
    playerOneName.textContent = game.getPlayers()[0].name;
    playerOneName.classList.add("playerName");
    const playerOneScore = document.createElement("p");
    playerOneScore.textContent = `Score: ${game.getPlayerOneScore()}`;
    playerOneScore.classList.add("score");
    playerOneContainer.appendChild(playerOneName);
    playerOneContainer.appendChild(playerOneScore);

    const playerTwoName = document.createElement("p");
    playerTwoName.textContent = game.getPlayers()[1].name;
    playerTwoName.classList.add("playerName");
    const playerTwoScore = document.createElement("p");
    playerTwoScore.textContent = `Score: ${game.getPlayerTwoScore()}`;
    playerTwoScore.classList.add("score");
    playerTwoContainer.appendChild(playerTwoName);
    playerTwoContainer.appendChild(playerTwoScore);
  };

  const updateScreen = () => {
    boardDiv.textContent = "";
    updateScores();

    const board = game.getBoard();
    const activePlayer = game.getActivePlayer();

    playerTurnDiv.textContent = `${activePlayer.name}'s turn...`;

    board.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const cellButton = document.createElement("button");
        cellButton.classList.add("cell");
        cellButton.dataset.rowCoord = +rowIndex;
        cellButton.dataset.colCoord = +colIndex;
        cellButton.textContent = cell.getValue() === 0 ? "" : cell.getValue();
        boardDiv.appendChild(cellButton);
      });
    });
  };

  const updateMessages = () => {
    gameMessagesDiv.textContent = "";

    const gameMessages = game.getGameMessages();

    if (gameMessages.mes !== "" && !game.isGameOver()) {
      const MessageP = document.createElement("p");
      MessageP.textContent = gameMessages.mes;
      MessageP.classList.add("errorMes");
      gameMessagesDiv.appendChild(MessageP);
    }
    if (game.isGameOver()) {
      const messageP = document.createElement("p");
      messageP.textContent = gameMessages.mes;
      gameMessagesDiv.appendChild(messageP);
    }

    game.clearMessage();
  };

  function clickHandlerBoard(e) {
    const rowCoord = e.target.dataset.rowCoord;
    const colCoord = e.target.dataset.colCoord;

    if (!rowCoord) return;

    if (game.isGameOver()) return;
    game.playRound(+rowCoord, +colCoord);
    updateScreen();
    updateMessages();
  }

  function resetClickHandler(e) {
    game.resetBoard();
    const players = game.getPlayers();
    if (players[0].wentFirst && game.getActivePlayer() === players[0]) {
      game.switchActivePlayer();
    } else if (!players[0].wentFirst && game.getActivePlayer() === players[1]) {
      game.switchActivePlayer();
    }
    players[0].wentFirst = !players[0].wentFirst;
    game.resetRoundCount();
    game.resetIsGameOver();
    updateScreen();
    updateMessages();
  }

  boardDiv.addEventListener("click", clickHandlerBoard);
  buttonsDiv.addEventListener("click", resetClickHandler);
  updateScreen();
  updateMessages();
}

ScreenController();
