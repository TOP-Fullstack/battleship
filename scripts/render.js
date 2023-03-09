export function render(user) {
  const board = document.createElement("div");
  for (let y = 0; y < user.board.coordinates.length; y++) {
    for (let x = 0; x < user.board.coordinates.length; x++) {
      let boardSquare = document.createElement("div");
      boardSquare.addEventListener("click", () => {
        console.log(y, x, user.board.coordinates);
      });
      board.appendChild(boardSquare);
    }
  }
  board.className = "grid";
  document.body.appendChild(board);
}
