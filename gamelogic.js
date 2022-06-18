/* Eventlistener */
/* heal1.addEventListener("click", healing);
heal2.addEventListener("click", healing); */
hit1.addEventListener("click", attack);
hit2.addEventListener("click", attack);
yield1.addEventListener("click", yield)
yield2.addEventListener("click", yield)

function races(currentPlayer, opponent, race, state) {

  /* currentPlayer.oldhealth = currentPlayer.currenthealth
  opponent.oldhealth = opponent.currenthealth */

  switch (race) {
    case "humans":
      if (state.attacking) {
        // 20% less damage taken
        currentPlayer.totalDamage -= parseInt(currentPlayer.totalDamage * 0.2)
        /* damage += damage * 0.2
        currentPlayer.displayChar() */
        opponent.oldhealth = opponent.currenthealth
        opponent.currenthealth -= currentPlayer.totalDamage
      }

      break;

    case "orcs":
      if (state.creation) {
        // 40% more max health
        currentPlayer.maxHealth += parseInt(currentPlayer.maxHealth * 0.4)
        currentPlayer.currenthealth = currentPlayer.oldhealth = currentPlayer.maxHealth
        console.log(`${currentPlayer.name} has increase in his max health`);
      }

      break;

    case "elves":
      if (state.attacking) {
        // 30% chance to deflect the attack back to opponent
        const randomNumber = Math.floor(Math.random() * (100 - 1) + 1)
        if (randomNumber <= 30) {
          //the attacker takes damage equal to 50% of the original hit
          currentPlayer.oldhealth = currentPlayer.currenthealth
          currentPlayer.totalDamage -= parseInt(currentPlayer.totalDamage * 0.5)
          currentPlayer.currenthealth -= currentPlayer.totalDamage

          /* currentPlayer.displayChar() */
          /* return true */
          break
        } else {
          opponent.oldhealth = opponent.currenthealth
          opponent.currenthealth -= currentPlayer.damage()

          break
        }
      }
      break;

    case "vampires":
      if (state.turn) {
        // 10% lifesteal from opponents current health at the start of the vampires turn
        opponent.oldhealth = opponent.currenthealth
        opponent.currenthealth -= parseInt(opponent.currenthealth * 0.1)

        /* if (currentPlayer.player === 1) {
          console.log(opponent.currenthealth, opponent.player);
          healthAnimation(opponent.oldhealth, opponent.currenthealth, p2Health);
        } else if (currentPlayer.player === 2) {
          console.log(opponent.currenthealth, opponent.player);
          healthAnimation(opponent.oldhealth, opponent.currenthealth, p1Health);
        } else {
          console.log("there is a problem");
        } */

        console.log(`${currentPlayer.name} is a Vampire. Steals life from ${opponent.name}`);
      }
      break;

    default:
      console.log('Race is not valid');
      break;
  }
}

function items(currentPlayer, opponent, item) {
  /* currentPlayer.oldhealth = currentPlayer.currenthealth
  opponent.oldhealth = opponent.currenthealth */
  const randomNumber = Math.floor(Math.random() * (100 - 1) + 1);
  switch (item) {
    case 'boots':
      // 30% chance to dodge an attack
      console.log("randomNumber", randomNumber);
      if (randomNumber <= 30) {
        console.log(`${opponent.name} dodge your attack`);
      } else {
        opponent.oldhealth = opponent.currenthealth
        opponent.currenthealth -= currentPlayer.damage()

        if (currentPlayer.player === 1) {

          p2Health.innerText = `${opponent.currenthealth} / ${opponent.maxHealth}`;
          healthAnimation(opponent.oldhealth, opponent.currenthealth, opponent.maxHealth, p2Health);

        } else if (currentPlayer.player === 2) {

          p1Health.innerText = `${opponent.currenthealth} / ${opponent.maxHealth}`;
          healthAnimation(opponent.oldhealth, opponent.currenthealth, opponent.maxHealth, p1Health);

        } else {

          console.log("Cannot find this current player");
        }
      }
      break;

    case 'staff':
      //20% increase in healing
      currentHeal = currentPlayer.heal
      currentHeal += parseInt(currentHeal * 0.2)

      totalCurrentHealth = currentPlayer.currenthealth + currentHeal
      if (totalCurrentHealth > currentPlayer.maxHealth) {
        currentPlayer.oldhealth = currentPlayer.currenthealth
        currentPlayer.currenthealth = currentPlayer.maxHealth
      } else {
        currentPlayer.oldhealth = currentPlayer.currenthealth
        currentPlayer.currenthealth = totalCurrentHealth
      }
      break;

    case 'sword':
      //30% more damage
      currentPlayer.totalDamage += parseInt(currentPlayer.totalDamage * 0.3)
      /* damage += damage * 0.3 */
      opponent.oldhealth = opponent.currenthealth
      opponent.currenthealth -= currentPlayer.totalDamage
      break;

    case 'bow':
      if (randomNumber <= 30) {
        turn(currentPlayer, opponent)
        console.log(`${currentPlayer.name} has another chance to attack`);
        break
      } else {
        return
      }


    default:
      console.log('Item is not valid');
      break;
  }
}

