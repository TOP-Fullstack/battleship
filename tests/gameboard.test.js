import { Gameboard, Ship } from "./battleship";

const gameboard = Gameboard(10);
const newShip = Ship(2);

it("should create a 2d array with a width of 10", () => {
  const width = gameboard.board[0].length;
  expect(width).toBe(10);
});

it("should create a 2d array with a height of 10", () => {
  const height = gameboard.board.length;
  expect(height).toBe(10);
});

it("should place a ship object at a specific coordinate", () => {
  gameboard.place(newShip, 2, 5);
  expect(gameboard.board[2][5]).toBe(newShip);
});

it("should hit a ship", () => {
  gameboard.receivedAttack(2, 5);
  expect(gameboard.board[2][5]).toBe(1);
});

// it("should have 1 added to the hits of the ship that was hit", () => {
//   expect(newShip.checkHits()).toBe(1);
// });

it("should miss a ship", () => {
  gameboard.receivedAttack(5, 5);
  expect(gameboard.board[5][5]).toBe(0);
});

// Gameboards should be able to report whether or not
// all ships have been sunk
// it("should be a game over", () => {
//   gameboard.receivedAttack(2, 6);
//   expect(gameboard.isGameOver()).toBe(true);
// });
