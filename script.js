const X_CLASS = "x";
const CIRCLE_CLASS = "circle";
const WINNIG_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 8, 4],
  [2, 4, 6]
];
const cellEl = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const winMesEl = document.getElementById("winning-message");
const winMesTextEl = document.querySelector("[data-winning-message]");
const restartButton = document.getElementById("restartButton");
let circleTurn;

startGame();

restartButton.addEventListener("click", startGame);

function startGame() {
  circleTurn = false;
  cellEl.forEach(cell => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  setBoardHoverClass();
  winMesEl.classList.remove("show");
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setBoardHoverClass();
  }
}

function isDraw() {
  return [...cellEl].every(cell => {
    return (
      cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    );
  });
}

function endGame(draw) {
  if (draw) {
    winMesTextEl.innerText = "Draw!";
  } else {
    winMesTextEl.innerText = `${circleTurn ? "O's" : "X's"} Wins!`;
  }
  winMesEl.classList.add("show");
}
function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurns() {
  circleTurn = !circleTurn;
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}

function checkWin(currentClass) {
  return WINNIG_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cellEl[index].classList.contains(currentClass);
    });
  });
}
