import { Person } from "./character.js";

//Initialize Temporary Characters
const player1 = new Person("vampire", "sword", "Frances");
const player2 = new Person("elf", "boots", "Computer");

player1.currenthealth = 70

let turn = 0;
let starting = 1;

counter(turn);

function counter(turn) {
  let move;

  if (turn == 0) {
    races(player1, player2);
    if (player1.race === "vampire") {
      const lifeStealFromOpponent = player2.currenthealth * 0.1;
      player2.currenthealth -= lifeStealFromOpponent;
      player1.currenthealth += lifeStealFromOpponent;
      checkGameOver(player1);
    }
    console.log(`${player1.name} turn!`);
    console.log(`Current Health: ${player1.currenthealth}`);

    if (starting === 1) {
      move = prompt("What is your move? \n 1 - Attack \n 2 - Heal \n 3 - Surrender \n Please enter the number:");
      starting = 0;
    } else {
      move = prompt("Please try again! What is your move? \n 1 - Attack \n 2 - Heal \n 3 - Surrender \n Please enter the number:");
    }

    console.log(`${player1.name} choose ${move}`);
    races(player1, player2);
    checkMove(player1, player2, move);
    checkGameOver(player1);
  } else {
    races(player2, player1);
    if (player2.race === "vampire") {
      const lifeStealFromOpponent = player1.currenthealth * 0.1;
      player1.currenthealth -= lifeStealFromOpponent;
      player2.currenthealth += lifeStealFromOpponent;
      checkGameOver(player2);
    }
    console.log(`${player2.name} turn!`);
    console.log(`Current Health: ${player2.currenthealth}`);

    if (starting === 1) {
      move = prompt("What is your move? \n 1 - Attack \n 2 - Heal \n 3 - Surrender \n Please enter the number:");
      starting = 0;
    } else {
      move = prompt("Please try again! What is your move? \n 1 - Attack \n 2 - Heal \n 3 - Surrender \n Please enter the number:");
    }

    console.log(`${player2.name} choose ${move}`);
    races(player2, player1);
    checkMove(player2, player1, move);
    checkGameOver(player2);

    /* if (player2.currenthealth <= 0) {
      console.log(`Game over! ${player1.name} WON!`);
    } else if (player2.currenthealth > 0) {
      console.log(`${player2.name} turn!`);
    } */
  }
}

/* function item(player, opponent) {
  if (opponent.item === "boots") {
    const randomLuck = Math.floor(Math.random() * 100 + 1);
    if (randomLuck <= 1 || randomLuck >= 30) {
      console.log(`${opponent.name} is lucky. She/He dodge your attack.`);
    } else {
      console.log(`${opponent.name} is not lucky. She/He can't dodge your attack.`);
      opponent.currenthealth -= player.damage
    }
  }
} */

function races(player, opponent) {
  let damagePower = player.damage();

  if (opponent.race === "human") {
    console.log("Initial Damage: ", damagePower);
    damagePower -= Math.round(damagePower * 0.2);
    console.log("Total Damage: ", damagePower);
    return { damagePower };
  } else if (opponent.race === "elf") {
    const luckNumber = randomLuck();
    if (luckNumber >= 1 && luckNumber <= 30) {
      console.log(`${opponent.name} is lucky. She/He deflect your attack.`);
      console.log("Initial: ", damagePower);
      damagePower += Math.round(damagePower * 0.3);
      console.log("Final: ", damagePower);
      //player.currenthealth -= damagePower;      
      //console.log("The 30% damage was deflected to you.");
      return { damagePower, luck: true, message: "The 30% damage was deflected to you." };
    } else {
      console.log(`${opponent.name} is not lucky. She/He can't deflect your attack.`);
      return { playerDamage: 0, opponentDamage: damagePower, message: "You're opponent take the hit." };
    }
  }
}

function randomLuck() {
  return Math.floor(Math.random() * 100 + 1);
}

function checkMove(player, opponent, move) {
  switch (move) {
    case "1":
      console.log(`${player.name} wants to attack opponent`);


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
      break;

    default:
      console.log(`${player.name} choose a wrong move!`);
      counter(turn);
      break;
  }
}

function checkGameOver(player) {
  if (currenthealth <= 0) {
    console.log("Gameover!");
    console.log(`${player.name} lost her life.`);
    return true;
  }else{
    return false;
  }
}
