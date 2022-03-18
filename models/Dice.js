const rollArea = document.querySelector("#roll-area");

class Dice {
  constructor(data, i, id) {
    this.data = data;
    this.i = i;
    this.id = id;
    // console.log("constructor >>>", this.i, this.data);
  }

  info = () => {
    // console.log("info >>>", this.data);
  };

  revealSelfInScreen() {
    this.holder = document.createElement("img");
    this.holder.classList = "holder";
    // const iconClass = "fa-solid " + this.data[this.i];
    // this.icon = `<i class="${iconClass}"></i>`;
    const iconImage = "../images/" + this.data[this.i];
    this.holder.setAttribute("src", iconImage);
    rollArea.append(this.holder);
    this.roll().next();
  }

  *roll() {
    while (this.i < this.data.length) {
      this.i++;
      this.animateDice();
      yield;
    }
    this.i = 0;

    rollArea.children[this.id].setAttribute(
      "src",
      "../images/" + this.data[this.data.length - 1]
    );
  }

  animateDice = () => {
    rollArea.children[this.id].setAttribute(
      "src",
      "../images/" + this.data[this.i - 1]
    );
    setTimeout(() => {
      rollArea.children[this.id].setAttribute("src", null);
      this.roll().next();
    }, 200);
  };
}
