const dicyRollBtn = document.querySelector("#dicy-roll-btn");

const dicyScoreElement = document.querySelector("#dicy-score");
const dicyBestScoreElement = document.querySelector("#dicy-best-score");
let dicyScore = 0;
let dicyBestScore = localStorage.getItem("dicyBest") || 0;
dicyBestScoreElement.innerHTML = "Best: " + dicyBestScore;

if (dicyBestScore === 0) {
  dicyBestScoreElement.classList.add("hidden");
}

let i = 0;
const ROLLING_TIME_IN_MILLISECONDS = 100;

const diceIcons = [
  "fa-dice-one",
  "fa-dice-two",
  "fa-dice-three",
  "fa-dice-four",
  "fa-dice-five",
  "fa-dice-six",
];

const diceIcons1 = [
  "fa-dice-one",
  "fa-dice-two",
  "fa-dice-three",
  "fa-dice-four",
  "fa-dice-five",
  "fa-dice-six",
];

const userEnteredValue = document.querySelector("#value-of-dicy-user-input");
const dicyUserInput = document.querySelector("#dicy-user-input");
dicyUserInput.focus();
let diceImage1 = "";
let diceImage2 = "";
const diceHolder1 = document.querySelector("#dice-first");
const diceHolder2 = document.querySelector("#dice-second");
const dicyResult = document.querySelector("#dicy-result");
dicyResult.innerHTML =
  "5 points if you rolled same dices <br/>10 points if you guessed the sum of the two dices";
let face1;
let face2;

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

// rolling 32 frames
function* roll() {
  console.log("rolling");
  shuffleArray(diceIcons);
  shuffleArray(diceIcons1);
  dicyResult.innerHTML = "Rolling...";
  while (i < diceIcons.length) {
    i++;
    animateDice();
    yield;
  }
  i = 0;
  diceHolder1.classList.add(diceIcons1[diceIcons1.length - 1]);
  diceHolder2.classList.add(diceIcons[diceIcons.length - 1]);
  displayResultForDicyDice();
}

const animateDice = () => {
  diceHolder1.classList.add(diceIcons1[i - 1]);
  diceHolder2.classList.add(diceIcons[i - 1]);
  setTimeout(() => {
    diceHolder1.classList.remove(diceIcons1[i - 1]);
    diceHolder2.classList.remove(diceIcons[i - 1]);
    roll().next();
  }, 200);
};
// dicy roll btn listeners
dicyRollBtn.addEventListener("click", function () {
  this.setAttribute("disabled", true);
  if (
    !dicyUserInput.value ||
    isNaN(dicyUserInput.value) ||
    dicyUserInput.value < 2 ||
    dicyUserInput.value > 12
  ) {
    dicyResult.innerHTML = "Only Numbers From 2 To 12";
    dicyUserInput.value = "";
    dicyUserInput.focus();
    this.disabled = false;
    return;
  }

  // reset result display if any while rolling
  dicyResult.innerHTML = "";

  roll().next();
});

const displayResultForDicyDice = () => {
  const faceText1 = diceHolder1.classList[1].substring(8);
  const faceNumber1 = wordToNumber(faceText1);

  const faceText2 = diceHolder2.classList[1].substring(8);
  const faceNumber2 = wordToNumber(faceText2);

  dicyResult.innerHTML =
    "You guessed " +
    dicyUserInput.value +
    `<br/>${dicyFeedback(+dicyUserInput.value, faceNumber1, faceNumber2)}`;

  setTimeout(() => {
    dicyUserInput.value = "";
    dicyUserInput.focus();
    dicyRollBtn.disabled = false;
    i = 0;
    diceHolder1.classList.remove(`fa-dice-${faceText1}`);
    diceHolder2.classList.remove(`fa-dice-${faceText2}`);
    dicyResult.innerHTML = "Roll again!";
  }, 1000);
};

const dicyFeedback = (input, dice1, dice2) => {
  if (input === dice1 + dice2 && dice1 === dice2) {
    dicyScore += 10;
    dicyScoreElement.innerHTML = "Score: " + dicyScore;
    if (dicyScore > dicyBestScore) {
      dicyBestScore = dicyScore;
      dicyBestScoreElement.classList.remove("hidden");
      dicyBestScoreElement.innerHTML = "Best: " + dicyScore;
      localStorage.setItem("dicyBest", dicyScore);
    }
    return "Big win ";
  }

  if (input === dice1 + dice2 || dice1 === dice2) {
    dicyScore += 5;
    dicyScoreElement.innerHTML = "Score: " + dicyScore;
    if (dicyScore > dicyBestScore) {
      dicyBestScore = dicyScore;
      dicyBestScoreElement.classList.remove("hidden");
      dicyBestScoreElement.innerHTML = "Best: " + dicyBestScore;
      localStorage.setItem("dicyBest", dicyBestScore);
    }
    return "You win ";
  }

  dicyScore = 0;
  dicyScoreElement.innerHTML = "";
  return "You lose";
};

// ROLL DICES SECTION
const wordToNumber = (word) => {
  switch (word) {
    case "one":
      return 1;
    case "two":
      return 2;
    case "three":
      return 3;
    case "four":
      return 4;
    case "five":
      return 5;
    case "six":
      return 6;

    default:
      return "00";
  }
};
