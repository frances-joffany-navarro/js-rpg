function races(currentPlayer, opponent, race, damage, currentHealth, maxhealth, state) {
  switch (race) {
    case "humans":
      if (state.attacking) {
        // 20% less damage taken
        damage += damage * 0.2
        currentPlayer.displayChar()
        return damage
      }
      break;

    case "orcs":
      if (state.creation) {
        // 40% more max health
        currentPlayer.maxHealth += currentPlayer.maxHealth * 0.4
        currentPlayer.currenthealth = currentPlayer.maxHealth

        currentPlayer.displayChar()
      }

      break;

    case "elves":
      if (state.attacking) {
        // 30% chance to deflect the attack back to opponent
        const randomNumber = Math.floor(Math.random() * (100 - 1) + 1)
        console.log(randomNumber);
        if (randomNumber <= 30) {
          //the attacker takes damage equal to 50% of the original hit
          currentPlayer.displayChar()
          return true
        } else {
          currentPlayer.displayChar()
          return false
        }
      }
      break;

    case "vampires":
      if (state.turn) {
        // 10% lifesteal from opponents current health at the start of the vampires turn
        opponent.currenthealth -= opponent.currenthealth * 0.1
        console.log(`${currentPlayer.name} is a Vampire. Steals life from ${opponent.name}`);
      }
      break;

    default:
      console.log('Race is not valid');
      break;
  }
}

function items(currentPlayer, opponent, item, healingPower, damage) {
  const randomNumber = Math.floor(Math.random() * (100 - 1) + 1);
  switch (item) {
    case 'boots':
      // 30% chance to dodge an attack

      if (randomNumber <= 30) {
        return true
      } else {
        return false
      }

    case 'staff':
      //20% increase in healing
      currentHeal = currentPlayer.heal
      currentHeal += currentHeal * 0.2

      totalCurrentHealth = currentPlayer.currenthealth + currentHeal
      if(totalCurrentHealth > currentPlayer.maxHealth){
        currentPlayer.currenthealth = currentPlayer.maxHealth
      } else {
        currentPlayer.currenthealth = totalCurrentHealth
      }
      break;

    case 'sword':
      //30% more damage
      damage += damage * 0.3
      return damage

    case 'bow':
      if (randomNumber <= 30) {
        return true
      } else {
        return false
      }

    default:
      console.log('Item is not valid');
      break;
  }
}

function turn(player, opponent) {
  // total players are 2
  state.turn = true;

  console.log(`${player.name}'s Turn`);

  races(player, opponent, player.race, player.damage, opponent.currenthealth, player.maxHealth, state)

  /** 
   * Disable the button of the opponent
   * Check the race of the current player
   * Check the items of the current player and the opponent
   */
  state.turn = false;
}

function items1() {

  if (turn === 0) {
    if (enemy.item === "boots") {
      //console.log("30% chance to dodge an attack");
      let rdm = Math.floor(Math.random() * 100) + 1;
      console.log(`Random Number: ${rdm}`);
      if (rdm <= (100 * 0.3)) {
        console.log("Dodge the attack");
        hero.totalDamage = 0;
      } else {
        console.log("Did NOT dodge the attack");
      }
    }

    if (hero.item === "staff") {
      console.log("20% increase in healing");
      hero.maxHealing += (hero.maxHealing * 0.2);
    }

    if (hero.item === "sword") {
      console.log("30% more damage");
      hero.totalDamage += Math.round((hero.totalDamage * 0.3));
    }

    if (hero.item === "bow") {
      var heroAttackTwice = false;
      //console.log("30% chance to attack twice");
      let rdm = Math.floor(Math.random() * 100) + 1;
      console.log(`Random Number: ${rdm}`);
      if (rdm <= (100 * 0.3)) {
        console.log("Have chance to attack twice");
        heroAttackTwice = true;
        var heroChance = 2;
        while (heroChance !== 0) {
          //attack();
          heroChance--;
        }
        heroAttackTwice = false;
      } else {
        console.log("NO chance to attack twice");
        //turn of the the opponent
      }
    }
  } else {

    if (hero.item === "boots") {
      //console.log("30% chance to dodge an attack");
      let rdm = Math.floor(Math.random() * 100) + 1;
      console.log(`Random Number: ${rdm}`);
      if (rdm <= (100 * 0.3)) {
        console.log("Dodge the attack");
        enemy.totalDamage = 0;
      } else {
        console.log("Did NOT dodge the attack");
      }
    }

    if (enemy.item === "staff") {
      console.log("20% increase in healing");
      enemy.maxHealing += (enemy.maxHealing * 0.2);
    }

    if (enemy.item === "sword") {
      console.log("30% more damage");
      enemy.totalDamage += Math.round((enemy.totalDamage * 0.3));
    }

    if (enemy.item === "bow") {
      var enemyAttackTwice = false;
      //console.log("30% chance to attack twice");
      let rdm = Math.floor(Math.random() * 100) + 1;
      console.log(`Random Number: ${rdm}`);
      if (rdm <= (100 * 0.3)) {
        console.log("Have chance to attack twice");
        enemyAttackTwice = true;
        var enemyChance = 2;
        while (enemyChance !== 0) {
          //attack();
          enemyChance--;
        }
        enemyAttackTwice = false;
      } else {
        console.log("NO chance to attack twice");
        //turn of the the opponent
      }
    }
  }
}

/* function races(players) {
  if (turn === 1) {
    opponent = 0;
  } else {
    opponent = 1;
  }

  switch (players[turn].race) {
    case humans:
      console.log();
      players[opponent].totalDamage -= Math.round((players[opponent].totalDamage * 0.2));
      break;

    case orcs:

      break;

    case elves:

      break;

    case vampires:

      break;

    default:
      console.log('Races is invalid');
      break;
  }
}
 */

function healing() {

}

function attack() {
  state.attacking = true

  /**
   * Check the item of the current player
   * then check the item of the opponents player and check the race of the opponent
   * 
   * calculate the damage will receive
   */

  items(player1, player2, player1.item, player1.healingPower, player.damage)

  state.attacking = false

  /* if (turn === 0) {
    let oldCurrenthealth = enemy.currenthealth;
    enemy.currenthealth -= hero.totalDamage;

    if (enemy.currenthealth <= 0) {
      console.log(`Gameover. ${character1.name} Won! \n ${character2.name} Lose.`);
    } else {
      turn = 1;

      hero.totalDamage = hero.damage();
      isTurn(turn);
    }

    healthAnimation(oldCurrenthealth, enemy.currenthealth, p2Health);
    p2Health.innerText = `${enemy.currenthealth} / ${enemy.maxHealth}`;

  } else {
    let oldCurrenthealth = hero.currenthealth;
    hero.currenthealth -= enemy.totalDamage;

    if (hero.currenthealth <= 0) {
      console.log(`Gameover. ${character2.name} Won! \n ${character1.name} Lose.`);
    } else {
      turn = 0;

      enemy.totalDamage = enemy.damage();
      isTurn(turn);
    }

    healthAnimation(oldCurrenthealth, hero.currenthealth, p1Health);
    p1Health.innerText = `${hero.currenthealth} / ${hero.maxHealth}`;
  } */
}

function yield() {

}


