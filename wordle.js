const answer = "SCARY";
const squares = document.querySelector(".squares");
const keyboard = document.querySelector(".keys");

const keys = [
  "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P",
  "A", "S", "D", "F", "G", "H", "J", "K", "L", "Enter",
  "Z", "X", "C", "V", "B", "N", "M", "«"
];

const guesses = Array(6).fill(Array(5).fill(""));

guesses.forEach((row, rowId) => {
  const rowElement = document.createElement("div");
  rowElement.id = `row${rowId}`;
  rowElement.classList.add("row");
  rowElement.innerHTML = row.map((_, guessId) => `
    <div id="row${rowId}-square${guessId}" class="square"></div>
  `).join("");
  squares.append(rowElement);
});

const handleClick = (letter) => {
    console.log("clicked:", letter)
    if(letter === "«") {
      console.log('delete letter')
      return
    }
    if (letter === "Enter") {
      console.log('guess entered')
      return
    }
    addLetter(letter)
}

let currentRow = 0
let currentSquare = 0

const addLetter = (letter) => {
  if (currentRow < 6 && currentSquare < 5) {
    const squareId = `row${currentRow}-square${currentSquare}`;
    const square = document.getElementById(squareId);
    
    if (square) {
      square.textContent = letter;
      guesses[currentRow][currentSquare] = letter;
      square.setAttribute('data', letter)
      currentSquare++;
      console.log('guessRows', guesses);
    }
  }
}

keys.forEach(key => {
  const button = document.createElement("button");
  button.textContent = key;
  button.id = key;
  button.addEventListener("click", () => handleClick(key));
  keyboard.append(button);
});

