let currentPlayer = 'X';
let cells = document.querySelectorAll('.cell');
let gameActive = true;

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleClick(cellIndex) {
  if (!gameActive || cells[cellIndex].textContent !== '') return;

  cells[cellIndex].textContent = currentPlayer;
  checkResult();
  togglePlayer();
}

function togglePlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkResult() {
  for (let i = 0; i < winPatterns.length; i++) {
    const [a, b, c] = winPatterns[i];
    if (
      cells[a].textContent &&
      cells[a].textContent === cells[b].textContent &&
      cells[a].textContent === cells[c].textContent
    ) {
      gameActive = false;
      highlightWin(winPatterns[i]);
      displayMessage(`Player ${currentPlayer} wins!`);
      return;
    }
  }
  if (![...cells].some(cell => cell.textContent === '')) {
    gameActive = false;
    displayMessage("It's a draw!");
  }
}

function displayMessage(message) {
  document.getElementById('message').textContent = message;
}

function highlightWin(winPattern) {
  winPattern.forEach(index => {
    cells[index].classList.add('win');
  });
}

function resetGame() {
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('win');
  });
  gameActive = true;
  currentPlayer = 'X';
  displayMessage('');
}
