import { Person } from "./character.js";

//Initialize Temporary Characters
const player1 = new Person("human", "sword", "Frances");
const player2 = new Person("orc", "boots", "Computer");

player1.currenthealth = 70;

let turn = 0;

counter(turn);

function counter(turn) {
  if (turn == 0) {
    console.log(`${player1.name} turn!`);
    console.log(`Current Health: ${player1.currenthealth}`);

    let move = prompt("What is your move? \n 1 - Attack \n 2 - Heal \n 3 - Surrender \n Please enter the number:");
    console.log(`${player1.name} choose ${move}`);
    checkMove(player1, player2, move);
    //Next Player
    /* if (move != "3") {
      turn = 1;
      counter(turn);
    } else {
      console.log("Game Over");
    } */

  } else {
    console.log(`${player2.name} turn!`);
    console.log(`Current Health: ${player2.currenthealth}`);

    let move = prompt("What is your move? \n 1 - Attack \n 2 - Heal \n 3 - Surrender \n Please enter the number:");
    console.log(`${player2.name} choose ${move}`);
    checkMove(player2, player1, move);

    /* //Next Player
    if (move != "3") {
      turn = 0;
      counter(turn);
    } else {
      console.log("Game Over");
    } */

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
        console.log(`${player.name} current health is still full.`);
        move = prompt("Please try again! What is your move? \n 1 - Attack \n 2 - Heal \n 3 - Surrender \n Please enter the number:");
        console.log(`${player.name} choose ${move}`);
        checkMove(player, player2, move);
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
      }
      break;

    case "3":
      console.log(`${player.name} has surrendered \n${opponent.name} Won!`);
      break;

    case "null":
      break;

    default:
      console.log(`${player.name} choose a wrong move!`);
      move = prompt("Please try again! What is your move? \n 1 - Attack \n 2 - Heal \n 3 - Surrender \n Please enter the number:");
      console.log(`${player.name} choose ${move}`);
      checkMove(player, player2, move);
      break;
  }
}
