// Set up variables
const squares = document.querySelectorAll('.square');
const message = document.getElementById('message');
const resetButton = document.getElementById('reset-button');
let board = ['', '', '', '', '', '', '', '', ''];
let player = 'X';
let winner = null;

// Add click event listeners to squares
squares.forEach((square, index) => {
  square.addEventListener('click', () => {
    if (winner || board[index]) return;

    square.classList.add(player);
    board[index] = player;

    checkWinner();
    switchPlayer();
    updateMessage();
  });
});

// Add click event listener to reset button
resetButton.addEventListener('click', () => {
  resetGame();
});

// Check if there is a winner
const checkWinner = () => {
  const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let line of winningLines) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      winner = player;
      return;
    }
  }

  if (board.every((square) => square !== '')) {
    winner = 'Tie';
  }
};

// Switch player after each turn
const switchPlayer = () => {
  player = player === 'X' ? 'O' : 'X';
};

// Update the message at the top of the page
const updateMessage = () => {
  if (winner) {
    if (winner === 'Tie') {
      message.innerHTML = `It's a tie!`;
    } else {
      message.innerHTML = `Player ${winner} has won!`;
    }
  } else {
    message.innerHTML = `Player ${player}'s turn`;
  }
};

// Reset the game
const resetGame = () => {
  board = ['', '', '', '', '', '', '', '', ''];
  player = 'X';
  winner = null;
  squares.forEach((square) => {
    square.classList.remove('X');
    square.classList.remove('O');
  });
  updateMessage();
};
