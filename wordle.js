const squares = document.querySelector(".squares");
const keyboard = document.querySelector(".keys");
const messageDisplay = document.querySelector('.gamemessage')

let wordle = 'SCARY'

const keys = [
  "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P",
  "A", "S", "D", "F", "G", "H", "J", "K", "L", "Enter",
  "Z", "X", "C", "V", "B", "N", "M", "«"
];

const numRows = 6;
const numColumns = 5;

const guesses = [];

for (let row = 0; row < numRows; row++) {
  guesses[row] = [];
  for (let column = 0; column < numColumns; column++) {
    guesses[row][column] = "";
  }
}

keys.forEach(key => {
  const button = document.createElement("button");
  button.textContent = key;
  button.id = key;
  button.addEventListener("click", () => handleClick(key));
  keyboard.append(button);
});

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
  if (letter === "«") {
    deleteLetter();
    return;
  }
  if (letter === "Enter") {
    checkRow()
    console.log('guess entered');
    return;
  }
  addLetter(letter);
};

let currentRow = 0;
let currentSquare = 0;
let isGameOver = false

const addLetter = (letter) => {
  if (currentRow < numRows && currentSquare < numColumns) {
    const square = document.getElementById(`row${currentRow}-square${currentSquare}`);
    square.textContent = letter;
    guesses[currentRow][currentSquare] = letter;
    square.setAttribute('data', letter);
    currentSquare++;
  }
};

const deleteLetter = () => {
  if (currentSquare > 0) {
    currentSquare--;
    const square = document.getElementById(`row${currentRow}-square${currentSquare}`);
    square.textContent = "";
    guesses[currentRow][currentSquare] = "";
    square.removeAttribute('data');
  }
};

const checkRow = () => {
  const guess = guesses[currentRow].join('')
  if (currentSquare > 4) {
    console.log('guess is: ' + guess, 'wordle is: ' + wordle)
    flipSquare()
    if (wordle == guess) {
      showMessage("You guessed the wordle!")
      isGameOver = true
      return
    } else {
      if (currentRow >= 5) {
        isGameOver = true
        showMessage('Game Over')
        return
      }
      if (currentRow < 5) {
        currentRow++
        currentSquare = 0
      }
    }
  }
}

const showMessage = (message) => {
  const gameMessage = document.createElement('p')
  gameMessage.textContent = message
  messageDisplay.append(gameMessage)
  setTimeout(() => messageDisplay.removeChild(gameMessage), 2000)
}

const flipSquare = () => {
  const rowSquares = document.getElementById(`row${currentRow}`).querySelectorAll('.square');
  rowSquares.forEach((square, index) => {
    const dataLetter = square.getAttribute('data');
    
    if (dataLetter == wordle[index]) {
      square.classList.add('green');
    } else if (wordle.includes(dataLetter)) {
      square.classList.add('yellow');
    } else {
      square.classList.add('grey');
    }
  });
};
