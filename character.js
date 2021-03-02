var create = document.getElementById("create"),
    logPanel =  document.getElementById("logPanel"),
    movesPanel = document.getElementById("movesPanel"),
    createPanel = document.getElementById("creationPanel"),
    startPanel = document.getElementById("startPanel"),
    start = document.getElementById("start"),
    countPlayer = 0,
    players = [],
    player1, player2;

function Person(race,item){
    this.race = race;
    this.item = item;
    this.currenthealth = 100;
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
ctx.font = "60px Black Ops One "; /* Arial Black Bernard MT Condensed */
ctx.fillStyle = "#ffffff"; /*e3cc54*/
ctx.textAlign = "center";
ctx.fillText("VS", canvas.width/2, canvas.height/2 + 30);
//Create a  Player
create.addEventListener("click", createAvatar);
//Start game
start.addEventListener("click", startGame);

function createAvatar() {
    countPlayer++;
    //console.log(countPlayer);
    //create 2 player only
    if(countPlayer <= 2){
        //get the inputs
        var playerName = document.getElementById("playerName").value;
        var playerRace = document.getElementById("races").value;
        var playerItem = document.getElementById("items").value;
        //create object and put value of the inputs
        var character = {"name": playerName, "race": playerRace, "item": playerItem}
        //add the object into array
        players.push(character);
        //set player 2
        
        switch (countPlayer) {
            case 1:
                //initiate new player
                player1 = new Person(players[0].race,players[0].item);
                var result = player1.displayChar();
                //document.getElementById("logPanel").append("result");
                document.getElementById("desc").innerHTML = "Player 2";
                break;
            
            case 2:
                //initiate new player
                player2 = new Person(players[1].race,players[1].item);
               
                //show Start Panel
                startPanel.style.display = "block" ;
                //Hide create panel
                createPanel.style.display = "none" ;
                
                var result = player2.displayChar();
                break;
            default:
                console.log("Invalid");
                break;
        }
    }else{
        console.log("Players are complete");
    }

/*document.getElementById("p1Health").animate([
    {width: parseString(player1.maxHealth)},
    {width: parseString(player1.currenthealth)},
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
}

function changeHealth(max, current){
    document.getElementById("p1Health").animate([
        {width: "" + max + "%"},
        {width: "" + current + "%"},
    ],{
        duration: 1000,
    });
}
