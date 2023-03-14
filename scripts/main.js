import { Game } from "./logic.js";

let computerPresent = false;

// Initialize new game
let game = Game(computerPresent);
game.placeShips(game.user);
game.placeShips(game.user2);
game.allowInteraction();
