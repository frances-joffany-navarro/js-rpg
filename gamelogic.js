//add event listener
hit1.addEventListener("click", attack);
heal1.addEventListener("click", healing);
yield1.addEventListener("click", surrender);   
//add event listener
hit2.addEventListener("click", attack);
heal2.addEventListener("click", healing);
yield2.addEventListener("click", surrender); 

/*console.log("Player Stat: " + 
            "\n Race: " + player.race + 
            "\n Item: " + player.item + 
            "\n Current Health: " + player.currenthealth +
            "\n Max Health: " +  player.maxHealth + 
            "\n Max Healing: " +  player.maxHealing + 
            "\n Max Damage: " +  player.maxDamage + 
            "\n Heal: " + player.heal() + 
            "\n Damage: " + player.totalDamage +
            "\n Chance: " + player.chance);

console.log("Opponent Stat: " + 
            "\n Race: " + opponent.race + 
            "\n Item: " + opponent.item + 
            "\n Current Health: " + opponent.currenthealth +
            "\n Max Health: " +  opponent.maxHealth + 
            "\n Max Healing: " +  opponent.maxHealing + 
            "\n Max Damage: " +  opponent.maxDamage + 
            "\n Heal: " + opponent.heal() + 
            "\n Damage: " + opponent.totalDamage +
            "\n Chance: " + opponent.chance);*/

//function handles races !! only run once
function races(){
    switch(player.race){
        case "human":
            if(gameState == "attacking"){
                //20% less damage taken
                console.log("Original Hit: " + opponent.totalDamage);
                console.log("20% less: " + opponent.totalDamage * 0.2);
                opponent.totalDamage -= parseInt(opponent.totalDamage * 0.2);
                addLogs("");
            }else{
                console.log("no effect");
                return;
            }            
            break;

        case "orc":
            if(gameState == "creating"){
                console.log("Max Health: " + player.maxHealth);
                console.log("40%+: " + player.maxHealth * 0.4);
                //40% more max health
                player.maxHealth += parseInt(player.maxHealth * 0.4);
                player.currenthealth = player.maxHealth;
            }else{
                console.log("no effect");
                return;
            }            
            break;
            
        case "elf":
            /*
             *30% chance to deflect the attack back to the opponent. 
             *The attacker takes damage equal to 50% of the original hit. 
             *The elf takes no damage.
            */
            if(gameState == "attacking"){ //player.currenthealth -= opponent.totalDamage;
                var rdm = Math.floor(Math.random() * 100) + 1;
                console.log("#: " + rdm);
                //player.damage();
                if(rdm <= (100 * 0.3)){
                    console.log("Orig Hit: " + player.totalDamage);
                    console.log("50% Hit: " + opponent.totalDamage * 0.5);
                    player.totalDamage = parseInt(opponent.totalDamage * 0.5);
                    opponent.currenthealth -= player.totalDamage;
                    opponent.totalDamage = 0;
                    console.log("Player deflect your attack. You recieve the damage.");
                }else{
                    console.log("Orig Hit: " + opponent.totalDamage);
                    opponent.totalDamage;
                }
            }else{
                console.log("no effect");
                return;
            }
            break;

        case "vampire":
            //10% lifesteal from opponents current health at start of the vampire's turn.
            if(gameState == "turning"){
                console.log("Orig Hit: " + opponent.totalDamage);
                console.log("Lifesteal: " + player.currenthealth * 0.1);
                console.log("Lifesteal: " + player.currenthealth * 0.1);
                opponent.totalDamage = parseInt(player.currenthealth * 0.1);
            }else{
                console.log("no effect");
                return;
            }
            break;

        default:
            console.log("Choice is not valid");
            break;
    }
}


function items() {
    //console.log(gameState);
    switch (player.item) {
        case "boots":     
            //30% chance to dodge an attack
            if(gameState == "attacking"){
                var rdm = Math.floor(Math.random() * 100) + 1;
                console.log("#: " + rdm);
                if(rdm <= (100 * 0.3)){                
                    console.log("The player dodge the attack of the opponent");
                    opponent.totalDamage = 0;
                }else{
                    console.log("The player received " + opponent.totalDamage + " from the opponent");
                    opponent.totalDamage;
                }
                
            }else{
                console.log("no effect");
                return;
            }       
            break;

        case "staff":    
            //20% increase in healing
            if(gameState == "creating"){
                console.log("Max Healing: " + player.maxHealing);  
                console.log("20%+ : " + player.maxHealing * 0.2);   
                player.maxHealing += parseInt(player.maxHealing * 0.2);
            }else{
                console.log("no effect");
                return;
            }
            break;

        case "sword":
            //30% more damage
            if(gameState == "creating"){
                console.log("Max Damage: " + player.maxDamage);  
                console.log("30%+ : " + player.maxDamage * 0.3);
                player.maxDamage += parseInt(player.maxDamage * 0.3);
            }else{
                console.log("no effect");
                return;
            }            
            break;

        case "bow":
            //30% chance to attack twice
            if(gameState == "attacking"){
                var rdm = Math.floor(Math.random() * 100) + 1;
                console.log("#: " + rdm);
                if(rdm <= (100 * 0.3)){
                    console.log("Number of Attack: 2");                
                    opponent. chance = 2;                    
                }else{
                    console.log("Number of Attack: 1");                
                    opponent.totalDamage;
                }
            }else{
                console.log("no effect");
                return;
            }
            break;
    
        default:
            console.log("Choice is not valid");
            break;
    }
}

