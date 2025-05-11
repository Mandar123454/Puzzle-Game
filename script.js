const puzzleContainer = document.getElementById("puzzleContainer");
const shuffleButton = document.getElementById("shuffleButton");
const winMessage = document.getElementById("winMessage");
let tiles = [1, 2, 3, 4, 5, 6, 7, 8, 0]; // 0 represents the empty space

// Initialize the puzzle
function initializePuzzle() {
  puzzleContainer.innerHTML = '';
  tiles.forEach(tile => {
    const tileElement = document.createElement("div");
    tileElement.classList.add("puzzle-tile");
    if (tile === 0) {
      tileElement.classList.add("empty");
    } else {
      tileElement.textContent = tile;
    }
    tileElement.addEventListener("click", () => moveTile(tile));
    puzzleContainer.appendChild(tileElement);
  });
}

// Move a tile if it's adjacent to the empty space
function moveTile(tile) {
  const tileIndex = tiles.indexOf(tile);
  const emptyIndex = tiles.indexOf(0);
  const validMoves = [emptyIndex - 1, emptyIndex + 1, emptyIndex - 3, emptyIndex + 3];
  
  if (validMoves.includes(tileIndex)) {
    [tiles[tileIndex], tiles[emptyIndex]] = [tiles[emptyIndex], tiles[tileIndex]];
    initializePuzzle();
    checkWin();
  }
}

// Shuffle tiles
shuffleButton.addEventListener("click", () => {
  tiles = tiles.sort(() => Math.random() - 0.5);
  initializePuzzle();
  winMessage.classList.add("hidden");
});

// Check if the player has won
function checkWin() {
  if (tiles.join("") === "123456780") {
    winMessage.classList.remove("hidden");
  }
}

// Show a hint
function showHint() {
  const emptyIndex = tiles.indexOf(0);
  const hintTileIndex = [emptyIndex - 1, emptyIndex + 1, emptyIndex - 3, emptyIndex + 3]
    .find(index => index >= 0 && index < tiles.length && tiles[index] !== 0);
  
  if (hintTileIndex !== undefined) {
    const hintTile = puzzleContainer.children[hintTileIndex];
    hintTile.classList.add("hint");
    setTimeout(() => hintTile.classList.remove("hint"), 5000);
  }
}

// Initialize game on page load and set hint timer
initializePuzzle();
setInterval(showHint, 5000); // Hint every 5 seconds if the user is stuck 