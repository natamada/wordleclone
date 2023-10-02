// DOM element selection
const squares = document.querySelector(".squares");
const keyboard = document.querySelector(".keys");
const messageDisplay = document.querySelector('.gamemessage')

let wordle; // Variable for the winning word

// Fetch the wordle from the server
const getWordle = async () => {
  try {
    const response = await fetch('http://localhost:8000/word');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const json = await response.json();
    wordle = json.toUpperCase(); // Convert to uppercase
    console.log(wordle);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Keyboard keys and game parameters
const keys = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "A", "S", "D", "F", "G", "H", "J", "K", "L", "Enter", "Z", "X", "C", "V", "B", "N", "M", "«"];
const numRows = 6;
const numColumns = 5;
const guesses = Array.from({ length: numRows }, () => Array(numColumns).fill(""));

// Game state
let currentRow = 0;
let currentSquare = 0;
let isGameOver = false;

const handleClick = (letter) => {
  if (letter === "«") {
    deleteLetter();
  } else if (letter === "Enter") {
    checkRow();
  } else {
    addLetter(letter);
  }
};

// Functions for handling user input
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
  const guess = guesses[currentRow].join('');
  if (currentSquare > 4) {
    flipSquare();
    if (wordle === guess) {
      showMessage("You guessed the wordle!");
      isGameOver = true;
    } else {
      if (currentRow >= 5) {
        isGameOver = true;
        showMessage('Game Over');
      } else {
        currentRow++;
        currentSquare = 0;
      }
    }
  }
};

// Display a message
const showMessage = (message) => {
  const gameMessage = document.createElement('p');
  gameMessage.textContent = message;
  messageDisplay.append(gameMessage);
  setTimeout(() => messageDisplay.removeChild(gameMessage), 3000);
};

// Add color to keyboard keys
const addColorToKey = (keyLetter, color) => {
  const key = document.getElementById(keyLetter);
  key.classList.add(color);
};

// Animation when changing color of squares
const flipSquare = () => {
  const rowSquares = document.getElementById(`row${currentRow}`).querySelectorAll('.square');
  let checkWordle = wordle;
  const guess = [];

  rowSquares.forEach(square => {
    guess.push({ letter: square.getAttribute('data'), color: 'grey' });
  });

  guess.forEach(guess => {
    if (checkWordle.includes(guess.letter)) {
      guess.color = 'yellow';
      checkWordle = checkWordle.replace(guess.letter, '');
    }
  });

  guess.forEach((guess, index) => {
    if (guess.letter === wordle[index]) {
      guess.color = 'green';
      checkWordle = checkWordle.replace(guess.letter, '');
    }
  });

  rowSquares.forEach((square, index) => {
    setTimeout(() => {
      square.classList.add('flip');
      square.classList.add(guess[index].color);
      addColorToKey(guess[index].letter, guess[index].color);
    }, 500 * index);
  });
};

// Initialize the game
getWordle();

// Create keyboard buttons
keys.forEach(key => {
  const button = document.createElement("button");
  button.textContent = key;
  button.id = key;
  button.addEventListener("click", () => handleClick(key));
  keyboard.append(button);
});

// Create game board squares
guesses.forEach((row, rowId) => {
  const rowElement = document.createElement("div");
  rowElement.id = `row${rowId}`;
  rowElement.classList.add("row");
  rowElement.innerHTML = row.map((_, guessId) => `
    <div id="row${rowId}-square${guessId}" class="square"></div>
  `).join("");
  squares.append(rowElement);
});
