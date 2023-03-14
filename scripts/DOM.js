// DOM board
export function createDOM(size) {
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
  document.body.appendChild(DOMboard);
  return DOM;
}

// When a user clicks on a square that is already occupied, it sitll changes turn
export function allowClicks(playerA, playerB, computer = false) {
  for (let row = 0; row < playerB.board.DOM.length; row++) {
    for (let column = 0; column < playerB.board.DOM.length; column++) {
      playerB.board.DOM[column][row].addEventListener("click", () => {
        if (playerA.turn && !playerB.board.coords[column][row]) {
          playerA.attack(column, row, playerB.board);
          playerA.turn = false;
          playerB.turn = true;
        }
      });
    }
  }
}
