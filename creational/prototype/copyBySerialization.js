// Serializer - aware of the types that we are returning

class Address {
    constructor(streetAddress, city, country) {
        this.streetAddress = streetAddress;
        this.city = city;
        this.country = country;
    }

    toString() {
        return `Address: ${this.streetAddress} in ${this.city}, ${this.country}`;
    }
}

class Serializer {
    constructor(types) {
        this.types = types;
    }

    markRecursive(object) {
        const index = this.types.findIndex(type => {
            return type.name === object.constructor.name;
        });

        // if we found index
        if (index !== -1) {
            object['typeIndex'] = index;

            // recursive
            for (const key in object) {
                if (object.hasOwnProperty(key)) {
                    this.markRecursive(object[key]);
                }
            }
        }
    }

    reconstructRecursive(object) {
        if (object.hasOwnProperty('typeIndex')) {
            const type = this.types[object.typeIndex];
            // making instance of a type
            const obj = new type();
            for (const key in obj) {
                if (object.hasOwnProperty(key) && object[key] !== null) {
                    obj[key] = this.reconstructRecursive(object[key]);
                }
            }
            delete obj.typeIndex;
            return obj;
        }

        return object;
    }

    clone(object) {
        this.markRecursive(object);
        const copy = JSON.parse(JSON.stringify(object));

        return this.reconstructRecursive(copy);
    }
}

class Person {
    constructor(name, address) {
        this.name = name;
        this.address = address;
    }

    greet() {
        `Hi, my name is ${this.name}. I live at this address: ${this.address}`
    }

    toString() {
        return `${this.name} lives at ${this.address}`;
    }
}

const john = new Person('John', new Address('123 London Road', 'London', 'UK'))
const serializer = new Serializer([Person, Address]);

const jane = serializer.clone(john);

jane.name = 'Jane';
jane.address.streetAddress = '333 LA street';

// jane.greet(); // will fail if we make "JSON.parse(JSON.stringify(john));"
// because JSON.parse - is a data structure that doesn't have class-object relations
console.log(jane.toString());
console.log(john.toString());
