//Use this script to generate your character
import { checkMove } from "./gamelogic.js";

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

let player1;
let player2;
let createCounter = 1;
let starting = false;
let move;

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

const playersVisual = document.getElementById("playersVisual");

const playerOneAttack = document.querySelector("#hit1");
const playerOneHeal = document.querySelector("#heal1");
const playerOneYield = document.querySelector("#yield1");

const playerTwoAttack = document.querySelector("#hit2");
const playerTwoHeal = document.querySelector("#heal2");
const playerTwoYield = document.querySelector("#yield2");

const playerOneStatName = document.getElementById("showName1");
const playerTwoStatName = document.getElementById("showName2");
const playerOneStatHealth = document.getElementById("p1Health");
const playerTwoStatHealth = document.getElementById("p2Health");
const playerOneStatItem = document.getElementById("itemImage1");
const playerTwoStatItem = document.getElementById("itemImage2");
const playerOneStatVisual = document.getElementById("player1Visual");
const playerTwoStatVisual = document.getElementById("player2Visual");

playerName.focus();

createButton.addEventListener("click", () => {
  if (playerRace.value != "" && playerItem.value != "" && playerName.value != "") {

    console.log(createCounter);
    if (createCounter === 1) {
      player1 = createPlayer(playerRace.value, playerItem.value, playerName.value);
      player1.displayChar();

      playerName.value = "";
      playerItem.value = "";
      playerRace.value = "";
      playerDesc.innerHTML = "Player 2";
      playerName.focus();

    } else {
      player2 = createPlayer(playerRace.value, playerItem.value, playerName.value);
      player2.displayChar();
      console.log(creationPanel);
      creationPanel.style.display = "none";
      startPanel.style.display = "inline-block";

      createCounter = 1;
    }

    createCounter++;
  }
});

startButton.addEventListener("click", () => {
  startPanel.style.display = "none";
  logPanel.style.display = "inline-block";
  movesPanel.style.display = "inline-block";
  playersVisual.style.display = "inline-block";
  playerOneStat.style.visibility = "visible";
  playerTwoStat.style.visibility = "visible";
  starting = true;
  playerOneStatName.innerHTML = player1.name;
  playerTwoStatName.innerHTML = player2.name;
  playerOneStatHealth.innerHTML = `${player1.currenthealth} %`
  playerTwoStatHealth.innerHTML = `${player2.currenthealth} %`
  playerOneStatItem.src = imageItem(player1.item);
  playerTwoStatItem.src = imageItem(player2.item);
  playerOneStatVisual.src = imageRace(player1.race);
  playerTwoStatVisual.src = imageRace(player2.race);
});

playerOneAttack.addEventListener("click", () => {
  move = "1";
  checkMove(player2, player1, move);
});

playerOneHeal.addEventListener("click", () => {
  move = "2";
  checkMove(player2, player1, move);
});

playerOneYield.addEventListener("click", () => {
  move = "3";
  checkMove(player2, player1, move);
});

playerTwoAttack.addEventListener("click", () => {
  move = "1";
  checkMove(player2, player1, move);
});

playerTwoHeal.addEventListener("click", () => {
  move = "2";
  checkMove(player2, player1, move);
});

playerTwoYield.addEventListener("click", () => {
  move = "3";
  checkMove(player2, player1, move);
});



function createPlayer(race, item, name) {
  return new Person(race, item, name);
}

function imageItem(item) {
  const path = "images/"
  let srcName = "";
  switch (item) {
    case "bow":
      srcName = "bow.png";
      break;

    case "boots":
      srcName = "boots.png";
      break;

    case "sword":
      srcName = "sword.png";
      break;

    case "staff":
      srcName = "magic-wand.png";
      break;

    default:

      break;
  }
  return path + srcName;
}

function imageRace(race) {
  const path = "images/"
  let srcName = "";
  switch (race) {
    case "human":
      srcName = "human.png";
      break;

    case "orc":
      srcName = "orc.png";
      break;

    case "elf":
      srcName = "elf.png";
      break;

    case "vampire":
      srcName = "vampire.png";
      break;

    default:

      break;
  }
  return path + srcName;
}

function gameOver(isGameOver) {
  
}


export { Person, player1, player2, starting, playerOneAttack, playerOneHeal, playerOneYield, playerTwoAttack, playerTwoHeal, playerTwoYield, startButton, move };