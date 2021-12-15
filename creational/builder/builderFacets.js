// aggregating 2 sub-builders builders in 1 main one

class Person {
    constructor() {
        // address defaults
        this.streetAddress = '';
        this.posrtalCode = '';
        this.city = '';

        // employment info defaults
        this.companyName = '';
        this.position = '';
        this.annualIncome = '';
    }

    toString() {
        return `Person lives at ${this.streetAddress} in ${this.city} and works in ${this.companyName} company`;
    }
}

class PersonBuilder {
    // default value in constructor
    constructor(person = new Person()) {
        this.person = person;
    }

    // every person sub-builder (PersonAddressBuilder or JobBuiler) works with the same "person" object
    get lives() {
        return new PersonAddressBuilder(this.person);
    }

    get works() {
        return new PersonJobBuilder(this.person);
    }

    build() {
        return this.person;
    }
}

class PersonJobBuilder extends PersonBuilder {
    constructor(person) {
        super(person);
    }

    at(companyName) {
        this.person.companyName = companyName;
        return this;
    }

    setPosition (position) {
        this.person.position = position;
        return this;
    }

    earning (annualIncome) {
        this.person.annualIncome = annualIncome;
        return this;
    }
}

class PersonAddressBuilder extends PersonBuilder {
    constructor(person) {
        super(person);
    }

    at(streetAddress) {
        this.person.streetAddress = streetAddress;
        return this;
    }

    withPostCode (postCode) {
        this.person.posrtalCode = postCode;
        return this;
    }

    in (city) {
        this.person.city = city;
        return this;
    }
}

const personBuilder = new PersonBuilder();
// lives - a getter for PersonAddressBuilder
const person = personBuilder
    .lives.at('Amstelstraat').in('Amsterdam').withPostCode('1124DM')
    .works.at('Backbase').setPosition('FE Engineer').earning('Quite a lot')
    .build();

console.log(person.toString());

// how we jump from 1 sub-builder to another:
// they both extend "PersonBuilder" class
// it means they both have "works" and "lives" properties