function turn(player, opponent) {
  // total players are 2

  state.turn = true;

  if (currentTurn === 1) {
    hit1.disabled = false;
    heal1.disabled = false;
    yield1.disabled = false;
    hit2.disabled = true;
    heal2.disabled = true;
    yield2.disabled = true;

  } else if (currentTurn === 2) {
    hit1.disabled = true;
    heal1.disabled = true;
    yield1.disabled = true;
    hit2.disabled = false;
    heal2.disabled = false;
    yield2.disabled = false;

  } else {
    console.log("Cannot disable the move buttons");
  }
  console.log("currentTurn", currentTurn);
  console.log(`${player.name}'s Turn`);
  races(player, opponent, player.race, state)

  /* if (player.player === 1) {

    if (player.currenthealth !== player.oldhealth) {
      p1Health.innerText = `${player.currenthealth} / ${player.maxHealth}`;
      healthAnimation(player.oldhealth, player.currenthealth, player.maxHealth, p1Health);
    }

    if (opponent.currenthealth !== opponent.oldhealth) {
      p2Health.innerText = `${opponent.currenthealth} / ${opponent.maxHealth}`;
      healthAnimation(opponent.oldhealth, opponent.currenthealth, opponent.maxHealth, p2Health);
    }

  } else if (player.player === 2) {

    if (player.currenthealth !== player.oldhealth) {
      p2Health.innerText = `${player.currenthealth} / ${player.maxHealth}`;
      healthAnimation(player.oldhealth, player.currenthealth, player.maxHealth, p2Health);
    }

    if (opponent.currenthealth !== opponent.oldhealth) {
      p1Health.innerText = `${opponent.currenthealth} / ${opponent.maxHealth}`;
      healthAnimation(opponent.oldhealth, opponent.currenthealth, opponent.maxHealth, p1Health);
    }

  } else {

    console.log("there is a problem");
  } */

  /** 
   * Disable the button of the opponent
   * Check the race of the current player
   * Check the items of the current player and the opponent
   */

  state.turn = false;

}

function attack() {
  state.attacking = true

  /**
   * Check the item of the current player
   * then check the item of the opponents player and check the race of the opponent
   * 
   * calculate the damage will receive
   */

  /* items(player1, player2, player1.item, player1.healingPower, player.damage) */

  if (currentTurn === 1) {
    const p1pasthealth = player1.currenthealth
    const p2pasthealth = player2.currenthealth

    items(player1, player2, player1.item)
    /* items(player2, player1, player2.item) */

    /* console.log("1", p1pasthealth, p1pasthealth);
    console.log("1", player1.currenthealth, player2.currenthealth);

    if (player1.currenthealth !== p1pasthealth) {
      p1Health.innerText = `${player1.currenthealth} / ${player1.maxHealth}`;
      healthAnimation(player1.oldhealth, player1.currenthealth, player1.maxHealth, p1Health);
      console.log('1 1', player1.currenthealth, player1.oldhealth);
    }

    if (player2.currenthealth !== p2pasthealth) {
      p2Health.innerText = `${player2.currenthealth} / ${player2.maxHealth}`;
      healthAnimation(player2.oldhealth, player2.currenthealth, player2.maxHealth, p2Health);
      console.log('1 2', player2.currenthealth, player2.oldhealth);
    } */
    currentTurn = 2

    turn(player2, player1)

  } else if (currentTurn === 2) {
    /* const p1pasthealth = player1.currenthealth
    const p2pasthealth = player2.currenthealth */

    items(player2, player1, player2.item)/* 
    items(player1, player2, player1.item) */
    /* console.log("2", p1pasthealth, p1pasthealth);
    console.log("2", player1.currenthealth, player2.currenthealth);

    if (player1.currenthealth !== p1pasthealth) {

      p1Health.innerText = `${player1.currenthealth} / ${player1.maxHealth}`;
      healthAnimation(player1.oldhealth, player1.currenthealth, player1.maxHealth, p1Health);
      console.log('2 1', player1.currenthealth, player1.oldhealth);
    }

    if (player2.currenthealth !== p2pasthealth) {
      p2Health.innerText = `${player2.currenthealth} / ${player2.maxHealth}`;
      healthAnimation(player2.oldhealth, player2.currenthealth, player2.maxHealth, p2Health);
      console.log('2 2', player2.currenthealth, player2.oldhealth);
    } */

    currentTurn = 1
    turn(player1, player2)

  } else {
    console.log('There is something wrong with attacking');
  }

  state.attacking = false
}

function yield() {

}


