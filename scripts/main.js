import * as game from "./logic.js";
import * as DOM from "./DOM.js";

// Initialize players, make player one start first, make player2 a computer
let user = game.Player("Bob");
let user2 = game.Player("Joe");
user.turn = true;
let isComputer = true;

// Let user click empty board to place pieces
user.placeShips("horizontal");
user2.placeShips("horizontal");

if (isComputer) {
  DOM.allowClicks(user, user2, isComputer);
} else {
  DOM.allowClicks(user, user2);
  DOM.allowClicks(user2, user);
}

// Reset game if winner
const winnerDisplay = document.querySelector(".winner-display");
const winner = document.querySelector(".winner-display > h1 > span");
winnerDisplay.addEventListener("click", () => {
  DOM.resetBoard(user);
  DOM.resetBoard(user2);
  user = game.Player("Bob");
  user2 = game.Player("Joe");
  user.turn = true;
  isComputer = true;
  winnerDisplay.style.visibility = "hidden";
  winner.innerHTML = "";
});
