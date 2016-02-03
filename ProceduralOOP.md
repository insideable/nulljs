
```

var person_talk = function (person) {
	alert("Hi, I'm " + person[0]);
};

var person_fight = function (person, target) {
	alert(person[0] + ": I have no battle skills, so I run away from " + target[0]);
};

var doctor_heal = function (doctor, target) {
	alert(doctor[0] + ": I spell heal on " + target[0]);
};

var mage_fight = function (person, target) {
	alert(person[0] + ": I spell fireball on " + target[0]);
};

var talk = function (person) {
	person[1](person);
};

var fight = function (person, target) {
	person[2](person, target);
};

var heal = function (doctor, target) {
	doctor[3](doctor, target);
};

var Person = function (name) {
	return [name, person_talk, person_fight];
};

var Doctor = function (name) {
	var p = Person(name);
	p.push(doctor_heal);
	return p;
};

var Mage = function (name) {
	var d = Doctor(name);
	d[2] = mage_fight;
	return d;
};

// now we create some objects
var person = Person("Barak Obama"),
    house = Doctor("House M.D."),
    aibolit = Doctor("Aibolit"),
    mage = Mage("BlackMagic");

talk(person);
talk(house);
talk(mage);
fight(person, mage);
fight(mage, person);
heal(house, person);
fight(house, mage);

```