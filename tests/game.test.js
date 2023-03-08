import { Game } from "./battleship";

const game = Game();

it("should have the computer attack the user at a random position", () => {
  game.computer.randomAttack(game.user.board);
  let userAttacked = false;
  for (let y = 0; y < game.user.board.coordinates.length; y++) {
    for (let x = 0; x < game.user.board.coordinates[0].length; x++) {
      if (game.user.board.coordinates[y][x] != "") userAttacked = true;
    }
  }
  expect(userAttacked).toBe(true);
});

it("should place a ship at a pre-determined location", () => {
  expect(game.user.board.coordinates[0][5]).toBeInstanceOf(Object);
});
