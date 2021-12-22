// via static methods
// static method - per class
// getter and setter - per object instance

class Person {
    static _name = null;
    static _age = null;

    get name() {
        return Person._name;
    }

    set name(name) {
        Person._name = name;
    }

    get age() {
        return Person._age;
    }

    set age(age) {
        Person._age = age;
    }

    toString() {
        return `${this.name} is ${this.age} old`;
    }
}

// another way of declaring static class properties - outside class
// Person._age = null;
// Person._name = null;

const person1 = new Person();
person1.name = 'Igor';
person1.age = 31;

const person2 = new Person();

person2.name = 'Bob';
person2.age = 55;

console.log(person1.toString()); // Bob is 55 old
console.log(person2.toString()); // Bob is 55 old

// instead of returning instances from constructor, we are working with static properties
// this data is shared within all the objects
