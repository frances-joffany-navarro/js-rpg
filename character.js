//Use this script to generate your character
function Person(race, item, name) {
  this.race = race;
  this.item = item;
  this.name = name;
  this.currenthealth = 100;
  this.maxHealth = 100;

  this.min = 3;
  this.maxDamage = 20;
  this.maxHealing = 30;

  this.heal = function () {
    return Math.floor(Math.random() * (this.maxHealing - this.min) + this.min);
  };

  this.damage = function () {
    const randomDamageNumber = Math.floor(Math.random() * (this.maxDamage - this.min) + this.min);
    let totalDamage;
    switch (this.race) {
      case "humans":
        //20% less damage taken
        totalDamage = randomDamageNumber - Math.round(randomDamageNumber * 0.20)
        break;

      case "orcs":
        /* 40% more max health */
        this.maxHealth += this.maxHealth * 0.4;
        totalDamage = randomDamageNumber;
        break;

      case "elves":
        //30% chance to deflect the attack back to the opponent. 
        // The attacker takes damage equal to 50% of the original hit. 
        // The elf takes no damage.
        totalDamage = randomDamageNumber;
        break;

      case "vampires":
        totalDamage = randomDamageNumber;
        break;

      default:
        break;
    }

    return totalDamage;
  };

  this.totalDamage = this.damage();// how much damage you will give to your opponent
  this.totalHeal = this.heal()

  this.displayChar = function () {
    return console.log(this.name, `I am a ${this.race}, I wield a ${this.item}, my total health point are ${this.maxHealth}`);
  };
};

export { Person };