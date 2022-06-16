//Use this script to generate your character
function Person(race, item, name, player) {
  this.race = race;
  this.item = item;
  this.name = name;
  this.currenthealth = 100;
  this.maxHealth = 100;
  this.player = player;
  this.oldhealth = 100;

  this.min = 3;
  this.maxDamage = 20;
  this.maxHealing = 30;

  this.heal = function () {
    return Math.floor(Math.random() * (this.maxHealing - this.min + 1)) + this.min;
  };

  this.damage = function () {
    return Math.floor(Math.random() * (this.maxDamage - this.min + 1)) + this.min;
  };

  this.totalDamage = this.damage();// how much damage you will give to your opponent
  this.totalHeal = this.heal()

  this.displayChar = function () {
    return console.log(this.name, `I am a ${this.race}, I wield a ${this.item}, my total health point are ${this.maxHealth}`);
  };
}

var createCounter = 0;
var moves = 0
var character1, character2, player1, player2;
var players = []
var state = {
  creation: false,
  attacking: false,
  turn: false
}
var currentTurn = 1;


/* Eventlistener */
createButton.addEventListener("click", createState);
startButton.addEventListener("click", readyState);

function createState() {
  state.creation = true;

  var characterName = document.getElementById('name');
  var characterRace = document.getElementById('race');
  var characterItem = document.getElementById('item');

  createCounter++;
  /* console.log(createCounter); */
  if (createCounter === 1) {
    //create character1
    //put values in player object
    /* character1 = {
      name: characterName.value,
      race: characterRace.value,
      item: characterItem.value
    } */
    character1 = {
      name: 'Frances',
      race: 'orcs',
      item: 'boots'
    }

    player1 = new Person(character1.race, character1.item, character1.name, createCounter);


    playerDescription.innerHTML = 'Player 2';

  } else if (createCounter === 2) {
    //create character2
    /* character2 = {
      name: characterName.value,
      race: characterRace.value,
      item: characterItem.value
    } */

    character2 = {
      name: 'Joffany',
      race: 'orcs',
      item: 'boots'
    }

    player2 = new Person(character2.race, character2.item, character2.name, createCounter);

    //change the create state to game state 
    startPanel.style.display = 'block';
    creationPanel.style.display = "none";

    createCounter = 0;
    playerDescription.innerHTML = 'Player 1';

    races(player1, player2, player1.race, state)
    races(player2, player1, player2.race, state)
  } else {
    console.log("There is something wrong");
  }

  characterName.value = '';
  characterRace.value = '';
  characterItem.value = '';
  state.creation = false;
}

function readyState() {
  startPanel.style.display = 'none';
  logPanel.style.display = 'block';
  movesPanel.style.display = "block";

  //Show player health bar
  player1Stat.style.visibility = "visible";
  player2Stat.style.visibility = "visible";

  showName1.innerHTML = character1.name;
  showName2.innerHTML = character2.name;

  p1Health.innerText = `${player1.currenthealth} / ${player1.maxHealth}`;
  p2Health.innerText = `${player2.currenthealth} / ${player2.maxHealth}`;

  healthAnimation(0, player1.currenthealth, player1.maxHealth, p1Health);
  healthAnimation(0, player2.currenthealth, player2.maxHealth, p2Health);

  /* players = [player1, player2]
  do {
    for
  } while (condition); */
  setTimeout(() => {
    if (currentTurn === 1) {
      turn(player1, player2)
    } else if (currentTurn === 2) {
      turn(player2, player1)
    }
  }, "1500")

}

function healthAnimation(from, to, totalPercent, sliderName) {
  sliderName.animate([
    { width: `${100 * from / totalPercent}%` },
    { width: `${100 * to / totalPercent}%` },
  ], {
    duration: 1000,
    fill: "forwards",
  });
}

/* function isTurn(turn) {    
    races();
    if (turn === 0) {
        console.log(/*`${character1.name}'s Turn`*//*"Frances's Turn");
console.log(turn);
hit1.disabled = false;
heal1.disabled = false;
yield1.disabled = false;

hit2.disabled = true;
heal2.disabled = true;
yield2.disabled = true;
 
console.log(hero);
}
if (turn === 1) {
console.log(/*`${character2.name}'s Turn`*//*"Happy's Turn");
console.log(turn);
hit1.disabled = true;
heal1.disabled = true;
yield1.disabled = true;

hit2.disabled = false;
heal2.disabled = false;
yield2.disabled = false;

console.log(enemy);
}
} */