var create1 = document.getElementById("create1"),
    create2 = document.getElementById("create2"),
    formPlayer1 = document.getElementById("formPlayer1"),
    formPlayer2 = document.getElementById("formPlayer2"),
    logPanel =  document.getElementById("logPanel"),
    movesPanel = document.getElementById("movesPanel"),
    createPanel = document.getElementById("creationPanel"),
    startPanel = document.getElementById("startPanel"),
    start = document.getElementById("start"),
    player1Stat = document.getElementById("player1Stat"),
    player2Stat = document.getElementById("player2Stat"),
    p1Health = document.getElementById("p1Health"),
    p2Health = document.getElementById("p2Health"),
    hit1 = document.getElementById("hit1"),
    heal1 = document.getElementById("heal1"),
    yield1 = document.getElementById("yield1"),
    hit2 = document.getElementById("hit2"),
    heal2 = document.getElementById("heal2"),
    yield2 = document.getElementById("yield2"),
    counter = 0,
    players = [],
    player1, player2, playerTurn = 1, gameState = "creating", gameOver = false;

function Person(race,item){
    this.race = race;
    this.item = item;
    this.currenthealth = 100;
    this.maxHealth = 100;
    
    this.min = 3;
    this.maxDamage = 20;
    this.maxHealing = 30;

    this.chance = 1;

    this.heal = function(){
        return Math.floor(Math.random() * (this.maxHealing - this.min + 1)) + this.min;   
    };

    this.damage = function(){
        result = Math.floor(Math.random() * (this.maxDamage - this.min + 1)) + this.min;
        return result
    };

    this.totalDamage = this.damage();

    this.displayChar = function(){
        return console.log(`I am a ${this.race}, I wield a ${this.item}, my total health point are ${this.maxHealth}`);
    };
}

create1.addEventListener("click", getInputP1);
create2.addEventListener("click", getInputP2);
start.addEventListener("click", startGame);

function getInputP1() {
    //save Player1 input
    var playerName1 = document.getElementById("playerName1").value;
    var playerRace1 = document.getElementById("races1").value;
    var playerItem1 = document.getElementById("items1").value;

    if(playerName1.trim() != "" && playerRace1 != "" && playerItem1 != ""){
        //create object and put value of the inputs
        var character = {"name": playerName1, "race": playerRace1, "item": playerItem1}
        //add the object into array
        players.push(character);

        formPlayer1.style.display = "none";
        formPlayer2.style.display = "block";
    }else{
        console.log("There is an empty value. Please check your inputs");
    }          
}

function getInputP2() {
    //save Player2 input
    var playerName2 = document.getElementById("playerName2").value;
    var playerRace2 = document.getElementById("races2").value;
    var playerItem2 = document.getElementById("items2").value;

    if(playerName2.trim() != "" && playerRace2 != "" && playerItem2 != ""){
        //create object and put value of the inputs
        var character = {"name": playerName2, "race": playerRace2, "item": playerItem2}
        //add the object into array
        players.push(character);
        //show Start Panel
        startPanel.style.display = "block" ;
        //hide creation panel
        createPanel.style.display = "none" ;
    }else{
        console.log("There is an empty value. Please check your inputs");
    }     
}

function createStat(){
    //create character
    player1 = new Person(players[0].race,players[0].item);
    player2 = new Person(players[1].race,players[1].item);

    if(gameState == "creating"){
        player = player1;
        opponent = player2;
        console.log("Player1");
        races();
        items();
        player1 = player;
        
        player = player2;
        opponent = player1;
        console.log("Player2");
        races();
        items();
        player2 = player;
    }

    console.log("Player1 Stat: " + 
        "\n Race: " + player1.race + 
        "\n Item: " + player1.item + 
        "\n Current Health: " + player1.currenthealth +
        "\n Max Health: " +  player1.maxHealth + 
        "\n Max Healing: " +  player1.maxHealing + 
        "\n Max Damage: " +  player1.maxDamage + 
        "\n Heal: " + player1.heal() + 
        "\n Damage: " + player1.totalDamage +
        "\n Chance: " + player1.chance);

    console.log("PLayer2 Stat: " + 
        "\n Race: " + player2.race + 
        "\n Item: " + player2.item + 
        "\n Current Health: " + player2.currenthealth +
        "\n Max Health: " +  player2.maxHealth + 
        "\n Max Healing: " +  player2.maxHealing + 
        "\n Max Damage: " +  player2.maxDamage + 
        "\n Heal: " + player2.heal() + 
        "\n Damage: " + player2.totalDamage +
        "\n Chance: " + player2.chance);                
}

