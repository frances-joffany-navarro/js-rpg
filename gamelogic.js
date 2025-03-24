import { Person } from "./character.js";

//Initialize Temporary Characters
const player1 = new Person("human", "sword", "Frances");
const player2 = new Person("orc", "boots", "Computer");

player1.currenthealth = 70;

let turn = 0;
let starting = 1;

counter(turn);

function counter(turn) {
  let move;
  if (turn == 0) {
    console.log(`${player1.name} turn!`);
    console.log(`Current Health: ${player1.currenthealth}`);

    if (starting === 1) {
      move = prompt("What is your move? \n 1 - Attack \n 2 - Heal \n 3 - Surrender \n Please enter the number:");
      starting = 0;
    } else {
      move = prompt("Please try again! What is your move? \n 1 - Attack \n 2 - Heal \n 3 - Surrender \n Please enter the number:");
    }

    console.log(`${player1.name} choose ${move}`);
    checkMove(player1, player2, move);
  } else {
    console.log(`${player2.name} turn!`);
    console.log(`Current Health: ${player2.currenthealth}`);

    if (starting === 1) {
      move = prompt("What is your move? \n 1 - Attack \n 2 - Heal \n 3 - Surrender \n Please enter the number:");
      starting = 0;
    } else {
      move = prompt("Please try again! What is your move? \n 1 - Attack \n 2 - Heal \n 3 - Surrender \n Please enter the number:");
    }

    console.log(`${player2.name} choose ${move}`);
    checkMove(player2, player1, move);

    /* if (player2.currenthealth <= 0) {
      console.log(`Game over! ${player1.name} WON!`);
    } else if (player2.currenthealth > 0) {
      console.log(`${player2.name} turn!`);
    } */
  }
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
