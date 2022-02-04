// via constructor.instance object property

class Singleton {

    constructor() {
        // we are checking if not object, but Class constructor has "instance" property
        const instance = this.constructor.instance;
        if (instance) {
            return instance;
        }

        // this runs the first time we try to create an Object
        this.constructor.instance = this;
    }
}

const s1 = new Singleton();
const s2 = new Singleton();

console.log('Are 2 objects is the same entity, they have same link? ' + (s1 === s2)); // true


// gotchas:
// Singleton can be in several approached:
// - constructor returns the same instance of an O
// - Monostate: many instances of Object, 1 shared data
// directly depend on Singleton is bad - better to use dependency in constructor (e.g.: pass DB instance in the constructor)

// JS modules are singletones: both commonJs (require) and ESM (import)
