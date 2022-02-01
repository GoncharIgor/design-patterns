// we have hierarchy of objects and we can have related hierarchy of types

const readline = require('readline');
const readLine = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

class HotDrink {
    // we consider this method to be Abstract
    consume() {
    }
}

class Tea extends HotDrink {
    // implementation of "abstract" class
    consume() {
        console.log('This tea is nice with lemon');
    }
}

class Coffee extends HotDrink {
    consume() {
        console.log('This coffee is nice with sugar');
    }
}

class HotDrinkFactory {
    // abstract method
    prepareDrink(amount) {
    }
}

class TeaFactory extends HotDrinkFactory {
    prepareDrink(amount) {
        console.log(`Put in tea bag -> boil water -> pour ${amount}ml`);
        return new Tea();
    }
}

class CoffeeFactory extends HotDrinkFactory {
    prepareDrink(amount) {
        console.log(`Grind beans -> boil water -> pour ${amount}ml`);
        return new Coffee();
    }
}

// enum workaround
const AvailableDrinks = Object.freeze({
    coffee: CoffeeFactory,
    tea: TeaFactory
});

// problem - we are breaking Open-closed principle:
// if we need to add new Drink factory - we'll go to this class and will update it
class HotDrinkMachine {
    constructor() {
        this.factories = {};
        for (let drink in AvailableDrinks) {
            // creating object: key - key from enum, value - Factory object instance
            this.factories[drink] = new AvailableDrinks[drink]();
        }
    }

    askUser(consumer) {
        readLine.question('Which drink and amount do you want? (e.g., tea 50)\n', (answer) => {
            const [drinkType, amount] = answer.split(' ');
            const drinkFactory = this.factories[drinkType];
            const drink = drinkFactory.prepareDrink(parseInt(amount));
            readLine.close();
            consumer(drink); // pass "drink" object to consumer cb f()
        })
    }

    /*
    old approach
    makeDrink(type) {
        switch (type) {
            case 'tea':
                return new TeaFactory().prepareDrink(200);
            case 'coffee':
                return new CoffeeFactory().prepareDrink(50);
            default:
                throw new Error('We can not prepare this kind of drink');
        }
    }
    */
}

const machine = new HotDrinkMachine();
// f() argument - a cb f() (consumer)
machine.askUser((drink) => drink.consume);

// language reflection - possibility of a class to find all its inheritors
