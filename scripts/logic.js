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
    coords = [],
    DOM = [];

  // Logic board
  for (let y = 0; y < size; y++) {
    const row = [];
    for (let x = 0; x < size; x++) {
      row.push("");
    }
    coords.push(row);
  }

  const changeDOM = (y, x, piece) => {
    if (coords[y][x] == "") piece.style.background = "black";
    else if (coords[y][x] != "") piece.style.background = "red";
  };

  // DOM board
  const DOMboard = document.createElement("div");
  DOMboard.className = "grid";
  for (let y = 0; y < size; y++) {
    const row = [];
    for (let x = 0; x < size; x++) {
      const DOMsquare = document.createElement("div");
      DOMsquare.addEventListener("click", () => {
        changeDOM(y, x, DOMsquare);
      });
      DOMboard.appendChild(DOMsquare);
      row.push(DOMsquare);
    }
    DOM.push(row);
  }
  document.body.appendChild(DOMboard);

  // Currently place it starting from the point clicked and iterate to the right by length
  const place = (x, y, ship) => {
    for (let i = y; i < y + ship.length; i++) {
      coords[x][i] = ship;
    }
    ships.push(ship);
  };

  const isGameOver = () => {
    for (let ship of ships) {
      if (!ship.isSunk()) return false;
    }
    return true;
  };

  const receivedAttack = (y, x) => {
    if (typeof coords[y][x] == "object") {
      coords[y][x].hit();
      coords[y][x] = 1;
    } else {
      coords[y][x] = 0;
    }
    DOM[y][x].click();
  };

  return { coords, place, receivedAttack, isGameOver };
};

export const Player = () => {
  const board = Gameboard(10);
  const attacked = [];

  // attack random piece on board only if it's coords[randomX+randomY] positions are "" or obj
  const randomAttack = (gameboard) => {
    let randomX, randomY, a, b, c;
    do {
      randomX = Math.floor(Math.random() * gameboard.coords[0].length);
      randomY = Math.floor(Math.random() * gameboard.coords.length);
      c = attacked.indexOf([randomY, randomX]);
    } while (c == 1);
    gameboard.receivedAttack(randomY, randomX);
  };

  // User attack
  const attack = (y, x, gameboard) => {
    gameboard.receivedAttack(y, x);
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

  // Initialize computer's board
  const computer = Player();
  const compShip1 = Ship(3);
  const compShip2 = Ship(2);
  computer.board.place(3, 2, compShip1);
  computer.board.place(1, 4, compShip2);

  // Allow user to click enemy board
  return { user, computer };
};
