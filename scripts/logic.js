import { createDOM } from "./createDOM.js";
import { allowClicks } from "./allowClicks.js";

export const Ship = (length) => {
  let hits = 0;
  let sunk = false;

  const hit = () => {
    hits++;
  };

  const isSunk = () => {
    return hits === length;
  };

  return { hits, length, sunk, hit, isSunk };
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

  // Add logic to make sure piece is placed within the board
  // boundaries, and it can be flipped
  const ships = [];
  const place = (column, row, ship) => {
    for (let i = row; i < row + ship.length; i++) {
      logicBoard[column][i] = ship;
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

export const Player = () => {
  const board = Gameboard(10);
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

  return { attack, randomAttack, board, turn };
};

export const Game = (computerPlaying) => {
  // Initialize boards
  const user = Player();
  user.turn = true;

  const user2 = Player();

  // Ship placement
  const placeShips = (person) => {
    const ship = Ship(3);
    const ship2 = Ship(3);
    const ship3 = Ship(3);
    person.board.place(0, 1, ship);
    person.board.place(4, 1, ship2);
    person.board.place(5, 1, ship3);
  };

  // Allow the user to attack the enemy's board
  const allowInteraction = () => {
    if (computerPlaying) allowClicks(user, user2, computerPlaying);
    else {
      allowClicks(user, user2);
      allowClicks(user2, user);
    }
  };

  return { placeShips, allowInteraction, user, user2 };
};
