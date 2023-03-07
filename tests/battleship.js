export const Ship = (length) => {
  let hits = 0;
  let sunk = false;

  const hit = () => {
    hits++;
  };

  const isSunk = () => {
    if (hits == length) sunk = true;
    return sunk;
  };

  //   const checkHits = () => {
  //     return hits;
  //   };

  return { hits, length, sunk, hit, isSunk, checkHits };
};

export const Gameboard = (size) => {
  // Create gameboard
  let board = [];
  for (let i = 0; i < size; i++) {
    let row = [];
    for (let j = 0; j < size; j++) {
      row.push("");
    }
    board.push(row);
  }

  const place = (ship, x, y) => {
    for (let i = y; i < y + ship.length; i++) {
      board[x][i] = ship;
    }
  };

  const receivedAttack = (x, y) => {
    if (board[x][y] != "" && board[x][y] != "1") {
      board[x][y].hit();
      board[x][y] = 1;
    } else {
      board[x][y] = 0;
    }
  };

  const isGameOver = () => {
    //
  };

  return { board, place, receivedAttack };
};
