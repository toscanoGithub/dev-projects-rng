window.onload = () => {
  // buttons that flips the card
  var rollBtn = document.querySelector("#roll-icon");
  var doneBtn = document.querySelector("#done");
  let diceIcons = [
    "fa-dice-1.jpg",
    "fa-dice-2.jpg",
    "fa-dice-3.jpg",
    "fa-dice-4.jpg",
    "fa-dice-5.jpg",
    "fa-dice-6.jpg",
    "fa-dice-7.jpg",
    "fa-dice-8.jpg",
    "fa-dice-9.jpg",
    "fa-dice-10.jpg",
    "fa-dice-11.jpg",
    "fa-dice-12.jpg",
    "fa-dice-13.jpg",
    "fa-dice-14.jpg",
    "fa-dice-15.jpg",
    "fa-dice-16.jpg",
    "fa-dice-17.jpg",
    "fa-dice-18.jpg",
    "fa-dice-19.jpg",
    "fa-dice-20.jpg",
  ];

  let selectedDiceImages = [
    "fa-dice-1.jpg",
    "fa-dice-2.jpg",
    "fa-dice-3.jpg",
    "fa-dice-4.jpg",
    "fa-dice-5.jpg",
    "fa-dice-6.jpg",
  ];

  // ERROR MESSAGE
  const error = document.querySelector("#error");

  // the card to flip from gameplay to settings and back
  var card = document.querySelector(".card");
  rollBtn.addEventListener("click", function () {
    if (dices === 0) {
      if (error.classList.contains("hidden")) {
        error.classList.remove("hidden");
      }
      setTimeout(() => {
        error.classList.add("hidden");
      }, 1500);
      return;
    }
    card.classList.toggle("is-flipped");
    this.setAttribute("disabled", true);
    createDices();
  });

  const faceElement = document.getElementById("face");
  numSides = 6; // default dice to 6 faces
  faceElement.addEventListener("change", function () {
    console.log(this.value);
    numSides = this.value.substring(1);

    selectedDiceImages = diceIcons.filter((d, index) => {
      if (index < numSides) return d;
    });

    console.log("====================================");
    console.log(selectedDiceImages);
    console.log("====================================");
  });

  const dicesInputElement = document.querySelector("#dices");
  let dices = 0;

  dicesInputElement.addEventListener("keyup", function () {
    dices = this.value;
  });

  // BACK >>> ROLLING SETUP

  const ROLLING_TIME_IN_MILLISECONDS = 100;

  const createDices = () => {
    for (let j = 0; j < dices; j++) {
      let d = new Dice(shuffleArray([...selectedDiceImages]), 0, j + 1);
      d.revealSelfInScreen();
      d.info();
    }
  };

  /* -----------------------DONE BTN ----------------------- */
  doneBtn.addEventListener("click", function () {
    // reset view
    dicesInputElement.value = null;
    dices = 0;

    const holders = document.getElementsByClassName("holder");
    [...holders].forEach((e) => e.parentElement.removeChild(e));
    // flip the card
    rollBtn.setAttribute("disabled", false);
    card.classList.toggle("is-flipped");
  });

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
}; // END WINDOW LOAD
