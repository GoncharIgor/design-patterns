// Prototype - a partially or fully initialized object tht you copy (clone) and make use of it
// the essence of this design pattern - the ability to copy objects

class Address {
    constructor(streetAddress, city, country) {
        this.streetAddress = streetAddress;
        this.city = city;
        this.country = country;
    }

    deepCopy() {
        return new Address(this.streetAddress, this.city, this.country);
    }

    toString() {
        return `Address: ${this.streetAddress} in ${this.city}, ${this.country}`;
    }
}

class Person {
    constructor(name, address) {
        this.name = name;
        this.address = address;
    }

    deepCopy() {
        // allocates new memory
        return new Person(this.name, this.address.deepCopy());
    }

    toString() {
        return `${this.name} lives at ${this.address}`;
    }
}

const john = new Person('John', new Address('123 London Road', 'London', 'UK'))
// prototype may help to create people object, that live with John in the same building (address will be the same)

// john - is a prototype, from which we are making copies
// limitation - we need to implement "deepCopy" f() to each nested object
const jane = john.deepCopy();
jane.name = 'Jane';
jane.address.streetAddress = '333 LA street';

console.log(jane.toString());
console.log(john.toString());