function turn(){
    player.totalDamage = player.damage();
    opponent.totalDamage = opponent.damage()
    gameState == "turning";
    if(playerTurn == 1){        
        player = player2;
        opponent = player1;
        if(opponent.race == "vampire"){
            races();
            var oldHealth = player.currenthealth;        
            player.currenthealth -= opponent.totalDamage;
        
            //Animation
            healthAnimation(oldHealth, player.currenthealth, p2Health);
            p2Health.innerHTML = player.currenthealth + " / " + player.maxHealth;            
        }
        gameState == "attacking";        
    }else if(playerTurn == 2){
        gameState == "turning";
        player = player1;
        opponent = player2;
        if(opponent.race == "vampire"){
            races();
            var oldHealth = player.currenthealth;        
            player.currenthealth -= opponent.totalDamage;
        
            //Animation
            healthAnimation(oldHealth, player.currenthealth, p1Health);
            p1Health.innerHTML = player.currenthealth + " / " + player.maxHealth;
        }
        gameState == "attacking";
    }else{
        console.log("Not a vampire no lifesteal");
        return;
    }
}

function attack(){
    player.totalDamage = player.damage();
    opponent.totalDamage = opponent.damage()
    gameState = "attacking";
    //var chance;
    if(playerTurn == 1){
        //var chance;
        //do{            
            player = player2;
            opponent = player1;
            console.log("\n");
            races();
            items();
            addLogs("Player 1 attacks Player 2"); 
            /*console.log(player.chance);            
            chance = player.chance;
            console.log(chance);*/
            var oldHealth =  player.currenthealth;        
            player.currenthealth -= opponent.totalDamage;

            //Animation
            healthAnimation(oldHealth, player.currenthealth, p2Health);
            p2Health.innerHTML = player.currenthealth + " / " + player.maxHealth;
            //chance--;
            //console.log(chance);
        //}while(chance != 0);

        if(player.currenthealth <= 0){
            console.log("Game over. Player 1 Won!");
            addLogs("Game over. Player 1 Won");
            gameOver = true;
        }else{            
            playerTurn = 2;
            //console.log(playerTurn);
            console.log("Damage Received: " + opponent.totalDamage);
            console.log("Current Health: " + player.currenthealth);
            console.log("Player 2 turn to move");
            addLogs("Player 2 turn to move");                 
            console.log("\n");
            setTimeout(turn(), 1000);
            
            //console.log("Current Health: " + player.currenthealth);
            //disable the buttons for player1
            hit1.disabled = true;
            heal1.disabled = true;
            yield1.disabled = true;
            //disable the buttons for player2        
            hit2.disabled = false;
            heal2.disabled = false;
            yield2.disabled = false;
        }                  
    }else{
            player = player1;
            opponent = player2;
            //console.log("Player 2 turn to move");
            //addLogs("Player 2","Turn to move");
            races();
            items();       
            
            var oldHealth = player.currenthealth;       
            player.currenthealth -= opponent.totalDamage;
            //Animation
            healthAnimation(oldHealth, player.currenthealth, p1Health);
            p1Health.innerHTML = player.currenthealth + " / " + player.maxHealth;         

        if(player.currenthealth <= 0){
            console.log("Game over. Player 2 Won!");
            addLogs("Game over. Player 2 Won!");
            gameOver = true;
        }else{            
            playerTurn = 1;
            console.log("Damage Received: " + opponent.totalDamage);
            console.log("Current Health: " + player.currenthealth);
            console.log("Player 1 turn to move");
            addLogs("Player 1 turn to move");
            console.log("\n");
            setTimeout(turn(), 1000);
            console.log("Current Health: " + player.currenthealth);
            //enable the buttons for player1
            hit1.disabled = false;
            heal1.disabled = false;
            yield1.disabled = false;
            //disable the buttons for player2        
            hit2.disabled = true;
            heal2.disabled = true;
            yield2.disabled = true; 
        }                                
    }
    var objDiv = document.getElementById("logList");
    objDiv.scrollTop = objDiv.scrollHeight;
}

/*
 * Lower the health of your object and create a healing function that will use the heal function. (character.js) 
 * Make it so the function uses a random number between the minHealing and maxHealing.
 * Note: The currentHealth should NEVER go above the maxHealth
 */
function healing(){
    player.currenthealth += player.heal();
    if(player.currenthealth >= player.maxHealth){
        console.log("Your Health is Restored");
        return player.currenthealth = player.maxHealth;
    }else{
        console.log("Your Health went up");
        return player.currenthealth;
    }    
}

function surrender(){

}
