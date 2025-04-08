//import { getCurrentInstance } from "vue";
import { Person, player1, player2, starting, playerOneAttack, playerOneHeal, playerOneYield, playerTwoAttack, playerTwoHeal, playerTwoYield, startButton } from "./character.js";

//Initialize Temporary Characters
//const player1 = new Person("human", "bow", "Frances");
//const player2 = new Person("elf", "boots", "Computer");

//player1.displayChar();
//player2.displayChar();

let turn = 0;

let gameOver = 0;
console.log(player1, player2);

if (player1 != null && player2 != null) {
  console.log(player1, player2);
  do {
    counter(turn);
  }
  while (gameOver === 0);
}


function counter(turn) {

  let move;



  if (turn == 0) {

    playerTwoAttack.disabled = true;
    playerTwoHeal.disabled = true;
    playerTwoYield.disabled = true;


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




    /* if (starting === 1) {
      move = prompt("What is your move? \n 1 - Attack \n 2 - Heal \n 3 - Surrender \n Please enter the number:");
      starting = 0;
    } else {
      move = prompt("Please try again! What is your move? \n 1 - Attack \n 2 - Heal \n 3 - Surrender \n Please enter the number:");
    } */

    //console.log(`${player1.name} choose ${move}`);
    //checkMove(player1, player2, move);

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

    /* if (starting === 1) {
      move = prompt("What is your move? \n 1 - Attack \n 2 - Heal \n 3 - Surrender \n Please enter the number:");
      starting = 0;
    } else {
      move = prompt("Please try again! What is your move? \n 1 - Attack \n 2 - Heal \n 3 - Surrender \n Please enter the number:");
    } */

    //console.log(`${player2.name} choose ${move}`);
    //checkMove(player2, player1, move);
  }
}

function item(player, damagePower = player.damage()) {
  console.log(damagePower);
  if (player.item === "sword") {
    damagePower += damagePower * 0.3;
    return { damagePower, chanceAttack: false, chanceDodge: false };
  } else if (player.item === "bow") {
    const luckNumber = randomLuck();
    if (luckNumber >= 1 && luckNumber <= 30) {
      console.log(`${player.name} is lucky. Attack twice!`);
      return { damagePower, chanceAttack: true, chanceDodge: false };
    } else {
      console.log(`${player.name} is unlucky. Attack once!`);
      return { damagePower, chanceAttack: false, chanceDodge: false };
    }
  } else if (player.item === "boots") {
    const luckNumber = randomLuck();
    if (luckNumber >= 1 && luckNumber <= 30) {
      console.log(`${player.name} is lucky. Dodge attack`);
      return { damagePower, chanceAttack: false, chanceDodge: true };
    } else {
      console.log(`${player.name} is unlucky. Cannot dodge attack`);
      return { damagePower, chanceAttack: false, chanceDodge: false };
    }
  } else {
    return { damagePower, chanceAttack: false, chanceDodge: false };
  }
}

function races(player, damagePower) {

  if (player.race === "human") {
    console.log("Initial Damage: ", damagePower);
    damagePower -= Math.round(damagePower * 0.2);
    console.log("Total Damage: ", damagePower);
    return { damagePower };

  } else if (player.race === "elf") {
    let hasChanceDeflect;
    const luckNumber = randomLuck();

    if (luckNumber >= 1 && luckNumber <= 30) {
      console.log(`${player.name} is lucky. She/He deflect your attack.`);
      console.log("Initial: ", damagePower);
      damagePower -= Math.round(damagePower * 0.3);
      console.log("Final: ", damagePower);
      hasChanceDeflect = true;
    } else {
      console.log(`${player.name} is not lucky. She/He can't deflect your attack.`);
      hasChanceDeflect = false;
    }

    return { damagePower, chanceDeflect: hasChanceDeflect };
  }
}

function randomLuck() {
  return Math.floor(Math.random() * 100 + 1);
}

function checkMove(player, opponent, move) {
  switch (move) {
    case "1":
      //computing the damage to give to the opponent
      console.log(`${player.name} wants to attack opponent`);
      const playerDamagePower = item(player);
      console.log(playerDamagePower);
      const initialDamage = races(opponent, playerDamagePower.damagePower);
      console.log(initialDamage);
      const opponentDamagePower = item(opponent, initialDamage.damagePower);
      console.log(opponentDamagePower, opponentDamagePower.chanceDodge);

      if (initialDamage.chanceDeflect) {
        const currenthealth = player.currenthealth - initialDamage.damagePower;
        if (currenthealth <= 0) {
          console.log("Gameover!");
          console.log(`${player.name} lost her life.`);
          gameOver = 1;
          return;
        } else {
          player.currenthealth = currenthealth;
        }
      } else {
        const currenthealth = opponent.currenthealth - opponentDamagePower.damagePower;
        if (currenthealth <= 0) {
          console.log("Gameover!");
          console.log(`${opponent.name} lost her life.`);
          gameOver = 1;
          return;
        } else {
          opponent.currenthealth = currenthealth;
        }
      }

      if (!opponentDamagePower.chanceDodge) {
        const currenthealth = opponent.currenthealth - opponentDamagePower.damagePower;
        //const isGameOver = checkGameOver(currenthealth);
        if (currenthealth <= 0) {
          console.log("Gameover!");
          console.log(`${opponent.name} lost her life.`);
          gameOver = 1;
          return;
        } else {
          opponent.currenthealth = currenthealth;
        }
      }

      //check chance attack
      if (playerDamagePower.chanceAttack) {

        const secondDamageAttack = player.damage();
        console.log(secondDamageAttack);
        const initialDamage = races(opponent, secondDamageAttack);
        console.log(initialDamage);
        const opponentDamagePower = item(opponent, initialDamage.damagePower);
        console.log(opponentDamagePower, opponentDamagePower.chanceDodge);

        if (initialDamage.chanceDeflect) {
          const currenthealth = player.currenthealth - initialDamage.damagePower;
          if (currenthealth <= 0) {
            console.log("Gameover!");
            console.log(`${player.name} lost her life.`);
            gameOver = 1;
            return;
          } else {
            player.currenthealth = currenthealth;
          }
        }

        if (!opponentDamagePower.chanceDodge) {
          const currenthealth = opponent.currenthealth - opponentDamagePower.damagePower;

          if (currenthealth <= 0) {
            console.log("Gameover!");
            console.log(`${opponent.name} lost her life.`);
            gameOver = 1;
            return;
          } else {
            opponent.currenthealth = currenthealth;
          }
        }
      }

      if (turn === 0) {
        turn = 1;
      } else {
        turn = 0;
      }
      starting = 1;
      counter(turn);
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

function checkGameOver(player, currenthealth) {
  if (currenthealth <= 0) {
    console.log("Gameover!");
    console.log(`${player.name} lost her life.`);
    gameOver = 1;
    return true;
  }
  return false;
}
