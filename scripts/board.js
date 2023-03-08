export function createBoard(size) {
  const board = document.createElement("div");
  for (let i = 0; i < size * size; i++) {
    let boardSquare = document.createElement("div");
    boardSquare.addEventListener("click", pieceClicked);
    board.appendChild(boardSquare);
  }
  board.className = "grid";
  document.body.appendChild(board);
}

function pieceClicked() {
  console.log("piece clicked");
}
