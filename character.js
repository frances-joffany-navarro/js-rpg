//Use this script to generate your character
function Person(race, item, name) {
  this.race = race;
  this.item = item;
  this.name = name;
  this.currenthealth = 100;
  this.maxHealth = 100;
  /* this.player = player; */
  this.oldhealth = 100;

  this.min = 3;
  this.maxDamage = 20;
  this.maxHealing = 30;

  this.heal = function () {
    return Math.floor(Math.random() * (this.maxHealing - this.min + 1)) + this.min;
  };

  this.damage = function () {
    return Math.floor(Math.random() * (this.maxDamage - this.min + 1)) + this.min;
  };

  this.totalDamage = this.damage();// how much damage you will give to your opponent
  this.totalHeal = this.heal()

  this.displayChar = function () {
    return console.log(this.name, `I am a ${this.race}, I wield a ${this.item}, my total health point are ${this.maxHealth}`);
  };
};

export { Person };