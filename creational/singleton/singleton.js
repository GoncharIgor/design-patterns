// via constructor.instance object property

class Singleton {

    constructor() {
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

console.log('Are 2 objects is the same entity, they have same link? ' + (s1 === s2));
