import { Person } from "./character.js";

//Initialize Temporary Characters
const player1 = new Person("humans", "sword", "Frances");
const player2 = new Person("orcs", "boots", "Computer");

let gameEvents = {
  "creation": true,
  "attack": false,
  "healing": false
};

player1.displayChar(), player2.displayChar()



function race(player, opponent) {
  switch (player.race) {
    case "humans":
      //20% less damage taken

      break;

    case "orcs":
      /* 40% more max health - this applies only on creation */
      if (gameEvents.creation == true) {
        player.maxHealth += player.maxHealth * 0.4;
      }

      break;

    case "elves":
      //30% chance to deflect the attack back to the opponent. 
      // The attacker takes damage equal to 50% of the original hit. 
      // The elf takes no damage.
      const randomLuck = Math.floor(Math.random() * 100) + 1;
      if (randomLuck <= 30) {
        totalDamage = 0;
        opponent.totalDamage
      } else {
        totalDamage = randomDamageNumber;
      }
      break;

    case "vampires":

      break;

    default:
      break;
  }
}