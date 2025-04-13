import { player1, player2, starting, playerOneAttack, playerOneHeal, playerOneYield, playerTwoAttack, playerTwoHeal, playerTwoYield, startButton, move, gameOver, playerOneStatHealth, playerTwoStatHealth } from "./character.js";

//Initialize Temporary Characters
//const player1 = new Person("human", "bow", "Frances");
//const player2 = new Person("elf", "boots", "Computer");

//player1.displayChar();
//player2.displayChar();

let turn = 0;

let isGameOver = false;
//console.log(player1, player2);

//if (player1 != null && player2 != null) {
//if (starting) {

//  console.log(player1, player2);

setTimeout(() => {
  console.log(player1, player2); // 

  playerOneStatHealth.ariaValueNow = player1.currenthealth;
  playerOneStatHealth.ariaValueMax = player1.maxHealth;
  playerOneStatHealth.style.width = `${player1.currenthealth}%`

  playerTwoStatHealth.ariaValueNow = player2.currenthealth;
  playerTwoStatHealth.ariaValueMax = player2.maxHealth;
  playerTwoStatHealth.style.width = `${player2.currenthealth}%`

  //do {
  counter(turn);

  //}
  //while (gameOver === 0);
}, 20000);


//}


function counter(turn) {

  //let move;

  if (turn == 0) {
    playerOneAttack.disabled = false;
    playerOneHeal.disabled = false;
    playerOneYield.disabled = false;

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

        playerOneStatHealth.ariaValueNow = player1.currenthealth;
        playerOneStatHealth.style.width = playerOneStatHealth.innerHTML = `${player1.currenthealth}%`;
      } else {
        player1.currenthealth = p1CurrentHealth;

        playerOneStatHealth.ariaValueNow = player1.currenthealth;
        playerOneStatHealth.style.width = playerOneStatHealth.innerHTML = `${player1.currenthealth}%`;
      }

      if (p2CurrentHealth <= 0) {
        player2.currenthealth = 0;
        playerTwoStatHealth.ariaValueNow = player2.currenthealth;
        playerTwoStatHealth.style.width = playerTwoStatHealth.innerHTML = `${player2.currenthealth}%`;
        console.log("Gameover!");
        console.log(`${player2.name} lost her life.`);
        isGameOver = true;
        gameOver(isGameOver);
      } else {
        player2.currenthealth = p2CurrentHealth;

        playerTwoStatHealth.ariaValueNow = player2.currenthealth;
        playerTwoStatHealth.style.width = playerTwoStatHealth.innerHTML = `${player2.currenthealth}%`;
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
    playerOneAttack.disabled = true;
    playerOneHeal.disabled = true;
    playerOneYield.disabled = true;

    playerTwoAttack.disabled = false;
    playerTwoHeal.disabled = false;
    playerTwoYield.disabled = false;

    if (player2.race === "vampire") {
      const lifeStealFromOpponent = Math.round(player1.currenthealth * 0.1);
      const p1CurrentHealth = player1.currenthealth - lifeStealFromOpponent;
      const p2CurrentHealth = player2.currenthealth + lifeStealFromOpponent;

      if (p2CurrentHealth > player2.maxHealth) {
        player2.currenthealth = player2.maxHealth;

        playerTwoStatHealth.ariaValueNow = player2.currenthealth;
        playerTwoStatHealth.style.width = playerTwoStatHealth.innerHTML = `${player2.currenthealth}%`;
      } else {
        player2.currenthealth = p2CurrentHealth;
        playerTwoStatHealth.ariaValueNow = player2.currenthealth;
        playerTwoStatHealth.style.width = playerTwoStatHealth.innerHTML = `${player2.currenthealth}%`;
      }

      if (p1CurrentHealth <= 0) {
        p1CurrentHealth = 0;
        playerOneStatHealth.ariaValueNow = player1.currenthealth;
        playerOneStatHealth.style.width = playerOneStatHealth.innerHTML = `${player1.currenthealth}%`;

        console.log("Gameover!");
        console.log(`${player1.name} lost her life.`);
        isGameOver = true;
        gameOver(isGameOver);
      } else {
        player1.currenthealth = p1CurrentHealth;
        playerOneStatHealth.ariaValueNow = player1.currenthealth;
        playerOneStatHealth.style.width = playerOneStatHealth.innerHTML = `${player1.currenthealth}%`;
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
    damagePower += Math.round(damagePower * 0.3);
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
  } else {
    return { damagePower };
  }
}

function randomLuck() {
  return Math.floor(Math.random() * 100 + 1);
}

/* function playerStatHealth(player, currenthealth){
  playerOneStatHealth.ariaValueNow = player1.currenthealth;
  playerOneStatHealth.style.width = playerOneStatHealth.innerHTML = `${player1.currenthealth}%`;
} */

function checkMove(player, opponent, move) {
  switch (move) {
    case "1":
      //computing the damage to give to the opponent
      console.log(`${player.name} wants to attack opponent`);
      const playerDamagePower = item(player);
      console.log(playerDamagePower);
      console.log(opponent, playerDamagePower.damagePower);
      const initialDamage = races(opponent, playerDamagePower.damagePower);
      console.log(initialDamage);
      const opponentDamagePower = item(opponent, initialDamage.damagePower);
      console.log(opponentDamagePower, opponentDamagePower.chanceDodge);

      if (initialDamage.chanceDeflect) {
        const currenthealth = player.currenthealth - initialDamage.damagePower;
        if (currenthealth <= 0) {
          console.log("Gameover!");
          console.log(`${player.name} lost her life.`);
          isGameOver = true;
          gameOver(isGameOver);
          return;
        } else {
          player.currenthealth = currenthealth;
        }
      } else {
        const currenthealth = opponent.currenthealth - opponentDamagePower.damagePower;
        if (currenthealth <= 0) {
          console.log("Gameover!");
          console.log(`${opponent.name} lost her life.`);

          if (turn === 0) {
            playerTwoStatHealth.ariaValueNow = opponent.currenthealth;
            playerTwoStatHealth.style.width = playerTwoStatHealth.innerHTML = `${opponent.currenthealth}%`;
          } else {
            playerOneStatHealth.ariaValueNow = opponent.currenthealth;
            playerOneStatHealth.style.width = playerOneStatHealth.innerHTML = `${opponent.currenthealth}%`;
          }

          isGameOver = true;
          gameOver(isGameOver);
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

          if (turn === 0) {
            playerTwoStatHealth.ariaValueNow = opponent.currenthealth;
            playerTwoStatHealth.style.width = playerTwoStatHealth.innerHTML = `${opponent.currenthealth}%`;
          } else {
            playerOneStatHealth.ariaValueNow = opponent.currenthealth;
            playerOneStatHealth.style.width = playerOneStatHealth.innerHTML = `${opponent.currenthealth}%`;
          }

          isGameOver = true;
          gameOver(isGameOver);
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

            if (turn === 0) {
              playerOneStatHealth.ariaValueNow = player.currenthealth;
              playerOneStatHealth.style.width = playerOneStatHealth.innerHTML = `${player.currenthealth}%`;
            } else {
              playerTwoStatHealth.ariaValueNow = player.currenthealth;
              playerTwoStatHealth.style.width = playerTwoStatHealth.innerHTML = `${player.currenthealth}%`;
            }
            isGameOver = true;
            gameOver(isGameOver);
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
            
            if (turn === 0) {
              playerTwoStatHealth.ariaValueNow = opponent.currenthealth;
              playerTwoStatHealth.style.width = playerTwoStatHealth.innerHTML = `${opponent.currenthealth}%`;
            } else {
              playerOneStatHealth.ariaValueNow = opponent.currenthealth;
              playerOneStatHealth.style.width = playerOneStatHealth.innerHTML = `${opponent.currenthealth}%`;
            }

            isGameOver = true;
            gameOver(isGameOver);
            return;
          } else {
            opponent.currenthealth = currenthealth;
          }
        }
      }

      if (turn === 0) {
        playerOneStatHealth.ariaValueNow = player.currenthealth;
        playerOneStatHealth.style.width = playerOneStatHealth.innerHTML = `${player.currenthealth}%`;

        playerTwoStatHealth.ariaValueNow = opponent.currenthealth;
        playerTwoStatHealth.style.width = playerTwoStatHealth.innerHTML = `${opponent.currenthealth}%`;
        turn = 1;
      } else {
        playerOneStatHealth.ariaValueNow = opponent.currenthealth;
        playerOneStatHealth.style.width = playerOneStatHealth.innerHTML = `${opponent.currenthealth}%`;

        playerTwoStatHealth.ariaValueNow = player.currenthealth;
        playerTwoStatHealth.style.width = playerTwoStatHealth.innerHTML = `${player.currenthealth}%`;

        turn = 0;
      }
      //starting = 1;
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

        //change turn and apply currenthealth to player health stat accordingly
        if (turn === 0) {
          playerOneStatHealth.ariaValueNow = player.currenthealth;
          playerOneStatHealth.style.width = playerOneStatHealth.innerHTML = `${player.currenthealth}%`;

          turn = 1;
        } else {
          playerTwoStatHealth.ariaValueNow = player.currenthealth;
          playerTwoStatHealth.style.width = playerTwoStatHealth.innerHTML = `${player.currenthealth}%`;

          turn = 0;
        }
        //starting = 1;
        counter(turn);
      }
      break;

    case "3":
      console.log(`${player.name} has surrendered \n${opponent.name} Won!`);
      isGameOver = true;
      gameOver(isGameOver);
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
    isGameOver = true;
    gameOver(isGameOver);
    return true;
  }
  return false;
}

export { checkMove };