function startGame(){    
    createStat();
    addLogs("Player 1 will make the first move");

    //disable the buttons for player2        
    hit2.disabled = true;
    heal2.disabled = true;
    yield2.disabled = true;
    
    //Show log and move panel
    logPanel.style.display = "block";
    movesPanel.style.display = "block";

    //Hide create panel
    startPanel.style.display = "none";

    //show players name
    document.getElementById("showName1").innerHTML = players[0].name;
    document.getElementById("showName2").innerHTML = players[1].name;

    //Show player health bar
    player1Stat.style.visibility = "visible";
    player2Stat.style.visibility = "visible";

    p1Health.setAttribute("style", "width:" + player1.maxHealth + "%" );
    p2Health.setAttribute("width", "width:" + player2.maxHealth + "%" );
    p1Health.setAttribute("aria-valuemax", player1.maxHealth + "" );
    p2Health.setAttribute("aria-valuemax", player2.maxHealth + "" );

    //Animation
    healthAnimation(0, player1.maxHealth, p1Health);
    healthAnimation(0, player2.maxHealth, p2Health);
    
    p1Health.innerHTML = player1.currenthealth + " / " + player1.maxHealth;
    p2Health.innerHTML = player2.currenthealth + " / " + player2.maxHealth;
    
    //show race and item image
    players.forEach(showImages);    
}

function showImages(value,index){    
    var itemImage = document.getElementById("itemImage" + (index + 1));
    switch (value.item) {
        case "boots":
            itemImage.setAttribute("src","images/boots.png");
            break;

        case "staff":
            itemImage.setAttribute("src","images/magic-wand.png");
            break;

        case "sword":
            itemImage.setAttribute("src","images/sword.png");
            break;
        
        case "bow":
            itemImage.setAttribute("src","images/bow.png");
            break;    
    
        default:
            console.log("Invalid value");
            break;
    }

    switch (value.race) {
        case "human":
            var img = document.getElementById("human");
            if(index == 0){
                ctx.drawImage(img, canvas.width/12, canvas.height/4, 150, 150);
            }else{
                ctx.drawImage(img, (canvas.width/2) + (canvas.width/6), canvas.height/4, 150, 150);
            }            
            break;

        case "orc":
            var img = document.getElementById("orc");
            if(index == 0){
                ctx.drawImage(img, canvas.width/12, canvas.height/4, 150, 150);
            }else{
                ctx.drawImage(img, (canvas.width/2) + (canvas.width/6), canvas.height/4, 150, 150);
            }  
            break;

        case "elf":
            var img = document.getElementById("elf");
            if(index == 0){
                ctx.drawImage(img, canvas.width/12, canvas.height/4, 150, 150);
            }else{
                ctx.drawImage(img, (canvas.width/2) + (canvas.width/6), canvas.height/4, 150, 150);
            }  
            break;
        
        case "vampire":
            var img = document.getElementById("vampire");
            if(index == 0){
                ctx.drawImage(img, canvas.width/12, canvas.height/4, 150, 150);
            }else{
                ctx.drawImage(img, (canvas.width/2) + (canvas.width/6), canvas.height/4, 150, 150);
            }  
            break;    
    
        default:
            console.log("Invalid value");
            break;
    }
}

function healthAnimation(from, to, id){
    id.animate([
        {width: from + "%"},
        {width: to + "%"},        
    ],{
        duration: 1000,
        fill: "forwards",
    });
}

function addLogs(msg){
    var list = document.createElement("li");
    list.append(msg); 
    document.getElementById("logs").appendChild(list);
}

//add vs in the canvas
var canvas = document.getElementById("visual");
var ctx = canvas.getContext("2d");
ctx.font = "60px Black Ops One"; /* Arial Black Bernard MT Condensed */
ctx.fillStyle = "#ffffff"; /*e3cc54*/
ctx.textAlign = "center";
ctx.fillText("VS", canvas.width/2, canvas.height/2 + 30);
