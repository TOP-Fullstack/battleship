export function createDOM(size) {
  const gameArea = document.querySelector(".game-area");
  const DOMboard = document.createElement("div");
  const DOM = [];
  DOMboard.className = "grid";
  for (let y = 0; y < size; y++) {
    const row = [];
    for (let x = 0; x < size; x++) {
      const DOMsquare = document.createElement("div");
      DOMboard.appendChild(DOMsquare);
      row.push(DOMsquare);
    }
    DOM.push(row);
  }
  gameArea.appendChild(DOMboard);
  return DOM;
}

export function allowClicks(attacker, defender, isComputer = false) {
  // Save references to specific pieces of the boards
  const length = defender.board.domBoard.length;
  const domBoard = defender.board.domBoard;
  const logicBoard = defender.board.logicBoard;
  const winnerDisplay = document.querySelector(".winner-display");
  const winner = document.querySelector(".winner-display > h1 > span");

  // Add event listeners to each dom board's piece to allow a user to attack by clicking
  for (let row = 0; row < length; row++) {
    for (let column = 0; column < length; column++) {
      domBoard[row][column].addEventListener("click", () => {
        // Make sure it is the appropriate player's turn,
        // make sure piece being attacked hasn't already been attacked
        if (attacker.turn && typeof logicBoard[row][column] != "number") {
          // If the defender has been initialized as computer, have them
          // attack a random square after attacker attacks
          if (isComputer) {
            attacker.attack(row, column, defender.board);
            defender.randomAttack(attacker.board);
          } else {
            attacker.attack(row, column, defender.board);
            attacker.turn = false;
            defender.turn = true;
          }

          if (defender.board.isGameOver()) {
            winner.innerHTML = attacker.username;
            winnerDisplay.style.visibility = "visible";
          }
        }
      });
    }
  }
}

export const resetBoard = (user) => {
  const length = user.board.domBoard.length;
  const logicBoard = user.board.logicBoard;
  document.querySelector(".grid").remove();
  document.querySelector(".grid").remove();

  // Reset player1 board
  for (let row = 0; row < length; row++) {
    for (let column = 0; column < length; column++) {
      logicBoard[row][column] = "";
    }
  }
  user.board.ships = [];
};
