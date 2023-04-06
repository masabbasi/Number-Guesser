/*
	Game Function:
	1-Player must guess a number between min and max.
	2-Player gets certain of guesses.
	3-Notify Player of remaning guess.
	4-Notify Player of correct answer if loos.
	5-Let Player choose play again.
*/

//Define Vars
let $ = document;
let min = 1,
  max = 10,
  guessLeft = 3,
  winNum = getRandomNum(min, max);

//UI Vars
let minNum = $.querySelector(".min-num");
let maxNum = $.querySelector(".max-num");
let game = $.querySelector("#game");
let guessInput = $.querySelector("#guess-input");
let guessBtn = $.querySelector("#guess-btn");
let message = $.querySelector(".message");

//Set Min And Max In UI
minNum.textContent = min;
maxNum.textContent = max;

game.addEventListener("mousedown", (e) => {
  if (e.target.className === "play-again") {
    window.location.reload();
  }
});

guessBtn.addEventListener("click", () => {
  let guess = parseInt(guessInput.value);
  //Validation
  if (isNaN(guess) || guess < min || guess > max) {
    guessInput.style.borderColor = "red";
    showMessage(`Please enter a number between ${min} and ${max}`, "red");
  } else {
		//Check Win
		if (guess === winNum) {
			gameOver(`${winNum} is correct! You Win!`, "green");
		} else {
			guessLeft -= 1;
			if (guessLeft === 0) {
				gameOver(`Game Over, You lose. The correct number was ${winNum}`, "red");
			} else {
				showMessage(
					`${guess} is not correct, you can ${guessLeft} time guessing!`,
					"red"
				);
			}
		}
	}

});

//Show Message Function
function showMessage(msg, color) {
  message.textContent = msg;
  message.style.color = color;
}

//GameOver Function
function gameOver(msg, color) {
  guessInput.disabled = true;
  guessInput.style.borderColor = color;
  showMessage(msg, color);

  //Play Again
  guessBtn.value = "Play Again";
  guessBtn.className = "play-again";
}

//Random Number Function
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
