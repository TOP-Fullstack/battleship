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

  return { hits, length, sunk, hit, isSunk };
};

export const Gameboard = (size) => {
  const ships = [];

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
    ships.push(ship);
  };

  const isGameOver = () => {
    for (let ship of ships) {
      if (!ship.isSunk()) return false;
    }
    return true;
  };

  const receivedAttack = (x, y) => {
    if (board[x][y] != "" && board[x][y] != "1") {
      board[x][y].hit();
      board[x][y] = 1;
    } else {
      board[x][y] = 0;
    }
  };

  return { board, place, receivedAttack, isGameOver };
};
