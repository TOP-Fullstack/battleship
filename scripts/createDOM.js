export function createDOM(size) {
  const gameArea = document.querySelector(".game-area");
  const DOMboard = document.createElement("div");
  const DOM = [];
  DOMboard.className = "grid";
  for (let y = 0; y < size; y++) {
    const row = [];
    for (let x = 0; x < size; x++) {
      const DOMsquare = document.createElement("div");
      DOMboard.appendChild(DOMsquare);
      row.push(DOMsquare);
    }
    DOM.push(row);
  }
  gameArea.appendChild(DOMboard);
  return DOM;
}
