import { Person } from "./character.js";

//Initialize Temporary Characters
const player1 = new Person("human", "sword", "Frances");
const player2 = new Person("human", "boots", "Computer");

player1.displayChar();
player2.displayChar();

player1.currenthealth = 70

let turn = 0;
let starting = 1;
let gameOver = 0;
do {
  counter(turn);
}
while (gameOver === 0);


function counter(turn) {

  let move;

  if (turn == 0) {
    if (player1.race === "vampire") {
      const lifeStealFromOpponent = Math.round(player2.currenthealth * 0.1);
      const p1CurrentHealth = player1.currenthealth + lifeStealFromOpponent;
      const p2CurrentHealth = player2.currenthealth - lifeStealFromOpponent;
      console.log(lifeStealFromOpponent, p1CurrentHealth, p2CurrentHealth);

      if (p1CurrentHealth > player1.maxHealth) {
        player1.currenthealth = player1.maxHealth;
      } else {
        player1.currenthealth = p1CurrentHealth;
      }

      if (p2CurrentHealth <= 0) {
        console.log("Gameover!");
        console.log(`${player2.name} lost her life.`);
        gameOver = 1;
      } else {
        player2.currenthealth = p2CurrentHealth;
      }
    }
    console.log(`${player1.name} turn!`);
    console.log(`Player 1's Current Health: ${player1.currenthealth}`);
    console.log(`Player 2's Current Health: ${player2.currenthealth}`);


    if (starting === 1) {
      move = prompt("What is your move? \n 1 - Attack \n 2 - Heal \n 3 - Surrender \n Please enter the number:");
      starting = 0;
    } else {
      move = prompt("Please try again! What is your move? \n 1 - Attack \n 2 - Heal \n 3 - Surrender \n Please enter the number:");
    }

    console.log(`${player1.name} choose ${move}`);
    //races(player1, player2);
    checkMove(player1, player2, move);
    //gameOver = checkGameOver(player1);
  } else {

    if (player2.race === "vampire") {
      const lifeStealFromOpponent = Math.round(player1.currenthealth * 0.1);
      const p1CurrentHealth = player1.currenthealth - lifeStealFromOpponent;
      const p2CurrentHealth = player2.currenthealth + lifeStealFromOpponent;

      if (p2CurrentHealth > player2.maxHealth) {
        player1.currenthealth = player1.maxHealth;
      } else {
        player2.currenthealth = p2CurrentHealth;
      }

      if (p1CurrentHealth <= 0) {
        console.log("Gameover!");
        console.log(`${player1.name} lost her life.`);
        gameOver = 1;
      } else {
        player1.currenthealth = p1CurrentHealth;
      }
    }
    console.log(`${player2.name} turn!`);
    console.log(`Player 1's Current Health: ${player1.currenthealth}`);
    console.log(`Player 2's Current Health: ${player2.currenthealth}`);

    if (starting === 1) {
      move = prompt("What is your move? \n 1 - Attack \n 2 - Heal \n 3 - Surrender \n Please enter the number:");
      starting = 0;
    } else {
      move = prompt("Please try again! What is your move? \n 1 - Attack \n 2 - Heal \n 3 - Surrender \n Please enter the number:");
    }

    console.log(`${player2.name} choose ${move}`);
    //races(player2, player1);
    checkMove(player2, player1, move);
    // gameOver = checkGameOver(player2);

    /* if (player2.currenthealth <= 0) {
      console.log(`Game over! ${player1.name} WON!`);
    } else if (player2.currenthealth > 0) {
      console.log(`${player2.name} turn!`);
    } */
  }
}

function item(player, damagePower = player.damage()) {
  /* if (opponent.item === "boots") {
    const randomLuck = Math.floor(Math.random() * 100 + 1);
    if (randomLuck <= 1 || randomLuck >= 30) {
      return
    } else {
      console.log(`${opponent.name} is not lucky. She/He can't dodge your attack.`);
      opponent.currenthealth -= player.damage
    }
  } */
  if (player.item === "sword") {
    damagePower += damagePower * 0.3;
    return damagePower;
  }
}

function races(opponent, damagePower) {

  if (opponent.race === "human") {
    console.log("Initial Damage: ", damagePower);
    damagePower -= Math.round(damagePower * 0.2);
    console.log("Total Damage: ", damagePower);
    return { damagePower };
  } /* else if (opponent.race === "elf") {
    const luckNumber = randomLuck();
    if (luckNumber >= 1 && luckNumber <= 30) {
      console.log(`${opponent.name} is lucky. She/He deflect your attack.`);
      console.log("Initial: ", damagePower);
      damagePower += Math.round(damagePower * 0.3);
      console.log("Final: ", damagePower);
      //player.currenthealth -= damagePower;      
      //console.log("The 30% damage was deflected to you.");
      return { playerDamage: damagePower, opponentDamage: 0, chances: 2, message: "The 30% damage was deflected to you." };
    } else {
      console.log(`${opponent.name} is not lucky. She/He can't deflect your attack.`);
      return { playerDamage: 0, opponentDamage: damagePower, chances: 1, message: "You're opponent take the hit." };
    }
  } */
}

function randomLuck() {
  return Math.floor(Math.random() * 100 + 1);
}

function checkMove(player, opponent, move) {
  switch (move) {
    case "1":
      //computing the damage to give to the opponent
      console.log(`${player.name} wants to attack opponent`);
      let initialDamagePower = item(player);
      console.log(initialDamagePower);
      console.log(races(opponent, initialDamagePower));


      if (turn === 0) {
        turn = 1;
      } else {
        turn = 0;
      }
      gameOver = 1;
      //starting = 1;
      //counter(turn);
      break;

    case "2":
      if (player.currenthealth === player.maxHealth) {
        console.log(`${player.name} current health is still full. Pick another move.`);
        counter(turn);

      } else {
        let healingPower = player.heal();
        let currenthealth = 0;
        if (player.item === "staff") {
          //20% increase in healing
          healingPower += healingPower * 0.2;
        }

        currenthealth = player.currenthealth + healingPower;

        if (currenthealth >= player.maxHealth) {
          player.currenthealth = player.maxHealth;
        } else {
          player.currenthealth = currenthealth;
        }
        console.log(`${player.name}'s current health: ${player.currenthealth}`);

        if (turn === 0) {
          turn = 1;
        } else {
          turn = 0;
        }
        starting = 1;
        counter(turn);
      }
      break;

    case "3":
      console.log(`${player.name} has surrendered \n${opponent.name} Won!`);
      gameOver = 1;
      break;

    default:
      console.log(`${player.name} choose a wrong move!`);
      counter(turn);
      break;
  }
}

function checkGameOver(player) {
  if (player.currenthealth <= 0) {
    console.log("Gameover!");
    console.log(`${player.name} lost her life.`);
    return true;
  } else {
    return false;
  }
}
