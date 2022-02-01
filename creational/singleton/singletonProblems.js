const fs = require('node:fs');
const path = require('node:path');

// Dependency injection principle - high level modules shouldn't depend directly on low-level ones
// TLDR: provide dependencies in constructor, that can be mocked, rather than internally connect to needed instances

// low level module
class MyDatabase {
    capitals = {};

    constructor() {
        const instance = this.constructor.instance;

        if (instance) {
            return instance;
        }

        this.constructor.instance = this;

        console.log('Initializing the DB...');
        const lines = fs.readFileSync(path.join(__dirname, 'db-data/capitals.txt')).toString().split('\n');

        lines
            .filter(line => line) // filter out empty lines
            .forEach((line) => {
                const [city, population] = line.split('-');
                this.capitals[city] = population;
            })

        console.log('DB finished initialization with values:');
        console.log(this.capitals);
    }

    getPopulationPerCity(city) {
        return this.capitals[city];
    }
}


// High level module
// violates DI principle - it's directly depends on low-level DB class
class SingletonRecordFinder {
    totalPopulation(cities) {
        return cities
            .map(city => {
                return new MyDatabase().getPopulationPerCity(city);
            })
            .reduce((x, y) => parseInt(x) + parseInt(y)); // adding all cities population together
    }
}

// High level module
// correct implementation
class ConfigurableRecordFinder {
    // we are introducing dependency here
    constructor(database) {
    // constructor(database = new MyDatabase()) { // default DB, that can be used for production setup
        this.database = database;
    }

    totalPopulation(cities) {
        return cities
            .map(city => {
                return this.database.getPopulationPerCity(city);
            })
            .reduce((x, y) => parseInt(x) + parseInt(y)); // adding all cities population together
    }
}

class MockDatabase {
    constructor() {
        this.capitals = {
            Amsterdam: '111',
            London: '222',
        }
    }

    getPopulationPerCity(city) {
        return this.capitals[city];
    }
}


// Jasmine tests
// to run test - from root folder:
// 1. install jasmine globally to npm: npm i -g jasmine
// 2. cd creational/singleton
// 3. run tests: jasmine JASMINE_CONFIG_PATH=jasmine.json
describe('Singleton databse', () => {
    it('is a singleton', () => {
        const db1 = new MyDatabase();
        const db2 = new MyDatabase();

        expect(db1).toBe(db2); // equality ba reference
    });

    it('calculates total population from real DB', () => {
        const recordFinder = new SingletonRecordFinder();
        const cities = ['Seoul', 'Amsterdam'];
        const totalPopulation = recordFinder.totalPopulation(cities);

        expect(totalPopulation).toEqual(2200000 + 980000);
    })

    it('calculates total population from mocked DB', () => {
        const mockDb = new MockDatabase();
        const correctRecordFinder = new ConfigurableRecordFinder(mockDb);

        const cities = ['London', 'Amsterdam'];
        const totalPopulation = correctRecordFinder.totalPopulation(cities);

        expect(totalPopulation).toEqual(111 + 222);
    })
})
