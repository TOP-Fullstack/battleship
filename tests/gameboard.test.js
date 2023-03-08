import { Gameboard, Ship } from "./battleship";

const gameboard = Gameboard(10);
const newShip = Ship(2);

it("should create a 2d array with a width of 10", () => {
  const width = gameboard.coordinates[0].length;
  expect(width).toBe(10);
});

it("should create a 2d array with a height of 10", () => {
  const height = gameboard.coordinates.length;
  expect(height).toBe(10);
});

it("should place a ship object at a specific coordinate", () => {
  gameboard.place(2, 5, newShip);
  expect(gameboard.coordinates[2][5]).toBe(newShip);
});

it("should hit a ship", () => {
  gameboard.receivedAttack(2, 5);
  expect(gameboard.coordinates[2][5]).toBe(1);
});

it("should miss a ship", () => {
  gameboard.receivedAttack(5, 5);
  expect(gameboard.coordinates[5][5]).toBe(0);
});

it("shouldn't be a game over", () => {
  expect(gameboard.isGameOver()).toBe(false);
});

it("should be a game over", () => {
  gameboard.receivedAttack(2, 6);
  expect(gameboard.isGameOver()).toBe(true);
});
