// Serializer - aware of the types that we are returning

class Address {
    constructor(suite, streetAddress, city) {
        this.suite = suite;
        this.streetAddress = streetAddress;
        this.city = city;
    }

    toString() {
        return `Suite: ${this.suite} in ${this.streetAddress}, ${this.city}`;
    }
}

class Employee {
    constructor(name, address) {
        this.name = name;
        this.address = address;
    }

    greet() {
        `Hi, my name is ${this.name}. I work at this address: ${this.address}`
    }

    toString() {
        return `${this.name} works at ${this.address}`;
    }
}

class Serializer
{
    constructor(types){
        this.types = types;
    }

    markRecursive(object)
    {
        // anoint each object with a type index
        let idx = this.types.findIndex(t => {
            return t.name === object.constructor.name;
        });
        if (idx !== -1)
        {
            object['typeIndex'] = idx;

            for (let key in object)
            {
                if (object.hasOwnProperty(key) && object[key] != null)
                    this.markRecursive(object[key]); // ^^^^^^^^^^ important
            }
        }
    }

    reconstructRecursive(object)
    {
        if (object.hasOwnProperty('typeIndex'))
        {
            let type = this.types[object.typeIndex];
            let obj = new type();
            for (let key in object)
            {
                if (object.hasOwnProperty(key) && object[key] != null) {
                    obj[key] = this.reconstructRecursive(object[key]);
                }
            }
            delete obj.typeIndex;
            return obj;
        }
        return object;
    }

    clone(object)
    {
        this.markRecursive(object);
        let copy = JSON.parse(JSON.stringify(object));
        return this.reconstructRecursive(copy);
    }
}

class EmployeeFactory {
    static _newEmployee(proto, name, suite) {
        const copy = EmployeeFactory.serializer.clone(proto);
        copy.name = name;
        copy.address.suite = suite;
        return copy;
    }

    static newMainOfficeEmployee(name, suite) {
        return this._newEmployee(EmployeeFactory.main, name, suite)
    }

    static newAuxOfficeEmployee(name, suite) {
        return this._newEmployee(EmployeeFactory.aux, name, suite)
    }
}

EmployeeFactory.serializer = new Serializer([Employee, Address]);

EmployeeFactory.main = new Employee(null,
    new Address(null, '123 Eastdrive', 'London'));
EmployeeFactory.aux = new Employee(null,
    new Address(null, '200 Londonroad', 'Oxford'));

const john = EmployeeFactory.newMainOfficeEmployee('John', '4324');
const jane = EmployeeFactory.newAuxOfficeEmployee('Jane', '2222');

console.log(john.toString());
console.log(jane.toString());
