
var create = document.getElementById("create"),
    logPanel =  document.getElementById("logPanel"),
    movesPanel = document.getElementById("movesPanel"),
    createPanel = document.getElementById("creationPanel"),
    startPanel = document.getElementById("startPanel"),
    start = document.getElementById("start"),
    player1Stat = document.getElementById("player1Stat"),
    player2Stat = document.getElementById("player2Stat"),
    p1Health = document.getElementById("p1Health"),
    p2Health = document.getElementById("p2Health"),
    countClick = 0,
    players = [],
    player1, player2;

function Person(race,item){
    this.race = race;
    this.item = item;
    this.currenthealth = 50;
    this.maxHealth = 100;
    
    this.min = 3;
    this.maxDamage = 20;
    this.maxHealing = 30;

    this.heal = function(){};

    this.damage = function(){};

    this.totalDamage = this.damage();

    this.displayChar = function(){
        return console.log(`I am a ${this.race}, I wield a ${this.item}, my total health point are ${this.maxHealth}`);
    };
}


//add vs in the canvas
var canvas = document.getElementById("visual");
var ctx = canvas.getContext("2d");
ctx.font = "60px Black Ops One"; /* Arial Black Bernard MT Condensed */
ctx.fillStyle = "#ffffff"; /*e3cc54*/
ctx.textAlign = "center";
ctx.fillText("VS", canvas.width/2, canvas.height/2 + 30);
//ctx.drawImage(img, 10, 10);

//Create a Player
create.addEventListener("click", createPlayer);
//Start game
start.addEventListener("click", startGame);

function createPlayer() {
    //get the inputs
    var playerName = document.getElementById("playerName").value;
    var playerRace = document.getElementById("races").value;
    var playerItem = document.getElementById("items").value;
    
    //validation
    if(playerName.trim() != "" && playerRace != "" && playerItem != ""){
        countClick++;
        if(countClick <= 2){            
            //create object and put value of the inputs
            var character = {"name": playerName, "race": playerRace, "item": playerItem}
            //add the object into array
            players.push(character);

            switch (countClick) {
                case 1:
                    //initiate new player
                    player1 = new Person(players[0].race,players[0].item);
                    //display Character in console
                    player1.displayChar();
                    //document.getElementById("logPanel").append("result");
                    //prep for to create player 2
                    document.getElementById("desc").innerHTML = "Player 2";
                    //clear input value;
                    break;
                
                case 2:
                    //initiate new player
                    player2 = new Person(players[1].race,players[1].item);
                    //display Character in console
                    player2.displayChar();
                    //show Start Panel
                    startPanel.style.display = "block" ;
                    //hide creation panel
                    createPanel.style.display = "none" ;
                    break;

                default:
                    console.log("No equivalence");
                    break;
            }
        }else{
            console.log("Players are complete");
        } 
        document.getElementById("playerName").value = "";
        document.getElementById("races").value = "";
        document.getElementById("items").value = "";
        //document.getElementById("playerName").autofocus = true;
    }else{
        console.log("There is an empty value. Please check your input.");
    }
    
/*document.getElementById("p1Health").animate([
    {width: "" + player1.maxHealth + "%"},
    {width: "" + player1.currenthealth + "%"},
],{
    duration: 3000,
});*/
}

function startGame(){
    //Show log and move panel
    logPanel.style.display = "block";
    movesPanel.style.display = "block";

    //Hide create panel
    startPanel.style.display = "none";
    player1Stat.style.visibility = "visible";
    player2Stat.style.visibility = "visible";

    //Animation
    healthAnimation(0, 100, p1Health);
    healthAnimation(0, 100, p2Health);

    //show players name
    document.getElementById("showName1").innerHTML = players[0].name;
    document.getElementById("showName2").innerHTML = players[1].name;

    //show item image
    players.forEach(showImages);

    //show race image
    //player
        
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

function healthAnimation(current, max, player){
    player.animate([
        {width: "" + current + "%"},
        {width: "" + max + "%"},        
    ],{
        duration: 1000,
        fill: "forwards",
    });
}

function addLogs(player,move){
    var list = document.createElement("li");
    list.append(player + ": " + move); 
    document.getElementById("logs").appendChild(list);
}
