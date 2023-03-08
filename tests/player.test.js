import { Player, Gameboard } from "./battleship";

const player = Player();
const gameboard = Gameboard(10);

it("should attack a random board position", () => {
  player.randomAttack(gameboard);
  let somethingHit = false;
  for (let y = 0; y < gameboard.coordinates.length; y++) {
    for (let x = 0; x < gameboard.coordinates[0].length; x++) {
      if (gameboard.coordinates[y][x] !== "") somethingHit = true;
    }
  }
  expect(somethingHit).toBe(true);
});

it("should attack a board based on an x + y position", () => {
  player.attack(4, 5, gameboard);
  expect(gameboard.coordinates[4][5]).toBe(0);
});
