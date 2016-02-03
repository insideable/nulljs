
```

// Inheritance example

// let define some base unit for our MMORPG :-)
var Person = function (name) {
	name && (this.name = name);
};

Person.prototype.talk = function () {
	alert("Hi, I'm " + this.name);
};

Person.prototype.fight = function (person) {
	alert("I don't have battle skills, so I run away from " + person.name);
};

// now we need some sort of healers
var Doctor = function () {
	this.constructor.prototype.constructor.apply(this, arguments);
};

Doctor.prototype = new Person();

Doctor.prototype.heal = function (person) {
	alert("I cast heal on " + person.name);
};

// also we want to protect our lands
var Mage = function () {
	this.constructor.prototype.constructor.apply(this, arguments);
};

Mage.prototype = new Doctor();	// yes, Mage should have heal skills too

Mage.prototype.fight = function (person) {
	alert("Cast fireball on " + person.name + ". Pshhhh! You're dead dude!");
};

var person = new Person("Humanoid"), house = new Doctor("House M.D."), aibolit = new Doctor("Aibolit");

house.talk();
house.heal(person);
house.heal(aibolit);

var mage = new Mage("BlackMagic");
person.fight(mage);
mage.heal(aibolit);
mage.fight(person);


```