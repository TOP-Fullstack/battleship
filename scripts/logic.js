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
  const ships = [],
    coordinates = [];

  // Initialize board
  for (let i = 0; i < size; i++) {
    let row = [];
    for (let j = 0; j < size; j++) {
      row.push("");
    }
    coordinates.push(row);
  }

  const place = (x, y, ship) => {
    for (let i = y; i < y + ship.length; i++) {
      coordinates[x][i] = ship;
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
    if (coordinates[x][y] != "" && coordinates[x][y] != 1) {
      coordinates[x][y].hit();
      coordinates[x][y] = 1;
    } else {
      coordinates[x][y] = 0;
    }
  };

  return { coordinates, place, receivedAttack, isGameOver };
};

export const Player = () => {
  const randomAttack = (gameboard) => {
    let randomX, randomY;
    do {
      randomX = Math.floor(Math.random() * gameboard.coordinates[0].length);
      randomY = Math.floor(Math.random() * gameboard.coordinates.length);
    } while (gameboard.coordinates[randomX][randomY] != "");
    gameboard.receivedAttack(randomX, randomY);
  };

  // User attack
  const attack = (x, y, gameboard) => {
    gameboard.receivedAttack(x, y);
  };

  return { attack, randomAttack };
};

// Main game loop
export const Game = () => {
  // Initialize user's board
  const user = Player();
  user.board = Gameboard(10);
  const userShip1 = Ship(3);
  const userShip2 = Ship(2);
  user.board.place(0, 5, userShip1);
  user.board.place(6, 1, userShip2);

  // Initialize computer's board
  const computer = Player();
  computer.board = Gameboard(10);
  const compShip1 = Ship(3);
  const compShip2 = Ship(2);
  computer.board.place(0, 5, compShip1);
  computer.board.place(6, 1, compShip2);

  return { user, computer };
};
