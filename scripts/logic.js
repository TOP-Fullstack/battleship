import { createDOM, allowClicks } from "./DOM.js";

export const Ship = (length) => {
  let hits = 0;

  const hit = () => {
    hits++;
  };

  const isSunk = () => {
    return hits === length;
  };

  return { hits, length, hit, isSunk };
};

export const Gameboard = (size) => {
  // Create logic board
  const logicBoard = [];
  for (let row = 0; row < size; row++) {
    const row = [];
    for (let column = 0; column < size; column++) {
      row.push("");
    }
    logicBoard.push(row);
  }

  // Create DOM board
  const domBoard = createDOM(size);

  const ships = [];
  const place = (row, column, ship, orientation) => {
    // Prevent board from being placed out of bounds
    if (row + ship.length > 10 || column + ship.length > 10) return false;

    if (orientation == "horizontal") {
      for (let i = column; i < column + ship.length; i++) {
        logicBoard[row][i] = ship;
      }
    } else {
      for (let i = row; i < row + ship.length; i++) {
        logicBoard[i][column] = ship;
      }
    }
    ships.push(ship);
  };

  const isGameOver = () => {
    for (let ship of ships) {
      if (!ship.isSunk()) return false;
    }
    return true;
  };

  const receivedAttack = (row, column) => {
    if (typeof logicBoard[row][column] === "object") {
      logicBoard[row][column].hit();
      logicBoard[row][column] = 1;
      domBoard[row][column].style.background = "red";
    } else {
      logicBoard[row][column] = 0;
      domBoard[row][column].style.background = "black";
    }
  };

  return { logicBoard, place, receivedAttack, isGameOver, domBoard };
};

export const Player = (name, isComputer) => {
  const username = name;
  let board = Gameboard(10);
  const attacked = [];
  let turn = false;

  const randomIndex = () => {
    return Math.floor(Math.random() * board.logicBoard.length);
  };

  const arrayIncludesArray = (arr, subarr) => {
    return arr.some((elem) => elem.join(",") === subarr.join(","));
  };

  const randomAttack = (gameboard) => {
    let attack;
    do {
      attack = [randomIndex(), randomIndex()];
    } while (arrayIncludesArray(attacked, attack));
    attacked.push(attack);
    gameboard.receivedAttack(attack[0], attack[1]);
  };

  const attack = (row, column, gameboard) => {
    gameboard.receivedAttack(row, column);
  };

  // Ship placement
  const placeShips = (orientation) => {
    const ship = Ship(3);
    board.place(0, 1, ship, orientation);
  };

  return {
    attack,
    randomAttack,
    board,
    username,
    placeShips,
    isComputer,
    turn,
  };
};
