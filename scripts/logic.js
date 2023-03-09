// import { render } from "./render.js";

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

  // Logic board
  for (let i = 0; i < size; i++) {
    let row = [];
    for (let j = 0; j < size; j++) {
      row.push("");
    }
    coordinates.push(row);
  }

  // Dom board
  let board = document.createElement("div");
  const render = () => {
    for (let y = 0; y < coordinates.length; y++) {
      for (let x = 0; x < coordinates.length; x++) {
        let boardSquare = document.createElement("div");
        boardSquare.addEventListener("click", () => {
          console.log("test");
        });
        board.appendChild(boardSquare);
      }
      board.className = "grid";
      document.body.appendChild(board);
    }
  };

  const update = () => {
    board.remove();
    let board = document.createElement("div");
    render();
  };

  // Currently place it starting from the point clicked and iterate to the right by length
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

  return { coordinates, place, receivedAttack, isGameOver, update, render };
};

export const Player = () => {
  const board = Gameboard(10);

  const randomAttack = (gameboard) => {
    let randomX, randomY;
    do {
      randomX = Math.floor(Math.random() * gameboard.coordinates[0].length);
      randomY = Math.floor(Math.random() * gameboard.coordinates.length);
    } while (gameboard.coordinates[randomX][randomY] != "");
    gameboard.receivedAttack(randomX, randomY);
    gameboard.update();
  };

  // User attack
  const attack = (x, y, gameboard) => {
    gameboard.receivedAttack(x, y);
    gameboard.update();
  };

  return { attack, randomAttack, board };
};

export const Game = () => {
  // Initialize user's board
  const user = Player();
  const userShip1 = Ship(3);
  const userShip2 = Ship(2);
  user.board.place(0, 5, userShip1);
  user.board.place(6, 1, userShip2);
  user.board.render();

  // Initialize computer's board
  const computer = Player();
  const compShip1 = Ship(3);
  const compShip2 = Ship(2);
  computer.board.place(3, 2, compShip1);
  computer.board.place(1, 4, compShip2);
  computer.board.render();

  user.attack(4, 0, computer.board);

  // Allow user to click enemy board
  return { user, computer };
};
