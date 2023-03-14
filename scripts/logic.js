import { createDOM, allowClicks } from "./DOM.js";

export const Ship = (length) => {
  let hits = 0;
  let sunk = false;

  const hit = () => {
    hits++;
  };

  const isSunk = () => {
    if (hits === length) sunk = true;
    return sunk;
  };

  return { hits, length, sunk, hit, isSunk };
};

export const Gameboard = (size) => {
  const ships = [],
    coords = [];

  // Logic board
  for (let row = 0; row < size; row++) {
    const row = [];
    for (let column = 0; column < size; column++) {
      row.push("");
    }
    coords.push(row);
  }

  const DOM = createDOM(size);

  // Adjust
  const place = (column, row, ship) => {
    for (let i = row; i < row + ship.length; i++) {
      coords[column][i] = ship;
    }
    ships.push(ship);
  };

  const isGameOver = () => {
    ships.forEach((ship) => {
      if (ship.isSunk() == false) return false;
    });
    return true;
  };

  const receivedAttack = (row, column) => {
    if (typeof coords[row][column] === "object") {
      coords[row][column].hit();
      coords[row][column] = 1;
      DOM[row][column].style.background = "red";
    } else {
      coords[row][column] = 0;
      DOM[row][column].style.background = "black";
    }
  };

  return { coords, place, receivedAttack, isGameOver, DOM };
};

export const Player = () => {
  const board = Gameboard(10);
  const attacked = [];
  let turn = false;

  const randomizeIndex = () => {
    return Math.floor(Math.random() * board.coords.length);
  };

  const arrayIncludesArray = (arr, subarr) => {
    return arr.some((elem) => elem.join(",") === subarr.join(","));
  };

  const randomAttack = (gameboard) => {
    let attack;
    do {
      attack = [randomizeIndex(), randomizeIndex()];
    } while (arrayIncludesArray(attacked, attack));
    attacked.push(attack);
    gameboard.receivedAttack(attack[0], attack[1]);
  };

  // User attack
  const attack = (row, column, gameboard) => {
    gameboard.receivedAttack(row, column);
  };

  return { attack, randomAttack, board, turn };
};

export const Game = () => {
  let computer = false;

  // Initialize user's board
  const user = Player();
  const userShip1 = Ship(3);
  user.board.place(0, 1, userShip1);
  user.turn = true;

  // Initialize computer's board
  const user2 = Player();
  const user2Ship = Ship(3);
  user2.board.place(0, 1, user2Ship);

  // Allow the user to attack the enemy's board
  allowClicks(user, user2);
  allowClicks(user2, user);

  // Check winner here
  // no new methods in this object
};
