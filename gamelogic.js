import { Person } from "./character.js";

//Initialize Temporary Characters
const player1 = new Person("humans", "sword", "Frances");
const player2 = new Person("orcs", "boots", "Computer");

let turn = 0;

if (turn == 0) {
  if (player1.currenthealth <= 0) {
    console.log(`Game over! ${player2.name} WON!`);
  } else if (player1.currenthealth > 0) {
    console.log(`${player1.name} turn!`);
  }
} else {
  if (player2.currenthealth <= 0) {
    console.log(`Game over! ${player1.name} WON!`);
  } else if (player2.currenthealth > 0) {
    console.log(`${player2.name} turn!`);
  }
}

function attack() {

}
