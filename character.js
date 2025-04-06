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



let playerOne;
let playerTwo;
let counter = 1;

const createButton = document.getElementById("createButton");
const startButton = document.getElementById("startButton");
const movesPanel = document.getElementById("movesPanel");
const playerDesc = document.querySelector("#playerDescription");
const creationPanel = document.getElementById("creationPanel");
const startPanel = document.getElementById("startPanel");
const logPanel = document.getElementById("logPanel");
const playerOneStat = document.getElementById("player1Stat");
const playerTwoStat = document.getElementById("player2Stat");



const playerName = document.querySelector("#name");
const playerRace = document.getElementById("race");
const playerItem = document.getElementById("item");

const playerOneAttack = document.querySelector("#hit1");
const playerOneHeal = document.querySelector("#heal1");
const playerOneYield = document.querySelector("#yield1");

const playerTwoAttack = document.querySelector("#hit1");
const playerTwoHeal = document.querySelector("#heal1");
const playerTwoYield = document.querySelector("#yield1");


console.log(playerRace, playerItem, playerName);

playerName.focus();

createButton.addEventListener("click", () => {
  if (playerRace.value != "" && playerItem.value != "" && playerName.value != "") {

    console.log(counter);
    if (counter === 1) {
      playerOne = createPlayer(playerRace.value, playerItem.value, playerName.value);
      playerOne.displayChar();

      playerName.value = "";
      playerItem.value = "";
      playerRace.value = "";
      playerDesc.innerHTML = "Player 2";
      playerName.focus();

    } else {
      playerTwo = createPlayer(playerRace.value, playerItem.value, playerName.value);
      playerTwo.displayChar();
      console.log(creationPanel);
      creationPanel.style.display = "none";
      startPanel.style.display = "inline-block";

      counter = 1;
    }

    counter++;
  }
});
startButton.addEventListener("click", () => {
  startPanel.style.display = "none";
  logPanel.style.display = "inline-block";
  movesPanel.style.display = "inline-block";
  playerOneStat.style.visibility = "visible";
  playerTwoStat.style.visibility = "visible";
});


function createPlayer(race, item, name) {
  return new Person(race, item, name);
}



export { Person };