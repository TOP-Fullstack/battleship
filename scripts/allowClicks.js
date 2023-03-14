export function allowClicks(attacker, defender, computerPlaying) {
  // Save references to specific pieces of the boards
  const length = defender.board.domBoard.length;
  const domBoard = defender.board.domBoard;
  const logicBoard = defender.board.logicBoard;
  const winnerDisplay = document.querySelector(".winner-display");

  // Add event listeners to each dom board's piece to allow a user to attack by clicking
  for (let row = 0; row < length; row++) {
    for (let column = 0; column < length; column++) {
      domBoard[row][column].addEventListener("click", () => {
        // A check to make sure it is the appropriate player's turn and the
        // piece being attacked hasn't already been attacked
        if (attacker.turn && typeof logicBoard[row][column] != "number") {
          attacker.attack(row, column, defender.board);
          if (computerPlaying) defender.randomAttack(attacker.board);
          else {
            attacker.turn = false;
            defender.turn = true;
          }
          if (defender.board.isGameOver()) {
            winnerDisplay.style.visibility = "visible";
          }
        }
      });
    }
  }
}
