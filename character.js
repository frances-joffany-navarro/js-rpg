//Use this script to generate your character
function Person(race, item, name) {
  this.race = race;
  this.item = item;
  this.name = name;
  this.currenthealth = 100;
  this.maxHealth = 100;

  if (this.race === "orc") {
    this.maxHealth += this.maxHealth * 0.4;
    this.currenthealth = this.maxHealth;
  }

  this.min = 3;
  this.maxDamage = 20;
  this.maxHealing = 30;

  this.heal = function () {
    let healingPower = Math.floor(Math.random() * (this.maxHealing - this.min) + this.min);
    return healingPower;
  };

  this.damage = function () {
    let damagingPower = Math.floor(Math.random() * (this.maxDamage - this.min) + this.min);
    return damagingPower;
  };

  this.totalDamage = this.damage();// how much damage you will give to your opponent

  this.displayChar = function () {
    return console.log(this.name, `I am a ${this.race}, I wield a ${this.item}, my total health point are ${this.maxHealth}`);
  };
};



let playerOne, playerTwo;

const createButton = document.querySelector("#createButton");

const playerDesc = document.querySelector("#playerDescription");


const playerName = document.querySelector("#name");
const playerRace = document.querySelector("#race");
const playerItem = document.querySelector("#item");

createButton.addEventListener("click", () => {
  const counter = 1;
  if (counter = 1) {
    playerOne = createPlayer(playerRace, playerItem, playerName);

    playerName.value = "";
    playerItem.value = "";
    playerRace.value = "";

    playerDesc.innerHTML = "Player 2";

    player
  } else {
    playerTwo = createPlayer(playerRace, playerItem, playerName);
    counter = 0;
  }

  counter++;
});

function createPlayer(race, item, name) {
  return new Person(race, item, name);
}



export { Person };